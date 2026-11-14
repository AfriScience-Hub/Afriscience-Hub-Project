'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2, Receipt, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import PagePagination from '../../special-centres/components/PagePagination';
import InvoiceSettingsCard from './components/InvoiceSettingsCard';
import LedgerTable from './components/LedgerTable';
import SettleLedgerModal from './components/SettleLedgerModal';
import {
  fetchInvoiceLedger,
  settleInvoiceLedger,
  type InvoiceLedgerRow,
  type LedgerPagination,
} from './api';

const EMPTY_PAGINATION: LedgerPagination = {
  page: 1,
  limit: 25,
  totalItems: 0,
  totalPages: 1,
  hasNext: false,
  hasPrevious: false,
};

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Unable to load the invoice ledger.';
}

export default function InvoiceLedgerPage() {
  const [rows, setRows] = useState<InvoiceLedgerRow[]>([]);
  const [pagination, setPagination] = useState<LedgerPagination>(EMPTY_PAGINATION);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('');
  const [settlementStatus, setSettlementStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [settleRow, setSettleRow] = useState<InvoiceLedgerRow | null>(null);
  const [reference, setReference] = useState('');
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);

  const load = useCallback(async (silent = false) => {
    if (silent) setRefreshing(true);
    else setLoading(true);
    setError('');
    try {
      const result = await fetchInvoiceLedger({
        page,
        limit: 25,
        status: status || undefined,
        settlementStatus: settlementStatus || undefined,
      });
      setRows(result.rows);
      setPagination(result.pagination);
    } catch (loadError) {
      setError(errorMessage(loadError));
      setRows([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [page, status, settlementStatus]);

  useEffect(() => { void load(); }, [load]);

  const openSettle = (row: InvoiceLedgerRow) => {
    setSettleRow(row);
    setReference('');
    setNote('');
  };

  const handleSettle = async () => {
    if (!settleRow || !reference.trim()) {
      toast.error('Settlement reference is required.');
      return;
    }
    setSaving(true);
    try {
      await settleInvoiceLedger(settleRow.id, {
        reference: reference.trim(),
        note: note.trim() || undefined,
      });
      toast.success('Payment settled successfully.');
      setSettleRow(null);
      await load(true);
    } catch (settleError) {
      toast.error(errorMessage(settleError));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-gray-medium mb-4">
            <Link href="/admin/dashboard" className="hover:underline">Dashboard</Link><span>›</span>
            <Link href="/admin/categories/scientists-technologies" className="hover:underline">Scientists &amp; Technologists</Link><span>›</span>
            <span className="text-neutral-black font-medium">Invoice Ledger</span>
          </div>
          <h1 className="text-xl font-bold text-neutral-black flex items-center gap-2">
            <span className="h-9 w-9 rounded-xl bg-emerald-100 text-emerald-600 grid place-items-center">
              <Receipt className="h-5 w-5" />
            </span>
            Invoice Ledger
          </h1>
          <p className="text-[11px] text-neutral-gray-dark mt-1 max-w-2xl">
            Track scientist invoice payment attempts, settlement state and the global commission, tax and processing-fee settings.
          </p>
        </div>
        <Link
          href="/admin/categories/scientists-technologies/all"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-neutral-gray-light bg-white text-xs font-semibold hover:bg-neutral-bg-light cursor-pointer shrink-0"
        >
          <ArrowLeft className="h-4 w-4" /> All Scientists
        </Link>
      </div>

      <InvoiceSettingsCard />

      <div className="rounded-xl border border-neutral-gray-light bg-white overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border-b border-neutral-gray-light">
          <div>
            <h2 className="text-sm font-bold text-neutral-black">Payment attempts</h2>
            <p className="text-[11px] text-neutral-gray-medium mt-0.5">
              {pagination.totalItems} record{pagination.totalItems === 1 ? '' : 's'} found.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={status}
              onChange={(event) => { setStatus(event.target.value); setPage(1); }}
              className="px-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs cursor-pointer outline-none"
            >
              <option value="">All payment statuses</option>
              <option value="PENDING">Pending</option>
              <option value="SUCCESSFUL">Successful</option>
              <option value="FAILED">Failed</option>
              <option value="EXPIRED">Expired</option>
              <option value="REFUNDED">Refunded</option>
            </select>
            <select
              value={settlementStatus}
              onChange={(event) => { setSettlementStatus(event.target.value); setPage(1); }}
              className="px-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs cursor-pointer outline-none"
            >
              <option value="">All settlement states</option>
              <option value="UNSETTLED">Unsettled</option>
              <option value="SETTLED">Settled</option>
            </select>
            <button
              onClick={() => void load()}
              disabled={refreshing}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs font-semibold hover:bg-neutral-bg-light cursor-pointer disabled:opacity-50"
            >
              {refreshing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />}
              Refresh
            </button>
          </div>
        </div>

        {error && (
          <div className="m-4 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-700">
            {error}
          </div>
        )}

        <LedgerTable rows={rows} loading={loading} onSettle={openSettle} />

        {!loading && rows.length > 0 && (
          <PagePagination
            page={pagination.page}
            totalPages={Math.max(1, pagination.totalPages)}
            perPage={pagination.limit}
            total={pagination.totalItems}
            count={pagination.totalItems}
            noun="ledger entries"
            onPage={setPage}
          />
        )}
      </div>

      <SettleLedgerModal
        row={settleRow}
        reference={reference}
        note={note}
        saving={saving}
        onReference={setReference}
        onNote={setNote}
        onCancel={() => { if (!saving) setSettleRow(null); }}
        onConfirm={() => void handleSettle()}
      />
    </div>
  );
}
