'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin, Star, Share2, CheckCircle, Phone, Mail, ThumbsUp,
  Archive, ArchiveX, Eye, Calendar, Building2, ArrowLeft,
} from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { cn, formatCount } from '@/lib/utils';
import { toast } from 'sonner';
import ImagePreviewModal from '../../components/ImagePreviewModal';

interface InstituteHeroProps {
  institute: Record<string, any>;
  onTabChange: (tab: string) => void;
  isArchived: boolean;
  onArchiveToggle: () => void;
  isLiked: boolean;
  onLikeToggle: () => void;
  currentLikes: number;
  onRegister: () => void;
}

/** Attribute pills below the title — one colour each so they stay distinct. */
const PILL_STYLES: Record<string, string> = {
  Class: 'bg-brand-navy-100 text-brand-navy-900 border-brand-navy-100',
  Program: 'bg-purple-50 text-purple-700 border-purple-100',
  Ownership: 'bg-neutral-bg-light text-neutral-gray-dark border-neutral-gray-light',
  Gender: 'bg-blue-50 text-blue-700 border-blue-100',
};

export default function InstituteHero({
  institute, onTabChange,
  isArchived, onArchiveToggle, isLiked, onLikeToggle, currentLikes, onRegister,
}: InstituteHeroProps) {
  const [isDpPreviewOpen, setIsDpPreviewOpen] = useState(false);

  const handleShare = async () => {
    try { await navigator.clipboard.writeText(window.location.href); toast.success('Profile link copied!'); }
    catch { toast.success('Profile link copied!'); }
  };

  const attributes = [
    { label: 'Class', value: institute.class },
    { label: 'Program', value: institute.program },
    { label: 'Ownership', value: institute.ownership },
    { label: 'Gender', value: institute.gender },
  ].filter(a => a.value);

  return (
    <>
      {/* Background image */}
      <div className="h-[180px] md:h-[260px] w-full relative overflow-hidden flex-shrink-0 bg-brand-navy-900">
        <Image src={institute.image} alt={institute.name} fill sizes="100vw" className="object-cover object-center" style={{ objectFit: 'cover', objectPosition: 'center' }} priority />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-900/80 via-brand-navy-900/30 to-transparent" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

        <Link href="/institutes" className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 text-white/90 hover:text-white transition-colors z-10">
          <ArrowLeft className="h-5 w-5" />
          <span className="text-sm font-medium">Back to Institutes</span>
        </Link>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="flex flex-col lg:flex-row gap-6 -mt-12 relative z-10">
          <div className="flex-shrink-0 flex flex-col items-center">
            <button
              type="button"
              title="Preview"
              onClick={() => setIsDpPreviewOpen(true)}
              className="relative block h-32 w-32 md:h-40 md:w-40 cursor-pointer overflow-hidden rounded-xl border-4 border-white bg-white shadow-lg transition-opacity hover:opacity-90"
            >
              <Image src={institute.image} alt={institute.name} fill className="object-cover" sizes="160px" style={{ objectFit: 'cover' }} />
            </button>
            <div className="mt-3 flex items-center justify-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 w-fit mx-auto lg:mx-0">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={cn("h-3.5 w-3.5", i < Math.round(institute.rating) ? "text-amber-500 fill-current" : "text-neutral-gray-light")} />
                ))}
              </div>
              <span className="font-bold text-neutral-black text-sm">{institute.rating}</span>
            </div>
          </div>

          <div className="flex-1 pt-2 lg:pt-14">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={cn(
                    "px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide border",
                    institute.status === 'Online'
                      ? "bg-green-100 text-green-700 border-green-200"
                      : "bg-neutral-bg-light text-neutral-gray-dark border-neutral-gray-light"
                  )}>
                    {institute.status}
                  </span>
                  {institute.verified && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 text-blue-600 text-xs font-bold border border-blue-100">
                      <CheckCircle className="h-3 w-3" /> Verified
                    </span>
                  )}
                </div>

                <h1 className="text-3xl font-bold text-neutral-black leading-tight mb-1">{institute.name}</h1>
                {institute.motto && <p className="text-neutral-gray-medium italic mb-2">&ldquo;{institute.motto}&rdquo;</p>}

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm mb-3">
                  <span className="flex items-center gap-1.5 text-neutral-black">
                    <Building2 className="h-4 w-4 text-neutral-black" />
                    {institute.address}
                  </span>
                  <span className="flex items-center gap-1.5 text-neutral-black text-[13px]">
                    <MapPin className="h-3.5 w-3.5 text-neutral-black" />
                    {institute.state ? `${institute.state}, ` : ''}{institute.country}
                  </span>
                </div>

                {institute.scopes && institute.scopes.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {institute.scopes.map((scope: string) => (
                      <span key={scope} className="text-xs px-2 py-1 rounded-full bg-brand-red-100 text-brand-red-600 font-medium">{scope}</span>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {attributes.map(a => (
                    <span key={a.label} className={cn("px-2 py-0.5 rounded text-xs font-bold border", PILL_STYLES[a.label])}>
                      {a.value}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4 min-w-[240px]">
                <Button className="w-full bg-brand-red-600 hover:bg-brand-red-700 shadow-sm py-6 text-lg" onClick={onRegister}>
                  Register Now
                </Button>
                {institute.bookingsCount && (
                  <p className="text-xs text-center text-brand-navy-900 font-medium -mt-2">
                    <CheckCircle className="inline h-3 w-3 mr-1" />
                    {institute.bookingsCount}+ successful registrations
                  </p>
                )}
                <div className="flex gap-2">
                  <div className="flex-1 grid grid-cols-2 gap-2">
                    <Button variant="outline" className="border-neutral-gray-light text-neutral-gray-dark hover:bg-neutral-bg-light" title="Call">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="border-neutral-gray-light text-neutral-gray-dark hover:bg-neutral-bg-light" title="Message" onClick={() => onTabChange('contact')}>
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button variant="outline" className={cn("px-3", isLiked && "border-brand-red-600 bg-brand-red-50 text-brand-red-600")} title={isLiked ? "Unlike" : "Like"} onClick={onLikeToggle}>
                      <ThumbsUp className={cn("h-4 w-4", isLiked && "fill-current")} />
                    </Button>
                    <Button variant="outline" className="px-3" title="Write Review" onClick={() => onTabChange('reviews')}>
                      <Star className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="px-3" title="Share Profile" onClick={handleShare}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" onClick={onArchiveToggle} className={cn("px-3", isArchived && "bg-neutral-bg-light text-neutral-gray-dark")} title={isArchived ? "Remove from Archive" : "Add to Archive"}>
                      {isArchived ? <ArchiveX className="h-4 w-4" /> : <Archive className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 mt-6 pt-4 border-t border-neutral-gray-light text-sm text-neutral-gray-medium">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" /> Joined
                <span className="font-semibold text-neutral-gray-dark">{institute.joined || '—'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Eye className="h-4 w-4" /> Views
                <span className="font-semibold text-neutral-gray-dark">{formatCount(institute.views)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ThumbsUp className="h-4 w-4" /> Likes
                <span className="font-semibold text-neutral-gray-dark">{formatCount(currentLikes)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4" /> Reviews
                <span className="font-semibold text-neutral-gray-dark">{formatCount(institute.reviews)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Share2 className="h-4 w-4" /> Shares
                <span className="font-semibold text-neutral-gray-dark">{formatCount(institute.shares)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isDpPreviewOpen && (
        <ImagePreviewModal src={institute.image} alt={institute.name} onClose={() => setIsDpPreviewOpen(false)} />
      )}
    </>
  );
}
