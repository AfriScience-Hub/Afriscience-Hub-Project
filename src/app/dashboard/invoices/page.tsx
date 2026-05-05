'use client';

import { useState } from 'react';
import { CalendarDays, Check, Download, Eye, Plus, Send, User, X } from 'lucide-react';

type InvoiceStatus = 'pending' | 'awaiting' | 'paid' | 'rejected';

const tabs: Array<{ id: InvoiceStatus; label: string; count: number }> = [
  { id: 'pending', label: 'Pending', count: 1 },
  { id: 'awaiting', label: 'Awaiting Confirmation', count: 1 },
  { id: 'paid', label: 'Paid', count: 2 },
  { id: 'rejected', label: 'Rejected', count: 1 },
];

const invoices = {
  pending: [
    {
      title: 'Solar Installation Consultation',
      invoice: 'INV-2024-0045',
      provider: 'GreenTech Solutions',
      client: 'Amara Farms Ltd',
      due: '2024-04-15',
      amount: '₦25,000',
      badge: 'Pending',
    },
  ],
  awaiting: [
    {
      title: 'AgriTech Training Workshop',
      invoice: 'INV-2024-0044',
      provider: 'You',
      client: 'Kwame Agro Cooperative',
      due: '2024-04-10',
      amount: '₦180,000',
      badge: 'Awaiting Confirmation',
    },
  ],
  paid: [
    {
      title: 'Innovation Audit',
      invoice: 'INV-2024-0043',
      provider: 'TechConsult Services',
      client: 'You',
      due: '2024-04-05',
      paid: '2024-03-30',
      amount: '₦50,000',
      badge: 'Paid',
    },
    {
      title: 'Mentorship Program - 3 Months',
      invoice: 'INV-2024-0042',
      provider: 'You',
      client: 'StartUp Accelerator Hub',
      due: '2024-04-01',
      paid: '2024-03-29',
      amount: '₦120,000',
      badge: 'Paid',
    },
  ],
  rejected: [
    {
      title: 'Technical Review Service',
      invoice: 'INV-2024-0041',
      provider: 'Engineering Consult Ltd',
      client: 'You',
      due: '2024-03-30',
      amount: '₦35,000',
      badge: 'Rejected',
    },
  ],
};

function badgeClass(status: string) {
  if (status === 'Pending') return 'bg-yellow-100 text-yellow-700';
  if (status === 'Awaiting Confirmation') return 'bg-blue-100 text-blue-700';
  if (status === 'Paid') return 'bg-green-100 text-green-700';
  return 'bg-red-100 text-red-700';
}

function InvoiceModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-70 flex items-start justify-center overflow-y-auto bg-black/60 p-5">
      <div className="w-full max-w-3xl overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="flex items-start justify-between bg-[#082947] p-5 text-white ">
          <div>
            <h2 className="text-lg font-bold lg:text-xl">Create Invoice</h2>
            <p className="mt-1 text-xs text-slate-200 lg:text-sm">Generate an invoice for your client</p>
          </div>
          <button onClick={onClose} className="grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-white/10 hover:bg-white/20">
            <X size={20} />
          </button>
        </div>

        <div className="max-h-[calc(100vh-130px)] overflow-y-auto px-5 py-5 lg:px-6">
          <div className="mb-5 rounded-lg border border-blue-200 bg-blue-50 px-4 py-4 text-blue-700">
            <p className="text-xs font-semibold lg:text-sm">For Service Providers Only</p>
            <p className="mt-1 text-[10px] lg:text-xs">
              Create and send invoices to clients you&apos;ve communicated with through the platform. Select a client from your recent interactions below.
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-xs font-bold text-gray-900">Select Client <span className="text-red-500">*</span></label>
              <div className="relative">
                <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select defaultValue="" className="h-11 w-full cursor-pointer rounded-lg border border-gray-200 bg-white pl-10 pr-3 text-sm text-black outline-none">
                  <option value="">Choose a client from your recent interactions...</option>
                  <option>Amara Farms Ltd</option>
                  <option>Kwame Agro Cooperative</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-bold text-gray-900">Invoice Date <span className="text-red-500">*</span></label>
                <div className="relative">
                  <CalendarDays size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" placeholder="05/04/2026" className="h-11 w-full rounded-lg border border-gray-200 pl-10 pr-3 text-sm text-black outline-none placeholder:text-gray-400" />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold text-gray-900">Due Date <span className="text-red-500">*</span></label>
                <div className="relative">
                  <CalendarDays size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" placeholder="mm/dd/yyyy" className="h-11 w-full rounded-lg border border-gray-200 pl-10 pr-3 text-sm text-black outline-none placeholder:text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="block text-xs font-bold text-gray-900">Invoice Items <span className="text-red-500">*</span></label>
                <button className="cursor-pointer rounded-md border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50">
                  <Plus size={14} className="mr-1 inline" />
                  Add Item
                </button>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <p className="mb-3 text-xs font-bold uppercase text-gray-400">Item 1</p>
                <input className="mb-4 h-11 w-full rounded-lg border border-gray-200 px-3 text-sm text-black outline-none placeholder:text-gray-400" placeholder="Service or product description" />
                <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                  <input className="h-10 rounded-md border border-gray-200 px-3 text-sm text-black outline-none placeholder:text-gray-400" placeholder="Quantity" />
                  <input className="h-10 rounded-md border border-gray-200 px-3 text-sm text-black outline-none placeholder:text-gray-400" placeholder="Rate (₦)" />
                  <input className="h-10 rounded-md border border-gray-200 px-3 text-sm text-black outline-none placeholder:text-gray-400" placeholder="Amount (₦)" />
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-4 text-sm">
              <div className="flex justify-between py-1 text-gray-600"><span>Subtotal</span><span>₦0.00</span></div>
              <div className="flex justify-between py-1 text-gray-600"><span>Tax (7.5% VAT)</span><span>₦0.00</span></div>
              <div className="mt-2 flex justify-between border-t border-gray-200 pt-3 text-base font-bold text-gray-950"><span>Total Amount</span><span>₦0.00</span></div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold text-gray-900">Notes <span className="font-normal text-gray-400">(Optional)</span></label>
              <textarea className="h-24 w-full resize-none rounded-lg border border-gray-200 px-3 py-3 text-sm text-black outline-none placeholder:text-gray-400" placeholder="Add any additional notes, payment terms, or special instructions..." />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 border-t border-gray-200 pt-4 lg:grid-cols-2">
            <button onClick={onClose} className="cursor-pointer rounded-md border border-gray-200 px-4 py-3 text-sm text-black font-medium hover:bg-gray-50">Cancel</button>
            <button className="cursor-pointer rounded-md bg-red-500 px-4 py-3 text-sm font-bold text-white hover:bg-red-600">
              <Send size={15} className="mr-2 inline" />
              Send Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InvoicesPage() {
  const [activeTab, setActiveTab] = useState<InvoiceStatus>('pending');
  const [modalOpen, setModalOpen] = useState(false);
  const currentInvoices = invoices[activeTab];

  return (
    <>
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:p-8">
        <div className="mb-8 flex flex-col lg:flex-row items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-950 lg:text-2xl">Invoices</h1>
            <p className="mt-2 text-sm text-gray-400 lg:text-base">Manage your service invoices and payments</p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#082947] px-3 py-3 text-sm font-bold text-white hover:bg-slate-900 lg:px-4 lg:text-md"
          >
            <Plus size={20} />
            Create Invoice
          </button>
        </div>

        <div className="mb-7 flex flex-wrap gap-3 mt-7">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`cursor-pointer rounded-md px-3 py-2 text-xs font-bold lg:px-3 lg:text-md ${
                activeTab === tab.id ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.label} <span className="ml-2">({tab.count})</span>
            </button>
          ))}
        </div>

        <div className="space-y-5">
          {currentInvoices.map((invoice) => (
            <article key={invoice.invoice} className="rounded-xl border border-gray-200 p-4 lg:p-6">
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_auto_auto] lg:items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-lg font-bold text-gray-950 lg:text-xl">{invoice.title}</h2>
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${badgeClass(invoice.badge)}`}>{invoice.badge}</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-400 lg:text-base">Invoice: {invoice.invoice}</p>
                  <div className="mt-3 grid grid-cols-1 gap-3 text-sm text-gray-400 lg:text-base">
                    <span>Provider: {invoice.provider}</span>
                    <span>Client: {invoice.client}</span>
                    <span>Due: {invoice.due}</span>
                    {'paid' in invoice && <span className="text-green-600">Paid: {invoice.paid}</span>}
                  </div>
                </div>
                <p className="text-lg font-bold text-[#082947]">{invoice.amount}</p>
                <div className="flex flex-wrap gap-3">
                  <button className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-bold text-gray-900 hover:bg-gray-50">
                    <Eye size={16} /> View
                  </button>
                  {activeTab === 'pending' && (
                    <button className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-xs font-bold text-white hover:bg-red-600">
                      $ Pay
                    </button>
                  )}
                  {activeTab === 'awaiting' && (
                    <button className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-green-600 px-4 py-3 text-sm font-bold text-white hover:bg-green-700">
                      <Check size={16} /> Confirm
                    </button>
                  )}
                  {activeTab === 'paid' && (
                    <button className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 px-4 py-3 text-sm font-bold text-gray-900 hover:bg-gray-50">
                      <Download size={16} /> Receipt
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {modalOpen && <InvoiceModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
