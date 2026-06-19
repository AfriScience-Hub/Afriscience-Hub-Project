'use client';

import { useState } from 'react';
import { MOCK_INVOICES } from '../data';
import { CreateInvoiceModal } from '@/app/components/modals/CreateInvoiceModal';
import InvoiceHeader from './components/InvoiceHeader';
import InvoiceTabs from './components/InvoiceTabs';
import InvoiceList from './components/InvoiceList';
import type { InvoiceTab } from './components/InvoiceTabs';

export default function InvoicesPage() {
  const [invoiceTab, setInvoiceTab] = useState<InvoiceTab>('pending');
  const [isCreateInvoiceModalOpen, setIsCreateInvoiceModalOpen] = useState(false);

  const filteredInvoices = MOCK_INVOICES.filter(inv => {
    if (invoiceTab === 'pending') return inv.status === 'Pending';
    if (invoiceTab === 'awaiting') return inv.status === 'Awaiting Confirmation';
    if (invoiceTab === 'paid') return inv.status === 'Paid';
    if (invoiceTab === 'rejected') return inv.status === 'Rejected';
    return false;
  });

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-neutral-gray-light bg-white p-6 shadow-sm">
        <InvoiceHeader onCreateInvoice={() => setIsCreateInvoiceModalOpen(true)} />
        <InvoiceTabs activeTab={invoiceTab} onTabChange={setInvoiceTab} />
        <InvoiceList invoices={filteredInvoices} activeTab={invoiceTab} />
      </div>

      <CreateInvoiceModal
        isOpen={isCreateInvoiceModalOpen}
        onClose={() => setIsCreateInvoiceModalOpen(false)}
      />
    </div>
  );
}
