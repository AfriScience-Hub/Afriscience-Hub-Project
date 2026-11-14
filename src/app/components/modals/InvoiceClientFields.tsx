'use client';

import { Calendar, FileText, User } from 'lucide-react';
import type { OwnedScientistListing, PotentialClient } from '@/app/dashboard/invoices/api';

interface InvoiceClientFieldsProps {
  listings: OwnedScientistListing[];
  selectedListing: string;
  onListingChange: (value: string) => void;
  clients: PotentialClient[];
  loadingClients: boolean;
  selectedClient: string;
  onClientChange: (value: string) => void;
  selectedClientData?: PotentialClient;
  invoiceDate: string;
  dueDate: string;
  onInvoiceDate: (value: string) => void;
  onDueDate: (value: string) => void;
}

/** Listing, client and date fields shared by the create-invoice modal. */
export default function InvoiceClientFields({
  listings,
  selectedListing,
  onListingChange,
  clients,
  loadingClients,
  selectedClient,
  onClientChange,
  selectedClientData,
  invoiceDate,
  dueDate,
  onInvoiceDate,
  onDueDate,
}: InvoiceClientFieldsProps) {
  return (
    <>
      <div>
        <label className="block text-sm font-bold text-neutral-black mb-2">
          Scientist Listing <span className="text-brand-red-600">*</span>
        </label>
        <div className="relative">
          <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium pointer-events-none" />
          <select
            value={selectedListing}
            onChange={(event) => onListingChange(event.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-gray-light focus:ring-2 focus:ring-brand-red-600 focus:border-brand-red-600 transition-all appearance-none bg-white"
            required
          >
            {listings.map((listing) => (
              <option key={listing.id} value={listing.id}>{listing.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-neutral-black mb-2">
          Select Client <span className="text-brand-red-600">*</span>
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium pointer-events-none" />
          <select
            value={selectedClient}
            onChange={(event) => onClientChange(event.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-gray-light focus:ring-2 focus:ring-brand-red-600 focus:border-brand-red-600 transition-all appearance-none bg-white"
            required
            disabled={loadingClients || clients.length === 0}
          >
            <option value="">
              {loadingClients
                ? 'Loading clients...'
                : clients.length === 0
                  ? 'No clients have booked this listing yet'
                  : 'Choose a potential client...'}
            </option>
            {clients.map((client) => {
              const id = client.clientId || client.client?.id || client.id;
              const name = client.client?.fullName || client.client?.email || 'Client';
              return (
                <option key={id} value={id}>
                  {name}{client.client?.email ? ` — ${client.client.email}` : ''}
                </option>
              );
            })}
          </select>
        </div>
        {selectedClientData && (
          <div className="mt-2 p-3 rounded-lg bg-neutral-bg-light border border-neutral-gray-light">
            <p className="text-sm font-medium text-neutral-black">
              {selectedClientData.client?.fullName || 'Client'}
            </p>
            <p className="text-xs text-neutral-gray-medium">{selectedClientData.client?.email}</p>
            <p className="text-xs text-neutral-gray-medium mt-1">
              Last interaction: {selectedClientData.lastRequestedAt?.slice(0, 10) || '—'}
            </p>
          </div>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-neutral-black mb-2">
            Invoice Date <span className="text-brand-red-600">*</span>
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium pointer-events-none" />
            <input
              type="date"
              value={invoiceDate}
              onChange={(event) => onInvoiceDate(event.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-gray-light focus:ring-2 focus:ring-brand-red-600 focus:border-brand-red-600 transition-all"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-bold text-neutral-black mb-2">
            Due Date <span className="text-brand-red-600">*</span>
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium pointer-events-none" />
            <input
              type="date"
              value={dueDate}
              onChange={(event) => onDueDate(event.target.value)}
              min={invoiceDate}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-gray-light focus:ring-2 focus:ring-brand-red-600 focus:border-brand-red-600 transition-all"
              required
            />
          </div>
        </div>
      </div>
    </>
  );
}
