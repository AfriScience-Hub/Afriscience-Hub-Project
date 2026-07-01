'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, CheckCircle, Star, GraduationCap, Eye, ThumbsUp, Share2, Archive, ArchiveX } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Button } from '../../components/ui/Button';
import { toast } from 'sonner';

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
  professions: string[];
  degrees: string[];
  services: string[];
  views?: number;
  likes: number;
  shares?: number;
};

type ScientistCardProps = {
  sci: Scientist;
  index: number;
  archived: boolean;
  onToggleArchive: () => void;
};

export default function ScientistCard({ sci, index, archived, onToggleArchive }: ScientistCardProps) {
  return (
    <div className="group flex flex-col rounded-xl border border-neutral-gray-light bg-white shadow-sm transition-all hover:shadow-md hover:border-brand-red-100 overflow-hidden">

      <div className="relative h-48 bg-brand-navy-900 overflow-hidden">
        <Image src={sci.image} alt={sci.name} fill className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute top-3 left-3 flex items-center justify-center h-6 w-6 rounded-full bg-brand-navy-900/80 text-white text-[10px] font-bold backdrop-blur-sm">
          {index + 1}
        </div>

        <div className="absolute top-3 right-3 flex gap-1.5">
          <button
            className="flex items-center justify-center h-7 w-7 rounded-full bg-white/90 backdrop-blur text-slate-600 hover:text-blue-600 shadow-sm transition-colors"
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
              "flex items-center justify-center h-7 w-7 rounded-full bg-white/90 backdrop-blur shadow-sm transition-colors",
              archived ? "text-brand-red-600" : "text-slate-600 hover:text-brand-red-600"
            )}
            title={archived ? "Remove from Archive" : "Add to Archive"}
            onClick={(e) => { e.preventDefault(); onToggleArchive(); }}
          >
            {archived ? <ArchiveX className="h-3.5 w-3.5" /> : <Archive className="h-3.5 w-3.5" />}
          </button>
        </div>

        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="mb-1">
            <span className={cn(
              "inline-block px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wide",
              sci.status === 'Online' ? "bg-green-500 text-white" : "bg-neutral-gray-dark text-white"
            )}>
              {sci.status}
            </span>
          </div>
          <h3 className="font-bold text-lg flex items-center gap-1 leading-tight">
            {sci.name}
            {sci.verified && <CheckCircle className="h-4 w-4 text-blue-400 flex-shrink-0" />}
          </h3>
          <p className="text-xs text-neutral-gray-light flex items-center gap-1 mt-0.5">
            <MapPin className="h-3 w-3" />
            {sci.state ? `${sci.state}, ` : ''}{sci.country}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2">
          <div className="flex flex-wrap gap-1">
            {sci.professions.slice(0, 3).map(p => (
              <span key={p} className="text-[10px] font-bold text-brand-red-600 bg-brand-red-100 px-2 py-0.5 rounded-full border border-brand-red-100">
                {p}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1.5 mb-3">
          <GraduationCap className="h-3.5 w-3.5 text-brand-navy-900 flex-shrink-0" />
          <div className="flex items-center gap-1 flex-wrap">
            {sci.degrees.map((d, i) => (
              <span key={d} className="text-[10px] uppercase font-bold text-brand-navy-900">
                {d}{i < sci.degrees.length - 1 && <span className="text-neutral-gray-light ml-1">|</span>}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={cn("h-3.5 w-3.5", i < Math.floor(sci.rating) ? "text-amber-500 fill-current" : "text-neutral-gray-light")} />
            ))}
          </div>
          <span className="text-xs font-bold text-neutral-black">{sci.rating}</span>
        </div>

        <div className="flex-1">
          <p className="text-xs text-neutral-gray-medium font-bold uppercase mb-1.5">Services</p>
          <div className="flex flex-wrap gap-1">
            {sci.services.slice(0, 5).map(s => (
              <span key={s} className="text-[10px] text-neutral-gray-dark bg-neutral-bg-light border border-neutral-gray-light px-2 py-0.5 rounded">
                {s}
              </span>
            ))}
            {sci.services.length > 5 && (
              <span className="text-[10px] text-neutral-gray-medium px-1">+{sci.services.length - 5}</span>
            )}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-neutral-gray-light flex justify-between items-center text-xs text-neutral-gray-medium">
          <div className="flex gap-4">
            <span className="flex items-center gap-1" title="Views"><Eye className="h-3 w-3" /> {sci.views ? (sci.views / 1000).toFixed(1) + 'k' : '0'}</span>
            <span className="flex items-center gap-1" title="Likes"><ThumbsUp className="h-3 w-3" /> {(sci.likes / 1000).toFixed(1)}k</span>
            <span className="flex items-center gap-1" title="Shares"><Share2 className="h-3 w-3" /> {sci.shares || 0}</span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link href={`/scientists/${sci.id}`} className="flex-1">
            <Button size="sm" className="w-full bg-brand-navy-900 hover:bg-brand-navy-800 text-xs">View Details</Button>
          </Link>
          <Link href={`/scientists/${sci.id}?tab=contact`} className="flex-1">
            <Button size="sm" variant="outline" className="w-full text-xs">Contact</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
