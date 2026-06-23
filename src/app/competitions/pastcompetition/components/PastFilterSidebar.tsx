'use client';

import { Filter, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const POSITION_RANGES = ['1st - 10th', '11th - 20th', '21st - 30th'];

type PastFilterSidebarProps = {
  selectedType: string;
  setSelectedType: (v: string) => void;
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
  selectedPosition: string;
  setSelectedPosition: (v: string) => void;
  selectedYear: string;
  setSelectedYear: (v: string) => void;
  selectedCountry: string;
  setSelectedCountry: (v: string) => void;
  showFilters: boolean;
  collapsedSections: Record<string, boolean>;
  toggleSection: (key: string) => void;
  resetFilters: () => void;
  activeFilterCount: number;
  categories: string[];
  competitionTypes: string[];
  years: number[];
  countries: string[];
};

export default function PastFilterSidebar({
  selectedType, setSelectedType, selectedCategory, setSelectedCategory,
  selectedPosition, setSelectedPosition, selectedYear, setSelectedYear,
  selectedCountry, setSelectedCountry, showFilters, collapsedSections,
  toggleSection, resetFilters, activeFilterCount, categories,
  competitionTypes, years, countries,
}: PastFilterSidebarProps) {
  return (
    <aside className={cn("w-full lg:w-72 flex-shrink-0 space-y-6 transition-all duration-300", showFilters ? "block" : "hidden lg:block")}>
      <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm lg:sticky lg:top-20 max-h-[calc(100vh-6rem)] overflow-y-auto custom-scrollbar">
        <div className="mb-4 flex items-center justify-between border-b border-neutral-gray-light pb-3">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-brand-red-600" />
            <h3 className="font-bold text-neutral-black">Filters</h3>
            {activeFilterCount > 0 && (
              <span className="flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-brand-red-600 text-white text-[10px] font-bold">{activeFilterCount}</span>
            )}
          </div>
          <button onClick={resetFilters} className="text-xs text-brand-red-600 hover:underline font-medium">Reset All</button>
        </div>
        <div className="space-y-0 divide-y divide-neutral-gray-light">

          {/* Type */}
          <div className="py-4 first:pt-0">
            <button onClick={() => toggleSection('type')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black hover:text-brand-red-600 transition-colors">
              <span className="flex items-center gap-1.5">Type{selectedType && <span className="text-[10px] font-bold text-brand-red-600 bg-brand-red-100 px-1.5 py-0.5 rounded-full">1</span>}</span>
              <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", !collapsedSections.type && "rotate-180")} />
            </button>
            {!collapsedSections.type && (
              <div className="mt-3 space-y-2 animate-in fade-in duration-200">
                {competitionTypes.map(type => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="past-type"
                      checked={selectedType === type}
                      onChange={() => { setSelectedType(type); setSelectedCategory(''); }}
                      className="border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600"
                    />
                    <span className="text-sm text-neutral-gray-dark group-hover:text-brand-navy-900 transition-colors">{type}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Category */}
          <div className="py-4">
            <button onClick={() => toggleSection('category')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black hover:text-brand-red-600 transition-colors">
              <span className="flex items-center gap-1.5">Category{selectedCategory && <span className="text-[10px] font-bold text-brand-red-600 bg-brand-red-100 px-1.5 py-0.5 rounded-full">1</span>}</span>
              <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", !collapsedSections.category && "rotate-180")} />
            </button>
            {!collapsedSections.category && (
              <div className="mt-3 animate-in fade-in duration-200">
                {!selectedType ? (
                  <p className="text-xs text-slate-400 italic">Select a type first</p>
                ) : categories.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No categories available</p>
                ) : (
                  <div className="space-y-2">{categories.map(cat => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                      <input type="radio" name="past-category" checked={selectedCategory === cat} onChange={() => setSelectedCategory(cat)} className="border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600" />
                      <span className="text-sm text-neutral-gray-dark group-hover:text-brand-navy-900 transition-colors">{cat}</span>
                    </label>
                  ))}</div>
                )}
              </div>
            )}
          </div>

          {/* Position */}
          <div className="py-4">
            <button onClick={() => toggleSection('position')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black hover:text-brand-red-600 transition-colors">
              <span className="flex items-center gap-1.5">Position{selectedPosition && <span className="text-[10px] font-bold text-brand-red-600 bg-brand-red-100 px-1.5 py-0.5 rounded-full">1</span>}</span>
              <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", !collapsedSections.position && "rotate-180")} />
            </button>
            {!collapsedSections.position && (
              <div className="mt-3 space-y-2 animate-in fade-in duration-200">
                {POSITION_RANGES.map(range => (
                  <label key={range} className="flex items-center gap-2 cursor-pointer group">
                    <input type="radio" name="past-position" checked={selectedPosition === range} onChange={() => setSelectedPosition(range)} className="border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600" />
                    <span className="text-sm text-neutral-gray-dark group-hover:text-brand-navy-900 transition-colors">{range}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Year */}
          <div className="py-4">
            <button onClick={() => toggleSection('year')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black hover:text-brand-red-600 transition-colors">
              Year
              <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", !collapsedSections.year && "rotate-180")} />
            </button>
            {!collapsedSections.year && (
              <div className="mt-3 animate-in fade-in duration-200">
                <select className="w-full rounded-lg border border-neutral-gray-light text-sm p-2 bg-neutral-bg-light focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                  <option value="">All Years</option>
                  {years.map(y => <option key={y} value={y.toString()}>{y}</option>)}
                </select>
              </div>
            )}
          </div>

          {/* Country */}
          <div className="py-4 last:pb-0">
            <button onClick={() => toggleSection('country')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black hover:text-brand-red-600 transition-colors">
              Country
              <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", !collapsedSections.country && "rotate-180")} />
            </button>
            {!collapsedSections.country && (
              <div className="mt-3 animate-in fade-in duration-200">
                <select className="w-full rounded-lg border border-neutral-gray-light text-sm p-2 bg-neutral-bg-light focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600" value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
                  <option value="">All Countries</option>
                  {countries.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            )}
          </div>

        </div>
      </div>
    </aside>
  );
}
