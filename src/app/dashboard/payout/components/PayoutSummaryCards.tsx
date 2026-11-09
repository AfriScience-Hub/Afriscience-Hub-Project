'use client';

import { CheckCircle2, DollarSign, Lock, Send } from 'lucide-react';
import { formatUsd } from '../data';

interface PayoutHeaderProps {
  readyTotal: number;
  readyCount: number;
  inProgressTotal: number;
  inProgressCount: number;
  requestedTotal: number;
  requestedCount: number;
  paidOutTotal: number;
  paidOutCount: number;
}

export default function PayoutSummaryCards({
  readyTotal,
  readyCount,
  inProgressTotal,
  inProgressCount,
  requestedTotal,
  requestedCount,
  paidOutTotal,
  paidOutCount,
}: PayoutHeaderProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50/80 to-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
            Ready for Checkout
          </span>
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
        </div>
        <p className="mt-2 text-2xl font-bold text-neutral-black">{formatUsd(readyTotal)}</p>
        <p className="mt-1 text-xs text-neutral-gray-medium">
          {readyCount} completed job{readyCount === 1 ? '' : 's'}
        </p>
      </div>

      <div className="rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50/80 to-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wide text-amber-800">
            In Escrow (Working)
          </span>
          <Lock className="h-4 w-4 text-amber-600" />
        </div>
        <p className="mt-2 text-2xl font-bold text-neutral-black">{formatUsd(inProgressTotal)}</p>
        <p className="mt-1 text-xs text-neutral-gray-medium">
          {inProgressCount} job{inProgressCount === 1 ? '' : 's'} in progress
        </p>
      </div>

      <div className="rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50/80 to-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wide text-blue-800">
            Payout Requested
          </span>
          <Send className="h-4 w-4 text-blue-600" />
        </div>
        <p className="mt-2 text-2xl font-bold text-neutral-black">{formatUsd(requestedTotal)}</p>
        <p className="mt-1 text-xs text-neutral-gray-medium">
          {requestedCount} awaiting disbursement
        </p>
      </div>

      <div className="rounded-xl border border-neutral-gray-light bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wide text-neutral-gray-medium">
            Total Paid Out
          </span>
          <DollarSign className="h-4 w-4 text-brand-navy-900" />
        </div>
        <p className="mt-2 text-2xl font-bold text-neutral-black">{formatUsd(paidOutTotal)}</p>
        <p className="mt-1 text-xs text-neutral-gray-medium">
          {paidOutCount} settled job{paidOutCount === 1 ? '' : 's'}
        </p>
      </div>
    </div>
  );
}
