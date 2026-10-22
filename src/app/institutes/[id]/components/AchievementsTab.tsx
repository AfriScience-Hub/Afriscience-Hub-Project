'use client';

import Image from 'next/image';
import { Award, Trophy, GraduationCap, ShieldCheck } from 'lucide-react';

interface Institute {
  [key: string]: any;
}

export default function AchievementsTab({ institute }: { institute: Institute }) {
  const isUniversity = institute.type === 'University';

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {!isUniversity && institute.certifications && institute.certifications.length > 0 && (
        <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
          <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-brand-navy-900" /> Licenses & Certifications
          </h3>
          <div className="grid gap-3">
            {institute.certifications.map((cert: any, idx: number) => (
              <div key={idx} className="flex flex-col p-4 rounded-xl border border-neutral-gray-light bg-neutral-bg-light/30">
                <div className="flex items-center gap-3 mb-2">
                  <ShieldCheck className="h-5 w-5 text-brand-navy-900 flex-shrink-0" />
                  <span className="text-sm font-bold text-neutral-black">{cert.name}</span>
                </div>
                <div className="pl-8 space-y-1">
                  <p className="text-xs text-neutral-gray-dark font-medium">{cert.issuer} &bull; {cert.year}</p>
                  {cert.description && (
                    <p className="text-xs text-neutral-gray-medium leading-relaxed">{cert.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {institute.awards && institute.awards.length > 0 ? (
        <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
          <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-500" /> Achievements & Honorary Awards
          </h3>
          <div className="space-y-4">
            {institute.awards.map((award: any, idx: number) => (
              <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-amber-50 to-transparent border border-amber-100">
                <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0 mt-1">
                  <Trophy className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-black">{award.title}</h4>
                  <p className="text-sm text-neutral-gray-medium">Awarded in {award.year}</p>
                  {award.description && (
                    <p className="text-xs text-neutral-gray-dark mt-1 leading-relaxed">{award.description}</p>
                  )}
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
            {institute.alumni.map((alum: any, idx: number) => {
              const bio = alum.achievements || alum.impact;
              return (
                <div key={idx} className="group relative flex flex-col items-center text-center p-4 rounded-xl bg-neutral-bg-light border border-neutral-gray-light hover:border-brand-red-100 hover:shadow-md transition-all">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden mb-3 border-2 border-white shadow-sm ring-2 ring-transparent group-hover:ring-brand-red-100 transition-all">
                    <Image src={alum.image} alt={alum.name} fill className="object-cover" sizes="64px" />
                  </div>
                  <h4 className="font-bold text-neutral-black text-sm leading-tight">{alum.name}</h4>
                  <p className="text-xs text-neutral-gray-medium mt-1">{alum.role}</p>
                  {alum.department && (
                    <p className="text-[10px] text-brand-navy-900 mt-0.5 font-medium">{alum.department}</p>
                  )}
                  {bio && (
                    <div className="absolute inset-0 bg-brand-navy-900/95 rounded-xl p-4 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white z-10">
                      <p className="text-xs font-bold uppercase tracking-wider text-brand-red-100 mb-1">Achievements</p>
                      <p className="text-xs leading-relaxed">{bio}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
