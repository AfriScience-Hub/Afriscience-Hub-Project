'use client';

import { useEffect, useState } from 'react';
import { Ban, Eye, FileText, Loader2, X } from 'lucide-react';
import { fetchInvoiceRequest, formatMoney, type InvoiceRequest } from '../api';

interface InvoiceRequestDetailModalProps {
  requestId: string | null;
  onClose: () => void;
  onViewInvoice: (invoiceId: string) => void;
  onDecline: (requestId: string) => void;
  onCancel: (requestId: string) => void;
  onCreateInvoice: (listingId: string, clientId: string) => void;
}

function statusClass(status: string): string {
  switch (status) {
    case 'PENDING':
      return 'bg-amber-100 text-amber-700';
    case 'INVOICED':
      return 'bg-blue-100 text-blue-700';
    case 'DECLINED':
    case 'CANCELLED':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-neutral-gray-light text-neutral-gray-dark';
  }
}

export default function InvoiceRequestDetailModal({
  requestId,
  onClose,
  onViewInvoice,
  onDecline,
  onCancel,
  onCreateInvoice,
}: InvoiceRequestDetailModalProps) {
  const [request, setRequest] = useState<InvoiceRequest | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!requestId) {
      setRequest(null);
      setError('');
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError('');
    fetchInvoiceRequest(requestId)
      .then((row) => { if (!cancelled) setRequest(row); })
      .catch((err) => { if (!cancelled) setError(err instanceof Error ? err.message : 'Unable to load request.'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [requestId]);

  if (!requestId) return null;

  const status = String(request?.status || '').toUpperCase();
  const isOwner = request?.viewerRole === 'OWNER';
  const isClient = request?.viewerRole === 'CLIENT';
  const canAct = status === 'PENDING';
  const invoiceId = request?.invoice?.id;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-gray-light flex-shrink-0">
          <div>
            <h3 className="text-lg font-bold text-neutral-black">Invoice request</h3>
            <p className="text-xs text-neutral-gray-medium mt-0.5 font-mono">
              REQ-{requestId.slice(0, 8).toUpperCase()}
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-neutral-bg-light cursor-pointer" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto custom-scrollbar space-y-5">
          {loading && (
            <div className="py-16 text-center text-sm text-neutral-gray-medium">
              <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" /> Loading request...
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

          {!loading && request && (
            <>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-neutral-gray-medium font-bold">
                    {isOwner ? 'Client' : 'Scientist'}
                  </p>
                  <p className="text-base font-bold text-neutral-black mt-1">
                    {isOwner ? request.client?.fullName || 'Client' : request.scientist?.name || 'Scientist'}
                  </p>
                  {isOwner && request.client?.email && (
                    <p className="text-xs text-neutral-gray-medium">{request.client.email}</p>
                  )}
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${statusClass(status)}`}>
                  {status || '—'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-lg bg-neutral-bg-light p-3">
                  <p className="text-neutral-gray-medium">Requested</p>
                  <p className="font-bold text-neutral-black mt-1">{request.createdAt?.slice(0, 10) || '—'}</p>
                </div>
                <div className="rounded-lg bg-neutral-bg-light p-3">
                  <p className="text-neutral-gray-medium">Last update</p>
                  <p className="font-bold text-neutral-black mt-1">{request.updatedAt?.slice(0, 10) || '—'}</p>
                </div>
              </div>

              {request.declineReason && (
                <div className="rounded-xl bg-red-50 border border-red-100 p-4">
                  <p className="text-[10px] uppercase tracking-wide text-red-600 font-bold">Decline reason</p>
                  <p className="text-sm text-red-700 mt-1">{request.declineReason}</p>
                </div>
              )}

              {request.invoice && (
                <div className="rounded-xl border border-neutral-gray-light p-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-neutral-gray-medium font-bold">Linked invoice</p>
                    <p className="text-sm font-bold text-neutral-black mt-1">{request.invoice.invoiceNumber}</p>
                    <p className="text-xs text-neutral-gray-medium mt-0.5">
                      {formatMoney(request.invoice.total, request.invoice.currency)} · Due {request.invoice.dueDate}
                    </p>
                  </div>
                  {invoiceId && (
                    <button
                      onClick={() => onViewInvoice(invoiceId)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-neutral-gray-light text-xs font-semibold hover:bg-neutral-bg-light cursor-pointer"
                    >
                      <Eye className="h-3.5 w-3.5" /> View invoice
                    </button>
                  )}
                </div>
              )}

              <div className="flex flex-wrap justify-end gap-2 pt-2 border-t border-neutral-gray-light">
                {canAct && isOwner && (
                  <button
                    onClick={() => onCreateInvoice(request.scientistId, request.clientId)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-red-600 text-white text-xs font-semibold hover:bg-brand-red-700 cursor-pointer"
                  >
                    <FileText className="h-4 w-4" /> Create invoice
                  </button>
                )}
                {canAct && isOwner && (
                  <button
                    onClick={() => onDecline(request.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-red-200 text-red-600 text-xs font-semibold hover:bg-red-50 cursor-pointer"
                  >
                    <Ban className="h-4 w-4" /> Decline request
                  </button>
                )}
                {canAct && isClient && (
                  <button
                    onClick={() => onCancel(request.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-red-200 text-red-600 text-xs font-semibold hover:bg-red-50 cursor-pointer"
                  >
                    <Ban className="h-4 w-4" /> Cancel request
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
