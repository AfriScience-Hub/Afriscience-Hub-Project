'use client';

import React from 'react';
import { Save, X } from 'lucide-react';

interface ProgramFormActionsProps {
  onCancel: () => void;
  onSubmit: () => void;
  /** "Edit Program" in edit mode, otherwise "Create Program" */
  primaryLabel?: string;
}

/**
 * Bottom action bar: Cancel on the left, Create/Edit Program on the right.
 */
export default function ProgramFormActions({ onCancel, onSubmit, primaryLabel = 'Create Program' }: ProgramFormActionsProps) {
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
