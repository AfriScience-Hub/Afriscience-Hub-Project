'use client';

import { SlidersHorizontal } from 'lucide-react';
import { Button } from '../../components/ui/Button';

type InnovationHeaderProps = {
  showFilters: boolean;
  setShowFilters: (val: boolean) => void;
  activeFilterCount: number;
};

export default function InnovationHeader({ showFilters, setShowFilters, activeFilterCount }: InnovationHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-neutral-black">Afro-Innovations</h1>
      <p className="mt-2 text-neutral-gray-dark">
        Discover ground-breaking solutions developed by African minds to solve global challenges. Search, filter, and connect with innovators.
      </p>
      <Button
        variant="outline"
        className="mt-4 lg:hidden flex items-center gap-2"
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
