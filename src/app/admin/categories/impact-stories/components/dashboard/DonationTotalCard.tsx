'use client';

import React from 'react';
import { CircleDollarSign } from 'lucide-react';
import { formatUsd, type Donation } from '@/app/admin/categories/donations/data';

const TARGET = 100000;

/**
 * Total Donations Supporting Aid Programs: the USD-equivalent received
 * total within the selected date range, a trend chip and progress toward
 * the $100,000 target.
 */
export default function DonationTotalCard({ donations }: { donations: Donation[] }) {
  const totalReceived = donations.reduce((sum, d) => sum + d.usd, 0);
  const pct = Math.min(Math.round((totalReceived / TARGET) * 100), 100);

  return (
    <div className="rounded-2xl border border-neutral-gray-light bg-white p-5 shadow-sm flex flex-col justify-between gap-4">
      <div className="flex items-start gap-4">
        <span className="w-12 h-12 rounded-xl bg-green-100 text-green-600 grid place-items-center flex-shrink-0">
          <CircleDollarSign className="h-6 w-6" />
        </span>
        <div className="min-w-0">
          <p className="text-xs text-neutral-gray-medium">Total Donations Supporting Aid Programs</p>
          <div className="flex items-baseline gap-2 flex-wrap">
            <p className="text-2xl font-bold text-neutral-black">{formatUsd(totalReceived)}</p>
            <span className="text-[11px] font-semibold text-green-600">&#8593; 28% <span className="text-neutral-gray-medium font-normal">vs previous period</span></span>
          </div>
        </div>
      </div>
      <div>
        <div className="h-2.5 rounded-full bg-neutral-bg-light overflow-hidden">
          <div className="h-full rounded-full bg-[#453DD8]" style={{ width: `${pct}%` }} />
        </div>
        <div className="flex items-center justify-between text-[11px] text-neutral-gray-medium mt-1.5">
          <span>{pct}% of {formatUsd(TARGET)} target</span>
          <span>{formatUsd(TARGET)}</span>
        </div>
      </div>
    </div>
  );
}
