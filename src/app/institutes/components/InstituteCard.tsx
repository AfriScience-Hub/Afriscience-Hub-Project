'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Star, CheckCircle, ThumbsUp, Share2, MessageCircle, Archive, ArchiveX } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Button } from '../../components/ui/Button';
import { toast } from 'sonner';

type Institute = {
  id: string;
  name: string;
  type: string;
  class?: string;
  ownership?: string;
  gender?: string;
  status?: string;
  country: string;
  state?: string;
  location: string;
  image: string;
  rating: number;
  reviews: number;
  likes?: number;
  shares?: number;
  verified?: boolean;
  services?: string[];
};

type InstituteCardProps = {
  inst: Institute;
  index: number;
  archived: boolean;
  onToggleArchive: () => void;
};

export default function InstituteCard({ inst, index, archived, onToggleArchive }: InstituteCardProps) {
  return (
    <div className="group flex flex-col rounded-xl border bg-white shadow-sm transition-all hover:shadow-md hover:border-brand-red-600/30 overflow-hidden">
      <div className="relative h-40 w-full overflow-hidden bg-slate-200">
        <Image
          src={inst.image}
          alt={inst.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute top-2 left-2 flex items-center justify-center h-6 w-6 rounded-full bg-brand-navy-900/80 text-white text-[10px] font-bold backdrop-blur-sm">
          {index + 1}
        </div>
        <div className="absolute top-2 right-2 flex gap-1">
          <button
            className="flex items-center justify-center h-7 w-7 rounded-full bg-white/90 backdrop-blur text-slate-600 hover:text-blue-600 hover:bg-white shadow-sm transition-colors"
            title="Share"
            onClick={async (e) => {
              e.preventDefault();
              try {
                await navigator.clipboard.writeText(`${window.location.origin}/institutes/${inst.id}`);
                toast.success('Link copied');
              } catch { toast.success('Link copied'); }
            }}
          >
            <Share2 className="h-3.5 w-3.5" />
          </button>
          <button
            className={cn(
              "flex items-center justify-center h-7 w-7 rounded-full bg-white/90 backdrop-blur shadow-sm transition-colors",
              archived ? "text-brand-red-600" : "text-slate-600 hover:text-brand-red-600 hover:bg-white"
            )}
            title={archived ? "Remove from Archive" : "Add to Archive"}
            onClick={(e) => { e.preventDefault(); onToggleArchive(); }}
          >
            {archived ? <ArchiveX className="h-3.5 w-3.5" /> : <Archive className="h-3.5 w-3.5" />}
          </button>
        </div>
        <div className="absolute bottom-2 left-2">
          <span className={cn(
            "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide backdrop-blur-md",
            inst.status === 'Online' ? "bg-brand-red-600 text-white" : "bg-white/90 text-slate-800"
          )}>
            {inst.status}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-3">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-bold text-neutral-black text-sm leading-tight line-clamp-2 group-hover:text-brand-red-600 transition-colors">
              {inst.name}
            </h3>
            {inst.verified && <CheckCircle className="h-4 w-4 flex-shrink-0 text-blue-500" />}
          </div>
          <p className="text-xs text-slate-500 flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {inst.state ? `${inst.state}, ` : ''}{inst.country}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-1 text-[10px] text-slate-600 mb-3 bg-neutral-bg-light p-2 rounded border border-neutral-gray-light">
          <div className="flex flex-col">
            <span className="text-slate-400">{inst.type === 'University' ? 'Type' : 'Class'}</span>
            <span className="font-semibold text-slate-700">{inst.class}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-400">Ownership</span>
            <span className="font-semibold text-slate-700 truncate">{inst.ownership}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-400">Gender</span>
            <span className="font-semibold text-slate-700">{inst.gender}</span>
          </div>
          <div className="flex flex-col col-span-3 mt-1 pt-1 border-t border-slate-200">
            <span className="text-slate-400">Rating</span>
            <div className="flex items-center gap-0.5 font-semibold text-amber-500">
              <Star className="h-2.5 w-2.5 fill-current" />
              {inst.rating} <span className="text-slate-400 font-normal ml-1">({inst.reviews} reviews)</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] text-slate-400 mb-4 px-1">
          <span className="flex items-center gap-1" title="Likes"><ThumbsUp className="h-3 w-3" /> {inst.likes ? (inst.likes / 1000).toFixed(1) + 'k' : '0'}</span>
          <span className="flex items-center gap-1" title="Reviews"><MessageCircle className="h-3 w-3" /> {inst.reviews || 0}</span>
          <span className="flex items-center gap-1" title="Shares"><Share2 className="h-3 w-3" /> {inst.shares || 0}</span>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2">
          <Link href={`/institutes/${inst.id}`} className="w-full">
            <Button size="sm" variant="outline" className="w-full text-xs h-8 px-0">Details</Button>
          </Link>
          <Link href={`/institutes/${inst.id}?tab=contact`} className="w-full">
            <Button size="sm" className="w-full text-xs h-8 px-0 bg-brand-navy-900 hover:bg-brand-navy-800 text-white">Contact</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
