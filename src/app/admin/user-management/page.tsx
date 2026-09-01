'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Search, ChevronDown, Plus, MoreHorizontal, ChevronLeft, ChevronRight, LayoutDashboard, Ban } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MOCK_USERS, STATS, COUNTRIES, type User } from './data';

export default function AllUsersPage() {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [countryFilter, setCountryFilter] = useState(COUNTRIES[0]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [openActionsId, setOpenActionsId] = useState<number | null>(null);

  const filteredUsers = MOCK_USERS.filter((user) => {
    const matchesSearch = search === '' ||
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.userId.toLowerCase().includes(search.toLowerCase());
    const matchesCountry = countryFilter === COUNTRIES[0] || user.country === countryFilter;
    return matchesSearch && matchesCountry;
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
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#453DD8] text-white rounded-lg text-xs font-medium hover:bg-[#3a33c0] cursor-pointer">
          <Plus className="h-3.5 w-3.5" /> Add New User
        </button>
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
            onClick={() => setShowCountryDropdown(!showCountryDropdown)}
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
      </div>

      <p className="text-[11px] text-neutral-gray-dark">
        Showing 1 – {filteredUsers.length} of {filteredUsers.length} users
        <span className="ml-3">Sort by: <span className="font-medium text-neutral-black cursor-pointer">Newest First ▾</span></span>
      </p>

      <div className="rounded-lg border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[11px]">
            <thead>
              <tr className="border-b border-neutral-gray-light bg-neutral-bg-light">
                <th className="w-8 px-3 py-2"><input type="checkbox" className="rounded border-neutral-gray-light w-3 h-3" /></th>
                <th className="text-left px-3 py-2 font-medium text-neutral-gray-dark">User</th>
                <th className="text-left px-3 py-2 font-medium text-neutral-gray-dark">Email</th>
                <th className="text-left px-3 py-2 font-medium text-neutral-gray-dark">Joined</th>
                <th className="text-left px-3 py-2 font-medium text-neutral-gray-dark">Last Active</th>
                <th className="text-right px-3 py-2 font-medium text-neutral-gray-dark">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-neutral-gray-light last:border-0 hover:bg-neutral-bg-light/50"
                >
                  <td className="w-8 px-3 py-2" onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" className="rounded border-neutral-gray-light w-3 h-3" />
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <Image src={user.avatar} alt={user.name} width={28} height={28} className="rounded-full object-cover flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-medium text-neutral-black truncate">{user.name}</span>
                          <span className="text-[9px] text-neutral-gray-medium bg-gray-100 px-1 py-0.5 rounded">{user.userId}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-[10px] text-neutral-gray-dark">{user.email}</td>
                  <td className="px-3 py-2.5 text-[10px] text-neutral-gray-dark whitespace-nowrap">{user.joined}</td>
                  <td className="px-3 py-2.5">
                    <span className="inline-flex items-center gap-1 text-[10px] text-neutral-gray-dark">
                      <span className="h-1 w-1 rounded-full bg-green-500" />
                      {user.lastActive}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-right relative" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setOpenActionsId(openActionsId === user.id ? null : user.id)}
                      className="p-1 hover:bg-neutral-bg-light rounded cursor-pointer"
                    >
                      <MoreHorizontal className="h-3.5 w-3.5 text-black" />
                    </button>
                    {openActionsId === user.id && (
                      <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-neutral-gray-light rounded-lg shadow-lg py-1 z-50">
                        <button
                          onClick={() => setOpenActionsId(null)}
                          className="w-full flex items-center gap-2 px-3 py-2 hover:bg-neutral-bg-light cursor-pointer text-left"
                        >
                          <LayoutDashboard className="h-3.5 w-3.5 text-neutral-gray-dark" />
                          <span className="text-[11px] text-neutral-black">View Dashboard</span>
                        </button>
                        <button
                          onClick={() => setOpenActionsId(null)}
                          className="w-full flex items-center gap-2 px-3 py-2 hover:bg-red-50 cursor-pointer text-left"
                        >
                          <Ban className="h-3.5 w-3.5 text-red-500" />
                          <span className="text-[11px] text-red-600">Suspend User</span>
                        </button>
                      </div>
                    )}
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
    </div>
  );
}
