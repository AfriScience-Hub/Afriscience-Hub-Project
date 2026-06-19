'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';

interface InvoiceHeaderProps {
  onCreateInvoice: () => void;
}

export default function InvoiceHeader({ onCreateInvoice }: InvoiceHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-xl font-bold text-neutral-black">Invoices</h2>
        <p className="text-sm text-neutral-gray-medium mt-0.5">Manage your service invoices and payments</p>
      </div>
      <Button
        size="sm"
        className="bg-brand-navy-900 hover:bg-brand-navy-800"
        onClick={onCreateInvoice}
      >
        <Plus className="h-4 w-4 mr-1" /> Create Invoice
      </Button>
    </div>
  );
}
