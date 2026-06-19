'use client';

import {
  BookOpen, Layers, GraduationCap, ShieldCheck, FileText
} from 'lucide-react';

interface Institute {
  [key: string]: any;
}

export default function AcademicsTab({ institute }: { institute: Institute }) {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {institute.curriculum && institute.curriculum.length > 0 && (
        <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
          <h3 className="text-lg font-bold text-neutral-black mb-4">Curriculum & Subjects</h3>
          <div className="flex flex-wrap gap-2">
            {institute.curriculum.map((subj: string, idx: number) => (
              <span key={idx} className="px-3 py-1 rounded bg-neutral-bg-light text-neutral-gray-dark text-sm">
                {subj}
              </span>
            ))}
          </div>
        </section>
      )}

      {institute.faculties && institute.faculties.length > 0 && (
        <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
          <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-brand-red-600" /> Faculties & Departments
          </h3>
          <div className="grid gap-4">
            {institute.faculties.map((faculty: any, idx: number) => (
              <div key={idx} className="border border-neutral-gray-light rounded-xl overflow-hidden">
                <div className="bg-neutral-bg-light px-4 py-3 border-b border-neutral-gray-light">
                  <h4 className="font-bold text-neutral-black text-sm">{faculty.name}</h4>
                </div>
                <div className="p-4 bg-white">
                  <div className="flex flex-wrap gap-2">
                    {faculty.departments.map((dept: string, dIdx: number) => (
                      <span key={dIdx} className="text-xs px-2.5 py-1 rounded bg-neutral-bg-light text-neutral-gray-dark border border-neutral-gray-light">
                        {dept}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {institute.programs && (
        <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
          <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-brand-red-600" /> Programs
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {Object.entries(institute.programs).map(([progName, items]: [string, any], idx: number) => (
              <div key={idx} className="p-4 rounded-xl border border-neutral-gray-light hover:border-brand-red-100 transition-colors">
                <h4 className="font-bold text-neutral-black text-sm mb-2 pb-2 border-b border-neutral-bg-light">{progName}</h4>
                <ul className="space-y-1">
                  {items.map((item: string, i: number) => (
                    <li key={i} className="text-xs text-neutral-gray-dark flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 rounded-full bg-brand-red-600 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-brand-red-600" /> Tuition Fees
        </h3>
        {institute.tuitionFees && institute.tuitionFees.length > 0 ? (
          <div className="overflow-hidden rounded-lg border border-neutral-gray-light">
            <table className="w-full text-sm text-left">
              <thead className="bg-neutral-bg-light text-neutral-gray-dark font-semibold border-b border-neutral-gray-light">
                <tr>
                  <th className="px-4 py-3">Grade / Level</th>
                  <th className="px-4 py-3">Fee Range</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-gray-light">
                {institute.tuitionFees.map((fee: any, idx: number) => (
                  <tr key={idx} className="hover:bg-neutral-bg-light/50">
                    <td className="px-4 py-3 font-medium text-neutral-black">{fee.level}</td>
                    <td className="px-4 py-3 text-brand-red-600 font-medium">{fee.range}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-neutral-gray-medium italic">Tuition fee structure not available publicly.</p>
        )}
      </section>

      {institute.otherFees && institute.otherFees.length > 0 && (
        <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
          <h3 className="text-lg font-bold text-neutral-black mb-4">Other Fees</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {institute.otherFees.map((fee: any, idx: number) => (
              <div key={idx} className="flex justify-between items-center p-3 rounded-lg bg-neutral-bg-light border border-neutral-gray-light">
                <span className="text-sm text-neutral-gray-dark">{fee.item}</span>
                <span className="text-sm font-bold text-neutral-black">{fee.range}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {institute.certifications && institute.certifications.length > 0 && (
        <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-neutral-black flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-brand-navy-900" /> Licenses & Certifications
            </h3>
            <p className="text-sm text-neutral-gray-medium mt-1">Legal accreditation documents of the school by appropriate government agencies.</p>
          </div>
          <div className="grid gap-3">
            {institute.certifications.map((cert: any, idx: number) => (
              <div key={idx} className="flex flex-col p-4 rounded-xl border border-neutral-gray-light bg-neutral-bg-light/30">
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="h-5 w-5 text-brand-red-600" />
                  <span className="text-sm font-bold text-neutral-black">{cert.name}</span>
                </div>
                <div className="pl-8 space-y-1">
                  <p className="text-xs text-neutral-gray-dark font-medium">{cert.issuer} &bull; {cert.year}</p>
                  <p className="text-xs text-neutral-gray-medium leading-relaxed">{cert.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
