'use client';

import { ShieldCheck } from 'lucide-react';

export default function VerificationInfo() {
  return (
    <div className="mt-6 p-5 rounded-xl bg-blue-50 border border-blue-100">
      <div className="flex gap-3">
        <ShieldCheck className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-blue-900 mb-1">How Verification Works</p>
          <p className="text-sm text-blue-800">
            Profiles are verified after review by the AfriScience Hub team. Once verified, your profile will display a{' '}
            <span className="font-bold">Verified Badge</span> and become publicly trusted on the platform.
          </p>
          <div className="mt-4 space-y-2">
            {[
              'Submit your listing with complete information',
              'Our team reviews the accuracy and quality of your submission',
              'Once approved, a Verified badge appears on your profile',
              'Verified listings rank higher in search results',
            ].map((step, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm text-blue-800">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-200 text-[10px] font-bold text-blue-800 flex-shrink-0">{idx + 1}</span>
                {step}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
