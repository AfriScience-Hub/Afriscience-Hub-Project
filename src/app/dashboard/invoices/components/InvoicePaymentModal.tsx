'use client';

import { CreditCard, ExternalLink, ShieldCheck, X } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { formatMoney, type PaymentLinkResult } from '../api';

interface InvoicePaymentModalProps {
  payment: PaymentLinkResult | null;
  onClose: () => void;
}

/**
 * Shown after a payment link is generated, before the user leaves the app for
 * the hosted checkout page.
 */
export default function InvoicePaymentModal({ payment, onClose }: InvoicePaymentModalProps) {
  if (!payment) return null;

  const amount = payment.chargedAmount ?? payment.grossAmount;
  const currency = payment.currency || 'USD';

  const handleProceed = () => {
    window.location.href = payment.paymentLink;
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy-100 text-brand-navy-900">
              <CreditCard className="h-5 w-5" />
            </span>
            <h2 className="text-lg font-bold text-neutral-black">Proceed to payment</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-neutral-gray-medium hover:text-neutral-black transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="text-sm text-neutral-gray-dark">
          You will be redirected to our secure payment page to complete this payment.
        </p>

        <div className="mt-4 rounded-xl border border-neutral-gray-light bg-neutral-bg-light p-4">
          <p className="text-[11px] uppercase tracking-wide text-neutral-gray-medium">Amount to pay</p>
          <p className="mt-1 text-2xl font-bold text-neutral-black">{formatMoney(amount, currency)}</p>
          {payment.invoiceNumber && (
            <p className="mt-1 text-xs text-neutral-gray-medium">
              Invoice <span className="font-semibold text-neutral-gray-dark">{payment.invoiceNumber}</span>
            </p>
          )}
          {Number(payment.processingFee) > 0 && (
            <p className="mt-2 text-xs text-neutral-gray-medium">
              Includes a processing fee of {formatMoney(payment.processingFee, currency)}.
            </p>
          )}
        </div>

        <p className="mt-3 flex items-center gap-1.5 text-xs text-neutral-gray-medium">
          <ShieldCheck className="h-3.5 w-3.5 text-green-600" />
          You will be taken to a trusted, secure checkout.
        </p>

        <div className="mt-6 flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button className="flex-1 bg-brand-navy-900 hover:bg-brand-navy-800" onClick={handleProceed}>
            Proceed <ExternalLink className="h-4 w-4 ml-1.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
