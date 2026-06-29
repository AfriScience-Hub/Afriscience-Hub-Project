'use client';

import { Info, Upload } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';

interface FormActionsProps {
  onCancel: () => void;
  onDraft: () => void;
  onSubmit: () => void;
  disabled?: boolean;
}

export default function FormActions({ onCancel, onDraft, onSubmit, disabled }: FormActionsProps) {
  return (
    <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={onDraft}>
            Save as Draft
          </Button>
          <Button onClick={onSubmit} disabled={disabled} className="bg-brand-navy-900 hover:bg-brand-navy-800 disabled:opacity-40 disabled:cursor-not-allowed">
            <Upload className="h-4 w-4 mr-2" /> Submit for Review
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 border border-blue-100">
        <Info className="h-5 w-5 text-blue-600 flex-shrink-0" />
        <p className="text-xs text-blue-800">Your listing will be submitted for review by the AfriScience Hub Team. Once approved, it will be published on the platform. Your listing will earn a &quot;Verified Badge&quot; once all submitted documents are successfully verified.</p>
      </div>
    </div>
  );
}
