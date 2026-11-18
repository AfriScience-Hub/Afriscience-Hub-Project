'use client';

import { CheckCircle2, FileText, X } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import type { ScientistInvoice } from '../api';

interface InvoiceSentModalProps {
  invoice: ScientistInvoice | null;
  onClose: () => void;
}

/** Confirmation shown after an invoice has been created and sent to the client. */
export default function InvoiceSentModal({ invoice, onClose }: InvoiceSentModalProps) {
  if (!invoice) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl text-center">
        <div className="flex justify-end -mt-2 -mr-2">
          <button
            type="button"
            onClick={onClose}
            className="h-8 w-8 rounded-full text-neutral-gray-medium hover:bg-neutral-bg-light hover:text-neutral-black transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="h-4 w-4 mx-auto" />
          </button>
        </div>

        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-9 w-9 text-green-600" />
        </div>

        <h2 className="text-lg font-bold text-neutral-black">Invoice sent successfully</h2>
        <p className="mt-2 text-sm text-neutral-gray-medium">
          {invoice.invoiceNumber ? 'Invoice ' : 'Your invoice '}
          {invoice.invoiceNumber && <span className="font-semibold text-neutral-black">{invoice.invoiceNumber}</span>}
          {invoice.invoiceNumber ? ' has been sent to your client.' : 'has been sent to your client.'}
        </p>

        <div className="mt-5 flex items-center gap-3 rounded-xl border border-neutral-gray-light bg-neutral-bg-light px-4 py-3 text-left">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-navy-100 text-brand-navy-900">
            <FileText className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="text-xs text-neutral-gray-medium">Client</p>
            <p className="truncate text-sm font-semibold text-neutral-black">
              {invoice.client?.fullName || invoice.client?.name || invoice.client?.email || 'Your client'}
            </p>
          </div>
        </div>

        <p className="mt-4 text-xs text-neutral-gray-medium">
          You will be notified once your client reviews and pays the invoice.
        </p>

        <Button className="mt-6 w-full bg-brand-navy-900 hover:bg-brand-navy-800" onClick={onClose}>
          Done
        </Button>
      </div>
    </div>
  );
}
