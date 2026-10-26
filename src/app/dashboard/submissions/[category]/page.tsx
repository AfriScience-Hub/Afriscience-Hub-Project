'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

/**
 * The submissions page now shows every category in one table, so old
 * per-category links redirect to the matching tab.
 */
export default function SubmissionCategoryRedirect() {
  const router = useRouter();
  const { category } = useParams<{ category: string }>();

  useEffect(() => {
    const params = new URLSearchParams({ tab: category || 'all' });
    const type = new URLSearchParams(window.location.search).get('type');
    if (category === 'institute' && type) params.set('type', type);
    router.replace(`/dashboard/submissions?${params.toString()}`);
  }, [category, router]);

  return (
    <div className="rounded-xl border border-neutral-gray-light bg-white p-10 text-center text-sm text-neutral-gray-medium shadow-sm">
      Loading submissions...
    </div>
  );
}
