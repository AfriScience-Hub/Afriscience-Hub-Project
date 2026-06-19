"use client"

import { Vote, Share2, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';

type VotingHeaderProps = {
  activeFilterCount: number;
  showFilters: boolean;
  setShowFilters: (val: boolean) => void;
  onShare: () => void;
};

export default function VotingHeader({
  activeFilterCount,
  showFilters,
  setShowFilters,
  onShare,
}: VotingHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Vote className="h-8 w-8 text-brand-red-600" />
          <div>
            <h1 className="text-3xl font-bold text-neutral-black">Voting</h1>
            <p className="text-sm text-neutral-gray-medium">Top 10 Competition Finalists</p>
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

      <p className="text-neutral-gray-dark max-w-3xl">
        Vote for your favorite finalists! Each user gets <strong>one free vote</strong> per category. Boost votes are available to show extra support. Positions update dynamically based on total votes.
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
