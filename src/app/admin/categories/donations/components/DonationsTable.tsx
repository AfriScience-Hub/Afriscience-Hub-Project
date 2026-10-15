'use client';

import React from 'react';
import Image from 'next/image';
import { SearchX } from 'lucide-react';
import {
  formatAmount,
  getProgramChip,
  initialsFor,
  initialsText,
  type Donation,
} from '../data';

interface DonationsTableProps {
  rows: Donation[];
}

const HEADERS = ['Donor', 'Program', 'Currency', 'Amount', 'Date'];

/**
 * Donations table: donor (avatar or initials + name + donation ID),
 * program chip, currency, amount and date with time.
 */
export default function DonationsTable({ rows }: DonationsTableProps) {
  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-14 text-center">
        <SearchX className="h-8 w-8 text-neutral-gray-light mb-2" />
        <p className="text-sm font-medium text-neutral-black">No donations found</p>
        <p className="text-xs text-neutral-gray-medium mt-0.5">Try adjusting your search or clearing filters.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] text-xs">
        <thead>
          <tr className="border-b border-neutral-gray-light bg-neutral-bg-light/60">
            {HEADERS.map((label) => (
              <th key={label} className="px-4 py-2.5 text-xs font-semibold text-neutral-gray-medium text-left whitespace-nowrap">
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-neutral-gray-light/60 last:border-0 hover:bg-neutral-bg-light/40">
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center gap-2.5">
                  {row.avatar ? (
                    <Image src={row.avatar} alt={row.donor} width={36} height={36} className="h-9 w-9 rounded-full object-cover flex-shrink-0" />
                  ) : (
                    <span className={`h-9 w-9 rounded-full grid place-items-center flex-shrink-0 text-[11px] font-bold ${row.initialsCls ?? initialsFor(row)}`}>
                      {initialsText(row.donor)}
                    </span>
                  )}
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-neutral-black">{row.donor}</p>
                    <p className="text-[10px] text-neutral-gray-medium">ID: {row.id}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${getProgramChip(row.program)}`}>
                  {row.program}
                </span>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-xs text-neutral-gray-dark">{row.currency}</td>
              <td className="px-4 py-3 whitespace-nowrap text-xs font-semibold text-neutral-black">{formatAmount(row.amount)}</td>
              <td className="px-4 py-3 whitespace-nowrap">
                <p className="text-xs text-neutral-black">{row.date}</p>
                <p className="text-[10px] text-neutral-gray-medium">{row.time}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
