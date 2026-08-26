'use client';

import React, { useState } from 'react';
import { Search, Filter, Download, MoreHorizontal, Eye, Edit, Trash2 } from 'lucide-react';

const mockUsers = [
  { id: 1, name: 'Dr. Amina Bello', email: 'amina@example.com', role: 'Scientist', status: 'Active', date: '2025-01-15' },
  { id: 2, name: 'University of Lagos', email: 'info@unilag.edu.ng', role: 'Institution', status: 'Active', date: '2025-01-14' },
  { id: 3, name: 'TechCorp Africa', email: 'hello@techcorp.africa', role: 'Sponsor', status: 'Pending', date: '2025-01-13' },
  { id: 4, name: 'John Okafor', email: 'john@example.com', role: 'Innovator', status: 'Active', date: '2025-01-12' },
  { id: 5, name: 'Nairobi Science Center', email: 'info@nairobiscience.ke', role: 'Specialist Centre', status: 'Inactive', date: '2025-01-11' },
];

export default function AllUsersPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-black">All Users</h1>
          <p className="text-sm text-neutral-gray-dark mt-1">Manage all users across the platform.</p>
        </div>
        <button className="px-4 py-2 bg-brand-navy-900 text-white rounded-lg text-sm font-medium hover:bg-brand-navy-800 cursor-pointer">
          Export Users
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium" />
          <input
            type="text"
            placeholder="Search users..."
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
                <th className="text-left px-4 py-3 font-medium text-neutral-gray-dark">Email</th>
                <th className="text-left px-4 py-3 font-medium text-neutral-gray-dark">Role</th>
                <th className="text-left px-4 py-3 font-medium text-neutral-gray-dark">Status</th>
                <th className="text-left px-4 py-3 font-medium text-neutral-gray-dark">Date</th>
                <th className="text-right px-4 py-3 font-medium text-neutral-gray-dark">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((user) => (
                <tr key={user.id} className="border-b border-neutral-gray-light last:border-0 hover:bg-neutral-bg-light/50">
                  <td className="px-4 py-3 font-medium text-neutral-black">{user.name}</td>
                  <td className="px-4 py-3 text-neutral-gray-dark">{user.email}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600">{user.role}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === 'Active' ? 'bg-green-50 text-green-600' :
                      user.status === 'Pending' ? 'bg-yellow-50 text-yellow-600' :
                      'bg-gray-50 text-gray-600'
                    }`}>{user.status}</span>
                  </td>
                  <td className="px-4 py-3 text-neutral-gray-medium">{user.date}</td>
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
