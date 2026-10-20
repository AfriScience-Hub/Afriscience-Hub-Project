'use client';

import { useRouter } from 'next/navigation';
import { ClipboardList } from 'lucide-react';
import CategoryCardGrid from '../components/CategoryCardGrid';
import type { SubmissionCategoryId } from '../submissionCategories';

export default function DashboardSubmissions() {
  const router = useRouter();

  const handleSelect = (id: SubmissionCategoryId) => {
    router.push(`/dashboard/submissions/${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-neutral-gray-light bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <ClipboardList className="h-6 w-6 text-brand-red-600" />
          <div>
            <h1 className="text-2xl font-bold text-neutral-black">Submissions</h1>
            <p className="text-sm text-neutral-gray-medium">
              All submissions to AfriScience Hub.
            </p>
          </div>
        </div>

        <CategoryCardGrid
          onSelect={handleSelect}
          subtitle="Select a category to see the submissions you have made under it."
        />      </div>
    </div>
  );
}
