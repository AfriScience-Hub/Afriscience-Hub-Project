'use client';

import React from 'react';
import { SUPPORT_PROGRAMS, type ImpactApplication } from '../../applicationsData';

const BAR_COLORS = ['#8b5cf6', '#3b82f6', '#22c55e'];
const SHORT_LABELS: Record<string, string> = {
  'Career Support': 'Career Support',
  'Research Support': 'Research Support',
  'Educational Scholarship': 'Educational\nScholarship',
};

/**
 * Applications by Support Program: vertical bars sized against the
 * busiest program, with values on top and labels below.
 */
export default function ProgramBars({ applications }: { applications: ImpactApplication[] }) {
  const counts = SUPPORT_PROGRAMS.map((program) => ({
    program,
    count: applications.filter((a) => a.program === program).length,
  }));
  const max = Math.max(...counts.map((c) => c.count), 1);

  return (
    <div className="rounded-2xl border border-neutral-gray-light bg-white p-5 shadow-sm flex flex-col">
      <h3 className="text-sm font-bold text-neutral-black mb-4">Applications by Support Program</h3>
      <div className="flex-1 flex items-end justify-around gap-4 min-h-[160px]">
        {counts.map((c, i) => (
          <div key={c.program} className="flex flex-col items-center gap-2 flex-1 min-w-0">
            <span className="text-xs font-bold text-neutral-black">{c.count}</span>
            <div
              className="w-full max-w-[64px] rounded-t-lg"
              style={{ height: `${Math.max((c.count / max) * 110, 8)}px`, backgroundColor: BAR_COLORS[i] }}
            />
            <span className="text-[10px] text-neutral-gray-medium text-center whitespace-pre-line leading-tight">
              {SHORT_LABELS[c.program]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
