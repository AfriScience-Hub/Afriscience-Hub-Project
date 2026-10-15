'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MoreHorizontal, SearchX } from 'lucide-react';
import { Competition } from '../data';
import { cn } from '@/lib/utils';

interface OngoingCompetitionsCardProps {
  competitions: Competition[];
  total: number;
}

/**
 * "Ongoing Competitions" table card.
 * The table scrolls horizontally on small screens (min-width keeps every
 * column readable) and shows an empty state when filters match nothing.
 */
export default function OngoingCompetitionsCard({ competitions, total }: OngoingCompetitionsCardProps) {
  return (
    <div className="bg-white rounded-lg border border-neutral-gray-light p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-neutral-black">Ongoing Competitions</h3>
        <Link href="/admin/categories/competitions/all" className="flex items-center gap-1 text-[11px] text-[#453DD8] font-medium hover:underline cursor-pointer whitespace-nowrap">
          View all <span>&rarr;</span>
        </Link>
      </div>

      {competitions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <SearchX className="h-8 w-8 text-neutral-gray-light mb-2" />
          <p className="text-xs font-medium text-neutral-black">No ongoing competitions found</p>
          <p className="text-[11px] text-neutral-gray-medium mt-0.5">Try adjusting or clearing your filters.</p>
        </div>
      ) : (
        <div className="overflow-x-auto -mx-1 px-1">
          <table className="w-full min-w-[640px] text-xs">
            <thead>
              <tr className="border-b border-neutral-gray-light">
                <th className="text-left py-2.5 pl-1 pr-3 font-medium text-neutral-gray-medium whitespace-nowrap">Competition</th>
                <th className="text-left py-2.5 px-3 font-medium text-neutral-gray-medium whitespace-nowrap">Category</th>
                <th className="text-left py-2.5 px-3 font-medium text-neutral-gray-medium whitespace-nowrap">Participants</th>
                <th className="text-left py-2.5 px-3 font-medium text-neutral-gray-medium whitespace-nowrap">Votes</th>
                <th className="text-left py-2.5 px-3 font-medium text-neutral-gray-medium whitespace-nowrap">Status</th>
                <th className="text-left py-2.5 px-3 font-medium text-neutral-gray-medium whitespace-nowrap">Ends In</th>
                <th className="py-2.5 pr-1"></th>
              </tr>
            </thead>
            <tbody>
              {competitions.map((comp) => (
                <tr key={comp.id} className="border-b border-neutral-gray-light last:border-0">
                  <td className="py-3 pl-1 pr-3">
                    <div className="flex items-center gap-3">
                      <Image src={comp.logo} alt={comp.name} width={40} height={40} className="rounded-lg object-cover flex-shrink-0 h-10 w-10" />
                      <div className="min-w-0">
                        <p className="font-medium text-neutral-black leading-tight">{comp.name}</p>
                        <p className="text-[10px] text-neutral-gray-medium mt-0.5">{comp.country}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3"><span className={cn("px-2 py-1 rounded text-[10px] font-medium whitespace-nowrap inline-block", comp.categoryColor)}>{comp.category}</span></td>
                  <td className="py-3 px-3 text-neutral-black whitespace-nowrap">{comp.participants}</td>
                  <td className="py-3 px-3 text-neutral-black whitespace-nowrap">{comp.votes.toLocaleString()}</td>
                  <td className="py-3 px-3"><span className="px-2 py-1 rounded text-[10px] font-semibold bg-green-100 text-green-700 whitespace-nowrap inline-block">{comp.status}</span></td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <p className="text-neutral-gray-dark">{comp.endsIn}</p>
                    {comp.endDate && <p className="text-[10px] text-neutral-gray-medium">{comp.endDate}</p>}
                  </td>
                  <td className="py-3 pr-1"><button className="p-1.5 hover:bg-neutral-bg-light rounded cursor-pointer"><MoreHorizontal className="h-3.5 w-3.5 text-neutral-gray-medium" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2 mt-3">
        <p className="text-[11px] text-neutral-gray-medium">
          Showing {competitions.length} of {total} ongoing competitions
        </p>
        <Link href="/admin/categories/competitions/all" className="text-[11px] text-[#453DD8] font-medium hover:underline cursor-pointer">View all &rarr;</Link>
      </div>
    </div>
  );
}
