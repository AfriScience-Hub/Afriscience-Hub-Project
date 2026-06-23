"use client"

import { Eye, Share2, MapPin, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/app/components/ui/Button';
import { getCompetitionColor, getPositionStyle, getPositionLabel } from '@/app/voting/data';
import { toast } from 'sonner';

export type ConcludedFinalist = {
  id: string;
  name: string;
  type: string;
  competition: string;
  category: string;
  year: number;
  country: string;
  image: string;
  afriScienceScore: number;
  votes: number;
  overallPerformance: number;
  position: number;
  concludedDate: string;
};

type PastFinalistCardProps = {
  finalist: ConcludedFinalist;
  onViewWork: (finalist: ConcludedFinalist) => void;
};

export default function PastFinalistCard({ finalist, onViewWork }: PastFinalistCardProps) {
  const handleShare = async () => {
    const url = `${window.location.origin}/competitions/pastcompetition?finalist=${finalist.id}`;
    if (navigator.share) {
      await navigator.share({
        title: `${finalist.name}'s Entry - ${finalist.competition}`,
        text: `Check out ${finalist.name}'s ${finalist.competition} entry (${finalist.year})!`,
        url,
      });
    } else {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <div className="group flex flex-col rounded-2xl border border-neutral-gray-light bg-white shadow-sm transition-all hover:shadow-lg hover:border-brand-red-100 overflow-hidden">
      {/* Image Container */}
      <div className="relative h-56 bg-brand-navy-900 overflow-hidden">
        <img
          src={finalist.image}
          alt={finalist.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Top Left - Year */}
        <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full">
          <Trophy className="h-3 w-3" />
          {finalist.year}
        </div>

        {/* Top Right - Share Button */}
        <button
          onClick={(e) => { e.stopPropagation(); handleShare(); }}
          className="absolute top-3 right-3 flex items-center justify-center h-8 w-8 rounded-full bg-white/90 backdrop-blur text-slate-600 hover:bg-white hover:text-brand-red-600 transition-all shadow-sm"
          title="Share"
        >
          <Share2 className="h-4 w-4" />
        </button>

        {/* Competition Badge */}
        <div className="absolute bottom-3 left-3">
          <span className={cn("px-2 py-1 rounded-full text-[9px] font-bold uppercase border backdrop-blur-sm", getCompetitionColor(finalist.competition))}>
            {finalist.competition}
          </span>
        </div>

        {/* Position Badge */}
        <div className="absolute bottom-3 right-3">
          <span className={cn(
            "flex items-center justify-center h-10 w-10 rounded-full text-sm font-black shadow-xl",
            getPositionStyle(finalist.position)
          )}>
            {getPositionLabel(finalist.position)}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        {/* Name & Country */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-neutral-black mb-1 leading-tight">{finalist.name}</h3>
          <p className="text-sm text-neutral-gray-medium flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
            {finalist.country}
          </p>
          <p className="text-xs text-neutral-gray-medium mt-0.5">{finalist.category}</p>
        </div>

        {/* Stats Grid */}
        <div className="mb-4 grid grid-cols-3 gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-r from-brand-red-50 to-orange-50 border border-brand-red-200 text-center">
            <p className="text-[9px] font-medium text-neutral-gray-medium uppercase tracking-wider">Votes</p>
            <p className="text-sm font-black text-brand-red-600">{finalist.votes.toLocaleString()}</p>
          </div>
          <div className="p-2 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 text-center">
            <p className="text-[9px] font-medium text-neutral-gray-medium uppercase tracking-wider">Score</p>
            <p className="text-sm font-black text-blue-600">{finalist.afriScienceScore}%</p>
          </div>
          <div className="p-2 rounded-lg bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 text-center">
            <p className="text-[9px] font-medium text-neutral-gray-medium uppercase tracking-wider">Overall</p>
            <p className="text-sm font-black text-amber-600">{finalist.overallPerformance}%</p>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-auto">
          <Button
            className="w-full bg-brand-navy-900 hover:bg-brand-navy-800 py-2.5"
            onClick={() => onViewWork(finalist)}
          >
            <Eye className="h-4 w-4 mr-1.5" />
            View Work
          </Button>
        </div>
      </div>
    </div>
  );
}
