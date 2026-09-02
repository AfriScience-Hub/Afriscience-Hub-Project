'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, FileText, MapPin, Eye, Heart, Calendar } from 'lucide-react';

const MOCK_USER = {
  name: 'Emeka Nwachukwu',
  email: 'emeka.nwachi@email.com',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
  userId: 'USR-2024-0015B',
  role: 'Innovator',
  memberSince: 'Feb 12, 2024',
  lastActive: '2 hours ago',
  status: 'Active',
  verified: true,
  location: 'Lagos, Nigeria',
};

const STATS = [
  { label: 'Total Listings', value: '12', icon: FileText, iconBg: 'bg-purple-100 text-purple-600' },
  { label: 'Donations', value: '47', icon: Heart, iconBg: 'bg-green-100 text-green-600' },
  { label: 'Invoices Requested', value: '6', icon: FileText, iconBg: 'bg-orange-100 text-orange-600' },
  { label: 'Submissions', value: '23', icon: Eye, iconBg: 'bg-blue-100 text-blue-600' },
  { label: 'Impact Stories', value: '3', icon: Heart, iconBg: 'bg-pink-100 text-pink-600' },
  { label: 'Events Joined', value: '5', icon: Calendar, iconBg: 'bg-indigo-100 text-indigo-600' },
];

const LISTINGS_SUMMARY = [
  { label: 'Total Listings', value: 12 },
  { label: 'Published', value: 9, color: 'text-green-600' },
  { label: 'Pending Review', value: 2, color: 'text-orange-600' },
  { label: 'Rejected', value: 1, color: 'text-red-600' },
  { label: 'Archived', value: 0, color: 'text-neutral-gray-medium' },
];

const LISTINGS_PIE = [
  { label: 'Published', percent: 75, color: '#453DD8' },
  { label: 'Pending', percent: 16.7, color: '#F97316' },
  { label: 'Rejected', percent: 8.3, color: '#EF4444' },
  { label: 'Archived', percent: 0, color: '#D1D5DB' },
];

const INVOICE_SUMMARY = [
  { label: 'Total Invoices Requested', value: 6 },
  { label: 'Paid', value: 3, color: 'text-green-600' },
  { label: 'Pending', value: 2, color: 'text-orange-600' },
  { label: 'Overdue', value: 1, color: 'text-red-600' },
];

const ENGAGEMENT = [
  { label: 'Profile Completeness', value: '85%', color: 'bg-[#453DD8]' },
  { label: 'Rating', value: '4.6/5', icon: '⭐' },
  { label: 'Trust Score', value: 'High', badge: 'bg-green-100 text-green-700' },
];

