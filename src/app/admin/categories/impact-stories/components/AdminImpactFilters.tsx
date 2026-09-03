'use client';

import { Filter, ChevronDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  IMPACT_PROGRAMS,
  IMPACT_STATUSES,
  IMPACT_COUNTRIES,
  IMPACT_YEARS,
  type ImpactProgram,
  type ImpactStatus,
} from '@/app/data/impactData';

interface Props {
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

export default function AdminImpactFilters({
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
}: Props) {
  return (
    <aside
      className={cn(
        'w-full lg:w-[280px] flex-shrink-0 transition-all',
        showFilters ? 'block' : 'hidden lg:block'
      )}
    >
      <div className="rounded-xl border border-neutral-gray-light bg-white shadow-sm lg:sticky lg:top-20 overflow-hidden max-h-[calc(100vh-6rem)] overflow-y-auto custom-scrollbar">
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-gray-light">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-brand-navy-900" />
            <h3 className="text-sm font-bold text-neutral-black">Filters</h3>
            {activeFilterCount > 0 && (
              <span className="h-5 min-w-5 px-1.5 flex items-center justify-center rounded-full bg-brand-red-600 text-white text-[10px] font-bold">
                {activeFilterCount}
              </span>
            )}
          </div>
          {activeFilterCount > 0 && (
            <button
              onClick={onClearAll}
              className="flex items-center gap-1 text-xs font-medium text-brand-red-600 hover:underline cursor-pointer"
            >
              <X className="h-3 w-3" /> Clear
            </button>
          )}
        </div>

        <div className="p-4 space-y-4">
          <FilterSection
            title="Program"
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
                  className="h-3.5 w-3.5 rounded border-neutral-gray-light text-brand-navy-900 focus:ring-brand-navy-900"
                />
                <span className="text-xs text-neutral-gray-dark group-hover:text-neutral-black">
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
                  className="h-3.5 w-3.5 rounded border-neutral-gray-light text-brand-navy-900 focus:ring-brand-navy-900"
                />
                <span className="text-xs text-neutral-gray-dark group-hover:text-neutral-black">
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
              className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs text-neutral-gray-dark focus:ring-2 focus:ring-brand-navy-900 focus:border-brand-navy-900 outline-none"
            >
              <option value="">All Years</option>
              {IMPACT_YEARS.map((y) => (
                <option key={y} value={y}>
                  {y}
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
              className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs text-neutral-gray-dark focus:ring-2 focus:ring-brand-navy-900 focus:border-brand-navy-900 outline-none"
            >
              <option value="">All Countries</option>
              {IMPACT_COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {c}
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
    <div className="border-b border-neutral-gray-light/60 pb-4 last:border-0 last:pb-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between cursor-pointer mb-2"
      >
        <span className="flex items-center gap-1.5 text-xs font-bold text-neutral-black">
          {title}
          {count > 0 && (
            <span className="text-[10px] font-bold text-brand-navy-900 bg-brand-navy-900/10 px-1.5 py-0.5 rounded-full">
              {count}
            </span>
          )}
        </span>
        <ChevronDown
          className={cn(
            'h-3.5 w-3.5 text-neutral-gray-medium transition-transform',
            !collapsed && 'rotate-180'
          )}
        />
      </button>
      {!collapsed && <div className="space-y-2">{children}</div>}
    </div>
  );
}
