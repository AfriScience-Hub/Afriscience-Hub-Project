'use client';

import { ShieldCheck, Award, Trophy } from 'lucide-react';

interface Certification {
  name: string;
  issuer: string;
  year: string;
  description?: string;
}

interface Award {
  title: string;
  year: string;
}

interface LicensesTabProps {
  center: {
    certifications?: Certification[];
    awards?: Award[];
  };
}

export default function LicensesTab({ center }: LicensesTabProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-brand-navy-900" /> Licenses & Certifications
        </h3>
        {center.certifications && center.certifications.length > 0 ? (
          <div className="grid gap-3">
            {center.certifications.map((cert, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 rounded-lg border border-neutral-gray-light bg-neutral-bg-light/30">
                <div className="h-10 w-10 rounded-full bg-brand-red-100 flex items-center justify-center text-brand-red-600 flex-shrink-0">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-black text-sm">{cert.name}</h4>
                  <p className="text-xs text-neutral-gray-medium">{cert.issuer} &bull; {cert.year}</p>
                  {cert.description && <p className="text-xs text-neutral-gray-dark mt-1">{cert.description}</p>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-neutral-gray-medium italic">No certifications listed.</p>
        )}
      </section>

      <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-amber-500" /> Achievements & Honorary Awards
        </h3>
        {center.awards && center.awards.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {center.awards.map((award, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 rounded-lg bg-amber-50 border border-amber-200">
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0">
                  <Trophy className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-black text-sm">{award.title}</h4>
                  <p className="text-xs text-neutral-gray-medium">{award.year}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-neutral-gray-medium italic">No achievements listed.</p>
        )}
      </section>
    </div>
  );
}
