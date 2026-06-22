'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin, Star, CheckCircle, Eye, ThumbsUp, Share2, Archive, ArchiveX
} from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

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
    views: number;
    likes: number;
    shares: number;
    verified: boolean;
  };
  archivedIds: string[];
  onToggleArchive: (id: string) => void;
}

export default function CenterCard({ center, archivedIds, onToggleArchive }: CenterCardProps) {
  return (
    <div className="group flex flex-col rounded-xl border border-neutral-gray-light bg-white shadow-sm transition-all hover:shadow-md hover:border-brand-red-100 overflow-hidden">
      <div className="relative h-40 bg-brand-navy-900 overflow-hidden">
        <Image src={center.image} alt={center.name} fill className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-3 right-3 flex gap-1.5">
          <button
            className="flex items-center justify-center h-7 w-7 rounded-full bg-white/90 backdrop-blur text-slate-600 hover:text-blue-600 shadow-sm transition-colors"
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
              "flex items-center justify-center h-7 w-7 rounded-full bg-white/90 backdrop-blur shadow-sm transition-colors",
              archivedIds.includes(center.id) ? "text-brand-red-600" : "text-slate-600 hover:text-brand-red-600"
            )}
            title={archivedIds.includes(center.id) ? "Remove from Archive" : "Add to Archive"}
            onClick={(e) => { e.preventDefault(); onToggleArchive(center.id); }}
          >
            {archivedIds.includes(center.id) ? <ArchiveX className="h-3.5 w-3.5" /> : <Archive className="h-3.5 w-3.5" />}
          </button>
        </div>
        <Link href={`/specialist-centers/${center.id}`} className="absolute top-3 left-3 flex items-center justify-center h-7 w-7 rounded-full bg-white/90 backdrop-blur text-slate-600 hover:text-brand-navy-900 shadow-sm transition-colors">
          <Eye className="h-3.5 w-3.5" />
        </Link>
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="mb-1">
            <span className={cn(
              "inline-block px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wide",
              center.status === 'Online' ? "bg-green-500 text-white" : "bg-neutral-gray-dark text-white"
            )}>
              {center.status}
            </span>
          </div>
          <h3 className="font-bold text-sm flex items-center gap-1 leading-tight">
            {center.name}
            {center.verified && <CheckCircle className="h-3.5 w-3.5 text-blue-400 flex-shrink-0" />}
          </h3>
          <p className="text-[10px] text-neutral-gray-light flex items-center gap-1 mt-0.5">
            <MapPin className="h-2.5 w-2.5" /> {center.location}
          </p>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-3.5">
        <div className="flex flex-wrap gap-1 mb-2">
          <span className="text-[10px] uppercase font-bold text-brand-navy-900 bg-brand-navy-100 px-1.5 py-0.5 rounded">{center.field}</span>
          <span className="text-[10px] uppercase font-bold text-neutral-gray-dark bg-neutral-bg-light px-1.5 py-0.5 rounded">{center.ownership}</span>
        </div>
        <div className="flex flex-wrap gap-1 mb-2">
          {center.categories.slice(0, 2).map(cat => {
            const shortCat = cat.length > 20 ? cat.split(' | ')[0].split(' / ')[0] : cat;
            return (
              <span key={cat} className="text-[10px] text-neutral-gray-dark bg-neutral-bg-light border border-neutral-gray-light px-1.5 py-0.5 rounded-full">
                {shortCat}
              </span>
            );
          })}
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap gap-1">
            {center.services.slice(0, 2).map(s => {
              const shortS = s.length > 18 ? s.split(' (')[0].split(' & ')[0] : s;
              return (
                <span key={s} className="text-[10px] text-brand-red-600 bg-brand-red-100 px-1.5 py-0.5 rounded-full">
                  {shortS}
                </span>
              );
            })}
            {center.services.length > 2 && (
              <span className="text-[10px] text-neutral-gray-medium px-1">+{center.services.length - 2}</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1.5 mt-2 mb-1">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={cn("h-3 w-3", i < Math.floor(center.rating) ? "text-amber-500 fill-current" : "text-neutral-gray-light")} />
            ))}
          </div>
          <span className="text-[10px] font-bold text-neutral-black">{center.rating}</span>
        </div>
        <div className="mt-2 pt-2.5 border-t border-neutral-gray-light flex items-center justify-between text-[10px] text-slate-400">
          <span className="flex items-center gap-1" title="Views"><Eye className="h-3 w-3" /> {(center.views / 1000).toFixed(1)}k</span>
          <span className="flex items-center gap-1" title="Likes"><ThumbsUp className="h-3 w-3" /> {(center.likes / 1000).toFixed(1)}k</span>
          <span className="flex items-center gap-1" title="Shares"><Share2 className="h-3 w-3" /> {center.shares}</span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Link href={`/specialist-centers/${center.id}`} className="w-full">
            <Button size="sm" className="w-full bg-brand-navy-900 hover:bg-brand-navy-800 text-xs h-8 px-0">View Details</Button>
          </Link>
          <Link href={`/specialist-centers/${center.id}?tab=contact`} className="w-full">
            <Button size="sm" variant="outline" className="w-full text-xs h-8 px-0">Contact</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
