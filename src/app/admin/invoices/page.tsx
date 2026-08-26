'use client';

import React, { useState } from 'react';
import { Search, Filter, FileText, Download, Eye } from 'lucide-react';

const mockInvoices = [
  { id: 'INV-2026-001', client: 'TechCorp Africa', amount: '₦2,500,000', status: 'Paid', date: '2026-01-15' },
  { id: 'INV-2026-002', client: 'University of Lagos', amount: '₦750,000', status: 'Pending', date: '2026-01-14' },
  { id: 'INV-2026-003', client: 'Dr. Amina Bello', amount: '₦150,000', status: 'Overdue', date: '2026-01-10' },
  { id: 'INV-2026-004', client: 'Nairobi Innovation Hub', amount: '₦1,200,000', status: 'Paid', date: '2026-01-08' },
];

export default function InvoicesPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-black">Invoices</h1>
          <p className="text-sm text-neutral-gray-dark mt-1">Manage invoices and payment tracking.</p>
        </div>
        <button className="px-4 py-2 bg-brand-navy-900 text-white rounded-lg text-sm font-medium hover:bg-brand-navy-800 cursor-pointer flex items-center gap-2">
          <FileText className="h-4 w-4" /> Create Invoice
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="rounded-xl border border-neutral-gray-light bg-white p-4 shadow-sm">
          <p className="text-xs text-neutral-gray-medium">Total Outstanding</p>
          <p className="text-2xl font-bold text-orange-600 mt-1">₦3.2M</p>
        </div>
        <div className="rounded-xl border border-neutral-gray-light bg-white p-4 shadow-sm">
          <p className="text-xs text-neutral-gray-medium">Paid This Month</p>
          <p className="text-2xl font-bold text-green-600 mt-1">₦8.4M</p>
        </div>
        <div className="rounded-xl border border-neutral-gray-light bg-white p-4 shadow-sm">
          <p className="text-xs text-neutral-gray-medium">Overdue</p>
          <p className="text-2xl font-bold text-red-600 mt-1">24</p>
        </div>
        <div className="rounded-xl border border-neutral-gray-light bg-white p-4 shadow-sm">
          <p className="text-xs text-neutral-gray-medium">Total Invoices</p>
          <p className="text-2xl font-bold text-neutral-black mt-1">1,248</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium" />
          <input type="text" placeholder="Search invoices..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-neutral-gray-light focus:border-brand-red-600 focus:ring-1 focus:ring-brand-red-600 outline-none" />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-neutral-gray-light rounded-lg text-sm font-medium text-neutral-gray-dark hover:bg-neutral-bg-light cursor-pointer">
          <Filter className="h-4 w-4" /> Filters
        </button>
      </div>

      <div className="rounded-xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-gray-light bg-neutral-bg-light">
                <th className="text-left px-4 py-3 font-medium text-neutral-gray-dark">Invoice ID</th>
                <th className="text-left px-4 py-3 font-medium text-neutral-gray-dark">Client</th>
                <th className="text-left px-4 py-3 font-medium text-neutral-gray-dark">Amount</th>
                <th className="text-left px-4 py-3 font-medium text-neutral-gray-dark">Status</th>
                <th className="text-left px-4 py-3 font-medium text-neutral-gray-dark">Date</th>
                <th className="text-right px-4 py-3 font-medium text-neutral-gray-dark">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockInvoices.map((inv) => (
                <tr key={inv.id} className="border-b border-neutral-gray-light last:border-0 hover:bg-neutral-bg-light/50">
                  <td className="px-4 py-3 font-medium text-neutral-black">{inv.id}</td>
                  <td className="px-4 py-3 text-neutral-gray-dark">{inv.client}</td>
                  <td className="px-4 py-3 font-medium text-neutral-black">{inv.amount}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      inv.status === 'Paid' ? 'bg-green-50 text-green-600' :
                      inv.status === 'Pending' ? 'bg-yellow-50 text-yellow-600' :
                      'bg-red-50 text-red-600'
                    }`}>{inv.status}</span>
                  </td>
                  <td className="px-4 py-3 text-neutral-gray-dark">{inv.date}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 hover:bg-neutral-bg-light rounded cursor-pointer"><Eye className="h-4 w-4 text-neutral-gray-medium" /></button>
                      <button className="p-1.5 hover:bg-neutral-bg-light rounded cursor-pointer"><Download className="h-4 w-4 text-neutral-gray-medium" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