export default function UserDashboardPage() {
  const circumference = 2 * Math.PI * 40;
  const publishedOffset = (LISTINGS_PIE[0].percent / 100) * circumference;
  const pendingOffset = (LISTINGS_PIE[1].percent / 100) * circumference;
  const rejectedOffset = (LISTINGS_PIE[2].percent / 100) * circumference;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-gray-medium mb-0.5">
            <Link href="/admin/user-management" className="hover:text-neutral-black">All Users</Link>
            <span>/</span>
            <span className="text-neutral-black font-medium">User Details</span>
          </div>
          <h1 className="text-xl font-bold text-neutral-black">User Dashboard</h1>
          <p className="text-xs text-neutral-gray-dark mt-0.5">Overview of user activities and engagement on the platform.</p>
        </div>
        <Link
          href="/admin/user-management"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-neutral-gray-light rounded-lg text-xs font-medium text-neutral-gray-dark hover:bg-neutral-bg-light self-start"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Users
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-neutral-gray-light p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Image
            src={MOCK_USER.avatar}
            alt={MOCK_USER.name}
            width={72}
            height={72}
            className="rounded-full object-cover w-18 h-18 flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <h2 className="text-lg font-bold text-neutral-black">{MOCK_USER.name}</h2>
              {MOCK_USER.verified && (
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-green-100 text-green-700">
                  Verified ✓
                </span>
              )}
            </div>
            <p className="text-xs text-neutral-gray-medium">{MOCK_USER.email}</p>
            <p className="text-xs text-neutral-gray-medium flex items-center gap-1 mt-0.5">
              <MapPin className="h-3 w-3" /> {MOCK_USER.location}
            </p>
          </div>
          <div className="flex flex-wrap gap-4 sm:gap-6 text-xs">
            <div>
              <p className="text-neutral-gray-medium mb-0.5">User ID</p>
              <p className="font-semibold text-neutral-black">{MOCK_USER.userId}</p>
            </div>
            <div>
              <p className="text-neutral-gray-medium mb-0.5">Role</p>
              <p className="font-semibold text-neutral-black">{MOCK_USER.role}</p>
            </div>
            <div>
              <p className="text-neutral-gray-medium mb-0.5">Member Since</p>
              <p className="font-semibold text-neutral-black">{MOCK_USER.memberSince}</p>
            </div>
            <div>
              <p className="text-neutral-gray-medium mb-0.5">Last Active</p>
              <p className="font-semibold text-neutral-black flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                {MOCK_USER.lastActive}
              </p>
            </div>
            <div>
              <p className="text-neutral-gray-medium mb-0.5">Status</p>
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-green-100 text-green-700">
                {MOCK_USER.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-neutral-gray-light p-3 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.iconBg}`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </div>
            <p className="text-xl font-bold text-neutral-black">{stat.value}</p>
            <p className="text-[10px] text-neutral-gray-medium mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-neutral-gray-light p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-neutral-black">Listings Summary</h3>
            <button className="text-xs text-[#453DD8] font-medium hover:underline cursor-pointer">View All</button>
          </div>
          <div className="flex items-center gap-6">
            <div className="space-y-2 text-xs">
              {LISTINGS_SUMMARY.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-6">
                  <span className="text-neutral-gray-dark">{item.label}</span>
                  <span className={`font-semibold ${item.color || 'text-neutral-black'}`}>{item.value}</span>
                </div>
              ))}
            </div>
            <div className="relative flex-shrink-0">
              <svg viewBox="0 0 100 100" className="w-28 h-28">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#453DD8" strokeWidth="12"
                  strokeDasharray={`${publishedOffset} ${circumference - publishedOffset}`}
                  strokeDashoffset={0} transform="rotate(-90 50 50)" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#F97316" strokeWidth="12"
                  strokeDasharray={`${pendingOffset} ${circumference - pendingOffset}`}
                  strokeDashoffset={-publishedOffset} transform="rotate(-90 50 50)" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#EF4444" strokeWidth="12"
                  strokeDasharray={`${rejectedOffset} ${circumference - rejectedOffset}`}
                  strokeDashoffset={-(publishedOffset + pendingOffset)} transform="rotate(-90 50 50)" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-lg font-bold text-neutral-black">12</p>
                <p className="text-[9px] text-neutral-gray-medium">Total</p>
              </div>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[10px]">
            {LISTINGS_PIE.filter(p => p.percent > 0).map((p) => (
              <div key={p.label} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: p.color }} />
                <span className="text-neutral-gray-dark">{p.label} ({p.percent}%)</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-neutral-gray-light p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-neutral-black">Invoice & Payment Summary</h3>
            <button className="text-xs text-[#453DD8] font-medium hover:underline cursor-pointer">View All</button>
          </div>
          <div className="space-y-3 text-xs">
            {INVOICE_SUMMARY.map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-neutral-gray-dark">{item.label}</span>
                <span className={`font-semibold ${item.color || 'text-neutral-black'}`}>{item.value}</span>
              </div>
            ))}
            <div className="pt-2 border-t border-neutral-gray-light flex items-center justify-between">
              <span className="text-neutral-gray-dark">Total Amount</span>
              <span className="font-bold text-neutral-black">₦320,000</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-neutral-gray-light p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-neutral-black mb-4">Engagement Insights</h3>
          <div className="space-y-4">
            {ENGAGEMENT.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-neutral-gray-dark">{item.label}</span>
                  {item.badge ? (
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${item.badge}`}>{item.value}</span>
                  ) : item.icon ? (
                    <span className="text-xs font-semibold text-neutral-black">{item.value} {item.icon}</span>
                  ) : (
                    <span className="text-xs font-semibold text-neutral-black">{item.value}</span>
                  )}
                </div>
                {item.color && (
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: item.value }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
