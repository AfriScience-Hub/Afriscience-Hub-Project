'use client';

import { Plus, RefreshCw } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';

interface InvoiceHeaderProps {
  onCreateInvoice: () => void;
  onRefresh?: () => void;
  refreshing?: boolean;
  /** Only scientist listings support invoice creation for now. */
  canCreate?: boolean;
}

export default function InvoiceHeader({
  onCreateInvoice,
  onRefresh,
  refreshing = false,
  canCreate = true,
}: InvoiceHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-3 mb-6">
      <div>
        <h2 className="text-xl font-bold text-neutral-black">Invoices</h2>
        <p className="text-sm text-neutral-gray-medium mt-0.5">Manage your service invoices and payments</p>
      </div>
      <div className="flex items-center gap-2">
        {onRefresh && (
          <Button
            size="sm"
            variant="outline"
            onClick={onRefresh}
            disabled={refreshing}
            aria-label="Refresh invoices"
            title="Refresh invoices"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span className="ml-1 hidden sm:inline">Refresh</span>
          </Button>
        )}
        {canCreate && (
          <Button
            size="sm"
            className="bg-brand-navy-900 hover:bg-brand-navy-800"
            onClick={onCreateInvoice}
          >
            <Plus className="h-4 w-4 mr-1" /> Create Invoice
          </Button>
        )}
      </div>
    </div>
  );
}
