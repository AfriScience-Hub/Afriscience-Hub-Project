import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export interface ScientistListRow {
  name: string;
  meta: string;
  value: string;
}

interface ScientistListCardProps {
  title: string;
  viewHref: string;
  rows: ScientistListRow[];
  valueLabel: string;
}

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join('') || '?';
}

/** Compact ranked/recent scientist list used by the overview page. */
export default function ScientistListCard({ title, viewHref, rows, valueLabel }: ScientistListCardProps) {
  return (
    <div className="bg-white rounded-lg border border-neutral-gray-light p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold text-neutral-black">{title}</h3>
        <Link href={viewHref} className="flex items-center gap-1 text-[10px] text-[#453DD8] font-medium hover:underline cursor-pointer">
          View all <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      {rows.length === 0 ? (
        <p className="text-xs text-neutral-gray-medium py-6 text-center">Nothing here yet.</p>
      ) : (
        <div className="space-y-3">
          {rows.map((row, idx) => (
            <div key={`${row.name}-${idx}`} className="flex items-center gap-2.5">
              <span className="h-7 w-7 rounded-full bg-purple-50 text-purple-700 grid place-items-center text-[10px] font-bold flex-shrink-0">
                {initials(row.name)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold text-neutral-black truncate">{row.name}</p>
                <p className="text-[9px] text-neutral-gray-medium truncate">{row.meta}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-[10px] font-bold text-neutral-black">{row.value}</p>
                <p className="text-[8px] text-neutral-gray-medium">{valueLabel}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
