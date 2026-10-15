'use client';

import React from 'react';
import { Save, X } from 'lucide-react';

interface FormActionsBarProps {
  onCancel: () => void;
  onSubmit: () => void;
  /** "Edit Award" in edit mode, otherwise "Save Award" */
  primaryLabel?: string;
}

/**
 * Bottom action bar: Cancel on the left, Save/Edit Award on the right.
 */
export default function FormActionsBar({ onCancel, onSubmit, primaryLabel = 'Save Award' }: FormActionsBarProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <button
        type="button"
        onClick={onCancel}
        className="flex items-center gap-1.5 px-4 py-2 border border-neutral-gray-light bg-white rounded-lg text-xs font-medium text-neutral-gray-dark hover:bg-neutral-bg-light cursor-pointer"
      >
        <X className="h-3.5 w-3.5" /> Cancel
      </button>
      <button
        type="button"
        onClick={onSubmit}
        className="flex items-center gap-1.5 px-4 py-2 bg-[#453DD8] text-white rounded-lg text-xs font-medium hover:bg-[#3a33c0] cursor-pointer"
      >
        <Save className="h-3.5 w-3.5" /> {primaryLabel}
      </button>
    </div>
  );
}
