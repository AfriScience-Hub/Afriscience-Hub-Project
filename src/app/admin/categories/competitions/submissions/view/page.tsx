'use client';

import React, { Suspense, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import ViewSubmissionHeader from './components/ViewSubmissionHeader';
import SubmissionDetails from './components/SubmissionDetails';
import { SUBMISSIONS } from '../data';
import { ADMIN_ROUTES } from '@/app/admin/data/routes';

/**
 * View Submission: a standalone page (replaces the old detail modal)
 * showing the full submission. The submission comes from `?id=`.
 */
function ViewSubmissionContent() {
  const searchParams = useSearchParams();
  const submissionId = searchParams.get('id');
  const submission = useMemo(
    () => SUBMISSIONS.find((s) => s.id === submissionId) ?? null,
    [submissionId]
  );

  if (!submission) {
    return (
      <div className="space-y-4">
        <ViewSubmissionHeader />
        <div className="rounded-xl border border-neutral-gray-light bg-white shadow-sm flex flex-col items-center justify-center py-14 text-center px-4">
          <p className="text-sm font-medium text-neutral-black">Submission not found</p>
          <p className="text-xs text-neutral-gray-medium mt-0.5 mb-4">It may have been removed or the link is incorrect.</p>
          <Link
            href={ADMIN_ROUTES.competitionsSubmissions}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-neutral-gray-light bg-white rounded-lg text-xs font-medium text-neutral-gray-dark hover:bg-neutral-bg-light cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to View Submissions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ViewSubmissionHeader />
      <div className="rounded-xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
        <SubmissionDetails submission={submission} />
      </div>
    </div>
  );
}

export default function ViewSubmissionPage() {
  return (
    <Suspense fallback={<div className="min-h-[40vh]" />}>
      <ViewSubmissionContent />
    </Suspense>
  );
}
