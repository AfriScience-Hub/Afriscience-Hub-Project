'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Search, ChevronDown, Download, Plus, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MOCK_USERS, STATS, TABS, ROLES, STATUSES, VERIFICATIONS, COUNTRIES, type User } from './data';
import UserDetailPanel from './components/UserDetailPanel';

export default function AllUsersPage() {
  const [activeTab, setActiveTab] = useState('All Users');
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [roleFilter, setRoleFilter] = useState(ROLES[0]);
  const [statusFilter, setStatusFilter] = useState(STATUSES[0]);
  const [verificationFilter, setVerificationFilter] = useState(VERIFICATIONS[0]);
  const [countryFilter, setCountryFilter] = useState(COUNTRIES[0]);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showVerificationDropdown, setShowVerificationDropdown] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const filteredUsers = MOCK_USERS.filter((user) => {
    const matchesSearch = search === '' ||
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.userId.toLowerCase().includes(search.toLowerCase());
    const matchesTab =
      activeTab === 'All Users' ||
      (activeTab === 'Verified' && user.verification === 'Verified') ||
      (activeTab === 'Unverified' && user.verification === 'Unverified') ||
      (activeTab === 'Active' && user.status === 'Active') ||
      (activeTab === 'Suspended' && user.status === 'Suspended') ||
      (activeTab === 'Pending Approval' && user.status === 'Pending') ||
      (activeTab === 'Deleted' && user.status === 'Deleted');
    const matchesRole = roleFilter === ROLES[0] || user.role === roleFilter;
    const matchesStatus = statusFilter === STATUSES[0] || user.status === statusFilter;
    const matchesVerification = verificationFilter === VERIFICATIONS[0] || user.verification === verificationFilter;
    const matchesCountry = countryFilter === COUNTRIES[0] || user.country === countryFilter;
    return matchesSearch && matchesTab && matchesRole && matchesStatus && matchesVerification && matchesCountry;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-gray-medium mb-0.5">
            <span>Dashboard</span><span>/</span><span>User Management</span><span>/</span>
            <span className="text-neutral-black font-medium">All Users</span>
          </div>
          <h1 className="text-xl font-bold text-neutral-black">User Management</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-neutral-gray-light rounded-lg text-xs font-medium text-neutral-gray-dark hover:bg-neutral-bg-light cursor-pointer">
            <Download className="h-3.5 w-3.5" /> Export Users
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#453DD8] text-white rounded-lg text-xs font-medium hover:bg-[#3a33c0] cursor-pointer">
            <Plus className="h-3.5 w-3.5" /> Add New User
          </button>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-3">
        {STATS.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-neutral-gray-light bg-white p-3 shadow-sm">
            <p className="text-[10px] text-neutral-gray-medium">{stat.label}</p>
            <p className="text-lg font-bold text-neutral-black mt-0.5">{stat.value}</p>
            <p className={cn("text-[10px] mt-0.5", stat.positive ? 'text-green-600' : 'text-red-500')}>{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="border-b border-neutral-gray-light">
        <div className="flex gap-0 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-3 py-2 text-xs font-medium whitespace-nowrap border-b-2 transition-colors cursor-pointer",
                activeTab === tab
                  ? "border-[#453DD8] text-[#453DD8]"
                  : "border-transparent text-neutral-gray-medium hover:text-neutral-black"
              )}
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
            placeholder="Search by name, email, phone or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-neutral-gray-light focus:border-[#453DD8] focus:ring-1 focus:ring-[#453DD8] outline-none"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => { setShowRoleDropdown(!showRoleDropdown); setShowStatusDropdown(false); setShowVerificationDropdown(false); setShowCountryDropdown(false); }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 border border-neutral-gray-light rounded-lg text-xs text-neutral-gray-dark hover:bg-neutral-bg-light cursor-pointer whitespace-nowrap"
          >
            {roleFilter} <ChevronDown className="h-3 w-3" />
          </button>
          {showRoleDropdown && (
            <div className="absolute z-50 top-full mt-1 left-0 w-48 bg-white border border-neutral-gray-light rounded-lg shadow-lg py-1">
              {ROLES.map((r) => (
                <button key={r} onClick={() => { setRoleFilter(r); setShowRoleDropdown(false); }}
                  className={cn("w-full text-left px-3 py-1.5 text-xs hover:bg-neutral-bg-light cursor-pointer", roleFilter === r && "bg-[#453DD8]/5 text-[#453DD8] font-medium")}>
                  {r}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => { setShowStatusDropdown(!showStatusDropdown); setShowRoleDropdown(false); setShowVerificationDropdown(false); setShowCountryDropdown(false); }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 border border-neutral-gray-light rounded-lg text-xs text-neutral-gray-dark hover:bg-neutral-bg-light cursor-pointer whitespace-nowrap"
          >
            {statusFilter} <ChevronDown className="h-3 w-3" />
          </button>
          {showStatusDropdown && (
            <div className="absolute z-50 top-full mt-1 left-0 w-48 bg-white border border-neutral-gray-light rounded-lg shadow-lg py-1">
              {STATUSES.map((s) => (
                <button key={s} onClick={() => { setStatusFilter(s); setShowStatusDropdown(false); }}
                  className={cn("w-full text-left px-3 py-1.5 text-xs hover:bg-neutral-bg-light cursor-pointer", statusFilter === s && "bg-[#453DD8]/5 text-[#453DD8] font-medium")}>
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => { setShowVerificationDropdown(!showVerificationDropdown); setShowRoleDropdown(false); setShowStatusDropdown(false); setShowCountryDropdown(false); }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 border border-neutral-gray-light rounded-lg text-xs text-neutral-gray-dark hover:bg-neutral-bg-light cursor-pointer whitespace-nowrap"
          >
            {verificationFilter} <ChevronDown className="h-3 w-3" />
          </button>
          {showVerificationDropdown && (
            <div className="absolute z-50 top-full mt-1 left-0 w-48 bg-white border border-neutral-gray-light rounded-lg shadow-lg py-1">
              {VERIFICATIONS.map((v) => (
                <button key={v} onClick={() => { setVerificationFilter(v); setShowVerificationDropdown(false); }}
                  className={cn("w-full text-left px-3 py-1.5 text-xs hover:bg-neutral-bg-light cursor-pointer", verificationFilter === v && "bg-[#453DD8]/5 text-[#453DD8] font-medium")}>
                  {v}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => { setShowCountryDropdown(!showCountryDropdown); setShowRoleDropdown(false); setShowStatusDropdown(false); setShowVerificationDropdown(false); }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 border border-neutral-gray-light rounded-lg text-xs text-neutral-gray-dark hover:bg-neutral-bg-light cursor-pointer whitespace-nowrap"
          >
            {countryFilter} <ChevronDown className="h-3 w-3" />
          </button>
          {showCountryDropdown && (
            <div className="absolute z-50 top-full mt-1 left-0 w-48 bg-white border border-neutral-gray-light rounded-lg shadow-lg py-1">
              {COUNTRIES.map((c) => (
                <button key={c} onClick={() => { setCountryFilter(c); setShowCountryDropdown(false); }}
                  className={cn("w-full text-left px-3 py-1.5 text-xs hover:bg-neutral-bg-light cursor-pointer", countryFilter === c && "bg-[#453DD8]/5 text-[#453DD8] font-medium")}>
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>

        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-neutral-gray-light rounded-lg text-xs font-medium text-neutral-gray-dark hover:bg-neutral-bg-light cursor-pointer">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
          Filters
        </button>
      </div>

      <p className="text-[11px] text-neutral-gray-dark">
        Showing 1 – {filteredUsers.length} of {filteredUsers.length} users
        <span className="ml-3">Sort by: <span className="font-medium text-neutral-black cursor-pointer">Newest First ▾</span></span>
      </p>

      <div className="flex gap-0">
        <div className={cn("flex-1 rounded-lg border border-neutral-gray-light bg-white shadow-sm overflow-hidden transition-all duration-300", selectedUser ? "mr-0" : "")}>
          <div className="overflow-x-auto">
            <table className="w-full text-[11px]">
              <thead>
                <tr className="border-b border-neutral-gray-light bg-neutral-bg-light">
                  <th className="w-8 px-3 py-2"><input type="checkbox" className="rounded border-neutral-gray-light w-3 h-3" /></th>
                  <th className="text-left px-3 py-2 font-medium text-neutral-gray-dark">User</th>
                  <th className="text-left px-3 py-2 font-medium text-neutral-gray-dark">Role</th>
                  <th className="text-left px-3 py-2 font-medium text-neutral-gray-dark">Status</th>
                  <th className="text-left px-3 py-2 font-medium text-neutral-gray-dark">Verification</th>
                  <th className="text-left px-3 py-2 font-medium text-neutral-gray-dark">Joined</th>
                  <th className="text-left px-3 py-2 font-medium text-neutral-gray-dark">Last Active</th>
                  <th className="text-right px-3 py-2 font-medium text-neutral-gray-dark">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    onClick={() => setSelectedUser(selectedUser?.id === user.id ? null : user)}
                    className={cn(
                      "border-b border-neutral-gray-light last:border-0 cursor-pointer transition-colors",
                      selectedUser?.id === user.id ? "bg-[#453DD8]/5" : "hover:bg-neutral-bg-light/50"
                    )}
                  >
                    <td className="w-8 px-3 py-2" onClick={(e) => e.stopPropagation()}>
                      <input type="checkbox" className="rounded border-neutral-gray-light w-3 h-3" />
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <Image src={user.avatar} alt={user.name} width={28} height={28} className="rounded-full object-cover flex-shrink-0" />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-medium text-neutral-black truncate">{user.name}</span>
                            <span className="text-[9px] text-neutral-gray-medium bg-gray-100 px-1 py-0.5 rounded">{user.userId}</span>
                          </div>
                          <p className="text-[10px] text-neutral-gray-dark truncate">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-blue-600">{user.role}</span>
                    </td>
                    <td className="px-3 py-2">
                      <span className={cn(
                        "inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium",
                        user.status === 'Active' ? 'bg-green-50 text-green-600' :
                        user.status === 'Pending' ? 'bg-yellow-50 text-yellow-600' :
                        user.status === 'Suspended' ? 'bg-red-50 text-red-600' :
                        'bg-gray-50 text-gray-600'
                      )}>
                        <span className={cn(
                          "h-1 w-1 rounded-full",
                          user.status === 'Active' ? 'bg-green-500' :
                          user.status === 'Pending' ? 'bg-yellow-500' :
                          user.status === 'Suspended' ? 'bg-red-500' :
                          'bg-gray-500'
                        )} />
                        {user.status}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <span className={cn(
                        "inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium",
                        user.verification === 'Verified' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-500'
                      )}>
                        {user.verification === 'Verified' ? '✓' : '⊘'} {user.verification}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-neutral-gray-dark whitespace-nowrap">{user.joined}</td>
                    <td className="px-3 py-2">
                      <span className="inline-flex items-center gap-1 text-[10px] text-neutral-gray-dark">
                        <span className="h-1 w-1 rounded-full bg-green-500" />
                        {user.lastActive}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-right" onClick={(e) => e.stopPropagation()}>
                      <button className="p-1 hover:bg-neutral-bg-light rounded cursor-pointer">
                        <MoreHorizontal className="h-3.5 w-3.5 text-black" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between px-3 py-2 border-t border-neutral-gray-light">
            <p className="text-[11px] text-neutral-gray-dark">Showing 1 – {filteredUsers.length} of {filteredUsers.length} users</p>
            <div className="flex items-center gap-1">
              <button className="p-1 rounded hover:bg-neutral-bg-light cursor-pointer"><ChevronLeft className="h-3.5 w-3.5 text-neutral-gray-medium" /></button>
              {[1, 2, 3, 4].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={cn(
                    "w-6 h-6 rounded text-[11px] font-medium cursor-pointer",
                    currentPage === page ? "bg-[#453DD8] text-white" : "hover:bg-neutral-bg-light text-neutral-gray-dark"
                  )}
                >
                  {page}
                </button>
              ))}
              <span className="text-neutral-gray-medium px-0.5">…</span>
              <button className="w-6 h-6 rounded text-[11px] font-medium hover:bg-neutral-bg-light text-neutral-gray-dark cursor-pointer">1855</button>
              <button className="p-1 rounded hover:bg-neutral-bg-light cursor-pointer"><ChevronRight className="h-3.5 w-3.5 text-neutral-gray-medium" /></button>
              <select className="ml-1 border border-neutral-gray-light rounded text-[10px] px-1.5 py-1 text-neutral-gray-dark outline-none cursor-pointer">
                <option>10 / page</option>
                <option>25 / page</option>
                <option>50 / page</option>
              </select>
            </div>
          </div>
        </div>

        {selectedUser && (
          <UserDetailPanel user={selectedUser} onClose={() => setSelectedUser(null)} />
        )}
      </div>
    </div>
  );
}
