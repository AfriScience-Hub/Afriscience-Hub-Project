'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, FileText, Eye, Heart, Calendar, Loader2 } from 'lucide-react';
import { fetchAdminUser, userDisplayName, formatISODate, displayUserId, type AdminUser } from '../userApi';

interface HeaderData {
  name: string;
  email: string;
  userId: string;
  memberSince: string;
  status: string;
  verified: boolean;
}

const FALLBACK_HEADER: HeaderData = {
  name: 'Unknown User',
  email: '\u2014',
  userId: '\u2014',
  memberSince: '\u2014',
  status: 'Unknown',
  verified: false,
};

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join('') || '?';
}

const STATS = [
  { label: 'Total Listings', value: '0', icon: FileText, iconBg: 'bg-purple-100 text-purple-600' },
  { label: 'Donations', value: '0', icon: Heart, iconBg: 'bg-green-100 text-green-600' },
  { label: 'Invoices Requested', value: '0', icon: FileText, iconBg: 'bg-orange-100 text-orange-600' },
  { label: 'Submissions', value: '0', icon: Eye, iconBg: 'bg-blue-100 text-blue-600' },
  { label: 'Impact Stories', value: '0', icon: Heart, iconBg: 'bg-pink-100 text-pink-600' },
  { label: 'Events Joined', value: '0', icon: Calendar, iconBg: 'bg-indigo-100 text-indigo-600' },
];

const LISTINGS_SUMMARY = [
  { label: 'Total Listings', value: 0 },
  { label: 'Published', value: 0, color: 'text-green-600' },
  { label: 'Pending Review', value: 0, color: 'text-orange-600' },
  { label: 'Rejected', value: 0, color: 'text-red-600' },
  { label: 'Archived', value: 0, color: 'text-neutral-gray-medium' },
];

const LISTINGS_PIE = [
  { label: 'Published', percent: 0, color: '#453DD8' },
  { label: 'Pending', percent: 0, color: '#F97316' },
  { label: 'Rejected', percent: 0, color: '#EF4444' },
  { label: 'Archived', percent: 0, color: '#D1D5DB' },
];

const INVOICE_SUMMARY = [
  { label: 'Total Invoices Requested', value: 0 },
  { label: 'Paid', value: 0, color: 'text-green-600' },
  { label: 'Pending', value: 0, color: 'text-orange-600' },
  { label: 'Overdue', value: 0, color: 'text-red-600' },
];

const ENGAGEMENT = [
  { label: 'Profile Completeness', value: '0%', color: 'bg-[#453DD8]' },
  { label: 'Rating', value: '0/5', icon: '⭐' },
  { label: 'Trust Score', value: '\u2014', badge: 'bg-neutral-gray-light text-neutral-gray-dark' },
];

const PIE_TRACK_COLOR = '#E5E7EB';

function UserDashboardContent() {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId') || '';
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState<boolean>(!!userId);

  useEffect(() => {
    if (!userId) { setLoading(false); return; }
    let active = true;
    setLoading(true);
    fetchAdminUser(userId)
      .then((u) => { if (active) setUser(u); })
      .catch(() => { if (active) setUser(null); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [userId]);

  const header: HeaderData = user
    ? {
        name: userDisplayName(user),
        email: user.email,
        userId: displayUserId(user),
        memberSince: formatISODate(user.createdAt),
        status: user.deletedAt ? 'Suspended' : 'Active',
        verified: user.isVerified,
      }
    : FALLBACK_HEADER;

  const circumference = 2 * Math.PI * 40;
  const publishedOffset = (LISTINGS_PIE[0].percent / 100) * circumference;
  const pendingOffset = (LISTINGS_PIE[1].percent / 100) * circumference;
  const rejectedOffset = (LISTINGS_PIE[2].percent / 100) * circumference;
  const hasPieData = LISTINGS_PIE.some((p) => p.percent > 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-[#453DD8]" />
      </div>
    );
  }

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
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
          <span className="flex h-16 w-16 lg:h-[72px] lg:w-[72px] flex-shrink-0 items-center justify-center rounded-full bg-[#453DD8]/10 text-lg font-bold text-[#453DD8]">
            {initials(header.name)}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <h2 className="text-lg font-bold text-neutral-black">{header.name}</h2>
              {header.verified && (
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-green-100 text-green-700">
                  Verified ✓
                </span>
              )}
            </div>
            <p className="text-xs text-neutral-gray-medium">{header.email}</p>
          </div>
          <div className="flex flex-wrap gap-4 lg:gap-6 text-xs">
            <div>
              <p className="text-neutral-gray-medium mb-0.5">User ID</p>
              <p className="font-semibold text-neutral-black">{header.userId}</p>
            </div>
            <div>
              <p className="text-neutral-gray-medium mb-0.5">Member Since</p>
              <p className="font-semibold text-neutral-black">{header.memberSince}</p>
            </div>
            <div>
              <p className="text-neutral-gray-medium mb-0.5">Status</p>
              <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                header.status === 'Active' ? 'bg-green-100 text-green-700' : header.status === 'Suspended' ? 'bg-red-100 text-red-700' : 'bg-neutral-gray-light text-neutral-gray-dark'
              }`}>
                {header.status}
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
                <circle cx="50" cy="50" r="40" fill="none" stroke={PIE_TRACK_COLOR} strokeWidth="12"
                  transform="rotate(-90 50 50)" />
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
                <p className="text-lg font-bold text-neutral-black">{LISTINGS_SUMMARY[0].value}</p>
                <p className="text-[9px] text-neutral-gray-medium">Total</p>
              </div>
            </div>
          </div>
          {hasPieData ? (
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[10px]">
              {LISTINGS_PIE.filter(p => p.percent > 0).map((p) => (
                <div key={p.label} className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: p.color }} />
                  <span className="text-neutral-gray-dark">{p.label} ({p.percent}%)</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-[10px] text-neutral-gray-medium">No listing data yet.</p>
          )}
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
              <span className="font-bold text-neutral-black">₦0</span>
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

export default function UserDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-24">
          <Loader2 className="h-6 w-6 animate-spin text-[#453DD8]" />
        </div>
      }
    >
      <UserDashboardContent />
    </Suspense>
  );
}