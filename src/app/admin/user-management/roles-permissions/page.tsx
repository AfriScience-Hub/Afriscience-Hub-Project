'use client';

import React from 'react';
import { Shield, Lock, Eye, Users, Settings } from 'lucide-react';

const roles = [
  { name: 'Super Admin', description: 'Full access to all features', permissions: ['All'], color: 'bg-purple-50 text-purple-600 border-purple-200' },
  { name: 'Admin', description: 'Manage users, content, and approvals', permissions: ['Users', 'Content', 'Approvals', 'Reports'], color: 'bg-blue-50 text-blue-600 border-blue-200' },
  { name: 'Moderator', description: 'Manage content and approvals', permissions: ['Content', 'Approvals'], color: 'bg-green-50 text-green-600 border-green-200' },
  { name: 'Editor', description: 'Edit content and manage listings', permissions: ['Content', 'Listings'], color: 'bg-orange-50 text-orange-600 border-orange-200' },
  { name: 'Viewer', description: 'Read-only access to dashboard', permissions: ['View'], color: 'bg-gray-50 text-gray-600 border-gray-200' },
];

export default function RolesPermissionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-black">Roles & Permissions</h1>
          <p className="text-sm text-neutral-gray-dark mt-1">Define roles and control access across the platform.</p>
        </div>
        <button className="px-4 py-2 bg-brand-navy-900 text-white rounded-lg text-sm font-medium hover:bg-brand-navy-800 cursor-pointer flex items-center gap-2">
          <Shield className="h-4 w-4" />
          Create Role
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {roles.map((role) => (
          <div key={role.name} className={`rounded-xl border bg-white p-5 shadow-sm ${role.color.split(' ')[2]}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg ${role.color.split(' ')[0]}`}>
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-black">{role.name}</p>
                <p className="text-xs text-neutral-gray-medium">{role.description}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-4">
              {role.permissions.map((perm) => (
                <span key={perm} className="px-2 py-0.5 rounded text-[10px] font-medium bg-neutral-bg-light text-neutral-gray-dark">
                  {perm}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-neutral-black mb-4">Permission Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-gray-light">
                <th className="text-left px-4 py-2 font-medium text-neutral-gray-dark">Permission</th>
                <th className="text-center px-4 py-2 font-medium text-neutral-gray-dark">Super Admin</th>
                <th className="text-center px-4 py-2 font-medium text-neutral-gray-dark">Admin</th>
                <th className="text-center px-4 py-2 font-medium text-neutral-gray-dark">Moderator</th>
                <th className="text-center px-4 py-2 font-medium text-neutral-gray-dark">Editor</th>
                <th className="text-center px-4 py-2 font-medium text-neutral-gray-dark">Viewer</th>
              </tr>
            </thead>
            <tbody>
              {['Manage Users', 'Manage Content', 'Approve Listings', 'View Reports', 'System Settings'].map((perm) => (
                <tr key={perm} className="border-b border-neutral-gray-light last:border-0">
                  <td className="px-4 py-2 text-neutral-black">{perm}</td>
                  <td className="text-center px-4 py-2">✓</td>
                  <td className="text-center px-4 py-2">{perm !== 'System Settings' ? '✓' : '—'}</td>
                  <td className="text-center px-4 py-2">{['Manage Content', 'Approve Listings'].includes(perm) ? '✓' : '—'}</td>
                  <td className="text-center px-4 py-2">{perm === 'Manage Content' ? '✓' : '—'}</td>
                  <td className="text-center px-4 py-2">—</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
