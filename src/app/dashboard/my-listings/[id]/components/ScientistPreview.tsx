'use client';

import Image from 'next/image';
import { User, FileText, DollarSign, Flag, ShieldCheck, Clock, Camera, Globe } from 'lucide-react';
import CollapsibleSection from '@/app/dashboard/upload-new-listing/components/CollapsibleSection';
import { normalizeFileSrc } from '@/lib/files';
import { formatAmountDisplay } from '@/lib/amounts';
import { pickValue, splitLines } from './previewUtils';
import ScientistDocumentGrid from './ScientistDocumentGrid';

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

/** Converts a 24-hour time ("15:30") into a 12-hour label ("3:30 PM"). */
function formatClock(value?: string): string {
  if (!value) return '';
  const [hourString, minute = '00'] = value.split(':');
  const hour = Number(hourString);
  if (!Number.isFinite(hour)) return value;
  const suffix = hour >= 12 ? 'PM' : 'AM';
  return `${hour % 12 || 12}:${minute} ${suffix}`;
}

const SOCIAL_BASES: Record<string, string> = {
  linkedin: 'https://www.linkedin.com/in/',
  twitter: 'https://twitter.com/',
  instagram: 'https://www.instagram.com/',
  facebook: 'https://www.facebook.com/',
};

/** Turns a handle or a bare domain into a clickable social profile link. */
function socialHref(platform: string, link: string): string {
  const value = link.trim();
  if (!value) return '';
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith('@')) {
    const base = SOCIAL_BASES[platform.trim().toLowerCase()] || 'https://';
    return `${base}${value.slice(1)}`;
  }
  return `https://${value.replace(/^\/+/, '')}`;
}

/** Read-only preview of a scientist/technologist listing. */
export default function ScientistPreview({ item }: { item: any }) {
  const profileImage = normalizeFileSrc(item.profileImage || item.image);
  const backgroundImage = normalizeFileSrc(item.backgroundImage || item.background);

  const fieldNames = (Array.isArray(item.fields) ? item.fields : [])
    .map((entry: any) => entry?.field || entry?.name || '')
    .filter(Boolean);
  const field = fieldNames.join(', ') || pickValue(item.field, ['name', 'title', 'value']) || item.fieldName || '';

  const professions = (Array.isArray(item.professions) ? item.professions : [])
    .map((entry: any) =>
      entry?.profession?.name ||
      (typeof entry?.profession === 'string' ? entry.profession : '') ||
      entry?.name ||
      (typeof entry === 'string' ? entry : ''),
    )
    .filter(Boolean);

  const services = (Array.isArray(item.services) ? item.services : [])
    .map((entry: any) => entry?.serviceOption?.name || entry?.service?.service || entry?.service || entry?.name || '')
    .filter(Boolean);

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
    ? `${formatClock(highlights.startHours)} – ${formatClock(highlights.endHours)}`
    : '';

  const listingName = item.name || 'Scientist';

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
                  <Image src={profileImage} alt={listingName} fill sizes="80px" className="object-cover" />
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
          <Field label="Field" value={field} />
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
          {serviceCosts.map((cost: any, index: number) => {
            const title = cost.name || cost.service?.service || cost.serviceOption?.name || `Service ${index + 1}`;
            const min = cost.minCost ?? cost.amount;
            const max = cost.maxCost;
            return (
              <div key={cost.id ?? index} className="rounded-lg border border-neutral-gray-light p-3">
                <p className="text-sm font-semibold text-neutral-black">{title}</p>
                {cost.description && <p className="mt-0.5 text-xs text-neutral-gray-medium">{cost.description}</p>}
                <p className="mt-1 text-xs text-neutral-black">
                  {cost.currency || 'USD'} {formatAmountDisplay(min)}
                  {max != null ? ` – ${formatAmountDisplay(max)}` : ''}
                </p>
              </div>
            );
          })}

          {otherCosts.length > 0 && (
            <div className="space-y-3">
              <p className="text-[11px] font-semibold uppercase text-neutral-gray-medium">Other charges</p>
              {otherCosts.map((cost: any, index: number) => {
                const min = cost.minCost ?? cost.amount;
                const max = cost.maxCost;
                return (
                  <div key={cost.id ?? index} className="rounded-lg border border-neutral-gray-light p-3">
                    <p className="text-sm font-semibold text-neutral-black">{cost.name || `Charge ${index + 1}`}</p>
                    {cost.description && <p className="mt-0.5 text-xs text-neutral-gray-medium">{cost.description}</p>}
                    <p className="mt-1 text-xs text-neutral-black">
                      {cost.currency || 'USD'} {formatAmountDisplay(min)}
                      {max != null ? ` – ${formatAmountDisplay(max)}` : ''}
                    </p>
                  </div>
                );
              })}
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
            <ScientistDocumentGrid items={certificates} />
          </div>
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase text-neutral-gray-medium">Achievements</p>
            <ScientistDocumentGrid items={achievements} />
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

      <CollapsibleSection title="Contact information" icon={<Globe className="h-5 w-5 text-brand-red-600" />} defaultOpen={false}>
        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-xl border border-neutral-gray-light bg-white p-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-red-50 text-lg font-bold text-brand-red-600">
              {(listingName || '?').charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-neutral-black">{listingName}</p>
              <p className="truncate text-xs text-neutral-gray-medium">
                {[item.country, item.state || item.stateRegion].filter(Boolean).join(', ') || '\u2014'}
              </p>
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-bold uppercase text-neutral-gray-medium">Social Media Handles</p>
            {socials.length === 0 ? (
              <p className="text-sm text-neutral-gray-medium">{'\u2014'}</p>
            ) : (
              <div className="space-y-2">
                {socials.map((social: any, index: number) => {
                  const platform = String(social.platform || '').trim();
                  const link = String(social.link || '').trim();
                  const href = socialHref(platform, link);
                  return (
                    <div key={`${platform}-${index}`} className="flex items-center gap-3 rounded-lg border border-neutral-gray-light bg-white p-3">
                      <Globe className="h-4 w-4 shrink-0 text-neutral-gray-medium" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-neutral-black">{platform || 'Social'}</p>
                        {href && (
                          <a href={href} target="_blank" rel="noopener noreferrer" className="block truncate text-xs text-blue-600 hover:underline">
                            {link}
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
}
