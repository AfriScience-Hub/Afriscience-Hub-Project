'use client';

import { Loader2, X } from 'lucide-react';
import { formatAdminMoney } from '../format';
import type { InvoiceLedgerRow } from '../api';

interface SettleLedgerModalProps {
  row: InvoiceLedgerRow | null;
  reference: string;
  note: string;
  saving: boolean;
  onReference: (value: string) => void;
  onNote: (value: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
}

/** Records the manual payout reference for a successful, unsettled ledger row. */
export default function SettleLedgerModal({
  row,
  reference,
  note,
  saving,
  onReference,
  onNote,
  onCancel,
  onConfirm,
}: SettleLedgerModalProps) {
  if (!row) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4"
      onClick={() => { if (!saving) onCancel(); }}
    >
      <div className="bg-white rounded-2xl max-w-md w-full" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-neutral-gray-light">
          <div>
            <h3 className="text-lg font-bold text-neutral-black">Settle payment</h3>
            <p className="text-xs text-neutral-gray-medium mt-0.5">
              {row.invoice?.invoiceNumber || row.invoiceId}
            </p>
          </div>
          <button
            onClick={() => { if (!saving) onCancel(); }}
            className="p-2 rounded-lg hover:bg-neutral-bg-light cursor-pointer"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="rounded-xl bg-neutral-bg-light p-3 text-xs space-y-1">
            <p className="flex justify-between"><span className="text-neutral-gray-medium">Scientist</span><span className="font-semibold text-neutral-black">{row.scientist?.name || '—'}</span></p>
            <p className="flex justify-between"><span className="text-neutral-gray-medium">Scientist net</span><span className="font-semibold text-neutral-black">{formatAdminMoney(row.scientistNet, row.currency)}</span></p>
            <p className="flex justify-between"><span className="text-neutral-gray-medium">Charged</span><span className="font-semibold text-neutral-black">{formatAdminMoney(row.chargedAmount, row.currency)}</span></p>
          </div>

          <label className="block">
            <span className="text-xs font-bold text-neutral-black">Settlement reference <span className="text-red-600">*</span></span>
            <input
              value={reference}
              onChange={(event) => onReference(event.target.value)}
              placeholder="BANK-TRANSFER-2026-0001"
              className="mt-1 w-full px-3 py-2 rounded-lg border border-neutral-gray-light text-sm focus:outline-none focus:border-[#453DD8]"
            />
          </label>

          <label className="block">
            <span className="text-xs font-bold text-neutral-black">Note</span>
            <textarea
              value={note}
              onChange={(event) => onNote(event.target.value)}
              placeholder="Paid to scientist bank account."
              rows={3}
              className="mt-1 w-full px-3 py-2 rounded-lg border border-neutral-gray-light text-sm focus:outline-none focus:border-[#453DD8] resize-none"
            />
          </label>

          <div className="flex justify-end gap-2">
            <button
              onClick={onCancel}
              disabled={saving}
              className="px-4 py-2 rounded-xl border border-neutral-gray-light text-xs font-semibold hover:bg-neutral-bg-light cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={!reference.trim() || saving}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#453DD8] text-white text-xs font-semibold hover:bg-[#372fb5] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              {saving ? 'Settling...' : 'Settle payment'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
