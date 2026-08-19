'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Folder, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { MediaGroup } from '@/app/data/impactData';

const folderColors = [
  'text-red-600',
  'text-blue-600',
  'text-amber-600',
  'text-green-600',
  'text-purple-600',
];

export default function MediaGallery({
  mediaGallery,
  onImageClick,
}: {
  mediaGallery: MediaGroup[];
  onImageClick: (src: string, alt: string) => void;
}) {
  const [openLabel, setOpenLabel] = useState<string | null>(null);

  if (!mediaGallery.length) return null;

  return (
    <div className="rounded-2xl border border-neutral-gray-light bg-white shadow-sm p-6 sm:p-8 mb-8">
      <h2 className="text-2xl font-bold text-neutral-black mb-6">Media Gallery</h2>
      <div className="space-y-4">
        {mediaGallery.map((group, gIdx) => {
          const isOpen = openLabel === group.label;
          return (
            <div
              key={group.label}
              className="rounded-xl border border-neutral-gray-light overflow-hidden"
            >
              <button
                onClick={() => setOpenLabel(isOpen ? null : group.label)}
                className="w-full flex items-center justify-between p-4 bg-neutral-bg-light hover:bg-neutral-gray-light/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Folder className={cn('h-6 w-6', folderColors[gIdx % folderColors.length])} />
                  <div className="text-left">
                    <h3 className="font-bold text-neutral-black">{group.label}</h3>
                    <p className="text-xs text-neutral-gray-medium">
                      {group.items.length} {group.items.length === 1 ? 'item' : 'items'}
                    </p>
                  </div>
                </div>
                <ChevronRight
                  className={cn(
                    'h-5 w-5 text-neutral-gray-medium transition-transform',
                    isOpen && 'rotate-90'
                  )}
                />
              </button>
              {isOpen && (
                <div className="p-4 bg-white border-t border-neutral-gray-light">
                  {group.items.length === 0 ? (
                    <p className="text-sm text-neutral-gray-medium">No media yet.</p>
                  ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {group.items.map((item, idx) => (
                        <div
                          key={`${group.label}-${idx}`}
                          className="group cursor-pointer"
                          onClick={() => onImageClick(item.url, item.caption)}
                        >
                          <div className="relative rounded-xl overflow-hidden bg-neutral-bg-light h-48 mb-2">
                            <Image
                              src={item.url}
                              alt={item.caption}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                              <ImageIcon className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </div>
                          <p className="text-xs text-neutral-gray-medium">{item.caption}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
