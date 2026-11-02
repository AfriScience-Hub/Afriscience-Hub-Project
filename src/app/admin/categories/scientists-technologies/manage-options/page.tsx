'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { cn, formatPrice } from '@/lib/utils';
import {
  ArrowLeft, Users, Search, Plus, LayoutGrid, GraduationCap,
  Briefcase, Wrench, Globe, Tag,
} from 'lucide-react';
import OptionsTable from '../../special-centres/manage-options/components/OptionsTable';
import FieldSections from '../../special-centres/manage-options/components/FieldSections';
import OptionDialog from '../../special-centres/manage-options/components/OptionDialog';
import CategoryPriceDialog from '../../special-centres/manage-options/components/CategoryPriceDialog';
import type { CategoryPrice } from '../../special-centres/manage-options/data';
import {
  MANAGE_TABS, TAB_DESCRIPTIONS, TAB_SINGULAR, SCIENTIST_FIELD_LIST,
  TABS_WITHOUT_NOTE, TABS_TABLE_PRICE, TABS_DIALOG_PRICE, TABS_WITH_CREATE_PRICE,
  SEED_OPTIONS,
  type ManageTab, type ManagedOption,
} from './data';

/** Default shared profession price, stored in the smallest unit. */
const SEED_PROFESSION_PRICE: CategoryPrice = {
  africaOne: '6000',
  africaTwoOrMore: '10000',
  nonAfricaOne: '15000',
  nonAfricaTwoOrMore: '22000',
};

const hasPriceValues = (p: CategoryPrice) =>
  Boolean(p.africaOne || p.africaTwoOrMore || p.nonAfricaOne || p.nonAfricaTwoOrMore);

/** Tabs whose options are grouped under collapsible Field sections. */
const FIELD_SCOPED: ManageTab[] = ['Profession'];

const TAB_ICONS: Record<ManageTab, React.ComponentType<{ className?: string }>> = {
  Fields: LayoutGrid,
  Profession: Wrench,
  Degree: GraduationCap,
  Services: Briefcase,
  Country: Globe,
};

