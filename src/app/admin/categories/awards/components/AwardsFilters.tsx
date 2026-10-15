'use client';

import React from 'react';
import { Search, Funnel } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AWARD_COUNTRIES, AWARD_TYPES, AWARD_YEARS } from '../data';

export interface AwardsFilterState {
  search: string;
  type: string;
  country: string;
  year: string;
}

export const DEFAULT_AWARD_FILTERS: AwardsFilterState = {
  search: '',
  type: 'All Types',
  country: 'All Countries',
  year: 'All Years',
};

interface AwardsFiltersProps {
  filters: AwardsFilterState;
  onChange: (patch: Partial<AwardsFilterState>) => void;
}

const selectCls = 'px-3 py-2 text-xs text-neutral-black rounded-lg border border-neutral-gray-light bg-white outline-none focus:border-[#453DD8] cursor-pointer';

/**
 * Filter row: search by recipient/keyword plus All Types, All Countries
 * and All Years selects and the Filter action.
 */
export default function AwardsFilters({ filters, onChange }: AwardsFiltersProps) {
  const activeCount = [
    filters.search.trim() !== '',
    filters.type !== 'All Types',
    filters.country !== 'All Countries',
    filters.year !== 'All Years',
  ].filter(Boolean).length;

  const options = (allLabel: string, values: string[]) => [allLabel, ...values];

  return (
    <div className="flex flex-col lg:flex-row gap-3">
      <div className="relative flex-1 min-w-0 lg:max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium pointer-events-none" />
        <input
          type="search"
          value={filters.search}
          onChange={(e) => onChange({ search: e.target.value })}
          placeholder="Search by recipient name or keyword..."
          aria-label="Search awards"
          className="w-full pl-9 pr-3 py-2 text-xs text-neutral-black rounded-lg border border-neutral-gray-light bg-white outline-none focus:border-[#453DD8]"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <select value={filters.type} onChange={(e) => onChange({ type: e.target.value })} aria-label="Filter by type" className={cn(selectCls, 'appearance-none')}>
          {options('All Types', AWARD_TYPES).map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={filters.country} onChange={(e) => onChange({ country: e.target.value })} aria-label="Filter by country" className={cn(selectCls, 'appearance-none')}>
          {options('All Countries', AWARD_COUNTRIES).map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={filters.year} onChange={(e) => onChange({ year: e.target.value })} aria-label="Filter by year" className={cn(selectCls, 'appearance-none')}>
          {options('All Years', AWARD_YEARS).map((y) => <option key={y} value={y}>{y}</option>)}
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
