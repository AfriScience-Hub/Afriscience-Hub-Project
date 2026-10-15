'use client';

import React from 'react';
import Link from 'next/link';
import { BarChart3, ClipboardList } from 'lucide-react';
import { ADMIN_ROUTES } from '@/app/admin/data/routes';
import DateRangePicker, { type DateRange } from './DateRangePicker';

interface DashboardHeaderProps {
  /** Applied date range; null = none selected (show all data). */
  range: DateRange | null;
  onApplyRange: (range: DateRange | null) => void;
}

/**
 * Header for the Impact Dashboard: breadcrumb, title, subtitle, the
 * date-range selector (filters every dated metric on the dashboard) and
 * the button to the Impact Aid Applications page.
 */
export default function DashboardHeader({ range, onApplyRange }: DashboardHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-neutral-gray-medium mb-1">
          <Link href="/admin/dashboard" className="hover:text-neutral-black">Dashboard</Link>
          <span>&rsaquo;</span>
          <span className="text-neutral-black font-medium">Impact Stories</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#453DD8]/10 flex items-center justify-center flex-shrink-0">
            <BarChart3 className="h-6 w-6 text-[#453DD8]" />
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl font-bold text-neutral-black leading-tight">Impact Dashboard</h1>
            <p className="text-xs text-neutral-gray-dark mt-0.5">Overview of impact aid applications, support programs, and overall impact.</p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
        <DateRangePicker range={range} onApply={onApplyRange} />
        <Link
          href={ADMIN_ROUTES.impactApplications}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#453DD8] text-white rounded-lg text-xs font-semibold hover:bg-[#3a33c0] cursor-pointer whitespace-nowrap"
        >
          <ClipboardList className="h-4 w-4" /> Impact Aid Applications
        </Link>
      </div>
    </div>
  );
}
