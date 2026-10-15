'use client';

import React from 'react';
import Link from 'next/link';
import { Gift, ArrowLeft } from 'lucide-react';
import { ADMIN_ROUTES } from '@/app/admin/data/routes';

/**
 * Header for the create/edit program form: breadcrumb, title, subtitle
 * and the "Back to Support Programs" button.
 */
export default function ProgramFormHeader() {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-neutral-gray-medium mb-1">
        <Link href="/admin/dashboard" className="hover:text-neutral-black">Dashboard</Link>
        <span>&rsaquo;</span>
        <Link href={ADMIN_ROUTES.donations} className="hover:text-neutral-black">Donations</Link>
        <span>&rsaquo;</span>
        <Link href={ADMIN_ROUTES.donationsPrograms} className="hover:text-neutral-black">Support Programs</Link>
        <span>&rsaquo;</span>
        <span className="text-neutral-black font-medium">Create Program</span>
      </div>
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
            <Gift className="h-5 w-5 text-purple-600" />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-neutral-black leading-tight">Create Support Program</h1>
            <p className="text-[11px] text-neutral-gray-dark mt-0.5">Add a new program to receive donations.</p>
          </div>
        </div>
        <Link
          href={ADMIN_ROUTES.donationsPrograms}
          className="flex items-center gap-1.5 px-3 py-2 border border-[#453DD8]/40 bg-white rounded-lg text-xs font-medium text-[#453DD8] hover:bg-[#453DD8]/5 cursor-pointer whitespace-nowrap flex-shrink-0"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Support Programs
        </Link>
      </div>
    </div>
  );
}
