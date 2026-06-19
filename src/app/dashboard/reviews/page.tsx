'use client';

import { useMemo } from 'react';
import { MOCK_REVIEWS } from '../data';
import RatingSummary from './components/RatingSummary';
import ReviewList from './components/ReviewList';

export default function ReviewsPage() {
  const averageRating = useMemo(() => {
    if (MOCK_REVIEWS.length === 0) return 0;
    return MOCK_REVIEWS.reduce((sum, r) => sum + r.rating, 0) / MOCK_REVIEWS.length;
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-neutral-gray-light bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-neutral-black mb-6">Reviews</h2>
        <RatingSummary averageRating={averageRating} totalReviews={MOCK_REVIEWS.length} />
        <ReviewList reviews={MOCK_REVIEWS} />
      </div>
    </div>
  );
}
