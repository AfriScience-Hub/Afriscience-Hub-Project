'use client';

import React from 'react';
import { FileText, XCircle, CheckCircle2, Calendar } from 'lucide-react';
import type { ApplicationCounts } from '../../applicationsData';
import type { ApplicationsTab } from './ApplicationsHeader';

interface ApplicationsStatsProps {
  tab: ApplicationsTab;
  counts: ApplicationCounts;
  /** Date of the most recently published application, if any */
  latestPublished: string | null;
}

/**
 * Tab-aware stat cards: three cards on All Submissions (Total /
 * Rejected / Published) and two on the Published and Rejected tabs
 * (count + date of the latest published application).
 */
export default function ApplicationsStats({ tab, counts, latestPublished }: ApplicationsStatsProps) {
  const cards =
    tab === 'all'
      ? [
          { label: 'Total Submissions', value: String(counts.total), icon: FileText, iconCls: 'bg-blue-100 text-blue-600' },
          { label: 'Rejected', value: String(counts.rejected), icon: XCircle, iconCls: 'bg-red-100 text-red-500' },
          { label: 'Published', value: String(counts.publishedTab), icon: CheckCircle2, iconCls: 'bg-green-100 text-green-600' },
        ]
      : [
          tab === 'published'
            ? { label: 'Published', value: String(counts.publishedTab), icon: CheckCircle2, iconCls: 'bg-green-100 text-green-600' }
            : { label: 'Rejected', value: String(counts.rejected), icon: XCircle, iconCls: 'bg-red-100 text-red-500' },
          { label: 'Latest Published', value: latestPublished ?? '—', icon: Calendar, iconCls: 'bg-purple-100 text-purple-600' },
        ];

  return (
    <div className={`grid gap-4 ${tab === 'all' ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-2'}`}>
      {cards.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="rounded-2xl border border-neutral-gray-light bg-white p-5 shadow-sm flex items-center gap-4">
            <span className={`w-12 h-12 rounded-xl grid place-items-center flex-shrink-0 ${stat.iconCls}`}>
              <Icon className="h-6 w-6" />
            </span>
            <div className="min-w-0">
              <p className="text-2xl font-bold text-neutral-black leading-tight truncate">{stat.value}</p>
              <p className="text-xs text-neutral-gray-medium truncate">{stat.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
