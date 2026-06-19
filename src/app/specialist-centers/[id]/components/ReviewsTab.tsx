'use client';

import { Star, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Testimonial {
  user: string;
  role: string;
  rating: number;
  content: string;
}

interface ReviewsTabProps {
  center: {
    rating: number;
    reviews: number;
    testimonials?: Testimonial[];
  };
}

export default function ReviewsTab({ center }: ReviewsTabProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-300" id="reviews">
      <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <div className="flex flex-col sm:flex-row gap-8 items-center">
          <div className="text-center">
            <div className="text-5xl font-bold text-neutral-black">{center.rating}</div>
            <div className="flex items-center justify-center gap-1 mt-2 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={cn("h-4 w-4", i < Math.round(center.rating) ? "fill-current" : "text-neutral-gray-light")} />
              ))}
            </div>
            <p className="text-sm text-neutral-gray-medium mt-1">{center.reviews} reviews</p>
          </div>
          <div className="flex-1 w-full space-y-2">
            {[5, 4, 3, 2, 1].map(star => {
              const count = center.testimonials?.filter(t => t.rating === star).length || 0;
              const total = center.testimonials?.length || 1;
              const pct = Math.round((count / total) * 100);
              return (
                <div key={star} className="flex items-center gap-3">
                  <span className="text-xs text-neutral-gray-dark w-4">{star}</span>
                  <Star className="h-3 w-3 text-amber-500 fill-current" />
                  <div className="flex-1 h-2 rounded-full bg-neutral-bg-light overflow-hidden">
                    <div className="h-full rounded-full bg-amber-500 transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-xs text-neutral-gray-medium w-8">{pct}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-6 flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-brand-red-600" /> Reviews & Testimonials
        </h3>
        <div className="space-y-6">
          {center.testimonials && center.testimonials.length > 0 ? center.testimonials.map((review, idx) => (
            <div key={idx} className="border-b border-neutral-gray-light last:border-0 pb-6 last:pb-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-brand-navy-100 flex items-center justify-center text-brand-navy-900 font-bold">
                    {review.user.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-black text-sm">{review.user}</h4>
                    <p className="text-xs text-neutral-gray-medium">{review.role}</p>
                  </div>
                </div>
                <div className="flex text-amber-500">
                  {[...Array(review.rating)].map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}
                </div>
              </div>
              <p className="text-sm text-neutral-gray-dark italic">&ldquo;{review.content}&rdquo;</p>
            </div>
          )) : (
            <p className="text-sm text-neutral-gray-medium italic">No reviews yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
