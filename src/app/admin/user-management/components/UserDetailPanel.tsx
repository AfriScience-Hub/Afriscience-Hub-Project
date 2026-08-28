'use client';

import React from 'react';
import Image from 'next/image';
import { X, LayoutDashboard, Edit, MessageCircle, MoreHorizontal, MapPin, Calendar, ShieldCheck, ShieldOff } from 'lucide-react';
import type { User } from '../data';

interface UserDetailPanelProps {
  user: User;
  onClose: () => void;
}

export default function UserDetailPanel({ user, onClose }: UserDetailPanelProps) {
  return (
    <div className="w-[380px] flex-shrink-0 border-l border-neutral-gray-light bg-white overflow-y-auto">
      <div className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div />
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-neutral-bg-light cursor-pointer">
            <X className="h-5 w-5 text-neutral-gray-medium" />
          </button>
        </div>

        <div className="text-center mb-6">
          <Image src={user.avatar} alt={user.name} width={80} height={80} className="rounded-full object-cover mx-auto" />
          <h3 className="text-lg font-bold text-neutral-black mt-3">{user.name}</h3>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="text-xs text-neutral-gray-medium">{user.userId}</span>
            {user.verification === 'Verified' ? (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600">
                <ShieldCheck className="h-3.5 w-3.5" /> Verified
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-orange-500">
                <ShieldOff className="h-3.5 w-3.5" /> Unverified
              </span>
            )}
          </div>
          <p className="text-sm text-neutral-gray-dark mt-2">{user.email}</p>
          <p className="text-sm text-neutral-gray-dark">{user.phone}</p>
          <div className="flex items-center justify-center gap-1 mt-2 text-xs text-neutral-gray-medium">
            <MapPin className="h-3.5 w-3.5" />
            <span>{user.country}</span>
          </div>
          <div className="flex items-center justify-center gap-1 mt-1 text-xs text-neutral-gray-medium">
            <Calendar className="h-3.5 w-3.5" />
            <span>Joined {user.joined} · {user.lastActive}</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-6">
          <button className="flex flex-col items-center gap-1.5 p-3 rounded-lg border border-neutral-gray-light hover:bg-neutral-bg-light cursor-pointer">
            <LayoutDashboard className="h-4 w-4 text-neutral-gray-dark" />
            <span className="text-[10px] font-medium text-neutral-gray-dark">View Dashboard</span>
          </button>
          <button className="flex flex-col items-center gap-1.5 p-3 rounded-lg border border-neutral-gray-light hover:bg-neutral-bg-light cursor-pointer">
            <Edit className="h-4 w-4 text-neutral-gray-dark" />
            <span className="text-[10px] font-medium text-neutral-gray-dark">Edit User</span>
          </button>
          <button className="flex flex-col items-center gap-1.5 p-3 rounded-lg border border-neutral-gray-light hover:bg-neutral-bg-light cursor-pointer">
            <MessageCircle className="h-4 w-4 text-neutral-gray-dark" />
            <span className="text-[10px] font-medium text-neutral-gray-dark">Message</span>
          </button>
          <button className="flex flex-col items-center gap-1.5 p-3 rounded-lg border border-neutral-gray-light hover:bg-neutral-bg-light cursor-pointer">
            <MoreHorizontal className="h-4 w-4 text-neutral-gray-dark" />
            <span className="text-[10px] font-medium text-neutral-gray-dark">More</span>
          </button>
        </div>

        <div className="space-y-3">
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
            <div key={item.label} className="flex items-center justify-between py-1.5">
              <span className="text-sm text-neutral-gray-dark">{item.label}</span>
              <span className={`text-sm font-medium ${item.color || 'text-neutral-black'}`}>{item.value}</span>
            </div>
          ))}
        </div>

        <button className="w-full mt-6 py-2.5 border border-red-300 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 cursor-pointer">
          Suspend User
        </button>
      </div>
    </div>
  );
}
