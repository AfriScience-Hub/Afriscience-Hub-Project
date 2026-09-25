'use client';

import { X, Wallet } from 'lucide-react';
import type { WalletTransaction } from '@/store/walletSlice';
import { formatMinor, formatDateTime, statusTone, WALLET_MODAL_OVERLAY } from '../walletUtils';

const CURRENCY = 'USD';

interface TransactionDetailModalProps {
  transaction: WalletTransaction | null;
  onClose: () => void;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5 border-b border-neutral-gray-light last:border-0">
      <span className="text-xs font-medium uppercase tracking-wide text-neutral-gray-medium">{label}</span>
      <span className="text-sm text-neutral-black text-right break-words max-w-[60%]">{value || '\u2014'}</span>
    </div>
  );
}

export function TransactionDetailModal({ transaction, onClose }: TransactionDetailModalProps) {
  if (!transaction) return null;
  const w = transaction;
  const total = Number(w.totalAmount) || (Number(w.amount || 0) + Number(w.processingFee || 0));

  return (
    <div className={WALLET_MODAL_OVERLAY} onClick={onClose}>
      <div
        className="w-full max-w-md rounded-2xl bg-white shadow-xl p-6 mx-auto"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-neutral-black flex items-center gap-2">
            <Wallet className="h-5 w-5 text-brand-navy-900" /> Transaction Details
          </h3>
          <button type="button" onClick={onClose} className="text-neutral-gray-medium hover:text-neutral-black cursor-pointer transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-4 rounded-lg border border-neutral-gray-light bg-neutral-bg-light p-4">
          <p className="text-[11px] uppercase tracking-wide text-neutral-gray-medium">Amount</p>
          <p className="text-2xl font-bold text-neutral-black">{formatMinor(w.amount, CURRENCY)}</p>
          <span className={`mt-2 inline-flex px-2 py-1 rounded text-xs font-medium ${statusTone(w.status)}`}>
            {w.status}
          </span>
        </div>

        <div className="rounded-lg border border-neutral-gray-light px-4">
          <Row label="Reference" value={w.reference || w.id} />
          <Row label="Date" value={formatDateTime(w.createdAt)} />
          <Row label="Description" value={w.description || w.type || 'Wallet transaction'} />
          <Row label="Amount" value={formatMinor(w.amount, CURRENCY)} />
          <Row label="Processing Fee" value={formatMinor(w.processingFee, CURRENCY)} />
          <Row label="Total Paid" value={formatMinor(total, CURRENCY)} />
          <Row label="Balance Before" value={formatMinor(w.balanceBefore, CURRENCY)} />
          <Row label="Balance After" value={formatMinor(w.balanceAfter, CURRENCY)} />
        </div>
      </div>
    </div>
  );
}
