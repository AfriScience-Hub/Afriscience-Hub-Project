'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, Lightbulb, Search, Plus, LayoutGrid, Heart, Flag, Users, Award, Tag, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MANAGE_TABS, TAB_DESCRIPTIONS, TAB_SINGULAR, tabTypeFor, TABS_WITHOUT_NOTE, type ManageTab, type ManagedOption } from './data';
import OptionsTable from './components/OptionsTable';
import OptionDialog from './components/OptionDialog';
import { api } from '@/lib/api';
import { toast } from 'sonner';

const TAB_ICONS: Record<ManageTab, React.ComponentType<{ className?: string }>> = {
  Fields: LayoutGrid,
  Interests: Heart,
  Stages: Flag,
  Ownership: Users,
  SDGs: Award,
  Price: Tag,
};

export default function ManageOptionsPage() {
  const [activeTab, setActiveTab] = useState<ManageTab>('Fields');
  const [options, setOptions] = useState<ManagedOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<ManagedOption | null>(null);
  const [priceDialogOpen, setPriceDialogOpen] = useState(false);
  const [price, setPrice] = useState('');
  const [priceSaving, setPriceSaving] = useState(false);
  const [currentPrice, setCurrentPrice] = useState<string | null>(null);
  const [priceLoading, setPriceLoading] = useState(false);

  const tabType = tabTypeFor(activeTab);

  const fetchOptions = useCallback(async () => {
    setLoading(true);
    try {
      const res: any = await api.get(`/listings/innovations/options?type=${tabType}`);
      const data = res?.data ?? res;
      const list = Array.isArray(data) ? data : (data?.options ?? []);
      setOptions(
        list.map((o: any) => ({
          id: o.id,
          name: o.content || o.name || '',
          status: o.isActive ? 'Active' : 'Inactive',
          isActive: o.isActive,
          count: o.count ?? 0,
          note: o.notes ?? undefined,
        }))
      );
    } catch {
      setOptions([]);
    } finally {
      setLoading(false);
    }
  }, [tabType]);

  useEffect(() => {
    fetchOptions();
  }, [fetchOptions]);

  const fetchPrice = useCallback(async () => {
    setPriceLoading(true);
    try {
      const res: any = await api.get('/listings/innovations/getPrice');
      const data = res?.data ?? res;
      if (typeof data === 'object' && data !== null) {
        if ('value' in data) {
          setCurrentPrice(String(data.value));
        } else if ('price' in data) {
          setCurrentPrice(String(data.price));
        } else {
          setCurrentPrice(null);
        }
      } else if (typeof data === 'number' || typeof data === 'string') {
        setCurrentPrice(String(data));
      } else {
        setCurrentPrice(null);
      }
    } catch {
      setCurrentPrice(null);
    } finally {
      setPriceLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'Price') {
      fetchPrice();
    }
  }, [activeTab, fetchPrice]);

  const filtered = options.filter((o) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return o.name.toLowerCase().includes(q);
  });

  const handleSave = async (payload: { content: string; type: string; notes?: string }, isEdit: boolean, id?: string) => {
    try {
      if (isEdit && id) {
        // Send the current active flag so editing a name/note never flips the
        // option back on (or off).
        const current = options.find((o) => o.id === id);
        await api.patch(`/listings/innovations/options/${id}`, {
          ...payload,
          type: tabType,
          ...(current?.isActive === undefined ? {} : { isActive: current.isActive }),
        });
        toast.success('Option updated');
      } else {
        await api.post('/listings/innovations/options', { ...payload, type: tabType });
        toast.success('Option added');
      }
      setDialogOpen(false);
      setEditing(null);
      fetchOptions();
    } catch (e: any) {
      toast.error(e?.message || 'Failed to save option');
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    // `currentStatus` is the status BEFORE the toggle, so the new state is the
    // opposite: deactivating an active option must send isActive: false.
    const isActive = currentStatus !== 'Active';
    try {
      await api.patch(`/listings/innovations/options/${id}/status`, { isActive });
      toast.success(`Option ${isActive ? 'activated' : 'deactivated'}`);
      fetchOptions();
    } catch (e: any) {
      toast.error(e?.message || 'Failed to update status');
    }
  };

  const handleAdd = () => {
    if (activeTab === 'Price') {
      setPrice('');
      setPriceDialogOpen(true);
    } else {
      setEditing(null);
      setDialogOpen(true);
    }
  };

  const handleEdit = (opt: ManagedOption) => {
    setEditing(opt);
    setDialogOpen(true);
  };

  const handlePriceSave = async () => {
    if (!price.trim()) {
      toast.error('Price is required');
      return;
    }
    setPriceSaving(true);
    try {
      await api.post('/listings/innovations/setPrice', { price: price.trim() });
      toast.success('Price updated successfully');
      setPriceDialogOpen(false);
      fetchPrice();
    } catch (e: any) {
      toast.error(e?.message || 'Failed to update price');
    } finally {
      setPriceSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-black mb-4">
            <Link href="/admin/dashboard" className="hover:underline">Dashboard</Link>
            <span>›</span>
            <Link href="/admin/categories/afro-innovations" className="hover:underline">Afro-Innovations</Link>
            <span>›</span>
            <span className="text-neutral-black font-medium">Manage Options</span>
          </div>
          <h1 className="text-xl font-bold text-neutral-black flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-purple-600" />
            Manage Afro-Innovation Options
          </h1>
          <p className="text-xs text-neutral-black mt-1 max-w-2xl">
            Add, edit and organize the options that users will see when submitting an innovation and in filters on the public site.
          </p>
        </div>
        <Link
          href="/admin/categories/afro-innovations"
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
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSearch('');
                  }}
                  className={cn(
                    'flex items-center gap-1.5 px-3.5 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors cursor-pointer',
                    isActive
                      ? 'border-[#453DD8] text-[#453DD8]'
                      : 'border-transparent text-neutral-gray-medium hover:text-neutral-black'
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
              <button
                onClick={handleAdd}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#453DD8] text-white text-xs font-semibold hover:bg-[#3a33c0] cursor-pointer shrink-0"
              >
                <Plus className="h-3.5 w-3.5" /> {activeTab === 'Price' ? 'Set Price' : `Add ${TAB_SINGULAR[activeTab]}`}
              </button>
              {activeTab !== 'Price' && (
                <div className="relative flex-1 sm:max-w-xs">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-gray-medium" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={`Search ${activeTab.toLowerCase()}...`}
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs focus:ring-2 focus:ring-[#453DD8] focus:border-[#453DD8] outline-none"
                  />
                </div>
              )}
            </div>

            {activeTab !== 'Price' ? (
              <>
                {loading ? (
                  <div className="p-8 text-center">
                    <div className="h-4 w-4 rounded-full border-2 border-neutral-gray-light border-t-brand-red-600 animate-spin mx-auto mb-2" />
                    <p className="text-xs text-neutral-gray-medium">Loading options...</p>
                  </div>
                ) : (
                  <>
                    <OptionsTable
                      options={filtered}
                      onEdit={handleEdit}
                      onToggleStatus={(id, currentStatus) => handleToggleStatus(id, currentStatus)}
                    />
                    <div className="px-4 py-2.5 border-t border-neutral-gray-light bg-neutral-bg-light/30">
                      <p className="text-[11px] text-neutral-black">
                        Showing {filtered.length} of {options.length} {activeTab.toLowerCase()}
                      </p>
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="p-4 text-center text-neutral-black">
                {priceLoading ? (
                  <p className="text-sm text-neutral-black">Loading current price...</p>
                ) : currentPrice ? (
                  <>
                    <p className="text-sm">Current price: <span className="font-semibold text-neutral-black">ASH { (Number(currentPrice) / 100).toLocaleString() }</span></p>
                    <p className="text-xs mt-1">Use the "Set Price" button above to update the innovation listing price.</p>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-neutral-black italic">No set price yet</p>
                    <p className="text-xs mt-1">Use the "Set Price" button above to set the innovation listing price.</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <OptionDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
        initial={editing}
        tabLabel={activeTab}
        tabType={tabType}
      />

      {/* Price Dialog */}
      {activeTab === 'Price' && priceDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setPriceDialogOpen(false)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-gray-light">
              <h3 className="text-sm font-bold text-neutral-black">Set Innovation Price</h3>
              <button onClick={() => setPriceDialogOpen(false)} className="h-8 w-8 rounded-full bg-neutral-bg-light hover:bg-neutral-gray-light flex items-center justify-center cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <label className="block space-y-1">
                <span className="text-xs font-semibold text-neutral-black">Price (ASH) *</span>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. 5000"
                  className="w-full px-3 py-2.5 rounded-xl border border-neutral-gray-light text-sm focus:ring-2 focus:ring-[#453DD8] focus:border-[#453DD8] outline-none"
                  autoFocus
                  min="0"
                  step="100"
                />
              </label>
            </div>
            <div className="flex gap-2 justify-end px-5 py-4 border-t border-neutral-gray-light">
              <button onClick={() => setPriceDialogOpen(false)} className="px-4 py-2 rounded-xl border border-neutral-gray-light text-xs font-semibold hover:bg-neutral-bg-light cursor-pointer">
                Cancel
              </button>
              <button onClick={handlePriceSave} disabled={!price.trim() || priceSaving} className="px-5 py-2 rounded-xl bg-[#453DD8] text-white text-xs font-semibold hover:bg-[#3a33c0] cursor-pointer disabled:opacity-50">
                {priceSaving ? 'Saving...' : 'Save Price'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
