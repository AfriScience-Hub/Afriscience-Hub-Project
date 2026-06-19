'use client';

import { Info, Upload } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';

interface FormActionsProps {
  onCancel: () => void;
  onDraft: () => void;
  onSubmit: () => void;
}

export default function FormActions({ onCancel, onDraft, onSubmit }: FormActionsProps) {
  return (
    <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3 mb-4 p-3 rounded-lg bg-blue-50 border border-blue-100">
        <Info className="h-5 w-5 text-blue-600 flex-shrink-0" />
        <p className="text-xs text-blue-800">Your listing will be submitted for verification by the AfriScience Hub team. Once approved, it will be publicly visible with a Verified badge.</p>
      </div>
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={onDraft}>
            Save as Draft
          </Button>
          <Button onClick={onSubmit} className="bg-brand-navy-900 hover:bg-brand-navy-800">
            <Upload className="h-4 w-4 mr-2" /> Submit for Verification
          </Button>
        </div>
      </div>
    </div>
  );
}
