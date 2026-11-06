'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  ArrowLeft, Microscope, Search, Plus, LayoutGrid, Layers, Briefcase,
  Users, Globe, Tag,
} from 'lucide-react';
import {
  MANAGE_TABS, TAB_DESCRIPTIONS, TAB_SINGULAR, CENTRE_FIELDS,
  TABS_WITHOUT_NOTE, TABS_TABLE_PRICE, TABS_DIALOG_PRICE,
  SEED_OPTIONS, SEED_CATEGORY_PRICE,
  type ManageTab, type ManagedOption, type CategoryPrice,
} from './data';
import OptionsTable from './components/OptionsTable';
import FieldSections from './components/FieldSections';
import OptionDialog from './components/OptionDialog';
import PriceSideDialog, { type PriceSide } from './components/PriceSideDialog';
import SplitPricingTable from './components/SplitPricingTable';
import { usePersistentTab } from '@/lib/usePersistentTab';

/** Tabs whose options are grouped under collapsible Field sections. */
const FIELD_SCOPED: ManageTab[] = ['Categories', 'Services'];
const TAB_IDS = MANAGE_TABS.map((tab) => tab.id);

const TAB_ICONS: Record<ManageTab, React.ComponentType<{ className?: string }>> = {
  Fields: LayoutGrid,
  Categories: Layers,
  Services: Briefcase,
  Ownership: Users,
  Price: Tag,
  Country: Globe,
};

