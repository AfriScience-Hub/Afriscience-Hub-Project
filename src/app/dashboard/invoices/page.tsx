'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Building2, Loader2, RefreshCw, Stethoscope } from 'lucide-react';
import { toast } from 'sonner';
import { CreateInvoiceModal } from '@/app/components/modals/CreateInvoiceModal';
import InvoiceHeader from './components/InvoiceHeader';
import InvoiceTabs, { type InvoiceTab } from './components/InvoiceTabs';
import InvoiceTypeTabs, { type InvoiceListingType } from './components/InvoiceTypeTabs';
import InvoiceList from './components/InvoiceList';
import InvoiceDetailModal from './components/InvoiceDetailModal';
import InvoiceRequestDetailModal from './components/InvoiceRequestDetailModal';
import InvoiceReasonModal from './components/InvoiceReasonModal';
import { countByTab, buildInvoiceRows } from './rows';
import {
  cancelInvoiceRequest,
  createInvoicePaymentLink,
  declineInvoiceRequest,
  fetchListingInvoiceRequests,
  fetchOwnedScientistListings,
  fetchReceivedInvoiceRequests,
  fetchReceivedInvoices,
  fetchSentInvoices,
  voidInvoice,
  type InvoiceRequest,
  type OwnedScientistListing,
} from './api';

type ReasonAction = { type: 'void' | 'decline' | 'cancel'; id: string } | null;
type CreatePreset = { listingId: string; clientId: string } | null;

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Something went wrong. Please try again.';
}

function dedupeRequests(requests: InvoiceRequest[]): InvoiceRequest[] {
  const map = new Map<string, InvoiceRequest>();
  requests.forEach((request) => { if (request?.id && !map.has(request.id)) map.set(request.id, request); });
  return Array.from(map.values());
}

