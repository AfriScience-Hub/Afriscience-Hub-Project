'use client';

import { Search, School, GraduationCap, SlidersHorizontal } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Button } from '../../components/ui/Button';

type InstituteHeaderProps = {
  activeTab: 'schools' | 'universities';
  onTabChange: (tab: 'schools' | 'universities') => void;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  showFilters: boolean;
  setShowFilters: (val: boolean) => void;
};

export default function InstituteHeader({
  activeTab, onTabChange,
  searchTerm, setSearchTerm,
  showFilters, setShowFilters,
}: InstituteHeaderProps) {
  return (
    <div className="bg-white border-b border-neutral-gray-light sticky top-0 z-30 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-neutral-black">Institutes Directory</h1>
            <p className="text-sm text-slate-500">Discover top educational centers across Africa</p>
          </div>

          <div className="relative w-full md:max-w-md">
            <input
              type="text"
              placeholder={activeTab === 'universities' ? "Search universities database..." : "Search schools, location..."}
              className="w-full h-12 rounded-xl border border-neutral-gray-light pl-12 pr-4 shadow-sm focus:border-brand-red-600 focus:outline-none focus:ring-2 focus:ring-brand-red-600/20 text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex p-1 bg-slate-100 rounded-lg w-full sm:w-auto">
            <button
              onClick={() => onTabChange('schools')}
              className={cn(
                "flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-md text-sm font-semibold transition-all duration-200",
                activeTab === 'schools'
                  ? "bg-white text-brand-red-600 shadow-sm ring-1 ring-slate-200"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
              )}
            >
              <School className="h-4 w-4" />
              Primary & Secondary
            </button>
            <button
              onClick={() => onTabChange('universities')}
              className={cn(
                "flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-md text-sm font-semibold transition-all duration-200",
                activeTab === 'universities'
                  ? "bg-white text-brand-red-600 shadow-sm ring-1 ring-slate-200"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
              )}
            >
              <GraduationCap className="h-4 w-4" />
              Universities
            </button>
          </div>

          <Button
            variant="outline"
            className="w-full sm:w-auto lg:hidden flex items-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>
      </div>
    </div>
  );
}
