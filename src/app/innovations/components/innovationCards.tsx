'use client';

import Image from 'next/image';
import { Archive, Eye, MapPin, Search, Share2, ThumbsUp } from 'lucide-react';
import type { InnovationItem } from '../page';

interface FilterTag {
  group: 'fields' | 'interests' | 'ownership' | 'stage' | 'sdgs' | 'country';
  value: string;
  label: string;
}

interface InnovationCardsProps {
  innovations: InnovationItem[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeTags: FilterTag[];
  onRemoveTag: (group: FilterTag['group'], value?: string) => void;
  onClearAll: () => void;
}

const interestIcons: Record<string, string> = {
  'Investment | Partnership': '🤝',
  'Purchase | Trade': '🛒',
  Marketing: '📊',
  'Training | Mentorship': '🎓',
  Sensitization: '🗣️',
};

function InnovationCard({ innovation }: { innovation: InnovationItem }) {
  return (
    <article className="overflow-hidden rounded-lg border border-[#d8dfeb] bg-white shadow-lg">
      <div className="relative h-50 overflow-hidden">
        <Image
          src={innovation.image}
          alt={innovation.name}
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 1024px) 50vw, 100vw"
          className="object-cover transition duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

        <div className="absolute left-3 top-3">
         <button className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#50627f] shadow-sm transition cursor-pointer hover:bg-[#f5f7fb]">
            <Eye className="h-4 w-4" />
          </button>
        </div>

        <div className="absolute right-3 top-3 flex gap-3">
          <button className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#50627f] shadow-sm transition cursor-pointer hover:bg-[#f5f7fb]">
            <Share2 className="h-4 w-4" />
          </button>
          <button className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#50627f] shadow-sm transition cursor-pointer hover:bg-[#f5f7fb]">
            <Archive className="h-4 w-4" />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="flex mt-2 text-lg font-bold leading-tight">{innovation.name}</h3>
          <div className="flex items-center gap-2 text-[1.15rem] text-white/90">
            <MapPin className="h-3 w-3 shrink-0" />
            <span className="text-xs">{innovation.country}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2 p-4">
        <div className="flex flex-wrap gap-3">
          <span className="rounded-sm bg-blue-50 px-1.5 py-1 text-[10px] font-bold text-black">
            {innovation.field.toUpperCase()}
          </span>
        </div>

        <p className="text-[10px] text-[#91a0b8]">{innovation.code}</p>

        <div className="flex flex-wrap gap-2 text-md">
          {innovation.interests.map((interest) => (
            <span key={interest} title={interest}>
              {interestIcons[interest]}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <span className="rounded-xl bg-[#f8fafc] px-1.5 py-1 text-xs font-bold text-[#51637f]">
            {innovation.ownership.toUpperCase()}
          </span>
          <span className="rounded-xl bg-[#f8fafc] px-1.5 py-1 text-xs font-bold text-[#51637f]">
            {innovation.stage.toUpperCase()}
          </span>
        </div>

        <p className="text-xs text-gray-400">
          <span className="font-bold text-gray-700">Dimensions:</span> {innovation.dimensions}
        </p>

        <div className="flex gap-3 border-t border-[#d8dfeb] pt-4 text-xs text-[#7f93b2] mb-5">
          <div className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            <span>{innovation.stats.views}</span>
          </div>
          <div className="flex items-center gap-1">
            <ThumbsUp className="h-3 w-3" />
            <span>{innovation.stats.likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <Share2 className="h-3 w-3" />
            <span>{innovation.stats.shares}</span>
          </div>
        </div>

       <div className="w-full">
        <button className="rounded-lg bg-[#0f2542] p-2 text-sm font-semibold cursor-pointer text-white transition hover:bg-[#17355d] w-full">
          View Details
        </button>
      </div>
      </div>
    </article>
  );
}

export default function InnovationCards({
  innovations,
  searchQuery,
  onSearchChange,
  activeTags,
  onRemoveTag,
  onClearAll,
}: InnovationCardsProps) {
  return (
    <section className="min-w-0">
      <div className="relative">
        <Search className="pointer-events-none absolute left-2 lg:left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9aa7bc]"/>
        <input
          type="text"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search innovations by name, IdTag, field, interest, ownership, creator, country or keywords."
          className="w-full rounded-xl border border-[#d8dfeb] bg-white py-3 lg:py-4 pl-9 lg:pl-10 pr-6 text-sm lg:text-md text-[#1f2a3d] shadow-sm outline-none transition placeholder:text-[#919db0] focus:border-[#a8b7cd]"
        />
      </div>

      {activeTags.length ? (
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {activeTags.map((tag) => (
            <button
              key={`${tag.group}-${tag.value}`}
              type="button"
              onClick={() => onRemoveTag(tag.group, tag.value)}
              className="rounded-full bg-[#eef5fb] px-4 py-2 text-sm font-medium cursor-pointer text-[#0b2c5f]"
            >
              {tag.label} ×
            </button>
          ))}
          <button
            type="button"
            onClick={onClearAll}
            className="text-sm font-semibold text-[#ff3b30] transition hover:opacity-80 cursor-pointer"
          >
            Clear All
          </button>
        </div>
      ) : null}

      <p className="mt-4 text-[1rem] text-[#91a0b8]">
        {innovations.length} {innovations.length === 1 ? 'innovation found' : 'innovations found'}
      </p>

      {innovations.length ? (
        <div className="mt-2 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {innovations.map((innovation) => (
            <InnovationCard key={innovation.id} innovation={innovation} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-[26px] border border-dashed border-[#d8dfeb] bg-white px-8 py-16 text-center shadow-[0_8px_24px_rgba(15,29,51,0.05)]">
          <h2 className="text-2xl font-bold text-[#0f1d33]">No innovations match that filter set.</h2>
          <p className="mt-3 text-lg text-[#6a7f9b]">
            Try another search term, pick a different field, or clear a few filters.
          </p>
        </div>
      )}
    </section>
  );
}
