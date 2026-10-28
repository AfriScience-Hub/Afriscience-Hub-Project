'use client';

import { Check, ThumbsUp, X } from 'lucide-react';
import { LISTING_REVIEW_NOTICE } from './FormActions';

interface ListingSuccessModalProps {
  open: boolean;
  /** e.g. "Afro-Innovation listing submitted" */
  title?: string;
  /** A short confirmation line tailored to the listing category. */
  message?: string;
  /** Button label; defaults to "Go to Submissions". */
  actionLabel?: string;
  onGoToSubmissions: () => void;
  onClose?: () => void;
}

/**
 * Shown after a listing has been submitted successfully instead of a toast +
 * automatic redirect. The user decides when to go to their submissions.
 */
export default function ListingSuccessModal({
  open, title = 'Listing submitted', message, actionLabel = 'Go to Submissions', onGoToSubmissions, onClose,
}: ListingSuccessModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 cursor-pointer rounded-full p-1.5 text-neutral-gray-medium transition-colors hover:bg-neutral-bg-light hover:text-neutral-black"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        <div className="px-6 pb-6 pt-10 text-center sm:px-8">
          <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-white shadow-lg shadow-green-600/30">
              <Check className="h-9 w-9" strokeWidth={3} />
            </div>
          </div>

          <p className="mb-1 inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-green-700">
            <ThumbsUp className="h-3.5 w-3.5" /> Successful
          </p>
          <h2 className="text-2xl font-bold text-neutral-black">{title}</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-neutral-gray-medium">
            {message || 'Your listing has been submitted and is now waiting for review.'}
          </p>

          <div className="mt-6 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4 text-left">
            <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
              <Check className="h-4 w-4 text-blue-600" />
            </div>
            <p className="text-xs leading-5 text-blue-800">{LISTING_REVIEW_NOTICE}</p>
          </div>

          <button
            type="button"
            onClick={onGoToSubmissions}
            className="mt-6 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700"
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
