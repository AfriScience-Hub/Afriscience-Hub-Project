import React from 'react';

export interface LeaderboardRow {
  name: string;
  meta: string;
  value: string;
}

interface LeaderboardCardProps {
  title: string;
  rows: LeaderboardRow[];
  valueLabel: string;
}

const RANK_STYLES = [
  'bg-amber-100 text-amber-700',
  'bg-slate-100 text-slate-600',
  'bg-orange-100 text-orange-700',
  'bg-neutral-bg-light text-neutral-gray-dark',
];

function initials(name: string): string {
  return name.split(' ').filter(Boolean).map((part) => part[0]).slice(0, 2).join('').toUpperCase();
}

/** Ranked participant list card used for votes and boosted votes. */
export default function LeaderboardCard({ title, rows, valueLabel }: LeaderboardCardProps) {
  return (
    <div className="bg-white rounded-lg border border-neutral-gray-light p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold text-neutral-black">{title}</h3>
        <span className="text-[10px] text-neutral-gray-medium">{valueLabel}</span>
      </div>
      <div className="space-y-2.5">
        {rows.map((row, i) => (
          <div key={row.name} className="flex items-center gap-2.5">
            <span className={`h-5 w-5 rounded-full grid place-items-center text-[10px] font-bold flex-shrink-0 ${RANK_STYLES[Math.min(i, RANK_STYLES.length - 1)]}`}>
              {i + 1}
            </span>
            <span className="h-8 w-8 rounded-full bg-indigo-50 text-indigo-700 grid place-items-center text-[10px] font-bold flex-shrink-0">
              {initials(row.name)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold text-neutral-black truncate">{row.name}</p>
              <p className="text-[9px] text-neutral-gray-medium truncate">{row.meta}</p>
            </div>
            <span className="text-xs font-bold text-neutral-black whitespace-nowrap">{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
