'use client';

import { CheckCircle2 } from 'lucide-react';

interface ThankYouModalProps {
  show: boolean;
}

export function ThankYouModal({ show }: ThankYouModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="h-8 w-8 text-emerald-600" />
        </div>
        <h3 className="text-2xl font-bold text-neutral-black mb-2">Thank You!</h3>
        <p className="text-slate-500 mb-4">
          Your donation has been successfully processed. We deeply appreciate your support towards our mission.
        </p>
        <p className="text-sm text-slate-400">
          A confirmation email has been sent to your registered email address.
        </p>
      </div>
    </div>
  );
}