export default function ManageOptionsPage() {
  const [activeTab, setActiveTab] = usePersistentTab<ManageTab>(
    'admin:special-centres-manage-options:tab',
    TAB_IDS,
    'Fields',
  );
  const [options, setOptions] = useState<Record<ManageTab, ManagedOption[]>>(SEED_OPTIONS);
  const [categoryPrice, setCategoryPrice] = useState<CategoryPrice>(SEED_CATEGORY_PRICE);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<ManagedOption | null>(null);
  const [priceSide, setPriceSide] = useState<PriceSide | null>(null);
  const [deleting, setDeleting] = useState<{ id: string; name: string } | null>(null);
  /** Field pre-selected when "Add" is pressed inside a field section. */
  const [pendingField, setPendingField] = useState<string | null>(null);

  const showTablePrice = TABS_TABLE_PRICE.includes(activeTab);
  const showDialogPrice = TABS_DIALOG_PRICE.includes(activeTab);
  const showNote = !TABS_WITHOUT_NOTE.includes(activeTab);
  const isFieldScoped = FIELD_SCOPED.includes(activeTab);

  const rows = options[activeTab];
  const filtered = useMemo(() => {
    if (!search.trim()) return rows;
    const q = search.toLowerCase();
    return rows.filter((o) => o.name.toLowerCase().includes(q));
  }, [rows, search]);

  const patchRows = (next: ManagedOption[]) => setOptions((prev) => ({ ...prev, [activeTab]: next }));

  const handleSave = async (
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
      setDialogOpen(false);
      setEditing(null);
    } else {
      patchRows([
        { id: `${activeTab}-${Date.now()}`, name: payload.content, field: payload.field, status: 'Active', isActive: true, count: 0, note: payload.notes, price: payload.price },
        ...rows,
      ]);
      setDialogOpen(false);
      setEditing(null);
    }
  };

  const handleToggleStatus = (id: string, currentStatus: string) => {
    const nextActive = currentStatus !== 'Active';
    patchRows(rows.map((o) => (o.id === id ? { ...o, status: nextActive ? 'Active' : 'Inactive', isActive: nextActive } : o)));
  };

  const handleAdd = () => { setEditing(null); setPendingField(null); setDialogOpen(true); };
  /** Add button inside a field section pre-selects that field in the dialog. */
  const handleAddUnder = (field: string) => { setEditing(null); setPendingField(field); setDialogOpen(true); };
  const handleEdit = (opt: ManagedOption) => { setEditing(opt); setPendingField(null); setDialogOpen(true); };

  /** Saving the category price also refreshes the per-group Country prices. */
  const handleCategoryPriceSave = (price: CategoryPrice) => {
    setCategoryPrice(price);
    setOptions((prev) => ({
      ...prev,
      Country: prev.Country.map((row) => ({
        ...row,
        price: row.id === 'k-1' ? price.africaOne : row.id === 'k-2' ? price.nonAfricaOne : row.price,
      })),
    }));
  };

  const handleSidePriceSave = (
    side: PriceSide,
    values: { one?: string; twoOrMore?: string },
  ) => {
    const next: CategoryPrice = { ...categoryPrice };
    if (side === 'african') {
      next.africaOne = values.one;
      next.africaTwoOrMore = values.twoOrMore;
    } else {
      next.nonAfricaOne = values.one;
      next.nonAfricaTwoOrMore = values.twoOrMore;
    }
    handleCategoryPriceSave(next);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-gray-medium mb-4">
            <Link href="/admin/dashboard" className="hover:underline">Dashboard</Link>
            <span>›</span>
            <Link href="/admin/categories/special-centres" className="hover:underline">Specialist Centers</Link>
            <span>›</span>
            <span className="text-neutral-black font-medium">Manage Options</span>
          </div>
          <h1 className="text-xl font-bold text-neutral-black flex items-center gap-2">
            <Microscope className="h-5 w-5 text-purple-600" />
            Manage Specialist Center Options
          </h1>
          <p className="text-xs text-neutral-black mt-1 max-w-2xl">
            Add, edit and organize the options that users will see when listing a specialist centre and in filters on the public site.
          </p>
        </div>
        <Link
          href="/admin/categories/special-centres"
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

          {activeTab === 'Price' ? (
            <SplitPricingTable
              price={categoryPrice}
              itemNoun="category"
              itemNounPlural="categories"
              africanTitle="African Specialist Centres"
              nonAfricanTitle="Non-African Specialist Centres"
              footnote="Non-African specialist centre listings also add the Country fee configured under the Country tab."
              onEditAfrican={() => setPriceSide('african')}
              onEditNonAfrican={() => setPriceSide('nonAfrican')}
            />
          ) : (
            <div className="rounded-xl border border-neutral-gray-light bg-white overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-3 py-3 border-b border-neutral-gray-light bg-neutral-bg-light/40">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAdd}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#453DD8] text-white text-xs font-semibold hover:bg-[#3a33c0] cursor-pointer shrink-0"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add {TAB_SINGULAR[activeTab]}
                  </button>
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

              {isFieldScoped ? (
                <div className="p-3.5">
                  <FieldSections
                    fields={CENTRE_FIELDS}
                    options={filtered}
                    showPrice={false}
                    showNote={showNote}
                    singular={TAB_SINGULAR[activeTab]}
                    emptyHint={`No ${activeTab.toLowerCase()} added under this field yet.`}
                    onEdit={handleEdit}
                    onDelete={(id, name) => setDeleting({ id, name })}
                    onToggleStatus={handleToggleStatus}
                    onAddUnder={handleAddUnder}
                  />
                </div>
              ) : (
                <OptionsTable
                  options={filtered}
                  showPrice={showTablePrice}
                  priceMode="row"
                  categoryPrice={categoryPrice}
                  showNote={showNote}
                  onEdit={handleEdit}
                  onDelete={(id, name) => setDeleting({ id, name })}
                  onToggleStatus={handleToggleStatus}
                />
              )}

              <div className="px-4 py-2.5 border-t border-neutral-gray-light bg-neutral-bg-light/30">
                <p className="text-[11px] text-neutral-black">
                  Showing {filtered.length} of {rows.length} {activeTab.toLowerCase()}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <OptionDialog
        open={dialogOpen}
        onClose={() => { setDialogOpen(false); setEditing(null); setPendingField(null); }}
        onSave={handleSave}
        initial={editing ?? (pendingField ? { id: '', name: '', status: 'Active', count: 0, field: pendingField } : null)}
        tabLabel={activeTab}
        singular={TAB_SINGULAR[activeTab]}
        fieldOptions={isFieldScoped ? CENTRE_FIELDS : undefined}
        showPrice={showDialogPrice}
        showNote={showNote}
      />

      <PriceSideDialog
        open={priceSide !== null}
        side={priceSide}
        one={priceSide === 'nonAfrican' ? categoryPrice.nonAfricaOne : categoryPrice.africaOne}
        twoOrMore={priceSide === 'nonAfrican' ? categoryPrice.nonAfricaTwoOrMore : categoryPrice.africaTwoOrMore}
        itemNoun="category"
        onClose={() => setPriceSide(null)}
        onSave={handleSidePriceSave}
      />

      {deleting && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setDeleting(null)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="px-5 py-4 border-b border-neutral-gray-light">
              <h3 className="text-sm font-bold text-neutral-black">Delete option</h3>
            </div>
            <div className="p-5 space-y-4">
              <p className="text-sm text-neutral-gray-dark">
                Are you sure you want to delete{' '}
                <span className="font-semibold text-neutral-black">{deleting.name}</span>?
                This option will be removed from the list and can no longer be selected by users.
              </p>
            </div>
            <div className="flex gap-2 justify-end px-5 py-4 border-t border-neutral-gray-light">
              <button
                onClick={() => setDeleting(null)}
                className="px-4 py-2 rounded-xl border border-neutral-gray-light text-xs font-semibold hover:bg-neutral-bg-light cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => { patchRows(rows.filter((o) => o.id !== deleting.id)); setDeleting(null); }}
                className="px-5 py-2 rounded-xl bg-brand-red-600 text-white text-xs font-semibold hover:bg-brand-red-700 cursor-pointer inline-flex items-center gap-1.5"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
