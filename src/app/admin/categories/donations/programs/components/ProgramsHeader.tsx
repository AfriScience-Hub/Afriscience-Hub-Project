'use client';

import React from 'react';
import Link from 'next/link';
import { Gift, Plus, ArrowLeft } from 'lucide-react';
import { ADMIN_ROUTES } from '@/app/admin/data/routes';

/**
 * Header for the Support Programs list: breadcrumb, title, subtitle and
 * the Create Program button.
 */
export default function ProgramsHeader() {
  return (
    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-neutral-gray-medium mb-1">
          <Link href="/admin/dashboard" className="hover:text-neutral-black">Dashboard</Link>
          <span>&rsaquo;</span>
          <Link href={ADMIN_ROUTES.donations} className="hover:text-neutral-black">Donations</Link>
          <span>&rsaquo;</span>
          <span className="text-neutral-black font-medium">Support Programs</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
            <Gift className="h-5 w-5 text-purple-600" />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-neutral-black leading-tight">Support Programs</h1>
            <p className="text-[11px] text-neutral-gray-dark mt-0.5">Create and manage programs that receive donations.</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <Link
          href={ADMIN_ROUTES.donations}
          className="flex items-center gap-1.5 px-3 py-2 border border-neutral-gray-light bg-white rounded-lg text-xs font-medium text-neutral-gray-dark hover:bg-neutral-bg-light cursor-pointer whitespace-nowrap"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Donations
        </Link>
        <Link
          href={ADMIN_ROUTES.donationsProgramsCreate}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#453DD8] text-white rounded-lg text-xs font-semibold hover:bg-[#3a33c0] cursor-pointer whitespace-nowrap"
        >
          <Plus className="h-4 w-4" /> Create Program
        </Link>
      </div>
    </div>
  );
}
