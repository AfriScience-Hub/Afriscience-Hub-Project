'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Search, ChevronDown, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

const MOCK_SUSPENDED_USERS = [
  { id: 1, name: 'Tunde Bakare', email: 'tunde.bakare@email.com', userId: 'USR-2024-0089', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200', country: 'Nigeria', suspendedDate: 'May 20, 2025', reason: 'Policy violation' },
  { id: 2, name: 'Fatima Al-Hassan', email: 'fatima.h@email.com', userId: 'USR-2024-0102', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200', country: 'Egypt', suspendedDate: 'May 18, 2025', reason: 'Spam activity' },
  { id: 3, name: 'Kwame Mensah', email: 'kwame.m@email.com', userId: 'USR-2024-0076', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200', country: 'Ghana', suspendedDate: 'May 15, 2025', reason: 'Fake profile' },
  { id: 4, name: 'Aisha Okonkwo', email: 'aisha.o@email.com', userId: 'USR-2024-0115', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200', country: 'Nigeria', suspendedDate: 'May 12, 2025', reason: 'Inappropriate content' },
  { id: 5, name: 'Jean-Pierre Mulumba', email: 'jp.mulumba@email.com', userId: 'USR-2024-0093', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200', country: 'DR Congo', suspendedDate: 'May 10, 2025', reason: 'Policy violation' },
  { id: 6, name: 'Naledi Dlamini', email: 'naledi.d@email.com', userId: 'USR-2024-0067', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200', country: 'South Africa', suspendedDate: 'May 8, 2025', reason: 'Spam activity' },
];

const COUNTRIES = ['All Countries', 'Nigeria', 'Ghana', 'Egypt', 'South Africa', 'DR Congo', 'Kenya', 'Tanzania'];

export default function SuspendedUsersPage() {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [countryFilter, setCountryFilter] = useState(COUNTRIES[0]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const filteredUsers = MOCK_SUSPENDED_USERS.filter((user) => {
    const matchesSearch = search === '' ||
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.userId.toLowerCase().includes(search.toLowerCase());
    const matchesCountry = countryFilter === COUNTRIES[0] || user.country === countryFilter;
    return matchesSearch && matchesCountry;
  });

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-1.5 text-[11px] text-neutral-gray-medium mb-0.5">
          <span>Dashboard</span><span>/</span><span>User Management</span><span>/</span>
          <span className="text-neutral-black font-medium">Suspended Users</span>
        </div>
        <h1 className="text-xl font-bold text-neutral-black">Suspended Users</h1>
        <p className="text-xs text-neutral-gray-dark mt-0.5">Manage users who have been suspended from the platform.</p>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-gray-medium" />
          <input
            type="text"
            placeholder="Search by name, email or ID..."
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

      <div className="rounded-lg border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[11px]">
            <thead>
              <tr className="border-b border-neutral-gray-light bg-neutral-bg-light">
                <th className="text-left px-3 py-2 font-medium text-neutral-gray-dark">User</th>
                <th className="text-left px-3 py-2 font-medium text-neutral-gray-dark">Email</th>
                <th className="text-right px-3 py-2 font-medium text-neutral-gray-dark">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center">
                    <p className="text-sm font-medium text-neutral-black">No suspended users found</p>
                    <p className="text-xs text-neutral-gray-medium mt-1">No users match your search or filter criteria.</p>
                  </td>
                </tr>
              ) : filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-neutral-gray-light last:border-0 hover:bg-neutral-bg-light/50"
                >
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <Image src={user.avatar} alt={user.name} width={28} height={28} className="rounded-full object-cover w-7 h-7 flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-medium text-neutral-black truncate">{user.name}</span>
                          <span className="text-[9px] text-neutral-gray-medium bg-gray-100 px-1 py-0.5 rounded">{user.userId}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-[10px] text-neutral-gray-dark">{user.email}</td>
                  <td className="px-3 py-2.5 text-right">
                    <button
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[10px] font-medium text-green-700 bg-green-50 hover:bg-green-100 rounded-lg cursor-pointer transition-colors"
                    >
                      <RotateCcw className="h-3 w-3" />
                      Reinstate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-3 py-2 border-t border-neutral-gray-light">
          <p className="text-[11px] text-neutral-gray-dark">Showing 1 – {filteredUsers.length} of {filteredUsers.length} suspended users</p>
          <div className="flex items-center gap-1">
            <button className="p-1 rounded hover:bg-neutral-bg-light cursor-pointer"><ChevronLeft className="h-3.5 w-3.5 text-neutral-gray-medium" /></button>
            {[1, 2].map((page) => (
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
            <button className="p-1 rounded hover:bg-neutral-bg-light cursor-pointer"><ChevronRight className="h-3.5 w-3.5 text-neutral-gray-medium" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
