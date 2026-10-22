'use client';

import React from 'react';
import { Save, Send, Loader2 } from 'lucide-react';

interface FormActionsBarProps {
  onSaveDraft: () => void;
  onPublish: () => void | Promise<void>;
  /** Submit button label — "Edit Competition" in edit mode, otherwise "Publish Competition". */
  primaryLabel?: string;
  /** Disables both buttons while the request is in flight. */
  disabled?: boolean;
}

/**
 * Bottom action bar: Save as Draft plus the primary submit action
 * (Publish Competition, or Edit Competition when editing an existing one).
 */
export default function FormActionsBar({ onSaveDraft, onPublish, primaryLabel = 'Publish Competition', disabled = false }: FormActionsBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <button
        type="button"
        onClick={onSaveDraft}
        disabled={disabled}
        className="flex items-center gap-1.5 px-4 py-2 border border-[#453DD8]/40 bg-white rounded-lg text-xs font-medium text-[#453DD8] hover:bg-[#453DD8]/5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Save className="h-3.5 w-3.5" /> Save as Draft
      </button>
      <button
        type="button"
        onClick={onPublish}
        disabled={disabled}
        className="flex items-center gap-1.5 px-4 py-2 bg-[#453DD8] text-white rounded-lg text-xs font-medium hover:bg-[#3a33c0] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {disabled ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />} {primaryLabel}
      </button>
    </div>
  );
}
