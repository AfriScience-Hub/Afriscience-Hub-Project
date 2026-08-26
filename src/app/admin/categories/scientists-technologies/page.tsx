'use client';

import React, { useState } from 'react';
import { Search, Filter, Plus, MoreHorizontal, Beaker } from 'lucide-react';

const mockScientists = [
  { id: 1, name: 'Dr. Amina Bello', field: 'Biotechnology', country: 'Nigeria', status: 'Verified', contributions: 12 },
  { id: 2, name: 'Prof. Kwame Mensah', field: 'Environmental Science', country: 'Ghana', status: 'Verified', contributions: 8 },
  { id: 3, name: 'Dr. Fatima Al-Rashid', field: 'AI & Machine Learning', country: 'Kenya', status: 'Pending', contributions: 5 },
];

export default function ScientistsTechnologiesPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-neutral-gray-medium mb-1">
            <span>Dashboard</span><span>›</span><span>Categories</span><span>›</span>
            <span className="text-neutral-black font-medium">Scientists & Technologies</span>
          </div>
          <h1 className="text-2xl font-bold text-neutral-black flex items-center gap-2">
            <Beaker className="h-6 w-6 text-blue-600" />
            Scientists & Technologies
          </h1>
          <p className="text-sm text-neutral-gray-dark mt-1">Manage scientist profiles and technology experts.</p>
        </div>
        <button className="px-4 py-2 bg-brand-navy-900 text-white rounded-lg text-sm font-medium hover:bg-brand-navy-800 cursor-pointer flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Scientist
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm">
          <p className="text-xs text-neutral-gray-medium">Total Scientists</p>
          <p className="text-2xl font-bold text-neutral-black mt-1">2,349</p>
          <p className="text-xs text-green-600 mt-1">↑ 8.2% this month</p>
        </div>
        <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm">
          <p className="text-xs text-neutral-gray-medium">Verified</p>
          <p className="text-2xl font-bold text-neutral-black mt-1">2,102</p>
        </div>
        <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm">
          <p className="text-xs text-neutral-gray-medium">Pending Review</p>
          <p className="text-2xl font-bold text-neutral-black mt-1">247</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium" />
          <input type="text" placeholder="Search scientists..." value={search} onChange={(e) => setSearch(e.target.value)}
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
                <th className="text-left px-4 py-3 font-medium text-neutral-gray-dark">Name</th>
                <th className="text-left px-4 py-3 font-medium text-neutral-gray-dark">Field</th>
                <th className="text-left px-4 py-3 font-medium text-neutral-gray-dark">Country</th>
                <th className="text-left px-4 py-3 font-medium text-neutral-gray-dark">Status</th>
                <th className="text-left px-4 py-3 font-medium text-neutral-gray-dark">Contributions</th>
                <th className="text-right px-4 py-3 font-medium text-neutral-gray-dark">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockScientists.map((s) => (
                <tr key={s.id} className="border-b border-neutral-gray-light last:border-0 hover:bg-neutral-bg-light/50">
                  <td className="px-4 py-3 font-medium text-neutral-black">{s.name}</td>
                  <td className="px-4 py-3 text-neutral-gray-dark">{s.field}</td>
                  <td className="px-4 py-3 text-neutral-gray-dark">{s.country}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${s.status === 'Verified' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}`}>{s.status}</span>
                  </td>
                  <td className="px-4 py-3 text-neutral-gray-dark">{s.contributions}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="p-1 hover:bg-neutral-bg-light rounded cursor-pointer"><MoreHorizontal className="h-4 w-4 text-neutral-gray-medium" /></button>
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
