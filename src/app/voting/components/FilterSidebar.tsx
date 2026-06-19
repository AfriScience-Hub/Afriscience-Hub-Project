"use client"

import { Filter, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { COMPETITION_TYPES, VOTING_YEARS } from '@/app/data/mockData';

type FilterSidebarProps = {
  searchTerm: string;
  selectedCompetition: string[];
  selectedCategories: string[];
  selectedYear: string;
  selectedCountry: string;
  availableCategories: string[];
  hostCountries: string[];
  activeFilterCount: number;
  showFilters: boolean;
  collapsedSections: Record<string, boolean>;
  setSelectedCompetition: (val: string[]) => void;
  setSelectedCategories: (val: string[]) => void;
  setSelectedYear: (val: string) => void;
  setSelectedCountry: (val: string) => void;
  toggleSection: (key: string) => void;
  toggleFilter: (item: string, current: string[], set: (val: string[]) => void) => void;
  resetFilters: () => void;
};

export default function FilterSidebar({
  searchTerm: _searchTerm,
  selectedCompetition,
  selectedCategories,
  selectedYear,
  selectedCountry,
  availableCategories,
  hostCountries,
  activeFilterCount,
  showFilters,
  collapsedSections,
  setSelectedCompetition,
  setSelectedCategories,
  setSelectedYear,
  setSelectedCountry,
  toggleSection,
  toggleFilter,
  resetFilters,
}: FilterSidebarProps) {
  return (
    <aside className={cn(
      "w-full lg:w-72 flex-shrink-0 space-y-6 transition-all duration-300",
      showFilters ? "block" : "hidden lg:block"
    )}>
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
            onClick={resetFilters}
            className="text-xs text-brand-red-600 hover:underline font-medium"
          >
            Reset All
          </button>
        </div>

        <div className="space-y-0 divide-y divide-neutral-gray-light">

          {/* 1. Type */}
          <div className="py-4 first:pt-0">
            <button onClick={() => toggleSection('type')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black hover:text-brand-red-600 transition-colors">
              <span className="flex items-center gap-1.5">Type</span>
              <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", !collapsedSections.type && "rotate-180")} />
            </button>
            {!collapsedSections.type && (
              <div className="mt-3 space-y-2 animate-in fade-in duration-200">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={true}
                    readOnly
                    className="rounded border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600"
                  />
                  <span className="text-sm text-neutral-gray-dark group-hover:text-brand-navy-900 transition-colors">Competition's Finalists (Top 10)</span>
                </label>
              </div>
            )}
          </div>

          {/* 2. Competition */}
          <div className="py-4">
            <button onClick={() => toggleSection('competition')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black hover:text-brand-red-600 transition-colors">
              <span className="flex items-center gap-1.5">
                Competition
                {selectedCompetition.length > 0 && (
                  <span className="text-[10px] font-bold text-brand-red-600 bg-brand-red-100 px-1.5 py-0.5 rounded-full">{selectedCompetition.length}</span>
                )}
              </span>
              <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", !collapsedSections.competition && "rotate-180")} />
            </button>
            {!collapsedSections.competition && (
              <div className="mt-3 space-y-2 animate-in fade-in duration-200">
                {COMPETITION_TYPES.map(type => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedCompetition.includes(type)}
                      onChange={() => toggleFilter(type, selectedCompetition, setSelectedCompetition)}
                      className="rounded border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600"
                    />
                    <span className="text-sm text-neutral-gray-dark group-hover:text-brand-navy-900 transition-colors">{type}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* 3. Category */}
          <div className="py-4">
            <button onClick={() => toggleSection('category')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black hover:text-brand-red-600 transition-colors">
              <span className="flex items-center gap-1.5">
                Category
                {selectedCategories.length > 0 && (
                  <span className="text-[10px] font-bold text-brand-red-600 bg-brand-red-100 px-1.5 py-0.5 rounded-full">{selectedCategories.length}</span>
                )}
              </span>
              <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", !collapsedSections.category && "rotate-180")} />
            </button>
            {!collapsedSections.category && (
              <div className="mt-3 space-y-2 animate-in fade-in duration-200">
                {availableCategories.map(cat => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleFilter(cat, selectedCategories, setSelectedCategories)}
                      className="rounded border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600"
                    />
                    <span className="text-sm text-neutral-gray-dark group-hover:text-brand-navy-900 transition-colors">{cat}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* 4. Year */}
          <div className="py-4">
            <button onClick={() => toggleSection('year')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black hover:text-brand-red-600 transition-colors">
              Year
              <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", !collapsedSections.year && "rotate-180")} />
            </button>
            {!collapsedSections.year && (
              <div className="mt-3 animate-in fade-in duration-200">
                <select
                  className="w-full rounded-lg border border-neutral-gray-light text-sm p-2 bg-neutral-bg-light focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  {VOTING_YEARS.map(y => <option key={y} value={y.toString()}>{y}</option>)}
                </select>
              </div>
            )}
          </div>

          {/* 5. Country */}
          <div className="py-4 last:pb-0">
            <button onClick={() => toggleSection('country')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black hover:text-brand-red-600 transition-colors">
              Country
              <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", !collapsedSections.country && "rotate-180")} />
            </button>
            {!collapsedSections.country && (
              <div className="mt-3 animate-in fade-in duration-200">
                <select
                  className="w-full rounded-lg border border-neutral-gray-light text-sm p-2 bg-neutral-bg-light focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                >
                  <option value="">All Countries</option>
                  {hostCountries.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            )}
          </div>

        </div>
      </div>
    </aside>
  );
}
