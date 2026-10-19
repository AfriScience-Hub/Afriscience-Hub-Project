'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Lightbulb, Wrench, Award, Users, ChevronRight, ThumbsUp, AlertTriangle,
  MessageCircle, ShieldCheck, Camera, Maximize2, FileText, Eye,
} from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { cn } from '@/lib/utils';
import { normalizeFileSrc } from '@/lib/files';
import SectionCard from './SectionCard';
import DocumentViewModal from './DocumentViewModal';

export type InnovationTab = 'overview' | 'awards' | 'media';

export interface MediaCategory {
  category: string;
  items: { type: 'image' | 'video'; url: string; caption: string }[];
}

/** A document opened in the full-screen viewer. */
interface OpenDocument {
  src: string;
  title: string;
  meta?: string;
}

/**
 * Thumbnail for an uploaded document. Award documents are often PDFs, so we
 * fall back to a document icon when the file is not a renderable image.
 */
function DocThumb({ src, alt }: { src: string; alt: string }) {
  const resolved = normalizeFileSrc(src);
  const isImage = resolved && /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(resolved);
  if (!isImage) {
    return (
      <div className="h-12 w-12 rounded-lg grid place-items-center bg-neutral-bg-light border border-neutral-gray-light flex-shrink-0">
        <FileText className="h-5 w-5 text-neutral-gray-medium" />
      </div>
    );
  }
  return (
    <Image
      src={resolved}
      alt={alt}
      width={48}
      height={48}
      className="rounded-lg object-cover flex-shrink-0"
      unoptimized={/^(data:|blob:)|X-Amz-/i.test(resolved)}
    />
  );
}

interface InnovationTabContentProps {
  innovation: any;
  activeTab: InnovationTab;
  mediaCategories: MediaCategory[];
  activeGalleryCategory: string;
  onSelectGalleryCategory: (category: string) => void;
  onPreview: (src: string, alt: string) => void;
  onMessageInnovator: () => void;
}

/**
 * The body of the innovation detail page - one panel per tab (Overview,
 * Awards & Certifications and Media & Gallery).
 */
