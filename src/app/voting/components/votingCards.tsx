'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import {
  AlertCircle,
  CheckSquare,
  Copy,
  Eye,
  Search,
  Share2,
  Trophy,
  X,
} from 'lucide-react';
import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

export interface ContestantItem {
  id: number;
  slug: string;
  name: string;
  type: string;
  competition: string;
  category: string;
  year: string;
  country: string;
  votes: number;
  position: string;
  image: string;
}

interface FilterTag {
  group: 'type' | 'competition' | 'category' | 'year' | 'country';
  value: string;
  label: string;
}

interface VotingCardsProps {
  contestants: ContestantItem[];
  allContestants: ContestantItem[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeTags: FilterTag[];
  onRemoveTag: (group: FilterTag['group'], value?: string) => void;
  onClearAll: () => void;
}

type ShareMode = 'choice' | 'link' | 'contestant-list';

function formatVotes(votes: number) {
  return votes.toLocaleString();
}

function ContestantCard({
  contestant,
  onShareContestant,
}: {
  contestant: ContestantItem;
  onShareContestant: (contestant: ContestantItem) => void;
}) {
  return (
    <article className="overflow-hidden rounded-lg border border-[#d8dfeb] bg-white shadow-lg">
      <div className="relative h-60 overflow-hidden">
        <Image
          src={contestant.image}
          alt={contestant.name}
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />

        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/55 px-3 py-1 text-white">
          <Eye className="h-4 w-4" />
          <span className="text-sm font-semibold">0</span>
        </div>

        <button className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#50627f] shadow-sm">
          <Trophy className="h-5 w-5" />
        </button>

        <span className="absolute bottom-4 left-4 rounded-full bg-[#ffb01f] px-3 py-1 text-xs font-bold text-white">
          {contestant.position}
        </span>

        <span className="absolute bottom-4 right-4 rounded-full bg-[#ebe9ff] px-2 py-1 text-xs font-bold text-[#5b55ff]">
          {contestant.type.toUpperCase()}
        </span>
      </div>

      <div className="space-y-3 p-4">
        <div>
          <h3 className="text-md font-bold text-[#0f1d33]">{contestant.name}</h3>
          <p className="text-xs text-[#8d9cb1]">{contestant.country}</p>
          <p className="text-xs text-[#8d9cb1]">{contestant.category}</p>
        </div>

        <div className="rounded-[10px] border border-[#1f2a3d] px-3 py-2">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-[#8d9cb1]">Total Votes</span>
            <span className="text-sm font-bold text-[#ff3b30]">{formatVotes(contestant.votes)}</span>
          </div>
        </div>

          <button className='w-full'>
            <div className="w-full rounded-md bg-[#ff3b30] px-3 py-2 text-sm flex items-center gap-2 justify-center cursor-pointer font-semibold text-white transition hover:opacity-90">
              <CheckSquare className='h-4 w-4'/>
              Vote
            </div>
          </button>

        <div className="grid grid-cols-2 gap-3">
          <button className="rounded-md cursor-pointer border border-[#d8dfeb] bg-white px-4 py-1.5 text-sm font-semibold text-[#0f2542] hover:bg-[#0f2542] hover:text-white transition">
            View Work
          </button>
          <button
            type="button"
            onClick={() => onShareContestant(contestant)}
            className="rounded-md cursor-pointer border border-[#ffb01f] bg-white px-4 py-1.5 text-sm font-semibold text-[#ff9a00] hover:bg-[#ff9a00] hover:text-white transition"
          >
            Boost
          </button>
        </div>
      </div>
    </article>
  );
}

function ShareModal({
  isOpen,
  mode,
  selectedContestant,
  contestants,
  onClose,
  onSelectMode,
  onSelectContestant,
}: {
  isOpen: boolean;
  mode: ShareMode;
  selectedContestant: ContestantItem | null;
  contestants: ContestantItem[];
  onClose: () => void;
  onSelectMode: (mode: ShareMode) => void;
  onSelectContestant: (contestant: ContestantItem) => void;
}) {
  if (!isOpen) {
    return null;
  }

  const shareUrl =
    selectedContestant
      ? `https://sorbet-oval-37393933.figma.site/voting/contestant/${selectedContestant.slug}`
      : 'https://sorbet-oval-37393933.figma.site/voting';

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/60 p-4">
      <div className="max-h-[92vh] w-full max-w-5xl overflow-y-auto scrollbar-hide rounded-lg bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-[#d8dfeb] px-6 py-5">
          <div className="flex items-start gap-4">
            <Share2 className="mt-1 h-5 w-5 text-[#ff3b30]" />
            <div>
              <h2 className="text-xl font-bold text-[#172235]">Share Voting</h2>
              <p className="text-sm text-[#97a4b9]">Spread the word and encourage voting</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-[#56657b] cursor-pointer transition hover:text-[#172235]"
          >
            <X className="h-8 w-8" />
          </button>
        </div>

        {mode === 'choice' ? (
          <>
            <div className="space-y-6 px-6 py-5">
              <p className="text-md text-[#55657b]">Choose what you&apos;d like to share:</p>

              <button
                type="button"
                onClick={() => onSelectMode('link')}
                className="flex cursor-pointer w-full items-center gap-6 rounded-lg border border-[#d9e1ec] px-6 py-4 text-left transition hover:bg-gray-100"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#dbeaff] text-[#2665f5]">
                  <Copy className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#172235]">Share Entire Page</h3>
                  <p className="text-xs text-[#55657b]">Share the voting page link to promote voting generally</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => onSelectMode('contestant-list')}
                className="flex w-full items-center gap-6 rounded-lg border border-[#d9e1ec] cursor-pointer px-6 py-4 text-left transition hover:bg-gray-100"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eedfff] text-[#8a23ff]">
                  <Share2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#172235]">Share Contestant</h3>
                  <p className="text-xs text-[#55657b]">Select a specific contestant to share their work</p>
                </div>
              </button>
            </div>

            <div className="flex justify-end border-t border-[#d8dfeb] bg-[#f7f9fc] px-8 py-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md border border-[#d8dfeb] bg-white p-4 text-sm font-semibold text-[#172235]"
              >
                Close
              </button>
            </div>
          </>
        ) : null}

        {mode === 'contestant-list' ? (
          <>
            <div className="space-y-6 px-6 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#172235]">Select a Contestant</h3>
                <button
                  type="button"
                  onClick={() => onSelectMode('choice')}
                  className="text-md cursor-pointer hover:underline font-medium text-[#ff3b30]"
                >
                  Back
                </button>
              </div>

              <div className="scrollbar-hide max-h-112 space-y-4 overflow-y-auto pr-2">
                {contestants.map((contestant) => {
                  const isSelected = selectedContestant?.id === contestant.id;

                  return (
                    <button
                      key={contestant.id}
                      type="button"
                      onClick={() => onSelectContestant(contestant)}
                      className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left transition cursor-pointer ${
                        isSelected ? 'border-[#ff4b43]' : 'border-[#d9e1ec]'
                      }`}
                    >
                      <div className="relative h-20 w-20 overflow-hidden rounded-2xl">
                        <Image
                          src={contestant.image}
                          alt={contestant.name}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-[#172235]">{contestant.name}</h4>
                        <p className="text-sm text-[#697a91]">{contestant.country}</p>
                        <p className="text-sm text-[#97a4b9]">
                          {contestant.competition} • {contestant.category}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end border-t border-[#d8dfeb] bg-[#f7f9fc] px-4 py-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg cursor-pointer border border-[#d8dfeb] bg-white px-6 py-4 text-sm font-semibold text-[#172235]"
              >
                Close
              </button>
            </div>
          </>
        ) : null}

        {mode === 'link' ? (
          <>
            <div className="space-y-8 px-8 py-8">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#172235]">Share Link</h3>
                <button
                  type="button"
                  onClick={() => {
                    onSelectMode('choice');
                  }}
                  className="text-md hover:underline font-medium text-[#ff3b30]"
                >
                  Start Over
                </button>
              </div>

              <div>
                <p className="mb-3 text-sm text-[#55657b]">Share URL</p>
                <div className="flex gap-3 justify-between">
                  <div className="flex items-center px-4 rounded-2xl border border-[#d9e1ec] text-sm text-[#172235]">
                    {shareUrl}
                  </div>
                  <button className="items-center justify-center gap-3 rounded-lg flex border border-[#d9e1ec] bg-white px-8 py-5 text-sm cursor-pointer hover:bg-gray-200 font-semibold text-[#172235]">
                    <Copy className="h-4 w-4" />
                    Copy
                  </button>
                </div>
              </div>

              <div>
                <p className="mb-5 text-md text-[#55657b]">Share on Social Media</p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <button className="rounded-md cursor-pointer border border-[#d9e1ec] bg-white px-3 py-6 text-center">
                    <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#dbeaff] text-[#2665f5]">
                      <FaFacebookF className="h-6 w-6" />
                    </span>
                    <span className="mt-5 block text-md font-semibold text-[#172235]">Facebook</span>
                  </button>
                  <button className="rounded-md cursor-pointer border border-[#d9e1ec] bg-white px-3 py-6 text-center">
                    <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#dff2ff] text-[#1da1f2]">
                      <FaTwitter className="h-6 w-6" />
                    </span>
                    <span className="mt-5 block text-md font-semibold text-[#172235]">Twitter</span>
                  </button>
                  <button className="rounded-md cursor-pointer border border-[#d9e1ec] bg-white px-3 py-6 text-center">
                    <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#dbe7ff] text-[#2b5be3]">
                      <FaLinkedinIn className="h-6 w-6" />
                    </span>
                    <span className="mt-5 block text-md font-semibold text-[#172235]">LinkedIn</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end border-t border-[#d8dfeb] bg-[#f7f9fc] px-4 py-5">
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer rounded-md border border-[#d8dfeb] bg-white px-8 py-4 text-sm font-semibold text-[#172235]"
              >
                Close
              </button>
            </div>
          </>
        ) : null}

        <style jsx>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }

          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </div>
  );
}

export default function VotingCards({
  contestants,
  allContestants,
  searchQuery,
  onSearchChange,
  activeTags,
  onRemoveTag,
  onClearAll,
}: VotingCardsProps) {
  const [shareOpen, setShareOpen] = useState(false);
  const [shareMode, setShareMode] = useState<ShareMode>('choice');
  const [selectedContestant, setSelectedContestant] = useState<ContestantItem | null>(null);

  const totalVotesCast = useMemo(
    () => contestants.reduce((sum, contestant) => sum + contestant.votes, 0),
    [contestants]
  );

  const openPageShare = () => {
    setSelectedContestant(null);
    setShareMode('choice');
    setShareOpen(true);
  };

  const openContestantShare = (contestant: ContestantItem) => {
    setSelectedContestant(contestant);
    setShareMode('link');
    setShareOpen(true);
  };

  return (
    <section className="min-w-0">
      <div className="mb-3 flex justify-end">
        <button
          type="button"
          onClick={openPageShare}
          className="inline-flex items-center gap-3 rounded-sm border border-[#ff3b30] bg-white px-3 py-3 text-sm font-semibold text-[#ff3b30]"
        >
          <Share2 className="h-5 w-5" />
          Share
        </button>
      </div>

      <div className="relative">
        <Search className="pointer-events-none absolute left-2 lg:left-6 top-1/2 lg:h-7 lg:w-7 -translate-y-1/2 text-[#9aa7bc]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search finalists by name or competition..."
          className="w-full rounded-3xl border border-[#d8dfeb] bg-white py-3 lg:py-4 pl-9 lg:pl-16 pr-6 text-sm lg:text-md text-[#1f2a3d] shadow-sm outline-none transition placeholder:text-[#919db0] focus:border-[#a8b7cd]"
        />
      </div>

      {activeTags.length ? (
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {activeTags.map((tag) => (
            <button
              key={`${tag.group}-${tag.value}`}
              type="button"
              onClick={() => onRemoveTag(tag.group, tag.value)}
              className="rounded-full bg-[#eef5fb] px-4 py-2 text-sm cursor-pointer font-medium text-[#0b2c5f]"
            >
              {tag.label} ×
            </button>
          ))}
          <button
            type="button"
            onClick={onClearAll}
            className="text-sm cursor-pointer font-semibold text-[#ff3b30] transition hover:opacity-80"
          >
            Clear All
          </button>
        </div>
      ) : null}

      <div className="mt-8 rounded-md border border-[#b8d2ff] bg-[#edf5ff] p-4 text-[#2157ff]">
        <div className="flex items-start gap-2">
          <AlertCircle className="mt-1 h-5 w-5 shrink-0" />
          <div>
            <h3 className="text-md font-semibold">Voting Rules</h3>
            <p className="mt-2 text-xs">
              Each user can vote <span className="font-bold">once for free</span> per category. Boost votes available for extra support. Positions update in real-time based on total votes (50% judges + 50% audience).
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <p className="text-sm text-[#5a7195]">
          Showing <span className="font-bold text-[#456c9d]">{contestants.length}</span> top finalists
        </p>
        <p className="text-sm text-[#9aa7bc]">{formatVotes(totalVotesCast)} votes cast</p>
      </div>

      {contestants.length ? (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {contestants.map((contestant) => (
            <ContestantCard
              key={contestant.id}
              contestant={contestant}
              onShareContestant={openContestantShare}
            />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-[26px] border border-dashed border-[#d8dfeb] bg-white px-8 py-16 text-center shadow-[0_8px_24px_rgba(15,29,51,0.05)]">
          <h2 className="text-2xl font-bold text-[#0f1d33]">No finalists match that filter set.</h2>
          <p className="mt-3 text-lg text-[#6a7f9b]">
            Try another search term, switch the category, or clear a few filters.
          </p>
        </div>
      )}

      <ShareModal
        isOpen={shareOpen}
        mode={shareMode}
        selectedContestant={selectedContestant}
        contestants={allContestants}
        onClose={() => {
          setShareOpen(false);
          setShareMode('choice');
          setSelectedContestant(null);
        }}
        onSelectMode={setShareMode}
        onSelectContestant={(contestant) => {
          setSelectedContestant(contestant);
          setShareMode('link');
        }}
      />
    </section>
  );
}
