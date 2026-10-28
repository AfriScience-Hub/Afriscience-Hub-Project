'use client';

import React from 'react';
import Image from 'next/image';
import {
  Ban, Calendar, ExternalLink, IdCard, Link2, Mail, MapPin,
  Phone, School, Trophy, UserRound, Users,
} from 'lucide-react';
import type { CompetitionSubmission, SocialHandle } from '../../data';

function SectionCard({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-neutral-gray-light bg-white p-4 space-y-3">
      <h3 className="text-xs font-bold text-neutral-black flex items-center gap-1.5">
        <Icon className="h-4 w-4 text-neutral-gray-medium" /> {title}
      </h3>
      {children}
    </div>
  );
}

function Detail({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value?: string | null }) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="h-4 w-4 text-neutral-gray-medium mt-0.5 flex-shrink-0" />
      <div className="min-w-0">
        <p className="text-[10px] text-neutral-gray-medium">{label}</p>
        <p className="text-xs font-medium text-neutral-black break-words">{value || '—'}</p>
      </div>
    </div>
  );
}

function socialHref({ platform, handle }: SocialHandle): string | null {
  const raw = handle.trim();
  if (!raw) return null;
  if (/^https?:\/\//i.test(raw)) return raw;
  if (/^[\w-]+(\.[\w-]+)+/i.test(raw)) return `https://${raw}`;

  const clean = raw.replace(/^@/, '');
  switch (platform.toLowerCase()) {
    case 'instagram': return `https://instagram.com/${clean}`;
    case 'facebook': return `https://facebook.com/${clean}`;
    case 'linkedin': return `https://linkedin.com/in/${clean}`;
    case 'whatsapp': return `https://wa.me/${clean.replace(/\D/g, '')}`;
    case 'x':
    case 'twitter': return `https://x.com/${clean}`;
    default: return null;
  }
}

function SocialLinks({ handles }: { handles?: SocialHandle[] }) {
  if (!handles || handles.length === 0) return <p className="text-xs text-neutral-gray-medium">No social handles provided.</p>;
  return (
    <div className="flex flex-wrap gap-2">
      {handles.map((social) => {
        const href = socialHref(social);
        const content = (
          <>
            <span className="font-semibold">{social.platform}</span>
            <span>{social.handle}</span>
            {href && <ExternalLink className="h-3 w-3" />}
          </>
        );
        return href ? (
          <a
            key={`${social.platform}-${social.handle}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-neutral-gray-light bg-neutral-bg-light text-[11px] text-neutral-gray-dark hover:text-neutral-black hover:bg-neutral-bg-light/80"
          >
            {content}
          </a>
        ) : (
          <span key={`${social.platform}-${social.handle}`} className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-neutral-gray-light bg-neutral-bg-light text-[11px] text-neutral-gray-dark">
            {content}
          </span>
        );
      })}
    </div>
  );
}

function DocumentPreview({ title, type, src }: { title: string; type?: string | null; src?: string | null }) {
  if (!src) return null;
  return (
    <div className="rounded-xl border border-neutral-gray-light overflow-hidden">
      <div className="relative w-full aspect-video bg-neutral-bg-light">
        <Image src={src} alt={title} fill sizes="(max-width: 768px) 100vw, 640px" className="object-contain" />
      </div>
      <div className="px-3 py-2 flex items-center justify-between gap-2 border-t border-neutral-gray-light">
        <div>
          <p className="text-xs font-semibold text-neutral-black">{title}</p>
          <p className="text-[10px] text-neutral-gray-medium">{type || 'Identification document'}</p>
        </div>
        <a href={src} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11px] font-medium text-[#453DD8] hover:underline whitespace-nowrap">
          Open <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}

/**
 * Applicant details for the View Details page. Work media and scoring live
 * on the separate View Work & Score page.
 */
export default function SubmissionDetails({ submission }: { submission: CompetitionSubmission }) {
  const isPresentation = submission.type === 'Afri-Presentations';

  return (
    <div className="p-5 space-y-5">
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="flex-shrink-0">
          <div className="relative h-20 w-20 rounded-2xl overflow-hidden bg-neutral-bg-light border border-neutral-gray-light">
            <Image src={submission.avatar} alt={submission.participant} fill sizes="80px" className="object-cover" />
          </div>
          <p className="text-[10px] text-neutral-gray-medium text-center mt-1">Profile picture</p>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-bold text-neutral-black">{submission.participant}</h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 text-indigo-700">{submission.idTag}</span>
            {submission.disqualified && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-red-50 text-red-600">
                <Ban className="h-3 w-3" /> Disqualified
              </span>
            )}
          </div>
          <p className="text-[11px] text-neutral-gray-medium mt-1">
            {submission.type} &middot; {submission.category} &middot; {submission.country}
          </p>
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-3 mt-4">
            <Detail icon={Mail} label="Email" value={submission.email} />
            <Detail icon={Phone} label="Contact" value={submission.contact} />
            <Detail icon={Trophy} label="Competition" value={submission.competition} />
            <Detail icon={Calendar} label="Submitted" value={`${submission.submittedOn} at ${submission.submittedTime}`} />
          </div>
        </div>
      </div>

      <SectionCard title="Profile & Social Handles" icon={Link2}>
        <div className="grid sm:grid-cols-2 gap-4">
          <Detail icon={UserRound} label="Name" value={submission.participant} />
          <Detail icon={IdCard} label="ID Tag" value={submission.idTag} />
        </div>
        <div className="pt-3 border-t border-neutral-gray-light">
          <p className="text-[10px] font-medium text-neutral-gray-medium mb-2">Social Handles</p>
          <SocialLinks handles={submission.socialHandles} />
        </div>
      </SectionCard>

      <SectionCard title="Identification" icon={IdCard}>
        <div className="grid sm:grid-cols-2 gap-4">
          <Detail icon={IdCard} label="ID Card Type" value={submission.idCardType} />
        </div>
        <DocumentPreview title="Contestant ID Document" type={submission.idCardType} src={submission.idCardImage} />
      </SectionCard>

      {isPresentation && (
        <>
          <SectionCard title="School / Institution" icon={School}>
            <div className="grid sm:grid-cols-2 gap-4">
              <Detail icon={School} label="Name of School / Institute" value={submission.schoolName} />
              <Detail icon={MapPin} label="School Address" value={submission.schoolAddress} />
            </div>
          </SectionCard>

          <SectionCard title="Parent / Guardian" icon={Users}>
            <div className="grid sm:grid-cols-2 gap-4">
              <Detail icon={UserRound} label="Name of Parent / Guardian" value={submission.guardianName} />
              <Detail icon={IdCard} label="Parent / Guardian ID Type" value={submission.guardianIdCardType} />
            </div>
            <div className="pt-3 border-t border-neutral-gray-light">
              <p className="text-[10px] font-medium text-neutral-gray-medium mb-2">Parent / Guardian Social Handles</p>
              <SocialLinks handles={submission.guardianSocialHandles} />
            </div>
            <DocumentPreview
              title="Parent / Guardian ID Document"
              type={submission.guardianIdCardType}
              src={submission.guardianIdCardImage}
            />
          </SectionCard>
        </>
      )}
    </div>
  );
}
