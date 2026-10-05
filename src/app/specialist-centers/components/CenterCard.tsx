'use client';

import { useState } from 'react';
import { ProtectedLink } from '@/app/components/ProtectedLink';
import Image from 'next/image';
import {
  MapPin, Star, CheckCircle, Eye, ThumbsUp, Share2, Archive, ArchiveX
} from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import ImagePreviewModal from './ImagePreviewModal';

interface CenterCardProps {
  center: {
    id: string;
    name: string;
    image: string;
    field: string;
    ownership: string;
    status: string;
    location: string;
    categories: string[];
    services: string[];
    rating: number;
    reviews: number;
    views: number;
    likes: number;
    shares: number;
    verified: boolean;
  };
  archivedIds: string[];
  onToggleArchive: (id: string) => void;
}

export default function CenterCard({ center, archivedIds, onToggleArchive }: CenterCardProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <div className="group flex flex-col rounded-xl border border-neutral-gray-light bg-white shadow-sm transition-all hover:shadow-md hover:border-brand-red-100 overflow-hidden">
      <div className="relative h-40 bg-brand-navy-900 overflow-hidden">
        <Image src={center.image} alt={center.name} fill className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-3 right-3 flex gap-1.5">
          <button
            className="flex items-center justify-center h-7 w-7 rounded-full bg-white/90 backdrop-blur text-slate-600 hover:text-blue-600 shadow-sm transition-colors cursor-pointer"
            title="Share"
            onClick={async (e) => {
              e.preventDefault();
              try {
                await navigator.clipboard.writeText(`${window.location.origin}/specialist-centers/${center.id}`);
                toast.success('Link copied');
              } catch { toast.success('Link copied'); }
            }}
          >
            <Share2 className="h-3.5 w-3.5" />
          </button>
          <button
            className={cn(
              "flex items-center justify-center h-7 w-7 rounded-full bg-white/90 backdrop-blur shadow-sm transition-colors cursor-pointer",
              archivedIds.includes(center.id) ? "text-brand-red-600" : "text-slate-600 hover:text-brand-red-600"
            )}
            title={archivedIds.includes(center.id) ? "Remove from Archive" : "Add to Archive"}
            onClick={(e) => { e.preventDefault(); onToggleArchive(center.id); }}
          >
            {archivedIds.includes(center.id) ? <ArchiveX className="h-3.5 w-3.5" /> : <Archive className="h-3.5 w-3.5" />}
          </button>
        </div>
        <button
          className="absolute top-3 left-3 flex items-center justify-center h-7 w-7 rounded-full bg-white/90 backdrop-blur text-slate-600 hover:text-brand-navy-900 shadow-sm transition-colors cursor-pointer"
          title="Preview"
          onClick={(e) => { e.preventDefault(); setIsPreviewOpen(true); }}
        >
          <Eye className="h-3.5 w-3.5" />
        </button>
        <div className="absolute bottom-3 left-3 right-28 text-white">
          <div className="mb-1">
            <span className={cn(
              "inline-block px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wide",
              center.status === 'Online' ? "bg-green-500 text-white" : "bg-neutral-gray-dark text-white"
            )}>
              {center.status}
            </span>
          </div>
          <h3 className="font-bold text-xs leading-tight">
            {center.name}
            {center.verified && (
              <CheckCircle className="inline-block h-3 w-3 ml-1 align-middle text-white fill-blue-500" strokeWidth={2.5} />
            )}
          </h3>
          <p className="text-[10px] text-neutral-gray-light flex items-center mt-0.5">
            <MapPin className="h-2.5 w-2.5" /> {center.location}
          </p>
        </div>
        <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/40 px-2 py-0.5 backdrop-blur-sm">
          <Star className="h-2.5 w-2.5 text-amber-400 fill-current" />
          <span className="text-[10px] font-bold text-white">{center.rating}</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-3.5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-wide text-neutral-gray-medium">Field</p>
            <p className="text-sm font-bold text-brand-navy-900 truncate">{center.field}</p>
          </div>
          <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded flex-shrink-0">
            {center.ownership}
          </span>
        </div>

        <div className="mb-2">
          <p className="text-[10px] font-bold uppercase tracking-wide text-neutral-gray-medium mb-1">Categories</p>
          <p className="text-[11px] font-semibold text-brand-red-600 leading-snug">
            {center.categories
              .map(cat => cat.length > 20 ? cat.split(' | ')[0].split(' / ')[0] : cat)
              .join(', ')}
          </p>
        </div>

        <div className="flex-1">
          <p className="text-[10px] font-bold uppercase tracking-wide text-neutral-gray-medium mb-1">Services</p>
          <div className="flex flex-wrap gap-1">
            {center.services.map(s => {
              const shortS = s.length > 18 ? s.split(' (')[0].split(' & ')[0] : s;
              return (
                <span key={s} className="text-[10px] text-brand-navy-900 bg-brand-navy-100 px-1.5 py-0.5 rounded-full">
                  {shortS}
                </span>
              );
            })}
          </div>
        </div>

        <div className="mt-2 pt-2.5 border-t border-neutral-gray-light flex items-center justify-between text-[10px] text-slate-400">
          <span className="flex items-center gap-1" title="Views"><Eye className="h-3 w-3" /> {(center.views / 1000).toFixed(1)}k</span>
          <span className="flex items-center gap-1" title="Likes"><ThumbsUp className="h-3 w-3" /> {(center.likes / 1000).toFixed(1)}k</span>
          <span className="flex items-center gap-1" title="Shares"><Share2 className="h-3 w-3" /> {center.shares}</span>
        </div>
        <div className="mt-3">
          <ProtectedLink href={`/specialist-centers/${center.id}`} className="w-full block">
            <Button size="sm" className="w-full bg-brand-navy-900 hover:bg-brand-navy-800 text-xs h-8 px-0">View Details</Button>
          </ProtectedLink>
        </div>
      </div>

      {isPreviewOpen && (
        <ImagePreviewModal src={center.image} alt={center.name} onClose={() => setIsPreviewOpen(false)} />
      )}
    </div>
  );
}
