'use client';

import { Loader2, X } from 'lucide-react';

interface InvoiceReasonModalProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  requireReason?: boolean;
  reason: string;
  saving: boolean;
  onReason: (value: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
}

/** Shared confirmation dialog for voiding invoices and declining/cancelling requests. */
export default function InvoiceReasonModal({
  open,
  title,
  description,
  confirmLabel,
  requireReason = false,
  reason,
  saving,
  onReason,
  onCancel,
  onConfirm,
}: InvoiceReasonModalProps) {
  if (!open) return null;
  const blocked = saving || (requireReason && !reason.trim());

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4"
      onClick={() => { if (!saving) onCancel(); }}
    >
      <div className="bg-white rounded-2xl max-w-md w-full" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-neutral-gray-light">
          <h3 className="text-lg font-bold text-neutral-black">{title}</h3>
          <button
            onClick={() => { if (!saving) onCancel(); }}
            className="p-2 rounded-lg hover:bg-neutral-bg-light cursor-pointer"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4 space-y-4">
          <p className="text-sm text-neutral-gray-dark">{description}</p>
          {requireReason && (
            <textarea
              value={reason}
              onChange={(event) => onReason(event.target.value)}
              placeholder="Enter a reason..."
              rows={4}
              className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light text-sm focus:outline-none focus:border-brand-red-600 resize-none"
            />
          )}
          <div className="flex justify-end gap-2">
            <button
              onClick={onCancel}
              disabled={saving}
              className="px-4 py-2 rounded-xl border border-neutral-gray-light text-xs font-semibold hover:bg-neutral-bg-light cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={blocked}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              {saving ? 'Working...' : confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
