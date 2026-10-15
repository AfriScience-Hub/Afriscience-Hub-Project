'use client';

import React from 'react';
import { FileText, XCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ApplicationCounts } from '../../applicationsData';
import type { ApplicationsTab } from './ApplicationsHeader';

interface ApplicationsTabsProps {
  tab: ApplicationsTab;
  counts: ApplicationCounts;
  onChange: (tab: ApplicationsTab) => void;
}

/**
 * All Submissions / Rejected / Published tabs with live counts. The
 * Published tab covers published + concluded applications.
 */
export default function ApplicationsTabs({ tab, counts, onChange }: ApplicationsTabsProps) {
  const tabs = [
    { id: 'all' as const, label: 'All Submissions', count: counts.total, icon: FileText, activeCls: 'bg-[#453DD8]/10 text-[#453DD8] border-[#453DD8]/40', iconCls: 'text-[#453DD8]' },
    { id: 'rejected' as const, label: 'Rejected', count: counts.rejected, icon: XCircle, activeCls: 'bg-red-50 text-red-600 border-red-300', iconCls: 'text-red-500' },
    { id: 'published' as const, label: 'Published', count: counts.publishedTab, icon: CheckCircle2, activeCls: 'bg-green-50 text-green-700 border-green-300', iconCls: 'text-green-600' },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((t) => {
        const Icon = t.icon;
        const active = tab === t.id;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onChange(t.id)}
            aria-pressed={active}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition-colors',
              active ? t.activeCls : 'bg-white border-neutral-gray-light text-neutral-gray-dark hover:bg-neutral-bg-light'
            )}
          >
            <Icon className={cn('h-4 w-4', !active && t.iconCls)} />
            {t.label} ({t.count})
          </button>
        );
      })}
    </div>
  );
}
