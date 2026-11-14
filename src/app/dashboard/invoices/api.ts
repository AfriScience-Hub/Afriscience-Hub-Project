import { api } from '@/lib/api';
import { formatAmountDisplay } from '@/lib/amounts';

/**
 * Scientist invoice & invoice-request API.
 *
 * Owner endpoints:
 *   GET  /scientists/invoices/sent
 *   POST /scientists/listings/{listingId}/invoices
 *   POST /scientists/invoices/{invoiceId}/void
 *   GET  /scientists/listings/{listingId}/potential-clients
 *   GET  /scientists/listings/{listingId}/invoice-requests
 *   POST /scientists/invoice-requests/{requestId}/decline
 *
 * Client endpoints:
 *   GET  /scientists/invoices/received
 *   GET  /scientists/invoices/{invoiceId}
 *   POST /scientists/invoices/{invoiceId}/payment-link
 *   GET  /scientists/invoice-requests/received
 *   POST /scientists/invoice-requests/{requestId}/cancel
 */

export type InvoiceStatus = 'SENT' | 'PAID' | 'VOID' | string;
export type InvoiceRequestStatus = 'PENDING' | 'INVOICED' | 'DECLINED' | 'CANCELLED' | string;

export interface InvoicePerson {
  id: string;
  name?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  profileImage?: string | null;
  isVerified?: boolean;
  status?: string;
  country?: string;
  state?: string;
}

export interface ScientistInvoiceItem {
  id: string;
  serviceDescription: string;
  quantity: number;
  rateMinor: number;
  rate: number;
  amountMinor: number;
  amount: number;
  position: number;
}

export interface ScientistInvoice {
  id: string;
  invoiceNumber: string;
  scientistId: string;
  clientId: string;
  requestId?: string | null;
  invoiceDate: string;
  dueDate: string;
  status: InvoiceStatus;
  currency: string;
  items: ScientistInvoiceItem[];
  subtotalMinor: number;
  subtotal: number;
  taxPercent: number;
  taxMinor: number;
  tax: number;
  totalMinor: number;
  total: number;
  processingFeePercent: number;
  processingFeeMinor: number;
  processingFee: number;
  amountPayableMinor: number;
  amountPayable: number;
  notes?: string;
  sentAt?: string;
  paidAt?: string | null;
  voidedAt?: string | null;
  voidReason?: string | null;
  isOverdue?: boolean;
  scientist?: InvoicePerson;
  client?: InvoicePerson;
  request?: { id: string; status: InvoiceRequestStatus; declineReason?: string | null };
  viewerRole?: 'OWNER' | 'CLIENT' | string;
  commissionPercent?: number;
  commissionMinor?: number;
  commission?: number;
  scientistNetMinor?: number;
  scientistNet?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface InvoiceRequest {
  id: string;
  scientistId: string;
  clientId: string;
  status: InvoiceRequestStatus;
  declineReason?: string | null;
  createdAt: string;
  updatedAt: string;
  scientist?: InvoicePerson;
  client?: InvoicePerson;
  invoice?: Pick<ScientistInvoice, 'id' | 'invoiceNumber' | 'status' | 'invoiceDate' | 'dueDate' | 'totalMinor' | 'total' | 'currency'> | null;
  viewerRole?: 'OWNER' | 'CLIENT' | string;
}

export interface PotentialClient {
  id: string;
  scientistId: string;
  clientId: string;
  lastRequestedAt: string;
  createdAt: string;
  updatedAt: string;
  client?: InvoicePerson | null;
}

export interface OwnedScientistListing {
  id: string;
  name: string;
  status?: string;
  profileImage?: string | null;
}

export interface CreateInvoiceItemInput {
  serviceDescription: string;
  quantity: number;
  rateMinor: number;
}

export interface CreateInvoiceInput {
  clientId: string;
  invoiceDate: string;
  dueDate: string;
  items: CreateInvoiceItemInput[];
  notes?: string;
}

export interface PaymentLinkResult {
  invoiceId: string;
  invoiceNumber: string;
  reference: string;
  paymentLink: string;
  grossAmountMinor: number;
  grossAmount: number;
  processingFeeMinor: number;
  processingFee: number;
  chargedAmountMinor: number;
  chargedAmount: number;
  currency: string;
}

interface ApiListResponse<T> {
  success?: boolean;
  message?: string;
  data?: T[] | { data?: T[]; listings?: T[]; invoiceRequests?: T[]; invoices?: T[] };
  pagination?: Pagination;
}

export interface Pagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  nextPage?: number | null;
  previousPage?: number | null;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' ? (value as Record<string, unknown>) : null;
}

