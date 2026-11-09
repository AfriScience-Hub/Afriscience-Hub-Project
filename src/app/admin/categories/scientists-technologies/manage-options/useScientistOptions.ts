'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { usePersistentTab } from '@/lib/usePersistentTab';
import type { CategoryPrice } from '../../special-centres/manage-options/data';
import type { PriceSide } from '../../special-centres/manage-options/components/PriceSideDialog';
import {
  MANAGE_TABS, TAB_SINGULAR, type ManageTab, type ManagedOption,
} from './data';

const TAB_IDS = MANAGE_TABS.map((tab) => tab.id);

/** The shared profession price starts empty and is configured from the Price tab. */
const EMPTY_PROFESSION_PRICE: CategoryPrice = {
  africaOne: '',
  africaTwoOrMore: '',
  nonAfricaOne: '',
  nonAfricaTwoOrMore: '',
};

/** Options tabs mapped to the `type` accepted by the options endpoint. */
const OPTION_TYPES: Partial<Record<ManageTab, 'FIELD' | 'SERVICE' | 'DEGREE'>> = {
  Fields: 'FIELD',
  Degree: 'DEGREE',
  Services: 'SERVICE',
};

const EMPTY_OPTIONS: Record<ManageTab, ManagedOption[]> = {
  Fields: [], Profession: [], Degree: [], Services: [], Price: [],
};

/** The four UI price cells, keyed to the API location/type pairs. */
type PriceSlotKey = 'africaOne' | 'africaTwoOrMore' | 'nonAfricaOne' | 'nonAfricaTwoOrMore';

/** Additional charge configured per region (shown on the Price tab). */
type ExtraCharges = { african: string; nonAfrican: string };

const EMPTY_EXTRA_CHARGES: ExtraCharges = { african: '', nonAfrican: '' };

export type SavePayload = {
  content: string;
  field?: string;
  notes?: string;
  isActive?: boolean;
};

const errorMessage = (err: unknown) =>
  err instanceof Error ? err.message : 'Something went wrong. Please try again.';

/** Reads the list out of the various shapes the API may wrap it in. */
function listFrom<T>(response: unknown): T[] {
  const payload = (response as { data?: unknown })?.data ?? response;
  const root = payload as Record<string, unknown> | undefined;
  if (Array.isArray(payload)) return payload as T[];
  const candidates = ['data', 'options', 'professions', 'fields', 'prices', 'items', 'results'];
  for (const key of candidates) {
    if (Array.isArray(root?.[key])) return root[key] as T[];
  }
  return [];
}

function toOption(item: Record<string, unknown>): ManagedOption {
  const id = item.id ?? item._id ?? item.optionId ?? item.name;
  return {
    id: String(id ?? ''),
    name: String(item.name ?? item.label ?? ''),
    status: item.isActive === false ? 'Inactive' : 'Active',
    isActive: item.isActive !== false,
    count: Number(item.count ?? item.listingsCount ?? 0),
    note: typeof item.note === 'string' ? item.note : '',
  };
}

function toProfession(item: Record<string, unknown>, fields: ManagedOption[]): ManagedOption {
  const rawField = item.field;
  const nestedField = rawField && typeof rawField === 'object'
    ? (rawField as { id?: unknown; name?: unknown })
    : undefined;
  const directFieldName = typeof rawField === 'string' ? rawField : undefined;
  const fieldId = String(item.fieldId ?? nestedField?.id ?? '');
  const fieldName =
    directFieldName ||
    (typeof nestedField?.name === 'string' && nestedField.name) ||
    (typeof item.fieldName === 'string' && item.fieldName) ||
    fields.find((f) => f.id === fieldId)?.name ||
    '';
  return {
    id: String(item.id ?? item._id ?? item.professionId ?? ''),
    name: String(item.name ?? ''),
    field: fieldName,
    fieldId,
    status: item.isActive === false ? 'Inactive' : 'Active',
    isActive: item.isActive !== false,
    count: Number(item.count ?? item.listingsCount ?? 0),
    note: typeof item.note === 'string' ? item.note : '',
  };
}