export default function InnovationTabContent({
  innovation,
  activeTab,
  mediaCategories,
  activeGalleryCategory,
  onSelectGalleryCategory,
  onPreview,
  onMessageInnovator,
}: InnovationTabContentProps) {
  const [openDoc, setOpenDoc] = useState<OpenDocument | null>(null);
  const onOpenDocument = (doc: OpenDocument) => setOpenDoc(doc);

  return (
    <>
      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <SectionCard title="Description" icon={<Lightbulb className="h-5 w-5 text-brand-red-600" />}>
              <p className="text-sm text-neutral-gray-dark leading-relaxed">{innovation.description}</p>
            </SectionCard>
            <SectionCard title="Specifications" icon={<Wrench className="h-5 w-5 text-neutral-gray-dark" />}>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-bold text-neutral-gray-medium uppercase mb-2">Materials Used</p>
                  <div className="flex flex-wrap gap-2">
                    {innovation.specifications.materials.map((m: string) => (
                      <span key={m} className="px-2.5 py-1 rounded bg-neutral-bg-light border border-neutral-gray-light text-xs text-neutral-gray-dark">{m}</span>
                    ))}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 pt-3 border-t border-neutral-gray-light">
                  <div>
                    <p className="text-xs font-bold text-neutral-gray-medium uppercase mb-1">Dimensions (L x W x H)</p>
                    <p className="text-sm text-neutral-black font-medium">{innovation.specifications.dimensions}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-neutral-gray-medium uppercase mb-1">Weight</p>
                    <p className="text-sm text-neutral-black font-medium">{innovation.specifications.weight}</p>
                  </div>
                </div>
              </div>
            </SectionCard>
            <SectionCard title="SDGs Addressed" icon={<Award className="h-5 w-5 text-green-600" />}>
              <div className="flex flex-wrap gap-2">
                {innovation.sdgs.map((s: string) => (
                  <span key={s} className="px-2.5 py-1 rounded-full bg-green-50 border border-green-200 text-xs font-medium text-green-700">{s}</span>
                ))}
              </div>
            </SectionCard>
            <SectionCard title="User Groups" icon={<Users className="h-5 w-5 text-blue-600" />}>
              <div className="flex flex-wrap gap-2">
                {innovation.userGroups.map((g: string) => (
                  <span key={g} className="px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-medium text-blue-700">{g}</span>
                ))}
              </div>
            </SectionCard>
            <SectionCard title="Applications" icon={<Wrench className="h-5 w-5 text-blue-600" />}>
              <ul className="space-y-2">
                {innovation.applications.map((s: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-neutral-gray-dark">
                    <ChevronRight className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    {s}
                  </li>
                ))}
              </ul>
            </SectionCard>
            <SectionCard title="Impact" icon={<Lightbulb className="h-5 w-5 text-emerald-600" />}>
              <ul className="space-y-2">
                {innovation.impact.map((s: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-neutral-gray-dark">
                    <Lightbulb className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    {s}
                  </li>
                ))}
              </ul>
            </SectionCard>
            <SectionCard title="Recommendations" icon={<ThumbsUp className="h-5 w-5 text-emerald-600" />}>
              <ul className="space-y-2">
                {innovation.recommendations.map((r: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-neutral-gray-dark">
                    <ChevronRight className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    {r}
                  </li>
                ))}
              </ul>
            </SectionCard>
            <SectionCard title="Cautions" icon={<AlertTriangle className="h-5 w-5 text-amber-500" />}>
              <ul className="space-y-2">
                {innovation.cautions.map((c: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-neutral-gray-dark">
                    <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    {c}
                  </li>
                ))}
              </ul>
            </SectionCard>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm">
              <Button
                className="w-full bg-brand-red-600 hover:bg-brand-red-700"
                onClick={onMessageInnovator}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Message Innovator
              </Button>
            </div>
            <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm">
              <p className="text-xs font-bold text-neutral-gray-medium uppercase mb-3">Innovator</p>
              <div>
                <p className="text-base font-bold text-neutral-black">@{innovation.creatorUsername || '—'}</p>
                <p className="text-xs text-neutral-gray-medium mt-1">{innovation.country}</p>
              </div>
            </div>
            <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm">
              <p className="text-xs font-bold text-neutral-gray-medium uppercase mb-3">Dimensions</p>
              <div className="grid grid-cols-2 gap-3">
                {([
                  ['Length', innovation.dimensions.length],
                  ['Width', innovation.dimensions.width],
                  ['Height', innovation.dimensions.height],
                  ['Weight', innovation.dimensions.weight],
                ] as [string, string][]).map(([label, value]) => (
                  <div key={label} className="bg-neutral-bg-light rounded-lg p-3 text-center">
                    <p className="text-xs text-neutral-gray-medium">{label}</p>
                    <p className="font-bold text-neutral-black">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Awards Tab */}
      {activeTab === 'awards' && (
        <div className="grid lg:grid-cols-2 gap-6">
          <SectionCard title="Licenses & Certifications" icon={<ShieldCheck className="h-5 w-5 text-blue-600" />}>
            <div className="space-y-3">
              {innovation.licensesCertifications.map((lic: any, i: number) => (
                <div key={i} className="flex items-start justify-between gap-3 p-3 rounded-lg bg-blue-50/50 border border-blue-100">
                  <div className="flex items-start gap-3 min-w-0">
                    <ShieldCheck className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-neutral-black">{lic.name}</p>
                      <p className="text-xs text-neutral-gray-medium">{lic.issuer} &middot; {lic.year}</p>
                    </div>
                  </div>
                  {lic.file && (
                    <button
                      onClick={() => onOpenDocument({ src: lic.file, title: lic.name, meta: `${lic.issuer} · ${lic.year}` })}
                      className="flex-shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium text-[#453DD8] border border-[#453DD8]/20 hover:bg-[#453DD8]/10 transition-colors cursor-pointer"
                    >
                      <Eye className="h-3 w-3" /> View
                    </button>
                  )}
                </div>
              ))}
            </div>
          </SectionCard>
          <SectionCard title="Honorary Awards" icon={<Award className="h-5 w-5 text-amber-500" />}>
            <div className="space-y-3">
              {innovation.honoraryAwards.map((award: any, i: number) => (
                <div key={i} className="flex items-start justify-between gap-3 p-3 rounded-lg bg-amber-50/50 border border-amber-100">
                  <div className="flex items-center gap-3 min-w-0">
                    <DocThumb src={award.image} alt={award.title} />
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-neutral-black">{award.title}</p>
                      <p className="text-xs text-neutral-gray-medium">{award.organization} &middot; {award.year}</p>
                    </div>
                  </div>
                  {award.image && (
                    <button
                      onClick={() => onOpenDocument({ src: award.image, title: award.title, meta: `${award.organization} · ${award.year}` })}
                      className="flex-shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium text-[#453DD8] border border-[#453DD8]/20 hover:bg-[#453DD8]/10 transition-colors cursor-pointer"
                    >
                      <Eye className="h-3 w-3" /> View
                    </button>
                  )}
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      )}

      {/* Media Tab */}
      {activeTab === 'media' && (
        <div>
          <div className="flex flex-wrap gap-2 mb-6">
            {mediaCategories.map(cat => (
              <button
                key={cat.category}
                onClick={() => onSelectGalleryCategory(cat.category)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all border cursor-pointer",
                  (activeGalleryCategory === cat.category || (!activeGalleryCategory && cat === mediaCategories[0]))
                    ? "bg-brand-red-600 text-white border-brand-red-600"
                    : "bg-white text-neutral-gray-dark border-neutral-gray-light hover:border-brand-red-300"
                )}
              >
                <Camera className="h-3.5 w-3.5 inline mr-1" />
                {cat.category}
                <span className="ml-1.5 text-xs opacity-70">({cat.items.length})</span>
              </button>
            ))}
          </div>
          {mediaCategories.map(cat => {
            const isActive = activeGalleryCategory === cat.category || (!activeGalleryCategory && cat === mediaCategories[0]);
            if (!isActive) return null;
            return (
              <div key={cat.category} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {cat.items.map((item, i) => (
                  <div key={i} className="group relative rounded-xl overflow-hidden border border-neutral-gray-light bg-white shadow-sm cursor-pointer"
                    onClick={() => onPreview(item.url, item.caption)}
                  >
                    <div className="aspect-video relative overflow-hidden">
                      {item.type === 'video' ? (
                        <video src={item.url} controls className="h-full w-full object-cover" />
                      ) : (
                        <Image src={item.url} alt={item.caption} fill sizes="33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      )}
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <Maximize2 className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-neutral-gray-dark">{item.caption}</p>
                      <span className="text-[10px] uppercase text-neutral-gray-medium font-bold">{item.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
          {mediaCategories.every(cat => cat.items.length === 0) && (
            <p className="text-center text-neutral-gray-medium py-12">No media available yet.</p>
          )}
        </div>
      )}

      {openDoc && (
        <DocumentViewModal
          src={openDoc.src}
          title={openDoc.title}
          meta={openDoc.meta}
          onClose={() => setOpenDoc(null)}
        />
      )}
    </>
  );
}
