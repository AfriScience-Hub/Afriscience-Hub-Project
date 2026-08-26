'use client';

import React, { useState } from 'react';
import { Search, Filter, CheckCircle, XCircle, Clock, Eye } from 'lucide-react';

const pendingApprovals = [
  { id: 1, type: 'Institution', name: 'University of Abuja', submittedBy: 'Admin', date: '2026-01-15', priority: 'High' },
  { id: 2, type: 'Scientist', name: 'Dr. Chidi Eze', submittedBy: 'Self', date: '2026-01-14', priority: 'Medium' },
  { id: 3, type: 'Innovation', name: 'Smart Irrigation System', submittedBy: 'Innovator', date: '2026-01-13', priority: 'Low' },
  { id: 4, type: 'Competition', name: 'Afri-Memes Season 4', submittedBy: 'Admin', date: '2026-01-12', priority: 'High' },
];

export default function ApprovalsPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-black">Approvals</h1>
        <p className="text-sm text-neutral-gray-dark mt-1">Review and approve pending submissions.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="rounded-xl border border-neutral-gray-light bg-white p-4 shadow-sm">
          <p className="text-xs text-neutral-gray-medium">Pending</p>
          <p className="text-2xl font-bold text-orange-600 mt-1">37</p>
        </div>
        <div className="rounded-xl border border-neutral-gray-light bg-white p-4 shadow-sm">
          <p className="text-xs text-neutral-gray-medium">Approved Today</p>
          <p className="text-2xl font-bold text-green-600 mt-1">12</p>
        </div>
        <div className="rounded-xl border border-neutral-gray-light bg-white p-4 shadow-sm">
          <p className="text-xs text-neutral-gray-medium">Rejected Today</p>
          <p className="text-2xl font-bold text-red-600 mt-1">3</p>
        </div>
        <div className="rounded-xl border border-neutral-gray-light bg-white p-4 shadow-sm">
          <p className="text-xs text-neutral-gray-medium">Avg. Response Time</p>
          <p className="text-2xl font-bold text-neutral-black mt-1">2.4h</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium" />
          <input type="text" placeholder="Search approvals..." value={search} onChange={(e) => setSearch(e.target.value)}
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
                <th className="text-left px-4 py-3 font-medium text-neutral-gray-dark">Type</th>
                <th className="text-left px-4 py-3 font-medium text-neutral-gray-dark">Name</th>
                <th className="text-left px-4 py-3 font-medium text-neutral-gray-dark">Submitted By</th>
                <th className="text-left px-4 py-3 font-medium text-neutral-gray-dark">Date</th>
                <th className="text-left px-4 py-3 font-medium text-neutral-gray-dark">Priority</th>
                <th className="text-right px-4 py-3 font-medium text-neutral-gray-dark">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingApprovals.map((item) => (
                <tr key={item.id} className="border-b border-neutral-gray-light last:border-0 hover:bg-neutral-bg-light/50">
                  <td className="px-4 py-3"><span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600">{item.type}</span></td>
                  <td className="px-4 py-3 font-medium text-neutral-black">{item.name}</td>
                  <td className="px-4 py-3 text-neutral-gray-dark">{item.submittedBy}</td>
                  <td className="px-4 py-3 text-neutral-gray-dark">{item.date}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.priority === 'High' ? 'bg-red-50 text-red-600' :
                      item.priority === 'Medium' ? 'bg-yellow-50 text-yellow-600' :
                      'bg-green-50 text-green-600'
                    }`}>{item.priority}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 hover:bg-green-50 rounded cursor-pointer"><CheckCircle className="h-4 w-4 text-green-600" /></button>
                      <button className="p-1.5 hover:bg-red-50 rounded cursor-pointer"><XCircle className="h-4 w-4 text-red-600" /></button>
                      <button className="p-1.5 hover:bg-neutral-bg-light rounded cursor-pointer"><Eye className="h-4 w-4 text-neutral-gray-medium" /></button>
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
