'use client';

import React from 'react';
import { Search, RotateCcw, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { COUNTRY_FILTER_OPTIONS } from '../../filterOptions';

export interface SubmissionsFilterState {
  category: string;
  country: string;
  search: string;
}

export const DEFAULT_SUBMISSIONS_FILTERS: SubmissionsFilterState = {
  category: 'All Categories',
  country: 'All Countries',
  search: '',
};

export type ScoreOrder = 'none' | 'asc' | 'desc';

interface SubmissionsFiltersProps {
  filters: SubmissionsFilterState;
  onChange: (patch: Partial<SubmissionsFilterState>) => void;
  onReset: () => void;
  activeCount: number;
  /** Category is only relevant for All Competitions and Afri-Presentations. */
  showCategory: boolean;
  categoryOptions: string[];
  scoreOrder: ScoreOrder;
  onToggleScoreOrder: () => void;
}

/**
 * Filter bar for submissions: optional category, country and keyword search,
 * plus reset and score ordering.
 */
export default function SubmissionsFilters({
  filters,
  onChange,
  onReset,
  activeCount,
  showCategory,
  categoryOptions,
  scoreOrder,
  onToggleScoreOrder,
}: SubmissionsFiltersProps) {
  const select = (value: string, options: readonly string[], onPick: (v: string) => void, label: string) => (
    <select
      aria-label={label}
      value={value}
      onChange={(e) => onPick(e.target.value)}
      className="px-2.5 py-2 text-xs rounded-lg border border-neutral-gray-light text-neutral-black bg-white cursor-pointer outline-none"
    >
      {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  );

  const OrderIcon = scoreOrder === 'asc' ? ArrowUp : scoreOrder === 'desc' ? ArrowDown : ArrowUpDown;
  const orderLabel = scoreOrder === 'asc'
    ? 'Score: Low to High'
    : scoreOrder === 'desc'
      ? 'Score: High to Low'
      : 'Score Order';

  return (
    <div className="flex flex-wrap items-center gap-2">
      {showCategory && select(filters.category, categoryOptions, (v) => onChange({ category: v }), 'Filter by category')}
      {select(filters.country, COUNTRY_FILTER_OPTIONS, (v) => onChange({ country: v }), 'Filter by country')}

      <div className="relative flex-1 min-w-[200px] sm:max-w-[260px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-gray-medium pointer-events-none" />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => onChange({ search: e.target.value })}
          placeholder="Search by name or keyword..."
          className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-neutral-gray-light text-neutral-black bg-white outline-none focus:border-neutral-gray-light"
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
              ? 'border-neutral-gray-light bg-white text-neutral-black hover:bg-neutral-bg-light'
              : 'border-transparent text-neutral-gray-light cursor-not-allowed'
          )}
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
          {activeCount > 0 && (
            <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-neutral-black px-1 text-[9px] font-bold text-white">
              {activeCount}
            </span>
          )}
        </button>

        <button
          onClick={onToggleScoreOrder}
          title="Order submissions by score"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium bg-[#1E3A8A] text-white hover:bg-[#172554] cursor-pointer transition-colors whitespace-nowrap"
        >
          <OrderIcon className="h-3.5 w-3.5" />
          {orderLabel}
        </button>
      </div>
    </div>
  );
}
