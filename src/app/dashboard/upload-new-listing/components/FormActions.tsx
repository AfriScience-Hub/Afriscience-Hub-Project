'use client';

import { Info, Upload, FileDown } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/app/components/ui/Button';

export const LISTING_REVIEW_NOTICE =
  'Your listing will be submitted for review by the AfriScience Hub Team. Once approved, it will be published on the platform. Your listing will earn a "Verified Badge" once all submitted documents are successfully verified.';

interface FormActionsProps {
  onCancel: () => void;
  onSubmit: () => void;
  /** Wire this up when the drafts endpoint is available. */
  onSaveDraft?: () => void;
  /** Hide the draft button (e.g. when editing an already-submitted listing). */
  showDraft?: boolean;
  /** Text for the draft button — "Update Draft" when a draft is already open. */
  draftLabel?: string;
  disabled?: boolean;
  draftDisabled?: boolean;
  submitLabel?: string;
}

export default function FormActions({
  onCancel, onSubmit, onSaveDraft, showDraft = true, draftLabel = 'Save as Draft',
  disabled, draftDisabled, submitLabel = 'Submit for Review',
}: FormActionsProps) {
  const submitClass = 'bg-brand-navy-900 hover:bg-brand-navy-800 disabled:opacity-40 disabled:cursor-not-allowed';
  const draftClass = 'gap-2 bg-white border border-neutral-gray-light text-neutral-black hover:bg-neutral-bg-light disabled:opacity-40 disabled:cursor-not-allowed';

  const handleSaveDraft = () => {
    if (onSaveDraft) onSaveDraft();
    else toast.info('Saving drafts is coming soon.');
  };

  return (
    <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm">
      {/* Desktop */}
      <div className="hidden sm:flex items-center justify-between mb-4 gap-3">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <div className="flex items-center gap-3">
          {showDraft && (
            <Button onClick={handleSaveDraft} disabled={draftDisabled} className={draftClass}>
              <FileDown className="h-4 w-4" /> {draftLabel}
            </Button>
          )}
          <Button onClick={onSubmit} disabled={disabled} className={`gap-2 ${submitClass}`}>
            <Upload className="h-4 w-4" /> {submitLabel}
          </Button>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex flex-col gap-3 mb-4 sm:hidden">
        <Button variant="outline" onClick={onCancel} className="w-full justify-center">
          Cancel
        </Button>
        {showDraft && (
          <Button onClick={handleSaveDraft} disabled={draftDisabled} className={`w-full justify-center ${draftClass}`}>
            <FileDown className="h-4 w-4" /> {draftLabel}
          </Button>
        )}
        <Button onClick={onSubmit} disabled={disabled} className={`w-full justify-center gap-2 ${submitClass}`}>
          <Upload className="h-4 w-4" /> {submitLabel}
        </Button>
      </div>

      <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 border border-blue-100">
        <Info className="h-5 w-5 text-blue-600 flex-shrink-0" />
        <p className="text-xs text-blue-800">{LISTING_REVIEW_NOTICE}</p>
      </div>
    </div>
  );
}