/** Owns every piece of state and every API call for the manage-options page. */
export function useScientistOptions() {
  const [activeTab, setActiveTab] = usePersistentTab<ManageTab>(
    'admin:scientists-manage-options:tab',
    TAB_IDS,
    'Fields',
  );
  const [options, setOptions] = useState<Record<ManageTab, ManagedOption[]>>(EMPTY_OPTIONS);
  /** Fields fetched from the API, used for the profession dropdown + grouping. */
  const [availableFields, setAvailableFields] = useState<ManagedOption[]>([]);
  const [professionPrice, setProfessionPrice] = useState<CategoryPrice>(EMPTY_PROFESSION_PRICE);
  /** Additional per-region charge, kept separately from the four price cells. */
  const [extraCharges, setExtraCharges] = useState<ExtraCharges>(EMPTY_EXTRA_CHARGES);
  /** API id for each of the four price cells, so edits PATCH the right record. */
  const [priceIds, setPriceIds] = useState<Partial<Record<PriceSlotKey, string>>>({});
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<ManagedOption | null>(null);
  const [priceSide, setPriceSide] = useState<PriceSide | null>(null);
  const [pendingField, setPendingField] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  const isFieldScoped = activeTab === 'Profession';
  const hasApiList = activeTab in OPTION_TYPES || isFieldScoped;
  const addDisabled = isFieldScoped && availableFields.length === 0;

  const rows = options[activeTab];
  const filtered = useMemo(() => {
    if (!search.trim()) return rows;
    const q = search.toLowerCase();
    return rows.filter((o) => o.name.toLowerCase().includes(q));
  }, [rows, search]);

  /** Only fields that actually contain professions are rendered as sections. */
  const professionFields = useMemo(() => {
    const present = new Set(filtered.map((o) => o.field).filter(Boolean) as string[]);
    const ordered = availableFields.map((f) => f.name).filter((name) => present.has(name));
    filtered.forEach((o) => {
      if (o.field && !ordered.includes(o.field)) ordered.push(o.field);
    });
    return ordered;
  }, [filtered, availableFields]);

  const fetchFields = useCallback(async () => {
    const res = await api.get('/scientists/options/FIELD');
    const list = listFrom<Record<string, unknown>>(res).map(toOption);
    setAvailableFields(list);
    return list;
  }, []);

  /** Loads one tab from the API. */
  const fetchTab = useCallback(async (tab: ManageTab): Promise<ManagedOption[] | null> => {
    if (tab === 'Profession') {
      const fields = await fetchFields();
      const res = await api.get('/scientists/professions');
      return listFrom<Record<string, unknown>>(res).map((item) => toProfession(item, fields));
    }
    const type = OPTION_TYPES[tab];
    if (!type) return null;
    const res = await api.get(`/scientists/options/${type}`);
    const list = listFrom<Record<string, unknown>>(res).map(toOption);
    if (tab === 'Fields') setAvailableFields(list);
    return list;
  }, [fetchFields]);

  /**
   * Loads the four scientist price records and maps them into the UI cells.
   * The API stores prices in the smallest unit, so the raw value is kept and
   * the display helpers (`formatPrice` / `priceToInput`) divide by 100.
   */
  const fetchPrices = useCallback(async () => {
    const res = await api.get('/scientists/prices');
    const list = listFrom<Record<string, unknown>>(res);
    const price: CategoryPrice = {};
    const ids: Partial<Record<PriceSlotKey, string>> = {};
    const extra: ExtraCharges = { ...EMPTY_EXTRA_CHARGES };

    for (const item of list) {
      const location = String(item.location ?? '').toUpperCase().replace(/[^A-Z]/g, '');
      const type = String(item.type ?? '').toUpperCase().replace(/[^A-Z]/g, '');
      const isAfrican = location === 'AFRICAN';
      const isNonAfrican = location === 'NONAFRICAN';
      if (!isAfrican && !isNonAfrican) continue;

      const isMultiple = type === 'MULTIPLE';
      const key: PriceSlotKey = isAfrican
        ? (isMultiple ? 'africaTwoOrMore' : 'africaOne')
        : (isMultiple ? 'nonAfricaTwoOrMore' : 'nonAfricaOne');

      const raw = item.amountMinor
        ?? item.price
        ?? (typeof item.amount === 'number' ? Math.round(item.amount * 100) : undefined);
      price[key] = raw == null ? '' : String(raw);

      const extraCharge =
        item.extraChargeMinor
        ?? item.extra_charge_minor
        ?? item.extraCharge
        ?? item.extra_charge
        ?? item.additionalCharge;
      if (extraCharge != null) {
        if (isAfrican) extra.african = String(extraCharge);
        else extra.nonAfrican = String(extraCharge);
      }

      const id = item.id ?? item.scientistPriceId ?? item._id;
      if (id != null) ids[key] = String(id);
    }

    setProfessionPrice(price);
    setExtraCharges(extra);
    setPriceIds(ids);
    return price;
  }, []);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    const load: Promise<unknown> = activeTab === 'Price'
      ? fetchPrices()
      : fetchTab(activeTab).then((list) => {
        if (!cancelled && list) {
          setOptions((prev) => ({ ...prev, [activeTab]: list }));
        }
      });

    load
      .catch((err) => {
        if (!cancelled) toast.error(errorMessage(err));
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => { cancelled = true; };
  }, [activeTab, fetchTab, fetchPrices, reloadToken]);

  const refreshActiveTab = () => setReloadToken((t) => t + 1);

  const changeTab = (tab: ManageTab) => {
    setActiveTab(tab);
    setSearch('');
  };

  const handleSave = async (payload: SavePayload, isEdit: boolean, id?: string) => {
    setSaving(true);
    setSaveError(null);
    try {
      if (isFieldScoped) {
        const fieldName = payload.field ?? editing?.field ?? availableFields[0]?.name;
        const field = availableFields.find((f) => f.name === fieldName);
        if (!field) throw new Error('Add a field first, then create a profession under it.');
        const body = {
          name: payload.content,
          fieldId: field.id,
          isActive: payload.isActive ?? editing?.isActive ?? true,
        };
        if (isEdit && id) await api.patch(`/scientists/professions/${id}`, body);
        else await api.post('/scientists/professions', body);
      } else {
        const type = OPTION_TYPES[activeTab];
        if (!type) throw new Error('This tab is not supported yet.');
        const body = { name: payload.content, isActive: payload.isActive ?? editing?.isActive ?? true };
        if (isEdit && id) await api.patch(`/scientists/options/${type}/${id}`, body);
        else await api.post('/scientists/options', { ...body, type });
      }

      setDialogOpen(false);
      setEditing(null);
      setPendingField(null);
      if (hasApiList) refreshActiveTab();
      toast.success(`${TAB_SINGULAR[activeTab]} ${isEdit ? 'updated' : 'added'}.`);
    } catch (err) {
      const message = errorMessage(err);
      setSaveError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const nextActive = currentStatus !== 'Active';
    try {
      if (isFieldScoped) {
        await api.patch(`/scientists/professions/${id}/status`, { isActive: nextActive });
      } else {
        const type = OPTION_TYPES[activeTab];
        if (!type) {
          setOptions((prev) => ({
            ...prev,
            [activeTab]: prev[activeTab].map((o) => (o.id === id
              ? { ...o, status: nextActive ? 'Active' : 'Inactive', isActive: nextActive }
              : o)),
          }));
          return;
        }
        await api.patch(`/scientists/options/${type}/${id}/status`, { isActive: nextActive });
      }
      refreshActiveTab();
    } catch (err) {
      toast.error(errorMessage(err));
    }
  };

  const openCreate = () => {
    if (addDisabled) {
      toast.error('Add a field first, then add a profession under it.');
      return;
    }
    setEditing(null);
    setPendingField(null);
    setSaveError(null);
    setDialogOpen(true);
  };
  const openCreateUnder = (field: string) => {
    setEditing(null);
    setPendingField(field);
    setSaveError(null);
    setDialogOpen(true);
  };
  const openEdit = (opt: ManagedOption) => {
    setEditing(opt);
    setPendingField(null);
    setSaveError(null);
    setDialogOpen(true);
  };
  const closeDialog = () => {
    setDialogOpen(false);
    setEditing(null);
    setPendingField(null);
    setSaveError(null);
  };

  /**
   * Persists the two prices and the additional charge for one region. Values
   * arrive exactly as typed (no /100 or *100 conversion); existing records are
   * PATCHed by id, missing ones are POSTed. The location is preset by the side
   * whose button was clicked, so the modal never needs a location picker.
   */
  const handleSidePriceSave = async (
    side: PriceSide,
    values: { one?: string; twoOrMore?: string; extraCharge?: string },
  ) => {
    const isAfrican = side === 'african';
    const extraRaw = values.extraCharge?.trim();
    const parsedExtra = extraRaw ? Number(extraRaw) : 0;
    const extraCharge = Number.isFinite(parsedExtra) ? parsedExtra : 0;
    const entries: { key: PriceSlotKey; type: 'SINGLE' | 'MULTIPLE'; value?: string }[] = [
      { key: isAfrican ? 'africaOne' : 'nonAfricaOne', type: 'SINGLE', value: values.one },
      { key: isAfrican ? 'africaTwoOrMore' : 'nonAfricaTwoOrMore', type: 'MULTIPLE', value: values.twoOrMore },
    ];

    await Promise.all(
      entries.map(async ({ key, type, value }) => {
        if (value === undefined || value === '') return;
        const amount = Number(value);
        if (!Number.isFinite(amount)) return;

        const id = priceIds[key];
        if (id) {
          await api.patch(`/scientists/prices/${id}`, { price: amount, extraCharge });
        } else {
          await api.post('/scientists/prices', {
            location: isAfrican ? 'AFRICAN' : 'NON-AFRICAN',
            type,
            price: amount,
            extraCharge,
          });
        }
      }),
    );
    await fetchPrices();
  };

  const dialogInitial =
    editing ?? (pendingField ? { id: '', name: '', status: 'Active' as const, count: 0, field: pendingField } : null);

  return {
    activeTab,
    changeTab,
    rows,
    filtered,
    options,
    availableFields,
    professionFields,
    professionPrice,
    extraCharges,
    search,
    setSearch,
    isLoading,
    saving,
    saveError,
    isFieldScoped,
    addDisabled,
    dialogOpen,
    dialogInitial,
    priceSide,
    setPriceSide,
    handleSave,
    handleToggleStatus,
    openCreate,
    openCreateUnder,
    openEdit,
    closeDialog,
    handleSidePriceSave,
  };
}
