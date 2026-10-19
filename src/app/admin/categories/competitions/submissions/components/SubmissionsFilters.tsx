'use client';

import React from 'react';
import { Search, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SUBMISSION_TYPE_OPTIONS, SUBMISSION_CATEGORY_OPTIONS, SUBMISSION_COUNTRY_OPTIONS } from '../data';

export interface SubmissionsFilterState {
  type: string;
  category: string;
  country: string;
  search: string;
}

export const DEFAULT_SUBMISSIONS_FILTERS: SubmissionsFilterState = {
  type: 'All Types',
  category: 'All Categories',
  country: 'All Countries',
  search: '',
};

interface SubmissionsFiltersProps {
  filters: SubmissionsFilterState;
  onChange: (patch: Partial<SubmissionsFilterState>) => void;
  onReset: () => void;
  activeCount: number;
}

/**
 * Filter bar for submissions: competition type, category, country and
 * keyword search, plus Reset and an activating Filter button.
 */
export default function SubmissionsFilters({ filters, onChange, onReset, activeCount }: SubmissionsFiltersProps) {
  const select = (value: string, options: readonly string[], onPick: (v: string) => void, label: string) => (
    <select
      aria-label={label}
      value={value}
      onChange={(e) => onPick(e.target.value)}
      className={cn(
        'px-2.5 py-2 text-xs rounded-lg border bg-white cursor-pointer outline-none',
        value !== options[0] ? 'border-brand-red-600 text-brand-red-600 font-medium' : 'border-neutral-gray-light text-neutral-gray-dark'
      )}
    >
      {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  );

  return (
    <div className="flex flex-wrap items-center gap-2">
      {select(filters.type, SUBMISSION_TYPE_OPTIONS, (v) => onChange({ type: v }), 'Filter by competition type')}
      {select(filters.category, SUBMISSION_CATEGORY_OPTIONS, (v) => onChange({ category: v }), 'Filter by category')}
      {select(filters.country, SUBMISSION_COUNTRY_OPTIONS, (v) => onChange({ country: v }), 'Filter by country')}

      <div className="relative flex-1 min-w-[200px] sm:max-w-[260px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-gray-medium pointer-events-none" />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => onChange({ search: e.target.value })}
          placeholder="Search by name or keyword..."
          className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-neutral-gray-light bg-white outline-none focus:border-brand-red-600"
        />
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <button
          onClick={onReset}
          disabled={activeCount === 0}
          title={activeCount > 0 ? 'Clear all filters' : 'No filters applied'}
          className={cn(
            'flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium border cursor-pointer transition-colors',
            activeCount > 0
              ? 'border-neutral-gray-light bg-white text-neutral-gray-dark hover:bg-neutral-bg-light'
              : 'border-transparent text-neutral-gray-light cursor-not-allowed'
          )}
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
          {activeCount > 0 && (
            <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-red-100 px-1 text-[9px] font-bold text-brand-red-600">
              {activeCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
