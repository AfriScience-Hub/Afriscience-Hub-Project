'use client';

import React, { useState } from 'react';
import { Search, Filter, Plus, MoreHorizontal, Eye, Edit, Trash2, Building2 } from 'lucide-react';

const mockInstitutes = [
  { id: 1, name: 'University of Lagos', location: 'Lagos, Nigeria', type: 'University', status: 'Verified', listings: 245 },
  { id: 2, name: 'University of Nairobi', location: 'Nairobi, Kenya', type: 'University', status: 'Verified', listings: 189 },
  { id: 3, name: 'University of Cape Town', location: 'Cape Town, South Africa', type: 'University', status: 'Verified', listings: 312 },
  { id: 4, name: 'University of Ghana', location: 'Accra, Ghana', type: 'University', status: 'Pending', listings: 156 },
];

export default function InstitutesPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-neutral-gray-medium mb-1">
            <span>Dashboard</span>
            <span>›</span>
            <span>Categories</span>
            <span>›</span>
            <span className="text-neutral-black font-medium">Institutes</span>
          </div>
          <h1 className="text-2xl font-bold text-neutral-black flex items-center gap-2">
            <Building2 className="h-6 w-6 text-purple-600" />
            Institutes
          </h1>
          <p className="text-sm text-neutral-gray-dark mt-1">Manage institutes, universities, research centres, and academic organisations.</p>
        </div>
        <button className="px-4 py-2 bg-brand-navy-900 text-white rounded-lg text-sm font-medium hover:bg-brand-navy-800 cursor-pointer flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Institute
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm">
          <p className="text-xs text-neutral-gray-medium">Total Institutes</p>
          <p className="text-2xl font-bold text-neutral-black mt-1">1,248</p>
          <p className="text-xs text-green-600 mt-1">↑ 12.5% this month</p>
        </div>
        <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm">
          <p className="text-xs text-neutral-gray-medium">Verified</p>
          <p className="text-2xl font-bold text-neutral-black mt-1">1,102</p>
          <p className="text-xs text-green-600 mt-1">88.3% verification rate</p>
        </div>
        <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm">
          <p className="text-xs text-neutral-gray-medium">Pending Review</p>
          <p className="text-2xl font-bold text-neutral-black mt-1">146</p>
          <p className="text-xs text-orange-600 mt-1">12 new today</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium" />
          <input
            type="text"
            placeholder="Search institutes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-neutral-gray-light focus:border-brand-red-600 focus:ring-1 focus:ring-brand-red-600 outline-none"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-neutral-gray-light rounded-lg text-sm font-medium text-neutral-gray-dark hover:bg-neutral-bg-light cursor-pointer">
          <Filter className="h-4 w-4" />
          Filters
        </button>
      </div>

      <div className="rounded-xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-gray-light bg-neutral-bg-light">
                <th className="text-left px-4 py-3 font-medium text-neutral-gray-dark">Name</th>
                <th className="text-left px-4 py-3 font-medium text-neutral-gray-dark">Location</th>
                <th className="text-left px-4 py-3 font-medium text-neutral-gray-dark">Type</th>
                <th className="text-left px-4 py-3 font-medium text-neutral-gray-dark">Status</th>
                <th className="text-left px-4 py-3 font-medium text-neutral-gray-dark">Listings</th>
                <th className="text-right px-4 py-3 font-medium text-neutral-gray-dark">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockInstitutes.map((inst) => (
                <tr key={inst.id} className="border-b border-neutral-gray-light last:border-0 hover:bg-neutral-bg-light/50">
                  <td className="px-4 py-3 font-medium text-neutral-black">{inst.name}</td>
                  <td className="px-4 py-3 text-neutral-gray-dark">{inst.location}</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600">{inst.type}</span></td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      inst.status === 'Verified' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'
                    }`}>{inst.status}</span>
                  </td>
                  <td className="px-4 py-3 text-neutral-gray-dark">{inst.listings}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="p-1 hover:bg-neutral-bg-light rounded cursor-pointer">
                      <MoreHorizontal className="h-4 w-4 text-neutral-gray-medium" />
                    </button>
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
