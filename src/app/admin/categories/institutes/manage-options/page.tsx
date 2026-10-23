'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { cn, formatPrice } from '@/lib/utils';
import {
  ArrowLeft, Building2, Search, Plus, LayoutGrid, GraduationCap,
  Briefcase, Wrench, Globe, Tag, Users, BookOpen, Layers,
} from 'lucide-react';
import OptionsTable from '../../special-centres/manage-options/components/OptionsTable';
import FieldSections from '../../special-centres/manage-options/components/FieldSections';
import OptionDialog from '../../special-centres/manage-options/components/OptionDialog';
import CategoryPriceDialog from '../../special-centres/manage-options/components/CategoryPriceDialog';
import type { CategoryPrice } from '../../special-centres/manage-options/data';
import ConfirmDelete from '../../special-centres/manage-options/components/ConfirmDelete';
import {
  TABS_BY_GROUP, TAB_DESCRIPTIONS, TAB_SINGULAR, OWNERSHIP_BY_GROUP,
  TABS_WITHOUT_NOTE, TABS_TABLE_PRICE, TABS_DIALOG_PRICE, TABS_WITH_CREATE_PRICE, FIELD_SCOPED,
  SEED_OPTIONS, SEED_OWNERSHIP_PRICE,
  type InstituteGroup, type ManageTab, type ManagedOption,
} from './data';

const GROUPS: { id: InstituteGroup; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'primary-secondary', label: 'Primary & Secondary', icon: GraduationCap },
  { id: 'university', label: 'University', icon: Building2 },
];

const hasPriceValues = (p: CategoryPrice) =>
  Boolean(p.africaOne || p.africaTwoOrMore || p.nonAfricaOne || p.nonAfricaTwoOrMore);

const TAB_ICONS: Record<ManageTab, React.ComponentType<{ className?: string }>> = {
  Class: Layers,
  Program: BookOpen,
  Gender: Users,
  Ownership: Wrench,
  Services: Briefcase,
  Country: Globe,
  Faculties: Layers,
  'Program Levels': GraduationCap,
};

