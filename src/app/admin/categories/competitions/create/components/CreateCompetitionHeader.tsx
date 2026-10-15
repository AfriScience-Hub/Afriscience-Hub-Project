'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Trophy } from 'lucide-react';

/**
 * Header for the Create Competition page: breadcrumb, title and a
 * "Back to All Competitions" link. Publish actions live in the bottom
 * action bar of the form.
 */
export default function CreateCompetitionHeader() {
  return (
    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-neutral-gray-medium mb-1">
          <Link href="/admin/dashboard" className="hover:text-neutral-black">Dashboard</Link>
          <span>&rsaquo;</span>
          <Link href="/admin/categories/competitions" className="hover:text-neutral-black">Competitions</Link>
          <span>&rsaquo;</span>
          <span className="text-neutral-black font-medium">Create Competition</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#453DD8]/10 flex items-center justify-center flex-shrink-0">
            <Trophy className="h-5 w-5 text-[#453DD8]" />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-neutral-black leading-tight">Create Competition</h1>
            <p className="text-[11px] text-neutral-gray-dark mt-0.5">Set up a new science and technology competition. Fill in all relevant details to publish on the platform.</p>
          </div>
        </div>
      </div>
      <Link
        href="/admin/categories/competitions/all"
        className="flex items-center gap-1.5 px-3 py-1.5 border border-[#453DD8]/40 bg-white rounded-lg text-xs font-medium text-[#453DD8] hover:bg-[#453DD8]/5 cursor-pointer whitespace-nowrap flex-shrink-0"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to All Competitions
      </Link>
    </div>
  );
}
