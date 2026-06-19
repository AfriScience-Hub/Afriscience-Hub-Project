'use client';

import { Award, Share2, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { Search } from 'lucide-react';

type AwardsHeaderProps = {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  activeFilterCount: number;
  showFilters: boolean;
  setShowFilters: (val: boolean) => void;
  onShare: () => void;
};

export default function AwardsHeader({
  searchTerm,
  setSearchTerm,
  activeFilterCount,
  showFilters,
  setShowFilters,
  onShare,
}: AwardsHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Award className="h-8 w-8 text-amber-500" />
          <div>
            <h1 className="text-3xl font-bold text-neutral-black">Awards</h1>
            <p className="text-sm text-neutral-gray-dark max-w-2xl">
              Celebrating outstanding contributions of developers, sponsors, competitors and donors to African science, technology and innovation. Become a Hall of Fame member by achieving the best amongst all.
            </p>
          </div>
        </div>
        <Button
          onClick={onShare}
          variant="outline"
          className="flex items-center gap-2 border-brand-red-600 text-brand-red-600 hover:bg-brand-red-50"
        >
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-gray-medium" />
        <input
          type="text"
          placeholder="Search award bearers by name, ID Tag, type, category, level, year, country or keyword"
          className="w-full rounded-xl border border-neutral-gray-light pl-12 pr-4 py-3 shadow-sm focus:border-brand-red-600 focus:outline-none focus:ring-1 focus:ring-brand-red-600 transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Button
        variant="outline"
        className="lg:hidden flex items-center gap-2"
        onClick={() => setShowFilters(!showFilters)}
      >
        <SlidersHorizontal className="h-4 w-4" />
        {showFilters ? 'Hide Filters' : 'Show Filters'}
        {activeFilterCount > 0 && (
          <span className="flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-brand-red-600 text-white text-[10px] font-bold">
            {activeFilterCount}
          </span>
        )}
      </Button>
    </div>
  );
}
