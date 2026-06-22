'use client';

import Image from 'next/image';
import {
  Award, Trophy, GraduationCap, MessageCircle, Star
} from 'lucide-react';

interface Institute {
  [key: string]: any;
}

export default function AchievementsTab({ institute }: { institute: Institute }) {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {institute.awards && institute.awards.length > 0 ? (
        <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
          <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-500" /> Honorary Awards
          </h3>
          <div className="space-y-4">
            {institute.awards.map((award: any, idx: number) => (
              <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-amber-50 to-transparent border border-amber-100">
                <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0">
                  <Trophy className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-black">{award.title}</h4>
                  <p className="text-sm text-neutral-gray-medium">Awarded in {award.year}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light text-center">
          <Award className="h-12 w-12 text-neutral-gray-light mx-auto mb-3" />
          <p className="text-neutral-gray-medium">No awards recorded yet.</p>
        </section>
      )}

      {institute.alumni && institute.alumni.length > 0 && (
        <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
          <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-neutral-gray-dark" /> Notable Alumni
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {institute.alumni.map((alum: any, idx: number) => (
              <div key={idx} className="group relative flex flex-col items-center text-center p-4 rounded-xl bg-neutral-bg-light border border-neutral-gray-light hover:border-brand-red-100 hover:shadow-md transition-all">
                <div className="h-16 w-16 rounded-full overflow-hidden mb-3 border-2 border-white shadow-sm ring-2 ring-transparent group-hover:ring-brand-red-100 transition-all">
                  <Image src={alum.image} alt={alum.name} fill className="object-cover" sizes="100vw" />
                </div>
                <h4 className="font-bold text-neutral-black text-sm leading-tight">{alum.name}</h4>
                <p className="text-xs text-neutral-gray-medium mt-1">{alum.role}</p>
                {alum.impact && (
                  <div className="absolute inset-0 bg-brand-navy-900/95 rounded-xl p-4 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white z-10">
                    <p className="text-xs font-bold uppercase tracking-wider text-brand-red-100 mb-1">Societal Impact</p>
                    <p className="text-xs leading-relaxed">{alum.impact}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {institute.testimonials && institute.testimonials.length > 0 && (
        <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
          <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-brand-red-600" /> Testimonials
          </h3>
          <div className="grid gap-4">
            {institute.testimonials.map((testi: any, idx: number) => (
              <div key={idx} className="p-4 rounded-xl bg-neutral-bg-light border border-neutral-gray-light">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-neutral-black">{testi.user}</span>
                  <div className="flex gap-0.5 text-amber-500">
                    {[...Array(testi.rating)].map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}
                  </div>
                </div>
                <p className="text-sm text-neutral-gray-dark italic mb-2">&ldquo;{testi.content}&rdquo;</p>
                <span className="text-xs font-medium text-brand-navy-900 bg-brand-navy-100 px-2 py-0.5 rounded-full">
                  {testi.role}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
