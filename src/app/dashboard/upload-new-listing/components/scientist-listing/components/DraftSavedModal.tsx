'use client';

import { Check, FileText, X } from 'lucide-react';

interface DraftSavedModalProps {
  open: boolean;
  title?: string;
  message?: string;
  onClose: () => void;
}

/**
 * Confirmation shown after a draft is saved. Unlike the submit-for-review
 * modal it never redirects: the user closes it and stays in the form.
 */
export default function DraftSavedModal({
  open,
  title = 'Draft saved',
  message = 'Your draft has been saved. You can close this window and continue editing your listing.',
  onClose,
}: DraftSavedModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 cursor-pointer rounded-full p-1.5 text-neutral-gray-medium transition-colors hover:bg-neutral-bg-light hover:text-neutral-black"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="px-6 pb-6 pt-10 text-center sm:px-8">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-lg shadow-green-600/30">
              <Check className="h-8 w-8" strokeWidth={3} />
            </div>
          </div>

          <p className="mb-1 inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-green-700">
            <FileText className="h-3.5 w-3.5" /> Draft saved
          </p>
          <h2 className="text-2xl font-bold text-neutral-black">{title}</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-neutral-gray-medium">{message}</p>

          <button
            type="button"
            onClick={onClose}
            className="mt-6 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand-red-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-red-700"
          >
            Continue editing
          </button>
        </div>
      </div>
    </div>
  );
}
