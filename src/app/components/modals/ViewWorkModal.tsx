'use client';

import Image from 'next/image';
import { BarChart3, ExternalLink, MapPin, Play, X } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

interface ContestantItem {
  id: string;
  name: string;
  country: string;
  image: string;
  competition: string;
  category: string;
  position?: number;
  votes: number;
  livePosition?: number;
}

interface ViewWorkModalProps {
  isOpen: boolean;
  contestant: ContestantItem | null;
  onClose: () => void;
  liveVotes?: number;
}

function formatVotes(votes: number) {
  return votes.toLocaleString();
}

function getViews(contestant: ContestantItem) {
  return Math.round((contestant.livePosition || contestant.position || 0) * 2.6);
}

function getPositionLabel(pos: number) {
  if (pos === 1) return '1st';
  if (pos === 2) return '2nd';
  if (pos === 3) return '3rd';
  return `${pos}th`;
}

export function ViewWorkModal({ isOpen, contestant, onClose }: ViewWorkModalProps) {
  if (!isOpen || !contestant) {
    return null;
  }

  const displayPosition = getPositionLabel(contestant.livePosition || contestant.position || 0);

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/60 p-4">
      <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-[#d8dfeb] px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-[#172235] lg:text-xl">View Work</h2>
            <p className="text-xs text-[#97a4b9] lg:text-sm">Finalist work profile and analytics</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer text-[#56657b] transition hover:text-[#172235]"
          >
            <X className="h-8 w-8" />
          </button>
        </div>

        <div className="space-y-6 px-6 py-5">
          <section className="grid gap-5 rounded-lg border border-[#d9e1ec] p-4 md:grid-cols-[180px_1fr]">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={contestant.image}
                alt={contestant.name}
                fill
                sizes="180px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-[#ff3b30]">Title</p>
              <h3 className="mt-2 text-2xl font-bold text-[#172235]">{contestant.name}</h3>
              <div className="mt-3 grid gap-2 text-sm text-[#55657b] sm:grid-cols-2">
                <p>
                  <span className="font-semibold text-[#172235]">Competition:</span>{' '}
                  {contestant.competition}
                </p>
                <p>
                  <span className="font-semibold text-[#172235]">Category:</span>{' '}
                  {contestant.category}
                </p>
                <p>
                  <span className="font-semibold text-[#172235]">Position:</span>{' '}
                  {displayPosition}
                </p>
                <p className="inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-[#91a3bf]" />
                  {contestant.country}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-[#d9e1ec] p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-[#ff3b30]">Work Description</p>
            <h3 className="mt-2 text-lg font-bold text-[#172235]">Work Summary</h3>
            <p className="mt-2 text-sm leading-6 text-[#55657b]">
              {contestant.name} is representing {contestant.country} in {contestant.competition}
              , competing in the {contestant.category} category.
            </p>
            <button className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-md bg-[#0f2542] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#17355d]">
              <Play className="h-4 w-4" />
              View Work Video
            </button>
          </section>

          <section className="rounded-lg border border-[#d9e1ec] p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-[#ff3b30]">
              Performance Analytics
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg bg-[#f7f9fc] p-3">
                <BarChart3 className="h-5 w-5 text-[#ff3b30]" />
                <p className="mt-2 text-xs text-[#8d9cb1]">Position</p>
                <p className="text-lg font-bold text-[#172235]">{displayPosition}</p>
              </div>
              <div className="rounded-lg bg-[#f7f9fc] p-3">
                <p className="text-xs text-[#8d9cb1]">Total Votes</p>
                <p className="mt-2 text-lg font-bold text-[#ff3b30]">
                  {formatVotes(contestant.votes)}
                </p>
              </div>
              <div className="rounded-lg bg-[#f7f9fc] p-3">
                <p className="text-xs text-[#8d9cb1]">Total Views</p>
                <p className="mt-2 text-lg font-bold text-[#172235]">
                  {formatVotes(getViews(contestant))}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-[#d9e1ec] p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-[#ff3b30]">Social Handles</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {[
                { label: 'LinkedIn', icon: FaLinkedinIn },
                { label: 'Twitter', icon: FaTwitter },
                { label: 'Instagram', icon: FaInstagram },
                { label: 'Facebook', icon: FaFacebookF },
              ].map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  type="button"
                  className="flex cursor-pointer items-center justify-between rounded-lg border border-[#d9e1ec] px-4 py-3 text-sm font-semibold text-[#172235] transition hover:bg-[#f7f9fc]"
                >
                  <span className="inline-flex items-center gap-3">
                    <Icon className="h-4 w-4 text-[#ff3b30]" />
                    {label}
                  </span>
                  <ExternalLink className="h-4 w-4 text-[#91a3bf]" />
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="flex justify-end border-t border-[#d8dfeb] bg-[#f7f9fc] px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-md border border-[#d8dfeb] bg-white px-4 py-2 text-sm font-semibold text-[#172235]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
