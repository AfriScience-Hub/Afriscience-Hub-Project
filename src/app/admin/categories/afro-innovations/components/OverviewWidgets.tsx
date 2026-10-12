'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Inbox } from 'lucide-react';

export interface Slice {
  name: string;
  percent: string;
  count: number;
  color: string;
}

const R = 40;
const C = 2 * Math.PI * R;

export function EmptyState({ message = 'No data yet.' }: { message?: string }) {
  return (
    <div className="py-8 text-center">
      <Inbox className="h-8 w-8 text-neutral-gray-medium mx-auto mb-2" />
      <p className="text-xs text-neutral-gray-medium">{message}</p>
    </div>
  );
}

export function DonutChart({ total, slices }: { total: string | number; slices: Slice[] }) {
  if (!slices.length) return <EmptyState />;
  let acc = 0;
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <div className="relative w-32 h-32 flex-shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {slices.map((s, i) => {
            const dash = (parseFloat(s.percent) / 100) * C;
            const el = (
              <circle key={i} cx="50" cy="50" r={R} fill="none" stroke={s.color} strokeWidth="20"
                strokeDasharray={`${dash} ${C - dash}`} strokeDashoffset={-acc} />
            );
            acc += dash;
            return el;
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-lg font-bold text-neutral-black">{total}</p>
          <p className="text-[9px] text-neutral-gray-medium">Total</p>
        </div>
      </div>
      <div className="space-y-1.5 w-full sm:w-auto">
        {slices.map((s) => (
          <div key={s.name} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
            <span className="text-[10px] text-neutral-gray-dark flex-1">{s.name}</span>
            <span className="text-[10px] text-neutral-gray-medium">{s.percent}</span>
            <span className="text-[9px] text-neutral-gray-medium">({s.count})</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DonutCard({ title, total, slices }: { title: string; total: string | number; slices: Slice[] }) {
  return (
    <div className="bg-white rounded-lg border border-neutral-gray-light p-4">
      <h3 className="text-xs font-semibold text-neutral-black mb-3">{title}</h3>
      <DonutChart total={total} slices={slices} />
    </div>
  );
}

export function ListCard({ title, viewHref, children }: {
  title: string;
  viewHref: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-lg border border-neutral-gray-light p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold text-neutral-black">{title}</h3>
        <Link href={viewHref} className="flex items-center gap-1 text-[10px] text-[#453DD8] font-medium hover:underline cursor-pointer">
          View all <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      {children}
    </div>
  );
}
