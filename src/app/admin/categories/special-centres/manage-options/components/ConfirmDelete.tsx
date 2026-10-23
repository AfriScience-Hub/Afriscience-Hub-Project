'use client';

import { X } from 'lucide-react';

interface Props {
  open: boolean;
  name: string;
  onCancel: () => void;
  onConfirm: () => void;
}

/**
 * Small confirmation dialog shown before deleting a managed option. Owns only
 * its own markup — the parent controls the open state and performs the delete.
 */
export default function ConfirmDelete({ open, name, onCancel, onConfirm }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onCancel}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="px-5 py-4 border-b border-neutral-gray-light flex items-center justify-between">
          <h3 className="text-sm font-bold text-neutral-black">Delete option</h3>
          <button onClick={onCancel} className="h-8 w-8 rounded-full hover:bg-neutral-gray-light flex items-center justify-center cursor-pointer">
            <X className="h-4 w-4 text-neutral-gray-medium" />
          </button>
        </div>
        <div className="p-5">
          <p className="text-sm text-neutral-gray-dark">
            Are you sure you want to delete{' '}
            <span className="font-semibold text-neutral-black">{name}</span>?
            This option will be removed from the list and can no longer be selected by users.
          </p>
        </div>
        <div className="flex gap-2 justify-end px-5 py-4 border-t border-neutral-gray-light">
          <button onClick={onCancel} className="px-4 py-2 rounded-xl border border-neutral-gray-light text-xs font-semibold hover:bg-neutral-bg-light cursor-pointer">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-5 py-2 rounded-xl bg-brand-red-600 text-white text-xs font-semibold hover:bg-brand-red-700 cursor-pointer">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
