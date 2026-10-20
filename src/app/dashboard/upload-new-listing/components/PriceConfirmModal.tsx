'use client';

import { Loader2 } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface PriceConfirmModalProps {
  open: boolean;
  /** Raw price for the selected stage (stored in the smallest unit). */
  price?: string;
  /** The stage the listing was submitted under. */
  stage?: string;
  saving?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * Confirms the amount a listing will cost before it is submitted.
 */
export default function PriceConfirmModal({
  open, price, stage, saving = false, onConfirm, onCancel,
}: PriceConfirmModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={() => { if (!saving) onCancel(); }}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 border-b border-neutral-gray-light">
          <h3 className="text-sm font-bold text-neutral-black">Confirm listing amount</h3>
        </div>

        <div className="p-5 space-y-4">
          <div className="rounded-xl border border-neutral-gray-light bg-neutral-bg-light/50 px-4 py-5 text-center">
            <p className="text-[11px] font-semibold text-neutral-gray-medium uppercase tracking-wide">
              Amount to be paid
            </p>
            <p className="text-3xl font-bold text-neutral-black mt-1">
              {price ? formatPrice(price) : '—'}
            </p>
            {stage && (
              <p className="text-xs text-neutral-gray-medium mt-1">
                Listing cost for the <span className="font-semibold text-neutral-black">{stage}</span> stage
              </p>
            )}
            {!price && (
              <p className="text-xs text-neutral-gray-medium mt-1">
                No price is set for the selected stage.
              </p>
            )}
          </div>

          <p className="text-xs text-neutral-gray-medium">
            Your listing will be submitted for review by the AfriScience Hub team. You will be
            notified once it has been reviewed.
          </p>
        </div>

        <div className="flex gap-2 justify-end px-5 py-4 border-t border-neutral-gray-light">
          <button
            onClick={onCancel}
            disabled={saving}
            className="px-4 py-2 rounded-xl border border-neutral-gray-light text-xs font-semibold hover:bg-neutral-bg-light cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={saving}
            className="px-5 py-2 rounded-xl bg-brand-red-600 text-white text-xs font-semibold hover:bg-brand-red-700 cursor-pointer disabled:opacity-50 inline-flex items-center gap-1.5"
          >
            {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            {saving ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
}
