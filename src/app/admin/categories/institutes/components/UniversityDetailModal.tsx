'use client';

import Image from 'next/image';
import {
  X, IdCard, GraduationCap, MapPin, Pencil, CheckCircle, XCircle, EyeOff, Building2, Layers,
} from 'lucide-react';
import CollapsibleSection from '@/app/dashboard/upload-new-listing/components/CollapsibleSection';
import { Field, Chips, SubHeading } from './ModalParts';
import type { AdminUniversity, SubmissionStatus } from '../data';

interface Props {
  university: AdminUniversity | null;
  open: boolean;
  onClose: () => void;
  onEdit: (u: AdminUniversity) => void;
  onApprove: (u: AdminUniversity) => void;
  onReject: (u: AdminUniversity) => void;
  /** Optional publish toggle, supplied by the All Institutes table. */
  onTogglePublish?: (u: AdminUniversity) => void;
}

const STATUS_TONE: Record<SubmissionStatus, string> = {
  'Pending Review': 'bg-amber-50 text-amber-700',
  Approved: 'bg-emerald-50 text-emerald-700',
  Rejected: 'bg-red-50 text-red-700',
  Published: 'bg-emerald-50 text-emerald-700',
};

/** Full record for one university, shown on row click. */
export default function UniversityDetailModal({ university, open, onClose, onEdit, onApprove, onReject, onTogglePublish }: Props) {
  if (!open || !university) return null;

  const isPending = university.workflowStatus === 'Pending Review';
  const isPublished = university.listingStatus === 'Published';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-neutral-bg-light rounded-2xl shadow-2xl w-full max-w-4xl my-8 flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 bg-white rounded-t-2xl border-b border-neutral-gray-light flex items-center justify-between gap-3 shrink-0">
          <div className="min-w-0">
            <h2 className="text-base font-bold text-neutral-black truncate">{university.name}</h2>
            <p className="text-xs text-neutral-gray-medium">
              University · Submitted on {university.submittedOn} {university.submittedTime}
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
                  src={university.image}
                  alt={university.name}
                  width={72}
                  height={72}
                  sizes="80px"
                  className="rounded-xl object-cover border border-neutral-gray-light shrink-0 w-20 h-20"
                />
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-neutral-black">{university.name}</h3>
                  {university.motto && <p className="text-xs text-neutral-gray-medium italic mt-0.5">{university.motto}</p>}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[11px] font-semibold">University</span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[11px] font-semibold">{university.ownership}</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold">{university.gender}</span>
                    <span className="px-2 py-0.5 rounded-full bg-white border border-neutral-gray-light text-neutral-gray-dark text-[11px]">{university.country}</span>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-gray-light">
                <Field label="Ownership" value={university.ownership} />
                <Field label="Gender" value={university.gender} />
                <Field label="Country" value={university.country} />
                <Field label="State / Region" value={university.state} />
                <Field label="City" value={university.city} />
                <Field label="Year established" value={university.yearEstablished} />
                <Field label="Submitted On" value={`${university.submittedOn} ${university.submittedTime}`} />
                <Field label="Listing Status" value={isPublished ? 'Published' : university.listingStatus} />
                <Field label="Verification" value={university.verification} />
                <Field label="Workflow Status" value={university.workflowStatus} />
                <Field label="Submitted By" value={university.submittedBy} />
                <Field label="Submitter E-mail" value={university.submitterEmail} />
                {university.reason && (
                  <div className="sm:col-span-2">
                    <Field label="Reason for Rejection" value={university.reason} />
                  </div>
                )}
              </div>

              <div className="pt-2">
                <p className="text-[11px] font-semibold text-neutral-gray-medium uppercase mb-1">Description</p>
                <p className="text-sm text-neutral-gray-dark leading-relaxed whitespace-pre-wrap">{university.description}</p>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Academic information" icon={<GraduationCap className="h-5 w-5 text-brand-red-600" />} defaultOpen>
            <div className="space-y-5">
              <div>
                <SubHeading icon={Layers}>Faculties</SubHeading>
                {university.faculties.length === 0 ? (
                  <p className="text-sm text-neutral-gray-medium">—</p>
                ) : (
                  <div className="space-y-3">
                    {university.faculties.map((f) => (
                      <div key={f.name} className="rounded-xl border border-neutral-gray-light bg-white p-3.5">
                        <p className="text-xs font-bold text-neutral-black mb-2">{f.name}</p>
                        <Chips items={f.departments} tone="px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[11px] text-blue-700" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <SubHeading icon={GraduationCap}>Program levels</SubHeading>
                {university.programLevels.length === 0 ? (
                  <p className="text-sm text-neutral-gray-medium">—</p>
                ) : (
                  <div className="space-y-3">
                    {university.programLevels.map((p) => (
                      <div key={p.id} className="rounded-xl border border-neutral-gray-light bg-white p-3.5 space-y-2">
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-xs font-bold text-neutral-black">{p.name}</p>
                          <span className="text-[11px] text-neutral-gray-medium whitespace-nowrap">{p.duration}</span>
                        </div>
                        <p className="text-[11px] text-neutral-gray-dark leading-relaxed">{p.description}</p>
                        <div className="grid sm:grid-cols-2 gap-3 pt-1 border-t border-neutral-gray-light">
                          <Field label="Tuition fee" value={p.tuitionFee} />
                          <Field label="Hostel fee" value={p.hostelFee} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Services & contact" icon={<MapPin className="h-5 w-5 text-brand-navy-900" />} defaultOpen>
            <div className="space-y-5">
              <div>
                <SubHeading icon={Building2}>Services</SubHeading>
                <Chips items={university.services} tone="px-2.5 py-1 rounded-full bg-purple-50 border border-purple-200 text-xs font-medium text-purple-700" />
              </div>

              <div>
                <SubHeading icon={Building2}>Scopes</SubHeading>
                <Chips items={university.scopes} />
              </div>

              <div>
                <SubHeading icon={Building2}>Campuses</SubHeading>
                <Chips items={university.campuses} tone="px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-medium text-amber-700" />
              </div>

              {university.subInstitutions.length > 0 && (
                <div>
                  <SubHeading icon={Building2}>Sub-institutions</SubHeading>
                  <Chips items={university.subInstitutions} />
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4 pt-3 border-t border-neutral-gray-light">
                <Field label="Address" value={university.address} />
                <Field label="Phone" value={university.phone} />
                <Field label="E-mail" value={university.email} />
                <Field label="Website" value={university.website} />
                <Field label="LinkedIn" value={university.socials.LinkedIn} />
                <Field label="Twitter" value={university.socials.Twitter} />
                <Field label="Instagram" value={university.socials.Instagram} />
                <Field label="Facebook" value={university.socials.Facebook} />
              </div>
            </div>
          </CollapsibleSection>
        </div>

        <div className="px-6 py-4 bg-white rounded-b-2xl border-t border-neutral-gray-light flex items-center justify-between shrink-0 gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-xl border border-neutral-gray-light text-xs font-semibold hover:bg-neutral-bg-light cursor-pointer">Close</button>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(university)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-neutral-gray-light text-xs font-semibold hover:bg-neutral-bg-light cursor-pointer"
            >
              <Pencil className="h-3.5 w-3.5" /> Edit
            </button>
            {isPending ? (
              <>
                <button
                  onClick={() => { onReject(university); onClose(); }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-50 text-red-600 border border-red-200 text-xs font-semibold hover:bg-red-100 cursor-pointer"
                >
                  <XCircle className="h-4 w-4" /> Reject
                </button>
                <button
                  onClick={() => { onApprove(university); onClose(); }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 cursor-pointer"
                >
                  <CheckCircle className="h-4 w-4" /> Approve
                </button>
              </>
            ) : (
              <>
                <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${STATUS_TONE[university.workflowStatus]}`}>{university.workflowStatus}</span>
                {onTogglePublish && (
                  <button
                    onClick={() => { onTogglePublish(university); onClose(); }}
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
