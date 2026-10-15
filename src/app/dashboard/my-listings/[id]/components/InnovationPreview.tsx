'use client';

import Image from 'next/image';
import {
  IdCard, Lightbulb, User, FileText, Award, Camera,
  Wrench, ScrollText, ShieldCheck, Globe,
} from 'lucide-react';
import CollapsibleSection from '@/app/dashboard/upload-new-listing/components/CollapsibleSection';
import { normalizeFileSrc } from '@/lib/files';
import { enumLabel, toStringArray, splitLines } from './previewUtils';

/* ------------------------------------------------------------------ */
/* Small presentational helpers                                        */
/* ------------------------------------------------------------------ */

function Field({ label, value }: { label: string; value?: string | null }) {
  const text = value != null && String(value).trim() ? String(value) : '\u2014';
  return (
    <div>
      <p className="text-[11px] font-semibold text-neutral-gray-medium uppercase">{label}</p>
      <p className="text-sm text-neutral-black break-words whitespace-pre-wrap">{text}</p>
    </div>
  );
}

function Chips({ items, tone }: { items: string[]; tone?: string }) {
  if (!items.length) return <p className="text-sm text-neutral-gray-medium">{'\u2014'}</p>;
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map(i => (
        <span key={i} className={tone ?? 'px-2.5 py-1 rounded-full bg-neutral-bg-light border border-neutral-gray-light text-xs text-neutral-gray-dark'}>
          {i}
        </span>
      ))}
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  if (!items.length) return <p className="text-sm text-neutral-gray-medium">{'\u2014'}</p>;
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-neutral-gray-dark">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red-600" />
          {item}
        </li>
      ))}
    </ul>
  );
}

interface DocEntry { title: string; issuer: string; year: string; file: string }

