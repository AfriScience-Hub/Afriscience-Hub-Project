'use client';

import Image from 'next/image';
import { Archive, Eye, GraduationCap, MapPin, Search, Share2, Star, ThumbsUp } from 'lucide-react';
import type { ScientistItem } from '../page';

interface FilterTag {
  group: 'fields' | 'professions' | 'services' | 'status' | 'country' | 'region';
  value: string;
  label: string;
}

interface ScientistsCardsProps {
  scientists: ScientistItem[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeTags: FilterTag[];
  onRemoveTag: (group: FilterTag['group'], value?: string) => void;
  onClearAll: () => void;
}

function ScientistCard({ scientist }: { scientist: ScientistItem }) {
  return (
    <article className="overflow-hidden rounded-lg border border-[#d8dfeb] bg-white shadow-lg">
      <div className="relative h-60 overflow-hidden">
        <Image
          src={scientist.image}
          alt={scientist.name}
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 1024px) 50vw, 100vw"
          className="object-cover transition duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/35 to-transparent" />

        <div className="absolute left-4 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-[#243b59] text-sm font-bold text-white">
          {scientist.id}
        </div>

        <div className="absolute right-4 top-5 flex gap-3">
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#50627f] shadow-sm transition hover:bg-[#f5f7fb]">
            <Share2 className="h-4 w-4" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#50627f] shadow-sm transition hover:bg-[#f5f7fb]">
            <Archive className="h-4 w-4" />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <span
            className={`inline-flex rounded-sm px-2 py-1 text-xs font-bold ${
              scientist.status === 'ONLINE' ? 'bg-[#00d84f]' : 'bg-[#596273]'
            }`}
          >
            {scientist.status}
          </span>

          <h3 className="mt-2 text-sm font-bold leading-tight">{scientist.name}</h3>
          <div className="mt-2 flex items-center gap-2 text-sm text-white/90">
            <MapPin className="h-4 w-4 shrink-0" />
            <span>
              {scientist.region}, {scientist.country}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-5">
        <div className="flex flex-wrap gap-3">
          {scientist.professions.map((profession) => (
            <span
              key={profession}
              className="rounded-full bg-[#fff2f2] px-2 py-1 text-xs font-semibold text-[#ff4b43]"
            >
              {profession}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-[#0f2542]">
          <GraduationCap className="h-5 w-5" />
          <span>{scientist.degree.join(' | ').toUpperCase()}</span>
        </div>

        <div className="flex items-center gap-3 text-[#0f1d33]">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={index}
                className={`h-3 w-3 ${
                  index < Math.floor(scientist.rating)
                    ? 'fill-[#ff9800] text-[#ff9800]'
                    : 'text-[#d4dce8]'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-bold">{scientist.rating.toFixed(1)}</span>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase text-[#9aa7bc]">Services</h4>
          <div className="mt-3 flex flex-wrap gap-3">
            {scientist.services.map((service) => (
              <span
                key={service}
                className="rounded-xl border border-[#d8dfeb] bg-[#f8fafc] px-3 py-1.5 text-xs text-[#51637f]"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 border-t border-[#d8dfeb] pt-4 text-xs text-[#7f93b2]">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span>{scientist.stats.views}</span>
          </div>
          <div className="flex items-center gap-2">
            <ThumbsUp className="h-4 w-4" />
            <span>{scientist.stats.likes}</span>
          </div>
          <div className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            <span>{scientist.stats.shares}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="rounded-lg bg-[#0f2542] p-2 text-sm font-semibold cursor-pointer text-white transition hover:bg-[#17355d]">
            View Details
          </button>
          <button className="rounded-lg border border-[#d8dfeb] bg-white p-2 text-sm font-semibold cursor-pointer text-[#0f2542] transition hover:bg-[#f5f7fb]">
            Contact
          </button>
        </div>
      </div>
    </article>
  );
}

export default function ScientistsCards({
  scientists,
  searchQuery,
  onSearchChange,
  activeTags,
  onRemoveTag,
  onClearAll,
}: ScientistsCardsProps) {
  return (
    <section className="min-w-0">
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 lg:left-6 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9aa7bc]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search Scientists by name, field, or expertise..."
          className="w-full rounded-3xl border border-[#d8dfeb] bg-white py-3 lg:py-4 pl-10 lg:pl-16 pr-6 text-sm lg:text-md text-[#1f2a3d] shadow-sm outline-none transition placeholder:text-[#919db0] focus:border-[#a8b7cd]"
        />
      </div>

      {activeTags.length ? (
        <div className="mt-6 flex flex-wrap items-center gap-3">
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
            className="text-sm font-semibold cursor-pointer text-[#ff3b30] transition hover:opacity-80"
          >
            Clear All
          </button>
        </div>
      ) : null}

      <p className="mt-8 text-sm text-[#5a7195]">
        Showing <span className="font-bold text-[#456c9d]">{scientists.length}</span> {scientists.length === 1 ? 'result' : 'results'}
      </p>

      {scientists.length ? (
        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {scientists.map((scientist) => (
            <ScientistCard key={scientist.id} scientist={scientist} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-[26px] border border-dashed border-[#d8dfeb] bg-white px-8 py-16 text-center shadow-md">
          <h2 className="text-2xl font-bold text-[#0f1d33]">No scientists match that filter set.</h2>
          <p className="mt-3 text-lg text-[#6a7f9b]">
            Try another search term, change the profession filter, or clear a few filters.
          </p>
        </div>
      )}
    </section>
  );
}