function asList<T>(response: ApiListResponse<T>): T[] {
  const data = response?.data;
  if (Array.isArray(data)) return data;
  const record = asRecord(data);
  if (!record) return [];
  for (const key of ['data', 'listings', 'invoiceRequests', 'invoices', 'rows', 'items']) {
    const value = record[key];
    if (Array.isArray(value)) return value as T[];
  }
  return [];
}

function query(params: Record<string, string | number | undefined>): string {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') search.set(key, String(value));
  });
  const qs = search.toString();
  return qs ? `?${qs}` : '';
}

/** Lists invoices the current user has sent as a scientist listing owner. */
export async function fetchSentInvoices(status?: InvoiceStatus, search?: string): Promise<ScientistInvoice[]> {
  const response: any = await api.get(
    `/scientists/invoices/sent${query({ page: 1, limit: 50, status, search })}`,
  );
  return asList(response);
}

/** Lists invoices the current user has received as a client. */
export async function fetchReceivedInvoices(status?: InvoiceStatus, search?: string): Promise<ScientistInvoice[]> {
  const response: any = await api.get(
    `/scientists/invoices/received${query({ page: 1, limit: 50, status, search })}`,
  );
  return asList(response);
}

/** Lists the current client's own invoice requests. */
export async function fetchReceivedInvoiceRequests(status?: InvoiceRequestStatus, search?: string): Promise<InvoiceRequest[]> {
  const response: any = await api.get(
    `/scientists/invoice-requests/received${query({ page: 1, limit: 50, status, search })}`,
  );
  return asList<InvoiceRequest>(response).map((row) => ({ ...row, viewerRole: row.viewerRole || 'CLIENT' }));
}

/** Lists every invoice request for one owned scientist listing. */
export async function fetchListingInvoiceRequests(
  listingId: string,
  status?: InvoiceRequestStatus,
  search?: string,
): Promise<InvoiceRequest[]> {
  const response: any = await api.get(
    `/scientists/listings/${listingId}/invoice-requests${query({ page: 1, limit: 50, status, search })}`,
  );
  return asList<InvoiceRequest>(response).map((row) => ({ ...row, viewerRole: row.viewerRole || 'OWNER' }));
}

/** Loads one invoice (owner or client view). */
export async function fetchInvoice(invoiceId: string): Promise<ScientistInvoice> {
  const response = await api.get<ScientistInvoice>(`/scientists/invoices/${invoiceId}`);
  return response.data as ScientistInvoice;
}

/** Loads one invoice request (owner or client view). */
export async function fetchInvoiceRequest(requestId: string): Promise<InvoiceRequest> {
  const response = await api.get<InvoiceRequest>(`/scientists/invoice-requests/${requestId}`);
  return response.data as InvoiceRequest;
}

/** Creates a payment link and returns the hosted checkout URL. */
export async function createInvoicePaymentLink(invoiceId: string): Promise<PaymentLinkResult> {
  const response = await api.post<PaymentLinkResult>(`/scientists/invoices/${invoiceId}/payment-link`);
  return response.data as PaymentLinkResult;
}

/** Creates and immediately sends an invoice from one of the user's listings. */
export async function createAndSendInvoice(listingId: string, input: CreateInvoiceInput): Promise<ScientistInvoice> {
  const response = await api.post<ScientistInvoice>(
    `/scientists/listings/${listingId}/invoices`,
    input as unknown as Record<string, unknown>,
  );
  return response.data as ScientistInvoice;
}

/** Voids a sent invoice. Paid invoices cannot be voided. */
export async function voidInvoice(invoiceId: string, reason: string): Promise<ScientistInvoice> {
  const response = await api.post<ScientistInvoice>(`/scientists/invoices/${invoiceId}/void`, { reason });
  return response.data as ScientistInvoice;
}

