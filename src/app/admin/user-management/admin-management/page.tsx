'use client';

import React, { useState } from 'react';
import { Search, Shield, MoreHorizontal } from 'lucide-react';

const mockAdmins = [
  { id: 1, name: 'Claire Iwuanyanwu', email: 'claire@afrisciencehub.com', role: 'Super Admin', status: 'Active' },
  { id: 2, name: 'Emeka Okonkwo', email: 'emeka@afrisciencehub.com', role: 'Admin', status: 'Active' },
  { id: 3, name: 'Fatima Hassan', email: 'fatima@afrisciencehub.com', role: 'Admin', status: 'Active' },
  { id: 4, name: 'David Mwangi', email: 'david@afrisciencehub.com', role: 'Moderator', status: 'Active' },
];

export default function AdminManagementPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-black">Admin Management</h1>
          <p className="text-sm text-neutral-gray-dark mt-1">Manage administrator accounts and roles.</p>
        </div>
        <button className="px-4 py-2 bg-brand-navy-900 text-white rounded-lg text-sm font-medium hover:bg-brand-navy-800 cursor-pointer flex items-center gap-2">
          <Shield className="h-4 w-4" />
          Add Admin
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium" />
        <input
          type="text"
          placeholder="Search admins..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-neutral-gray-light focus:border-brand-red-600 focus:ring-1 focus:ring-brand-red-600 outline-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockAdmins.map((admin) => (
          <div key={admin.id} className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-brand-navy-900 flex items-center justify-center text-white font-bold text-sm">
                  {admin.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-black">{admin.name}</p>
                  <p className="text-xs text-neutral-gray-medium">{admin.email}</p>
                </div>
              </div>
              <button className="p-1 hover:bg-neutral-bg-light rounded cursor-pointer">
                <MoreHorizontal className="h-4 w-4 text-neutral-gray-medium" />
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                admin.role === 'Super Admin' ? 'bg-purple-50 text-purple-600' :
                admin.role === 'Admin' ? 'bg-blue-50 text-blue-600' :
                'bg-green-50 text-green-600'
              }`}>{admin.role}</span>
              <span className="h-2 w-2 rounded-full bg-green-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
