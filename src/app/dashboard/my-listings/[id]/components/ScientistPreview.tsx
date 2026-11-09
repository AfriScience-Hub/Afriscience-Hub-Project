'use client';

import Image from 'next/image';
import { User, FileText, DollarSign, Flag, ShieldCheck, Clock, Camera, Phone } from 'lucide-react';
import CollapsibleSection from '@/app/dashboard/upload-new-listing/components/CollapsibleSection';
import { normalizeFileSrc } from '@/lib/files';
import { formatAmountDisplay } from '@/lib/utils';
import { pickValue, toStringArray, splitLines } from './previewUtils';

function Field({ label, value }: { label: string; value?: string | null }) {
  const text = value != null && String(value).trim() ? String(value) : '\u2014';
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase text-neutral-gray-medium">{label}</p>
      <p className="whitespace-pre-wrap break-words text-sm text-neutral-black">{text}</p>
    </div>
  );
}

function Chips({ items }: { items: string[] }) {
  if (!items.length) return <p className="text-sm text-neutral-gray-medium">\u2014</p>;
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item, index) => (
        <span key={`${item}-${index}`} className="rounded-full bg-brand-red-50 px-2.5 py-1 text-xs font-medium text-brand-red-700">
          {item}
        </span>
      ))}
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  if (!items.length) return <p className="text-sm text-neutral-gray-medium">\u2014</p>;
  return (
    <ul className="list-disc space-y-1 pl-5 text-sm text-neutral-black">
      {items.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}
    </ul>
  );
}

function mediaUrl(item: unknown): string {
  if (typeof item === 'string') return item;
  const record = item as Record<string, unknown> | null;
  return String(record?.mediaFile ?? record?.url ?? record?.file ?? '');
}

