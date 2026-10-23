'use client';

import Image from 'next/image';
import {
  X, IdCard, GraduationCap, DollarSign, MapPin, Pencil, CheckCircle, XCircle, EyeOff, CalendarDays, BookOpen,
} from 'lucide-react';
import CollapsibleSection from '@/app/dashboard/upload-new-listing/components/CollapsibleSection';
import { Field, Chips, Bullets, SubHeading } from './ModalParts';
import type { AdminSchool, SubmissionStatus } from '../data';

interface Props {
  school: AdminSchool | null;
  open: boolean;
  onClose: () => void;
  onEdit: (s: AdminSchool) => void;
  onApprove: (s: AdminSchool) => void;
  onReject: (s: AdminSchool) => void;
  /** Optional publish toggle, supplied by the All Institutes table. */
  onTogglePublish?: (s: AdminSchool) => void;
}

const STATUS_TONE: Record<SubmissionStatus, string> = {
  'Pending Review': 'bg-amber-50 text-amber-700',
  Approved: 'bg-emerald-50 text-emerald-700',
  Rejected: 'bg-red-50 text-red-700',
  Published: 'bg-emerald-50 text-emerald-700',
};

/** Full record for one Primary & Secondary school, shown on row click. */
export default function SchoolDetailModal({ school, open, onClose, onEdit, onApprove, onReject, onTogglePublish }: Props) {
  if (!open || !school) return null;

  const isPending = school.workflowStatus === 'Pending Review';
  const isPublished = school.listingStatus === 'Published';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-neutral-bg-light rounded-2xl shadow-2xl w-full max-w-4xl my-8 flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 bg-white rounded-t-2xl border-b border-neutral-gray-light flex items-center justify-between gap-3 shrink-0">
          <div className="min-w-0">
            <h2 className="text-base font-bold text-neutral-black truncate">{school.name}</h2>
            <p className="text-xs text-neutral-gray-medium">
              {school.class} · Submitted on {school.submittedOn} {school.submittedTime}
            </p>
          </div>
          <button onClick={onClose} className="h-9 w-9 rounded-full bg-neutral-bg-light hover:bg-neutral-gray-light flex items-center justify-center cursor-pointer shrink-0">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <CollapsibleSection title="Institute identity" icon={<IdCard className="h-5 w-5 text-brand-red-600" />} defaultOpen>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <Image
                  src={school.image}
                  alt={school.name}
                  width={72}
                  height={72}
                  sizes="80px"
                  className="rounded-xl object-cover border border-neutral-gray-light shrink-0 w-20 h-20"
                />
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-neutral-black">{school.name}</h3>
                  {school.motto && <p className="text-xs text-neutral-gray-medium italic mt-0.5">{school.motto}</p>}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-semibold">{school.class}</span>
                    <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[11px] font-semibold">{school.program}</span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[11px] font-semibold">{school.ownership}</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold">{school.gender}</span>
                    <span className="px-2 py-0.5 rounded-full bg-white border border-neutral-gray-light text-neutral-gray-dark text-[11px]">{school.country}</span>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-gray-light">
                <Field label="Class" value={school.class} />
                <Field label="Program" value={school.program} />
                <Field label="Ownership" value={school.ownership} />
                <Field label="Gender" value={school.gender} />
                <Field label="Country" value={school.country} />
                <Field label="State / Region" value={school.state} />
                <Field label="City" value={school.city} />
                <Field label="Active students" value={school.activeStudents} />
                <Field label="Submitted On" value={`${school.submittedOn} ${school.submittedTime}`} />
                <Field label="Listing Status" value={isPublished ? 'Published' : school.listingStatus} />
                <Field label="Verification" value={school.verification} />
                <Field label="Workflow Status" value={school.workflowStatus} />
                <Field label="Submitted By" value={school.submittedBy} />
                <Field label="Submitter E-mail" value={school.submitterEmail} />
                {school.reason && (
                  <div className="sm:col-span-2">
                    <Field label="Reason for Rejection" value={school.reason} />
                  </div>
                )}
              </div>

              <div className="pt-2">
                <p className="text-[11px] font-semibold text-neutral-gray-medium uppercase mb-1">Description</p>
                <p className="text-sm text-neutral-gray-dark leading-relaxed whitespace-pre-wrap">{school.description}</p>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Academic information" icon={<GraduationCap className="h-5 w-5 text-brand-red-600" />} defaultOpen>
            <div className="space-y-5">
              <div>
                <SubHeading icon={CalendarDays}>Academic calendar</SubHeading>
                {school.academicCalendar.length === 0 ? (
                  <p className="text-sm text-neutral-gray-medium">—</p>
                ) : (
                  <div className="rounded-xl border border-neutral-gray-light bg-white overflow-hidden">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-neutral-gray-light bg-neutral-bg-light/60">
                          <th className="text-left px-3 py-2 font-semibold text-neutral-gray-medium">Term</th>
                          <th className="text-left px-3 py-2 font-semibold text-neutral-gray-medium">Start</th>
                          <th className="text-left px-3 py-2 font-semibold text-neutral-gray-medium">Midterm break</th>
                          <th className="text-left px-3 py-2 font-semibold text-neutral-gray-medium">Closure</th>
                        </tr>
                      </thead>
                      <tbody>
                        {school.academicCalendar.map((t) => (
                          <tr key={t.term} className="border-b border-neutral-gray-light/60 last:border-0">
                            <td className="px-3 py-2 font-medium text-neutral-black">{t.term}</td>
                            <td className="px-3 py-2 text-neutral-gray-dark">{t.startDate || '—'}</td>
                            <td className="px-3 py-2 text-neutral-gray-dark">{t.midtermBreakDate || '—'}</td>
                            <td className="px-3 py-2 text-neutral-gray-dark">{t.closureDate || '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div>
                <SubHeading icon={BookOpen}>Subjects</SubHeading>
                <Chips items={school.subjects} tone="px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-medium text-blue-700" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <SubHeading icon={BookOpen}>Primary admission</SubHeading>
                  <Bullets items={school.admissionRequirements.primary} />
                </div>
                <div>
                  <SubHeading icon={BookOpen}>Secondary admission</SubHeading>
                  <Bullets items={school.admissionRequirements.secondary} />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Work days" value={school.workDays} />
                <Field label="Work hours" value={school.workHours} />
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Fees & services" icon={<DollarSign className="h-5 w-5 text-brand-navy-900" />} defaultOpen>
            <div className="space-y-5">
              <div>
                <SubHeading icon={DollarSign}>Tuition fees</SubHeading>
                {school.tuitionFees.length === 0 ? (
                  <p className="text-sm text-neutral-gray-medium">—</p>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-3">
                    {school.tuitionFees.map((f) => (
                      <Field key={f.level} label={f.level} value={`${f.fee} ${f.currency}`} />
                    ))}
                  </div>
                )}
              </div>

              {school.otherFees.length > 0 && (
                <div>
                  <SubHeading icon={DollarSign}>Other fees</SubHeading>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {school.otherFees.map((f) => (
                      <Field key={f.name} label={f.name} value={`${f.cost} ${f.currency}`} />
                    ))}
                  </div>
                </div>
              )}

              <div>
                <SubHeading icon={BookOpen}>Services</SubHeading>
                <Chips items={school.services} tone="px-2.5 py-1 rounded-full bg-purple-50 border border-purple-200 text-xs font-medium text-purple-700" />
              </div>

              <div>
                <SubHeading icon={BookOpen}>Scopes</SubHeading>
                <Bullets items={school.scopes} />
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Contact information" icon={<MapPin className="h-5 w-5 text-brand-navy-900" />} defaultOpen>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Address" value={school.address} />
              <Field label="Phone" value={school.phone} />
              <Field label="E-mail" value={school.email} />
              <Field label="Website" value={school.website} />
              <Field label="LinkedIn" value={school.socials.LinkedIn} />
              <Field label="Twitter" value={school.socials.Twitter} />
              <Field label="Instagram" value={school.socials.Instagram} />
              <Field label="Facebook" value={school.socials.Facebook} />
            </div>
          </CollapsibleSection>
        </div>

        <div className="px-6 py-4 bg-white rounded-b-2xl border-t border-neutral-gray-light flex items-center justify-between shrink-0 gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-xl border border-neutral-gray-light text-xs font-semibold hover:bg-neutral-bg-light cursor-pointer">Close</button>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(school)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-neutral-gray-light text-xs font-semibold hover:bg-neutral-bg-light cursor-pointer"
            >
              <Pencil className="h-3.5 w-3.5" /> Edit
            </button>
            {isPending ? (
              <>
                <button
                  onClick={() => { onReject(school); onClose(); }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-50 text-red-600 border border-red-200 text-xs font-semibold hover:bg-red-100 cursor-pointer"
                >
                  <XCircle className="h-4 w-4" /> Reject
                </button>
                <button
                  onClick={() => { onApprove(school); onClose(); }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 cursor-pointer"
                >
                  <CheckCircle className="h-4 w-4" /> Approve
                </button>
              </>
            ) : (
              <>
                <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${STATUS_TONE[school.workflowStatus]}`}>{school.workflowStatus}</span>
                {onTogglePublish && (
                  <button
                    onClick={() => { onTogglePublish(school); onClose(); }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#453DD8] text-white text-xs font-semibold hover:bg-[#3a33c0] cursor-pointer"
                  >
                    <EyeOff className="h-3.5 w-3.5" /> {isPublished ? 'Unpublish' : 'Publish'}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
