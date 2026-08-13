'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Share2, Eye, Archive, ArchiveX } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { ImagePreviewModal } from '../../[id]/components/ImagePreviewModal';
import type { Sponsor } from '../data';

interface SponsorCardProps {
  sponsor: Sponsor;
  archivedIds: number[];
  onToggleArchive: (id: number) => void;
}

export function SponsorCard({ sponsor, archivedIds, onToggleArchive }: SponsorCardProps) {
  const [showImageModal, setShowImageModal] = useState(false);

  return (
    <>
      <ImagePreviewModal url={showImageModal ? sponsor.image : null} onClose={() => setShowImageModal(false)} />
      <div className="group flex flex-col rounded-2xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
        <div className="relative h-48 bg-neutral-bg-light">
          <Image src={sponsor.image} alt={sponsor.name} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 pt-12">
            <div className="mb-0.5">
              <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full ${sponsor.status === 'Online' ? 'bg-green-500 text-white' : 'bg-neutral-gray-dark text-white'}`}>
                {sponsor.status === 'Online' ? '● Online' : '○ Offline'}
              </span>
            </div>
            <h3 className="font-bold text-white text-lg">{sponsor.name}</h3>
            <p className="flex items-center gap-1 text-xs text-white/80">
              <MapPin className="h-3 w-3" />
              {sponsor.state}, {sponsor.country}
            </p>
          </div>

          {/* Eye icon - left side */}
          <button
            className="absolute top-3 left-3 flex items-center justify-center h-7 w-7 rounded-full bg-white/90 backdrop-blur text-slate-600 shadow-sm cursor-pointer"
            title="View Image"
            onClick={(e) => {
              e.preventDefault();
              setShowImageModal(true);
            }}
          >
            <Eye className="h-3.5 w-3.5" />
          </button>

          {/* Share and Archive buttons - right side */}
          <div className="absolute top-3 right-3 flex gap-1.5">
            <button
              className="flex items-center justify-center h-7 w-7 rounded-full bg-white/90 backdrop-blur text-slate-600 shadow-sm cursor-pointer"
              title="Share"
              onClick={async (e) => {
                e.preventDefault();
                try {
                  await navigator.clipboard.writeText(`${window.location.origin}/support/sponsor/${sponsor.id}`);
                  toast.success('Link copied');
                } catch {
                  toast.error('Failed to copy link');
                }
              }}
            >
              <Share2 className="h-3.5 w-3.5" />
            </button>
            <button
              className={cn(
                "flex items-center justify-center h-7 w-7 rounded-full bg-white/90 backdrop-blur shadow-sm cursor-pointer",
                archivedIds.includes(sponsor.id) ? "text-brand-red-600" : "text-slate-600"
              )}
              title={archivedIds.includes(sponsor.id) ? "Remove from Archive" : "Add to Archive"}
              onClick={(e) => {
                e.preventDefault();
                onToggleArchive(sponsor.id);
              }}
            >
              {archivedIds.includes(sponsor.id) ? <ArchiveX className="h-3.5 w-3.5" /> : <Archive className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        <div className="p-5 flex flex-col flex-1">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {sponsor.industries.slice(0, 3).map((ind, idx) => (
              <span key={idx} className="text-xs bg-neutral-bg-light text-neutral-gray-dark px-2 py-1 rounded">
                {ind}
              </span>
            ))}
            {sponsor.industries.length > 3 && (
              <span className="text-xs bg-neutral-bg-light text-neutral-gray-dark px-2 py-1 rounded">
                +{sponsor.industries.length - 3}
              </span>
            )}
          </div>

          <div className="mb-3 flex-1">
            <p className="text-xs font-bold text-neutral-gray-dark uppercase tracking-wide mb-2">Catalog</p>
            <div className="flex flex-wrap gap-1.5">
              {sponsor.catalog.map((item, idx) => (
                <span key={idx} className="text-xs bg-neutral-bg-light text-neutral-gray-dark px-2 py-1 rounded">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-2 mt-auto">
            <Link href={`/support/sponsor/${sponsor.id}`} className="flex-1">
              <button className="cursor-pointer w-full h-9 rounded-lg border border-neutral-gray-light text-sm font-medium text-neutral-gray-dark">
                View Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
