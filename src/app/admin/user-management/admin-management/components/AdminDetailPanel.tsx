'use client';

import React from 'react';
import Image from 'next/image';
import { X, Edit, KeyRound, Clock, MoreHorizontal } from 'lucide-react';
import type { Admin } from '../data';

interface AdminDetailPanelProps {
  admin: Admin;
  onClose: () => void;
}

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

export default function AdminDetailPanel({ admin, onClose }: AdminDetailPanelProps) {
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
          <Image src={admin.avatar} alt={admin.name} width={56} height={56} className="rounded-full object-cover mx-auto" />
          <h3 className="text-sm font-bold text-neutral-black mt-2">{admin.name}</h3>
          <div className="flex items-center justify-center gap-1.5 mt-1">
            <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-semibold ${ROLE_BADGE_COLORS[admin.role] || 'bg-gray-100 text-gray-700'}`}>
              {admin.role}
            </span>
            <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-semibold ${
              admin.status === 'Active' ? 'bg-green-100 text-green-700' : admin.status === 'Inactive' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
            }`}>
              <span className={`w-1 h-1 rounded-full ${
                admin.status === 'Active' ? 'bg-green-500' : admin.status === 'Inactive' ? 'bg-red-500' : 'bg-yellow-500'
              }`}></span>
              {admin.status}
            </span>
          </div>
          <p className="text-[9px] text-neutral-gray-medium mt-1">{admin.adminId}</p>
          <p className="text-[10px] text-neutral-gray-dark mt-1">{admin.email}</p>
          <p className="text-[10px] text-neutral-gray-dark">{admin.phone}</p>
          <p className="text-[10px] text-neutral-gray-medium mt-1">📍 {admin.location}</p>
          <p className="text-[9px] text-neutral-gray-medium mt-0.5">Joined {admin.joined} · Last login: {admin.lastLogin}</p>
        </div>

        <div className="grid grid-cols-4 gap-1.5 mb-4">
          <button className="flex flex-col items-center gap-1 p-2 rounded-lg border border-neutral-gray-light hover:bg-neutral-bg-light cursor-pointer">
            <Edit className="h-3 w-3 text-neutral-gray-dark" />
            <span className="text-[8px] font-medium text-neutral-gray-dark">Edit Admin</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2 rounded-lg border border-neutral-gray-light hover:bg-neutral-bg-light cursor-pointer">
            <KeyRound className="h-3 w-3 text-neutral-gray-dark" />
            <span className="text-[8px] font-medium text-neutral-gray-dark">Reset Password</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2 rounded-lg border border-neutral-gray-light hover:bg-neutral-bg-light cursor-pointer">
            <Clock className="h-3 w-3 text-neutral-gray-dark" />
            <span className="text-[8px] font-medium text-neutral-gray-dark">Activity Log</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2 rounded-lg border border-neutral-gray-light hover:bg-neutral-bg-light cursor-pointer">
            <MoreHorizontal className="h-3 w-3 text-neutral-gray-dark" />
            <span className="text-[8px] font-medium text-neutral-gray-dark">More</span>
          </button>
        </div>

        <div className="mb-4">
          <h4 className="text-[11px] font-bold text-neutral-black mb-2">Role & Permissions</h4>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-neutral-gray-dark">Role</span>
              <span className="text-[10px] font-medium text-neutral-black">{admin.role}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-neutral-gray-dark">Description</span>
              <span className="text-[10px] font-medium text-neutral-black text-right max-w-[150px]">{admin.description}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-neutral-gray-dark">Permissions</span>
              <span className="text-[10px] font-medium text-neutral-black">{admin.permissions} ({admin.permissionCount})</span>
            </div>
          </div>
          <button className="w-full mt-2 py-1.5 border border-[#453DD8] text-[#453DD8] rounded-lg text-[10px] font-medium hover:bg-[#453DD8]/5 cursor-pointer">
            Manage Permissions
          </button>
        </div>

        <div className="mb-4">
          <h4 className="text-[11px] font-bold text-neutral-black mb-2">Account Information</h4>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-neutral-gray-dark">Status</span>
              <span className={`text-[10px] font-medium ${admin.status === 'Active' ? 'text-green-600' : admin.status === 'Inactive' ? 'text-red-600' : 'text-yellow-600'}`}>
                {admin.status}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-neutral-gray-dark">Email Verified</span>
              <span className={`text-[10px] font-medium ${admin.emailVerified ? 'text-green-600' : 'text-orange-500'}`}>
                {admin.emailVerified ? 'Verified' : 'Unverified'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-neutral-gray-dark">Phone Verified</span>
              <span className={`text-[10px] font-medium ${admin.phoneVerified ? 'text-green-600' : 'text-orange-500'}`}>
                {admin.phoneVerified ? 'Verified' : 'Unverified'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-neutral-gray-dark">Two-Factor Auth</span>
              <span className={`text-[10px] font-medium ${admin.twoFactorAuth ? 'text-green-600' : 'text-orange-500'}`}>
                {admin.twoFactorAuth ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-neutral-gray-dark">Last Password Change</span>
              <span className="text-[10px] font-medium text-neutral-black">{admin.lastPasswordChange}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-neutral-gray-dark">Last Login IP</span>
              <span className="text-[10px] font-medium text-neutral-black">{admin.lastLoginIp}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-neutral-gray-dark">Login History</span>
              <button className="text-[10px] font-medium text-[#453DD8] hover:underline cursor-pointer">View History &rarr;</button>
            </div>
          </div>
        </div>

        <button className="w-full py-2 border border-red-300 text-red-600 rounded-lg text-[10px] font-medium hover:bg-red-50 cursor-pointer flex items-center justify-center gap-1.5">
          <span>&#x26A0;</span>
          Deactivate Admin
        </button>
      </div>
    </div>
  );
}
