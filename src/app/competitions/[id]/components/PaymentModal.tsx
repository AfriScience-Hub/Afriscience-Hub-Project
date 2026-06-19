'use client';

import { DollarSign } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';

interface PaymentModalProps {
  compTitle: string;
  registrationFee: string;
  selectedTopic: string | null;
  paymentProcessing: boolean;
  onCancel: () => void;
  onProceed: () => void;
}

export default function PaymentModal({
  compTitle,
  registrationFee,
  selectedTopic,
  paymentProcessing,
  onCancel,
  onProceed,
}: PaymentModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8" onClick={e => e.stopPropagation()}>
        <div className="text-center mb-6">
          <div className="h-16 w-16 rounded-full bg-brand-red-100 flex items-center justify-center mx-auto mb-4">
            <DollarSign className="h-8 w-8 text-brand-red-600" />
          </div>
          <h3 className="text-xl font-bold text-neutral-black">Payment Gateway</h3>
          <p className="text-sm text-neutral-gray-dark mt-2">Complete payment to register for this competition.</p>
        </div>

        <div className="space-y-3 mb-6 bg-neutral-bg-light rounded-lg p-4">
          <div className="flex justify-between text-sm">
            <span className="text-neutral-gray-dark">Competition</span>
            <span className="font-medium text-neutral-black">{compTitle}</span>
          </div>
          {selectedTopic && (
            <div className="flex justify-between text-sm">
              <span className="text-neutral-gray-dark">Topic</span>
              <span className="font-medium text-neutral-black text-right max-w-[200px] truncate">{selectedTopic}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-neutral-gray-dark">Registration Fee</span>
            <span className="font-bold text-green-700 text-lg">{registrationFee}</span>
          </div>
        </div>

        <div className="bg-emerald-50 rounded-lg p-4 mb-6 border border-emerald-200">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-emerald-600 rounded flex items-center justify-center text-white font-bold text-sm">
              PS
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-emerald-900">Secured by Paystack</p>
              <p className="text-xs text-emerald-700 mt-1">
                You'll be redirected to Paystack's secure payment gateway. Complete the payment to finalize your competition registration.
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onCancel} disabled={paymentProcessing}>
            Cancel
          </Button>
          <Button className="flex-1 bg-brand-red-600 hover:bg-brand-red-700" onClick={onProceed} disabled={paymentProcessing}>
            {paymentProcessing ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </span>
            ) : (
              'Proceed to Paystack'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