/** Client cancels their own pending invoice request. */
export async function cancelInvoiceRequest(requestId: string): Promise<InvoiceRequest> {
  const response = await api.post<InvoiceRequest>(`/scientists/invoice-requests/${requestId}/cancel`);
  return response.data as InvoiceRequest;
}

/** Listing owner declines a pending invoice request. */
export async function declineInvoiceRequest(requestId: string, reason: string): Promise<InvoiceRequest> {
  const response = await api.post<InvoiceRequest>(`/scientists/invoice-requests/${requestId}/decline`, { reason });
  return response.data as InvoiceRequest;
}

/** The client requests an invoice for an approved scientist listing. */
export async function requestInvoice(listingId: string): Promise<InvoiceRequest> {
  const response = await api.post<InvoiceRequest>(`/scientists/listings/${listingId}/invoice-requests`);
  return response.data as InvoiceRequest;
}

/** Returns unique clients who have clicked Book Service on this listing. */
export async function fetchPotentialClients(listingId: string, search?: string): Promise<PotentialClient[]> {
  const response: any = await api.get(
    `/scientists/listings/${listingId}/potential-clients${query({ page: 1, limit: 50, search })}`,
  );
  return asList<PotentialClient>(response);
}

/** The current user's scientist listings (used for invoice creation). */
export async function fetchOwnedScientistListings(): Promise<OwnedScientistListing[]> {
  const response: any = await api.get('/scientists/listings');
  const rows = asList<OwnedScientistListing>(response);
  return rows
    .map((row: any) => ({
      id: String(row?.id ?? ''),
      name: String(row?.name ?? row?.title ?? 'Untitled listing'),
      status: typeof row?.status === 'string' ? row.status : undefined,
      profileImage: typeof row?.profileImage === 'string' ? row.profileImage : null,
    }))
    .filter((row) => {
      if (!row.id) return false;
      return String(row.status || '').toUpperCase() !== 'DRAFT';
    });
}

/** Records/refreshes the signed-in user's interest in an approved listing. */
export async function recordScientistServiceInterest(listingId: string): Promise<void> {
  await api.post(`/scientists/listings/${listingId}/book-service`);
}

/** Finds the client's current pending invoice request for one listing. */
export async function fetchPendingInvoiceRequest(listingId: string): Promise<InvoiceRequest | null> {
  const rows = await fetchReceivedInvoiceRequests('PENDING');
  return rows.find((row) => row.scientistId === listingId || row.scientist?.id === listingId) ?? null;
}

export function formatMoney(amount: number | string | null | undefined, currency = 'USD'): string {
  if (amount === null || amount === undefined || amount === '') return '—';
  const value = typeof amount === 'number' ? amount : Number(String(amount).replace(/,/g, ''));
  if (!Number.isFinite(value)) return '—';
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
      currencyDisplay: 'narrowSymbol',
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${currency || ''} ${formatAmountDisplay(value)}`.trim();
  }
}

export function invoiceLabel(invoice: ScientistInvoice): string {
  return invoice.invoiceNumber || `INV-${invoice.id.slice(0, 8).toUpperCase()}`;
}

export function counterpartyName(invoice: ScientistInvoice): string {
  if (invoice.viewerRole === 'CLIENT') return invoice.scientist?.name || 'Scientist';
  return invoice.client?.fullName || 'Client';
}

export function invoiceServiceSummary(invoice: ScientistInvoice): string {
  const first = invoice.items?.[0]?.serviceDescription?.trim();
  if (!first) return 'Invoice items';
  const extra = (invoice.items?.length || 0) - 1;
  return extra > 0 ? `${first} +${extra} more` : first;
}

export function requestCounterpartyName(request: InvoiceRequest): string {
  if (request.viewerRole === 'CLIENT') return request.scientist?.name || 'Scientist';
  return request.client?.fullName || 'Client';
}

export function requestServiceSummary(request: InvoiceRequest): string {
  return request.invoice?.invoiceNumber
    ? `Invoice ${request.invoice.invoiceNumber}`
    : 'Invoice request';
}
