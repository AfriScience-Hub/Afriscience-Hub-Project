'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Review } from '../../data';

interface ReviewListProps {
  reviews: Review[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <Star className="h-12 w-12 text-neutral-gray-light mx-auto mb-3" />
        <p className="font-bold text-neutral-black">No reviews yet</p>
        <p className="text-sm text-neutral-gray-medium mt-1">Reviews will appear here once received.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map(review => (
        <div key={review.id} className="p-4 rounded-lg border border-neutral-gray-light">
          <div className="flex items-center gap-3 mb-2">
            <Image src={review.avatar} alt={review.reviewer} width={36} height={36} className="rounded-full object-cover" />
            <div>
              <p className="text-sm font-bold text-neutral-black">{review.reviewer}</p>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(s => (
                  <Star key={s} className={cn("h-3 w-3", s <= review.rating ? "text-amber-500 fill-amber-500" : "text-neutral-gray-light")} />
                ))}
                <span className="text-xs text-neutral-gray-medium ml-1">{review.date}</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-neutral-gray-dark">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}
