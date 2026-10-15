'use client';

import React from 'react';
import { FileText, CheckCircle2, XCircle, Award } from 'lucide-react';
import type { ApplicationCounts } from '../../applicationsData';

/**
 * Four headline cards: Total Applications, Published Stories, Rejected
 * Applications and Concluded Impact Support.
 */
export default function DashboardStats({ counts }: { counts: ApplicationCounts }) {
  const cards = [
    { label: 'Total Applications', value: counts.total, icon: FileText, iconCls: 'bg-purple-100 text-purple-600' },
    { label: 'Published Stories', value: counts.publishedTab, icon: CheckCircle2, iconCls: 'bg-green-100 text-green-600' },
    { label: 'Rejected Applications', value: counts.rejected, icon: XCircle, iconCls: 'bg-red-100 text-red-500' },
    { label: 'Concluded Impact Support', value: counts.concluded, icon: Award, iconCls: 'bg-blue-100 text-blue-600' },
  ];

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
      {cards.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="rounded-2xl border border-neutral-gray-light bg-white p-5 shadow-sm flex items-center gap-4">
            <span className={`w-12 h-12 rounded-xl grid place-items-center flex-shrink-0 ${stat.iconCls}`}>
              <Icon className="h-6 w-6" />
            </span>
            <div className="min-w-0">
              <p className="text-2xl font-bold text-neutral-black leading-tight">{stat.value}</p>
              <p className="text-xs text-neutral-gray-medium truncate">{stat.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
