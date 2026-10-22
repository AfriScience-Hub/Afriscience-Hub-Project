'use client';

import { Star, MessageSquareQuote } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Institute {
  [key: string]: any;
}

export default function ReviewsTab({ institute }: { institute: Institute }) {
  const testimonials = institute.testimonials || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-300" id="reviews">
      <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-6 flex items-center gap-2">
          <Star className="h-5 w-5 text-amber-500" /> Star-rating Chart
        </h3>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="text-center">
            <div className="text-5xl font-bold text-neutral-black">{institute.rating}</div>
            <div className="flex gap-1 justify-center text-amber-500 my-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={cn("h-5 w-5 fill-current", i >= Math.round(institute.rating) && "text-neutral-gray-light fill-none")} />
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
      </section>

      <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-6 flex items-center gap-2">
          <MessageSquareQuote className="h-5 w-5 text-brand-red-600" /> Client Reviews & Testimonials
        </h3>

        {testimonials.length === 0 ? (
          <div className="text-center py-10 rounded-xl border border-dashed border-neutral-gray-light">
            <MessageSquareQuote className="h-10 w-10 text-neutral-gray-light mx-auto mb-3" />
            <p className="text-neutral-gray-medium">No reviews or testimonials yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {testimonials.map((review: any, idx: number) => (
              <div key={idx} className="rounded-xl p-5 bg-neutral-bg-light border border-neutral-gray-light">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-4">
                    <div className="h-12 w-12 rounded-full bg-brand-navy-900 text-white flex-shrink-0 flex items-center justify-center font-bold text-lg">
                      {review.user?.charAt(0) || '?'}
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-black">{review.user}</h4>
                      <p className="text-xs text-neutral-gray-medium">{review.role}</p>
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
        )}
      </section>
    </div>
  );
}
