'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Lightbulb, Search, Plus, LayoutGrid, Heart, Flag, Users, Award, Globe, PackageCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MANAGE_TABS, DUMMY_OPTIONS, TAB_DESCRIPTIONS } from './data';
import type { ManageTab, ManagedOption } from './data';
import OptionsTable from './components/OptionsTable';
import OptionDialog from './components/OptionDialog';

const TAB_ICONS: Record<ManageTab, React.ComponentType<{ className?: string }>> = {
  Fields: LayoutGrid,
  Interests: Heart,
  Stages: Flag,
  Ownership: Users,
  SDGs: Award,
  Countries: Globe,
  Availability: PackageCheck,
};

export default function ManageOptionsPage() {
  const [activeTab, setActiveTab] = useState<ManageTab>('Fields');
  const [data, setData] = useState(DUMMY_OPTIONS);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<ManagedOption | null>(null);

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
    setEditing(null);
    setDialogOpen(true);
  };

  const handleEdit = (opt: ManagedOption) => {
    setEditing(opt);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-gray-medium mb-1">
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
                <Plus className="h-3.5 w-3.5" /> Add {activeTab.slice(0, -1) || activeTab}
              </button>
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

            <OptionsTable options={filtered} onEdit={handleEdit} onToggleStatus={handleToggleStatus} />

            <div className="px-4 py-2.5 border-t border-neutral-gray-light bg-neutral-bg-light/30">
              <p className="text-[11px] text-neutral-gray-medium">
                Showing {filtered.length} of {data[activeTab].length} {activeTab.toLowerCase()}
              </p>
            </div>
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
    </div>
  );
}
