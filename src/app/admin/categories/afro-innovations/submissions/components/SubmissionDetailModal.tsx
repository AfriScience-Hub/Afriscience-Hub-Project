'use client';

import Image from 'next/image';
import {
  X, Lightbulb, User, IdCard, CheckCircle, XCircle, MapPin, Wrench, Camera,
  Award, Users, FileText, Info, AlertTriangle, ScrollText, BadgeCheck,
} from 'lucide-react';
import type { SubmissionRecord, InnovationDoc } from '../data';
import CollapsibleSection from '@/app/dashboard/upload-new-listing/components/CollapsibleSection';

function Field({ label, value }: { label: string; value?: string | null }) {
  const text = value != null && String(value).trim() ? String(value) : '—';
  return (
    <div>
      <p className="text-[11px] font-semibold text-neutral-gray-medium uppercase">{label}</p>
      <p className="text-sm text-neutral-black break-words whitespace-pre-wrap">{text}</p>
    </div>
  );
}

function Chips({ items, tone }: { items: string[]; tone?: string }) {
  if (!items?.length) return <p className="text-sm text-neutral-gray-medium">—</p>;
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((i) => (
        <span key={i} className={tone ?? 'px-2.5 py-1 rounded-full bg-neutral-bg-light border border-neutral-gray-light text-xs text-neutral-gray-dark'}>{i}</span>
      ))}
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  if (!items?.length) return <p className="text-sm text-neutral-gray-medium">—</p>;
  return (
    <ul className="list-disc pl-5 space-y-1 text-sm text-neutral-gray-dark">
      {items.map((i, idx) => <li key={idx}>{i}</li>)}
    </ul>
  );
}

function DocList({ docs }: { docs: InnovationDoc[] }) {
  if (!docs?.length) return <p className="text-sm text-neutral-gray-medium">None provided.</p>;
  return (
    <div className="space-y-2">
      {docs.map((d, i) => (
        <div key={i} className="flex items-start justify-between gap-3 rounded-lg border border-neutral-gray-light bg-white p-3">
          <div className="min-w-0">
            <p className="text-sm font-medium text-neutral-black truncate">{d.title}</p>
            <p className="text-[11px] text-neutral-gray-medium">{d.issuer} &middot; {d.year}</p>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] text-[#453DD8] shrink-0">
            <FileText className="h-3.5 w-3.5" /> {d.file}
          </span>
        </div>
      ))}
    </div>
  );
}

function SubHeading({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold text-neutral-black mb-2 flex items-center gap-1.5">
      <Icon className="h-4 w-4 text-neutral-gray-medium" /> {children}
    </p>
  );
}

