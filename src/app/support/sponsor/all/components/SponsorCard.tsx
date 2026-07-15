'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Share2 } from 'lucide-react';
import type { Sponsor } from '../data';

interface SponsorCardProps {
  sponsor: Sponsor;
}

export function SponsorCard({ sponsor }: SponsorCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      <Link href={`/support/sponsor/${sponsor.id}`}>
        <div className="relative h-48 bg-neutral-bg-light">
          <Image src={sponsor.image} alt={sponsor.name} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 pt-12">
            <h3 className="font-bold text-white text-lg">{sponsor.name}</h3>
            <p className="flex items-center gap-1 text-xs text-white/80">
              <MapPin className="h-3 w-3" />
              {sponsor.state}, {sponsor.country}
            </p>
          </div>
          <div className={`absolute bottom-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold ${sponsor.status === 'Online' ? 'bg-green-500 text-white' : 'bg-neutral-gray-dark text-white'}`}>
            {sponsor.status === 'Online' ? '● Online' : '○ Offline'}
          </div>
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {sponsor.industries.slice(0, 3).map((ind, idx) => (
            <span key={idx} className="text-xs bg-neutral-bg-light text-neutral-gray-dark px-2 py-1 rounded">
              {ind}
            </span>
          ))}
          {sponsor.industries.length > 3 && (
            <span className="text-xs bg-neutral-bg-light text-neutral-gray-dark px-2 py-1 rounded">
              +{sponsor.industries.length - 3}
            </span>
          )}
        </div>

        <p className="text-sm text-neutral-gray-dark line-clamp-2 mb-3 flex-1">{sponsor.description}</p>

        <div className="flex gap-2 mt-auto">
          <Link href={`/support/sponsor/${sponsor.id}`} className="flex-1">
            <button className="cursor-pointer w-full h-9 rounded-lg border border-neutral-gray-light text-sm font-medium text-neutral-gray-dark hover:bg-neutral-gray-light transition-colors">
              View Details
            </button>
          </Link>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: sponsor.name, text: sponsor.description, url: window.location.href + '/' + sponsor.id });
              } else {
                navigator.clipboard.writeText(window.location.href + '/' + sponsor.id);
              }
            }}
            className="cursor-pointer h-9 w-9 rounded-lg border border-neutral-gray-light flex items-center justify-center text-neutral-gray-dark hover:bg-neutral-gray-light transition-colors"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
