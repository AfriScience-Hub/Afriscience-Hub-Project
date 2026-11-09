'use client';

import { useState } from 'react';
import {
  CheckCircle2, Loader2, ShieldCheck, Wallet, X, Building, CreditCard,
} from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { formatUsd, type PayoutJob } from '../data';

interface PayoutCheckoutModalProps {
  open: boolean;
  jobs: PayoutJob[];
  onClose: () => void;
  onConfirm: (destination: string, note: string) => void;
}

export default function PayoutCheckoutModal({
  open,
  jobs,
  onClose,
  onConfirm,
}: PayoutCheckoutModalProps) {
  const [destination, setDestination] = useState<'wallet' | 'bank'>('wallet');
  const [accountDetails, setAccountDetails] = useState('');
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!open || jobs.length === 0) return null;

  const grossTotal = jobs.reduce((sum, j) => sum + j.price, 0);
  const feeTotal = jobs.reduce((sum, j) => sum + j.platformFee, 0);
  const netTotal = jobs.reduce((sum, j) => sum + j.total, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (destination === 'bank' && !accountDetails.trim()) return;
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      onConfirm(
        destination === 'wallet'
          ? 'ASH Wallet'
          : `Bank Account (${accountDetails.trim()})`,
        note.trim(),
      );
      setNote('');
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
      onClick={() => { if (!submitting) onClose(); }}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-gradient-to-r from-brand-navy-900 to-brand-navy-800 px-6 py-4 text-white">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
              <Wallet className="h-4 w-4 text-white" />
            </span>
            <div>
              <h3 className="text-base font-bold">Escrow Payout Checkout</h3>
              <p className="text-xs text-white/75">
                Notify AfriScience Hub to release your completed job earnings
              </p>
            </div>
          </div>
          <button
            type="button"
            disabled={submitting}
            onClick={onClose}
            className="rounded-full bg-white/10 p-1.5 text-white hover:bg-white/20 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto p-6">
          <div className="flex items-start gap-2.5 rounded-xl border border-blue-100 bg-blue-50/70 p-3.5 text-xs text-blue-900">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
            <p className="leading-relaxed">
              Client payments are securely held in escrow by AfriScience Hub while work is in progress. Submitting this checkout notifies the platform to disburse the funds for your completed jobs.
            </p>
          </div>

          {/* Selected Jobs Breakdown */}
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-neutral-gray-medium">
              Completed Jobs Included ({jobs.length})
            </p>
            <div className="max-h-40 divide-y divide-neutral-gray-light overflow-y-auto rounded-xl border border-neutral-gray-light bg-neutral-bg-light/50">
              {jobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between gap-3 px-3.5 py-2.5 text-xs">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-neutral-black">{job.jobTitle}</p>
                    <p className="truncate text-[11px] text-neutral-gray-medium">
                      {job.reference} &bull; {job.clientName}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-bold text-neutral-black">{formatUsd(job.total)}</p>
                    <p className="text-[10px] text-neutral-gray-medium">Price: {formatUsd(job.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Totals */}
          <div className="space-y-1.5 rounded-xl border border-neutral-gray-light bg-white p-4 text-xs">
            <div className="flex justify-between text-neutral-gray-dark">
              <span>Gross Job Price</span>
              <span className="font-semibold text-neutral-black">{formatUsd(grossTotal)}</span>
            </div>
            <div className="flex justify-between text-neutral-gray-dark">
              <span>Platform Service Fee (5%)</span>
              <span className="font-medium text-neutral-black">-{formatUsd(feeTotal)}</span>
            </div>
            <div className="flex justify-between border-t border-neutral-gray-light pt-2 text-sm font-bold text-neutral-black">
              <span>Total Escrow Payout</span>
              <span className="text-brand-red-600">{formatUsd(netTotal)}</span>
            </div>
          </div>

          {/* Payout Destination */}
          <div>
            <label className="mb-2 block text-xs font-bold text-neutral-black">
              Payout Destination
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setDestination('wallet')}
                className={`flex items-center gap-2.5 rounded-xl border p-3 text-left transition cursor-pointer ${
                  destination === 'wallet'
                    ? 'border-brand-navy-900 bg-brand-navy-900 text-white'
                    : 'border-neutral-gray-light bg-white text-neutral-black hover:bg-neutral-bg-light'
                }`}
              >
                <CreditCard className="h-4 w-4 shrink-0" />
                <div>
                  <p className="text-xs font-bold">ASH Wallet</p>
                  <p className={`text-[10px] ${destination === 'wallet' ? 'text-white/75' : 'text-neutral-gray-medium'}`}>
                    Instant credit
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setDestination('bank')}
                className={`flex items-center gap-2.5 rounded-xl border p-3 text-left transition cursor-pointer ${
                  destination === 'bank'
                    ? 'border-brand-navy-900 bg-brand-navy-900 text-white'
                    : 'border-neutral-gray-light bg-white text-neutral-black hover:bg-neutral-bg-light'
                }`}
              >
                <Building className="h-4 w-4 shrink-0" />
                <div>
                  <p className="text-xs font-bold">Bank Transfer</p>
                  <p className={`text-[10px] ${destination === 'bank' ? 'text-white/75' : 'text-neutral-gray-medium'}`}>
                    1–3 business days
                  </p>
                </div>
              </button>
            </div>
          </div>

          {destination === 'bank' && (
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-neutral-black">
                Bank &amp; Account Details <span className="text-brand-red-600">*</span>
              </label>
              <input
                type="text"
                required
                value={accountDetails}
                onChange={(e) => setAccountDetails(e.target.value)}
                placeholder="e.g. Access Bank • 0123456789 • Account Name"
                className="w-full rounded-xl border border-neutral-gray-light px-3.5 py-2.5 text-xs text-neutral-black outline-none focus:border-brand-navy-900 focus:ring-2 focus:ring-brand-navy-900/20"
              />
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-neutral-black">
              Note to Platform <span className="font-normal text-neutral-gray-medium">(Optional)</span>
            </label>
            <textarea
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add any reference or note for the finance team..."
              className="w-full resize-none rounded-xl border border-neutral-gray-light px-3.5 py-2 text-xs text-neutral-black outline-none focus:border-brand-navy-900 focus:ring-2 focus:ring-brand-navy-900/20"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <Button
              type="button"
              variant="outline"
              disabled={submitting}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={submitting || (destination === 'bank' && !accountDetails.trim())}
              className="gap-2 bg-brand-red-600 hover:bg-brand-red-700"
            >
              {submitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle2 className="h-4 w-4" />
              )}
              {submitting ? 'Notifying Platform...' : `Checkout ${formatUsd(netTotal)}`}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
