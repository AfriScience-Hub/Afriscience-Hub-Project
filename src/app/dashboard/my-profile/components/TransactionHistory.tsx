'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, Clock, Inbox } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchWalletHistory, type WalletTransaction } from '@/store/walletSlice';
import { formatMinor, formatISOString, statusTone } from '../walletUtils';
import { TransactionDetailModal } from './TransactionDetailModal';

export const GENERAL_TRANSACTIONS = [
  {
    id: '#INV-2026-0042',
    date: 'April 5, 2026',
    description: 'Innovation Listing Fee',
    amount: '\u20A615,000',
    status: 'COMPLETED',
  },
  {
    id: '#INV-2026-0038',
    date: 'March 22, 2026',
    description: 'Premium Membership',
    amount: '\u20A650,000',
    status: 'COMPLETED',
  },
  {
    id: '#INV-2026-0029',
    date: 'March 10, 2026',
    description: 'Innovation Listing Fee',
    amount: '\u20A615,000',
    status: 'PENDING',
  },
];

type GeneralTxn = (typeof GENERAL_TRANSACTIONS)[number];

interface TransactionHistoryProps {
  filter: 'general' | 'wallet';
}

/** Shows a popup with the full text only when the cell content is truncated. */
function HoverTip({ text, className }: { text: string; className?: string }) {
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);

  const handleEnter = (e: React.MouseEvent<HTMLSpanElement>) => {
    const el = e.currentTarget;
    if (el.scrollWidth <= el.clientWidth) return;
    const rect = el.getBoundingClientRect();
    setPos({ left: rect.left, top: rect.bottom + 6 });
  };

  return (
    <>
      <span className={className} onMouseEnter={handleEnter} onMouseLeave={() => setPos(null)}>
        {text}
      </span>
      {pos && typeof document !== 'undefined' && createPortal(
        <div
          style={{ position: 'fixed', left: pos.left, top: pos.top }}
          className="z-[100] max-w-sm rounded-lg bg-neutral-black px-3 py-2 text-xs text-white shadow-lg whitespace-normal break-words"
        >
          {text}
        </div>,
        document.body,
      )}
    </>
  );
}

/** Builds a compact page list, e.g. 1 … 4 5 6 … 20. */
function paginationItems(page: number, totalPages: number): (number | 'gap')[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const items: (number | 'gap')[] = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(totalPages - 1, page + 1);
  if (start > 2) items.push('gap');
  for (let p = start; p <= end; p++) items.push(p);
  if (end < totalPages - 1) items.push('gap');
  items.push(totalPages);
  return items;
}

