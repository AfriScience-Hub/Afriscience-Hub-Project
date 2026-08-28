'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Search, Download, ChevronLeft, ChevronRight, MoreHorizontal, Plus, Users, Crown, ShieldCheck, ShieldOff, Mail } from 'lucide-react';
import { MOCK_ADMINS, STATS, TABS, ROLES, STATUSES, type Admin } from './data';
import AdminDetailPanel from './components/AdminDetailPanel';

const ROLE_BADGE_COLORS: Record<string, string> = {
  'Super Admin': 'bg-purple-100 text-purple-700',
  'Admin': 'bg-blue-100 text-blue-700',
  'Content Admin': 'bg-teal-100 text-teal-700',
  'Support Admin': 'bg-yellow-100 text-yellow-700',
  'Finance Admin': 'bg-green-100 text-green-700',
  'Community Admin': 'bg-orange-100 text-orange-700',
  'Tech Admin': 'bg-indigo-100 text-indigo-700',
  'Analytics Admin': 'bg-pink-100 text-pink-700',
};

const STAT_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'users': Users,
  'crown': Crown,
  'shield-check': ShieldCheck,
  'shield-off': ShieldOff,
  'mail': Mail,
};

const STAT_ICON_COLORS: Record<string, string> = {
  'users': 'bg-purple-100 text-purple-600',
  'crown': 'bg-yellow-100 text-yellow-600',
  'shield-check': 'bg-green-100 text-green-600',
  'shield-off': 'bg-orange-100 text-orange-600',
  'mail': 'bg-blue-100 text-blue-600',
};

