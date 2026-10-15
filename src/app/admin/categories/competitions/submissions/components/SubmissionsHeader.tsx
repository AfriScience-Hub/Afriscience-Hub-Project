'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Trophy } from 'lucide-react';

interface SubmissionsHeaderProps {
  /** Release the competition shortlist (top 30) for voting */
  onReleaseTop30: () => void;
}

/**
 * Header for the View Submissions page.
 * Actions: a return button back to the main competitions page and the
 * "Release Top 30" shortlist action.
 */
export default function SubmissionsHeader({ onReleaseTop30 }: SubmissionsHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-neutral-gray-medium mb-1">
          <Link href="/admin/dashboard" className="hover:text-neutral-black">Dashboard</Link>
          <span>&rsaquo;</span>
          <Link href="/admin/categories/competitions" className="hover:text-neutral-black">Competitions</Link>
          <span>&rsaquo;</span>
          <span className="text-neutral-black font-medium">Submissions</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
            <CheckCircle className="h-5 w-5 text-purple-600" />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-neutral-black leading-tight">View Submissions</h1>
            <p className="text-[11px] text-neutral-gray-dark mt-0.5">View submissions, track scoring progress, and manage the competition shortlist.</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <Link
          href="/admin/categories/competitions"
          className="flex items-center gap-1.5 px-3 py-1.5 border border-neutral-gray-light bg-white rounded-lg text-xs font-medium text-neutral-gray-dark hover:bg-neutral-bg-light cursor-pointer whitespace-nowrap"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Competitions
        </Link>
        <button
          onClick={onReleaseTop30}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-brand-red-600 text-white rounded-lg text-xs font-semibold hover:bg-brand-red-700 cursor-pointer whitespace-nowrap"
        >
          <Trophy className="h-3.5 w-3.5" /> Release Top 30
        </button>
      </div>
    </div>
  );
}
