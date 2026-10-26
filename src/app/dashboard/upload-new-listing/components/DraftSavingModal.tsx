'use client';

import { FileText, Loader2 } from 'lucide-react';

interface DraftSavingModalProps {
  open: boolean;
}

/**
 * Blocking loader shown while an under-funded submission is being saved as a
 * draft. The user is redirected to their wallet as soon as it completes.
 */
export default function DraftSavingModal({ open }: DraftSavingModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-2xl">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-brand-red-100">
          <FileText className="h-7 w-7 text-brand-red-600" />
        </div>
        <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-brand-red-600" />
        <h2 className="text-lg font-bold text-neutral-black">Saving submission as draft</h2>
        <p className="mt-2 text-sm text-neutral-gray-medium">
          Your wallet balance is too low for this paid submission. We&apos;re saving your work as a draft so you
          don&apos;t lose it, then taking you to your wallet to top up.
        </p>
      </div>
    </div>
  );
}
