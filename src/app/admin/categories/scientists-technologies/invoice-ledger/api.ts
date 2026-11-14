import { api } from '@/lib/api';

/**
 * Admin scientist invoice endpoints.
 *
 *   GET   /admin/scientist-invoices/settings
 *   PATCH /admin/scientist-invoices/settings
 *   GET   /admin/scientist-invoice-ledger
 *   POST  /admin/scientist-invoice-ledger/{ledgerId}/settle
 */

export interface InvoiceSettings {
  id: string;
  commissionPercent: number;
  taxPercent: number;
  processingFeePercent: number;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type LedgerStatus = 'PENDING' | 'SUCCESSFUL' | 'FAILED' | 'EXPIRED' | 'REFUNDED' | string;
export type SettlementStatus = 'UNSETTLED' | 'SETTLED' | string;

export interface InvoiceLedgerRow {
  id: string;
  invoiceId: string;
  scientistId: string;
  clientId: string;
  provider: string;
  reference: string;
  providerReference?: string;
  grossAmountMinor: number;
  grossAmount: number;
  processingFeeMinor: number;
  processingFee: number;
  chargedAmountMinor: number;
  chargedAmount: number;
  commissionPercent: number;
  commissionMinor: number;
  commission: number;
  scientistNetMinor: number;
  scientistNet: number;
  currency: string;
  status: LedgerStatus;
  providerPayload?: { paymentLink?: string; initializedAt?: string };
  paidAt?: string | null;
  settlementStatus: SettlementStatus;
  settledAt?: string | null;
  settledBy?: string | null;
  settlementReference?: string | null;
  settlementNote?: string | null;
  createdAt: string;
  updatedAt: string;
  invoice?: {
    id: string;
    invoiceNumber: string;
    status: string;
    totalMinor: number;
    total: number;
    currency: string;
  };
  scientist?: { id: string; name: string; profileImage?: string | null };
  client?: { id: string; fullName: string; email: string };
}

export interface LedgerPagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface LedgerFilters {
  page?: number;
  limit?: number;
  status?: string;
  settlementStatus?: string;
  scientistId?: string;
  clientId?: string;
}

function query(params: LedgerFilters): string {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') search.set(key, String(value));
  });
  const qs = search.toString();
  return qs ? `?${qs}` : '';
}

export async function fetchInvoiceSettings(): Promise<InvoiceSettings> {
  const response = await api.get<InvoiceSettings>('/admin/scientist-invoices/settings');
  return response.data as InvoiceSettings;
}

export async function updateInvoiceSettings(input: {
  commissionPercent: number;
  taxPercent: number;
  processingFeePercent: number;
}): Promise<InvoiceSettings> {
  const response = await api.patch<InvoiceSettings>(
    '/admin/scientist-invoices/settings',
    input as unknown as Record<string, unknown>,
  );
  return response.data as InvoiceSettings;
}

export async function fetchInvoiceLedger(filters: LedgerFilters): Promise<{
  rows: InvoiceLedgerRow[];
  pagination: LedgerPagination;
}> {
  const response: any = await api.get(
    `/admin/scientist-invoice-ledger${query({ limit: 25, ...filters })}`,
  );

  return {
    rows: Array.isArray(response.data) ? (response.data as InvoiceLedgerRow[]) : [],
    pagination: response.pagination || {
      page: filters.page || 1,
      limit: filters.limit || 25,
      totalItems: 0,
      totalPages: 1,
      hasNext: false,
      hasPrevious: false,
    },
  };
}

export async function settleInvoiceLedger(
  ledgerId: string,
  input: { reference: string; note?: string },
): Promise<InvoiceLedgerRow> {
  const response = await api.post<InvoiceLedgerRow>(
    `/admin/scientist-invoice-ledger/${ledgerId}/settle`,
    input as unknown as Record<string, unknown>,
  );
  return response.data as InvoiceLedgerRow;
}
