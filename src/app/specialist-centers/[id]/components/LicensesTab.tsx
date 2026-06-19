'use client';

import { ShieldCheck, Award, Trophy, MessageCircle, Star } from 'lucide-react';

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

interface Testimonial {
  user: string;
  role: string;
  rating: number;
  content: string;
}

interface LicensesTabProps {
  center: {
    certifications?: Certification[];
    awards?: Award[];
    testimonials?: Testimonial[];
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

      {center.awards && center.awards.length > 0 && (
        <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
          <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" /> Honorary Awards
          </h3>
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
        </section>
      )}

      <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-brand-red-600" /> Testimonials
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
            <p className="text-sm text-neutral-gray-medium italic">No testimonials yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
