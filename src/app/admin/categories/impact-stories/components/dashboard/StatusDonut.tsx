'use client';

import React from 'react';
import type { ApplicationCounts } from '../../applicationsData';

const SEGMENT_COLORS = ['#3b82f6', '#8b5cf6', '#f97316', '#94a3b8'];

/**
 * Applications by Status donut (SVG, no chart library): Published,
 * Pending, Rejected and Concluded with counts and percentages around a
 * total in the middle.
 */
export default function StatusDonut({ counts }: { counts: ApplicationCounts }) {
  const total = counts.total || 1;
  const segments = [
    { label: 'Published', value: counts.publishedTab },
    { label: 'Pending', value: counts.pending },
    { label: 'Rejected', value: counts.rejected },
    { label: 'Concluded', value: counts.concluded },
  ];

  const R = 54;
  const C = 2 * Math.PI * R;
  let offset = 0;

  return (
    <div className="rounded-2xl border border-neutral-gray-light bg-white p-5 shadow-sm">
      <h3 className="text-sm font-bold text-neutral-black mb-4">Applications by Status</h3>
      <div className="flex flex-col sm:flex-row items-center gap-5">
        <div className="relative flex-shrink-0">
          <svg viewBox="0 0 140 140" className="h-36 w-36 -rotate-90">
            {segments.map((s, i) => {
              const len = (s.value / total) * C;
              const el = (
                <circle
                  key={s.label}
                  cx="70" cy="70" r={R}
                  fill="none"
                  stroke={SEGMENT_COLORS[i]}
                  strokeWidth="20"
                  strokeDasharray={`${len} ${C - len}`}
                  strokeDashoffset={-offset}
                />
              );
              offset += len;
              return el;
            })}
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center">
              <p className="text-xl font-bold text-neutral-black">{counts.total}</p>
              <p className="text-[10px] text-neutral-gray-medium">Applications</p>
            </div>
          </div>
        </div>
        <ul className="flex-1 w-full space-y-2.5">
          {segments.map((s, i) => (
            <li key={s.label} className="flex items-center gap-2 text-xs">
              <span className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: SEGMENT_COLORS[i] }} />
              <span className="text-neutral-gray-dark flex-1">{s.label}</span>
              <span className="font-bold text-neutral-black">{s.value}</span>
              <span className="text-neutral-gray-medium w-12 text-right">{((s.value / total) * 100).toFixed(1)}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
