'use client';

import { X, Loader2 } from 'lucide-react';

interface Props {
  open: boolean;
  reason: string;
  saving: boolean;
  onReason: (value: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
}

/** Reason dialog shown before rejecting a scientist listing. */
export default function RejectScientistModal({ open, reason, saving, onReason, onCancel, onConfirm }: Props) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
      onClick={() => { if (!saving) onCancel(); }}
    >
      <div className="bg-white rounded-2xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-neutral-gray-light">
          <h3 className="text-lg font-bold text-neutral-black">Reject Listing</h3>
          <button onClick={() => { if (!saving) onCancel(); }} className="p-2 rounded-lg hover:bg-neutral-bg-light">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4 space-y-4">
          <p className="text-sm text-neutral-gray-dark">
            Please provide a reason for rejecting this listing. The submitter will be notified.
          </p>
          <textarea
            value={reason}
            onChange={(e) => onReason(e.target.value)}
            placeholder="Enter reason for rejection..."
            rows={4}
            className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light text-sm focus:outline-none focus:border-brand-red-600 resize-none"
          />
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
              disabled={!reason.trim() || saving}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              {saving ? 'Rejecting...' : 'Confirm Rejection'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
