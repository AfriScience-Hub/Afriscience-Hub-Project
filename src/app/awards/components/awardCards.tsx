'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Award, Eye, MapPin, Search, UserRound, X } from 'lucide-react';

export interface AwardItem {
  id: number;
  name: string;
  recipient: string;
  type: string;
  category: string;
  level: string;
  year: string;
  country: string;
  description: string;
  image: string;
  certificateImage: string;
}

interface FilterTag {
  group: 'types' | 'category' | 'level' | 'year' | 'country';
  value: string;
  label: string;
}

interface AwardCardsProps {
  awards: AwardItem[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeTags: FilterTag[];
  onRemoveTag: (group: FilterTag['group'], value?: string) => void;
  onClearAll: () => void;
}

function typeBadgeClasses(type: string) {
  if (type === "Developer's Award") {
    return 'bg-[#e8f1ff] text-[#245ab8]';
  }

  if (type === "Sponsorship Award") {
    return 'bg-[#fff2d8] text-[#b56a00]';
  }

  if (type === "Competition's Award") {
    return 'bg-[#efe9ff] text-[#6941c6]';
  }

  return 'bg-[#ffe9ef] text-[#c33a65]';
}

function CertificateModal({
  award,
  isOpen,
  onClose,
}: {
  award: AwardItem | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen || !award) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/65 p-4">
      <div className="w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-[#d8dfeb] px-3 py-3 lg:px-4">
          <div className="flex items-start gap-3">
            <Award className="mt-1 h-5 w-5 text-[#ff3b30]" />
            <div>
              <h2 className="text-lg font-bold text-[#172235] lg:text-xl">{award.name}</h2>
              <p className="text-sm text-[#97a4b9]">{award.recipient} • {award.country}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-[#56657b] transition hover:text-[#172235] cursor-pointer"
          >
            <X className="h-7 w-7" />
          </button>
        </div>

        <div className="bg-[#f7f9fc] p-4 lg:p-6">
          <div className="relative mx-auto aspect-4/3 w-full max-w-xl overflow-y-auto lg:max-h-[70vh] rounded-xl border border-[#d8dfeb] bg-white shadow-md">
            <Image
              src={award.certificateImage}
              alt={`${award.name} certificate`}
              fill
              unoptimized
              sizes="(min-width: 1280px) 900px, 100vw"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function AwardCard({
  award,
  onViewCertificate,
}: {
  award: AwardItem;
  onViewCertificate: (award: AwardItem) => void;
}) {
  return (
    <article className="overflow-hidden rounded-[18px] border border-[#d8dfeb] bg-white shadow-md">
      <div className="relative h-60 overflow-hidden">
        <Image
          src={award.image}
          alt={award.name}
          fill
          unoptimized
          sizes="(min-width: 1280px) 33vw, (min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
        <button
          type="button"
          onClick={() => onViewCertificate(award)}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-[#50627f] shadow-sm"
        >
          <Eye className="h-4 w-4" />
        </button>
        <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold ${typeBadgeClasses(award.type)}`}>
          {award.type.toUpperCase()}
        </span>
      </div>

      <div className="space-y-4 p-4">
        <p className="line-clamp-2 text-xs italic text-[#91a0b8]">{award.description}</p>

        <div>
          <h3 className="text-sm font-bold leading-tight text-[#0f1d33]">{award.name}</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="rounded-full bg-[#eef5fb] px-3 py-1 text-xs font-bold text-[#264e7f]">
              {award.category.toUpperCase()}
            </span>
            <span className="rounded-full bg-[#f8fafc] px-3 py-1 text-xs font-bold text-[#6a7f9b]">
              {award.level.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="space-y-3 border-t border-[#d8dfeb] pt-4 text-xs text-[#51637f]">
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2">
              <UserRound className="h-4 w-4 text-[#22a45d]" />
              Recipient:
            </span>
            <span className="font-semibold text-[#0f1d33]">{award.recipient}</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2">
              <Award className="h-4 w-4 text-[#9aa7bc]" />
              Year:
            </span>
            <span className="font-semibold text-[#0f1d33]">{award.year}</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#9aa7bc]" />
              Country:
            </span>
            <span className="font-semibold text-[#0f1d33]">{award.country}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onViewCertificate(award)}
          className="w-full cursor-pointer rounded-[10px] bg-[#0f2542] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#17355d]"
        >
          View Certificate
        </button>
      </div>
    </article>
  );
}

export default function AwardCards({
  awards,
  searchQuery,
  onSearchChange,
  activeTags,
  onRemoveTag,
  onClearAll,
}: AwardCardsProps) {
  const [selectedAward, setSelectedAward] = useState<AwardItem | null>(null);

  return (
    <section className="min-w-0">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9aa7bc] lg:left-6 lg:h-7 lg:w-7" />
        <input
          type="text"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search awards by recipient, type, category, or country..."
          className="w-full rounded-3xl border border-[#d8dfeb] bg-white py-3 pl-8 pr-6 text-md text-[#1f2a3d] shadow-md outline-none transition placeholder:text-[#919db0] focus:border-[#a8b7cd] lg:py-5 lg:pl-16"
        />
      </div>

      {activeTags.length ? (
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {activeTags.map((tag) => (
            <button
              key={`${tag.group}-${tag.value}`}
              type="button"
              onClick={() => onRemoveTag(tag.group, tag.value)}
              className="rounded-full bg-[#eef5fb] px-4 py-2 text-sm cursor-pointer font-medium text-[#0b2c5f]"
            >
              {tag.label} x
            </button>
          ))}
          <button
            type="button"
            onClick={onClearAll}
            className="text-xs lg:text-sm cursor-pointer font-semibold text-[#ff3b30] transition hover:opacity-80"
          >
            Clear All
          </button>
        </div>
      ) : null}

      <p className="mt-8 text-md text-[#5a7195]">
        Showing <span className="font-bold text-[#456c9d]">{awards.length}</span> {awards.length === 1 ? 'award' : 'awards'}
      </p>

      {awards.length ? (
        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {awards.map((award) => (
            <AwardCard
              key={award.id}
              award={award}
              onViewCertificate={setSelectedAward}
            />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-[26px] border border-dashed border-[#d8dfeb] bg-white px-8 py-16 text-center shadow-[0_8px_24px_rgba(15,29,51,0.05)]">
          <h2 className="text-2xl font-bold text-[#0f1d33]">No awards match that filter set.</h2>
          <p className="mt-3 text-lg text-[#6a7f9b]">
            Try another search term, switch the award type, or clear a few filters.
          </p>
        </div>
      )}

      <CertificateModal
        award={selectedAward}
        isOpen={selectedAward !== null}
        onClose={() => setSelectedAward(null)}
      />
    </section>
  );
}
