'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Users, BookOpen, Award, Clock, Star, Building2, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { cn } from '@/lib/utils';
import { INSTITUTES } from '@/app/data/mockData';

interface Institute {
  [key: string]: any;
}

/** One label/value row inside the highlights card. */
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm text-neutral-black flex-shrink-0">{label}</span>
      <span className="text-sm text-neutral-gray-dark font-medium text-right">{children}</span>
    </div>
  );
}

export default function Sidebar({ institute, onRegister }: { institute: Institute; onRegister: () => void }) {
  const isUniversity = institute.type === 'University';
  const yearsOfExistence = institute.yearEstablished ? `${new Date().getFullYear() - institute.yearEstablished} yrs` : null;
  const awardsCount = institute.awards?.length || 0;
  const facultiesCount = institute.faculties?.length || 0;
  const alumniCount = institute.alumni?.length || 0;

  // Similarity: class weighs most, then ownership, gender and program, then
  // shared services and finally the same country.
  const similar = INSTITUTES
    .filter((i: any) => i.id !== institute.id && (i.type === 'University') === isUniversity)
    .map((i: any) => ({
      inst: i,
      score:
        (i.class && i.class === institute.class ? 3 : 0) +
        (i.ownership && i.ownership === institute.ownership ? 2 : 0) +
        (i.gender && i.gender === institute.gender ? 2 : 0) +
        (i.program && i.program === institute.program ? 2 : 0) +
        (i.country && i.country === institute.country ? 1 : 0) +
        (i.services || []).filter((s: string) => (institute.services || []).includes(s)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, isUniversity ? 3 : 5)
    .map(s => s.inst);

  return (
    <div className="lg:col-span-1 space-y-8">
      {isUniversity ? (
        <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
          <h3 className="text-lg font-bold text-neutral-black mb-6 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-brand-red-600" /> Institute Highlights
          </h3>
          <div className="space-y-6">
            {yearsOfExistence && (
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 flex-shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xl font-black text-neutral-black">{yearsOfExistence}</p>
                  <p className="text-xs text-neutral-gray-medium font-bold uppercase tracking-wider">Years of Existence</p>
                </div>
              </div>
            )}
            {facultiesCount > 0 && (
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xl font-black text-neutral-black">{facultiesCount}+</p>
                  <p className="text-xs text-neutral-gray-medium font-bold uppercase tracking-wider">Faculties</p>
                </div>
              </div>
            )}
            {awardsCount > 0 && (
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 flex-shrink-0">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xl font-black text-neutral-black">{awardsCount}</p>
                  <p className="text-xs text-neutral-gray-medium font-bold uppercase tracking-wider">Awards & Honours</p>
                </div>
              </div>
            )}
            {alumniCount > 0 && (
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600 flex-shrink-0">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xl font-black text-neutral-black">{alumniCount}</p>
                  <p className="text-xs text-neutral-gray-medium font-bold uppercase tracking-wider">Notable Alumni</p>
                </div>
              </div>
            )}
          </div>
        </section>
      ) : (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
          <h3 className="text-sm font-bold text-neutral-gray-dark uppercase tracking-wider mb-4">School Highlights</h3>
          <div className="space-y-4">
            <Row label="Status">
              <span className={cn(
                "px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide border inline-block",
                institute.status === 'Online'
                  ? "bg-green-100 text-green-700 border-green-200"
                  : "bg-neutral-bg-light text-neutral-gray-dark border-neutral-gray-light"
              )}>
                {institute.status}
              </span>
            </Row>
            <Row label="Class">{institute.class || '—'}</Row>
            <Row label="Program">{institute.program || '—'}</Row>
            <Row label="Ownership">{institute.ownership || '—'}</Row>
            <Row label="Gender">{institute.gender || '—'}</Row>
            <Row label="Work Days">{institute.workDays || '—'}</Row>
            <Row label="Work Hours">{institute.workHours || '—'}</Row>
            <Row label="Active Students">{institute.activeStudents ? institute.activeStudents.toLocaleString() : '—'}</Row>
            <Row label="Joined">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-neutral-gray-medium" />
                {institute.joined || '—'}
              </span>
            </Row>
            <Row label="Rating">
              <span className="inline-flex items-center gap-1">
                <Star className="h-3 w-3 text-amber-500 fill-current" />
                {institute.rating}
              </span>
            </Row>

            <div className="pt-4 border-t border-neutral-gray-light">
              <Button className="w-full mb-3 bg-brand-red-600 hover:bg-brand-red-700" onClick={onRegister}>
                Register Now
              </Button>
              <p className="text-xs text-neutral-gray-medium text-center">
                Secure registration &amp; verified schools
              </p>
            </div>
          </div>
        </div>
      )}

      <section>
        <h3 className="text-sm font-bold text-neutral-gray-medium uppercase tracking-wider mb-4 px-2">
          {isUniversity ? 'Similar Institutes' : 'Similar Schools'}
        </h3>
        <div className="space-y-4">
          {similar.map((sim: any) => (
            <Link key={sim.id} href={`/institutes/${sim.id}`} className="flex gap-4 p-3 bg-white rounded-xl border border-neutral-gray-light hover:border-brand-red-600 hover:shadow-md transition-all group">
              <div className="relative h-16 w-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image src={sim.image} alt={sim.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="64px" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-neutral-black truncate group-hover:text-brand-red-600 transition-colors">{sim.name}</h4>
                <div className="flex items-center gap-1.5 text-xs text-neutral-gray-medium mt-1">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate">{sim.location}</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-500 mt-1">
                  <Star className="h-3 w-3 fill-current" />
                  {sim.rating}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
