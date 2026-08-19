'use client';

import { Filter, ChevronDown } from 'lucide-react';
import {
  IMPACT_PROGRAMS,
  IMPACT_STATUSES,
  IMPACT_COUNTRIES,
  IMPACT_YEARS,
  type ImpactProgram,
  type ImpactStatus,
} from '@/app/data/impactData';
import { cn } from '@/lib/utils';

interface ImpactFiltersProps {
  showFilters: boolean;
  activeFilterCount: number;
  selectedPrograms: ImpactProgram[];
  selectedStatuses: ImpactStatus[];
  selectedCountry: string;
  selectedYear: string;
  collapsedSections: Record<string, boolean>;
  onToggleSection: (key: string) => void;
  onToggleProgram: (p: ImpactProgram) => void;
  onToggleStatus: (s: ImpactStatus) => void;
  onCountryChange: (v: string) => void;
  onYearChange: (v: string) => void;
  onClearAll: () => void;
}

export default function ImpactFilters({
  showFilters,
  activeFilterCount,
  selectedPrograms,
  selectedStatuses,
  selectedCountry,
  selectedYear,
  collapsedSections,
  onToggleSection,
  onToggleProgram,
  onToggleStatus,
  onCountryChange,
  onYearChange,
  onClearAll,
}: ImpactFiltersProps) {
  return (
    <aside
      className={cn(
        'w-full lg:w-80 flex-shrink-0 space-y-4 transition-all duration-300',
        showFilters ? 'block' : 'hidden lg:block'
      )}
    >
      <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm lg:sticky lg:top-20 max-h-[calc(100vh-6rem)] overflow-y-auto custom-scrollbar">
        <div className="mb-4 flex items-center justify-between border-b border-neutral-gray-light pb-3">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-brand-red-600" />
            <h3 className="font-bold text-neutral-black">Filters</h3>
            {activeFilterCount > 0 && (
              <span className="flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-brand-red-600 text-white text-[10px] font-bold">
                {activeFilterCount}
              </span>
            )}
          </div>
          <button
            onClick={onClearAll}
            className="text-xs text-brand-red-600 hover:underline font-medium cursor-pointer"
          >
            Reset All
          </button>
        </div>

        <div className="space-y-5">
          <FilterSection
            title="Programs"
            count={selectedPrograms.length}
            collapsed={!!collapsedSections.programs}
            onToggle={() => onToggleSection('programs')}
          >
            {IMPACT_PROGRAMS.map((program) => (
              <label key={program} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedPrograms.includes(program)}
                  onChange={() => onToggleProgram(program)}
                  className="rounded border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600 h-3.5 w-3.5"
                />
                <span className="text-sm text-neutral-gray-dark group-hover:text-brand-navy-900 transition-colors">
                  {program}
                </span>
              </label>
            ))}
          </FilterSection>

          <FilterSection
            title="Status"
            count={selectedStatuses.length}
            collapsed={!!collapsedSections.status}
            onToggle={() => onToggleSection('status')}
          >
            {IMPACT_STATUSES.map((status) => (
              <label key={status} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedStatuses.includes(status)}
                  onChange={() => onToggleStatus(status)}
                  className="rounded border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600 h-3.5 w-3.5"
                />
                <span className="text-sm text-neutral-gray-dark group-hover:text-brand-navy-900 transition-colors">
                  {status}
                </span>
              </label>
            ))}
          </FilterSection>

          <FilterSection
            title="Year"
            count={selectedYear ? 1 : 0}
            collapsed={!!collapsedSections.year}
            onToggle={() => onToggleSection('year')}
          >
            <select
              value={selectedYear}
              onChange={(e) => onYearChange(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light focus:ring-2 focus:ring-brand-red-600 focus:border-brand-red-600 transition-all text-sm"
            >
              <option value="">Select Year</option>
              {IMPACT_YEARS.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </FilterSection>

          <FilterSection
            title="Country"
            count={selectedCountry ? 1 : 0}
            collapsed={!!collapsedSections.country}
            onToggle={() => onToggleSection('country')}
          >
            <select
              value={selectedCountry}
              onChange={(e) => onCountryChange(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light focus:ring-2 focus:ring-brand-red-600 focus:border-brand-red-600 transition-all text-sm"
            >
              <option value="">Select Country</option>
              {IMPACT_COUNTRIES.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </FilterSection>
        </div>

      </div>
    </aside>
  );
}

function FilterSection({
  title,
  count,
  collapsed,
  onToggle,
  children,
}: {
  title: string;
  count: number;
  collapsed: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-sm font-bold text-neutral-black mb-2 cursor-pointer"
      >
        <span className="flex items-center gap-1.5">
          {title}
          {count > 0 && (
            <span className="text-[10px] font-bold text-brand-red-600 bg-brand-red-100 px-1.5 py-0.5 rounded-full">
              {count}
            </span>
          )}
        </span>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-neutral-gray-medium transition-transform',
            !collapsed && 'rotate-180'
          )}
        />
      </button>
      {!collapsed && <div className="space-y-1.5">{children}</div>}
    </div>
  );
}
