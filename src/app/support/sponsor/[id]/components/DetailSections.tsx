'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FileText, ShieldCheck, Award, ImageIcon, MapPin, ShoppingBag, ExternalLink } from 'lucide-react';
import { MOCK_SPONSOR } from '../data';

export function AboutSection() {
  const s = MOCK_SPONSOR;
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light p-6">
      <h3 className="text-lg font-bold text-neutral-black mb-3">About</h3>
      <p className="text-neutral-gray-dark leading-relaxed">{s.description}</p>
    </div>
  );
}

export function CatalogSection() {
  const s = MOCK_SPONSOR;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light p-6">
      <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
        <ShoppingBag className="h-5 w-5 text-brand-red-600" />
        Products & Services Catalog
      </h3>

      <div className="grid gap-3 sm:grid-cols-2">
        {s.catalog.map((group) => (
          <Link
            key={group.industry}
            href={`/support/sponsor/catalog/${encodeURIComponent(group.industry)}`}
            className="flex items-center justify-between p-4 rounded-xl border border-neutral-gray-light bg-neutral-bg-light hover:border-brand-red-600 hover:bg-brand-red-50 transition-colors group"
          >
            <span className="font-semibold text-neutral-black group-hover:text-brand-red-600 transition-colors">
              {group.industry}
            </span>
            <ExternalLink className="h-4 w-4 text-neutral-gray-medium group-hover:text-brand-red-600 transition-colors flex-shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}

export function LicensesSection() {
  const s = MOCK_SPONSOR;
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light p-6">
      <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-brand-red-600" />
        Licenses & Certifications
      </h3>
      <div className="space-y-3">
        {s.licenses.map((license, idx) => (
          <div key={idx} className="flex items-start gap-3 p-3 bg-neutral-bg-light rounded-lg">
            <FileText className="h-5 w-5 text-brand-navy-900 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-neutral-black text-sm">{license.name}</h4>
              <p className="text-xs text-neutral-gray-medium">Issued by {license.issuer} &bull; {license.year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PoliciesSection() {
  const s = MOCK_SPONSOR;
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light p-6">
      <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
        <FileText className="h-5 w-5 text-brand-red-600" />
        Engagement Policies
      </h3>
      <ul className="space-y-2">
        {s.policies.map((policy, idx) => (
          <li key={idx} className="flex items-start gap-3 text-sm text-neutral-gray-dark">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-red-600 flex-shrink-0 mt-2" />
            {policy}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AwardsSection() {
  const s = MOCK_SPONSOR;
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light p-6">
      <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
        <Award className="h-5 w-5 text-amber-500" />
        Honorary Awards
      </h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {s.awards.map((award, idx) => (
          <div key={idx} className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-200">
            <Award className="h-8 w-8 text-amber-500 mb-2" />
            <h4 className="font-bold text-neutral-black text-sm mb-1">{award.title}</h4>
            <p className="text-xs text-neutral-gray-medium">{award.org}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MediaGallery({ onImageClick }: { onImageClick: (url: string) => void }) {
  const s = MOCK_SPONSOR;
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light p-6">
      <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
        <ImageIcon className="h-5 w-5 text-brand-red-600" />
        Media Gallery
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {s.mediaGallery.map((media, idx) => (
          <div key={idx} className="relative aspect-square rounded-lg overflow-hidden bg-neutral-bg-light group cursor-pointer">
            {media.type === 'image' ? (
              <Image
                src={media.url}
                alt={`Gallery ${idx + 1}`}
                fill
                className="object-cover group-hover:scale-110 transition-transform"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                onClick={() => onImageClick(media.url)}
              />
            ) : (
              <div className="relative w-full h-full">
                {media.thumbnail && <Image src={media.thumbnail} alt={`Video ${idx + 1}`} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <svg className="h-12 w-12 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function LocationMap() {
  const s = MOCK_SPONSOR;
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light p-6">
      <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
        <MapPin className="h-5 w-5 text-brand-red-600" />
        Location
      </h3>
      <div className="rounded-lg overflow-hidden h-80">
        <iframe
          src={s.contact.mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
