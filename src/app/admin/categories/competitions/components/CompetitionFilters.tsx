'use client';

import React from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { STATUS_OPTIONS, CATEGORY_OPTIONS, COUNTRY_OPTIONS } from '../data';
import DateRangePicker, { type DateRange } from './DateRangePicker';

export interface CompetitionFiltersState {
  range: DateRange;
  status: string;
  category: string;
  country: string;
}

export const DEFAULT_FILTERS: CompetitionFiltersState = {
  range: { from: null, to: null },
  status: 'All Status',
  category: 'All Categories',
  country: 'All Countries',
};

interface CompetitionFiltersProps {
  filters: CompetitionFiltersState;
  onChange: (patch: Partial<CompetitionFiltersState>) => void;
  onClear: () => void;
}

const selectClass = 'px-2.5 py-1.5 text-xs rounded-lg border text-neutral-gray-dark bg-white cursor-pointer outline-none appearance-none pr-7';

/**
 * Filter bar for the Competitions overview.
 * Tracks active filter count; the Filters button highlights when filters
 * are applied and doubles as a "clear all" action.
 */
export default function CompetitionFilters({ filters, onChange, onClear }: CompetitionFiltersProps) {
  const activeCount = [
    Boolean(filters.range.from || filters.range.to),
    filters.status !== DEFAULT_FILTERS.status,
    filters.category !== DEFAULT_FILTERS.category,
    filters.country !== DEFAULT_FILTERS.country,
  ].filter(Boolean).length;

  const selectWrap = (value: string, options: readonly string[], onChangeValue: (v: string) => void, label: string) => (
    <div className="relative">
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChangeValue(e.target.value)}
        className={cn(
          selectClass,
          value !== options[0] ? "border-brand-red-600 text-brand-red-600 font-medium" : "border-neutral-gray-light"
        )}
      >
        {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-neutral-gray-medium pointer-events-none" />
    </div>
  );

  return (
    <div className="flex flex-wrap items-center gap-2">
      <DateRangePicker value={filters.range} onChange={(range) => onChange({ range })} />

      {selectWrap(filters.status, STATUS_OPTIONS, (v) => onChange({ status: v }), 'Filter by status')}
      {selectWrap(filters.category, CATEGORY_OPTIONS, (v) => onChange({ category: v }), 'Filter by category')}
      {selectWrap(filters.country, COUNTRY_OPTIONS, (v) => onChange({ country: v }), 'Filter by country')}

      <button
        onClick={() => activeCount > 0 && onClear()}
        title={activeCount > 0 ? 'Clear all filters' : 'Filters'}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border cursor-pointer transition-colors",
          activeCount > 0
            ? "bg-brand-red-600 border-brand-red-600 text-white hover:bg-brand-red-700"
            : "border-neutral-gray-light text-neutral-gray-dark hover:bg-neutral-bg-light"
        )}
      >
        <Filter className="h-3.5 w-3.5" />
        {activeCount > 0 ? 'Clear Filters' : 'Filters'}
        {activeCount > 0 && (
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] font-bold text-brand-red-600">
            {activeCount}
          </span>
        )}
      </button>
    </div>
  );
}
