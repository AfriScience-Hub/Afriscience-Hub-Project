'use client';

import React from 'react';
import Link from 'next/link';
import { Trophy } from 'lucide-react';
import { ADMIN_ROUTES } from '@/app/admin/data/routes';

/**
 * Header for the create/edit award form: breadcrumb, title and subtitle.
 */
export default function AwardFormHeader() {
  return (
    <div className="min-w-0">
      <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-neutral-gray-medium mb-1">
        <Link href="/admin/dashboard" className="hover:text-neutral-black">Dashboard</Link>
        <span>&rsaquo;</span>
        <Link href={ADMIN_ROUTES.awards} className="hover:text-neutral-black">Awards</Link>
        <span>&rsaquo;</span>
        <span className="text-neutral-black font-medium">Create Award</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
          <Trophy className="h-5 w-5 text-purple-600" />
        </div>
        <div className="min-w-0">
          <h1 className="text-xl font-bold text-neutral-black leading-tight">Create Award</h1>
          <p className="text-[11px] text-neutral-gray-dark mt-0.5">Add a new award, set the details, recipient, and rewards.</p>
        </div>
      </div>
    </div>
  );
}
