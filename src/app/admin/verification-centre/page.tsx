'use client';

import React, { useState } from 'react';
import { Search, Filter, Shield, CheckCircle, Clock } from 'lucide-react';

const pendingVerifications = [
  { id: 1, type: 'Scientist', name: 'Dr. Amina Bello', country: 'Nigeria', submitted: '2026-01-15', documents: 3 },
  { id: 2, type: 'Institution', name: 'University of Nairobi', country: 'Kenya', submitted: '2026-01-14', documents: 5 },
  { id: 3, type: 'Innovation', name: 'AI Crop Predictor', country: 'Ghana', submitted: '2026-01-13', documents: 2 },
  { id: 4, type: 'Volunteer', name: 'Sarah Okonkwo', country: 'Nigeria', submitted: '2026-01-12', documents: 1 },
];

export default function VerificationCentrePage() {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-black">Verification Centre</h1>
        <p className="text-sm text-neutral-gray-dark mt-1">Verify user profiles and submitted documents.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="rounded-xl border border-neutral-gray-light bg-white p-4 shadow-sm">
          <p className="text-xs text-neutral-gray-medium">Pending Verification</p>
          <p className="text-2xl font-bold text-orange-600 mt-1">26</p>
        </div>
        <div className="rounded-xl border border-neutral-gray-light bg-white p-4 shadow-sm">
          <p className="text-xs text-neutral-gray-medium">Verified Today</p>
          <p className="text-2xl font-bold text-green-600 mt-1">8</p>
        </div>
        <div className="rounded-xl border border-neutral-gray-light bg-white p-4 shadow-sm">
          <p className="text-xs text-neutral-gray-medium">Rejected</p>
          <p className="text-2xl font-bold text-red-600 mt-1">2</p>
        </div>
        <div className="rounded-xl border border-neutral-gray-light bg-white p-4 shadow-sm">
          <p className="text-xs text-neutral-gray-medium">Total Verified</p>
          <p className="text-2xl font-bold text-neutral-black mt-1">4,521</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium" />
          <input type="text" placeholder="Search verifications..." value={search} onChange={(e) => setSearch(e.target.value)}
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
                <th className="text-left px-4 py-3 font-medium text-neutral-gray-dark">Country</th>
                <th className="text-left px-4 py-3 font-medium text-neutral-gray-dark">Submitted</th>
                <th className="text-left px-4 py-3 font-medium text-neutral-gray-dark">Documents</th>
                <th className="text-right px-4 py-3 font-medium text-neutral-gray-dark">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingVerifications.map((v) => (
                <tr key={v.id} className="border-b border-neutral-gray-light last:border-0 hover:bg-neutral-bg-light/50">
                  <td className="px-4 py-3"><span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600">{v.type}</span></td>
                  <td className="px-4 py-3 font-medium text-neutral-black">{v.name}</td>
                  <td className="px-4 py-3 text-neutral-gray-dark">{v.country}</td>
                  <td className="px-4 py-3 text-neutral-gray-dark">{v.submitted}</td>
                  <td className="px-4 py-3 text-neutral-gray-dark">{v.documents} files</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 hover:bg-green-50 rounded cursor-pointer"><CheckCircle className="h-4 w-4 text-green-600" /></button>
                      <button className="text-xs font-medium text-brand-red-600 hover:text-brand-red-700 cursor-pointer">Review</button>
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