export default function AdminManagementPage() {
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(MOCK_ADMINS[0]);
  const [activeTab, setActiveTab] = useState('All Admins');
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const filteredAdmins = MOCK_ADMINS.filter((admin) => {
    if (activeTab === 'Active' && admin.status !== 'Active') return false;
    if (activeTab === 'Inactive' && admin.status !== 'Inactive') return false;
    if (activeTab === 'Pending Invitations' && admin.status !== 'Pending') return false;
    if (roleFilter !== 'All Roles' && admin.role !== roleFilter) return false;
    if (statusFilter !== 'All Status' && admin.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return admin.name.toLowerCase().includes(q) || admin.email.toLowerCase().includes(q) || admin.adminId.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="flex h-full">
      <div className="flex-1 min-w-0 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] text-neutral-gray-medium mb-0.5">
              <span>Dashboard</span>
              <span>/</span>
              <span>User Management</span>
              <span>/</span>
              <span className="text-neutral-black font-medium">Admin Management</span>
            </div>
            <h1 className="text-xl font-bold text-neutral-black">Admin Management</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-neutral-gray-light rounded-lg text-xs font-medium text-neutral-gray-dark hover:bg-neutral-bg-light cursor-pointer">
              <Download className="h-3.5 w-3.5" />
              Export Admins
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#453DD8] text-white rounded-lg text-xs font-medium hover:bg-[#3a32b8] cursor-pointer">
              <Plus className="h-3.5 w-3.5" />
              Add New Admin
            </button>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-3">
          {STATS.map((stat) => {
            const IconComp = STAT_ICONS[stat.icon];
            return (
              <div key={stat.label} className="bg-white rounded-lg border border-neutral-gray-light p-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${STAT_ICON_COLORS[stat.icon]}`}>
                  {IconComp && <IconComp className="h-4 w-4" />}
                </div>
                <p className="text-lg font-bold text-neutral-black mt-1.5">{stat.value}</p>
                <p className="text-[10px] text-neutral-gray-medium mt-0.5">{stat.label}</p>
                <p className={`text-[10px] mt-0.5 ${stat.positive ? 'text-green-600' : 'text-red-500'}`}>{stat.change}</p>
              </div>
            );
          })}
        </div>

        <div>
          <div className="flex items-center gap-5 border-b border-neutral-gray-light">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2.5 text-xs font-medium cursor-pointer border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-[#453DD8] text-[#453DD8]'
                    : 'border-transparent text-neutral-gray-medium hover:text-neutral-black'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-gray-medium" />
            <input
              type="text"
              placeholder="Search admins by name, email, or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-neutral-gray-light focus:border-[#453DD8] focus:ring-1 focus:ring-[#453DD8] outline-none"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs rounded-lg border border-neutral-gray-light text-neutral-gray-dark bg-white cursor-pointer outline-none"
          >
            {ROLES.map((r) => <option key={r}>{r}</option>)}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs rounded-lg border border-neutral-gray-light text-neutral-gray-dark bg-white cursor-pointer outline-none"
          >
            {STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-neutral-gray-light rounded-lg text-xs font-medium text-neutral-gray-dark hover:bg-neutral-bg-light cursor-pointer">
            <span>&#x2715;</span> Filters
          </button>
          <div className="ml-auto flex items-center gap-1.5 text-[11px] text-neutral-gray-medium">
            <span>Sort by:</span>
            <select className="px-1.5 py-1 text-[11px] rounded-lg border border-neutral-gray-light text-neutral-black bg-white cursor-pointer outline-none font-medium">
              <option>Newest First</option>
              <option>Oldest First</option>
              <option>Name A-Z</option>
              <option>Name Z-A</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-neutral-gray-light overflow-hidden">
          <table className="w-full text-[11px]">
            <thead>
              <tr className="border-b border-neutral-gray-light bg-neutral-bg-light/50">
                <th className="text-left px-4 py-2 text-[10px] font-semibold text-neutral-gray-medium">Admin</th>
                <th className="text-left px-3 py-2 text-[10px] font-semibold text-neutral-gray-medium">Role</th>
                <th className="text-left px-3 py-2 text-[10px] font-semibold text-neutral-gray-medium">Status</th>
                <th className="text-left px-3 py-2 text-[10px] font-semibold text-neutral-gray-medium">Last Login</th>
                <th className="text-left px-3 py-2 text-[10px] font-semibold text-neutral-gray-medium">Joined</th>
                <th className="text-left px-3 py-2 text-[10px] font-semibold text-neutral-gray-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdmins.map((admin) => {
                const isActiveRow = selectedAdmin?.id === admin.id;

                return (
                  <tr
                    key={admin.id}
                    className={`border-b border-neutral-gray-light last:border-0 cursor-pointer transition-colors ${
                      isActiveRow ? 'bg-[#453DD8]/5' : 'hover:bg-neutral-bg-light/50'
                    }`}
                    onClick={() => setSelectedAdmin(admin)}
                  >
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <Image src={admin.avatar} alt={admin.name} width={28} height={28} className="rounded-full object-cover" />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="text-[11px] font-semibold text-neutral-black">{admin.name}</p>
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-semibold bg-blue-100 text-blue-700">
                              {admin.adminId}
                            </span>
                          </div>
                          <p className="text-[9px] text-neutral-gray-medium">{admin.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold ${ROLE_BADGE_COLORS[admin.role] || 'bg-gray-100 text-gray-700'}`}>
                        {admin.role}
                      </span>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-medium ${
                        admin.status === 'Active' ? 'text-green-600' : admin.status === 'Inactive' ? 'text-red-600' : 'text-yellow-600'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          admin.status === 'Active' ? 'bg-green-500' : admin.status === 'Inactive' ? 'bg-red-500' : 'bg-yellow-500'
                        }`}></span>
                        {admin.status}
                      </span>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className="text-[11px] text-neutral-black">{admin.lastLogin}</span>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className="text-[11px] text-neutral-black">{admin.joined}</span>
                    </td>
                    <td className="px-3 py-2.5" onClick={(e) => e.stopPropagation()}>
                      <button className="p-1 rounded hover:bg-neutral-bg-light cursor-pointer">
                        <MoreHorizontal className="h-3.5 w-3.5 text-black" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="flex items-center justify-between px-4 py-2 border-t border-neutral-gray-light">
            <p className="text-[11px] text-neutral-gray-medium">Showing 1 to {filteredAdmins.length} of {filteredAdmins.length} admins</p>
            <div className="flex items-center gap-1">
              <button className="p-1 rounded-lg border border-neutral-gray-light hover:bg-neutral-bg-light cursor-pointer">
                <ChevronLeft className="h-3.5 w-3.5 text-neutral-gray-medium" />
              </button>
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-6 h-6 rounded text-[11px] font-medium cursor-pointer ${
                    currentPage === page
                      ? 'bg-[#453DD8] text-white'
                      : 'border border-neutral-gray-light text-neutral-gray-dark hover:bg-neutral-bg-light'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="p-1 rounded-lg border border-neutral-gray-light hover:bg-neutral-bg-light cursor-pointer">
                <ChevronRight className="h-3.5 w-3.5 text-neutral-gray-medium" />
              </button>
              <select
                value={perPage}
                onChange={(e) => setPerPage(Number(e.target.value))}
                className="ml-1 px-1.5 py-1 text-[10px] rounded border border-neutral-gray-light text-neutral-gray-dark bg-white cursor-pointer outline-none"
              >
                <option value={10}>10 / page</option>
                <option value={20}>20 / page</option>
                <option value={50}>50 / page</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {selectedAdmin && (
        <AdminDetailPanel admin={selectedAdmin} onClose={() => setSelectedAdmin(null)} />
      )}
    </div>
  );
}
