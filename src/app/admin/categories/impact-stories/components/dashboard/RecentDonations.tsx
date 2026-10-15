'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ADMIN_ROUTES } from '@/app/admin/data/routes';
import {
  formatAmount,
  getProgramChip,
  initialsFor,
  initialsText,
  type Donation,
} from '@/app/admin/categories/donations/data';

const CURRENCY_SYMBOL: Record<Donation['currency'], string> = {
  NGN: '₦',
  USD: '$',
  GHS: '₵',
  GBP: '£',
};

/**
 * Recent Donations: latest five donations within the selected date
 * range, with donor, program, amount and date — View All opens the
 * Donations page.
 */
export default function RecentDonations({ donations }: { donations: Donation[] }) {
  const rows = donations.slice(0, 5);

  return (
    <div className="rounded-2xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4">
        <h3 className="text-sm font-bold text-neutral-black">Recent Donations</h3>
        <Link href={ADMIN_ROUTES.donations} className="text-xs font-semibold text-[#453DD8] hover:underline flex items-center gap-1">
          View All <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      {rows.length === 0 ? (
        <p className="px-5 pb-6 text-xs text-neutral-gray-medium">No donations in the selected date range.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-xs">
            <thead>
              <tr className="border-y border-neutral-gray-light bg-neutral-bg-light/60">
                <th className="px-5 py-2.5 text-left text-xs font-semibold text-neutral-gray-medium">Donor Name</th>
                <th className="px-5 py-2.5 text-left text-xs font-semibold text-neutral-gray-medium">Program</th>
                <th className="px-5 py-2.5 text-left text-xs font-semibold text-neutral-gray-medium">Amount</th>
                <th className="px-5 py-2.5 text-left text-xs font-semibold text-neutral-gray-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-neutral-gray-light/60 last:border-0 hover:bg-neutral-bg-light/40">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      {row.avatar ? (
                        <Image src={row.avatar} alt={row.donor} width={32} height={32} className="h-8 w-8 rounded-full object-cover flex-shrink-0" />
                      ) : (
                        <span className={`h-8 w-8 rounded-full grid place-items-center flex-shrink-0 text-[10px] font-bold ${row.initialsCls ?? initialsFor(row)}`}>
                          {initialsText(row.donor)}
                        </span>
                      )}
                      <span className="text-xs font-semibold text-neutral-black whitespace-nowrap">{row.donor}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-medium whitespace-nowrap ${getProgramChip(row.program)}`}>
                      {row.program}
                    </span>
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap text-xs font-semibold text-neutral-black">
                    {CURRENCY_SYMBOL[row.currency]}{formatAmount(row.amount)}
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap text-xs text-neutral-gray-dark">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
