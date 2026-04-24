'use client';

import Image from 'next/image';
import { Archive, Eye, MapPin, Search, Share2, Star, ThumbsUp, CircleCheck } from 'lucide-react';

interface SpecialistCenter {
  id: number;
  name: string;
  field: string;
  categories: string[];
  services: string[];
  ownership: string;
  status: 'ONLINE' | 'OFFLINE';
  location: {
    city: string;
    region: string;
    country: string;
  };
  rating: number;
  stats: {
    views: string;
    likes: string;
    shares: string;
  };
  image: string;
}

interface FilterTag {
  group: 'field' | 'categories' | 'services' | 'ownership' | 'status' | 'country' | 'region';
  value: string;
  label: string;
}

interface FilterCardsProps {
  centers: SpecialistCenter[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeTags: FilterTag[];
  onRemoveTag: (group: FilterTag['group'], value?: string) => void;
  onClearAll: () => void;
}

function RatingStars({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={`h-3 w-3 ${index < fullStars ? 'fill-[#ff9800] text-[#ff9800]' : 'text-[#d4dce8]'}`}
        />
      ))}
    </div>
  );
}

function CenterCard({ center }: { center: SpecialistCenter }) {
  return (
    <article className="overflow-hidden rounded-lg border border-[#d8dfeb] bg-white shadow-lg">
      <div className="relative h-60 overflow-hidden">
        <Image
          src={center.image}
          alt={center.name}
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 1024px) 50vw, 100vw"
          className="object-cover transition duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/30 to-transparent" />

        <div className="absolute left-4 top-5">
          <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#50627f] shadow-sm transition cursor-pointer hover:bg-[#f5f7fb]">
            <Eye className="h-5 w-5" />
          </button>
        </div>

        <div className="absolute right-4 top-5 flex gap-3">
          <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#50627f] shadow-sm transition cursor-pointer hover:bg-[#f5f7fb]">
            <Share2 className="h-5 w-5" />
          </button>
          <button  className="cursor-pointer flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#50627f] shadow-sm transition hover:bg-[#f5f7fb]">
            <Archive className="h-5 w-5" />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <span
            className={`inline-flex rounded-sm px-3 py-1 text-sm font-bold ${
              center.status === 'ONLINE' ? 'bg-[#00d84f]' : 'bg-[#596273]'
            }`}
          >
            {center.status}
          </span>

          <h3 className="flex mt-2 text-sm font-bold leading-tight">
            {center.name}
            <CircleCheck className="h-4 w-4 text-blue-600 ml-1 mt-" />
          </h3>

          <div className="mt-2 flex items-center gap-2 text-sm text-white/90">
            <MapPin className="h-4 w-4 shrink-0" />
            <span>
              {center.location.city}, {center.location.country}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-3">
        <div className="flex flex-wrap gap-1">
          <span className="rounded-xl bg-[#eef5fb] px-3 py-1.5 text-xs font-bold text-[#092d63]">
            {center.field.toUpperCase()}
          </span>
          <span className="rounded-xl bg-[#f8fafc] px-3 py-1.5 text-xs font-bold text-[#51637f]">
            {center.ownership.toUpperCase()}
          </span>
        </div>

        <div className="flex flex-wrap gap-1">
          {center.categories.slice(0, 2).map((category) => (
            <span
              key={category}
              className="rounded-full border border-[#d8dfeb] px-3 py-1.5 text-xs text-[#51637f]"
            >
              {category}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-1">
          {center.services.slice(0, 2).map((service) => (
            <span
              key={service}
              className="rounded-full bg-[#fff2f2] px-3 py-1.5 text-xs text-[#ff4b43]"
            >
              {service.replace(' & ', ' ')}
            </span>
          ))}
          <span className="text-xs text-[#91a0b8]">+{Math.max(center.services.length - 2, 0)}</span>
        </div>

        <div className="flex items-center gap-1 text-[#0f1d33]">
          <RatingStars rating={center.rating} />
          <span className="text-lg font-bold">{center.rating.toFixed(1)}</span>
        </div>

        <div className="grid grid-cols-3 gap-3 border-t border-[#d8dfeb] pt-3 text-sm text-[#7f93b2]">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span>{center.stats.views}</span>
          </div>
          <div className="flex items-center gap-2">
            <ThumbsUp className="h-4 w-4" />
            <span>{center.stats.likes}</span>
          </div>
          <div className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            <span>{center.stats.shares}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button className="rounded-lg bg-[#0f2542] p-2 text-sm font-semibold text-white transition hover:bg-[#17355d]">
            View Details
          </button>
          <button className="rounded-lg border border-[#d8dfeb] bg-white p-2 text-sm font-semibold text-[#0f2542] transition hover:bg-[#f5f7fb]">
            Contact
          </button>
        </div>
      </div>
    </article>
  );
}

export default function FilterCards({
  centers,
  searchQuery,
  onSearchChange,
  activeTags,
  onRemoveTag,
  onClearAll,
}: FilterCardsProps) {
  return (
    <section className="min-w-0">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 lg:left-6 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9aa7bc]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search centers by name, field, category, or location..."
          className="w-full rounded-3xl border border-[#d8dfeb] bg-white py-3 lg:py-4 pl-9 lg:pl-16 pr-6 text-sm lg:text-md text-[#1f2a3d] shadow-sm outline-none transition placeholder:text-[#919db0] focus:border-[#a8b7cd]"
        />
      </div>

      {activeTags.length ? (
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {activeTags.map((tag) => (
            <button
              key={`${tag.group}-${tag.value}`}
              type="button"
              onClick={() => onRemoveTag(tag.group, tag.value)}
              className="rounded-full bg-[#eef5fb] px-4 py-2 text-lg font-medium cursor-pointer text-[#0b2c5f]"
            >
              {tag.label} ×
            </button>
          ))}
          <button
            type="button"
            onClick={onClearAll}
            className="text-lg font-semibold text-[#ff3b30] transition hover:opacity-80 cursor-pointer"
          >
            Clear All
          </button>
        </div>
      ) : null}

      <p className="mt-8 text-md text-[#5a7195]">
        Showing <span className="font-bold text-[#456c9d]">{centers.length}</span> {centers.length === 1 ? 'center' : 'centers'}
      </p>

      {centers.length ? (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {centers.map((center) => (
            <CenterCard key={center.id} center={center} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-[26px] border border-dashed border-[#d8dfeb] bg-white px-8 py-16 text-center shadow-[0_8px_24px_rgba(15,29,51,0.05)]">
          <h2 className="text-2xl font-bold text-[#0f1d33]">No specialist centers match that filter set.</h2>
          <p className="mt-3 text-lg text-[#6a7f9b]">
            Try another search term, switch the selected field, or clear a few filters.
          </p>
        </div>
      )}
    </section>
  );
}
