'use client';

import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Institute {
  [key: string]: any;
}

export default function ReviewsTab({ institute }: { institute: Institute }) {
  return (
    <div className="space-y-8 animate-in fade-in duration-300" id="reviews">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light flex flex-col md:flex-row gap-8 items-center">
        <div className="text-center">
          <div className="text-5xl font-black text-neutral-black mb-1">{institute.rating}</div>
          <div className="flex gap-1 justify-center text-amber-500 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={cn("h-5 w-5 fill-current", i >= Math.floor(institute.rating) && "text-neutral-gray-light fill-none")} />
            ))}
          </div>
          <p className="text-sm text-neutral-gray-medium">{institute.reviews} Verified Reviews</p>
        </div>
        <div className="flex-1 w-full space-y-2">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center gap-3">
              <span className="text-xs font-bold text-neutral-gray-dark w-4">{star}</span>
              <div className="flex-1 h-2 bg-neutral-bg-light rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500"
                  style={{ width: `${star === 5 ? 75 : star === 4 ? 15 : 5}%` }}
                />
              </div>
              <span className="text-xs text-neutral-gray-medium w-8 text-right">{star === 5 ? '75%' : star === 4 ? '15%' : '5%'}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {(institute.testimonials || []).map((review: any, idx: number) => (
          <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-full overflow-hidden bg-brand-navy-100 flex-shrink-0">
                  <img
                    src={`https://images.unsplash.com/photo-${1500000000000 + idx * 37000000}?auto=format&fit=crop&q=80&w=100`}
                    alt={review.user}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = `<div class="h-full w-full flex items-center justify-center text-brand-navy-900 font-bold text-lg">${review.user.charAt(0)}</div>`;
                    }}
                  />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-black">{review.user}</h4>
                  <p className="text-xs text-neutral-gray-medium">{review.role} &bull; 2 months ago</p>
                </div>
              </div>
              <div className="flex gap-0.5 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={cn("h-3 w-3 fill-current", i >= review.rating && "text-neutral-gray-light fill-none")} />
                ))}
              </div>
            </div>
            <p className="text-neutral-gray-dark text-sm leading-relaxed italic">
              &ldquo;{review.content}&rdquo;
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
