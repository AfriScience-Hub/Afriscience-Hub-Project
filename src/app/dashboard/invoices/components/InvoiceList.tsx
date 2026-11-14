'use client';

import { Ban, CheckCircle2, Eye, FileText, HandCoins, XCircle } from 'lucide-react';
import TableActionMenu from '@/app/admin/components/TableActionMenu';
import type { MenuItem } from '@/app/admin/components/TableActionMenu';
import { cn } from '@/lib/utils';
import { formatMoney } from '../api';
import type { InvoiceTab } from './InvoiceTabs';
import type { InvoiceRow } from '../rows';

interface InvoiceListProps {
  rows: InvoiceRow[];
  activeTab: InvoiceTab;
  onView: (invoiceId: string) => void;
  onViewRequest: (requestId: string) => void;
  onPay: (invoiceId: string) => void;
  onVoid: (invoiceId: string) => void;
  onDecline: (requestId: string) => void;
  onCancel: (requestId: string) => void;
}

const STATUS_LABEL: Record<string, string> = {
  SENT: 'Sent',
  PAID: 'Paid',
  VOID: 'Void',
  PENDING: 'Pending',
  INVOICED: 'Invoiced',
  DECLINED: 'Declined',
  CANCELLED: 'Cancelled',
};

function statusClass(status: string): string {
  switch (status) {
    case 'PAID':
      return 'bg-green-100 text-green-700';
    case 'VOID':
      return 'bg-neutral-gray-light text-neutral-gray-dark';
    case 'DECLINED':
    case 'CANCELLED':
      return 'bg-red-100 text-red-700';
    case 'PENDING':
      return 'bg-amber-100 text-amber-700';
    default:
      return 'bg-blue-100 text-blue-700';
  }
}

function emptyMessage(tab: InvoiceTab): string {
  switch (tab) {
    case 'pending':
      return 'You have no pending invoices or invoice requests.';
    case 'awaiting':
      return 'No sent invoices are awaiting confirmation.';
    case 'paid':
      return 'You have not paid or received payment for any invoices yet.';
    case 'void':
      return 'No void invoices.';
    case 'rejected':
      return 'No declined invoice requests.';
    case 'cancelled':
      return 'No cancelled invoice requests.';
    default:
      return 'No invoices or invoice requests yet.';
  }
}

export default function InvoiceList({
  rows,
  activeTab,
  onView,
  onViewRequest,
  onPay,
  onVoid,
  onDecline,
  onCancel,
}: InvoiceListProps) {
  if (rows.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="h-12 w-12 text-neutral-gray-light mx-auto mb-3" />
        <p className="font-bold text-neutral-black">Nothing to show</p>
        <p className="text-sm text-neutral-gray-medium mt-1">{emptyMessage(activeTab)}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {rows.map((row) => {
        const status = String(row.status || '').toUpperCase();
        const linkedInvoiceId = row.kind === 'invoice' ? row.id : row.request?.invoice?.id;
        const actions: MenuItem[] = [];

        if (row.kind === 'request') {
          actions.push({
            label: 'View request',
            icon: <FileText className="h-3.5 w-3.5" />,
            onClick: () => onViewRequest(row.id),
          });
        }
        if (linkedInvoiceId) {
          actions.push({
            label: 'View invoice',
            icon: <Eye className="h-3.5 w-3.5" />,
            onClick: () => onView(linkedInvoiceId),
          });
        }
        if (row.kind === 'invoice' && status === 'SENT' && row.viewerRole === 'CLIENT') {
          actions.push({
            label: 'Pay invoice',
            icon: <HandCoins className="h-3.5 w-3.5" />,
            onClick: () => onPay(row.id),
          });
        }
        if (row.kind === 'invoice' && status === 'SENT' && row.viewerRole === 'OWNER') {
          actions.push({
            label: 'Void invoice',
            icon: <Ban className="h-3.5 w-3.5" />,
            onClick: () => onVoid(row.id),
            danger: true,
          });
        }
        if (row.kind === 'request' && status === 'PENDING' && row.viewerRole === 'OWNER') {
          actions.push({
            label: 'Decline request',
            icon: <XCircle className="h-3.5 w-3.5" />,
            onClick: () => onDecline(row.id),
            danger: true,
          });
        }
        if (row.kind === 'request' && status === 'PENDING' && row.viewerRole === 'CLIENT') {
          actions.push({
            label: 'Cancel request',
            icon: <XCircle className="h-3.5 w-3.5" />,
            onClick: () => onCancel(row.id),
            danger: true,
          });
        }

        return (
          <div
            key={row.key}
            className="p-4 rounded-lg border border-neutral-gray-light hover:border-brand-red-100 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <p className="font-bold text-neutral-black">{row.service}</p>
                  <span className={cn('px-2 py-0.5 rounded-full text-[10px] font-bold', statusClass(status))}>
                    {STATUS_LABEL[status] || status}
                  </span>
                  {row.kind === 'request' && (
                    <span className="px-2 py-0.5 rounded-full bg-brand-navy-100 text-brand-navy-900 text-[10px] font-bold">
                      Invoice request
                    </span>
                  )}
                  {row.isOverdue && status === 'SENT' && (
                    <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-bold">
                      Overdue
                    </span>
                  )}
                </div>
                <p className="text-xs text-neutral-gray-medium">
                  {row.kind === 'invoice' ? 'Invoice' : 'Request'}:{' '}
                  <span className="font-mono font-medium">{row.displayNumber}</span>
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-neutral-gray-medium">
                  <span>
                    {row.viewerRole === 'CLIENT' ? 'Provider' : 'Client'}: {row.counterparty}
                  </span>
                  {row.invoiceDate && <span>Issued: {row.invoiceDate}</span>}
                  {row.dueDate && <span>Due: {row.dueDate}</span>}
                  {row.paidDate && (
                    <span className="text-green-600 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" /> Paid: {row.paidDate.slice(0, 10)}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-lg font-bold text-brand-navy-900">
                    {row.amount === null ? '—' : formatMoney(row.amount, row.currency)}
                  </p>
                </div>
                {actions.length > 0 ? (
                  <TableActionMenu items={actions} />
                ) : (
                  <span className="text-[10px] text-neutral-gray-light px-2">No actions</span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
