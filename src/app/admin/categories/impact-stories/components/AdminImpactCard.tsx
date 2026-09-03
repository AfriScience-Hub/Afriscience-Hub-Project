'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { MoreVertical, Eye, Pencil, CheckCircle2, Archive, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ImpactStory } from '@/app/data/impactData';
import { getCardPrimaryTitle, getCardSecondaryMetric, formatImpactLocation } from '@/app/data/impactData';

interface Props {
  story: ImpactStory;
  onView: (story: ImpactStory) => void;
  onEdit: (story: ImpactStory) => void;
  onStatusChange: (id: string, status: 'Active' | 'Concluded') => void;
  onDelete: (id: string) => void;
}

export default function AdminImpactCard({ story, onView, onEdit, onStatusChange, onDelete }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const title = getCardPrimaryTitle(story);
  const secondary = getCardSecondaryMetric(story);
  const isActive = story.status === 'Active';

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="rounded-xl border border-neutral-gray-light bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      <div className="relative h-44 bg-neutral-bg-light overflow-hidden">
        <Image
          src={story.image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2.5 flex items-end justify-between gap-2">
          <span className="text-[10px] font-semibold text-white/90 truncate">{story.idTag}</span>
          <span
            className={cn(
              'shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold',
              isActive ? 'bg-green-500 text-white' : 'bg-neutral-600 text-white'
            )}
          >
            {story.status}
          </span>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <span className="inline-flex self-start px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-navy-900/10 text-brand-navy-900 mb-2">
          {story.program}
        </span>
        <h3 className="text-sm font-bold text-neutral-black line-clamp-2 min-h-[2.5rem] leading-snug">{title}</h3>

        <p className="text-[11px] text-neutral-gray-medium mt-1">
          <span className="font-semibold text-neutral-gray-dark">{secondary.label}:</span> {secondary.value}
        </p>
        <p className="text-[11px] text-neutral-gray-medium line-clamp-1">
          {formatImpactLocation(story.location)} · {story.year}
        </p>
        <p className="text-xs text-neutral-gray-dark line-clamp-2 mt-2 flex-1">{story.summary}</p>

        <div className="mt-3 flex items-center gap-2">
          <span className="text-[11px] font-medium text-neutral-gray-dark">
            {story.fundsUtilized}
          </span>
          <span className="text-[10px] text-neutral-gray-medium">· {story.beneficiaries} beneficiaries</span>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={() => onView(story)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-brand-navy-900 text-white text-xs font-semibold hover:bg-brand-navy-800 transition-colors cursor-pointer"
          >
            <Eye className="h-3.5 w-3.5" /> View Details
          </button>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="h-9 w-9 inline-flex items-center justify-center rounded-lg border border-neutral-gray-light hover:bg-neutral-bg-light transition-colors cursor-pointer"
              aria-label="More actions"
            >
              <MoreVertical className="h-4 w-4 text-neutral-gray-dark" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 bottom-full mb-2 w-44 bg-white border border-neutral-gray-light rounded-lg shadow-lg py-1 z-20">
                <button
                  onClick={() => { onEdit(story); setMenuOpen(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-neutral-gray-dark hover:bg-neutral-bg-light cursor-pointer"
                >
                  <Pencil className="h-3.5 w-3.5" /> Edit Story
                </button>
                {story.status !== 'Active' && (
                  <button
                    onClick={() => { onStatusChange(story.id, 'Active'); setMenuOpen(false); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-green-700 hover:bg-green-50 cursor-pointer"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" /> Mark as Active
                  </button>
                )}
                {story.status !== 'Concluded' && (
                  <button
                    onClick={() => { onStatusChange(story.id, 'Concluded'); setMenuOpen(false); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-amber-700 hover:bg-amber-50 cursor-pointer"
                  >
                    <Archive className="h-3.5 w-3.5" /> Mark as Concluded
                  </button>
                )}
                <div className="border-t border-neutral-gray-light my-1" />
                <button
                  onClick={() => { onDelete(story.id); setMenuOpen(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50 cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
