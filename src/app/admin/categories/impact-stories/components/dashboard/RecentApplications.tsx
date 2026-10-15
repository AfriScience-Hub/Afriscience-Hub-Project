'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ADMIN_ROUTES } from '@/app/admin/data/routes';
import {
  getProgramChip,
  initialsForName,
  initialsText,
  type ImpactApplication,
} from '../../applicationsData';

const STATUS_CLS: Record<string, string> = {
  Pending: 'bg-amber-100 text-amber-700',
  Published: 'bg-green-100 text-green-700',
  Rejected: 'bg-red-100 text-red-600',
  Concluded: 'bg-blue-100 text-blue-700',
};

/**
 * Recent Applications: latest five applications with name only (no
 * title), selected support and status — View All opens the applications
 * page.
 */
export default function RecentApplications({ applications }: { applications: ImpactApplication[] }) {
  const rows = applications.slice(0, 5);

  return (
    <div className="rounded-2xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4">
        <h3 className="text-sm font-bold text-neutral-black">Recent Applications</h3>
        <Link href={ADMIN_ROUTES.impactApplications} className="text-xs font-semibold text-[#453DD8] hover:underline flex items-center gap-1">
          View All <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      {rows.length === 0 ? (
        <p className="px-5 pb-6 text-xs text-neutral-gray-medium">No applications in the selected date range.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-xs">
            <thead>
              <tr className="border-y border-neutral-gray-light bg-neutral-bg-light/60">
                <th className="px-5 py-2.5 text-left text-xs font-semibold text-neutral-gray-medium">Name</th>
                <th className="px-5 py-2.5 text-left text-xs font-semibold text-neutral-gray-medium">Selected Support</th>
                <th className="px-5 py-2.5 text-left text-xs font-semibold text-neutral-gray-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-neutral-gray-light/60 last:border-0 hover:bg-neutral-bg-light/40">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      {row.avatar ? (
                        <Image src={row.avatar} alt={row.name} width={32} height={32} className="h-8 w-8 rounded-full object-cover flex-shrink-0" />
                      ) : (
                        <span className={`h-8 w-8 rounded-full grid place-items-center flex-shrink-0 text-[10px] font-bold ${row.initialsCls ?? initialsForName(row.name)}`}>
                          {initialsText(row.name)}
                        </span>
                      )}
                      <span className="text-xs font-semibold text-neutral-black whitespace-nowrap">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-medium whitespace-nowrap ${getProgramChip(row.program)}`}>
                      {row.program}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold whitespace-nowrap ${STATUS_CLS[row.status] ?? 'bg-slate-100 text-slate-600'}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
