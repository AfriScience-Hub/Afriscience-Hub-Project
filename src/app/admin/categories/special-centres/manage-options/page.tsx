'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { cn, formatPrice } from '@/lib/utils';
import {
  ArrowLeft, Microscope, Search, Plus, LayoutGrid, Layers, Briefcase,
  Users, Globe, Tag,
} from 'lucide-react';
import {
  MANAGE_TABS, TAB_DESCRIPTIONS, TAB_SINGULAR,
  TABS_WITHOUT_NOTE, TABS_TABLE_PRICE, TABS_DIALOG_PRICE, TABS_WITH_CREATE_PRICE,
  SEED_OPTIONS, SEED_CATEGORY_PRICE,
  type ManageTab, type ManagedOption, type CategoryPrice,
} from './data';
import OptionsTable from './components/OptionsTable';
import OptionDialog from './components/OptionDialog';
import CategoryPriceDialog from './components/CategoryPriceDialog';

const hasPriceValues = (p: CategoryPrice) =>
  Boolean(p.africaOne || p.africaTwoOrMore || p.nonAfricaOne || p.nonAfricaTwoOrMore);

const TAB_ICONS: Record<ManageTab, React.ComponentType<{ className?: string }>> = {
  Fields: LayoutGrid,
  Categories: Layers,
  Services: Briefcase,
  Ownership: Users,
  Country: Globe,
};

export default function ManageOptionsPage() {
  const [activeTab, setActiveTab] = useState<ManageTab>('Fields');
  const [options, setOptions] = useState<Record<ManageTab, ManagedOption[]>>(SEED_OPTIONS);
  const [categoryPrice, setCategoryPrice] = useState<CategoryPrice>(SEED_CATEGORY_PRICE);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<ManagedOption | null>(null);
  const [priceDialogOpen, setPriceDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState<{ id: string; name: string } | null>(null);

  const showTablePrice = TABS_TABLE_PRICE.includes(activeTab);
  const showDialogPrice = TABS_DIALOG_PRICE.includes(activeTab);
  const showNote = !TABS_WITHOUT_NOTE.includes(activeTab);
  const showCreatePrice = TABS_WITH_CREATE_PRICE.includes(activeTab);

  const rows = options[activeTab];
  const filtered = useMemo(() => {
    if (!search.trim()) return rows;
    const q = search.toLowerCase();
    return rows.filter((o) => o.name.toLowerCase().includes(q));
  }, [rows, search]);

  const patchRows = (next: ManagedOption[]) => setOptions((prev) => ({ ...prev, [activeTab]: next }));

  const handleSave = async (
    payload: { content: string; notes?: string; price?: string },
    isEdit: boolean,
    id?: string
  ) => {
    if (isEdit && id) {
      patchRows(
        rows.map((o) => (o.id === id
          ? { ...o, name: payload.content, note: payload.notes, price: payload.price ?? o.price }
          : o))
      );
      setDialogOpen(false);
      setEditing(null);
    } else {
      patchRows([
        { id: `${activeTab}-${Date.now()}`, name: payload.content, status: 'Active', isActive: true, count: 0, note: payload.notes, price: payload.price },
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

  const handleAdd = () => { setEditing(null); setDialogOpen(true); };
  const handleEdit = (opt: ManagedOption) => { setEditing(opt); setDialogOpen(true); };

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

          <div className="rounded-xl border border-neutral-gray-light bg-white overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-3 py-3 border-b border-neutral-gray-light bg-neutral-bg-light/40">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAdd}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#453DD8] text-white text-xs font-semibold hover:bg-[#3a33c0] cursor-pointer shrink-0"
                >
                  <Plus className="h-3.5 w-3.5" /> Add {TAB_SINGULAR[activeTab]}
                </button>
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

            {showTablePrice && activeTab === 'Categories' && (
              <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5 px-3.5 py-2.5 border-b border-neutral-gray-light bg-[#453DD8]/[0.04]">
                <span className="text-[11px] font-semibold text-[#453DD8]">Shared category price</span>
                <span className="text-[11px] text-neutral-gray-dark">
                  African <span className="font-semibold text-neutral-black">{formatPrice(categoryPrice.africaOne)}</span>
                  <span className="text-neutral-gray-medium"> · 2+ </span>
                  <span className="font-semibold text-neutral-black">{formatPrice(categoryPrice.africaTwoOrMore)}</span>
                </span>
                <span className="text-[11px] text-neutral-gray-dark">
                  Non-African <span className="font-semibold text-neutral-black">{formatPrice(categoryPrice.nonAfricaOne)}</span>
                  <span className="text-neutral-gray-medium"> · 2+ </span>
                  <span className="font-semibold text-neutral-black">{formatPrice(categoryPrice.nonAfricaTwoOrMore)}</span>
                </span>
                <button
                  onClick={() => setPriceDialogOpen(true)}
                  className="text-[11px] font-semibold text-[#453DD8] hover:underline cursor-pointer ml-auto"
                >
                  {hasPriceValues(categoryPrice) ? 'Edit price' : 'Create price'}
                </button>
              </div>
            )}

            <OptionsTable
              options={filtered}
              showPrice={showTablePrice}
              priceMode={activeTab === 'Categories' ? 'scheme' : 'row'}
              categoryPrice={categoryPrice}
              showNote={showNote}
              onEdit={handleEdit}
              onDelete={(id, name) => setDeleting({ id, name })}
              onToggleStatus={handleToggleStatus}
            />

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
        onClose={() => { setDialogOpen(false); setEditing(null); }}
        onSave={handleSave}
        initial={editing}
        tabLabel={activeTab}
        singular={TAB_SINGULAR[activeTab]}
        showPrice={showDialogPrice}
        showNote={showNote}
      />

      <CategoryPriceDialog
        open={priceDialogOpen}
        onClose={() => setPriceDialogOpen(false)}
        initial={categoryPrice}
        onSave={handleCategoryPriceSave}
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
