'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MoreHorizontal, SearchX } from 'lucide-react';
import { Competition } from '../data';

interface UpcomingCompetitionsCardProps {
  competitions: Competition[];
  total: number;
}

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

/**
 * "Upcoming Competitions" list card with an empty state for filtered results.
 */
export default function UpcomingCompetitionsCard({ competitions, total }: UpcomingCompetitionsCardProps) {
  const dateBadge = (iso?: string) => {
    if (!iso) return { month: 'JUN', day: '01' };
    const [, m, d] = iso.split('-');
    return { month: MONTHS[Number(m) - 1] || 'JUN', day: d };
  };

  return (
    <div className="bg-white rounded-lg border border-neutral-gray-light p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-neutral-black">Upcoming Competitions</h3>
        <Link href="/admin/categories/competitions/all" className="flex items-center gap-1 text-[11px] text-[#453DD8] font-medium hover:underline cursor-pointer whitespace-nowrap">
          View all <span>&rarr;</span>
        </Link>
      </div>

      {competitions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <SearchX className="h-8 w-8 text-neutral-gray-light mb-2" />
          <p className="text-xs font-medium text-neutral-black">No upcoming competitions found</p>
          <p className="text-[11px] text-neutral-gray-medium mt-0.5">Try adjusting or clearing your filters.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {competitions.map((comp) => {
            const { month, day } = dateBadge(comp.startDateISO);
            return (
              <div key={comp.id} className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-lg bg-purple-50 flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-[8px] font-bold text-purple-600 uppercase">{month}</span>
                  <span className="text-sm font-bold text-purple-700 leading-tight">{day}</span>
                </div>
                <Image src={comp.logo} alt={comp.name} width={40} height={40} className="rounded-lg object-cover flex-shrink-0 h-10 w-10" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-neutral-black truncate">{comp.name}</p>
                  <p className="text-[10px] text-neutral-gray-medium truncate">{comp.category} &middot; {comp.country}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[11px] font-medium text-neutral-black">{comp.expected} Expected</p>
                  <p className="text-[10px] text-neutral-gray-medium">{comp.startsIn}</p>
                  <p className="text-[10px] text-neutral-gray-medium">{comp.startDate}</p>
                </div>
                <button className="p-1.5 hover:bg-neutral-bg-light rounded cursor-pointer flex-shrink-0"><MoreHorizontal className="h-3.5 w-3.5 text-neutral-gray-medium" /></button>
              </div>
            );
          })}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2 mt-3">
        <p className="text-[11px] text-neutral-gray-medium">
          Showing {competitions.length} of {total} upcoming competitions
        </p>
      </div>
    </div>
  );
}