export default function InvoicesPage() {
  const [statusTab, setStatusTab] = useState<InvoiceTab>('all');
  const [typeTab, setTypeTab] = useState<InvoiceListingType>('scientists');
  const [rows, setRows] = useState<ReturnType<typeof buildInvoiceRows>>([]);
  const [listings, setListings] = useState<OwnedScientistListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createPreset, setCreatePreset] = useState<CreatePreset>(null);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [requestDetailId, setRequestDetailId] = useState<string | null>(null);
  const [reasonAction, setReasonAction] = useState<ReasonAction>(null);
  const [reason, setReason] = useState('');
  const [working, setWorking] = useState(false);

  const load = useCallback(async (silent = false) => {
    if (silent) setRefreshing(true);
    else setLoading(true);
    setError('');

    try {
      const owned = await fetchOwnedScientistListings().catch(() => []);
      setListings(owned);

      const [sentResult, receivedResult, clientRequestsResult] = await Promise.allSettled([
        fetchSentInvoices(),
        fetchReceivedInvoices(),
        fetchReceivedInvoiceRequests(),
      ]);

      const ownerRequestResults = await Promise.allSettled(
        owned.map((listing) => fetchListingInvoiceRequests(listing.id)),
      );

      const sent = (sentResult.status === 'fulfilled' ? sentResult.value : [])
        .map((invoice) => ({ ...invoice, viewerRole: invoice.viewerRole || 'OWNER' }));
      const received = (receivedResult.status === 'fulfilled' ? receivedResult.value : [])
        .map((invoice) => ({ ...invoice, viewerRole: invoice.viewerRole || 'CLIENT' }));
      const clientRequests = clientRequestsResult.status === 'fulfilled' ? clientRequestsResult.value : [];
      const ownerRequests = ownerRequestResults
        .filter((result): result is PromiseFulfilledResult<InvoiceRequest[]> => result.status === 'fulfilled')
        .flatMap((result) => result.value);

      const invoices = [...sent, ...received];
      const requests = dedupeRequests([...ownerRequests, ...clientRequests]);
      setRows(buildInvoiceRows(invoices, requests));

      const allFailed = [sentResult, receivedResult, clientRequestsResult].every((result) => result.status === 'rejected');
      if (allFailed) {
        setError('Unable to load invoices. Please check your connection and try again.');
      }
    } catch (loadError) {
      setError(errorMessage(loadError));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const counts = useMemo(() => countByTab(rows), [rows]);
  const filteredRows = useMemo(
    () => rows.filter((row) => statusTab === 'all' || row.group === statusTab),
    [rows, statusTab],
  );

  const openReason = (type: 'void' | 'decline' | 'cancel', id: string) => {
    setReason('');
    setReasonAction({ type, id });
  };

  const openCreateForRequest = (listingId: string, clientId: string) => {
    setRequestDetailId(null);
    setCreatePreset({ listingId, clientId });
    setIsCreateOpen(true);
  };

  const handlePay = async (invoiceId: string) => {
    try {
      const result = await createInvoicePaymentLink(invoiceId);
      if (!result.paymentLink) {
        toast.error('No payment link was returned.');
        return;
      }
      window.location.href = result.paymentLink;
    } catch (payError) {
      toast.error(errorMessage(payError));
    }
  };

  const handleReasonConfirm = async () => {
    if (!reasonAction) return;
    if (reasonAction.type !== 'cancel' && !reason.trim()) {
      toast.error('Please enter a reason.');
      return;
    }

    setWorking(true);
    try {
      if (reasonAction.type === 'void') {
        await voidInvoice(reasonAction.id, reason.trim());
        toast.success('Invoice voided.');
      } else if (reasonAction.type === 'decline') {
        await declineInvoiceRequest(reasonAction.id, reason.trim());
        toast.success('Invoice request declined.');
      } else {
        await cancelInvoiceRequest(reasonAction.id);
        toast.success('Invoice request cancelled.');
      }
      setReasonAction(null);
      setDetailId(null);
      setRequestDetailId(null);
      await load(true);
    } catch (actionError) {
      toast.error(errorMessage(actionError));
    } finally {
      setWorking(false);
    }
  };

  const reasonCopy = reasonAction?.type === 'void'
    ? {
        title: 'Void invoice',
        description: 'Voiding this invoice expires pending payment attempts and notifies the client. This cannot be undone.',
        confirmLabel: 'Void invoice',
        requireReason: true,
      }
    : reasonAction?.type === 'decline'
      ? {
          title: 'Decline invoice request',
          description: 'The client will be notified with the reason you provide.',
          confirmLabel: 'Decline request',
          requireReason: true,
        }
      : {
          title: 'Cancel invoice request',
          description: 'This pending request will be cancelled. You can request another invoice later.',
          confirmLabel: 'Cancel request',
          requireReason: false,
        };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-neutral-gray-light bg-white p-6 shadow-sm">
        <InvoiceHeader
          onCreateInvoice={() => { setCreatePreset(null); setIsCreateOpen(true); }}
          canCreate={typeTab === 'scientists'}
        />
        <InvoiceTabs activeTab={statusTab} counts={counts} onTabChange={setStatusTab} />
        <InvoiceTypeTabs activeTab={typeTab} onTabChange={setTypeTab} />

        {typeTab === 'scientists' ? (
          <>
            {error && (
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3">
                <p className="text-xs font-medium text-red-700">{error}</p>
                <button
                  onClick={() => void load()}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-red-700 hover:underline cursor-pointer"
                >
                  <RefreshCw className="h-3.5 w-3.5" /> Retry
                </button>
              </div>
            )}

            {loading ? (
              <div className="py-16 text-center text-sm text-neutral-gray-medium">
                <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" /> Loading invoices...
              </div>
            ) : (
              <>
                {refreshing && (
                  <p className="mb-3 inline-flex items-center gap-1.5 text-[11px] text-neutral-gray-medium">
                    <Loader2 className="h-3 w-3 animate-spin" /> Refreshing...
                  </p>
                )}
                <InvoiceList
                  rows={filteredRows}
                  activeTab={statusTab}
                  onView={setDetailId}
                  onViewRequest={setRequestDetailId}
                  onPay={handlePay}
                  onVoid={(id) => openReason('void', id)}
                  onDecline={(id) => openReason('decline', id)}
                  onCancel={(id) => openReason('cancel', id)}
                />
              </>
            )}
          </>
        ) : (
          <div className="py-14 text-center">
            {typeTab === 'institutes' ? (
              <Building2 className="h-10 w-10 text-neutral-gray-light mx-auto mb-3" />
            ) : (
              <Stethoscope className="h-10 w-10 text-neutral-gray-light mx-auto mb-3" />
            )}
            <p className="font-bold text-neutral-black">
              {typeTab === 'institutes' ? 'Institute invoices are coming soon' : 'Specialist centre invoices are coming soon'}
            </p>
            <p className="text-sm text-neutral-gray-medium mt-1 max-w-md mx-auto">
              This tab is ready for the listing type. Invoice endpoints are currently integrated for scientist and technologist listings.
            </p>
          </div>
        )}
      </div>

      <CreateInvoiceModal
        isOpen={isCreateOpen}
        onClose={() => { setIsCreateOpen(false); setCreatePreset(null); }}
        listings={listings}
        initialListingId={createPreset?.listingId}
        initialClientId={createPreset?.clientId}
        onCreated={() => void load(true)}
      />

      <InvoiceDetailModal
        invoiceId={detailId}
        onClose={() => setDetailId(null)}
        onPay={handlePay}
        onVoid={(id) => openReason('void', id)}
      />

      <InvoiceRequestDetailModal
        requestId={requestDetailId}
        onClose={() => setRequestDetailId(null)}
        onViewInvoice={(id) => { setRequestDetailId(null); setDetailId(id); }}
        onDecline={(id) => openReason('decline', id)}
        onCancel={(id) => openReason('cancel', id)}
        onCreateInvoice={openCreateForRequest}
      />

      <InvoiceReasonModal
        open={Boolean(reasonAction)}
        title={reasonCopy.title}
        description={reasonCopy.description}
        confirmLabel={reasonCopy.confirmLabel}
        requireReason={reasonCopy.requireReason}
        reason={reason}
        saving={working}
        onReason={setReason}
        onCancel={() => { if (!working) setReasonAction(null); }}
        onConfirm={handleReasonConfirm}
      />
    </div>
  );
}
