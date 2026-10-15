'use client';

import React from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TYPE_OPTIONS, CATEGORY_OPTIONS, COUNTRY_OPTIONS } from '../data';
import DateRangePicker, { type DateRange } from '../../components/DateRangePicker';

export interface AllCompetitionsFilterState {
  search: string;
  type: string;
  category: string;
  country: string;
  range: DateRange;
}

export const DEFAULT_ALL_FILTERS: AllCompetitionsFilterState = {
  search: '',
  type: 'All Types',
  category: 'All Categories',
  country: 'All Countries',
  range: { from: null, to: null },
};

interface AllCompetitionsFiltersProps {
  filters: AllCompetitionsFilterState;
  onChange: (patch: Partial<AllCompetitionsFilterState>) => void;
  onReset: () => void;
  activeCount: number;
}

const selectClass = 'px-2.5 py-2 text-xs rounded-lg border text-neutral-gray-dark bg-white cursor-pointer outline-none appearance-none pr-7';

/**
 * Filter bar for All Competitions: search, type/category/country selects,
 * start→end date range, plus Reset and an activating Filter button.
 */
export default function AllCompetitionsFilters({ filters, onChange, onReset, activeCount }: AllCompetitionsFiltersProps) {
  const selectWrap = (value: string, options: readonly string[], onPick: (v: string) => void, label: string) => (
    <div className="relative">
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onPick(e.target.value)}
        className={cn(
          selectClass,
          value !== options[0] ? "border-brand-red-600 text-brand-red-600 font-medium" : "border-neutral-gray-light"
        )}
      >
        {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative flex-1 min-w-[200px] sm:max-w-[240px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-gray-medium pointer-events-none" />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => onChange({ search: e.target.value })}
          placeholder="Search competitions..."
          className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-neutral-gray-light bg-white outline-none focus:border-brand-red-600"
        />
      </div>

      {selectWrap(filters.type, TYPE_OPTIONS, (v) => onChange({ type: v }), 'Filter by type')}
      {selectWrap(filters.category, CATEGORY_OPTIONS, (v) => onChange({ category: v }), 'Filter by category')}
      {selectWrap(filters.country, COUNTRY_OPTIONS, (v) => onChange({ country: v }), 'Filter by country')}

      <DateRangePicker
        value={filters.range}
        onChange={(range) => onChange({ range })}
        placeholder="Start date → End date"
      />

      <div className="flex items-center gap-2 ml-auto">
        <button
          onClick={onReset}
          className="px-3.5 py-2 rounded-lg text-xs font-medium text-neutral-gray-dark hover:bg-neutral-bg-light cursor-pointer border border-transparent"
        >
          Reset
        </button>
        <button
          onClick={() => activeCount > 0 && onReset()}
          title={activeCount > 0 ? 'Clear all filters' : 'Filters'}
          className={cn(
            "flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium border cursor-pointer transition-colors",
            activeCount > 0
              ? "bg-[#453DD8] border-[#453DD8] text-white hover:bg-[#3a33c0]"
              : "bg-[#453DD8]/80 border-[#453DD8] text-white hover:bg-[#453DD8]"
          )}
        >
          <Filter className="h-3.5 w-3.5" />
          {activeCount > 0 && (
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] font-bold text-[#453DD8]">
              {activeCount}
            </span>
          )}
          Filter
        </button>
      </div>
    </div>
  );
}
