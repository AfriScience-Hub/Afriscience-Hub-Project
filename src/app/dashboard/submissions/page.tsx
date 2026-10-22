'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ClipboardList } from 'lucide-react';
import CategoryCardGrid from '../components/CategoryCardGrid';
import InstituteTypeSelectorModal, { type InstituteSubType } from '../components/InstituteTypeSelectorModal';
import type { SubmissionCategoryId } from '../submissionCategories';

export default function DashboardSubmissions() {
  const router = useRouter();
  const [showInstituteModal, setShowInstituteModal] = useState(false);

  const handleSelect = (id: SubmissionCategoryId) => {
    // Institute asks which kind of institute first, then carries the choice to
    // the category page so it can show the matching information.
    if (id === 'institute') {
      setShowInstituteModal(true);
      return;
    }
    router.push(`/dashboard/submissions/${id}`);
  };

  const handleInstituteTypeSelect = (type: InstituteSubType) => {
    router.push(`/dashboard/submissions/institute?type=${type}`);
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
        />
      </div>

      <InstituteTypeSelectorModal
        isOpen={showInstituteModal}
        onClose={() => setShowInstituteModal(false)}
        onSelectInstituteType={handleInstituteTypeSelect}
      />
    </div>
  );
}
