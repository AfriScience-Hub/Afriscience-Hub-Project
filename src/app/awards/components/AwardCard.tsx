'use client';

import { Eye, MapPin, Calendar, Gift, Share2, Archive, ZoomIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/app/components/ui/Button';
import { getTypeColor, getTypeIcon, getPositionStyle, getPositionLabel, usesMedal } from '../data';
import Link from 'next/link';

type AwardWinner = {
  id: string;
  name: string;
  type: string;
  image: string;
  country: string;
  year: number;
  rewards: string[];
  certificate: string;
  badgeImage?: string;
  awardPresentation?: string;
  competition?: string;
  category?: string;
  position?: number;
  socialLinks?: Record<string, string>;
  workSummary?: string;
  workMedia?: string[];
};

type AwardCardProps = {
  award: AwardWinner;
  onPreview: (type: 'badge' | 'certificate' | 'presentation', url: string) => void;
};

export default function AwardCard({ award, onPreview }: AwardCardProps) {
  const isCompetition = award.type === 'Competitions Award';
  const TypeIcon = getTypeIcon(award.type);
  const isMedal = usesMedal(award.type);

  return (
    <div className="group flex flex-col rounded-2xl border border-neutral-gray-light bg-white shadow-sm transition-all hover:shadow-md overflow-hidden">
      {/* Image area */}
      <div className="relative h-52 bg-brand-navy-900 overflow-hidden">
        <img
          src={award.image}
          alt={award.name}
          className="h-full w-full object-cover object-top opacity-90 transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Award Type - bottom-left (was top-left) */}
        <div className="absolute bottom-3 left-3">
          <span className={cn(
            "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border backdrop-blur-sm",
            getTypeColor(award.type)
          )}>
            <TypeIcon className="h-3 w-3" />
            {award.type}
          </span>
        </div>

        {/* Position Badge for Competition Awards */}
        {isCompetition && award.position && (
          <div className="absolute top-3 right-3">
            <span className={cn(
              "flex items-center justify-center h-9 w-9 rounded-full text-sm font-bold shadow-lg",
              getPositionStyle(award.position)
            )}>
              {getPositionLabel(award.position)}
            </span>
          </div>
        )}

        {/* Top-right action buttons: Share, Archive, Preview */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <button className="flex items-center justify-center h-7 w-7 rounded-full bg-white/80 backdrop-blur text-slate-600 hover:bg-white transition-colors" title="Share">
            <Share2 className="h-3.5 w-3.5" />
          </button>
          <button className="flex items-center justify-center h-7 w-7 rounded-full bg-white/80 backdrop-blur text-slate-600 hover:bg-white transition-colors" title="Archive">
            <Archive className="h-3.5 w-3.5" />
          </button>
          <button
            className="flex items-center justify-center h-7 w-7 rounded-full bg-white/80 backdrop-blur text-slate-600 hover:bg-white transition-colors"
            title="Preview"
            onClick={(e) => { e.stopPropagation(); onPreview('presentation', award.awardPresentation || award.image); }}
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Competition & Category badges */}
        {isCompetition && (
          <div className="absolute bottom-12 left-3 flex flex-wrap items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-white/20 text-white border border-white/20 backdrop-blur-sm">
              {award.competition}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-white/20 text-white border border-white/20 backdrop-blur-sm">
              {award.category}
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        {/* Name */}
        <h3 className="text-lg font-bold text-neutral-black mb-1 leading-tight">{award.name}</h3>

        {/* Country & Year */}
        <div className="flex items-center gap-3 text-xs text-neutral-gray-medium mb-4">
          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{award.country}</span>
          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{award.year}</span>
        </div>

        {/* Rewards - more visible title */}
        <div className="mb-4">
          <p className="text-xs font-bold text-neutral-black uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Gift className="h-3.5 w-3.5 text-amber-500" />
            Rewards
          </p>
          <div className="flex flex-wrap gap-1.5">
            {award.rewards.map((r, i) => (
              <span key={i} className="inline-flex items-center gap-1 text-[11px] bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full">
                <Gift className="h-2.5 w-2.5" />
                {r}
              </span>
            ))}
          </div>
        </div>

        {/* Badge/Medal + Certificate + Presentation preview triggers */}
        <div className="mb-3 flex items-center gap-2">
          {award.badgeImage && (
            <button
              onClick={() => onPreview(isMedal ? 'badge' : 'badge', award.badgeImage!)}
              className="text-[11px] font-medium text-brand-navy-900 underline hover:text-brand-red-600 transition-colors"
            >
              {isMedal ? 'Medal' : 'Badge'}
            </button>
          )}
          <button
            onClick={() => onPreview('certificate', award.certificate)}
            className="text-[11px] font-medium text-brand-navy-900 underline hover:text-brand-red-600 transition-colors"
          >
            Certificate
          </button>
          {award.awardPresentation && (
            <button
              onClick={() => onPreview('presentation', award.awardPresentation!)}
              className="text-[11px] font-medium text-brand-navy-900 underline hover:text-brand-red-600 transition-colors"
            >
              Award Presentation
            </button>
          )}
        </div>

        {/* View Details button */}
        <div className="mt-auto">
          <Link href={`/awards/${award.id}`}>
            <Button variant="outline" className="w-full border-brand-navy-900 text-brand-navy-900 hover:bg-brand-navy-900 hover:text-white gap-2">
              <Eye className="h-4 w-4" />
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
