'use client';

import { CheckSquare, Share2, SlidersHorizontal } from 'lucide-react';

type VotingHeaderProps = {
  showMobileFilters: boolean;
  setShowMobileFilters: (val: boolean) => void;
  openPageShare: () => void;
};

export default function VotingHeader({
  showMobileFilters,
  setShowMobileFilters,
  openPageShare,
}: VotingHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
      <div className="container">
        <div className="flex items-center gap-4">
          <CheckSquare className="h-6 w-6 text-[#ff3b30]" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#0f1d33] lg:text-3xl">
              Voting
            </h1>
            <p className="text-md text-[#9aa7bc]">Top 10 Competition Finalists</p>
          </div>
        </div>
        <p className="mt-3 text-md text-gray-800">
          Vote for your favorite finalists! Each voter gets{' '}
          <span className="font-bold text-[#304866]">one free vote</span> per category. Boost votes
          are available to show extra support. Positions are updated automatically based on total
          number of votes.
        </p>
        <button
          type="button"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="mt-6 inline-flex items-center gap-3 rounded-md border-2 border-[#9dafc7] bg-white px-3 py-2 text-sm font-semibold text-[#0f1d33] shadow-sm transition hover:bg-[#f8fbff] lg:hidden"
        >
          <SlidersHorizontal className="h-5 w-5" />
          {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      <button
        type="button"
        onClick={openPageShare}
        className="cursor-pointer inline-flex w-fit items-center gap-1 rounded-sm border border-[#ff3b30] bg-white px-2 py-1 text-xs font-semibold text-[#ff3b30] transition hover:bg-[#ff3b30]/30 lg:gap-3 lg:px-3 lg:py-3 lg:text-sm"
      >
        <Share2 className="h-3 w-3 lg:h-5 lg:w-5" />
        Share
      </button>
    </div>
  );
}
