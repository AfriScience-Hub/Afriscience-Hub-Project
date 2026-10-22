'use client';

import type { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: number | string;
  icon: ReactNode;
  iconBg: string;
  /** e.g. "+12%" - omitted when there is no trend to show. */
  change?: string;
  positive?: boolean;
}

/** Stat tile used across the specialist centre admin pages. */
export default function StatCard({ label, value, icon, iconBg, change, positive = true }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-neutral-gray-light p-5 flex flex-col">
      <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${iconBg} text-xs shrink-0`}>{icon}</div>
      <p className="text-2xl font-bold text-neutral-black mt-3">{value}</p>
      <p className="text-[11px] text-neutral-gray-medium mt-1">{label}</p>
      {change && (
        <p className={`text-[11px] font-medium mt-1 ${positive ? 'text-green-600' : 'text-red-500'}`}>
          {change} <span className="text-neutral-gray-medium font-normal">vs previous period</span>
        </p>
      )}
    </div>
  );
}
