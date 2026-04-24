'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Archive, CheckCircle2, ChevronDown, GitFork, MapPin, MessageCircle, Share2, Star, ThumbsUp } from 'lucide-react';

export interface Institute {
  id: number;
  name: string;
  location: {
    city: string;
    region: string;
    country: string;
  };
  status: 'ONLINE' | 'OFFLINE';
  class: 'Primary' | 'Secondary' | 'Primary & Secondary';
  ownership: string;
  gender: 'Female' | 'Male' | 'Mixed' | 'Rather not say';
  services: string[];
  rating: {
    stars: number;
    count: number;
  };
  stats: {
    likes: string;
    messages: number;
    forks: number;
  };
  image: string;
}

export type SortOption = 'recommended' | 'most-reviewed' | 'highest-rated';

function InstituteCard({ institute }: { institute: Institute }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-colors hover:border-red-100">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={institute.image}
          alt={institute.name}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute top-4 left-4 flex gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0F1D33] text-sm font-bold text-white">
            {institute.id}
          </div>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:bg-gray-100">
            <Share2 size={16} />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:bg-gray-100">
            <Archive size={16} />
          </button>
        </div>

        <div
          className={`absolute bottom-4 left-4 rounded px-3 py-1 text-xs font-bold ${
            institute.status === 'ONLINE' ? 'bg-red-500 text-white' : 'bg-white text-black'
          }`}
        >
          {institute.status}
        </div>
      </div>

      <div className="flex grow flex-col p-5">
        <div className="mb-1.5 flex items-center justify-between gap-3">
          <h3 className="text-md font-bold leading-tight text-black hover:text-red-500">
            {institute.name}
          </h3>
          <CheckCircle2 className="h-5 w-5 shrink-0 text-blue-500" />
        </div>

        <div className="mb-4 flex items-center gap-2 text-xs text-gray-400">
          <MapPin size={14} className="shrink-0" />
          <span>
            {institute.location.region}, {institute.location.country}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-x-2 gap-y-1 rounded-t-lg border border-gray-100 bg-gray-50 px-4 py-3 text-start">
          <span className="text-xs text-gray-400">Class</span>
          <span className="text-xs text-gray-400">Ownership</span>
          <span className="text-xs text-gray-400">Gender</span>
          <span className="truncate text-xs font-normal text-gray-900">{institute.class}</span>
          <span className="truncate text-xs font-normal text-gray-900">{institute.ownership}</span>
          <span className="truncate text-xs font-normal text-gray-900">{institute.gender}</span>
        </div>

        <div className="mb-4 flex flex-col bg-gray-50 px-4 text-xs text-gray-400">
          <span>Rating</span>
          <div className="mt-1.5 flex items-center gap-1">
            <Star size={12} className="fill-amber-500 text-amber-500" />
            <span className="text-xs font-bold text-amber-500">{institute.rating.stars.toFixed(1)}</span>
            <span className="text-xs font-semibold text-gray-400">({institute.rating.count} reviews)</span>
          </div>
        </div>

        <div className="mt-auto grid grid-cols-3 gap-2 border-t border-gray-100 px-2 pt-4 text-xs font-semibold text-gray-400">
          <div className="flex items-center gap-1.5">
            <ThumbsUp size={12} className="text-gray-300" />
            {institute.stats.likes}
          </div>
          <div className="flex items-center gap-1.5">
            <MessageCircle size={12} className="text-gray-300" />
            {institute.stats.messages}
          </div>
          <div className="flex items-center gap-1.5">
            <GitFork size={12} className="text-gray-300" />
            {institute.stats.forks}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button className="cursor-pointer rounded-lg border border-gray-200 bg-white py-2.5 text-sm font-bold text-gray-900 hover:bg-gray-200">
            Details
          </button>
          <button className="cursor-pointer rounded-lg bg-black py-2.5 text-sm font-bold text-white hover:bg-[#13223f]">
            Contact
          </button>
        </div>
      </div>
    </div>
  );
}

const sortLabels: Record<SortOption, string> = {
  recommended: 'Recommended',
  'most-reviewed': 'Most Reviewed',
  'highest-rated': 'Highest Rated',
};

export default function InstitutesResults({
  data,
  sortBy,
  onSortChange,
}: {
  data: Institute[];
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
}) {
  const [showSortMenu, setShowSortMenu] = useState(false);
  const sortRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setShowSortMenu(false);
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <main className="bg-white p-4 md:p-8">
      <div className="mb-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <p className="text-xs text-gray-500">
          Showing <span className="font-bold text-gray-900">{data.length} results</span>
        </p>
        <div ref={sortRef} className="relative flex items-center gap-2.5 text-xs text-gray-500">
          Sort by:
          <button
            type="button"
            onClick={() => setShowSortMenu((current) => !current)}
            className="flex items-center gap-1 font-bold text-gray-900"
          >
            {sortLabels[sortBy]}
            <ChevronDown size={14} />
          </button>

          {showSortMenu ? (
            <div className="absolute right-0 top-full z-10 mt-2 min-w-40 overflow-hidden border border-gray-300 bg-white shadow-lg">
              {(['recommended', 'most-reviewed', 'highest-rated'] as SortOption[]).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    onSortChange(option);
                    setShowSortMenu(false);
                  }}
                  className={`block w-full px-3 py-2 text-left text-xs lg:text-sm ${
                    sortBy === option ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {sortLabels[option]}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {data.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {data.map((institute) => (
            <InstituteCard key={institute.id} institute={institute} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-gray-500">
          No institutes match your current search and filters.
        </div>
      )}
    </main>
  );
}
