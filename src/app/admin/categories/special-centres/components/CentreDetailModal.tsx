'use client';

import Image from 'next/image';
import {
  X, IdCard, Microscope, MapPin, Pencil, CheckCircle, XCircle, EyeOff,
} from 'lucide-react';
import CollapsibleSection from '@/app/dashboard/upload-new-listing/components/CollapsibleSection';
import type { AdminCentre, SubmissionStatus } from '../data';

interface Props {
  centre: AdminCentre | null;
  open: boolean;
  onClose: () => void;
  onEdit: (c: AdminCentre) => void;
  onApprove: (c: AdminCentre) => void;
  onReject: (c: AdminCentre) => void;
  /** Optional publish toggle, supplied by the All Specialist Centres table. */
  onTogglePublish?: (c: AdminCentre) => void;
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

function SubHeading({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) {
  return (
    <p className="text-sm font-bold text-neutral-black mb-2 flex items-center gap-1.5">
      <Icon className="h-4 w-4 text-neutral-gray-medium" /> {children}
    </p>
  );
}

const STATUS_TONE: Record<SubmissionStatus, string> = {
  'Pending Review': 'bg-amber-50 text-amber-700',
  Approved: 'bg-emerald-50 text-emerald-700',
  Rejected: 'bg-red-50 text-red-700',
  Published: 'bg-emerald-50 text-emerald-700',
};

/**
 * Full record for one specialist centre, shown when a table row is clicked.
 * Laid out in the same collapsible sections the dashboard listing form uses.
 */
export default function CentreDetailModal({ centre, open, onClose, onEdit, onApprove, onReject, onTogglePublish }: Props) {
  if (!open || !centre) return null;

  const isPending = centre.status === 'Pending Review';
  const isPublished = centre.listingStatus === 'Published';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-neutral-bg-light rounded-2xl shadow-2xl w-full max-w-4xl my-8 flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 bg-white rounded-t-2xl border-b border-neutral-gray-light flex items-center justify-between gap-3 shrink-0">
          <div className="min-w-0">
            <h2 className="text-base font-bold text-neutral-black truncate">{centre.name}</h2>
            <p className="text-xs text-neutral-gray-medium">
              &ldquo;{centre.motto}&rdquo; &middot; Submitted on {centre.submittedOn} {centre.submittedTime}
            </p>
          </div>
          <button onClick={onClose} className="h-9 w-9 rounded-full bg-neutral-bg-light hover:bg-neutral-gray-light flex items-center justify-center cursor-pointer shrink-0">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <CollapsibleSection title="Centre Identity" icon={<IdCard className="h-5 w-5 text-brand-red-600" />} defaultOpen>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <Image
                  src={centre.image}
                  alt={centre.name}
                  width={72}
                  height={72}
                  sizes="80px"
                  className="rounded-xl object-cover border border-neutral-gray-light shrink-0 w-20 h-20"
                />
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-neutral-black">{centre.name}</h3>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-semibold">{centre.focusArea}</span>
                    <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[11px] font-semibold">{centre.ownership}</span>
                    <span className="px-2 py-0.5 rounded-full bg-white border border-neutral-gray-light text-neutral-gray-dark text-[11px]">{centre.city}, {centre.country}</span>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-gray-light">
                <Field label="Focus Area" value={centre.focusArea} />
                <Field label="Ownership" value={centre.ownership} />
                <Field label="Country" value={centre.country} />
                <Field label="City" value={centre.city} />
                <Field label="Address" value={centre.address} />
                <Field label="Submitted On" value={`${centre.submittedOn} ${centre.submittedTime}`} />
                <Field label="Listing Status" value={isPublished ? 'Published' : centre.listingStatus} />
                <Field label="Verification" value={centre.verification} />
                <Field label="Workflow Status" value={centre.status} />
                {centre.reason && (
                  <div className="sm:col-span-2">
                    <Field label="Reason for Rejection" value={centre.reason} />
                  </div>
                )}
                <Field label="Submitted By" value={centre.submittedBy} />
                <Field label="Submitter E-mail" value={centre.submitterEmail} />
              </div>

              <div className="pt-2">
                <p className="text-[11px] font-semibold text-neutral-gray-medium uppercase mb-1">Short Description</p>
                <p className="text-sm text-neutral-gray-dark leading-relaxed whitespace-pre-wrap">{centre.description}</p>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Centre Details" icon={<Microscope className="h-5 w-5 text-brand-red-600" />} defaultOpen>
            <div className="space-y-5">
              <div>
                <SubHeading icon={Microscope}>Categories</SubHeading>
                <Chips items={centre.categories} tone="px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-medium text-amber-700" />
              </div>

              <div>
                <SubHeading icon={Microscope}>Services</SubHeading>
                <Chips items={centre.services} tone="px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-medium text-blue-700" />
              </div>

              <div>
                <SubHeading icon={Microscope}>Specialized Scopes</SubHeading>
                <Bullets items={centre.scopes} />
              </div>

              <div>
                <SubHeading icon={Microscope}>Engagement Policies</SubHeading>
                <Bullets items={centre.policies} />
              </div>

              <div>
                <SubHeading icon={Microscope}>Licenses &amp; Certifications</SubHeading>
                <Bullets items={centre.certifications} />
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Contact Information" icon={<MapPin className="h-5 w-5 text-brand-navy-900" />} defaultOpen>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Phone" value={centre.phone} />
              <Field label="E-mail" value={centre.email} />
              <Field label="Website" value={centre.website} />
              <Field label="Address" value={`${centre.address}, ${centre.city}, ${centre.country}`} />
            </div>
          </CollapsibleSection>
        </div>

        <div className="px-6 py-4 bg-white rounded-b-2xl border-t border-neutral-gray-light flex items-center justify-between shrink-0 gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-xl border border-neutral-gray-light text-xs font-semibold hover:bg-neutral-bg-light cursor-pointer">Close</button>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(centre)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-neutral-gray-light text-xs font-semibold hover:bg-neutral-bg-light cursor-pointer"
            >
              <Pencil className="h-3.5 w-3.5" /> Edit
            </button>
            {isPending ? (
              <>
                <button
                  onClick={() => { onReject(centre); onClose(); }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-50 text-red-600 border border-red-200 text-xs font-semibold hover:bg-red-100 cursor-pointer"
                >
                  <XCircle className="h-4 w-4" /> Reject
                </button>
                <button
                  onClick={() => { onApprove(centre); onClose(); }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 cursor-pointer"
                >
                  <CheckCircle className="h-4 w-4" /> Approve
                </button>
              </>
            ) : (
              <>
                <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${STATUS_TONE[centre.status]}`}>{centre.status}</span>
                {onTogglePublish && (
                  <button
                    onClick={() => { onTogglePublish(centre); onClose(); }}
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
