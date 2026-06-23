'use client';

import { X, Eye, TrendingUp, MapPin, Play, Linkedin, Twitter, Instagram, Globe } from 'lucide-react';
import { Button } from '../ui/Button';
import { getCompetitionColor, getPositionStyle, getPositionLabel, shouldHideSocialHandles } from '../../voting/data';
import { cn } from '../../../lib/utils';

interface ViewWorkModalProps {
  isOpen: boolean;
  onClose: () => void;
  contestant: {
    id: string;
    name: string;
    country: string;
    image: string;
    competition: string;
    category: string;
    workTitle?: string;
    workSummary?: string;
    workMedia?: string[];
    votes: number;
    views?: number;
    livePosition: number;
    year?: number;
    socialLinks?: { linkedin?: string; twitter?: string; instagram?: string; facebook?: string };
  };
  liveVotes: number;
}

export function ViewWorkModal({ isOpen, onClose, contestant, liveVotes }: ViewWorkModalProps) {
  if (!isOpen) return null;

  const workTitle = contestant.workTitle || `${contestant.name}'s Work`;
  const workSummary = contestant.workSummary || 'Competition entry for ' + contestant.competition;
  const workMedia = contestant.workMedia || [contestant.image];
  const hideSocial = shouldHideSocialHandles(contestant.category);
  const socialLinks = contestant.socialLinks || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl my-8 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-gray-light bg-gradient-to-r from-brand-navy-900 to-brand-navy-800 text-white">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-white/10 backdrop-blur">
              <Eye className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{workTitle}{contestant.year ? ` (${contestant.year})` : ''}</h2>
              <p className="text-sm text-slate-200">by {contestant.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center h-8 w-8 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">

          {/* SECTION 1: Title Info */}
          <div className="p-6 border-b border-neutral-gray-light bg-neutral-bg-light">
            <h3 className="text-sm font-bold text-neutral-black uppercase tracking-wider mb-4">Title</h3>
            <div className="flex items-start gap-4">
              <img
                src={contestant.image}
                alt={contestant.name}
                className="h-20 w-20 rounded-xl object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-neutral-black mb-1">{contestant.name}</h3>
                <p className="text-sm text-neutral-gray-medium flex items-center gap-1 mb-2">
                  <MapPin className="h-3.5 w-3.5" />
                  {contestant.country}
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={cn("px-3 py-1 rounded-full text-xs font-medium", getCompetitionColor(contestant.competition))}>
                    {contestant.competition}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 border border-purple-200">
                    {contestant.category}
                  </span>
                  <span className={cn(
                    "flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold shadow",
                    getPositionStyle(contestant.livePosition)
                  )}>
                    {getPositionLabel(contestant.livePosition)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: Work Info */}
          <div className="p-6 border-b border-neutral-gray-light">
            <h3 className="text-sm font-bold text-neutral-black uppercase tracking-wider mb-4">Work Info</h3>
            <p className="text-neutral-gray-dark leading-relaxed mb-4">{workSummary}</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {workMedia.map((media, index) => (
                <div key={index} className="relative aspect-video rounded-xl overflow-hidden group border border-neutral-gray-light">
                  <img
                    src={media}
                    alt={`${workTitle} - Image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button size="sm" className="flex items-center gap-1.5 bg-white/90 text-brand-navy-900 hover:bg-white">
                      <Play className="h-4 w-4" />
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 3: Performance Analytics */}
          <div className="p-6 border-b border-neutral-gray-light">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="h-5 w-5 text-brand-red-600" />
              <h3 className="text-lg font-bold text-neutral-black">Performance Analytics</h3>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-brand-red-50 to-orange-50 border border-brand-red-200">
                <p className="text-xs font-medium text-neutral-gray-medium uppercase tracking-wider mb-1">Total Votes</p>
                <p className="text-2xl font-black text-brand-red-600">{liveVotes.toLocaleString()}</p>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200">
                <p className="text-xs font-medium text-neutral-gray-medium uppercase tracking-wider mb-1">Total Views</p>
                <p className="text-2xl font-black text-blue-600">{(contestant.views || 0).toLocaleString()}</p>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200">
                <p className="text-xs font-medium text-neutral-gray-medium uppercase tracking-wider mb-1">Position</p>
                <p className="text-2xl font-black text-amber-600">#{contestant.livePosition}</p>
              </div>
            </div>
          </div>

          {/* SECTION 4: Social Handles */}
          <div className="p-6">
            <h3 className="text-sm font-bold text-neutral-black uppercase tracking-wider mb-4">Social Handles</h3>
            {hideSocial ? (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-sm text-neutral-gray-medium">Social handles are not displayed for this category.</p>
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {socialLinks.linkedin && (
                  <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl border border-neutral-gray-light hover:border-blue-300 hover:bg-blue-50 transition-colors group">
                    <Linkedin className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium text-neutral-gray-dark group-hover:text-blue-700">LinkedIn</span>
                  </a>
                )}
                {socialLinks.twitter && (
                  <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl border border-neutral-gray-light hover:border-sky-300 hover:bg-sky-50 transition-colors group">
                    <Twitter className="h-5 w-5 text-sky-500" />
                    <span className="text-sm font-medium text-neutral-gray-dark group-hover:text-sky-700">Twitter</span>
                  </a>
                )}
                {socialLinks.instagram && (
                  <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl border border-neutral-gray-light hover:border-pink-300 hover:bg-pink-50 transition-colors group">
                    <Instagram className="h-5 w-5 text-pink-600" />
                    <span className="text-sm font-medium text-neutral-gray-dark group-hover:text-pink-700">Instagram</span>
                  </a>
                )}
                {socialLinks.facebook && (
                  <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl border border-neutral-gray-light hover:border-blue-300 hover:bg-blue-50 transition-colors group">
                    <Globe className="h-5 w-5 text-blue-700" />
                    <span className="text-sm font-medium text-neutral-gray-dark group-hover:text-blue-700">Facebook</span>
                  </a>
                )}
                {!socialLinks.linkedin && !socialLinks.twitter && !socialLinks.instagram && !socialLinks.facebook && (
                  <p className="text-sm text-neutral-gray-medium col-span-2">No social handles available.</p>
                )}
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-neutral-gray-light bg-neutral-bg-light">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
