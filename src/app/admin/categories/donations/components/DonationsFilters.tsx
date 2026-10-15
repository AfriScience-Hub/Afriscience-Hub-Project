'use client';

import React from 'react';
import { Search, Funnel } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SupportProgram } from '../data';

export interface DonationsFilterState {
  search: string;
  program: string;
}

export const DEFAULT_DONATION_FILTERS: DonationsFilterState = { search: '', program: 'All Programs' };

interface DonationsFiltersProps {
  filters: DonationsFilterState;
  /** Programs currently visible on the Donations page (hidden ones excluded) */
  programs: SupportProgram[];
  onChange: (patch: Partial<DonationsFilterState>) => void;
}

/**
 * Filter row: search by donor name or ID, an All Programs select
 * (only visible programs) and the Filter action.
 */
export default function DonationsFilters({ filters, programs, onChange }: DonationsFiltersProps) {
  const activeCount = [filters.search.trim() !== '', filters.program !== 'All Programs'].filter(Boolean).length;

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1 min-w-0 sm:max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium pointer-events-none" />
        <input
          type="search"
          value={filters.search}
          onChange={(e) => onChange({ search: e.target.value })}
          placeholder="Search by donor name or ID..."
          aria-label="Search donations"
          className="w-full pl-9 pr-3 py-2 text-xs text-neutral-black rounded-lg border border-neutral-gray-light bg-white outline-none focus:border-[#453DD8]"
        />
      </div>
      <div className="flex flex-wrap gap-3">
        <select
          value={filters.program}
          onChange={(e) => onChange({ program: e.target.value })}
          aria-label="Filter by program"
          className="px-3 py-2 text-xs text-neutral-black rounded-lg border border-neutral-gray-light bg-white outline-none focus:border-[#453DD8] cursor-pointer appearance-none"
        >
          <option value="All Programs">All Programs</option>
          {programs.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
        </select>
        <button
          type="button"
          className="flex items-center gap-1.5 px-4 py-2 border border-neutral-gray-light bg-white rounded-lg text-xs font-medium text-neutral-gray-dark hover:bg-neutral-bg-light cursor-pointer"
        >
          <Funnel className="h-3.5 w-3.5" /> Filter
          {activeCount > 0 && (
            <span className="ml-0.5 h-4 min-w-4 px-1 rounded-full bg-[#453DD8] text-white text-[10px] grid place-items-center">
              {activeCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