export default function ScientistManageOptionsPage() {
  const [activeTab, setActiveTab] = useState<ManageTab>('Fields');
  const [options, setOptions] = useState<Record<ManageTab, ManagedOption[]>>(SEED_OPTIONS);
  const [professionPrice, setProfessionPrice] = useState<CategoryPrice>(SEED_PROFESSION_PRICE);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<ManagedOption | null>(null);
  const [priceDialogOpen, setPriceDialogOpen] = useState(false);
  /** Field pre-selected when "Add" is pressed inside a field section. */
  const [pendingField, setPendingField] = useState<string | null>(null);

  const showTablePrice = TABS_TABLE_PRICE.includes(activeTab);
  const showDialogPrice = TABS_DIALOG_PRICE.includes(activeTab);
  const showNote = !TABS_WITHOUT_NOTE.includes(activeTab);
  const showCreatePrice = TABS_WITH_CREATE_PRICE.includes(activeTab);
  const isFieldScoped = FIELD_SCOPED.includes(activeTab);

  const rows = options[activeTab];
  const filtered = useMemo(() => {
    if (!search.trim()) return rows;
    const q = search.toLowerCase();
    return rows.filter((o) => o.name.toLowerCase().includes(q));
  }, [rows, search]);

  const patchRows = (next: ManagedOption[]) => setOptions((prev) => ({ ...prev, [activeTab]: next }));

  const handleSave = (
    payload: { content: string; field?: string; notes?: string; price?: string },
    isEdit: boolean,
    id?: string
  ) => {
    if (isEdit && id) {
      patchRows(
        rows.map((o) => (o.id === id
          ? { ...o, name: payload.content, field: payload.field ?? o.field, note: payload.notes, price: payload.price ?? o.price }
          : o))
      );
    } else {
      patchRows([
        { id: `${activeTab}-${Date.now()}`, name: payload.content, field: payload.field, status: 'Active', isActive: true, count: 0, note: payload.notes, price: payload.price },
        ...rows,
      ]);
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
  /** Add button inside a field section pre-selects that field in the dialog. */
  const handleAddUnder = (field: string) => { setEditing(null); setPendingField(field); setDialogOpen(true); };
  const handleEdit = (opt: ManagedOption) => { setEditing(opt); setPendingField(null); setDialogOpen(true); };

  /** Saving the profession price updates the shared profession pricing display. */
  const handleProfessionPriceSave = (price: CategoryPrice) => {
    setProfessionPrice(price);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-gray-medium mb-4">
            <Link href="/admin/dashboard" className="hover:underline">Dashboard</Link>
            <span>›</span>
            <Link href="/admin/categories/scientists-technologies" className="hover:underline">Scientists &amp; Technologists</Link>
            <span>›</span>
            <span className="text-neutral-black font-medium">Manage Options</span>
          </div>
          <h1 className="text-xl font-bold text-neutral-black flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-600" />
            Manage Scientist Options
          </h1>
          <p className="text-xs text-neutral-black mt-1 max-w-2xl">
            Add, edit and organize the options that users will see when submitting a scientist or technologist listing and in filters on the public site.
          </p>
        </div>
        <Link
          href="/admin/categories/scientists-technologies"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-neutral-gray-light bg-white text-xs font-semibold hover:bg-neutral-bg-light shrink-0 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
      </div>

      <div className="rounded-xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
        <div className="border-b border-neutral-gray-light overflow-x-auto">
          <div className="flex gap-0 px-2">
            {MANAGE_TABS.map((tab) => {
              const Icon = TAB_ICONS[tab.id];
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setSearch(''); }}
                  className={cn(
                    'flex items-center gap-1.5 px-3.5 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors cursor-pointer',
                    isActive ? 'border-[#453DD8] text-[#453DD8]' : 'border-transparent text-neutral-gray-medium hover:text-neutral-black'
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {tab.label}
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
                {activeTab !== 'Country' ? (
                  <button
                    onClick={handleAdd}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#453DD8] text-white text-xs font-semibold hover:bg-[#3a33c0] cursor-pointer shrink-0"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add {TAB_SINGULAR[activeTab]}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      const row = options.Country[0];
                      if (row) {
                        setEditing(row);
                        setPendingField(null);
                        setDialogOpen(true);
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#453DD8] text-white text-xs font-semibold hover:bg-[#3a33c0] cursor-pointer shrink-0"
                  >
                    <Tag className="h-3.5 w-3.5" /> Set price
                  </button>
                )}
                {showCreatePrice && (
                  <button
                    onClick={() => setPriceDialogOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[#453DD8]/40 text-[#453DD8] bg-[#453DD8]/[0.06] text-xs font-semibold hover:bg-[#453DD8]/[0.12] cursor-pointer shrink-0"
                  >
                    <Tag className="h-3.5 w-3.5" /> Create price
                  </button>
                )}
              </div>
              <div className="relative flex-1 sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-gray-medium" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={`Search ${activeTab.toLowerCase()}...`}
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs focus:ring-2 focus:ring-[#453DD8] focus:border-[#453DD8] outline-none"
                />
              </div>
            </div>

            {activeTab === 'Profession' && (
              <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5 px-3.5 py-2.5 border-b border-neutral-gray-light bg-[#453DD8]/[0.04]">
                <span className="text-[11px] font-semibold text-[#453DD8]">Shared profession price</span>
                <span className="text-[11px] text-neutral-gray-dark">
                  African <span className="font-semibold text-neutral-black">{formatPrice(professionPrice.africaOne)}</span>
                  <span className="text-neutral-gray-medium"> · 2+ </span>
                  <span className="font-semibold text-neutral-black">{formatPrice(professionPrice.africaTwoOrMore)}</span>
                </span>
                <span className="text-[11px] text-neutral-gray-dark">
                  Non-African <span className="font-semibold text-neutral-black">{formatPrice(professionPrice.nonAfricaOne)}</span>
                  <span className="text-neutral-gray-medium"> · 2+ </span>
                  <span className="font-semibold text-neutral-black">{formatPrice(professionPrice.nonAfricaTwoOrMore)}</span>
                </span>
                <span className="text-[11px] text-emerald-700">Non-African listings also add the Country fee.</span>
                <button
                  onClick={() => setPriceDialogOpen(true)}
                  className="text-[11px] font-semibold text-[#453DD8] hover:underline cursor-pointer ml-auto"
                >
                  {hasPriceValues(professionPrice) ? 'Edit price' : 'Set price'}
                </button>
              </div>
            )}

            {activeTab === 'Country' && (
              <div className="px-3.5 py-2.5 border-b border-neutral-gray-light bg-amber-50/60">
                <p className="text-[11px] text-amber-800">
                  This fee is added on top of the profession price for non-African countries. African countries do not add a country fee.
                </p>
              </div>
            )}

            {isFieldScoped ? (
              <div className="p-3.5">
                <FieldSections
                  fields={SCIENTIST_FIELD_LIST}
                  options={filtered}
                  showPrice={showTablePrice}
                  categoryPrice={professionPrice}
                  priceGroup="both"
                  showNote={showNote}
                  singular={TAB_SINGULAR[activeTab]}
                  emptyHint={`No ${activeTab.toLowerCase()} added under this field yet.`}
                  onEdit={handleEdit}
                  onToggleStatus={handleToggleStatus}
                  onAddUnder={handleAddUnder}
                />
              </div>
            ) : (
              <OptionsTable
                options={filtered}
                showPrice={showTablePrice}
                priceMode="row"
                showNote={showNote}
                onEdit={handleEdit}
                onToggleStatus={handleToggleStatus}
              />
            )}

            <div className="px-4 py-2.5 border-t border-neutral-gray-light bg-neutral-bg-light/30">
              <p className="text-[11px] text-neutral-black">
                Showing {filtered.length} of {rows.length} {activeTab.toLowerCase()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <OptionDialog
        open={dialogOpen}
        onClose={() => { setDialogOpen(false); setEditing(null); setPendingField(null); }}
        onSave={handleSave}
        initial={editing ?? (pendingField ? { id: '', name: '', status: 'Active', count: 0, field: pendingField } : null)}
        tabLabel={activeTab}
        singular={TAB_SINGULAR[activeTab]}
        fieldOptions={isFieldScoped ? SCIENTIST_FIELD_LIST : undefined}
        showPrice={showDialogPrice}
        showNote={showNote}
        lockName={activeTab === 'Country'}
      />

      <CategoryPriceDialog
        open={priceDialogOpen}
        onClose={() => setPriceDialogOpen(false)}
        initial={professionPrice}
        onSave={handleProfessionPriceSave}
        title="profession"
      />
    </div>
  );
}
