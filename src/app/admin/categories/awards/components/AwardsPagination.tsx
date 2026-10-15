'use client';

import React from 'react';

interface AwardsPaginationProps {
  page: number;
  totalPages: number;
  shownFrom: number;
  shownTo: number;
  total: number;
  onChange: (page: number) => void;
}

/**
 * "Showing 1 to 10 of 12 awards" + numbered pagination controls.
 */
export default function AwardsPagination({ page, totalPages, shownFrom, shownTo, total, onChange }: AwardsPaginationProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 py-3 border-t border-neutral-gray-light text-xs text-neutral-gray-medium">
      <span>
        Showing {shownFrom} to {shownTo} of {total} awards
      </span>
      <div className="flex items-center gap-1 flex-wrap">
        <button
          disabled={page === 1}
          onClick={() => onChange(page - 1)}
          aria-label="Previous page"
          className="h-7 w-7 rounded border border-neutral-gray-light grid place-items-center disabled:opacity-40 cursor-pointer hover:bg-neutral-bg-light"
        >
          &lsaquo;
        </button>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => onChange(i + 1)}
            className={`h-7 w-7 rounded text-xs font-semibold cursor-pointer ${page === i + 1 ? 'bg-[#453DD8] text-white border border-[#453DD8]' : 'border border-neutral-gray-light bg-white hover:bg-neutral-bg-light'}`}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={page === totalPages}
          onClick={() => onChange(page + 1)}
          aria-label="Next page"
          className="h-7 w-7 rounded border border-neutral-gray-light grid place-items-center disabled:opacity-40 cursor-pointer hover:bg-neutral-bg-light"
        >
          &rsaquo;
        </button>
      </div>
    </div>
  );
}
