'use client';

import { Trophy, ShieldCheck } from 'lucide-react';

interface AchievementsTabProps {
  scientist: any;
}

export default function AchievementsTab({ scientist }: AchievementsTabProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Certifications & Degrees */}
      <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-6 flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-brand-navy-900" /> Certifications &amp; Degrees
        </h3>
        {scientist.certifications && scientist.certifications.length > 0 ? (
          <div className="grid gap-3">
            {scientist.certifications.map((cert: any, idx: number) => (
              <div key={idx} className="flex items-start gap-4 p-4 rounded-lg border border-neutral-gray-light bg-neutral-bg-light/30">
                <div className="h-10 w-10 rounded-full bg-brand-red-100 flex items-center justify-center text-brand-red-600 flex-shrink-0">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-black text-sm">{cert.name}</h4>
                  <p className="text-xs text-neutral-gray-medium">{cert.issuer} &bull; {cert.year}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-neutral-gray-medium italic">No certifications listed yet.</p>
        )}
      </section>

      {/* Major Achievements & Awards */}
      <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-6 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-amber-500" /> Major Achievements &amp; Awards
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
    </div>
  );
}
