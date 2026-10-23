'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Building2, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';
import SchoolsTab from './components/SchoolsTab';
import UniversitiesTab from './components/UniversitiesTab';

type TabId = 'primary-secondary' | 'university';

const TABS: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'primary-secondary', label: 'Primary & Secondary', icon: GraduationCap },
  { id: 'university', label: 'Universities', icon: Building2 },
];

/** All Institutes listing, split by institute sub-type. */
export default function AllInstitutesPage() {
  const [tab, setTab] = useState<TabId>('primary-secondary');

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-gray-medium mb-4">
            <Link href="/admin/dashboard" className="hover:underline">Dashboard</Link><span>›</span>
            <Link href="/admin/categories/institutes" className="hover:underline">Institutes</Link><span>›</span>
            <span className="text-neutral-black font-medium">All Institutes</span>
          </div>
          <h1 className="text-xl font-bold text-neutral-black flex items-center gap-2">
            <span className="h-9 w-9 rounded-xl bg-purple-100 text-purple-600 grid place-items-center"><Building2 className="h-5 w-5" /></span>
            All Institutes
          </h1>
          <p className="text-[11px] text-neutral-gray-dark mt-1">Manage, view and update all institute listings on AfriScience Hub.</p>
        </div>
        <Link href="/admin/categories/institutes" className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-neutral-gray-light bg-white text-xs font-semibold hover:bg-neutral-bg-light cursor-pointer shrink-0">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-neutral-gray-light pb-3">
        {TABS.map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition-colors',
                active ? 'border-[#453DD8] bg-[#453DD8]/[0.07] text-[#453DD8]' : 'border-neutral-gray-light bg-white text-neutral-gray-medium hover:text-neutral-black'
              )}
            >
              <Icon className="h-4 w-4" />
              {t.label}
            </button>
          );
        })}
      </div>

      {tab === 'primary-secondary' ? <SchoolsTab /> : <UniversitiesTab />}
    </div>
  );
}
