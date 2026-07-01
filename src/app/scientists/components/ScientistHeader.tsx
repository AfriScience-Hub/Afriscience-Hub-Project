'use client';

import { SlidersHorizontal } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { cn } from '../../../lib/utils';

type ScientistHeaderProps = {
  showFilters: boolean;
  setShowFilters: (val: boolean) => void;
  activeFilterCount: number;
};

export default function ScientistHeader({ showFilters, setShowFilters, activeFilterCount }: ScientistHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-neutral-black">Find Scientists & Technologists</h1>
      <p className="mt-2 text-neutral-gray-dark">Connect with verified experts across African science and innovation ecosystems.</p>
      <Button
        variant="outline"
        className="mt-4 lg:hidden flex items-center gap-2"
        onClick={() => setShowFilters(!showFilters)}
      >
        <SlidersHorizontal className="h-4 w-4" />
        {showFilters ? 'Hide Filters' : 'Show Filters'}
        {activeFilterCount > 0 && (
          <span className={cn(
            "flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-brand-red-600 text-white text-[10px] font-bold"
          )}>
            {activeFilterCount}
          </span>
        )}
      </Button>
    </div>
  );
}
