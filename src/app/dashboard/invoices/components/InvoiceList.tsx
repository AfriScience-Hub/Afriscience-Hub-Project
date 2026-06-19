'use client';

import { Eye, DollarSign, Check, Download, FileText } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { cn } from '@/lib/utils';
import type { Invoice } from '../../data';
import type { InvoiceTab } from './InvoiceTabs';

interface InvoiceListProps {
  invoices: Invoice[];
  activeTab: InvoiceTab;
}

export default function InvoiceList({ invoices, activeTab }: InvoiceListProps) {
  if (invoices.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="h-12 w-12 text-neutral-gray-light mx-auto mb-3" />
        <p className="font-bold text-neutral-black">No invoices in this category</p>
        <p className="text-sm text-neutral-gray-medium mt-1">
          {activeTab === 'pending' && 'You have no pending invoices to pay.'}
          {activeTab === 'awaiting' && 'No invoices are awaiting confirmation.'}
          {activeTab === 'paid' && 'You have not paid any invoices yet.'}
          {activeTab === 'rejected' && 'No rejected invoices.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {invoices.map(invoice => (
        <div key={invoice.id} className="p-4 rounded-lg border border-neutral-gray-light hover:border-brand-red-100 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-bold text-neutral-black">{invoice.service}</p>
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-[10px] font-bold",
                  invoice.status === 'Paid' ? "bg-green-100 text-green-700" :
                  invoice.status === 'Pending' ? "bg-amber-100 text-amber-700" :
                  invoice.status === 'Awaiting Confirmation' ? "bg-blue-100 text-blue-700" :
                  "bg-red-100 text-red-700"
                )}>
                  {invoice.status}
                </span>
              </div>
              <p className="text-xs text-neutral-gray-medium">
                Invoice: <span className="font-mono font-medium">{invoice.id}</span>
              </p>
              <div className="flex items-center gap-4 mt-2 text-xs text-neutral-gray-medium">
                <span>Provider: {invoice.provider}</span>
                <span>Client: {invoice.client}</span>
                <span>Due: {invoice.dueDate}</span>
                {invoice.paidDate && <span className="text-green-600">Paid: {invoice.paidDate}</span>}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-lg font-bold text-brand-navy-900">{invoice.amount}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="text-xs">
                  <Eye className="h-3 w-3 mr-1" /> View
                </Button>
                {invoice.status === 'Pending' && (
                  <Button size="sm" className="bg-brand-red-600 hover:bg-brand-red-700 text-xs">
                    <DollarSign className="h-3 w-3 mr-1" /> Pay
                  </Button>
                )}
                {invoice.status === 'Awaiting Confirmation' && (
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-xs">
                    <Check className="h-3 w-3 mr-1" /> Confirm
                  </Button>
                )}
                {invoice.status === 'Paid' && (
                  <Button size="sm" variant="outline" className="text-xs">
                    <Download className="h-3 w-3 mr-1" /> Receipt
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
