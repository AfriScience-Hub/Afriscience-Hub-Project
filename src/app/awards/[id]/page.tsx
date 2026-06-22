'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, MapPin, Calendar, Gift, Linkedin, Twitter, Instagram, Globe, Eye, Play, ZoomIn } from 'lucide-react';
import Link from 'next/link';
import { AWARD_WINNERS } from '@/app/data/mockData';
import { Button } from '@/app/components/ui/Button';
import { cn } from '@/lib/utils';
import { getTypeColor, getTypeIcon, getPositionStyle, getPositionLabel, usesMedal, shouldHideSocialHandles } from '@/app/awards/data';
import PreviewModal from '@/app/awards/components/PreviewModal';

export default function AwardDetail() {
  const { id } = useParams();
  const award = AWARD_WINNERS.find(a => a.id === id);
  const [preview, setPreview] = useState<{ title: string; url: string } | null>(null);

  if (!award) {
    return (
      <div className="min-h-screen bg-neutral-bg-light py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold">Award not found</h1>
          <Link href="/awards"><Button variant="outline" className="mt-4">Back to Awards</Button></Link>
        </div>
      </div>
    );
  }

  const isCompetition = award.type === 'Competitions Award';
  const TypeIcon = getTypeIcon(award.type);
  const isMedal = usesMedal(award.type);
  const hideSocial = shouldHideSocialHandles(award.category || '');
  const socialLinks = (award.socialLinks || {}) as Record<string, string | undefined>;

  return (
    <div className="min-h-screen bg-neutral-bg-light py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <Link href="/awards" className="inline-flex items-center gap-1 text-sm text-brand-red-600 hover:underline mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Awards
        </Link>

        <div className="rounded-2xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
          {/* Hero section */}
          <div className="relative h-64 bg-brand-navy-900">
            <Image src={award.image} alt={award.name} fill sizes="100vw" className="object-cover object-top opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end gap-4">
              <Image src={award.image} alt={award.name} width={80} height={80} className="rounded-xl object-cover border-2 border-white shadow-lg flex-shrink-0" />
              <div className="flex-1 text-white">
                <h1 className="text-2xl font-bold">{award.name}</h1>
                <div className="flex items-center gap-3 text-sm text-slate-200 mt-1">
                  <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold", getTypeColor(award.type))}>
                    <TypeIcon className="h-3 w-3" />{award.type}
                  </span>
                  {isCompetition && award.position && (
                    <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold", getPositionStyle(award.position))}>
                      {getPositionLabel(award.position)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Info row */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-gray-medium">
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{award.country}</span>
              <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{award.year}</span>
              {isCompetition && award.competition && (
                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs font-medium">{award.competition}</span>
              )}
              {isCompetition && award.category && (
                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs font-medium">{award.category}</span>
              )}
            </div>

            {/* Rewards */}
            <div>
              <h2 className="text-sm font-bold text-neutral-black uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Gift className="h-4 w-4 text-amber-500" /> Rewards
              </h2>
              <div className="flex flex-wrap gap-2">
                {award.rewards.map((r, i) => (
                  <span key={i} className="inline-flex items-center gap-1 text-xs bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full">
                    <Gift className="h-3 w-3" />{r}
                  </span>
                ))}
              </div>
            </div>

            {/* Badge/Medal & Certificate & Presentation Preview */}
            <div className="grid grid-cols-3 gap-4">
              {award.badgeImage && (
                <button onClick={() => setPreview({ title: isMedal ? 'Medal' : 'Badge', url: award.badgeImage! })} className="flex flex-col items-center gap-2 p-4 rounded-xl border border-neutral-gray-light hover:border-amber-300 hover:bg-amber-50 transition-colors group">
                  <Image src={award.badgeImage} alt={isMedal ? 'Medal' : 'Badge'} width={64} height={64} className="rounded-full object-cover group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium text-neutral-gray-dark">{isMedal ? 'Medal' : 'Badge'}</span>
                  <ZoomIn className="h-4 w-4 text-amber-500" />
                </button>
              )}
              <button onClick={() => setPreview({ title: 'Certificate of Recognition', url: award.certificate })} className="flex flex-col items-center gap-2 p-4 rounded-xl border border-neutral-gray-light hover:border-amber-300 hover:bg-amber-50 transition-colors group">
                <Image src={award.certificate} alt="Certificate" width={64} height={64} className="rounded object-cover group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium text-neutral-gray-dark">Certificate</span>
                <ZoomIn className="h-4 w-4 text-amber-500" />
              </button>
              {award.awardPresentation && (
                <button onClick={() => setPreview({ title: 'Award Presentation', url: award.awardPresentation! })} className="flex flex-col items-center gap-2 p-4 rounded-xl border border-neutral-gray-light hover:border-amber-300 hover:bg-amber-50 transition-colors group">
                  <Image src={award.awardPresentation} alt="Award Presentation" width={64} height={64} className="rounded object-cover group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium text-neutral-gray-dark">Presentation</span>
                  <ZoomIn className="h-4 w-4 text-amber-500" />
                </button>
              )}
            </div>

            {/* Work Info (for competitions) */}
            {award.workSummary && (
              <div>
                <h2 className="text-sm font-bold text-neutral-black uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Eye className="h-4 w-4 text-blue-500" /> Work Info
                </h2>
                <p className="text-sm text-neutral-gray-dark leading-relaxed mb-3">{award.workSummary}</p>
                {award.workMedia && award.workMedia.length > 0 && (
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {award.workMedia.map((m, i) => (
                      <div key={i} className="relative aspect-video rounded-xl overflow-hidden group border border-neutral-gray-light">
                        <Image src={m} alt={`Work ${i + 1}`} fill sizes="33vw" className="object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button size="sm" className="bg-white/90 text-brand-navy-900 hover:bg-white flex items-center gap-1"><Play className="h-4 w-4" /> View</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Social Handles */}
            <div>
              <h2 className="text-sm font-bold text-neutral-black uppercase tracking-wider mb-3">Social Handles</h2>
              {hideSocial ? (
                <p className="text-sm text-neutral-gray-medium">Social handles are not displayed for this category.</p>
              ) : (
                <div className="grid gap-2 sm:grid-cols-2">
                  {socialLinks.linkedin && (
                    <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl border border-neutral-gray-light hover:border-blue-300 hover:bg-blue-50 transition-colors group">
                      <Linkedin className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-medium text-neutral-gray-dark group-hover:text-blue-700">LinkedIn</span>
                    </a>
                  )}
                  {socialLinks.twitter && (
                    <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl border border-neutral-gray-light hover:border-sky-300 hover:bg-sky-50 transition-colors group">
                      <Twitter className="h-5 w-5 text-sky-500" />
                      <span className="text-sm font-medium text-neutral-gray-dark group-hover:text-sky-700">Twitter</span>
                    </a>
                  )}
                  {socialLinks.instagram && (
                    <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl border border-neutral-gray-light hover:border-pink-300 hover:bg-pink-50 transition-colors group">
                      <Instagram className="h-5 w-5 text-pink-600" />
                      <span className="text-sm font-medium text-neutral-gray-dark group-hover:text-pink-700">Instagram</span>
                    </a>
                  )}
                  {socialLinks.facebook && (
                    <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl border border-neutral-gray-light hover:border-blue-300 hover:bg-blue-50 transition-colors group">
                      <Globe className="h-5 w-5 text-blue-700" />
                      <span className="text-sm font-medium text-neutral-gray-dark group-hover:text-blue-700">Facebook</span>
                    </a>
                  )}
                  {!socialLinks.linkedin && !socialLinks.twitter && !socialLinks.instagram && !socialLinks.facebook && (
                    <p className="text-sm text-neutral-gray-medium col-span-2">No social handles available.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <PreviewModal isOpen={!!preview} onClose={() => setPreview(null)} imageUrl={preview?.url || ''} title={preview?.title || ''} />
    </div>
  );
}
