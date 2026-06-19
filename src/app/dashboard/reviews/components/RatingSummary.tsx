'use client';

import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const STAR_BREAKDOWN = [
  { stars: 5, count: 18, pct: 75 },
  { stars: 4, count: 4, pct: 17 },
  { stars: 3, count: 1, pct: 4 },
  { stars: 2, count: 1, pct: 4 },
  { stars: 1, count: 0, pct: 0 },
];

interface RatingSummaryProps {
  averageRating: number;
  totalReviews: number;
}

export default function RatingSummary({ averageRating, totalReviews }: RatingSummaryProps) {
  return (
    <div className="flex items-center gap-6 mb-6 p-4 bg-amber-50 rounded-lg border border-amber-100">
      <div className="text-center">
        <p className="text-3xl font-bold text-neutral-black">{averageRating.toFixed(1)}</p>
        <div className="flex items-center gap-0.5 mt-1">
          {[1, 2, 3, 4, 5].map(s => (
            <Star key={s} className={cn("h-4 w-4", s <= Math.round(averageRating) ? "text-amber-500 fill-amber-500" : "text-amber-300 fill-amber-300")} />
          ))}
        </div>
        <p className="text-xs text-neutral-gray-medium mt-1">{totalReviews} reviews</p>
      </div>
      <div className="flex-1 space-y-1.5">
        {STAR_BREAKDOWN.map(bar => (
          <div key={bar.stars} className="flex items-center gap-2">
            <span className="text-xs text-neutral-gray-medium w-3">{bar.stars}</span>
            <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
            <div className="flex-1 h-2 rounded-full bg-amber-100 overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: `${bar.pct}%` }} />
            </div>
            <span className="text-xs text-neutral-gray-medium w-6 text-right">{bar.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
