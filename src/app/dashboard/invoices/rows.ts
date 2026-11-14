import type { InvoiceRequest, InvoiceStatus } from './api';
import {
  counterpartyName,
  invoiceLabel,
  invoiceServiceSummary,
  requestCounterpartyName,
  requestServiceSummary,
  type InvoiceRequestStatus,
  type ScientistInvoice,
} from './api';

export type InvoiceTab = 'all' | 'pending' | 'awaiting' | 'paid' | 'void' | 'rejected' | 'cancelled';
export type InvoiceRowKind = 'invoice' | 'request';
export type ViewerRole = 'OWNER' | 'CLIENT' | 'UNKNOWN';

export interface InvoiceRow {
  key: string;
  kind: InvoiceRowKind;
  id: string;
  invoice?: ScientistInvoice;
  request?: InvoiceRequest;
  status: InvoiceStatus | InvoiceRequestStatus;
  group: Exclude<InvoiceTab, 'all'>;
  viewerRole: ViewerRole;
  displayNumber: string;
  counterparty: string;
  service: string;
  amount: number | null;
  currency: string;
  invoiceDate: string;
  dueDate: string;
  paidDate?: string | null;
  isOverdue: boolean;
}

function invoiceGroup(invoice: ScientistInvoice): Exclude<InvoiceTab, 'all'> {
  const status = String(invoice.status || '').toUpperCase();
  if (status === 'PAID') return 'paid';
  if (status === 'VOID') return 'void';
  if (status === 'SENT') return invoice.viewerRole === 'CLIENT' ? 'pending' : 'awaiting';
  return 'pending';
}

function requestGroup(request: InvoiceRequest): Exclude<InvoiceTab, 'all'> | null {
  const status = String(request.status || '').toUpperCase();
  if (status === 'PENDING') return 'pending';
  if (status === 'DECLINED') return 'rejected';
  if (status === 'CANCELLED') return 'cancelled';
  // INVOICED requests are represented by their linked invoice row.
  return null;
}

function roleOf(value?: string): ViewerRole {
  return value === 'OWNER' || value === 'CLIENT' ? value : 'UNKNOWN';
}

export function invoiceToRow(invoice: ScientistInvoice): InvoiceRow {
  const viewerRole = roleOf(invoice.viewerRole);
  return {
    key: `invoice-${invoice.id}`,
    kind: 'invoice',
    id: invoice.id,
    invoice,
    status: invoice.status,
    group: invoiceGroup(invoice),
    viewerRole,
    displayNumber: invoiceLabel(invoice),
    counterparty: counterpartyName(invoice),
    service: invoiceServiceSummary(invoice),
    amount: invoice.amountPayable ?? invoice.total ?? null,
    currency: invoice.currency || 'USD',
    invoiceDate: invoice.invoiceDate,
    dueDate: invoice.dueDate,
    paidDate: invoice.paidAt,
    isOverdue: Boolean(invoice.isOverdue),
  };
}

export function requestToRow(request: InvoiceRequest): InvoiceRow | null {
  const group = requestGroup(request);
  if (!group) return null;
  return {
    key: `request-${request.id}`,
    kind: 'request',
    id: request.id,
    request,
    status: request.status,
    group,
    viewerRole: roleOf(request.viewerRole),
    displayNumber: `REQ-${request.id.slice(0, 8).toUpperCase()}`,
    counterparty: requestCounterpartyName(request),
    service: requestServiceSummary(request),
    amount: request.invoice?.total ?? null,
    currency: request.invoice?.currency || 'USD',
    invoiceDate: request.createdAt,
    dueDate: request.invoice?.dueDate || '',
    paidDate: null,
    isOverdue: false,
  };
}

export function buildInvoiceRows(invoices: ScientistInvoice[], requests: InvoiceRequest[]): InvoiceRow[] {
  const rows: InvoiceRow[] = [];
  const seenInvoices = new Set<string>();

  invoices.forEach((invoice) => {
    if (!invoice?.id || seenInvoices.has(invoice.id)) return;
    seenInvoices.add(invoice.id);
    rows.push(invoiceToRow(invoice));
  });

  requests.forEach((request) => {
    const row = requestToRow(request);
    if (!row) return;
    if (request.invoice?.id && seenInvoices.has(request.invoice.id)) return;
    rows.push(row);
  });

  return rows.sort((a, b) => {
    const aDate = a.invoice?.updatedAt || a.request?.updatedAt || a.invoiceDate || '';
    const bDate = b.invoice?.updatedAt || b.request?.updatedAt || b.invoiceDate || '';
    return bDate.localeCompare(aDate);
  });
}

export function countByTab(rows: InvoiceRow[]): Record<InvoiceTab, number> {
  const counts: Record<InvoiceTab, number> = {
    all: rows.length,
    pending: 0,
    awaiting: 0,
    paid: 0,
    void: 0,
    rejected: 0,
    cancelled: 0,
  };
  rows.forEach((row) => {
    counts[row.group] += 1;
  });
  return counts;
}
