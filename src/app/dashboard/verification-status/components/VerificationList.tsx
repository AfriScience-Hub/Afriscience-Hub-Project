'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { BadgeCheck, ExternalLink, SearchX } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { UserInnovation } from '../../my-listings/listingData';

interface VerificationListProps {
  listings: UserInnovation[];
  loading?: boolean;
  onSelect: (listing: UserInnovation) => void;
  emptyTitle?: string;
  emptyDescription?: string;
  pageSize?: number;
}

function formatDate(value?: string | null): string {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function VerificationList({
  listings,
  loading = false,
  onSelect,
  emptyTitle = 'No verified listings yet',
  emptyDescription = 'Verified listings will appear here once the review is complete.',
  pageSize = 8,
}: VerificationListProps) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(listings.length / pageSize));

  useEffect(() => {
    setPage(1);
  }, [listings]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const paginated = useMemo(
    () => listings.slice((page - 1) * pageSize, page * pageSize),
    [listings, page, pageSize],
  );

  if (loading) {
    return (
      <div className="space-y-3 p-4" aria-busy="true" aria-label="Loading verified listings">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex animate-pulse items-center gap-4 rounded-lg border border-neutral-gray-light p-3"
          >
            <div className="h-10 w-10 rounded-lg bg-neutral-bg-light" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-2/5 rounded bg-neutral-bg-light" />
              <div className="h-2.5 w-1/4 rounded bg-neutral-bg-light" />
            </div>
            <div className="h-7 w-16 rounded bg-neutral-bg-light" />
          </div>
        ))}
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-14 text-center">
        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-brand-red-50">
          <SearchX className="h-7 w-7 text-brand-red-300" />
        </div>
        <p className="text-sm font-semibold text-neutral-black">{emptyTitle}</p>
        <p className="mt-1 max-w-sm text-xs text-neutral-gray-medium">{emptyDescription}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] text-xs">
          <thead>
            <tr className="border-y border-brand-red-100 bg-brand-red-50/60">
              <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-brand-red-700">
                Name
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-brand-red-700">
                Status
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-brand-red-700">
                Date Submitted
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-brand-red-700">
                Date Approved
              </th>
              <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-brand-red-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((listing) => (
              <tr
                key={listing.id}
                role="link"
                tabIndex={0}
                onClick={() => onSelect(listing)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelect(listing);
                  }
                }}
                className="cursor-pointer border-b border-neutral-gray-light/70 last:border-0 transition-colors hover:bg-brand-red-50/30 focus:bg-brand-red-50/30 focus:outline-none"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-bg-light">
                      {listing.image ? (
                        <Image
                          src={listing.image}
                          alt=""
                          fill
                          sizes="40px"
                          className="object-cover"
                          unoptimized={/^(data:|blob:)|X-Amz-/i.test(listing.image)}
                        />
                      ) : (
                        <span className="grid h-full w-full place-items-center text-[10px] font-bold text-brand-red-600">
                          {listing.name.slice(0, 1).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-neutral-black">{listing.name}</p>
                      <p className="mt-0.5 text-[11px] text-neutral-gray-medium">{listing.category}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-bold text-green-700">
                    <BadgeCheck className="h-3 w-3" />
                    Verified
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-xs text-neutral-gray-dark">
                  {formatDate(listing.submittedAt)}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-xs text-neutral-gray-dark">
                  {formatDate(listing.approvedAt)}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(listing);
                    }}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-brand-red-600 px-3 py-1.5 text-[11px] font-semibold text-white transition-colors hover:bg-brand-red-700"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    View Listing
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {listings.length > pageSize && (
        <div className="flex flex-col items-center justify-between gap-3 border-t border-neutral-gray-light px-4 py-3 text-xs text-neutral-gray-medium sm:flex-row">
          <span>
            Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, listings.length)} of{' '}
            {listings.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="grid h-7 w-7 cursor-pointer place-items-center rounded border border-neutral-gray-light bg-white disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Previous page"
            >
              ‹
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPage(i + 1)}
                className={cn(
                  'h-7 w-7 cursor-pointer rounded text-xs font-semibold',
                  page === i + 1
                    ? 'bg-brand-red-600 text-white'
                    : 'border border-neutral-gray-light bg-white text-neutral-gray-dark',
                )}
                aria-label={`Page ${i + 1}`}
                aria-current={page === i + 1 ? 'page' : undefined}
              >
                {i + 1}
              </button>
            ))}
            <button
              type="button"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="grid h-7 w-7 cursor-pointer place-items-center rounded border border-neutral-gray-light bg-white disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next page"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
