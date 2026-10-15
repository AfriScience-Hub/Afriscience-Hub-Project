'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Trophy } from 'lucide-react';

/**
 * Header for the All Competitions page:
 * breadcrumb, back link to the main competitions page and a plain
 * (non-dropdown) Create Competition button.
 */
export default function AllCompetitionsHeader() {
  return (
    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-neutral-gray-medium mb-1">
          <Link href="/admin/dashboard" className="hover:text-neutral-black">Dashboard</Link>
          <span>&rsaquo;</span>
          <Link href="/admin/categories/competitions" className="hover:text-neutral-black">Competitions</Link>
          <span>&rsaquo;</span>
          <span className="text-neutral-black font-medium">All Competitions</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
            <Trophy className="h-5 w-5 text-purple-600" />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-neutral-black leading-tight">All Competitions</h1>
            <p className="text-[11px] text-neutral-gray-dark mt-0.5">Browse, search and manage every competition on the platform.</p>
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
        <Link
          href="/admin/categories/competitions/create"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#453DD8] text-white rounded-lg text-xs font-medium hover:bg-[#3a33c0] cursor-pointer whitespace-nowrap"
        >
          <Plus className="h-3.5 w-3.5" /> Create Competition
        </Link>
      </div>
    </div>
  );
}
