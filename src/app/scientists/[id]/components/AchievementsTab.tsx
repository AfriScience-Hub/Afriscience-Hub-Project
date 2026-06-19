'use client';

import { Trophy, MessageCircle, Star } from 'lucide-react';

interface AchievementsTabProps {
  scientist: any;
}

export default function AchievementsTab({ scientist }: AchievementsTabProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Major Achievements */}
      <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-6 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-amber-500" /> Major Achievements
        </h3>
        {scientist.achievements && scientist.achievements.length > 0 ? (
          <div className="relative border-l-2 border-brand-navy-100 ml-3 space-y-8 pl-8 py-2">
            {scientist.achievements.map((achieve: any, idx: number) => (
              <div key={idx} className="relative">
                <div className="absolute -left-[41px] h-6 w-6 rounded-full border-4 border-white bg-brand-red-600 shadow-sm" />
                <h4 className="text-lg font-bold text-brand-navy-900">{achieve.title}</h4>
                <p className="text-neutral-gray-dark mt-1 text-sm">{achieve.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-neutral-gray-medium italic">No achievements listed yet.</p>
        )}
      </section>

      {/* Testimonials */}
      <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-6 flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-brand-red-600" /> Testimonials
        </h3>
        {scientist.testimonials && scientist.testimonials.length > 0 ? (
          <div className="space-y-6">
            {scientist.testimonials.map((review: any, idx: number) => (
              <div key={idx} className="border-b border-neutral-gray-light last:border-0 pb-6 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 font-bold">
                      {review.user.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-black text-sm">{review.user}</h4>
                      <p className="text-xs text-neutral-gray-medium">{review.role}</p>
                    </div>
                  </div>
                  <div className="flex text-amber-500">
                    {[...Array(review.rating)].map((_, i: number) => <Star key={i} className="h-3 w-3 fill-current" />)}
                  </div>
                </div>
                <p className="text-sm text-neutral-gray-dark italic">"{review.content}"</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-neutral-gray-medium italic">No testimonials yet.</p>
        )}
      </section>
    </div>
  );
}
