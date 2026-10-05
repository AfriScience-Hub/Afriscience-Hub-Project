'use client';

import { useState } from 'react';
import { ProtectedLink } from '@/app/components/ProtectedLink';
import Image from 'next/image';
import { MapPin, CheckCircle, Star, Eye, ThumbsUp, Share2, Archive, ArchiveX } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Button } from '../../components/ui/Button';
import { toast } from 'sonner';
import ImagePreviewModal from './ImagePreviewModal';

type Scientist = {
  id: string;
  name: string;
  image: string;
  field: string;
  status: string;
  location: string;
  country: string;
  state?: string;
  verified?: boolean;
  rating: number;
  reviews: number;
  professions: string[];
  degrees: string[];
  services: string[];
  views?: number;
  likes: number;
  shares?: number;
};

type ScientistCardProps = {
  sci: Scientist;
  archived: boolean;
  onToggleArchive: () => void;
};

export default function ScientistCard({ sci, archived, onToggleArchive }: ScientistCardProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const mostRecentDegree = sci.degrees?.[0];

  return (
    <div className="group flex flex-col rounded-xl border border-neutral-gray-light bg-white shadow-sm transition-all hover:shadow-md hover:border-brand-red-100 overflow-hidden">

      <div className="relative h-40 bg-brand-navy-900 overflow-hidden">
        <Image src={sci.image} alt={sci.name} fill className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <button
          className="absolute top-3 left-3 flex items-center justify-center h-7 w-7 rounded-full bg-white/90 backdrop-blur text-slate-600 hover:text-brand-navy-900 shadow-sm transition-colors cursor-pointer"
          title="Preview"
          onClick={(e) => { e.preventDefault(); setIsPreviewOpen(true); }}
        >
          <Eye className="h-3.5 w-3.5" />
        </button>

        <div className="absolute top-3 right-3 flex gap-1.5">
          <button
            className="flex items-center justify-center h-7 w-7 rounded-full bg-white/90 backdrop-blur text-slate-600 hover:text-blue-600 shadow-sm transition-colors cursor-pointer"
            title="Share"
            onClick={async (e) => {
              e.preventDefault();
              try {
                await navigator.clipboard.writeText(`${window.location.origin}/scientists/${sci.id}`);
                toast.success('Link copied');
              } catch { toast.success('Link copied'); }
            }}
          >
            <Share2 className="h-3.5 w-3.5" />
          </button>
          <button
            className={cn(
              "flex items-center justify-center h-7 w-7 rounded-full bg-white/90 backdrop-blur shadow-sm transition-colors cursor-pointer",
              archived ? "text-brand-red-600" : "text-slate-600 hover:text-brand-red-600"
            )}
            title={archived ? "Remove from Archive" : "Add to Archive"}
            onClick={(e) => { e.preventDefault(); onToggleArchive(); }}
          >
            {archived ? <ArchiveX className="h-3.5 w-3.5" /> : <Archive className="h-3.5 w-3.5" />}
          </button>
        </div>

        <div className="absolute bottom-3 left-3 right-24 text-white">
          <div className="mb-1">
            <span className={cn(
              "inline-block px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wide",
              sci.status === 'Online' ? "bg-green-500 text-white" : "bg-neutral-gray-dark text-white"
            )}>
              {sci.status}
            </span>
          </div>
          <h3 className="font-bold text-xs leading-tight">
            {sci.name}
            {sci.verified && (
              <CheckCircle className="inline-block h-3 w-3 ml-1 align-middle text-white fill-blue-500" strokeWidth={2.5} />
            )}
          </h3>
          <p className="text-[10px] text-neutral-gray-light flex items-center mt-0.5">
            <MapPin className="h-2.5 w-2.5" />
            {sci.state ? `${sci.state}, ` : ''}{sci.country}
          </p>
        </div>

        <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/40 px-2 py-0.5 backdrop-blur-sm">
          <Star className="h-2.5 w-2.5 text-amber-400 fill-current" />
          <span className="text-[10px] font-bold text-white">{sci.rating}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-3.5">
        <div className="mb-2">
          <p className="text-[10px] font-bold uppercase tracking-wide text-neutral-gray-medium">Field</p>
          <p className="text-sm font-bold text-brand-navy-900 truncate">{sci.field}</p>
        </div>

        <div className="mb-2">
          <p className="text-[10px] font-bold uppercase tracking-wide text-neutral-gray-medium">Degree</p>
          <p className="text-sm font-bold text-brand-navy-900 truncate">{mostRecentDegree || '—'}</p>
        </div>

        <div className="mb-2">
          <p className="text-[11px] font-semibold text-brand-red-600 leading-snug">
            {sci.professions.slice(0, 3).join(', ')}
          </p>
        </div>

        <div className="flex-1">
          <p className="text-[10px] font-bold uppercase tracking-wide text-neutral-gray-medium mb-1">Services</p>
          <div className="flex flex-wrap gap-1">
            {sci.services.map(s => (
              <span key={s} className="text-[10px] text-brand-navy-900 bg-brand-navy-100 px-1.5 py-0.5 rounded-full">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-2 pt-2.5 border-t border-neutral-gray-light flex justify-between items-center text-[10px] text-slate-400">
          <div className="flex gap-4">
            <span className="flex items-center gap-1" title="Views"><Eye className="h-3 w-3" /> {sci.views ? (sci.views / 1000).toFixed(1) + 'k' : '0'}</span>
            <span className="flex items-center gap-1" title="Likes"><ThumbsUp className="h-3 w-3" /> {(sci.likes / 1000).toFixed(1)}k</span>
            <span className="flex items-center gap-1" title="Shares"><Share2 className="h-3 w-3" /> {sci.shares || 0}</span>
          </div>
        </div>

        <div className="mt-3">
          <ProtectedLink href={`/scientists/${sci.id}`} className="block w-full">
            <Button size="sm" className="w-full bg-brand-navy-900 hover:bg-brand-navy-800 text-xs h-8 px-0">View Details</Button>
          </ProtectedLink>
        </div>
      </div>

      {isPreviewOpen && (
        <ImagePreviewModal src={sci.image} alt={sci.name} onClose={() => setIsPreviewOpen(false)} />
      )}
    </div>
  );
}
