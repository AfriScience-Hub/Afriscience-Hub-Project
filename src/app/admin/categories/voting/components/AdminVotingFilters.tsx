'use client';

import { Filter, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { COMPETITION_TYPES, VOTING_YEARS, AFRICAN_COUNTRIES } from '@/app/data/mockData';
import { COMPETITION_CATEGORY_MAP } from '@/app/voting/data';

interface Props {
  selectedCompetition: string | null;
  selectedCategory: string | null;
  selectedYear: string;
  selectedCountry: string;
  activeFilterCount: number;
  showFilters: boolean;
  collapsedSections: Record<string, boolean>;
  toggleSection: (key: string) => void;
  setSelectedCompetition: (v: string | null) => void;
  setSelectedCategory: (v: string | null) => void;
  setSelectedYear: (v: string) => void;
  setSelectedCountry: (v: string) => void;
  resetFilters: () => void;
}

export default function AdminVotingFilters({
  selectedCompetition,
  selectedCategory,
  selectedYear,
  selectedCountry,
  activeFilterCount,
  showFilters,
  collapsedSections,
  toggleSection,
  setSelectedCompetition,
  setSelectedCategory,
  setSelectedYear,
  setSelectedCountry,
  resetFilters,
}: Props) {
  const compCategories = selectedCompetition ? COMPETITION_CATEGORY_MAP[selectedCompetition] || [] : [];

  return (
    <aside className={cn('w-full lg:w-72 flex-shrink-0 transition-all duration-300', showFilters ? 'block' : 'hidden lg:block')}>
      <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm lg:sticky lg:top-20 max-h-[calc(100vh-6rem)] overflow-y-auto custom-scrollbar">
        <div className="mb-4 flex items-center justify-between border-b border-neutral-gray-light pb-3">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-brand-red-600" />
            <h3 className="font-bold text-neutral-black text-sm">Filters</h3>
            {activeFilterCount > 0 && (
              <span className="flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-brand-red-600 text-white text-[10px] font-bold">{activeFilterCount}</span>
            )}
          </div>
          <button onClick={resetFilters} className="text-xs text-brand-red-600 hover:underline font-medium cursor-pointer">
            Reset All
          </button>
        </div>

        <div className="space-y-0 divide-y divide-neutral-gray-light">
          {/* Competition */}
          <div className="py-4 first:pt-0">
            <button onClick={() => toggleSection('competition')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black cursor-pointer">
              <span className="flex items-center gap-1.5">Competition {selectedCompetition && <span className="text-[10px] font-bold text-brand-red-600 bg-brand-red-100 px-1.5 py-0.5 rounded-full">1</span>}</span>
              <ChevronDown className={cn('h-4 w-4 text-slate-400 transition-transform', !collapsedSections.competition && 'rotate-180')} />
            </button>
            {!collapsedSections.competition && (
              <div className="mt-3 space-y-2">
                {COMPETITION_TYPES.map((type) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="admin-competition"
                      checked={selectedCompetition === type}
                      onChange={() => {
                        setSelectedCompetition(type);
                        const cats = COMPETITION_CATEGORY_MAP[type] || [];
                        if (cats.length === 1) setSelectedCategory(cats[0]);
                        else setSelectedCategory(null);
                      }}
                      className="border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600 h-3.5 w-3.5"
                    />
                    <span className="text-xs text-neutral-gray-dark group-hover:text-neutral-black">{type}</span>
                  </label>
                ))}
                {selectedCompetition && (
                  <button onClick={() => { setSelectedCompetition(null); setSelectedCategory(null); }} className="text-[11px] text-neutral-gray-medium hover:text-brand-red-600 cursor-pointer">Clear competition</button>
                )}
              </div>
            )}
          </div>

          {/* Category - dependent */}
          <div className="py-4">
            <button onClick={() => toggleSection('category')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black cursor-pointer">
              <span className="flex items-center gap-1.5">Category {selectedCategory && <span className="text-[10px] font-bold text-brand-red-600 bg-brand-red-100 px-1.5 py-0.5 rounded-full">1</span>}</span>
              <ChevronDown className={cn('h-4 w-4 text-slate-400 transition-transform', !collapsedSections.category && 'rotate-180')} />
            </button>
            {!collapsedSections.category && (
              <div className="mt-3">
                {compCategories.length === 0 ? (
                  <p className="text-xs text-neutral-gray-medium">Select a competition first</p>
                ) : compCategories.length === 1 ? (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked readOnly className="rounded border-neutral-gray-light text-brand-red-600 h-3.5 w-3.5" />
                    <span className="text-xs text-neutral-gray-dark">{compCategories[0]}</span>
                  </label>
                ) : (
                  <div className="space-y-2">
                    {compCategories.map((cat) => (
                      <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="radio"
                          name="admin-category"
                          checked={selectedCategory === cat}
                          onChange={() => setSelectedCategory(cat)}
                          className="border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600 h-3.5 w-3.5"
                        />
                        <span className="text-xs text-neutral-gray-dark group-hover:text-neutral-black">{cat}</span>
                      </label>
                    ))}
                    {selectedCategory && (
                      <button onClick={() => setSelectedCategory(null)} className="text-[11px] text-neutral-gray-medium hover:text-brand-red-600 cursor-pointer">Clear category</button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Year */}
          <div className="py-4">
            <button onClick={() => toggleSection('year')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black cursor-pointer">
              Year
              <ChevronDown className={cn('h-4 w-4 text-slate-400 transition-transform', !collapsedSections.year && 'rotate-180')} />
            </button>
            {!collapsedSections.year && (
              <div className="mt-3">
                <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="w-full rounded-lg border border-neutral-gray-light text-xs p-2 bg-neutral-bg-light focus:ring-1 focus:ring-brand-red-600">
                  <option value="">All Years</option>
                  {VOTING_YEARS.map((y) => (
                    <option key={y} value={String(y)}>{y}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Country */}
          <div className="py-4 last:pb-0">
            <button onClick={() => toggleSection('country')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black cursor-pointer">
              Country
              <ChevronDown className={cn('h-4 w-4 text-slate-400 transition-transform', !collapsedSections.country && 'rotate-180')} />
            </button>
            {!collapsedSections.country && (
              <div className="mt-3">
                <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className="w-full rounded-lg border border-neutral-gray-light text-xs p-2 bg-neutral-bg-light focus:ring-1 focus:ring-brand-red-600">
                  <option value="">All Countries</option>
                  {AFRICAN_COUNTRIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
