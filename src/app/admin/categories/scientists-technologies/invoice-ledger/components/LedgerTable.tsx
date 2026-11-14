'use client';

import { CheckCircle2, Loader2, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatAdminMoney } from '../format';
import type { InvoiceLedgerRow } from '../api';

interface LedgerTableProps {
  rows: InvoiceLedgerRow[];
  loading: boolean;
  onSettle: (row: InvoiceLedgerRow) => void;
}

function statusClass(status: string): string {
  switch (status) {
    case 'SUCCESSFUL':
      return 'bg-green-100 text-green-700';
    case 'FAILED':
    case 'EXPIRED':
      return 'bg-red-100 text-red-700';
    case 'REFUNDED':
      return 'bg-neutral-gray-light text-neutral-gray-dark';
    default:
      return 'bg-amber-100 text-amber-700';
  }
}

function settlementClass(status: string): string {
  return status === 'SETTLED' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700';
}

export default function LedgerTable({ rows, loading, onSettle }: LedgerTableProps) {
  if (loading) {
    return (
      <div className="py-16 text-center text-sm text-neutral-gray-medium">
        <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" /> Loading payment ledger...
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="py-16 text-center">
        <Wallet className="h-10 w-10 text-neutral-gray-light mx-auto mb-3" />
        <p className="font-bold text-neutral-black">No ledger entries</p>
        <p className="text-sm text-neutral-gray-medium mt-1">Payment attempts will appear here.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead className="bg-neutral-bg-light text-neutral-gray-medium">
          <tr>
            <th className="text-left font-semibold px-3 py-3 whitespace-nowrap">Invoice</th>
            <th className="text-left font-semibold px-3 py-3 whitespace-nowrap">Scientist</th>
            <th className="text-left font-semibold px-3 py-3 whitespace-nowrap">Client</th>
            <th className="text-right font-semibold px-3 py-3 whitespace-nowrap">Charged</th>
            <th className="text-right font-semibold px-3 py-3 whitespace-nowrap">Commission</th>
            <th className="text-right font-semibold px-3 py-3 whitespace-nowrap">Scientist net</th>
            <th className="text-left font-semibold px-3 py-3 whitespace-nowrap">Payment</th>
            <th className="text-left font-semibold px-3 py-3 whitespace-nowrap">Settlement</th>
            <th className="text-right font-semibold px-3 py-3 whitespace-nowrap">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const paymentStatus = String(row.status || '').toUpperCase();
            const settlementStatus = String(row.settlementStatus || '').toUpperCase();
            const canSettle = paymentStatus === 'SUCCESSFUL' && settlementStatus === 'UNSETTLED';

            return (
              <tr key={row.id} className="border-t border-neutral-gray-light align-top">
                <td className="px-3 py-3">
                  <p className="font-semibold text-neutral-black">{row.invoice?.invoiceNumber || row.invoiceId}</p>
                  <p className="text-[10px] text-neutral-gray-medium mt-0.5 font-mono">{row.reference || '—'}</p>
                  <p className="text-[10px] text-neutral-gray-medium mt-0.5">{row.provider || 'Provider'}</p>
                </td>
                <td className="px-3 py-3">
                  <p className="font-medium text-neutral-black">{row.scientist?.name || '—'}</p>
                  <p className="text-[10px] text-neutral-gray-medium mt-0.5">{row.scientistId?.slice(0, 8)}</p>
                </td>
                <td className="px-3 py-3">
                  <p className="font-medium text-neutral-black">{row.client?.fullName || '—'}</p>
                  <p className="text-[10px] text-neutral-gray-medium mt-0.5">{row.client?.email}</p>
                </td>
                <td className="px-3 py-3 text-right font-semibold text-neutral-black whitespace-nowrap">
                  {formatAdminMoney(row.chargedAmount, row.currency)}
                </td>
                <td className="px-3 py-3 text-right text-neutral-gray-dark whitespace-nowrap">
                  {formatAdminMoney(row.commission, row.currency)}
                  <span className="block text-[10px] text-neutral-gray-medium">{row.commissionPercent}%</span>
                </td>
                <td className="px-3 py-3 text-right font-semibold text-brand-navy-900 whitespace-nowrap">
                  {formatAdminMoney(row.scientistNet, row.currency)}
                </td>
                <td className="px-3 py-3">
                  <span className={cn('px-2 py-0.5 rounded-full text-[10px] font-bold', statusClass(paymentStatus))}>
                    {paymentStatus || '—'}
                  </span>
                  {row.paidAt && <p className="text-[10px] text-neutral-gray-medium mt-1">{row.paidAt.slice(0, 10)}</p>}
                </td>
                <td className="px-3 py-3">
                  <span className={cn('px-2 py-0.5 rounded-full text-[10px] font-bold', settlementClass(settlementStatus))}>
                    {settlementStatus || '—'}
                  </span>
                  {row.settlementReference && (
                    <p className="text-[10px] text-neutral-gray-medium mt-1 font-mono">{row.settlementReference}</p>
                  )}
                </td>
                <td className="px-3 py-3 text-right">
                  {canSettle ? (
                    <button
                      onClick={() => onSettle(row)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#453DD8] text-white text-[10px] font-semibold hover:bg-[#372fb5] cursor-pointer whitespace-nowrap"
                    >
                      <CheckCircle2 className="h-3 w-3" /> Settle
                    </button>
                  ) : (
                    <span className="text-[10px] text-neutral-gray-light">—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
