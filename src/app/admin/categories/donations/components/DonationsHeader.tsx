'use client';

import React from 'react';
import Link from 'next/link';
import { Gift } from 'lucide-react';
import { ADMIN_ROUTES } from '@/app/admin/data/routes';

/**
 * Header for the main Donations page: breadcrumb, title and the
 * "Support Programs" button that opens the support programs list.
 */
export default function DonationsHeader() {
  return (
    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-neutral-gray-medium mb-1">
          <Link href="/admin/dashboard" className="hover:text-neutral-black">Dashboard</Link>
          <span>&rsaquo;</span>
          <span className="text-neutral-black font-medium">Donations</span>
          <span>&rsaquo;</span>
          <span className="text-neutral-black font-medium">All Donations</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
            <Gift className="h-5 w-5 text-purple-600" />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-neutral-black leading-tight">Donations</h1>
            <p className="text-[11px] text-neutral-gray-dark mt-0.5">View all donations made to support Afri-Science Hub programs.</p>
          </div>
        </div>
      </div>
      <Link
        href={ADMIN_ROUTES.donationsPrograms}
        className="flex items-center gap-1.5 px-4 py-2 bg-[#453DD8] text-white rounded-lg text-xs font-semibold hover:bg-[#3a33c0] cursor-pointer whitespace-nowrap flex-shrink-0"
      >
        <Gift className="h-4 w-4" /> Support Programs
      </Link>
    </div>
  );
}
