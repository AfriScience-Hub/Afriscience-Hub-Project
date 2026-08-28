'use client';

import React from 'react';
import Image from 'next/image';
import { X, LayoutDashboard, Edit, MessageCircle, MoreHorizontal } from 'lucide-react';
import type { User } from '../data';

interface UserDetailPanelProps {
  user: User;
  onClose: () => void;
}

export default function UserDetailPanel({ user, onClose }: UserDetailPanelProps) {
  return (
    <div className="w-[280px] flex-shrink-0 border-l border-neutral-gray-light bg-white overflow-y-auto ml-4">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div />
          <button onClick={onClose} className="p-1 rounded hover:bg-neutral-bg-light cursor-pointer">
            <X className="h-4 w-4 text-neutral-gray-medium" />
          </button>
        </div>

        <div className="text-center mb-4">
          <Image src={user.avatar} alt={user.name} width={56} height={56} className="rounded-full object-cover mx-auto" />
          <h3 className="text-sm font-bold text-neutral-black mt-2">{user.name}</h3>
          <div className="flex items-center justify-center gap-1.5 mt-1">
            <span className="text-[9px] text-neutral-gray-medium">{user.userId}</span>
            <span className={`inline-flex items-center gap-0.5 text-[9px] font-medium ${
              user.verification === 'Verified' ? 'text-green-600' : 'text-orange-500'
            }`}>
              {user.verification === 'Verified' ? '✓ Verified' : '⊘ Unverified'}
            </span>
          </div>
          <p className="text-[10px] text-neutral-gray-dark mt-1">{user.email}</p>
          <p className="text-[10px] text-neutral-gray-dark">{user.phone}</p>
          <p className="text-[10px] text-neutral-gray-medium mt-1">📍 {user.country}</p>
          <p className="text-[10px] text-neutral-gray-medium">Joined {user.joined} · {user.lastActive}</p>
        </div>

        <div className="grid grid-cols-4 gap-1.5 mb-4">
          <button className="flex flex-col items-center gap-1 p-2 rounded-lg border border-neutral-gray-light hover:bg-neutral-bg-light cursor-pointer">
            <LayoutDashboard className="h-3 w-3 text-neutral-gray-dark" />
            <span className="text-[8px] font-medium text-neutral-gray-dark">View Dashboard</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2 rounded-lg border border-neutral-gray-light hover:bg-neutral-bg-light cursor-pointer">
            <Edit className="h-3 w-3 text-neutral-gray-dark" />
            <span className="text-[8px] font-medium text-neutral-gray-dark">Edit User</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2 rounded-lg border border-neutral-gray-light hover:bg-neutral-bg-light cursor-pointer">
            <MessageCircle className="h-3 w-3 text-neutral-gray-dark" />
            <span className="text-[8px] font-medium text-neutral-gray-dark">Message</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2 rounded-lg border border-neutral-gray-light hover:bg-neutral-bg-light cursor-pointer">
            <MoreHorizontal className="h-3 w-3 text-neutral-gray-dark" />
            <span className="text-[8px] font-medium text-neutral-gray-dark">More</span>
          </button>
        </div>

        <div className="space-y-2">
          {[
            { label: 'Role', value: user.role },
            { label: 'Status', value: user.status, color: user.status === 'Active' ? 'text-green-600' : user.status === 'Suspended' ? 'text-red-600' : 'text-yellow-600' },
            { label: 'Email Verified', value: user.emailVerified ? 'Verified' : 'Unverified', color: user.emailVerified ? 'text-green-600' : 'text-orange-500' },
            { label: 'Phone Verified', value: user.phoneVerified ? 'Verified' : 'Unverified', color: user.phoneVerified ? 'text-green-600' : 'text-orange-500' },
            { label: 'Verification Status', value: user.verification, color: user.verification === 'Verified' ? 'text-green-600' : 'text-orange-500' },
            { label: 'ID Type', value: user.idType },
            { label: 'ID Number', value: user.idNumber },
            { label: 'Country', value: user.country },
            { label: 'Total Listings', value: String(user.totalListings) },
            { label: 'Total Invoices', value: String(user.totalInvoices) },
            { label: 'Total Donations', value: user.totalDonations },
            { label: 'Last Login IP', value: user.lastLoginIp },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between py-1">
              <span className="text-[10px] text-neutral-gray-dark">{item.label}</span>
              <span className={`text-[10px] font-medium ${item.color || 'text-neutral-black'}`}>{item.value}</span>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 py-2 border border-red-300 text-red-600 rounded-lg text-[10px] font-medium hover:bg-red-50 cursor-pointer">
          Suspend User
        </button>
      </div>
    </div>
  );
}
