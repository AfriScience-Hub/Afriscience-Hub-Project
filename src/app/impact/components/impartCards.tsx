'use client';

import Image from 'next/image';
import { useState } from 'react';
import {
  DollarSign,
  Eye,
  MapPin,
  Search,
  Share2,
  Trash2,
  Users
} from 'lucide-react';

export interface ImpactItem {
  id: number;
  slug: string;
  title: string;
  organization: string;
  cause: string;
  year: string;
  country: string;
  beneficiaries: string;
  utilizedAmount: string;
  image: string;
  description: string;
}

interface FilterTag {
  group: 'cause' | 'year' | 'country';
  value: string;
  label: string;
}

interface ImpactCardsProps {
  stories: ImpactItem[];
  allStories: ImpactItem[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeTags: FilterTag[];
  onRemoveTag: (group: FilterTag['group'], value?: string) => void;
  onClearAll: () => void;
}

function StoryCard({
  story,
  onShare,
}: {
  story: ImpactItem;
  onShare: (story: ImpactItem) => void;
}) {
  return (
    <article className="overflow-hidden rounded-[30px] border border-[#dfe5ef] bg-white shadow-md">
      <div className="relative h-60 overflow-hidden">
        <Image
          src={story.image}
          alt={story.title}
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />

        <button className="absolute left-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-black/55 text-white">
          <Eye className="h-4 w-4" />
        </button>

        <div className="absolute right-5 top-5 flex items-center gap-3">
          <button
            type="button"
            onClick={() => onShare(story)}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-[#667085] shadow-sm"
          >
            <Share2 className="h-4 w-4" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#667085] shadow-sm">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="space-y-5 p-5">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-[#071b3a]">{story.title}</h3>
          <div className="mt-2 flex items-center gap-2 text-[#98a2b3]">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{story.country}</span>
          </div>
        </div>

        <p className="text-md text-[#475467]">{story.description}</p>

        <div className="grid grid-cols-2 gap-5">
          <div className="flex items-start gap-2">
            <Users className="mt-1 h-4 w-4 text-[#071b3a]" />
            <div>
              <p className="text-sm font-bold text-[#071b3a]">{story.beneficiaries}</p>
              <p className="text-xs text-[#98a2b3]">Beneficiaries</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <DollarSign className="mt-1 h-4 w-4 text-[#00aa44]" />
            <div>
              <p className="text-xs font-bold text-[#071b3a]">{story.utilizedAmount}</p>
              <p className="text-xs text-[#98a2b3]">Utilized</p>
            </div>
          </div>
        </div>

        <div className="border-t border-[#e4e7ec] pt-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <span className="inline-flex rounded-full bg-[#dcfce7] px-4 py-2 text-xs font-semibold text-[#009a49]">
              {story.cause}
            </span>
            <button className="inline-flex cursor-pointer items-center justify-center rounded-md bg-[#0b2342] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#14345f]">
              View Details
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ImpactCards({
  stories,
  allStories,
  searchQuery,
  onSearchChange,
  activeTags,
  onRemoveTag,
  onClearAll,
}: ImpactCardsProps) {;
  const [shareOpen, setShareOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<ImpactItem | null>(null)

  return (
    <section className="min-w-0">
      <div className="relative">
        <Search className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-[#9aa7bc] lg:left-6 lg:h-5 lg:w-5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by title, country, or cause..."
          className="w-full rounded-2xl border border-[#d8dfeb] bg-white py-3 pl-9 pr-6 text-sm text-[#1f2a3d] shadow-sm outline-none transition placeholder:text-[#919db0] focus:border-[#a8b7cd] lg:py-4 lg:pl-16 lg:text-base"
        />
      </div>

      {activeTags.length ? (
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {activeTags.map((tag) => (
            <button
              key={`${tag.group}-${tag.value}`}
              type="button"
              onClick={() => onRemoveTag(tag.group, tag.value)}
              className="cursor-pointer rounded-full bg-[#eef5fb] px-4 py-2 text-sm font-medium text-[#0b2c5f]"
            >
              {tag.label} x
            </button>
          ))}
          <button
            type="button"
            onClick={onClearAll}
            className="cursor-pointer text-sm font-semibold text-[#ff3b30] transition hover:opacity-80"
          >
            Clear All
          </button>
        </div>
      ) : null}

      <div className="mt-8 flex items-center justify-between gap-4">
        <p className="text-sm text-[#5a7195]">
          Showing <span className="font-bold text-[#456c9d]">{stories.length}</span> impact stories
        </p>
        <p className="text-sm text-[#9aa7bc]">{allStories.length} total stories</p>
      </div>

      {stories.length ? (
        <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
          {stories.map((story) => (
            <StoryCard
              key={story.id}
              story={story}
              onShare={(item) => {
                setSelectedStory(item);
                setShareOpen(true);
              }}
            />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-[26px] border border-dashed border-[#d8dfeb] bg-white px-8 py-16 text-center shadow-[0_8px_24px_rgba(15,29,51,0.05)]">
          <h2 className="text-2xl font-bold text-[#0f1d33]">No impact stories match that filter set.</h2>
          <p className="mt-3 text-lg text-[#6a7f9b]">
            Try another search term, switch the cause, or clear a few filters.
          </p>
        </div>
      )}
    </section>
  );
}
