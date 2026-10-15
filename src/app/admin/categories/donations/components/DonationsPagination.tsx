'use client';

import React, { useMemo } from 'react';

interface DonationsPaginationProps {
  page: number;
  totalPages: number;
  shownFrom: number;
  shownTo: number;
  total: number;
  /** 'donations' or 'programs' — used in the "Showing X to Y of Z ..." line */
  noun: string;
  onChange: (page: number) => void;
}

type PageItem = number | 'gap';

/**
 * "Showing 1 to 10 of 248 donations" + windowed pagination
 * (e.g. ‹ 1 2 3 … 25 ›) so long lists don't render every page button.
 */
export default function DonationsPagination({
  page, totalPages, shownFrom, shownTo, total, noun, onChange,
}: DonationsPaginationProps) {
  const pages = useMemo<PageItem[]>(() => {
    const candidates = new Set<number>([1, totalPages, page - 1, page, page + 1]);
    // First page also shows page 3, matching the design (1 2 3 … 25).
    if (page === 1) candidates.add(3);
    const sorted = [...candidates].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);
    const items: PageItem[] = [];
    let prev = 0;
    for (const p of sorted) {
      if (p - prev > 1) items.push('gap');
      items.push(p);
      prev = p;
    }
    return items;
  }, [page, totalPages]);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 py-3 border-t border-neutral-gray-light text-xs text-neutral-gray-medium">
      <span>
        Showing {shownFrom} to {shownTo} of {total} {noun}
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
        {pages.map((item, i) =>
          item === 'gap' ? (
            <span key={`gap-${i}`} className="px-1 text-neutral-gray-light">&hellip;</span>
          ) : (
            <button
              key={item}
              onClick={() => onChange(item)}
              className={`h-7 w-7 rounded text-xs font-semibold cursor-pointer ${page === item ? 'bg-[#453DD8] text-white border border-[#453DD8]' : 'border border-neutral-gray-light bg-white hover:bg-neutral-bg-light'}`}
            >
              {item}
            </button>
          )
        )}
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
