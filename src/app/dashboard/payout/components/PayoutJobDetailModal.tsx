'use client';

import {
  CheckCircle2, Clock, Send, ShieldCheck, X, DollarSign, User, Briefcase, Calendar,
} from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { formatUsd, type PayoutJob } from '../data';
import { cn } from '@/lib/utils';

interface PayoutJobDetailModalProps {
  job: PayoutJob | null;
  onClose: () => void;
  onCheckoutSingle: (job: PayoutJob) => void;
}

export default function PayoutJobDetailModal({
  job,
  onClose,
  onCheckoutSingle,
}: PayoutJobDetailModalProps) {
  if (!job) return null;

  const statusTone =
    job.status === 'Completed'
      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
      : job.status === 'In Progress'
        ? 'bg-amber-50 text-amber-700 border-amber-200'
        : job.status === 'Payout Requested'
          ? 'bg-blue-50 text-blue-700 border-blue-200'
          : 'bg-neutral-bg-light text-neutral-gray-dark border-neutral-gray-light';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-neutral-gray-light px-6 py-4">
          <div>
            <p className="font-mono text-xs font-semibold text-brand-red-600">{job.reference}</p>
            <h3 className="text-base font-bold text-neutral-black">Escrow Job Details</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-neutral-gray-medium hover:bg-neutral-bg-light hover:text-neutral-black cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4 p-6">
          <div>
            <p className="text-sm font-bold text-neutral-black">{job.jobTitle}</p>
            <p className="mt-0.5 text-xs text-neutral-gray-medium">
              {job.listingName} &bull; {job.listingCategory}
            </p>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-neutral-gray-light bg-neutral-bg-light/50 px-3.5 py-2.5">
            <span className="text-xs font-medium text-neutral-gray-dark">Escrow Status</span>
            <span className={cn('inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-bold', statusTone)}>
              {job.status === 'Completed' && <CheckCircle2 className="h-3 w-3" />}
              {job.status === 'In Progress' && <Clock className="h-3 w-3" />}
              {job.status === 'Payout Requested' && <Send className="h-3 w-3" />}
              {job.status === 'Paid Out' && <DollarSign className="h-3 w-3" />}
              {job.status}
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between border-b border-neutral-gray-light pb-2">
              <span className="flex items-center gap-1.5 text-neutral-gray-medium">
                <User className="h-3.5 w-3.5" /> Client
              </span>
              <span className="font-semibold text-neutral-black">{job.clientName}</span>
            </div>
            <div className="flex items-center justify-between border-b border-neutral-gray-light pb-2">
              <span className="flex items-center gap-1.5 text-neutral-gray-medium">
                <Briefcase className="h-3.5 w-3.5" /> Category
              </span>
              <span className="font-medium text-neutral-black">{job.listingCategory}</span>
            </div>
            <div className="flex items-center justify-between border-b border-neutral-gray-light pb-2">
              <span className="flex items-center gap-1.5 text-neutral-gray-medium">
                <Calendar className="h-3.5 w-3.5" /> Started On
              </span>
              <span className="font-medium text-neutral-black">{job.startDate}</span>
            </div>
            <div className="flex items-center justify-between border-b border-neutral-gray-light pb-2">
              <span className="flex items-center gap-1.5 text-neutral-gray-medium">
                <Calendar className="h-3.5 w-3.5" /> Completed On
              </span>
              <span className="font-medium text-neutral-black">
                {job.completedDate || 'Still in progress'}
              </span>
            </div>
          </div>

          <div className="space-y-1.5 rounded-xl border border-neutral-gray-light bg-neutral-bg-light/40 p-3.5 text-xs">
            <div className="flex justify-between text-neutral-gray-dark">
              <span>Job Price</span>
              <span className="font-semibold text-neutral-black">{formatUsd(job.price)}</span>
            </div>
            <div className="flex justify-between text-neutral-gray-dark">
              <span>Platform Escrow Fee (5%)</span>
              <span className="font-medium text-neutral-black">-{formatUsd(job.platformFee)}</span>
            </div>
            <div className="flex justify-between border-t border-neutral-gray-light pt-2 text-sm font-bold text-neutral-black">
              <span>Net Total Payout</span>
              <span className="text-brand-red-600">{formatUsd(job.total)}</span>
            </div>
          </div>

          <div className="flex items-start gap-2 rounded-lg border border-blue-100 bg-blue-50/70 p-3 text-[11px] text-blue-900">
            <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-600" />
            <span>{job.escrowNote}</span>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="outline" onClick={onClose}>
              Close
            </Button>
            {job.status === 'Completed' && (
              <Button
                type="button"
                onClick={() => {
                  onClose();
                  onCheckoutSingle(job);
                }}
                className="gap-1.5 bg-brand-red-600 hover:bg-brand-red-700"
              >
                <Send className="h-3.5 w-3.5" />
                Checkout {formatUsd(job.total)}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