export default function SubmissionDetailModal({
  submission, open, onClose, onApprove, onReject,
}: {
  submission: SubmissionRecord | null;
  open: boolean;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}) {
  if (!open || !submission) return null;

  const inn = submission.innovation;
  const social = submission.innovator.socialLinks;
  const socialEntries = [
    ['X', social.x], ['LinkedIn', social.linkedin], ['Facebook', social.facebook], ['Instagram', social.instagram],
  ].filter(([, v]) => v);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-neutral-bg-light rounded-2xl shadow-2xl w-full max-w-4xl my-8 flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 bg-white rounded-t-2xl border-b border-neutral-gray-light flex items-center justify-between shrink-0">
          <div className="min-w-0">
            <h2 className="text-base font-bold text-neutral-black truncate">{inn.name}</h2>
            <p className="text-xs text-neutral-gray-medium">{inn.idTag} &middot; Submitted on {submission.submittedOn} {submission.submittedTime}</p>
          </div>
          <button onClick={onClose} className="h-9 w-9 rounded-full bg-neutral-bg-light hover:bg-neutral-gray-light flex items-center justify-center cursor-pointer shrink-0">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <CollapsibleSection title="Innovation Identity" icon={<IdCard className="h-5 w-5 text-brand-red-600" />} defaultOpen>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <Image src={inn.logo} alt={inn.name} width={72} height={72} className="rounded-xl object-cover border border-neutral-gray-light shrink-0 w-20 h-20" />
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-neutral-black">{inn.name}</h3>
                  <p className="text-xs text-neutral-gray-medium mt-1">{inn.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-semibold">{inn.field}</span>
                    <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[11px] font-semibold">{inn.stage}</span>
                    <span className="px-2 py-0.5 rounded-full bg-white border border-neutral-gray-light text-neutral-gray-dark text-[11px]">{inn.ownership}</span>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-gray-light">
                <Field label="Country" value={inn.country} />
                <Field label="Submitted On" value={`${submission.submittedOn} ${submission.submittedTime}`} />
                <Field label="ID Tag" value={inn.idTag} />
                <Field label="Status" value={submission.status} />
                <Field label="Submitted By" value={`${submission.submitter.name} (${submission.submitter.email})`} />
                <Field label="Published By" value={submission.publishedBy ? `${submission.publishedBy.name} · ${submission.publishedBy.date}` : '—'} />
              </div>

              <div>
                <p className="text-xs font-bold text-neutral-gray-medium uppercase mb-1">Short Bio / Description</p>
                <p className="text-sm text-neutral-gray-dark leading-relaxed">{inn.description}</p>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Innovation Details" icon={<Lightbulb className="h-5 w-5 text-brand-red-600" />} defaultOpen>
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Innovation Field" value={inn.field} />
                <Field label="Ownership" value={inn.ownership} />
                <Field label="Stage" value={inn.stage} />
              </div>

              <div>
                <SubHeading icon={Info}>Interests</SubHeading>
                <Chips items={inn.interests} tone="px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-medium text-amber-700" />
              </div>

              <div>
                <SubHeading icon={Award}>SDGs</SubHeading>
                <Chips items={inn.sdgs} tone="px-2 py-1 rounded-full bg-green-50 border border-green-200 text-xs font-medium text-green-700" />
              </div>

              <div className="rounded-xl border border-neutral-gray-light bg-white p-4 space-y-3">
                <SubHeading icon={Wrench}>Specifications</SubHeading>
                <Field label="Specification" value={inn.specification} />
                <div>
                  <p className="text-[11px] font-semibold text-neutral-gray-medium uppercase mb-1">Materials Used</p>
                  <Chips items={inn.materials} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Dimensions" value={inn.dimensions} />
                  <Field label="Weight" value={inn.weight} />
                </div>
              </div>

              <div>
                <SubHeading icon={Users}>User Groups</SubHeading>
                <Chips items={inn.userGroups} tone="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-medium text-blue-700" />
              </div>

              <div>
                <SubHeading icon={FileText}>Applications</SubHeading>
                <Bullets items={inn.applications} />
              </div>

              <div>
                <SubHeading icon={Lightbulb}>Impact</SubHeading>
                <Bullets items={inn.impact} />
              </div>

              <div>
                <SubHeading icon={BadgeCheck}>Recommendations</SubHeading>
                <Bullets items={inn.recommendations} />
              </div>

              <div>
                <SubHeading icon={AlertTriangle}>Cautions</SubHeading>
                <Bullets items={inn.cautions} />
              </div>

              <div>
                <SubHeading icon={ScrollText}>Licenses &amp; Certifications</SubHeading>
                <DocList docs={inn.licenses} />
              </div>

              <div>
                <SubHeading icon={Award}>Honorary Awards</SubHeading>
                <DocList docs={inn.awards} />
              </div>

              <div>
                <SubHeading icon={Camera}>Media Gallery</SubHeading>
                {inn.gallery.length === 0 ? (
                  <p className="text-sm text-neutral-gray-medium">No media uploaded.</p>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-3">
                    {inn.gallery.map((g, i) => (
                      <div key={i} className="rounded-xl border border-neutral-gray-light overflow-hidden bg-neutral-bg-light">
                        <div className="relative h-32">
                          <Image src={g.url} alt={g.caption} fill className="object-cover" sizes="300px" />
                        </div>
                        <p className="text-xs text-neutral-gray-dark p-2">{g.caption} &middot; {g.category}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Innovator's Information" icon={<User className="h-5 w-5 text-brand-red-600" />} defaultOpen>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-neutral-gray-light">
                <Image src={submission.submitter.avatar} alt={submission.innovator.name} width={48} height={48} className="rounded-full object-cover" />
                <div>
                  <p className="text-sm font-bold text-neutral-black">{submission.innovator.name}</p>
                  <p className="text-xs text-neutral-gray-medium">{submission.innovator.email}</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Innovator Name" value={submission.innovator.name} />
                <Field label="Phone" value={submission.innovator.phone} />
                <Field label="Alternative Phone" value={submission.innovator.altPhone} />
                <Field label="Email" value={submission.innovator.email} />
                <Field label="Website" value={submission.innovator.website} />
                <Field label="Social Links" value={socialEntries.map(([k, v]) => `${k}: ${v}`).join('  ·  ')} />
              </div>
              <Field label="Bio" value={submission.innovator.bio} />
            </div>
          </CollapsibleSection>
        </div>

        <div className="px-6 py-4 bg-white rounded-b-2xl border-t border-neutral-gray-light flex items-center justify-between shrink-0 gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-xl border border-neutral-gray-light text-xs font-semibold hover:bg-neutral-bg-light cursor-pointer">Close</button>
          <div className="flex gap-2">
            {submission.status === 'Pending Review' ? (
              <>
                <button onClick={() => { onReject(submission.id); onClose(); }} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-50 text-red-600 border border-red-200 text-xs font-semibold hover:bg-red-100 cursor-pointer">
                  <XCircle className="h-4 w-4" /> Reject
                </button>
                <button onClick={() => { onApprove(submission.id); onClose(); }} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 cursor-pointer">
                  <CheckCircle className="h-4 w-4" /> Approve
                </button>
              </>
            ) : (
              <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${submission.status === 'Published' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>{submission.status}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
