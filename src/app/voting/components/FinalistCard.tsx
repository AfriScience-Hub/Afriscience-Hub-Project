"use client"

import { Vote, Eye, Archive, Zap, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/app/components/ui/Button';
import { getCompetitionColor, getPositionStyle, getPositionLabel } from '../data';

type Finalist = {
  id: string;
  name: string;
  country: string;
  image: string;
  competition: string;
  category: string;
  views?: number;
  liveVotes: number;
  livePosition: number;
};

type FinalistCardProps = {
  finalist: Finalist;
  isMyVote: boolean;
  alreadyVotedThisCategory: boolean;
  onVote: (finalist: Finalist) => void;
  onViewWork: (finalist: Finalist) => void;
  onBoost: (contestantId: string, contestantName: string) => void;
};

export default function FinalistCard({
  finalist,
  isMyVote,
  alreadyVotedThisCategory,
  onVote,
  onViewWork,
  onBoost,
}: FinalistCardProps) {
  const canBoost = alreadyVotedThisCategory;

  return (
    <div
      className={cn(
        "group flex flex-col rounded-2xl border bg-white shadow-sm transition-all hover:shadow-lg overflow-hidden",
        isMyVote ? "border-green-300 ring-2 ring-green-100" : "border-neutral-gray-light hover:border-brand-red-100"
      )}
    >
      {/* Image Container */}
      <div className="relative h-56 bg-brand-navy-900 overflow-hidden">
        <img
          src={finalist.image}
          alt={finalist.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Top Left - Eye Icon (Views) */}
        <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full">
          <Eye className="h-3 w-3" />
          {(finalist.views || 0).toLocaleString()}
        </div>

        {/* Top Right - Archive Icon */}
        <button className="absolute top-3 right-3 flex items-center justify-center h-8 w-8 rounded-full bg-white/90 backdrop-blur text-slate-600 hover:bg-white transition-colors">
          <Archive className="h-4 w-4" />
        </button>

        {/* Competition Badge (now on left) */}
        <div className="absolute bottom-3 left-3">
          <span className={cn("px-2 py-1 rounded-full text-[9px] font-bold uppercase border backdrop-blur-sm", getCompetitionColor(finalist.competition))}>
            {finalist.competition}
          </span>
        </div>

        {/* Position Badge (now on right) */}
        {finalist.liveVotes > 0 && (
          <div className="absolute bottom-3 right-3">
            <span className={cn(
              "flex items-center justify-center h-10 w-10 rounded-full text-sm font-black shadow-xl",
              getPositionStyle(finalist.livePosition)
            )}>
              {getPositionLabel(finalist.livePosition)}
            </span>
          </div>
        )}
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

        {/* Votes Display */}
        <div className="mb-4 p-3 rounded-lg bg-gradient-to-r from-brand-red-50 to-orange-50 border border-brand-red-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Vote className="h-4 w-4 text-brand-red-600" />
              <span className="text-xs font-medium text-neutral-gray-dark">Total Votes</span>
            </div>
            <span className="text-xl font-black text-brand-red-600">{finalist.liveVotes.toLocaleString()}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto space-y-2">
          {/* Vote Button */}
          {alreadyVotedThisCategory ? (
            <div className={cn(
              "w-full flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-bold border",
              isMyVote
                ? "bg-green-50 border-green-200 text-green-700"
                : "bg-slate-50 border-slate-200 text-slate-400"
            )}>
              {isMyVote ? '✓ Voted' : 'Vote Cast in Category'}
            </div>
          ) : (
            <Button
              className="w-full bg-brand-red-600 hover:bg-brand-red-700 py-2.5 gap-2"
              onClick={() => onVote(finalist)}
            >
              <Vote className="h-4 w-4" />
              Vote
            </Button>
          )}

          {/* View Work & Boost Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewWork(finalist)}
              className="w-full text-xs"
            >
              <Eye className="h-3.5 w-3.5 mr-1" />
              View Work
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => canBoost ? onBoost(finalist.id, finalist.name) : undefined}
              className={cn(
                "w-full text-xs",
                canBoost
                  ? "border-amber-500 text-amber-600 hover:bg-amber-50"
                  : "border-slate-200 text-slate-400 cursor-not-allowed"
              )}
              disabled={!canBoost}
            >
              <Zap className="h-3.5 w-3.5 mr-1" />
              Boost
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
