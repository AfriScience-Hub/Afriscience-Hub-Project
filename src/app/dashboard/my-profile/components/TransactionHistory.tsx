'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Clock, Inbox } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';
import { formatMinor, formatISOString, statusTone } from '../walletUtils';

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

export function TransactionHistory({ filter }: TransactionHistoryProps) {
  const { history, historyLoading, historyError } = useAppSelector((s) => s.wallet);
  const isWallet = filter === 'wallet';

  const rows = isWallet ? history : GENERAL_TRANSACTIONS;
  const isEmpty = rows.length === 0;

  return (
    <div className="pt-4">
      <h4 className="text-base font-bold text-neutral-black mb-4 flex items-center gap-2">
        <Clock className="h-4 w-4 text-neutral-gray-medium" />
        {isWallet ? 'Wallet Transaction History' : 'Transaction History'}
      </h4>

      <div className="rounded-lg border border-neutral-gray-light overflow-hidden">
        {isWallet && historyLoading && rows.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-sm text-neutral-gray-medium">Loading wallet transactions&hellip;</p>
          </div>
        ) : isEmpty ? (
          <div className="p-10 text-center">
            <Inbox className="h-8 w-8 text-neutral-gray-medium mx-auto mb-3" />
            <p className="text-sm text-neutral-gray-medium">
              {isWallet ? 'No wallet transactions yet.' : 'No transactions yet.'}
            </p>
          </div>
        ) : (
          <table className="w-full text-sm">
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
              {rows.map((tx) => {
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
                  amount = formatMinor(w.amount, w.currency);
                  status = w.status;
                }

                return (
                  <tr key={tx.id} className="hover:bg-neutral-bg-light transition-colors">
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
        )}
      </div>

      {isWallet && historyError && (
        <p className="text-sm text-red-600 mt-2">{historyError}</p>
      )}
    </div>
  );
}