/** Institute Manage Options, grouped by institute type then by option tab. */
export default function InstituteManageOptionsPage() {
  const [group, setGroup] = useState<InstituteGroup>('primary-secondary');
  const [activeTab, setActiveTab] = useState<ManageTab>('Class');
  const [options, setOptions] = useState<Record<InstituteGroup, Record<ManageTab, ManagedOption[]>>>(SEED_OPTIONS);
  const [ownershipPrice, setOwnershipPrice] = useState<Record<InstituteGroup, CategoryPrice>>(SEED_OWNERSHIP_PRICE);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<ManagedOption | null>(null);
  const [priceDialogOpen, setPriceDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState<{ id: string; name: string } | null>(null);
  const [pendingField, setPendingField] = useState<string | null>(null);

  const tabs = TABS_BY_GROUP[group];
  const owners = OWNERSHIP_BY_GROUP[group];

  const showTablePrice = TABS_TABLE_PRICE.includes(activeTab);
  const showDialogPrice = TABS_DIALOG_PRICE.includes(activeTab);
  const showNote = !TABS_WITHOUT_NOTE.includes(activeTab);
  const showCreatePrice = TABS_WITH_CREATE_PRICE.includes(activeTab);
  const isFieldScoped = FIELD_SCOPED.includes(activeTab);
  const price = ownershipPrice[group];

  const rows = options[group][activeTab];
  const filtered = useMemo(() => {
    if (!search.trim()) return rows;
    const q = search.toLowerCase();
    return rows.filter((o) => o.name.toLowerCase().includes(q));
  }, [rows, search]);

  const patchRows = (next: ManagedOption[]) =>
    setOptions((prev) => ({ ...prev, [group]: { ...prev[group], [activeTab]: next } }));

  const handleSave = (
    payload: { content: string; field?: string; notes?: string; price?: string },
    isEdit: boolean,
    id?: string
  ) => {
    if (isEdit && id) {
      patchRows(rows.map((o) => (o.id === id ? { ...o, name: payload.content, field: payload.field ?? o.field, note: payload.notes, price: payload.price ?? o.price } : o)));
    } else {
      patchRows([{ id: `${activeTab}-${Date.now()}`, name: payload.content, field: payload.field, status: 'Active', isActive: true, count: 0, note: payload.notes, price: payload.price }, ...rows]);
    }
    setDialogOpen(false);
    setEditing(null);
    setPendingField(null);
  };

  const handleToggleStatus = (id: string, currentStatus: string) => {
    const nextActive = currentStatus !== 'Active';
    patchRows(rows.map((o) => (o.id === id ? { ...o, status: nextActive ? 'Active' : 'Inactive', isActive: nextActive } : o)));
  };

  const handleAdd = () => { setEditing(null); setPendingField(null); setDialogOpen(true); };
  const handleAddUnder = (field: string) => { setEditing(null); setPendingField(field); setDialogOpen(true); };
  const handleEdit = (opt: ManagedOption) => { setEditing(opt); setPendingField(null); setDialogOpen(true); };

  const handleOwnershipPriceSave = (next: CategoryPrice) => {
    setOwnershipPrice((prev) => ({ ...prev, [group]: next }));
    setOptions((prev) => ({
      ...prev,
      [group]: {
        ...prev[group],
        Country: prev[group].Country.map((row) => ({
          ...row,
          price: row.id.endsWith('1') ? next.africaOne : row.id.endsWith('2') ? next.nonAfricaOne : row.price,
        })),
      },
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-gray-medium mb-4">
            <Link href="/admin/dashboard" className="hover:underline">Dashboard</Link><span>›</span>
            <Link href="/admin/categories/institutes" className="hover:underline">Institutes</Link><span>›</span>
            <span className="text-neutral-black font-medium">Manage Options</span>
          </div>
          <h1 className="text-xl font-bold text-neutral-black flex items-center gap-2">
            <Building2 className="h-5 w-5 text-purple-600" />
            Manage Institute Options
          </h1>
          <p className="text-xs text-neutral-black mt-1 max-w-2xl">
            Add, edit and organize the options that users will see when submitting an institute listing and in filters on the public site.
          </p>
        </div>
        <Link href="/admin/categories/institutes" className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-neutral-gray-light bg-white text-xs font-semibold hover:bg-neutral-bg-light shrink-0 cursor-pointer">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-neutral-gray-light pb-3">
        {GROUPS.map((g) => {
          const Icon = g.icon;
          const active = group === g.id;
          return (
            <button key={g.id} onClick={() => { setGroup(g.id); setActiveTab(TABS_BY_GROUP[g.id][0]); setSearch(''); }}
              className={cn('inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition-colors',
                active ? 'border-[#453DD8] bg-[#453DD8]/[0.07] text-[#453DD8]' : 'border-neutral-gray-light bg-white text-neutral-gray-medium hover:text-neutral-black')}>
              <Icon className="h-4 w-4" /> {g.label}
            </button>
          );
        })}
      </div>

      <div className="rounded-xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
        <div className="border-b border-neutral-gray-light overflow-x-auto">
          <div className="flex gap-0 px-2">
            {tabs.map((tabId) => {
              const Icon = TAB_ICONS[tabId];
              const isActive = activeTab === tabId;
              return (
                <button key={tabId} onClick={() => { setActiveTab(tabId); setSearch(''); }}
                  className={cn('flex items-center gap-1.5 px-3.5 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors cursor-pointer',
                    isActive ? 'border-[#453DD8] text-[#453DD8]' : 'border-transparent text-neutral-gray-medium hover:text-neutral-black')}>
                  <Icon className="h-3.5 w-3.5" /> {tabId}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <p className="text-xs text-neutral-black mb-4">
            <span className="font-semibold text-neutral-black">{activeTab}</span> — {TAB_DESCRIPTIONS[activeTab]}
          </p>

          <div className="rounded-xl border border-neutral-gray-light bg-white overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-3 py-3 border-b border-neutral-gray-light bg-neutral-bg-light/40">
              <div className="flex items-center gap-2">
                <button onClick={handleAdd} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#453DD8] text-white text-xs font-semibold hover:bg-[#3a33c0] cursor-pointer shrink-0">
                  <Plus className="h-3.5 w-3.5" /> Add {TAB_SINGULAR[activeTab]}
                </button>
                {showCreatePrice && (
                  <button onClick={() => setPriceDialogOpen(true)} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[#453DD8]/40 text-[#453DD8] bg-[#453DD8]/[0.06] text-xs font-semibold hover:bg-[#453DD8]/[0.12] cursor-pointer shrink-0">
                    <Tag className="h-3.5 w-3.5" /> Create price
                  </button>
                )}
              </div>
              <div className="relative flex-1 sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-gray-medium" />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={`Search ${activeTab.toLowerCase()}...`}
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs focus:ring-2 focus:ring-[#453DD8] focus:border-[#453DD8] outline-none" />
              </div>
            </div>

            {activeTab === 'Ownership' && (
              <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5 px-3.5 py-2.5 border-b border-neutral-gray-light bg-[#453DD8]/[0.04]">
                <span className="text-[11px] font-semibold text-[#453DD8]">Shared ownership price</span>
                <span className="text-[11px] text-neutral-gray-dark">
                  African <span className="font-semibold text-neutral-black">{formatPrice(price.africaOne)}</span>
                  <span className="text-neutral-gray-medium"> · 2+ </span>
                  <span className="font-semibold text-neutral-black">{formatPrice(price.africaTwoOrMore)}</span>
                </span>
                <span className="text-[11px] text-neutral-gray-dark">
                  Non-African <span className="font-semibold text-neutral-black">{formatPrice(price.nonAfricaOne)}</span>
                  <span className="text-neutral-gray-medium"> · 2+ </span>
                  <span className="font-semibold text-neutral-black">{formatPrice(price.nonAfricaTwoOrMore)}</span>
                </span>
                <button onClick={() => setPriceDialogOpen(true)} className="text-[11px] font-semibold text-[#453DD8] hover:underline cursor-pointer ml-auto">
                  {hasPriceValues(price) ? 'Edit price' : 'Create price'}
                </button>
              </div>
            )}

            {isFieldScoped ? (
              <div className="p-3.5">
                <FieldSections fields={owners} options={filtered} showPrice={false} showNote={false}
                  singular={TAB_SINGULAR[activeTab]} emptyHint={`No ${activeTab.toLowerCase()} added under this ownership yet.`}
                  onEdit={handleEdit} onDelete={(id, name) => setDeleting({ id, name })} onToggleStatus={handleToggleStatus} onAddUnder={handleAddUnder} />
              </div>
            ) : (
              <OptionsTable options={filtered} showPrice={showTablePrice} priceMode={activeTab === 'Country' ? 'row' : 'scheme'}
                categoryPrice={price} showNote={showNote} onEdit={handleEdit} onDelete={(id, name) => setDeleting({ id, name })} onToggleStatus={handleToggleStatus} />
            )}

            <div className="px-4 py-2.5 border-t border-neutral-gray-light bg-neutral-bg-light/30">
              <p className="text-[11px] text-neutral-black">Showing {filtered.length} of {rows.length} {activeTab.toLowerCase()}</p>
            </div>
          </div>
        </div>
      </div>

      <OptionDialog open={dialogOpen} onClose={() => { setDialogOpen(false); setEditing(null); setPendingField(null); }} onSave={handleSave}
        initial={editing ?? (pendingField ? { id: '', name: '', status: 'Active', count: 0, field: pendingField } : null)}
        tabLabel={activeTab} singular={TAB_SINGULAR[activeTab]}
        fieldOptions={activeTab === 'Services' ? owners : undefined} showPrice={showDialogPrice} showNote={showNote} />

      <CategoryPriceDialog open={priceDialogOpen} onClose={() => setPriceDialogOpen(false)} initial={price} onSave={handleOwnershipPriceSave} title="ownership" />

      <ConfirmDelete open={!!deleting} name={deleting?.name ?? ''} onCancel={() => setDeleting(null)}
        onConfirm={() => { patchRows(rows.filter((o) => o.id !== deleting?.id)); setDeleting(null); }} />
    </div>
  );
}
