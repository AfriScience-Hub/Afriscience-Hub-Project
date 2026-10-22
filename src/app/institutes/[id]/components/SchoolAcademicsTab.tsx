'use client';

import { useState } from 'react';
import {
  Calendar, BookOpen, DollarSign, Star, Award, GraduationCap
} from 'lucide-react';
import InfoTooltip from '@/app/components/ui/InfoTooltip';
import { BulletList, CurrencyMode, CurrencyToggle, formatMoney } from './academicsParts';

interface Institute {
  [key: string]: any;
}

const TERMS: { key: string; label: string }[] = [
  { key: 'firstTerm', label: '1st Term' },
  { key: 'secondTerm', label: '2nd Term' },
  { key: 'thirdTerm', label: '3rd Term' },
];

/** Academics & Fees for Primary / Secondary schools. */
export default function SchoolAcademicsTab({ institute }: { institute: Institute }) {
  const [currencyMode, setCurrencyMode] = useState<CurrencyMode>('local');
  const calendar = institute.academicCalendar;
  const symbol = institute.currencySymbol || '₦';

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {calendar && (
        <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
          <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-brand-red-600" /> Academic Calendar
          </h3>
          <div className="grid gap-3 sm:grid-cols-3">
            {TERMS.map(term => (
              <div key={term.key} className="p-4 rounded-xl border border-neutral-gray-light bg-neutral-bg-light/50">
                <span className="text-[11px] font-bold uppercase tracking-wide text-neutral-gray-medium">{term.label}</span>
                <p className="mt-1 text-sm font-bold text-neutral-black">{calendar[term.key] || '—'}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {institute.curriculum?.length > 0 && (
        <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
          <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-brand-red-600" /> Subjects
          </h3>
          <div className="flex flex-wrap gap-2">
            {institute.curriculum.map((subject: string, idx: number) => (
              <span key={idx} className="px-3 py-1 rounded bg-neutral-bg-light text-neutral-gray-dark text-sm border border-neutral-gray-light">
                {subject}
              </span>
            ))}
          </div>
        </section>
      )}

      <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h3 className="text-lg font-bold text-neutral-black flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-brand-red-600" /> Tuition Fees
          </h3>
          <CurrencyToggle mode={currencyMode} onChange={setCurrencyMode} symbol={symbol} />
        </div>
        {institute.tuitionFees?.length > 0 ? (
          <div className="overflow-hidden rounded-lg border border-neutral-gray-light">
            <table className="w-full text-sm text-left">
              <thead className="bg-neutral-bg-light text-neutral-gray-dark font-semibold border-b border-neutral-gray-light">
                <tr>
                  <th className="px-4 py-3">Class / Level</th>
                  <th className="px-4 py-3 text-right">Tuition Fee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-gray-light">
                {institute.tuitionFees.map((fee: any, idx: number) => (
                  <tr key={idx} className="hover:bg-neutral-bg-light/50">
                    <td className="px-4 py-3 font-medium text-neutral-black">{fee.level}</td>
                    <td className="px-4 py-3 text-right text-brand-red-600 font-bold">
                      {formatMoney(fee.amount, institute, currencyMode)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-neutral-gray-medium italic">Tuition fee structure not available publicly.</p>
        )}
      </section>

      {institute.otherFees?.length > 0 && (
        <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h3 className="text-lg font-bold text-neutral-black flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-amber-600" /> Other Fees
            </h3>
            <CurrencyToggle mode={currencyMode} onChange={setCurrencyMode} symbol={symbol} />
          </div>
          <div className="space-y-3">
            {institute.otherFees.map((fee: any, idx: number) => (
              <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-neutral-bg-light/50 border border-neutral-gray-light">
                <span className="flex-1 text-sm font-medium text-neutral-gray-dark">{fee.item}</span>
                {fee.description && <InfoTooltip text={fee.description} />}
                <span className="text-sm font-bold text-neutral-black">
                  {formatMoney(fee.amount, institute, currencyMode)}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {institute.gradingSystem && (
        <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
          <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
            <Star className="h-5 w-5 text-amber-500" /> Grading System
          </h3>
          <div className="flex flex-wrap gap-2">
            {String(institute.gradingSystem).split('|').map((band: string, idx: number) => (
              <span key={idx} className="px-3 py-1.5 rounded-lg bg-neutral-bg-light border border-neutral-gray-light text-sm text-neutral-gray-dark">
                {band.trim()}
              </span>
            ))}
          </div>
        </section>
      )}

      {institute.degreesAwarded?.length > 0 && (
        <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
          <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-brand-navy-900" /> Degrees Awarded
          </h3>
          <div className="flex flex-wrap gap-2">
            {institute.degreesAwarded.map((degree: string, idx: number) => (
              <span key={idx} className="px-3 py-1.5 rounded-full bg-brand-navy-50 text-brand-navy-900 text-sm font-medium border border-brand-navy-100">
                {degree}
              </span>
            ))}
          </div>
        </section>
      )}

      {institute.admissionRequirements?.length > 0 && (
        <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
          <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-brand-red-600" /> Admission Requirements
          </h3>
          <BulletList items={institute.admissionRequirements} />
        </section>
      )}
    </div>
  );
}
