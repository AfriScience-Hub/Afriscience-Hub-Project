'use client';

import { Loader2 } from 'lucide-react';
import { userDisplayName, type AdminUser } from '../userApi';

interface SuspendUserModalProps {
  user: AdminUser;
  reason: string;
  busy: boolean;
  onReasonChange: (reason: string) => void;
  onClose: () => void;
  onConfirm: () => void;
}

export default function SuspendUserModal({
  user,
  reason,
  busy,
  onReasonChange,
  onClose,
  onConfirm,
}: SuspendUserModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-sm font-bold text-neutral-black mb-1">Suspend this user?</h3>
        <p className="text-xs text-neutral-gray-medium mb-4">
          {userDisplayName(user)} ({user.email}) will lose access to the platform until restored.
        </p>
        <label htmlFor="suspend-reason" className="block text-xs font-semibold text-neutral-black mb-1.5">
          Reason for suspension <span className="text-red-500">*</span>
        </label>
        <textarea
          id="suspend-reason"
          rows={4}
          value={reason}
          onChange={(e) => onReasonChange(e.target.value)}
          placeholder="Explain why this account is being suspended..."
          className="w-full resize-none rounded-lg border border-neutral-gray-light px-3 py-2 text-xs text-neutral-black outline-none focus:border-red-400 focus:ring-1 focus:ring-red-300"
          autoFocus
        />
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            disabled={busy}
            className="px-3 py-1.5 text-xs font-medium text-neutral-gray-dark border border-neutral-gray-light rounded-lg hover:bg-neutral-bg-light disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={busy || !reason.trim()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {busy && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            {busy ? 'Suspending...' : 'Suspend User'}
          </button>
        </div>
      </div>
    </div>
  );
}
