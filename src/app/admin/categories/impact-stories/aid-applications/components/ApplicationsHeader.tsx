'use client';

import React from 'react';
import Link from 'next/link';
import { ClipboardList, ArrowLeft } from 'lucide-react';
import { ADMIN_ROUTES } from '@/app/admin/data/routes';

export type ApplicationsTab = 'all' | 'rejected' | 'published';

interface ApplicationsHeaderProps {
  tab: ApplicationsTab;
}

const COPY: Record<ApplicationsTab, { title: string; subtitle: string; crumb: string }> = {
  all: { title: 'Impact Aid Applications', subtitle: 'Manage, review, and publish impact stories from support program beneficiaries.', crumb: 'Aid Applications' },
  published: { title: 'Published applications', subtitle: 'Applications that have been approved and published as impact stories.', crumb: 'Published Applications' },
  rejected: { title: 'Rejected applications', subtitle: 'Applications that were reviewed and rejected.', crumb: 'Rejected Applications' },
};

/**
 * Header for the Impact Aid Applications page: tab-aware title and
 * subtitle plus a back button to the Impact Dashboard.
 */
export default function ApplicationsHeader({ tab }: ApplicationsHeaderProps) {
  const copy = COPY[tab];

  return (
    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-neutral-gray-medium mb-1">
          <Link href="/admin/dashboard" className="hover:text-neutral-black">Dashboard</Link>
          <span>&rsaquo;</span>
          <Link href={ADMIN_ROUTES.impactStories} className="hover:text-neutral-black">Impact Stories</Link>
          <span>&rsaquo;</span>
          <span className="text-neutral-black font-medium">{copy.crumb}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#453DD8]/10 flex items-center justify-center flex-shrink-0">
            <ClipboardList className="h-6 w-6 text-[#453DD8]" />
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl font-bold text-neutral-black leading-tight">{copy.title}</h1>
            <p className="text-xs text-neutral-gray-dark mt-0.5">{copy.subtitle}</p>
          </div>
        </div>
      </div>
      <Link
        href={ADMIN_ROUTES.impactStories}
        className="flex items-center gap-1.5 px-4 py-2 border border-neutral-gray-light bg-white rounded-lg text-xs font-semibold text-neutral-gray-dark hover:bg-neutral-bg-light cursor-pointer whitespace-nowrap flex-shrink-0"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Impact Dashboard
      </Link>
    </div>
  );
}
