'use client';

import Image from 'next/image';
import { X, Lightbulb, User, IdCard, CheckCircle, XCircle, Calendar, MapPin, Wrench, Camera, Award, Users, FileText } from 'lucide-react';
import type { SubmissionRecord } from '../data';
import CollapsibleSection from '@/app/dashboard/upload-new-listing/components/CollapsibleSection';

export default function SubmissionDetailModal({
  submission,
  open,
  onClose,
  onApprove,
  onReject,
}: {
  submission: SubmissionRecord | null;
  open: boolean;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}) {
  if (!open || !submission) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-neutral-bg-light rounded-2xl shadow-2xl w-full max-w-4xl my-8 flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 bg-white rounded-t-2xl border-b border-neutral-gray-light flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-base font-bold text-neutral-black">{submission.innovation.name}</h2>
            <p className="text-xs text-neutral-gray-medium">{submission.innovation.idTag} · Submitted on {submission.submittedOn} {submission.submittedTime}</p>
          </div>
          <button onClick={onClose} className="h-9 w-9 rounded-full bg-neutral-bg-light hover:bg-neutral-gray-light flex items-center justify-center cursor-pointer">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <CollapsibleSection title="Innovation Identity" icon={<IdCard className="h-5 w-5 text-brand-red-600" />} defaultOpen>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <Image src={submission.innovation.logo} alt={submission.innovation.name} width={64} height={64} className="rounded-xl object-cover border border-neutral-gray-light shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-neutral-black">{submission.innovation.name}</h3>
                  <p className="text-xs text-neutral-gray-medium mt-1">{submission.innovation.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-semibold">{submission.innovation.field}</span>
                    <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[11px] font-semibold">{submission.innovation.stage}</span>
                    <span className="px-2 py-0.5 rounded-full bg-white border border-neutral-gray-light text-neutral-gray-dark text-[11px]">{submission.innovation.ownership}</span>
                  </div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-gray-light">
                <Detail label="Country" value={submission.innovation.country} icon={MapPin} />
                <Detail label="Submitted On" value={`${submission.submittedOn} ${submission.submittedTime}`} icon={Calendar} />
                <Detail label="ID Tag" value={submission.innovation.idTag} mono />
                <Detail label="Status" value={submission.status} highlight={submission.status === 'Published'} />
              </div>
              <div>
                <p className="text-xs font-bold text-neutral-gray-medium uppercase mb-1">Bio / Abstract</p>
                <p className="text-sm text-neutral-gray-dark leading-relaxed">{submission.innovation.description}</p>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Innovation Details" icon={<Lightbulb className="h-5 w-5 text-brand-red-600" />} defaultOpen>
            <div className="space-y-5">
              <div>
                <p className="text-xs font-bold text-neutral-black mb-2 flex items-center gap-1"><Wrench className="h-4 w-4 text-neutral-gray-medium" /> Specifications</p>
                <div className="flex flex-wrap gap-1.5">
                  {submission.innovation.materials.map((m) => (
                    <span key={m} className="px-2.5 py-1 rounded bg-neutral-bg-light border border-neutral-gray-light text-xs">{m}</span>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3 mt-3 text-xs">
                  <div><p className="text-neutral-gray-medium">Dimensions</p><p className="font-semibold text-neutral-black">{submission.innovation.dimensions}</p></div>
                  <div><p className="text-neutral-gray-medium">Weight</p><p className="font-semibold text-neutral-black">{submission.innovation.weight}</p></div>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-neutral-black mb-2 flex items-center gap-1"><Award className="h-4 w-4 text-green-600" /> SDGs</p>
                <div className="flex flex-wrap gap-1.5">
                  {submission.innovation.sdgs.map((s) => (
                    <span key={s} className="px-2 py-1 rounded-full bg-green-50 border border-green-200 text-xs font-medium text-green-700">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-neutral-black mb-2 flex items-center gap-1"><Users className="h-4 w-4 text-blue-600" /> User Groups</p>
                <div className="flex flex-wrap gap-1.5">
                  {submission.innovation.userGroups.map((g) => (
                    <span key={g} className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-medium text-blue-700">{g}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-neutral-black mb-1 flex items-center gap-1"><FileText className="h-4 w-4 text-blue-600" /> Applications</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-neutral-gray-dark">
                  {submission.innovation.applications.map((a, i) => <li key={i}>{a}</li>)}
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold text-neutral-black mb-1 flex items-center gap-1"><Lightbulb className="h-4 w-4 text-emerald-600" /> Impact</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-neutral-gray-dark">
                  {submission.innovation.impact.map((a, i) => <li key={i}>{a}</li>)}
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold text-neutral-black mb-2 flex items-center gap-1"><Camera className="h-4 w-4 text-neutral-gray-dark" /> Media Gallery</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {submission.innovation.gallery.length === 0 && <p className="text-xs text-neutral-gray-medium">No media.</p>}
                  {submission.innovation.gallery.map((g, i) => (
                    <div key={i} className="rounded-xl border border-neutral-gray-light overflow-hidden bg-neutral-bg-light">
                      <div className="relative h-32">
                        <Image src={g.url} alt={g.caption} fill className="object-cover" sizes="300px" />
                      </div>
                      <p className="text-xs text-neutral-gray-dark p-2">{g.caption} · {g.category}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Innovator's Information" icon={<User className="h-5 w-5 text-brand-red-600" />} defaultOpen>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-neutral-bg-light border border-neutral-gray-light">
                <Image src={submission.submitter.avatar} alt={submission.submitter.name} width={48} height={48} className="rounded-full object-cover" />
                <div>
                  <p className="text-sm font-bold text-neutral-black">{submission.submitter.name}</p>
                  <p className="text-xs text-neutral-gray-medium">{submission.submitter.email}</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <Detail label="Innovator Name" value={submission.innovator.name} icon={User} />
                <Detail label="Phone" value={submission.innovator.phone} />
                <Detail label="Email" value={submission.innovator.email} />
                <Detail label="Website" value={submission.innovator.website || '—'} />
              </div>
              {submission.innovator.bio && <p className="text-sm text-neutral-gray-dark leading-relaxed">{submission.innovator.bio}</p>}
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

function Detail({ label, value, icon: Icon, mono, highlight }: { label: string; value: string; icon?: React.ElementType; mono?: boolean; highlight?: boolean }) {
  return (
    <div>
      <p className="text-[11px] font-semibold text-neutral-gray-medium uppercase flex items-center gap-1">{Icon && <Icon className="h-3 w-3" />}{label}</p>
      <p className={`text-sm ${mono ? 'font-mono' : 'font-medium'} ${highlight ? 'text-emerald-700' : 'text-neutral-black'}`}>{value}</p>
    </div>
  );
}
