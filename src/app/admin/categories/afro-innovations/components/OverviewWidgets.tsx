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

/** Shimmer animation for skeleton loaders. */
const shimmerStyle = {
  background:
    'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
  backgroundSize: '200% 100%',
  animation: 'skeleton-shimmer 1.5s infinite linear',
};

const darkShimmerStyle = {
  background:
    'linear-gradient(90deg, #e5e7eb 25%, #d1d5db 50%, #e5e7eb 75%)',
  backgroundSize: '200% 100%',
  animation: 'skeleton-shimmer 1.5s infinite linear',
};

/** Base skeleton element with shimmer animation. */
function Skeleton({ className = 'h-4 w-full rounded', width, dark = false }: { className?: string; width?: string | number; dark?: boolean }) {
  return (
    <div className={className} style={{ ...shimmerStyle, ...(dark ? darkShimmerStyle : {}), width }} />
  );
}

/** Skeleton for stat cards (Total Innovations, Pending Approval, etc.). */
export function StatSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-neutral-gray-light p-3">
      <div className="w-7 h-7 rounded-full bg-neutral-bg-light mb-1.5" style={darkShimmerStyle} />
      <div className="space-y-1">
        <Skeleton className="h-4 w-1/2 rounded" />
        <Skeleton className="h-3 w-1/3 rounded" />
      </div>
    </div>
  );
}

/** Skeleton for chart cards (Growth, Category, Stage, etc.). */
export function ChartSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-neutral-gray-light p-4 py-6">
      <Skeleton className="h-4 w-1/3 rounded" />
      <div className="mt-5 space-y-2">
        <Skeleton className="h-3 w-1/2 rounded" />
        <Skeleton className="h-3 w-3/4 rounded" />
        <Skeleton className="h-3 w-full rounded" />
        <Skeleton className="h-3 w-1/3 rounded" />
        <Skeleton className="h-3 w-2/3 rounded" />
      </div>
    </div>
  );
}

/** Skeleton for list cards (Pending Approvals, Recently Added, etc.). */
export function ListSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-neutral-gray-light p-4 py-6">
      <Skeleton className="h-4 w-1/4 rounded" />
      <div className="mt-5 space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex items-center gap-3 my-2">
            <div className="h-10 w-10 rounded-full bg-neutral-bg-light" style={darkShimmerStyle} />
            <div className="flex-1 min-w-0 space-y-2">
              <Skeleton className="h-3 w-3/4 rounded" dark />
              <Skeleton className="h-2 w-1/2 rounded" dark />
            </div>
            <div className="h-6 w-10 rounded bg-neutral-bg-light" style={darkShimmerStyle} />
          </div>
        ))}
      </div>
    </div>
  );
}

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

export function GrowthChart({ data }: { data: { label: string; value: number }[] }) {
  if (!data.length) return <EmptyState />;
  const max = Math.max(...data.map(d => d.value));
  return (
    <div className="space-y-3">
      {data.map(d => (
        <div key={d.label} className="flex items-center gap-3">
          <span className="w-16 text-[9px] text-neutral-gray-medium text-right">{d.label}</span>
          <div className="flex-1 bg-neutral-bg-light rounded-full h-3">
            <div className="bg-brand-red-600 h-3 rounded-full" style={{ width: `${(d.value / max) * 100}%` }} />
          </div>
          <span className="w-8 text-[9px] text-neutral-gray-dark text-right">{d.value}</span>
        </div>
      ))}
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
