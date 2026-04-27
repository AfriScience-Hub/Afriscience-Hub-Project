'use client';

import Image from 'next/image';
import { CalendarDays, Eye, MapPin, Search, UserRound, Wallet } from 'lucide-react';

export interface CompetitionItem {
  id: number;
  name: string;
  type: string;
  category: string;
  country: string;
  description: string;
  registrationFee: string;
  deadline: string;
  participants: number;
  image: string;
}

interface FilterTag {
  group: 'types' | 'categories' | 'country';
  value: string;
  label: string;
}

interface CompetitionCardsProps {
  competitions: CompetitionItem[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeTags: FilterTag[];
  onRemoveTag: (group: FilterTag['group'], value?: string) => void;
  onClearAll: () => void;
}

function CompetitionCard({ competition }: { competition: CompetitionItem }) {
  return (
    <article className="overflow-hidden rounded-[18px] border border-[#d8dfeb] bg-white shadow-md">
      <div className="relative h-60 overflow-hidden">
        <Image
          src={competition.image}
          alt={competition.name}
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
        <button className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-white/95 text-[#50627f] shadow-sm">
          <Eye className="h-4 w-4" />
        </button>
        <span className="absolute left-4 top-4 rounded-full bg-[#fff2b4] px-3 py-1 text-sm font-bold text-[#bf5a00]">
          {competition.type.toUpperCase()}
        </span>
      </div>

      <div className="space-y-4 p-4">
        <p className="line-clamp-2 text-xs italic text-[#91a0b8]">
          {competition.description}
        </p>

        <div>
          <h3 className="text-sm font-bold leading-tight text-[#0f1d33]">
            {competition.name}
          </h3>
          <div className="mt-2">
            <span className="rounded-full bg-[#eef5fb] px-3 py-1 text-xs font-bold text-[#264e7f]">
              {competition.category.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="space-y-3 border-t border-[#d8dfeb] pt-4 text-xs text-[#51637f]">
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2">
              <Wallet className="h-4 w-4 text-[#22a45d]" />
              Registration:
            </span>
            <span className="font-semibold text-[#0f1d33]">{competition.registrationFee}</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-[#9aa7bc]" />
              Deadline:
            </span>
            <span className="font-semibold text-[#0f1d33]">{competition.deadline}</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2">
              <UserRound className="h-4 w-4 text-[#9aa7bc]" />
              Participants:
            </span>
            <span className="font-semibold text-[#0f1d33]">{competition.participants}</span>
          </div>
        </div>

        <button className="w-full rounded-[10px] bg-[#0f2542] px-3 py-2 cursor-pointer text-sm font-semibold text-white transition hover:bg-[#17355d]">
          View Details
        </button>
      </div>
    </article>
  );
}

export default function CompetitionCards({
  competitions,
  searchQuery,
  onSearchChange,
  activeTags,
  onRemoveTag,
  onClearAll,
}: CompetitionCardsProps) {
  const groupedCompetitions = competitions.reduce<Record<string, CompetitionItem[]>>((groups, competition) => {
    if (!groups[competition.country]) {
      groups[competition.country] = [];
    }
    groups[competition.country].push(competition);
    return groups;
  }, {});

  const groupedEntries = Object.entries(groupedCompetitions).sort(([first], [second]) =>
    first.localeCompare(second)
  );

  return (
    <section className="min-w-0">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 lg:left-6 top-1/2 lg:h-7 lg:w-7 -translate-y-1/2 text-[#9aa7bc]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search competitions by name, type, or keyword..."
          className="w-full rounded-3xl border border-[#d8dfeb] bg-white py-3 lg:py-5 pl-8 lg:pl-16 pr-6 text-md text-[#1f2a3d] shadow-md outline-none transition placeholder:text-[#919db0] focus:border-[#a8b7cd]"
        />
      </div>

      {activeTags.length ? (
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {activeTags.map((tag) => (
            <button
              key={`${tag.group}-${tag.value}`}
              type="button"
              onClick={() => onRemoveTag(tag.group, tag.value)}
              className="rounded-full bg-[#eef5fb] px-4 py-2 text-sm font-medium text-[#0b2c5f]"
            >
              {tag.label} ×
            </button>
          ))}
          <button
            type="button"
            onClick={onClearAll}
            className="text-sm font-semibold text-[#ff3b30] transition hover:opacity-80"
          >
            Clear All
          </button>
        </div>
      ) : null}

      <p className="mt-8 text-md text-[#5a7195]">
        Showing <span className="font-bold text-[#456c9d]">{competitions.length}</span> {competitions.length === 1 ? 'competition' : 'competitions'}
      </p>

      {groupedEntries.length ? (
        <div className="mt-6 space-y-10">
          {groupedEntries.map(([country, countryCompetitions]) => (
            <section key={country}>
              <div className="flex items-center gap-3 border-b-2 border-[#152b45] pb-3">
                <MapPin className="h-5 w-5 text-[#ff3b30]" />
                <h2 className="text-md lg:text-lg font-bold text-[#0f1d33]">{country}</h2>
                <span className="text-sm lg:text-md text-[#9aa7bc]">
                  {countryCompetitions.length} {countryCompetitions.length === 1 ? 'competition' : 'competitions'}
                </span>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-2">
                {countryCompetitions.map((competition) => (
                  <CompetitionCard key={competition.id} competition={competition} />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-[26px] border border-dashed border-[#d8dfeb] bg-white px-8 py-16 text-center shadow-[0_8px_24px_rgba(15,29,51,0.05)]">
          <h2 className="text-2xl font-bold text-[#0f1d33]">No competitions match that filter set.</h2>
          <p className="mt-3 text-lg text-[#6a7f9b]">
            Try another search term, switch the competition type, or clear a few filters.
          </p>
        </div>
      )}
    </section>
  );
}
