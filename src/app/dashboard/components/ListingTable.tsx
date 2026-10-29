'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { Crown, Eye, Pencil, SearchX } from 'lucide-react';
import { cn } from '@/lib/utils';
import { statusKind, statusLabel, STATUS_CHIP } from '../my-listings/statusUtils';
import RowActionMenu from './RowActionMenu';

export interface ListingTableRow {
  id: string;
  name: string;
  category: string;
  status: string;
  image?: string;
  submittedAt?: string | null;
  approvedAt?: string | null;
  /** true = Pro Plan, false = Free Plan. */
  payingUser?: boolean;
  onPreview: () => void;
  onEdit: () => void;
  /** Shown only for free-plan innovation listings. */
  onUpgrade?: () => void;
}

interface ListingTableProps {
  rows: ListingTableRow[];
  loading?: boolean;
  /** Adds the Date Approved column - only used on My Listings. */
  showApprovedDate?: boolean;
  /** Adds the Subscription column for listings that return `payingUser`. */
  showSubscription?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  pageSize?: number;
}

/** Formats an ISO/date string for the table, leaving unknown values as a dash. */
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

function displayStatus(status: string): string {
  const normalized = status.trim().toLowerCase();
  if (normalized === 'active' || normalized === 'inactive') {
    return normalized.charAt(0).toUpperCase() + normalized.slice(1);
  }
  return statusLabel(status);
}

function statusChip(status: string): string {
  const normalized = status.trim().toLowerCase();
  if (normalized === 'active') return 'bg-green-100 text-green-700';
  if (normalized === 'inactive') return 'bg-red-100 text-red-700';
  return STATUS_CHIP[statusKind(status)];
}

/** Shows whether a listing was submitted on the paid or free plan. */
function SubscriptionBadge({ payingUser }: { payingUser?: boolean }) {
  const paid = payingUser === true;
  return (
    <span
      className={cn(
        'inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-bold',
        paid ? 'bg-emerald-50 text-emerald-700' : 'bg-neutral-bg-light text-neutral-gray-dark'
      )}
    >
      {paid ? 'Pro Plan' : 'Free Plan'}
    </span>
  );
}

/**
 * User-side listings/submissions table. Mirrors the admin submission tables
 * but uses the red brand palette, and always offers Preview + Edit actions.
 */
export default function ListingTable({
  rows,
  loading = false,
  showApprovedDate = false,
  showSubscription = false,
  emptyTitle = 'Nothing here yet',
  emptyDescription = 'Items will appear here once they are available.',
  pageSize = 8,
}: ListingTableProps) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));

  // Reset to the first page whenever the visible rows change (tab switch).
  useEffect(() => {
    setPage(1);
  }, [rows]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const paginated = useMemo(
    () => rows.slice((page - 1) * pageSize, page * pageSize),
    [rows, page, pageSize]
  );

  if (loading) {
    return (
      <div className="space-y-3 p-4" aria-busy="true" aria-label="Loading table">
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

  if (rows.length === 0) {
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
        <table className={cn('w-full text-xs', showSubscription ? 'min-w-[900px]' : 'min-w-[760px]')}>
          <thead>
            <tr className="border-y border-brand-red-100 bg-brand-red-50/60">
              <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-brand-red-700">
                Name
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-brand-red-700">
                Status
              </th>
              {showSubscription && (
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-brand-red-700">
                  Subscription
                </th>
              )}
              <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-brand-red-700">
                Date Submitted
              </th>
              {showApprovedDate && (
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-brand-red-700">
                  Date Approved
                </th>
              )}
              <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-brand-red-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((row) => (
              <tr
                key={row.id}
                className="border-b border-neutral-gray-light/70 last:border-0 transition-colors hover:bg-brand-red-50/30"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-bg-light">
                      {row.image ? (
                        <Image
                          src={row.image}
                          alt=""
                          fill
                          sizes="40px"
                          className="object-cover"
                          unoptimized={/^(data:|blob:)|X-Amz-/i.test(row.image)}
                        />
                      ) : (
                        <span className="grid h-full w-full place-items-center text-[10px] font-bold text-brand-red-600">
                          {row.name.slice(0, 1).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-neutral-black">{row.name}</p>
                      <p className="mt-0.5 text-[11px] text-neutral-gray-medium">{row.category}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      'inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-bold',
                      statusChip(row.status)
                    )}
                  >
                    {displayStatus(row.status)}
                  </span>
                </td>
                {showSubscription && (
                  <td className="px-4 py-3">
                    <SubscriptionBadge payingUser={row.payingUser} />
                  </td>
                )}
                <td className="whitespace-nowrap px-4 py-3 text-xs text-neutral-gray-dark">
                  {formatDate(row.submittedAt)}
                </td>
                {showApprovedDate && (
                  <td className="whitespace-nowrap px-4 py-3 text-xs text-neutral-gray-dark">
                    {formatDate(row.approvedAt)}
                  </td>
                )}
                <td className="px-4 py-3 text-right">
                  <RowActionMenu
                    label={`Actions for ${row.name}`}
                    items={[
                      {
                        label: 'Preview',
                        icon: <Eye className="h-3.5 w-3.5" />,
                        onClick: row.onPreview,
                      },
                      {
                        label: 'Edit',
                        icon: <Pencil className="h-3.5 w-3.5" />,
                        onClick: row.onEdit,
                      },
                      ...(row.payingUser === false && row.onUpgrade
                        ? [{
                            label: 'Upgrade to Pro',
                            icon: <Crown className="h-3.5 w-3.5 text-amber-500" />,
                            onClick: row.onUpgrade,
                          }]
                        : []),
                    ]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {rows.length > pageSize && (
        <div className="flex flex-col items-center justify-between gap-3 border-t border-neutral-gray-light px-4 py-3 text-xs text-neutral-gray-medium sm:flex-row">
          <span>
            Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, rows.length)} of{' '}
            {rows.length}
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
                    : 'border border-neutral-gray-light bg-white text-neutral-gray-dark'
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