function DocList({ docs }: { docs: DocEntry[] }) {
  if (!docs.length) return <p className="text-sm text-neutral-gray-medium">None provided.</p>;
  return (
    <div className="space-y-2">
      {docs.map((d, i) => (
        <div key={i} className="flex items-center justify-between gap-3 rounded-lg border border-neutral-gray-light bg-white p-3">
          <div className="flex items-center gap-2 min-w-0">
            <FileText className="h-4 w-4 text-brand-red-600 shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-neutral-black truncate">{d.title}</p>
              <p className="text-[11px] text-neutral-gray-medium truncate">
                {d.issuer}{d.year ? ` \u00b7 ${d.year}` : ''}
              </p>
            </div>
          </div>
          {d.file && (
            <a
              href={normalizeFileSrc(d.file) || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-[11px] font-semibold text-blue-600 hover:underline"
            >
              View
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section sub-components (keeps the file under the 350-line limit)     */
/* ------------------------------------------------------------------ */

function IdentitySection({ item }: { item: any }) {
  const fields = toStringArray(item.fields, ['field', 'name', 'title', 'value']);
  const interests = toStringArray(item.interests, ['interest', 'name', 'title', 'value']);
  const userGroups = toStringArray(item.userGroups, ['userGroup', 'group', 'name', 'title', 'value']);

  return (
    <CollapsibleSection title="Innovation Identity" icon={<IdCard className="h-5 w-5 text-brand-red-600" />} defaultOpen>
      <div className="space-y-4">
        <div>
          <p className="text-[11px] font-semibold text-neutral-gray-medium uppercase mb-1.5">Fields</p>
          <Chips items={fields} tone="px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-medium text-blue-700" />
        </div>
        <div>
          <p className="text-[11px] font-semibold text-neutral-gray-medium uppercase mb-1.5">Interests</p>
          <Chips items={interests} tone="px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-medium text-amber-700" />
        </div>
        <div>
          <p className="text-[11px] font-semibold text-neutral-gray-medium uppercase mb-1.5">User Groups</p>
          <Bullets items={userGroups} />
        </div>
        <div className="grid gap-4 pt-4 border-t border-neutral-gray-light sm:grid-cols-2">
          <Field label="Country" value={item.country} />
          <Field label="Ownership" value={enumLabel(item.ownership)} />
          <Field label="Stage" value={enumLabel(item.stage)} />
          <Field label="Status" value={enumLabel(item.status)} />
        </div>
        <div className="pt-2">
          <p className="text-[11px] font-semibold text-neutral-gray-medium uppercase mb-1">Short Bio / Description</p>
          <p className="text-sm leading-relaxed text-neutral-gray-dark whitespace-pre-wrap">{item.shortDescription || '\u2014'}</p>
        </div>
      </div>
    </CollapsibleSection>
  );
}

function DetailsSection({ item }: { item: any }) {
  const sdgs = toStringArray(item.sdgs, ['sdg', 'name', 'title', 'value', 'goal']);
  const materials = Array.isArray(item.materialsUsed) ? item.materialsUsed : item.materialsUsed ? String(item.materialsUsed).split(', ').filter(Boolean) : [];
  const dims = [item.length, item.width, item.height].filter(v => v != null && v !== '').join(' \u00d7 ');
  const weight = [item.weight, item.weightUnit].filter(Boolean).join(' ');

  return (
    <CollapsibleSection title="Innovation Details" icon={<Lightbulb className="h-5 w-5 text-brand-red-600" />} defaultOpen={false}>
      <div className="space-y-5">
        <div>
          <p className="text-xs font-bold text-neutral-gray-medium uppercase mb-2">SDGs Addressed</p>
          <Chips items={sdgs} tone="px-2.5 py-1 rounded-full bg-green-50 border border-green-200 text-xs font-medium text-green-700" />
        </div>

        <div className="space-y-3 rounded-xl border border-neutral-gray-light bg-white p-4">
          <p className="flex items-center gap-1.5 text-xs font-bold text-neutral-gray-medium uppercase">
            <Wrench className="h-4 w-4" /> Specifications
          </p>
          <div>
            <p className="text-[11px] font-semibold text-neutral-gray-medium uppercase mb-1">Materials Used</p>
            <Chips items={materials} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Dimensions (L \u00d7 W \u00d7 H)" value={dims ? `${dims} ${item.dimensionUnit || ''}`.trim() : ''} />
            <Field label="Weight" value={weight} />
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-bold text-neutral-gray-medium uppercase">Applications</p>
          <Bullets items={splitLines(item.applications)} />
        </div>
        <div>
          <p className="mb-2 text-xs font-bold text-neutral-gray-medium uppercase">Impact</p>
          <Bullets items={splitLines(item.impact)} />
        </div>
        <div>
          <p className="mb-2 text-xs font-bold text-neutral-gray-medium uppercase">Recommendations</p>
          <Bullets items={splitLines(item.recommendations)} />
        </div>
        <div>
          <p className="mb-2 text-xs font-bold text-neutral-gray-medium uppercase">Cautions</p>
          <Bullets items={splitLines(item.cautions)} />
        </div>
      </div>
    </CollapsibleSection>
  );
}

function toDocEntries(docs: any[], type: string): DocEntry[] {
  return docs
    .filter(d => d.type === type)
    .map(d => ({
      title: d.documentTitle || '',
      issuer: d.issuer || '',
      year: d.year ? String(d.year) : '',
      file: d.documentFile || '',
    }));
}

function DocumentsMediaSection({ item }: { item: any }) {
  const docs = Array.isArray(item.documents) ? item.documents : [];
  const licenses = toDocEntries(docs, 'CERTIFICATION');
  const awards = toDocEntries(docs, 'AWARD');

  const media = (Array.isArray(item.media) ? item.media : [])
    .map((m: any) => ({
      category: enumLabel(m.category),
      url: normalizeFileSrc(m.mediaFile) || '',
    }))
    .filter((m: any) => m.url);

  // Group media by category label.
  const grouped: Record<string, { url: string }[]> = {};
  media.forEach((m: any) => {
    (grouped[m.category] = grouped[m.category] || []).push({ url: m.url });
  });

  return (
    <CollapsibleSection title="Documents & Media" icon={<ScrollText className="h-5 w-5 text-brand-red-600" />} defaultOpen={false}>
      <div className="space-y-5">
        <div>
          <p className="mb-2 flex items-center gap-1.5 text-xs font-bold text-neutral-gray-medium uppercase">
            <ShieldCheck className="h-4 w-4 text-blue-600" /> Licenses &amp; Certifications
          </p>
          <DocList docs={licenses} />
        </div>

        <div>
          <p className="mb-2 flex items-center gap-1.5 text-xs font-bold text-neutral-gray-medium uppercase">
            <Award className="h-4 w-4 text-amber-500" /> Honorary Awards
          </p>
          <DocList docs={awards} />
        </div>

        <div>
          <p className="mb-2 flex items-center gap-1.5 text-xs font-bold text-neutral-gray-medium uppercase">
            <Camera className="h-4 w-4 text-neutral-gray-medium" /> Media Gallery
          </p>
          {media.length === 0 ? (
            <p className="text-sm text-neutral-gray-medium">No media uploaded.</p>
          ) : (
            <div className="space-y-4">
              {Object.entries(grouped).map(([category, items]) => (
                <div key={category}>
                  <p className="mb-2 text-[11px] font-semibold text-neutral-gray-dark">{category}</p>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {items.map((m, i) => (
                      <div key={i} className="relative aspect-video overflow-hidden rounded-lg border border-neutral-gray-light bg-neutral-bg-light">
                        <Image src={m.url} alt={category} fill sizes="(max-width: 640px) 50vw, 33vw" className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </CollapsibleSection>
  );
}

function InnovatorSection({ item }: { item: any }) {
  const user = item.user || {};
  const socials = (Array.isArray(item.socials) ? item.socials : [])
    .map((s: any) => ({ platform: String(s.platform || '').trim(), link: String(s.link || '').trim() }))
    .filter((s: any) => s.platform || s.link);

  return (
    <CollapsibleSection title="Innovator's Information" icon={<User className="h-5 w-5 text-brand-red-600" />} defaultOpen={false}>
      <div className="space-y-4">
        <div className="flex items-center gap-3 rounded-xl border border-neutral-gray-light bg-white p-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-red-50 text-lg font-bold text-brand-red-600">
            {(user.fullName || '?').charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-neutral-black">{user.fullName || '\u2014'}</p>
            <p className="truncate text-xs text-neutral-gray-medium">{user.email || '\u2014'}</p>
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-bold text-neutral-gray-medium uppercase">Social Media Handles</p>
          {socials.length === 0 ? (
            <p className="text-sm text-neutral-gray-medium">{'\u2014'}</p>
          ) : (
            <div className="space-y-2">
              {socials.map((s: any, i: number) => (
                <div key={i} className="flex items-center gap-3 rounded-lg border border-neutral-gray-light bg-white p-3">
                  <Globe className="h-4 w-4 shrink-0 text-neutral-gray-medium" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-neutral-black">{s.platform}</p>
                    {s.link && (
                      <a href={s.link} target="_blank" rel="noopener noreferrer" className="block truncate text-xs text-blue-600 hover:underline">
                        {s.link}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </CollapsibleSection>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

export default function InnovationPreview({ item }: { item: any }) {
  const heroSrc = normalizeFileSrc(item.image);
  const statusTone =
    item.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-700'
    : item.status === 'REJECTED' ? 'bg-red-50 text-red-700'
    : 'bg-amber-50 text-amber-700';

  return (
    <div className="space-y-4">
      {heroSrc && (
        <div className="relative h-56 overflow-hidden rounded-xl border border-neutral-gray-light sm:h-72">
          <Image src={heroSrc} alt={item.innovationName || 'Innovation'} fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-lg font-bold text-white sm:text-xl">{item.innovationName}</h2>
            <p className="font-mono text-sm text-white/80">{item.idTag}</p>
          </div>
          <span className={`absolute top-3 right-3 rounded-full px-2.5 py-1 text-[11px] font-bold ${statusTone}`}>
            {enumLabel(item.status)}
          </span>
        </div>
      )}

      <IdentitySection item={item} />
      <DetailsSection item={item} />
      <DocumentsMediaSection item={item} />
      <InnovatorSection item={item} />
    </div>
  );
}
