'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, Lightbulb, Search, Plus, LayoutGrid, Heart, Flag, Users, Award, Globe, Tag, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MANAGE_TABS, DUMMY_OPTIONS, TAB_DESCRIPTIONS } from './data';
import type { ManageTab, ManagedOption } from './data';
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
  Countries: Globe,
  Price: Tag,
};

export default function ManageOptionsPage() {
  const [activeTab, setActiveTab] = useState<ManageTab>('Fields');
  const [data, setData] = useState(DUMMY_OPTIONS);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<ManagedOption | null>(null);
  const [priceDialogOpen, setPriceDialogOpen] = useState(false);
  const [price, setPrice] = useState('');
  const [priceSaving, setPriceSaving] = useState(false);
  const [currentPrice, setCurrentPrice] = useState<string | null>(null);
  const [priceLoading, setPriceLoading] = useState(false);

  const fetchPrice = useCallback(async () => {
    setPriceLoading(true);
    try {
      const res: any = await api.get('/listings/innovations/admin/getPrice');
      const data = res?.data ?? res;
      if (typeof data === 'object' && data !== null) {
        // API returns { value: "555", key: "afro_innovation_listing_fee", ... }
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

  const filtered = useMemo(() => {
    const list = data[activeTab] ?? [];
    if (!search.trim()) return list;
    const q = search.toLowerCase();
    return list.filter((o) => o.name.toLowerCase().includes(q));
  }, [data, activeTab, search]);

  const handleSave = (opt: ManagedOption) => {
    setData((prev) => {
      const list = prev[activeTab];
      const exists = list.some((o) => o.id === opt.id);
      return {
        ...prev,
        [activeTab]: exists ? list.map((o) => (o.id === opt.id ? opt : o)) : [...list, opt],
      };
    });
  };

  const handleToggleStatus = (id: string) => {
    setData((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab].map((o) => (o.id === id ? { ...o, status: o.status === 'Active' ? 'Inactive' : 'Active' } : o)),
    }));
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
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-gray-medium mb-4">
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
          <p className="text-xs text-neutral-gray-medium mt-1 max-w-2xl">
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
          <p className="text-xs text-neutral-gray-medium mb-4">
            <span className="font-semibold text-neutral-black">{activeTab}</span> — {TAB_DESCRIPTIONS[activeTab]}
          </p>

          <div className="rounded-xl border border-neutral-gray-light bg-white overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-3 py-3 border-b border-neutral-gray-light bg-neutral-bg-light/40">
              <button
                onClick={handleAdd}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#453DD8] text-white text-xs font-semibold hover:bg-[#3a33c0] cursor-pointer shrink-0"
              >
                <Plus className="h-3.5 w-3.5" /> {activeTab === 'Price' ? 'Set Price' : `Add ${activeTab.slice(0, -1) || activeTab}`}
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
                <OptionsTable options={filtered} onEdit={handleEdit} onToggleStatus={handleToggleStatus} />
                <div className="px-4 py-2.5 border-t border-neutral-gray-light bg-neutral-bg-light/30">
                  <p className="text-[11px] text-neutral-gray-medium">
                    Showing {filtered.length} of {data[activeTab].length} {activeTab.toLowerCase()}
                  </p>
                </div>
              </>
            ) : (
              <div className="p-4 text-center text-neutral-gray-medium">
                {priceLoading ? (
                  <p className="text-sm text-neutral-gray-medium">Loading current price...</p>
                ) : currentPrice ? (
                  <>
                    <p className="text-sm">Current price: <span className="font-semibold text-neutral-black">₦{Number(currentPrice).toLocaleString()}</span></p>
                    <p className="text-xs mt-1">Use the "Set Price" button above to update the innovation listing price.</p>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-neutral-gray-medium italic">No set price yet</p>
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
                <span className="text-xs font-semibold text-neutral-black">Price (NGN) *</span>
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