'use client';

import { Filter, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AWARD_TYPES, COMPETITION_TYPES, AWARD_YEARS, WORLD_COUNTRIES } from '@/app/data/mockData';
import { getLevelsForCompetition } from '../data';

type AwardsFilterSidebarProps = {
  selectedType: string | null;
  selectedCompetition: string | null;
  selectedLevel: string | null;
  selectedYear: string;
  selectedCountry: string;
  activeFilterCount: number;
  showFilters: boolean;
  collapsedSections: Record<string, boolean>;
  setSelectedType: (val: string | null) => void;
  setSelectedCompetition: (val: string | null) => void;
  setSelectedLevel: (val: string | null) => void;
  setSelectedYear: (val: string) => void;
  setSelectedCountry: (val: string) => void;
  toggleSection: (key: string) => void;
  resetFilters: () => void;
};

export default function AwardsFilterSidebar({
  selectedType,
  selectedCompetition,
  selectedLevel,
  selectedYear,
  selectedCountry,
  activeFilterCount,
  showFilters,
  collapsedSections,
  setSelectedType,
  setSelectedCompetition,
  setSelectedLevel,
  setSelectedYear,
  setSelectedCountry,
  toggleSection,
  resetFilters,
}: AwardsFilterSidebarProps) {
  const isCompetition = selectedType === 'Competitions Award';
  const levels = selectedCompetition ? getLevelsForCompetition(selectedCompetition) : [];
  const isAutoLevel = levels.length === 1;

  return (
    <aside className={cn(
      "w-full lg:w-72 flex-shrink-0 space-y-6 transition-all duration-300",
      showFilters ? "block" : "hidden lg:block"
    )}>
      <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm lg:sticky lg:top-20 max-h-[calc(100vh-6rem)] overflow-y-auto custom-scrollbar">
        <div className="mb-4 flex items-center justify-between border-b border-neutral-gray-light pb-3">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-brand-red-600" />
            <h3 className="font-bold text-neutral-black">Filter</h3>
            {activeFilterCount > 0 && (
              <span className="flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-brand-red-600 text-white text-[10px] font-bold">
                {activeFilterCount}
              </span>
            )}
          </div>
          <button onClick={resetFilters} className="text-xs text-brand-red-600 hover:underline font-medium">Reset All</button>
        </div>

        <div className="space-y-0 divide-y divide-neutral-gray-light">

          {/* 1. Type */}
          <div className="py-4 first:pt-0">
            <button onClick={() => toggleSection('type')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black hover:text-brand-red-600 transition-colors">
              <span className="flex items-center gap-1.5">
                Type
                {selectedType && <span className="text-[10px] font-bold text-brand-red-600 bg-brand-red-100 px-1.5 py-0.5 rounded-full">1</span>}
              </span>
              <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", !collapsedSections.type && "rotate-180")} />
            </button>
            {!collapsedSections.type && (
              <div className="mt-3 space-y-2 animate-in fade-in duration-200">
                {AWARD_TYPES.map(type => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="awardType"
                      checked={selectedType === type}
                      onChange={() => {
                        setSelectedType(type);
                        if (type !== 'Competitions Award') {
                          setSelectedCompetition(null);
                          setSelectedLevel(null);
                        }
                      }}
                      className="border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600"
                    />
                    <span className="text-sm text-neutral-gray-dark group-hover:text-brand-navy-900 transition-colors">{type}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* 2. Category (Competitions Award only) */}
          <div className="py-4">
            <button onClick={() => toggleSection('category')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black hover:text-brand-red-600 transition-colors">
              <span className="flex items-center gap-1.5">
                Category
                {!isCompetition && selectedType && <span className="text-[9px] text-slate-400 font-normal">(Competitions only)</span>}
                {selectedCompetition && <span className="text-[10px] font-bold text-brand-red-600 bg-brand-red-100 px-1.5 py-0.5 rounded-full">1</span>}
              </span>
              <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", !collapsedSections.category && "rotate-180")} />
            </button>
            {!collapsedSections.category && (
              <div className="mt-3 animate-in fade-in duration-200">
                {!isCompetition && selectedType ? (
                  <p className="text-xs text-neutral-gray-medium">Only applicable to Competitions Award</p>
                ) : (
                  <div className="space-y-2">
                    {COMPETITION_TYPES.map(cat => (
                      <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="radio"
                          name="awardCategory"
                          checked={selectedCompetition === cat}
                          onChange={() => {
                            setSelectedCompetition(cat);
                            const lvls = getLevelsForCompetition(cat);
                            if (lvls.length === 1) setSelectedLevel(lvls[0]);
                            else setSelectedLevel(null);
                          }}
                          disabled={!isCompetition}
                          className="border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600 disabled:opacity-40"
                        />
                        <span className={cn("text-sm", isCompetition ? "text-neutral-gray-dark group-hover:text-brand-navy-900" : "text-neutral-gray-light")}>{cat}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 3. Level (Competitions Award only) */}
          <div className="py-4">
            <button onClick={() => toggleSection('level')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black hover:text-brand-red-600 transition-colors">
              <span className="flex items-center gap-1.5">
                Level
                {!isCompetition && selectedType && <span className="text-[9px] text-slate-400 font-normal">(Competitions only)</span>}
                {selectedLevel && <span className="text-[10px] font-bold text-brand-red-600 bg-brand-red-100 px-1.5 py-0.5 rounded-full">1</span>}
              </span>
              <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", !collapsedSections.level && "rotate-180")} />
            </button>
            {!collapsedSections.level && (
              <div className="mt-3 animate-in fade-in duration-200">
                {!isCompetition && selectedType ? (
                  <p className="text-xs text-neutral-gray-medium">Only applicable to Competitions Award</p>
                ) : !selectedCompetition ? (
                  <p className="text-xs text-neutral-gray-medium">Select a category first</p>
                ) : isAutoLevel ? (
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" checked={true} readOnly className="rounded border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600" />
                    <span className="text-sm text-neutral-gray-dark">{levels[0]}</span>
                  </label>
                ) : (
                  <div className="space-y-2">
                    {levels.map(lvl => (
                      <label key={lvl} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="radio"
                          name="awardLevel"
                          checked={selectedLevel === lvl}
                          onChange={() => setSelectedLevel(lvl)}
                          className="border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600"
                        />
                        <span className="text-sm text-neutral-gray-dark group-hover:text-brand-navy-900 transition-colors">{lvl}</span>
                      </label>
                    ))}
                  </div>
                )}
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
                  {AWARD_YEARS.map(y => <option key={y} value={y.toString()}>{y}</option>)}
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
                  <option value="">Select Country</option>
                  {WORLD_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            )}
          </div>

        </div>
      </div>
    </aside>
  );
}
