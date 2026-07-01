'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Eye, ThumbsUp, Share2, Archive, ArchiveX, MapPin } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { toast } from 'sonner';
import { INNOVATION_INTERESTS_EMOJI, type Innovation } from '../../data/mockData';
import { InterestEmoji } from './InnovationHelpers';

type InnovationCardProps = {
  inn: Innovation;
  archived: boolean;
  onToggleArchive: () => void;
  onPreview: (src: string, alt: string) => void;
};

export default function InnovationCard({ inn, archived, onToggleArchive, onPreview }: InnovationCardProps) {
  return (
    <div className="group flex flex-col rounded-xl border border-neutral-gray-light bg-white shadow-sm transition-all hover:shadow-md hover:border-brand-red-100 overflow-hidden">

      <div className="relative h-48 bg-brand-navy-900 overflow-hidden">
        <Image src={inn.image} alt={inn.name} fill className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <button
          onClick={() => onPreview(inn.image, inn.name)}
          className="absolute top-3 left-3 rounded-full bg-white/80 p-1.5 text-neutral-black shadow-sm backdrop-blur-sm hover:bg-white transition-colors"
          title="View image"
        >
          <Eye className="h-3.5 w-3.5" />
        </button>

        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <button
            onClick={() => { navigator.clipboard.writeText(window.location.origin + '/innovations/' + inn.id); toast.success('Link copied!'); }}
            className="rounded-full bg-white/80 p-1.5 text-neutral-black shadow-sm backdrop-blur-sm hover:bg-white transition-colors"
            title="Share"
          >
            <Share2 className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={onToggleArchive}
            className="rounded-full bg-white/80 p-1.5 text-neutral-black shadow-sm backdrop-blur-sm hover:bg-white transition-colors"
            title={archived ? "Unarchive" : "Archive"}
          >
            {archived ? <ArchiveX className="h-3.5 w-3.5" /> : <Archive className="h-3.5 w-3.5" />}
          </button>
        </div>

        <div className="absolute bottom-3 left-3 text-white pr-3">
          <span className="text-[10px] font-semibold bg-white/20 backdrop-blur-sm px-1.5 py-0.5 rounded mb-1 inline-block">{inn.ownership}</span>
          <h3 className="font-bold text-lg leading-tight">{inn.name}</h3>
          <p className="text-xs text-neutral-gray-light flex items-center gap-1 mt-0.5">
            <MapPin className="h-3 w-3" /> {inn.country}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] uppercase font-bold text-brand-navy-900 bg-brand-navy-100 px-1.5 py-0.5 rounded">{inn.field}</span>
          <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded ml-auto">{inn.stage}</span>
        </div>

        <p className="text-[10px] font-mono text-neutral-gray-medium mb-2 tracking-wider">{inn.idTag}</p>

        <div className="mb-2 flex items-center gap-1">
          {inn.interests.slice(0, 3).map(i => (
            <InterestEmoji key={i} interest={i} />
          ))}
        </div>

        <p className="text-xs text-neutral-gray-medium mb-3">
          <span className="font-bold text-neutral-gray-dark">Dimensions: </span>
          {inn.dimensions.length} x {inn.dimensions.width} x {inn.dimensions.height} / {inn.dimensions.weight}
        </p>

        <div className="mt-auto pt-3 border-t border-neutral-gray-light flex items-center text-xs text-neutral-gray-medium">
          <span className="flex items-center mr-3" title="Views"><Eye className="h-3 w-3 mr-0.5" /> {(inn.views / 1000).toFixed(1)}k</span>
          <span className="flex items-center mr-3" title="Likes"><ThumbsUp className="h-3 w-3 mr-0.5" /> {(inn.likes / 1000).toFixed(1)}k</span>
          <span className="flex items-center" title="Shares"><Share2 className="h-3 w-3 mr-0.5" /> {(inn.shares / 1000).toFixed(1)}k</span>
        </div>

        <div className="mt-4">
          <Link href={`/innovations/${inn.id}`}>
            <Button size="sm" className="w-full bg-brand-navy-900 hover:bg-brand-navy-800 text-xs">View Details</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
