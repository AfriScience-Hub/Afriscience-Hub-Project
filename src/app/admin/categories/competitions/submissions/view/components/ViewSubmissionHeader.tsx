'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, FileSearch } from 'lucide-react';
import { ADMIN_ROUTES } from '@/app/admin/data/routes';

/**
 * Header for the View Submission page: breadcrumb, title and the
 * back link to the View Submissions list.
 */
export default function ViewSubmissionHeader() {
  return (
    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-neutral-gray-medium mb-1">
          <Link href="/admin/dashboard" className="hover:text-neutral-black">Dashboard</Link>
          <span>&rsaquo;</span>
          <Link href={ADMIN_ROUTES.competitions} className="hover:text-neutral-black">Competitions</Link>
          <span>&rsaquo;</span>
          <Link href={ADMIN_ROUTES.competitionsSubmissions} className="hover:text-neutral-black">Submissions</Link>
          <span>&rsaquo;</span>
          <span className="text-neutral-black font-medium">Submission Details</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
            <FileSearch className="h-5 w-5 text-purple-600" />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-neutral-black leading-tight">Submission Details</h1>
            <p className="text-[11px] text-neutral-gray-dark mt-0.5">Full details of this competition submission.</p>
          </div>
        </div>
      </div>
      <Link
        href={ADMIN_ROUTES.competitionsSubmissions}
        className="flex items-center gap-1.5 px-3 py-1.5 border border-neutral-gray-light bg-white rounded-lg text-xs font-medium text-neutral-gray-dark hover:bg-neutral-bg-light cursor-pointer whitespace-nowrap flex-shrink-0"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to View Submissions
      </Link>
    </div>
  );
}
