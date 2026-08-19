'use client';

import Image from 'next/image';
import { MapPin, Calendar, Share2 } from 'lucide-react';
import {
  type ImpactStory,
  formatImpactLocation,
  getDetailTitle,
} from '@/app/data/impactData';
import { toast } from 'sonner';

export default function DetailHero({ story }: { story: ImpactStory }) {
  const title = getDetailTitle(story);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  return (
    <div className="relative h-80 bg-neutral-bg-light overflow-hidden">
      <Image src={story.image} alt={title} fill className="object-cover" sizes="100vw" priority />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-sm">
            {story.program}
          </span>
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-green-500/80">
            {story.status}
          </span>
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-black/40">
            {story.idTag}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">{title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            <span>{formatImpactLocation(story.location)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <span>{story.year}</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleShare}
        className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white flex items-center justify-center transition-colors shadow-lg cursor-pointer"
        title="Share"
      >
        <Share2 className="h-5 w-5 text-neutral-gray-dark" />
      </button>
    </div>
  );
}
