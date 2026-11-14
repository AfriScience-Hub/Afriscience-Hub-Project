'use client';

import { useEffect, useMemo, useState } from 'react';
import { AlertCircle, FileText, Loader2, Plus, Send, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { toast } from 'sonner';
import InvoiceItemEditor, { type InvoiceItemDraft } from './InvoiceItemEditor';
import InvoiceClientFields from './InvoiceClientFields';
import {
  createAndSendInvoice,
  fetchPotentialClients,
  type OwnedScientistListing,
  type PotentialClient,
} from '@/app/dashboard/invoices/api';

interface CreateInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  listings: OwnedScientistListing[];
  onCreated?: () => void;
  /** Optional prefill when creating from a pending invoice request. */
  initialListingId?: string;
  initialClientId?: string;
}

function today(): string {
  return new Date().toISOString().split('T')[0];
}

function addDays(date: string, days: number): string {
  const next = new Date(`${date}T00:00:00`);
  next.setDate(next.getDate() + days);
  return next.toISOString().split('T')[0];
}

function emptyItem(): InvoiceItemDraft {
  return { id: `${Date.now()}-${Math.random().toString(16).slice(2)}`, description: '', quantity: 1, rate: 0 };
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Unable to create invoice. Please try again.';
}

export function CreateInvoiceModal({
  isOpen,
  onClose,
  listings,
  onCreated,
  initialListingId,
  initialClientId,
}: CreateInvoiceModalProps) {
  const [selectedListing, setSelectedListing] = useState('');
  const [selectedClient, setSelectedClient] = useState('');
  const [invoiceDate, setInvoiceDate] = useState(today());
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState<InvoiceItemDraft[]>([emptyItem()]);
  const [clients, setClients] = useState<PotentialClient[]>([]);
  const [loadingClients, setLoadingClients] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const firstListing = initialListingId || listings[0]?.id || '';
    setSelectedListing(firstListing);
    setSelectedClient(initialClientId || '');
    setInvoiceDate(today());
    setDueDate(addDays(today(), 14));
    setNotes('');
    setItems([emptyItem()]);
    setClients([]);
  }, [isOpen, listings.length, initialListingId, initialClientId]);

  useEffect(() => {
    if (!isOpen || !selectedListing) {
      setClients([]);
      return;
    }
    let cancelled = false;
    const preferredClient = initialClientId && selectedListing === initialListingId ? initialClientId : '';
    setLoadingClients(true);
    setSelectedClient(preferredClient);
    fetchPotentialClients(selectedListing)
      .then((rows) => {
        if (cancelled) return;
        setClients(rows);
        if (preferredClient) {
          const exists = rows.some(
            (client) => (client.clientId || client.client?.id) === preferredClient,
          );
          if (!exists) setSelectedClient('');
        }
      })
      .catch((error) => { if (!cancelled) toast.error(errorMessage(error)); })
      .finally(() => { if (!cancelled) setLoadingClients(false); });
    return () => { cancelled = true; };
  }, [isOpen, selectedListing, initialClientId, initialListingId]);

  const selectedClientData = useMemo(
    () => clients.find((client) => (client.clientId || client.client?.id) === selectedClient),
    [clients, selectedClient],
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.rate) || 0), 0),
    [items],
  );

  const handleAddItem = () => setItems((current) => [...current, emptyItem()]);

  const handleRemoveItem = (id: string) => {
    if (items.length === 1) {
      toast.error('Invoice must have at least one item');
      return;
    }
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const handleItemChange = (id: string, field: 'description' | 'quantity' | 'rate', value: string | number) => {
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
  };

  const handleClose = () => {
    if (submitting) return;
    onClose();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedListing) {
      toast.error('Select the scientist listing this invoice belongs to.');
      return;
    }
    if (!selectedClient) {
      toast.error('Please select a client');
      return;
    }
    if (!dueDate) {
      toast.error('Please set a due date');
      return;
    }
    if (items.some((item) => !item.description.trim())) {
      toast.error('All items must have a description');
      return;
    }
    if (items.some((item) => item.quantity <= 0 || item.rate <= 0)) {
      toast.error('All items must have a valid quantity and rate');
      return;
    }

    setSubmitting(true);
    try {
      const invoice = await createAndSendInvoice(selectedListing, {
        clientId: selectedClient,
        invoiceDate,
        dueDate,
        notes: notes.trim() || undefined,
        items: items.map((item) => ({
          serviceDescription: item.description.trim(),
          quantity: item.quantity,
          rateMinor: Math.round(item.rate * 100),
        })),
      });
      toast.success(`Invoice ${invoice.invoiceNumber || ''} sent successfully.`);
      onCreated?.();
      onClose();
    } catch (error) {
      toast.error(errorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[80vh] flex flex-col">
        <div className="bg-gradient-to-r from-brand-navy-900 to-brand-navy-800 px-6 py-5 flex items-center justify-between rounded-t-2xl flex-shrink-0">
          <div>
            <h2 className="text-xl font-bold text-white">Create Invoice</h2>
            <p className="text-sm text-white/70 mt-1">Generate an invoice for your client</p>
          </div>
          <button
            onClick={handleClose}
            className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-1">
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 flex gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-blue-900 font-medium">For Service Providers Only</p>
              <p className="text-xs text-blue-800 mt-1">
                Create and send invoices to clients who have interacted with one of your scientist listings.
              </p>
            </div>
          </div>

          {listings.length === 0 ? (
            <div className="rounded-xl border border-dashed border-neutral-gray-light p-8 text-center">
              <FileText className="h-8 w-8 text-neutral-gray-light mx-auto mb-2" />
              <p className="text-sm font-semibold text-neutral-black">No scientist listings found</p>
              <p className="text-xs text-neutral-gray-medium mt-1">
                Publish a scientist listing before creating invoices.
              </p>
            </div>
          ) : (
            <>
              <InvoiceClientFields
                listings={listings}
                selectedListing={selectedListing}
                onListingChange={setSelectedListing}
                clients={clients}
                loadingClients={loadingClients}
                selectedClient={selectedClient}
                onClientChange={setSelectedClient}
                selectedClientData={selectedClientData}
                invoiceDate={invoiceDate}
                dueDate={dueDate}
                onInvoiceDate={setInvoiceDate}
                onDueDate={setDueDate}
              />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-bold text-neutral-black">
                    Invoice Items <span className="text-brand-red-600">*</span>
                  </label>
                  <Button type="button" size="sm" variant="outline" onClick={handleAddItem} className="text-brand-navy-900">
                    <Plus className="h-4 w-4 mr-1" /> Add Item
                  </Button>
                </div>
                <div className="space-y-3">
                  {items.map((item, index) => (
                    <InvoiceItemEditor
                      key={item.id}
                      item={item}
                      index={index}
                      canRemove={items.length > 1}
                      onChange={handleItemChange}
                      onRemove={handleRemoveItem}
                    />
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-neutral-gray-light bg-gradient-to-br from-neutral-bg-light to-white p-5">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-gray-dark">Subtotal</span>
                  <span className="font-medium text-neutral-black">
                    {subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <p className="text-xs text-neutral-gray-medium mt-2">
                  Tax, processing fee and commission are calculated by the platform when the invoice is sent.
                </p>
                <div className="pt-2 mt-2 border-t border-neutral-gray-light flex justify-between">
                  <span className="font-bold text-neutral-black">Invoice total</span>
                  <span className="text-xl font-bold text-brand-navy-900">
                    {subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-neutral-black mb-2">
                  Notes <span className="text-neutral-gray-medium text-xs font-normal">(Optional)</span>
                </label>
                <textarea
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="Add any additional notes, payment terms, or special instructions..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-gray-light focus:ring-2 focus:ring-brand-red-600 focus:border-brand-red-600 transition-all resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-neutral-gray-light">
                <Button type="button" variant="outline" onClick={handleClose} className="flex-1" disabled={submitting}>
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 bg-brand-red-600 hover:bg-brand-red-700" disabled={submitting}>
                  {submitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Send className="h-4 w-4 mr-2" />}
                  {submitting ? 'Sending...' : 'Send Invoice'}
                </Button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
