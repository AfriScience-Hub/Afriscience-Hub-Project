"use client"

import { useState } from 'react';
import { Vote, Eye, Share2, MapPin, Trophy, Archive } from 'lucide-react';
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
  const [archived, setArchived] = useState(false);
  const [preview, setPreview] = useState(false);

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

  const handleArchive = (e: React.MouseEvent) => {
    e.stopPropagation();
    setArchived(!archived);
    toast.success(archived ? 'Removed from archive' : 'Archived successfully');
  };

  return (
    <div className={cn(
      "group flex flex-col rounded-2xl border border-neutral-gray-light bg-white shadow-sm transition-all hover:shadow-lg hover:border-brand-red-100 overflow-hidden",
      archived && "opacity-60"
    )}>
      {/* Image Container */}
      <div className="relative h-56 bg-brand-navy-900 overflow-hidden">
        {preview ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setPreview(false)}>
            <img
              src={finalist.image}
              alt={finalist.name}
              className="max-h-full max-w-full object-contain rounded-lg"
            />
          </div>
        ) : null}
        <img
          src={finalist.image}
          alt={finalist.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Share - top left */}
        <button
          onClick={(e) => { e.stopPropagation(); handleShare(); }}
          className="absolute top-3 left-3 rounded-full bg-white/80 p-1.5 text-neutral-black shadow-sm backdrop-blur-sm hover:bg-white transition-colors"
          title="Share"
        >
          <Share2 className="h-3.5 w-3.5" />
        </button>

        {/* Archive + Preview - top right */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <button
            onClick={handleArchive}
            className={cn(
              "flex items-center justify-center h-7 w-7 rounded-full bg-white/80 backdrop-blur shadow-sm transition-all",
              archived ? "text-brand-red-600 bg-brand-red-50" : "text-slate-600 hover:bg-white hover:text-brand-red-600"
            )}
            title={archived ? "Unarchive" : "Archive"}
          >
            <Archive className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setPreview(true); }}
            className="flex items-center justify-center h-7 w-7 rounded-full bg-white/80 backdrop-blur text-slate-600 hover:bg-white hover:text-brand-red-600 transition-all shadow-sm"
            title="Preview"
          >
            <Eye className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Year + Competition Badge - bottom left */}
        <div className="absolute bottom-3 left-3 flex flex-col items-start gap-1">
          <span className="flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            <Trophy className="h-3 w-3" />
            {finalist.year}
          </span>
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
          <div className="flex items-center gap-2 mb-1">
            <span className="flex items-center gap-1 text-sm font-semibold text-neutral-black">
              <MapPin className="h-4 w-4 text-brand-red-600 flex-shrink-0" />
              {finalist.country}
            </span>
          </div>
          <span className="inline-block text-[11px] font-bold uppercase tracking-wide text-brand-navy-900 bg-brand-navy-100 px-2.5 py-0.5 rounded-full border border-brand-navy-100">
            {finalist.category}
          </span>
        </div>

        {/* Votes Display */}
        <div className="mb-4 p-3 rounded-lg bg-gradient-to-r from-brand-red-50 to-orange-50 border border-brand-red-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Vote className="h-4 w-4 text-brand-red-600" />
              <span className="text-xs font-medium text-neutral-gray-dark">Total Votes</span>
            </div>
            <span className="text-xl font-black text-brand-red-600">{finalist.votes.toLocaleString()}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-auto">
          <Button
            variant="outline"
            className="w-full text-xs"
            onClick={() => onViewWork(finalist)}
          >
            <Eye className="h-3.5 w-3.5 mr-1" />
            View Work
          </Button>
        </div>
      </div>
    </div>
  );
}
