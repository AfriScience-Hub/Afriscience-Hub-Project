'use client';

import { useEffect, useState } from 'react';
import { Ban, HandCoins, Loader2, X } from 'lucide-react';
import { fetchInvoice, formatMoney, invoiceLabel, type ScientistInvoice } from '../api';

interface InvoiceDetailModalProps {
  invoiceId: string | null;
  onClose: () => void;
  onPay: (invoiceId: string) => void;
  onVoid: (invoiceId: string) => void;
}

function statusClass(status: string): string {
  switch (status) {
    case 'PAID':
      return 'bg-green-100 text-green-700';
    case 'VOID':
      return 'bg-neutral-gray-light text-neutral-gray-dark';
    default:
      return 'bg-blue-100 text-blue-700';
  }
}

function Party({ label, name, meta }: { label: string; name?: string; meta?: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wide text-neutral-gray-medium font-bold">{label}</p>
      <p className="text-sm font-bold text-neutral-black mt-1">{name || '—'}</p>
      {meta && <p className="text-xs text-neutral-gray-medium">{meta}</p>}
    </div>
  );
}

export default function InvoiceDetailModal({ invoiceId, onClose, onPay, onVoid }: InvoiceDetailModalProps) {
  const [invoice, setInvoice] = useState<ScientistInvoice | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!invoiceId) {
      setInvoice(null);
      setError('');
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError('');
    fetchInvoice(invoiceId)
      .then((row) => { if (!cancelled) setInvoice(row); })
      .catch((err) => { if (!cancelled) setError(err instanceof Error ? err.message : 'Unable to load invoice.'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [invoiceId]);

  if (!invoiceId) return null;

  const status = String(invoice?.status || '').toUpperCase();
  const canPay = invoice?.viewerRole === 'CLIENT' && status === 'SENT';
  const canVoid = invoice?.viewerRole === 'OWNER' && status === 'SENT';

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-gray-light flex-shrink-0">
          <div>
            <h3 className="text-lg font-bold text-neutral-black">Invoice details</h3>
            <p className="text-xs text-neutral-gray-medium mt-0.5">
              {invoice ? invoiceLabel(invoice) : 'Loading...'}
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-neutral-bg-light cursor-pointer" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto custom-scrollbar space-y-5">
          {loading && (
            <div className="py-16 text-center text-sm text-neutral-gray-medium">
              <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" /> Loading invoice...
            </div>
          )}

          {!loading && error && (
            <div className="py-12 text-center">
              <p className="text-sm font-semibold text-red-600">{error}</p>
              <button onClick={onClose} className="mt-3 text-xs font-semibold text-brand-navy-900 hover:underline">
                Close
              </button>
            </div>
          )}

          {!loading && invoice && (
            <>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="grid grid-cols-2 gap-4 flex-1 min-w-[240px]">
                  <Party label="From" name={invoice.scientist?.name} meta={invoice.scientist?.state} />
                  <Party label="To" name={invoice.client?.fullName} meta={invoice.client?.email} />
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${statusClass(status)}`}>
                  {status || '—'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="rounded-lg bg-neutral-bg-light p-3">
                  <p className="text-neutral-gray-medium">Invoice date</p>
                  <p className="font-bold text-neutral-black mt-1">{invoice.invoiceDate}</p>
                </div>
                <div className="rounded-lg bg-neutral-bg-light p-3">
                  <p className="text-neutral-gray-medium">Due date</p>
                  <p className="font-bold text-neutral-black mt-1">{invoice.dueDate}</p>
                </div>
                <div className="rounded-lg bg-neutral-bg-light p-3">
                  <p className="text-neutral-gray-medium">Currency</p>
                  <p className="font-bold text-neutral-black mt-1">{invoice.currency}</p>
                </div>
                <div className="rounded-lg bg-neutral-bg-light p-3">
                  <p className="text-neutral-gray-medium">Payment</p>
                  <p className="font-bold text-neutral-black mt-1">{invoice.paidAt ? 'Paid' : invoice.isOverdue ? 'Overdue' : 'Unpaid'}</p>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-neutral-gray-light">
                <table className="w-full text-xs">
                  <thead className="bg-neutral-bg-light text-neutral-gray-medium">
                    <tr>
                      <th className="text-left font-semibold px-3 py-2">Description</th>
                      <th className="text-right font-semibold px-3 py-2">Qty</th>
                      <th className="text-right font-semibold px-3 py-2">Rate</th>
                      <th className="text-right font-semibold px-3 py-2">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items?.map((item) => (
                      <tr key={item.id} className="border-t border-neutral-gray-light">
                        <td className="px-3 py-2 text-neutral-black">{item.serviceDescription}</td>
                        <td className="px-3 py-2 text-right">{item.quantity}</td>
                        <td className="px-3 py-2 text-right">{formatMoney(item.rate, invoice.currency)}</td>
                        <td className="px-3 py-2 text-right font-semibold text-neutral-black">
                          {formatMoney(item.amount, invoice.currency)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="ml-auto w-full sm:w-80 space-y-1.5 text-sm">
                <div className="flex justify-between text-neutral-gray-dark">
                  <span>Subtotal</span>
                  <span>{formatMoney(invoice.subtotal, invoice.currency)}</span>
                </div>
                <div className="flex justify-between text-neutral-gray-dark">
                  <span>Tax ({invoice.taxPercent}%)</span>
                  <span>{formatMoney(invoice.tax, invoice.currency)}</span>
                </div>
                <div className="flex justify-between text-neutral-gray-dark">
                  <span>Processing fee ({invoice.processingFeePercent}%)</span>
                  <span>{formatMoney(invoice.processingFee, invoice.currency)}</span>
                </div>
                <div className="flex justify-between border-t border-neutral-gray-light pt-2 font-bold text-brand-navy-900">
                  <span>Amount payable</span>
                  <span>{formatMoney(invoice.amountPayable, invoice.currency)}</span>
                </div>
                {invoice.viewerRole === 'OWNER' && (
                  <>
                    <div className="flex justify-between text-neutral-gray-dark pt-2">
                      <span>Commission ({invoice.commissionPercent}%)</span>
                      <span>-{formatMoney(invoice.commission, invoice.currency)}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-neutral-black">
                      <span>Your net</span>
                      <span>{formatMoney(invoice.scientistNet, invoice.currency)}</span>
                    </div>
                  </>
                )}
              </div>

              {invoice.notes && (
                <div className="rounded-xl bg-neutral-bg-light p-4">
                  <p className="text-[10px] uppercase tracking-wide text-neutral-gray-medium font-bold">Notes</p>
                  <p className="text-sm text-neutral-gray-dark mt-1 whitespace-pre-wrap">{invoice.notes}</p>
                </div>
              )}

              {invoice.voidReason && (
                <div className="rounded-xl bg-red-50 border border-red-100 p-4">
                  <p className="text-[10px] uppercase tracking-wide text-red-600 font-bold">Void reason</p>
                  <p className="text-sm text-red-700 mt-1">{invoice.voidReason}</p>
                </div>
              )}

              <div className="flex flex-wrap justify-end gap-2 pt-2 border-t border-neutral-gray-light">
                {canVoid && (
                  <button
                    onClick={() => onVoid(invoice.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-red-200 text-red-600 text-xs font-semibold hover:bg-red-50 cursor-pointer"
                  >
                    <Ban className="h-4 w-4" /> Void invoice
                  </button>
                )}
                {canPay && (
                  <button
                    onClick={() => onPay(invoice.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-red-600 text-white text-xs font-semibold hover:bg-brand-red-700 cursor-pointer"
                  >
                    <HandCoins className="h-4 w-4" /> Pay invoice
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl border border-neutral-gray-light text-xs font-semibold hover:bg-neutral-bg-light cursor-pointer"
                >
                  Close
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
