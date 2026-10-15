'use client';

import React, { useMemo } from 'react';
import { formatUsd, getPrograms, type Donation } from '@/app/admin/categories/donations/data';

const BAR_COLORS = ['#8b5cf6', '#3b82f6', '#22c55e'];

/**
 * Donations by Program: USD-equivalent received amounts per support
 * program within the selected date range, as horizontal bars.
 */
export default function DonationsByProgram({ donations }: { donations: Donation[] }) {
  const programs = getPrograms();
  const totals = useMemo(
    () =>
      programs.map((program) => ({
        name: program.name,
        received: donations
          .filter((d) => d.program === program.name)
          .reduce((sum, d) => sum + d.usd, 0),
      })),
    [programs, donations]
  );
  const max = Math.max(...totals.map((t) => t.received), 1);

  return (
    <div className="rounded-2xl border border-neutral-gray-light bg-white p-5 shadow-sm">
      <h3 className="text-sm font-bold text-neutral-black mb-4">Donations by Program</h3>
      <ul className="space-y-4">
        {totals.map((program, i) => (
          <li key={program.name}>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-neutral-gray-dark font-medium">{program.name}</span>
              <span className="font-bold text-neutral-black">{formatUsd(program.received)}</span>
            </div>
            <div className="h-2 rounded-full bg-neutral-bg-light overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${Math.max((program.received / max) * 100, 4)}%`, backgroundColor: BAR_COLORS[i % BAR_COLORS.length] }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