export function TransactionHistory({ filter }: TransactionHistoryProps) {
  const dispatch = useAppDispatch();
  const { history, historyLoading, historyError, historyPagination } = useAppSelector((s) => s.wallet);
  const isWallet = filter === 'wallet';
  const [selected, setSelected] = useState<WalletTransaction | null>(null);

  const rows = isWallet ? history : GENERAL_TRANSACTIONS;
  const isEmpty = rows.length === 0;

  const currentPage = historyPagination?.page ?? 1;
  const totalPages = historyPagination?.totalPages ?? 1;
  const totalItems = historyPagination?.totalItems ?? rows.length;
  const pageSize = historyPagination?.limit || rows.length || 1;
  const shownFrom = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const shownTo = Math.min(currentPage * pageSize, totalItems);

  const goToPage = (page: number) => {
    if (!isWallet || historyLoading) return;
    if (page < 1 || page > totalPages || page === currentPage) return;
    dispatch(fetchWalletHistory({ page }));
  };

  return (
    <div className="pt-4">
      <div className="mb-4">
        <h4 className="text-base font-bold text-neutral-black flex items-center gap-2">
          <Clock className="h-4 w-4 text-neutral-gray-medium" />
          {isWallet ? 'Wallet Transaction History' : 'Transaction History'}
        </h4>
        {isWallet && !isEmpty && (
          <p className="text-xs text-neutral-gray-medium mt-1">Select a transaction to view its full details.</p>
        )}
      </div>

      <div className="rounded-lg border border-neutral-gray-light overflow-hidden">
        {isEmpty && !(isWallet && historyLoading) ? (
          <div className="p-10 text-center">
            <Inbox className="h-8 w-8 text-neutral-gray-medium mx-auto mb-3" />
            <p className="text-sm text-neutral-gray-medium">
              {isWallet ? 'No wallet transactions yet.' : 'No transactions yet.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto" aria-busy={isWallet && historyLoading}>
            <table className="w-full min-w-[680px] text-sm">
              {isWallet && historyLoading && (
                <caption className="sr-only">Loading wallet transactions</caption>
              )}
              <thead>
                <tr className="bg-neutral-bg-light border-b border-neutral-gray-light">
                  <th className="text-left px-4 py-3 font-medium text-neutral-gray-dark">
                    {isWallet ? 'Reference' : 'Invoice ID'}
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-gray-dark">Date</th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-gray-dark">Description</th>
                  <th className="text-right px-4 py-3 font-medium text-neutral-gray-dark">Amount</th>
                  <th className="text-center px-4 py-3 font-medium text-neutral-gray-dark">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-gray-light">
                {isWallet && historyLoading
                  ? Array.from({ length: 5 }).map((_, index) => (
                      <tr key={`wallet-history-skeleton-${index}`} aria-hidden="true">
                        <td className="px-4 py-3">
                          <div className="h-3.5 w-36 animate-pulse rounded bg-neutral-gray-light" />
                        </td>
                        <td className="px-4 py-3">
                          <div className="h-3.5 w-24 animate-pulse rounded bg-neutral-gray-light" />
                        </td>
                        <td className="px-4 py-3">
                          <div className="h-3.5 w-48 animate-pulse rounded bg-neutral-gray-light" />
                        </td>
                        <td className="px-4 py-3">
                          <div className="ml-auto h-3.5 w-20 animate-pulse rounded bg-neutral-gray-light" />
                        </td>
                        <td className="px-4 py-3">
                          <div className="mx-auto h-5 w-20 animate-pulse rounded-full bg-neutral-gray-light" />
                        </td>
                      </tr>
                    ))
                  : rows.map((tx) => {
                  const general = tx as GeneralTxn;
                  let desc = general.description;
                  let amount = general.amount;
                  let status = general.status;
                  let id = general.id;
                  let date = general.date;

                  if (isWallet) {
                    const w = tx as NonNullable<(typeof history)[number]>;
                    id = w.reference || w.id;
                    date = formatISOString(w.createdAt);
                    desc = w.description || w.type || 'Wallet transaction';
                    amount = formatMinor(w.amount, 'USD');
                    status = w.status;
                  }

                  return (
                    <tr
                      key={tx.id}
                      onClick={() => { if (isWallet) setSelected(tx as WalletTransaction); }}
                      className={`transition-colors hover:bg-neutral-bg-light ${isWallet ? 'cursor-pointer' : ''}`}
                    >
                      <td className="px-4 py-3 font-medium text-neutral-black">
                        <HoverTip text={id} className="block max-w-[200px] truncate" />
                      </td>
                      <td className="px-4 py-3 text-neutral-gray-medium">
                        <HoverTip text={date} className="block max-w-[160px] truncate" />
                      </td>
                      <td className="px-4 py-3 text-neutral-gray-medium">
                        <HoverTip text={desc} className="block max-w-[240px] truncate" />
                      </td>
                      <td className="px-4 py-3 text-right font-medium text-neutral-black">{amount}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${statusTone(status)}`}>
                          {status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {isWallet && historyPagination && totalItems > 0 && (
          <div className="flex flex-col items-center justify-between gap-3 border-t border-neutral-gray-light bg-neutral-bg-light/40 px-4 py-3 text-xs text-neutral-gray-medium sm:flex-row">
            <span>
              Showing {shownFrom} to {shownTo} of {totalItems}{' '}
              {totalItems === 1 ? 'transaction' : 'transactions'}
            </span>
            <div className="flex items-center gap-1" aria-label="Transaction history pagination">
              <button
                type="button"
                onClick={() => goToPage(currentPage - 1)}
                disabled={!historyPagination.hasPrevious || historyLoading}
                className="grid h-7 w-7 cursor-pointer place-items-center rounded border border-neutral-gray-light bg-white text-neutral-gray-dark transition-colors hover:bg-brand-red-50 hover:text-brand-red-600 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>

              {paginationItems(currentPage, totalPages).map((item, index) =>
                item === 'gap' ? (
                  <span key={`gap-${index}`} className="px-1">
                    &hellip;
                  </span>
                ) : (
                  <button
                    key={item}
                    type="button"
                    onClick={() => goToPage(item)}
                    disabled={historyLoading}
                    aria-label={`Page ${item}`}
                    aria-current={item === currentPage ? 'page' : undefined}
                    className={`h-7 min-w-7 cursor-pointer rounded px-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                      item === currentPage
                        ? 'bg-brand-red-600 text-white'
                        : 'border border-neutral-gray-light bg-white text-neutral-gray-dark hover:bg-brand-red-50 hover:text-brand-red-600'
                    }`}
                  >
                    {item}
                  </button>
                )
              )}

              <button
                type="button"
                onClick={() => goToPage(currentPage + 1)}
                disabled={!historyPagination.hasNext || historyLoading}
                className="grid h-7 w-7 cursor-pointer place-items-center rounded border border-neutral-gray-light bg-white text-neutral-gray-dark transition-colors hover:bg-brand-red-50 hover:text-brand-red-600 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Next page"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {isWallet && historyError && (
        <p className="text-sm text-red-600 mt-2">{historyError}</p>
      )}

      <TransactionDetailModal transaction={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