/** Read-only preview of a scientist/technologist listing. */
export default function ScientistPreview({ item }: { item: any }) {
  const profileImage = normalizeFileSrc(item.profileImage || item.image);
  const backgroundImage = normalizeFileSrc(item.backgroundImage || item.background);
  const professions = [
    ...toStringArray(item.professions, ['name', 'profession', 'title', 'value']),
    ...toStringArray(item.professionIds, ['name', 'professionId']),
  ];
  const services = [
    ...toStringArray(item.services, ['name', 'service', 'title', 'value']),
    ...toStringArray(item.serviceIds, ['name', 'serviceId']),
  ];
  const degrees = Array.isArray(item.degrees) ? item.degrees : [];
  const degree = degrees.length
    ? pickValue(degrees[0]?.degree ?? degrees[0], ['name', 'degree', 'title', 'value'])
    : pickValue(item.degree, ['name', 'title', 'value']);
  const serviceCosts = Array.isArray(item.serviceCosts) ? item.serviceCosts : [];
  const otherCosts = Array.isArray(item.otherCosts) ? item.otherCosts : [];
  const certificates = Array.isArray(item.certificates) ? item.certificates : [];
  const achievements = Array.isArray(item.achievements) ? item.achievements : [];
  const media = Array.isArray(item.media) ? item.media : [];
  const socials = Array.isArray(item.socials)
    ? item.socials
    : item.socials && typeof item.socials === 'object'
      ? Object.entries(item.socials).map(([platform, link]) => ({ platform, link }))
      : [];
  const highlights = item.highlights && typeof item.highlights === 'object' ? item.highlights : {};
  const workHours = highlights.startHours && highlights.endHours
    ? `${highlights.startHours} - ${highlights.endHours}`
    : '';

  return (
    <div className="space-y-5">
      <CollapsibleSection title="Basic profile" icon={<User className="h-5 w-5 text-brand-red-600" />} defaultOpen>
        <div className="space-y-4">
          {(profileImage || backgroundImage) && (
            <div className="overflow-hidden rounded-xl border border-neutral-gray-light">
              {backgroundImage && (
                <div className="relative h-36 w-full">
                  <Image src={backgroundImage} alt="Background" fill sizes="100vw" className="object-cover" />
                </div>
              )}
              {profileImage && (
                <div className="relative -mt-10 ml-4 h-20 w-20 overflow-hidden rounded-full border-2 border-white">
                  <Image src={profileImage} alt={item.name || 'Scientist'} fill sizes="80px" className="object-cover" />
                </div>
              )}
            </div>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" value={item.name} />
            <Field label="Country" value={item.country} />
            <Field label="State / Region" value={item.state || item.stateRegion} />
            <Field label="Status" value={item.status} />
          </div>
          <Field label="Bio" value={item.bio} />
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Professional details" icon={<FileText className="h-5 w-5 text-brand-red-600" />} defaultOpen={false}>
        <div className="space-y-4">
          <Field label="Field" value={pickValue(item.field, ['name', 'title', 'value']) || item.fieldName} />
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase text-neutral-gray-medium">Professions</p>
            <Chips items={professions} />
          </div>
          <Field label="Degree" value={degree} />
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase text-neutral-gray-medium">Services</p>
            <Chips items={services} />
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Service costs & other charges" icon={<DollarSign className="h-5 w-5 text-brand-red-600" />} defaultOpen={false}>
        <div className="space-y-4">
          {serviceCosts.length === 0 && <p className="text-sm text-neutral-gray-medium">No service costs provided.</p>}
          {serviceCosts.map((cost: any, index: number) => (
            <div key={cost.id ?? index} className="rounded-lg border border-neutral-gray-light p-3">
              <p className="text-sm font-semibold text-neutral-black">
                {pickValue(cost.service ?? cost.serviceOption, ['name', 'title']) || cost.serviceName || `Service ${index + 1}`}
              </p>
              {cost.description && <p className="text-xs text-neutral-gray-medium">{cost.description}</p>}
              <p className="mt-1 text-xs text-neutral-black">
                {cost.currency || 'USD'} {formatAmountDisplay(cost.minCost ?? cost.amount)}
                {cost.maxCost != null ? ` - ${formatAmountDisplay(cost.maxCost)}` : ''}
              </p>
            </div>
          ))}
          {otherCosts.length > 0 && (
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase text-neutral-gray-medium">Other charges</p>
              <Bullets items={otherCosts.map((cost: any) => `${cost.name || 'Charge'}${cost.description ? ` - ${cost.description}` : ''}${cost.amount != null ? ` (${formatAmountDisplay(cost.amount)})` : cost.minCost != null ? ` (${formatAmountDisplay(cost.minCost)}${cost.maxCost != null ? ` - ${formatAmountDisplay(cost.maxCost)}` : ''})` : ''}`)} />
            </div>
          )}
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Scopes & engagement policies" icon={<Flag className="h-5 w-5 text-brand-navy-900" />} defaultOpen={false}>
        <div className="space-y-4">
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase text-neutral-gray-medium">Scopes</p>
            <Bullets items={splitLines(item.scopes)} />
          </div>
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase text-neutral-gray-medium">Policies</p>
            <Bullets items={splitLines(item.policies)} />
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Certifications & achievements" icon={<ShieldCheck className="h-5 w-5 text-brand-navy-900" />} defaultOpen={false}>
        <div className="space-y-4">
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase text-neutral-gray-medium">Certificates</p>
            {certificates.length === 0 ? <p className="text-sm text-neutral-gray-medium">\u2014</p> : (
              <ul className="space-y-1 text-sm text-neutral-black">
                {certificates.map((cert: any, index: number) => (
                  <li key={cert.id ?? index}>
                    {cert.name || 'Certificate'}{cert.issuer ? ` - ${cert.issuer}` : ''}{cert.year ? ` (${cert.year})` : ''}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase text-neutral-gray-medium">Achievements</p>
            {achievements.length === 0 ? <p className="text-sm text-neutral-gray-medium">\u2014</p> : (
              <ul className="space-y-1 text-sm text-neutral-black">
                {achievements.map((award: any, index: number) => (
                  <li key={award.id ?? index}>
                    {award.name || 'Achievement'}{award.issuer ? ` - ${award.issuer}` : ''}{award.year ? ` (${award.year})` : ''}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Professional highlight" icon={<Clock className="h-5 w-5 text-brand-navy-900" />} defaultOpen={false}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Response time" value={highlights.responseTime || item.responseTime} />
          <Field label="Work days" value={splitLines(highlights.workDays || item.workDays).join(', ')} />
          <Field label="Work hours" value={workHours} />
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Media gallery" icon={<Camera className="h-5 w-5 text-brand-red-600" />} defaultOpen={false}>
        {media.length === 0 ? <p className="text-sm text-neutral-gray-medium">No media uploaded.</p> : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {media.map((entry: unknown, index: number) => {
              const src = normalizeFileSrc(mediaUrl(entry));
              if (!src) return null;
              return (
                <div key={index} className="relative aspect-square overflow-hidden rounded-lg border border-neutral-gray-light">
                  <Image src={src} alt={`Media ${index + 1}`} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover" />
                </div>
              );
            })}
          </div>
        )}
      </CollapsibleSection>

      <CollapsibleSection title="Contact information" icon={<Phone className="h-5 w-5 text-brand-red-600" />} defaultOpen={false}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Phone" value={item.phone} />
          <Field label="E-mail" value={item.email} />
          <Field label="Website" value={item.website} />
        </div>
        {socials.length > 0 && (
          <div className="mt-3">
            <p className="mb-2 text-[11px] font-semibold uppercase text-neutral-gray-medium">Social handles</p>
            <ul className="space-y-1 text-sm text-neutral-black">
              {socials.map((social: any, index: number) => (
                <li key={index}>{social.platform}: {social.link}</li>
              ))}
            </ul>
          </div>
        )}
      </CollapsibleSection>
    </div>
  );
}
