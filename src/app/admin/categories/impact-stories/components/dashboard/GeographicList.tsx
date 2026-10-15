'use client';

import React from 'react';
import { Globe } from 'lucide-react';
import { GEO_COUNTRIES, GEO_OTHERS } from '../../applicationsData';

/**
 * Geographic Distribution: a plain country list with counts — no map.
 */
export default function GeographicList() {
  const max = Math.max(...GEO_COUNTRIES.map((c) => c.count), 1);
  const rows = [
    ...GEO_COUNTRIES.map((c) => ({ label: c.country, count: c.count, muted: false })),
    { label: 'Others', count: GEO_OTHERS, muted: true },
  ];

  return (
    <div className="rounded-2xl border border-neutral-gray-light bg-white p-5 shadow-sm">
      <h3 className="text-sm font-bold text-neutral-black mb-4 flex items-center gap-2">
        <Globe className="h-4 w-4 text-neutral-gray-medium" /> Geographic Distribution
      </h3>
      <ul className="space-y-3">
        {rows.map((row) => (
          <li key={row.label}>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className={row.muted ? 'text-neutral-gray-medium' : 'text-neutral-gray-dark font-medium'}>{row.label}</span>
              <span className="font-bold text-neutral-black">{row.count}</span>
            </div>
            <div className="h-1.5 rounded-full bg-neutral-bg-light overflow-hidden">
              <div
                className={`h-full rounded-full ${row.muted ? 'bg-neutral-gray-light' : 'bg-[#453DD8]'}`}
                style={{ width: `${Math.max((row.count / max) * 100, 4)}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
