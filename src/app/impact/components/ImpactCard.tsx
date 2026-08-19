'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Eye, MapPin, Users, DollarSign } from 'lucide-react';
import {
  type ImpactStory,
  formatImpactLocation,
  getCardPrimaryTitle,
  getCardSecondaryMetric,
  getDpBadgeLabel,
} from '@/app/data/impactData';
import { Button } from '@/app/components/ui/Button';
import { cn } from '@/lib/utils';

interface ImpactCardProps {
  story: ImpactStory;
  onPreview: (src: string, alt: string) => void;
}

export default function ImpactCard({ story, onPreview }: ImpactCardProps) {
  const title = getCardPrimaryTitle(story);
  const secondary = getCardSecondaryMetric(story);
  const badge = getDpBadgeLabel(story);
  const isActive = story.status === 'Active';

  return (
    <div className="rounded-2xl border border-neutral-gray-light bg-white shadow-sm hover:shadow-md hover:border-brand-red-200 transition-all duration-300 overflow-hidden group">
      <div className="relative h-48 bg-neutral-bg-light overflow-hidden">
        <Image
          src={story.image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        <button
          onClick={() => onPreview(story.image, title)}
          className="absolute top-3 left-3 h-8 w-8 rounded-full bg-black/60 backdrop-blur-sm hover:bg-black/75 flex items-center justify-center transition-colors shadow-sm cursor-pointer z-10"
          title="View Image"
        >
          <Eye className="h-4 w-4 text-white" />
        </button>

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-3 pb-3 pt-10">
          <div className="flex items-end justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold text-white/80 tracking-wide truncate">
                {story.idTag}
              </p>
              <p className="text-xs font-bold text-white truncate">{badge}</p>
            </div>
            <span
              className={cn(
                'shrink-0 inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold',
                isActive ? 'bg-green-500 text-white' : 'bg-neutral-gray-medium text-white'
              )}
            >
              {story.status}
            </span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-neutral-black mb-1 line-clamp-2 min-h-[2.5rem]">{title}</h3>

        <p className="text-xs text-neutral-gray-medium mb-1">
          <span className="font-semibold text-neutral-gray-dark">{secondary.label}:</span>{' '}
          {secondary.value}
        </p>

        <div className="flex items-center gap-1.5 text-xs text-neutral-gray-medium mb-3">
          <MapPin className="h-3 w-3 shrink-0" />
          <span className="line-clamp-1">{formatImpactLocation(story.location)}</span>
        </div>

        <p className="text-sm text-neutral-gray-dark mb-4 line-clamp-2">{story.summary}</p>

        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-neutral-gray-light">
          <div className="flex items-center gap-1.5">
            <DollarSign className="h-4 w-4 text-green-600" />
            <div>
              <p className="text-xs font-bold text-neutral-black">{story.fundsUtilized}</p>
              <p className="text-[10px] text-neutral-gray-medium">Funds Utilized</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-brand-navy-900" />
            <div>
              <p className="text-xs font-bold text-neutral-black">
                {story.beneficiaries.toLocaleString()}
              </p>
              <p className="text-[10px] text-neutral-gray-medium">No. of Beneficiaries</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex px-2 py-1 rounded-full text-[10px] font-bold bg-brand-navy-900/10 text-brand-navy-900 line-clamp-1">
            {story.program}
          </span>
          <Link href={`/impact/${story.id}`}>
            <Button size="sm" className="bg-brand-navy-900 hover:bg-brand-navy-800 shrink-0">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
