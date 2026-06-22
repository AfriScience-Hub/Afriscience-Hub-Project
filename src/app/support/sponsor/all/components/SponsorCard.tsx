'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Eye, Share2, Archive, ArchiveX, MapPin, Phone } from 'lucide-react';
import { Button } from '../../../../components/ui/Button';
import type { Sponsor } from '../data';

interface SponsorCardProps {
  sponsor: Sponsor;
  isArchived: boolean;
  onToggleArchive: (id: number) => void;
  onShare: (sponsor: Sponsor) => void;
}

export function SponsorCard({ sponsor, isArchived, onToggleArchive, onShare }: SponsorCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48 bg-neutral-bg-light">
        <Image src={sponsor.image} alt={sponsor.name} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
        <Link href={`/support/sponsor/${sponsor.id}`}>
          <button className="absolute top-3 left-3 h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors">
            <Eye className="h-4 w-4 text-neutral-gray-dark" />
          </button>
        </Link>
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={() => onShare(sponsor)}
            className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
          >
            <Share2 className="h-4 w-4 text-neutral-gray-dark" />
          </button>
          <button
            onClick={() => onToggleArchive(sponsor.id)}
            className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
          >
            {isArchived ? (
              <ArchiveX className="h-4 w-4 text-brand-red-600" />
            ) : (
              <Archive className="h-4 w-4 text-neutral-gray-dark" />
            )}
          </button>
        </div>
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-neutral-black">
          {sponsor.badge}
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-lg text-neutral-black mb-1">{sponsor.name}</h3>
        <p className="text-xs text-brand-red-600 font-semibold mb-2">{sponsor.industry}</p>

        <div className="flex items-center gap-4 text-xs text-neutral-gray-medium mb-3">
          <span className={`inline-flex items-center gap-1 ${sponsor.status === 'Online' ? 'text-green-600' : 'text-neutral-gray-dark'}`}>
            <div className={`h-2 w-2 rounded-full ${sponsor.status === 'Online' ? 'bg-green-600' : 'bg-neutral-gray-dark'}`} />
            {sponsor.status}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {sponsor.country}, {sponsor.state}
          </span>
        </div>

        <div className="mb-4">
          <p className="text-xs font-bold text-neutral-gray-medium uppercase mb-2">Catalog</p>
          <div className="flex flex-wrap gap-1.5">
            {sponsor.catalog.slice(0, 3).map((item, idx) => (
              <span key={idx} className="text-xs bg-neutral-bg-light text-neutral-gray-dark px-2 py-1 rounded">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Link href={`/support/sponsor/${sponsor.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              View Details
            </Button>
          </Link>
          <Button size="sm" className="bg-brand-red-600 hover:bg-brand-red-700">
            <Phone className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
