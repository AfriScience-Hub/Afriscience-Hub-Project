'use client';

import { ClipboardCheck } from 'lucide-react';

interface UndertakingSectionProps {
  agreed: boolean;
  setAgreed: (v: boolean) => void;
}

export default function UndertakingSection({ agreed, setAgreed }: UndertakingSectionProps) {
  return (
    <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center gap-3">
        <ClipboardCheck className="h-5 w-5 text-brand-red-600" />
        <h3 className="font-bold text-neutral-black">Undertaking Remark</h3>
        <span className="rounded-full bg-brand-red-50 px-2 py-0.5 text-[10px] font-bold text-brand-red-600">Required</span>
      </div>
      <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-neutral-gray-light bg-neutral-bg-light/50 p-4">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600"
        />
        <span className="text-sm text-neutral-gray-dark italic">
          I confirm that all information provided are accurate, that all uploaded documents are valid and that I accept the terms and conditions of this service.
          <span className="ml-1 not-italic text-red-500">*</span>
        </span>
      </label>
    </div>
  );
}
