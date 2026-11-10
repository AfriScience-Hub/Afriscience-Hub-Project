'use client';

import Image from 'next/image';
import {
  X, IdCard, Microscope, MapPin, CheckCircle, XCircle, Award, Wrench, Clock,
} from 'lucide-react';
import CollapsibleSection from '@/app/dashboard/upload-new-listing/components/CollapsibleSection';
import type { AdminScientist, SubmissionStatus } from '../data';
import ScientistDocumentGallery from './ScientistDocumentGallery';

interface Props {
  scientist: AdminScientist | null;
  open: boolean;
  onClose: () => void;
  onApprove: (s: AdminScientist) => void;
  onReject: (s: AdminScientist) => void;
}

function Field({ label, value }: { label: string; value?: string | string[] }) {
  const text = Array.isArray(value) ? value.join(', ') : value;
  const shown = text != null && String(text).trim() ? String(text) : '—';
  return (
    <div>
      <p className="text-[11px] font-semibold text-neutral-gray-medium uppercase">{label}</p>
      <p className="text-sm text-neutral-black break-words whitespace-pre-wrap">{shown}</p>
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

function CostCard({ title, service, description, price }: {
  title: string;
  service?: string;
  description?: string;
  price: string;
}) {
  return (
    <div className="rounded-lg border border-neutral-gray-light p-3">
      <p className="text-sm font-semibold text-neutral-black">{title}</p>
      {service && <p className="mt-0.5 text-[11px] font-medium text-neutral-gray-dark">Service: {service}</p>}
      {description && <p className="mt-0.5 text-xs text-neutral-gray-medium">{description}</p>}
      <p className="mt-1 text-xs font-medium text-neutral-black">{price}</p>
    </div>
  );
}

function SubHeading({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) {
  return (
    <p className="text-sm font-bold text-neutral-black mb-2 flex items-center gap-1.5">
      <Icon className="h-4 w-4 text-neutral-gray-medium" /> {children}
    </p>
  );
}

function formatTime(value: string): string {
  if (!value) return '';
  if (/am|pm/i.test(value)) return value;
  const [hourRaw, minuteRaw] = value.split(':');
  const hour = Number(hourRaw);
  if (!Number.isFinite(hour)) return value;
  const suffix = hour >= 12 ? 'PM' : 'AM';
  return `${hour % 12 || 12}:${(minuteRaw ?? '00').slice(0, 2)} ${suffix}`;
}

const STATUS_TONE: Record<SubmissionStatus, string> = {
  'Pending Review': 'bg-amber-50 text-amber-700',
  Approved: 'bg-emerald-50 text-emerald-700',
  Rejected: 'bg-red-50 text-red-700',
  Published: 'bg-emerald-50 text-emerald-700',
};

/**
 * Full record for one scientist or technologist, shown when a table row is
 * clicked. The profile and document sections mirror the user-side preview.
 */
export default function ScientistDetailModal({ scientist, open, onClose, onApprove, onReject }: Props) {
  if (!open || !scientist) return null;

  const isPending = scientist.status === 'Pending Review';
  const isPublished = scientist.listingStatus === 'Published';
  const canReject = isPending && !isPublished;
  const socials = scientist.socials ?? [];
  const highlights = scientist.highlights;
  const showHighlights = highlights && (
    highlights.responseTime || highlights.workDays.length || highlights.startHours || highlights.endHours
  );
  const certificateItems = [
    ...(scientist.degreeDocument
      ? [{ id: 'degree-document', name: 'Degree Certificate', document: scientist.degreeDocument }]
      : []),
    ...scientist.certifications.map((c, index) => ({
      id: `certificate-${index}`,
      name: c.name,
      issuer: c.issuer,
      year: c.year,
      document: c.document,
    })),
  ];
  const achievementItems = scientist.achievements.map((a, index) => ({
    id: `achievement-${index}`,
    name: a.title,
    issuer: a.issuer,
    year: a.year,
    document: a.document,
  }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-neutral-bg-light rounded-2xl shadow-2xl w-full max-w-4xl my-8 flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 bg-white rounded-t-2xl border-b border-neutral-gray-light flex items-center justify-between gap-3 shrink-0">
          <div className="min-w-0">
            <h2 className="text-base font-bold text-neutral-black truncate">{scientist.name}</h2>
            <p className="text-xs text-neutral-gray-medium">
              {scientist.title} &middot; Submitted on {scientist.submittedOn} {scientist.submittedTime}
            </p>
          </div>
          <button onClick={onClose} className="h-9 w-9 rounded-full bg-neutral-bg-light hover:bg-neutral-gray-light flex items-center justify-center cursor-pointer shrink-0">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <CollapsibleSection title="Scientist Identity" icon={<IdCard className="h-5 w-5 text-brand-red-600" />} defaultOpen>
            <div className="space-y-4">
              {(scientist.profileImage || scientist.backgroundImage) && (
                <div className="overflow-hidden rounded-xl border border-neutral-gray-light">
                  {scientist.backgroundImage && (
                    <div className="relative h-36 w-full">
                      <Image src={scientist.backgroundImage} alt="Background" fill sizes="100vw" className="object-cover" />
                    </div>
                  )}
                  {scientist.profileImage && (
                    <div className="relative -mt-10 ml-4 h-20 w-20 overflow-hidden rounded-full border-2 border-white">
                      <Image src={scientist.profileImage} alt={scientist.name} fill sizes="80px" className="object-cover" />
                    </div>
                  )}
                </div>
              )}

              <div className="min-w-0">
                <h3 className="text-sm font-bold text-neutral-black">{scientist.name}</h3>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-semibold">{scientist.field}</span>
                  <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[11px] font-semibold">{scientist.degrees.join(' · ') || '—'}</span>
                  <span className="px-2 py-0.5 rounded-full bg-white border border-neutral-gray-light text-neutral-gray-dark text-[11px]">{scientist.location}</span>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-gray-light">
                <Field label="Field" value={scientist.field} />
                <Field label="Title" value={scientist.title} />
                <Field label="Professions" value={scientist.professions} />
                <Field label="Degrees" value={scientist.degrees} />
                <Field label="Country" value={scientist.country} />
                <Field label="City" value={scientist.city} />
                <Field label="Submitted On" value={`${scientist.submittedOn} ${scientist.submittedTime}`} />
                <Field label="Listing Status" value={isPublished ? 'Live' : scientist.listingStatus} />
                <Field label="Verification" value={scientist.verification} />
                <Field label="Workflow Status" value={scientist.status} />
                {scientist.reason && (
                  <div className="sm:col-span-2">
                    <Field label="Reason for Rejection" value={scientist.reason} />
                  </div>
                )}
                <Field label="Submitted By" value={scientist.submittedBy} />
                <Field label="Submitter E-mail" value={scientist.submitterEmail} />
              </div>

              <div className="pt-2">
                <p className="text-[11px] font-semibold text-neutral-gray-medium uppercase mb-1">Short Bio</p>
                <p className="text-sm text-neutral-gray-dark leading-relaxed whitespace-pre-wrap">{scientist.bio || '—'}</p>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Professional Details" icon={<Microscope className="h-5 w-5 text-brand-red-600" />} defaultOpen>
            <div className="space-y-5">
              <div>
                <SubHeading icon={Microscope}>Professions</SubHeading>
                <Chips items={scientist.professions} tone="px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-medium text-amber-700" />
              </div>

              <div>
                <SubHeading icon={Wrench}>Services</SubHeading>
                <Chips items={scientist.services} tone="px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-medium text-blue-700" />
              </div>

              <div>
                <SubHeading icon={Microscope}>Specialized Scopes</SubHeading>
                <Bullets items={scientist.scopes} />
              </div>

              <div className="space-y-3">
                <SubHeading icon={Wrench}>Service Fees</SubHeading>
                {scientist.serviceCost.length === 0 ? (
                  <p className="text-sm text-neutral-gray-medium">—</p>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-3">
                    {scientist.serviceCost.map((s, index) => {
                      const currency = s.currency || 'USD';
                      const price = s.min
                        ? `Min ${currency} ${s.min}${s.max ? ` · Max ${currency} ${s.max}` : ''}`
                        : s.range;
                      return (
                        <CostCard
                          key={`${s.service}-${index}`}
                          title={s.service}
                          description={s.description}
                          price={price}
                        />
                      );
                    })}
                  </div>
                )}
              </div>

              {scientist.otherFees.length > 0 && (
                <div className="space-y-3">
                  <SubHeading icon={Wrench}>Other Charges</SubHeading>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {scientist.otherFees.map((f, index) => {
                      const currency = f.currency || 'USD';
                      const price = f.min
                        ? `Min ${currency} ${f.min}${f.max ? ` · Max ${currency} ${f.max}` : ''}`
                        : f.amount;
                      return (
                        <CostCard
                          key={`${f.name}-${index}`}
                          title={f.name}
                          service={f.service}
                          description={f.description}
                          price={price}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              <div>
                <SubHeading icon={Award}>Certificates</SubHeading>
                <ScientistDocumentGallery items={certificateItems} />
              </div>

              <div>
                <SubHeading icon={Award}>Achievements</SubHeading>
                <ScientistDocumentGallery items={achievementItems} />
              </div>

              {showHighlights && highlights && (
                <div className="rounded-xl border border-neutral-gray-light bg-white p-4">
                  <SubHeading icon={Clock}>Professional Highlight</SubHeading>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <Field label="Response Time" value={highlights.responseTime} />
                    <Field label="Work Days" value={highlights.workDays} />
                    <Field
                      label="Work Hours"
                      value={[formatTime(highlights.startHours), formatTime(highlights.endHours)].filter(Boolean).join(' – ')}
                    />
                  </div>
                </div>
              )}

              <div>
                <SubHeading icon={Microscope}>Engagement Policies</SubHeading>
                <Bullets items={scientist.policies} />
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Social & Location" icon={<MapPin className="h-5 w-5 text-brand-navy-900" />} defaultOpen>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Location" value={scientist.location} />
              {socials.length === 0 ? (
                <Field label="Social Handles" value="" />
              ) : (
                socials.map((social, idx) => (
                  <div key={`${social.platform}-${idx}`}>
                    <p className="text-[11px] font-semibold text-neutral-gray-medium uppercase">{social.platform}</p>
                    <a href={social.link} target="_blank" rel="noreferrer" className="text-sm text-brand-red-600 hover:underline break-all">
                      {social.link}
                    </a>
                  </div>
                ))
              )}
            </div>
          </CollapsibleSection>
        </div>

        <div className="px-6 py-4 bg-white rounded-b-2xl border-t border-neutral-gray-light flex items-center justify-between shrink-0 gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-xl border border-neutral-gray-light text-xs font-semibold hover:bg-neutral-bg-light cursor-pointer">Close</button>
          <div className="flex gap-2">
            {canReject ? (
              <>
                <button
                  onClick={() => { onReject(scientist); onClose(); }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-50 text-red-600 border border-red-200 text-xs font-semibold hover:bg-red-100 cursor-pointer"
                >
                  <XCircle className="h-4 w-4" /> Reject
                </button>
                <button
                  onClick={() => { onApprove(scientist); onClose(); }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 cursor-pointer"
                >
                  <CheckCircle className="h-4 w-4" /> Approve
                </button>
              </>
            ) : (
              <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${STATUS_TONE[scientist.status]}`}>{scientist.status}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
