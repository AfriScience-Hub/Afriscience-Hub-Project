'use client';

import { useState } from 'react';
import {
  BookOpen, Layers, GraduationCap, ShieldCheck, FileText, ChevronDown, Building2, MapPin,
  Users, Star, Award, TrendingUp, Calendar, Clock, DollarSign, CheckCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Institute {
  [key: string]: any;
}

function CollapsibleSection({ title, icon, children, defaultOpen = false, badge }: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  badge?: string;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-neutral-gray-light bg-white shadow-sm mb-4 last:mb-0 overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex cursor-pointer items-center justify-between p-5 hover:bg-neutral-bg-light transition-colors"
      >
        <div className="flex items-center gap-3">
          {icon}
          <h4 className="font-bold text-neutral-black text-left">{title}</h4>
          {badge && (
            <span className="px-2 py-0.5 rounded-full bg-brand-red-50 text-brand-red-600 text-[10px] font-bold">{badge}</span>
          )}
        </div>
        <ChevronDown className={cn("h-4 w-4 text-neutral-gray-medium transition-transform", isOpen && "rotate-180")} />
      </button>
      {isOpen && <div className="px-5 pb-5 border-t border-neutral-gray-light pt-4">{children}</div>}
    </div>
  );
}

function FieldRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3 py-2 border-b border-neutral-gray-light last:border-0">
      <span className="text-xs font-bold text-neutral-gray-medium uppercase w-40 shrink-0">{label}</span>
      <span className="text-sm text-neutral-gray-dark">{value}</span>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  if (!items?.length) return null;
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="text-sm text-neutral-gray-dark flex items-start gap-2">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-red-600 flex-shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function AcademicsTab({ institute }: { institute: Institute }) {
  const programLevels = institute.programLevels || [];

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

      {institute.subInstitutions && institute.subInstitutions.length > 0 && (
        <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
          <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-brand-red-600" /> Sub-Institutions
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {institute.subInstitutions.map((inst: string, idx: number) => (
              <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-brand-navy-50 border border-brand-navy-100">
                <div className="h-2 w-2 rounded-full bg-brand-navy-900" />
                <span className="text-sm text-brand-navy-900 font-medium">{inst}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {programLevels.length > 0 && (
        <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
          <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-brand-red-600" /> Programme Levels
          </h3>
          <div className="space-y-4">
            {programLevels.map((level: any, idx: number) => (
              <CollapsibleSection
                key={level.id || idx}
                title={level.name}
                icon={
                  idx === 0 ? <BookOpen className="h-5 w-5 text-brand-red-600" /> :
                  idx === 1 ? <Star className="h-5 w-5 text-brand-red-600" /> :
                  idx === 2 ? <GraduationCap className="h-5 w-5 text-brand-red-600" /> :
                  idx === 3 ? <Award className="h-5 w-5 text-brand-red-600" /> :
                  idx === 4 ? <Users className="h-5 w-5 text-brand-red-600" /> :
                  <TrendingUp className="h-5 w-5 text-brand-red-600" />
                }
                badge={idx < 2 ? 'Entry' : idx === 2 ? 'Core' : 'Advanced'}
                defaultOpen={idx === 0}
              >
                <div className="space-y-4">
                  {level.description && (
                    <p className="text-sm text-neutral-gray-dark leading-relaxed">{level.description}</p>
                  )}

                  {level.registrationRequirements && level.registrationRequirements.length > 0 && (
                    <div>
                      <h5 className="text-sm font-bold text-neutral-black mb-2 flex items-center gap-1.5">
                        <CheckCircle className="h-3.5 w-3.5 text-green-600" /> Registration Requirements
                      </h5>
                      <BulletList items={level.registrationRequirements} />
                    </div>
                  )}

                  {level.coursesOffered && level.coursesOffered.length > 0 && (
                    <div>
                      <h5 className="text-sm font-bold text-neutral-black mb-2">Courses Offered</h5>
                      <div className="flex flex-wrap gap-2">
                        {level.coursesOffered.map((c: string, i: number) => (
                          <span key={i} className="text-xs px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100">{c}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid gap-3 sm:grid-cols-2">
                    {level.duration && <div className="flex items-center gap-2 text-sm text-neutral-gray-dark"><Clock className="h-4 w-4 text-neutral-gray-medium shrink-0" /><span><strong>Duration:</strong> {level.duration}</span></div>}
                    {level.tuitionFee && <div className="flex items-center gap-2 text-sm text-neutral-gray-dark"><DollarSign className="h-4 w-4 text-neutral-gray-medium shrink-0" /><span><strong>Tuition:</strong> {level.tuitionFee}</span></div>}
                    {level.hostelFee && <div className="flex items-center gap-2 text-sm text-neutral-gray-dark"><MapPin className="h-4 w-4 text-neutral-gray-medium shrink-0" /><span><strong>Hostel:</strong> {level.hostelFee}</span></div>}
                    {level.gradingSystem && <div className="flex items-center gap-2 text-sm text-neutral-gray-dark"><Star className="h-4 w-4 text-neutral-gray-medium shrink-0" /><span><strong>Grading:</strong> {level.gradingSystem}</span></div>}
                  </div>

                  {level.academicCalendar && (
                    <div className="grid gap-2 sm:grid-cols-2">
                      <div className="flex items-center gap-2 text-sm text-neutral-gray-dark"><Calendar className="h-4 w-4 text-neutral-gray-medium shrink-0" /><span><strong>1st Sem:</strong> {level.academicCalendar.firstSemester}</span></div>
                      <div className="flex items-center gap-2 text-sm text-neutral-gray-dark"><Calendar className="h-4 w-4 text-neutral-gray-medium shrink-0" /><span><strong>2nd Sem:</strong> {level.academicCalendar.secondSemester}</span></div>
                    </div>
                  )}

                  {level.admissionCriteria && (
                    <div>
                      <h5 className="text-sm font-bold text-neutral-black mb-2">Admission Criteria</h5>
                      {typeof level.admissionCriteria === 'string' ? (
                        <BulletList items={[level.admissionCriteria]} />
                      ) : Array.isArray(level.admissionCriteria) ? (
                        <BulletList items={level.admissionCriteria} />
                      ) : null}
                    </div>
                  )}

                  {level.cutoffMarks && level.cutoffMarks.length > 0 && (
                    <div>
                      <h5 className="text-sm font-bold text-neutral-black mb-2">Faculty Cut-Off Marks</h5>
                      <div className="overflow-hidden rounded-lg border border-neutral-gray-light">
                        <table className="w-full text-sm">
                          <thead className="bg-neutral-bg-light text-neutral-gray-dark font-semibold">
                            <tr><th className="px-4 py-2 text-left">Faculty</th><th className="px-4 py-2 text-left">Benchmark</th></tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-gray-light">
                            {level.cutoffMarks.map((c: any, i: number) => (
                              <tr key={i} className="hover:bg-neutral-bg-light/50">
                                <td className="px-4 py-2 font-medium text-neutral-black">{c.faculty}</td>
                                <td className="px-4 py-2 text-brand-red-600 font-bold">{c.benchmark}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {level.programDurations && level.programDurations.length > 0 && (
                    <div>
                      <h5 className="text-sm font-bold text-neutral-black mb-2">Programme Durations</h5>
                      <div className="overflow-hidden rounded-lg border border-neutral-gray-light">
                        <table className="w-full text-sm">
                          <thead className="bg-neutral-bg-light text-neutral-gray-dark font-semibold">
                            <tr><th className="px-4 py-2 text-left">Faculty</th><th className="px-4 py-2 text-left">Duration</th></tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-gray-light">
                            {level.programDurations.map((p: any, i: number) => (
                              <tr key={i} className="hover:bg-neutral-bg-light/50">
                                <td className="px-4 py-2 font-medium text-neutral-black">{p.faculty}</td>
                                <td className="px-4 py-2 text-brand-red-600 font-medium">{p.duration}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {level.degreeTitles && level.degreeTitles.length > 0 && (
                    <div>
                      <h5 className="text-sm font-bold text-neutral-black mb-2">Degree Titles Awarded</h5>
                      <div className="flex flex-wrap gap-2">
                        {level.degreeTitles.map((t: string, i: number) => (
                          <span key={i} className="text-xs px-2.5 py-1 rounded bg-brand-navy-50 text-brand-navy-900 border border-brand-navy-100">{t}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {level.programmes && level.programmes.length > 0 && (
                    <div>
                      <h5 className="text-sm font-bold text-neutral-black mb-2">Programmes & Courses</h5>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {level.programmes.map((p: any, i: number) => (
                          <div key={i} className="p-3 rounded-lg bg-neutral-bg-light border border-neutral-gray-light">
                            <h6 className="text-sm font-bold text-neutral-black mb-2">{p.name}</h6>
                            <div className="flex flex-wrap gap-1">
                              {p.courses.map((c: string, j: number) => (
                                <span key={j} className="text-[10px] px-1.5 py-0.5 rounded bg-white text-neutral-gray-dark border border-neutral-gray-light">{c}</span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {level.studyOutline && level.studyOutline.length > 0 && (
                    <div>
                      <h5 className="text-sm font-bold text-neutral-black mb-2">Study Outline</h5>
                      <div className="space-y-3">
                        {level.studyOutline.map((s: any, i: number) => (
                          <div key={i} className="p-3 rounded-lg border border-neutral-gray-light">
                            <p className="text-xs font-bold text-brand-navy-900 mb-1">{s.faculty} → {s.department}</p>
                            <div className="flex flex-wrap gap-1">
                              {s.courses.map((c: string, j: number) => (
                                <span key={j} className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-bg-light text-neutral-gray-dark border border-neutral-gray-light">{c}</span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {level.programs && level.programs.length > 0 && (
                    <div>
                      <h5 className="text-sm font-bold text-neutral-black mb-2">Programme Types</h5>
                      <div className="space-y-3">
                        {level.programs.map((p: any, i: number) => (
                          <div key={i} className="p-4 rounded-lg border border-neutral-gray-light bg-neutral-bg-light/50">
                            <h6 className="text-sm font-bold text-neutral-black mb-2">{p.name}</h6>
                            {p.requirements && (
                              <BulletList items={p.requirements} />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CollapsibleSection>
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
