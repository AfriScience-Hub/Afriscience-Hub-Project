'use client';

import Image from 'next/image';
import { Images, ImageIcon, PlayCircle } from 'lucide-react';

const MAX_MEDIA_FILES = 10;
const isVideoFile = (url: string) => url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.ogg');

interface MediaGalleryTabProps {
  gallery?: string[];
}

export default function MediaGalleryTab({ gallery }: MediaGalleryTabProps) {
  const items = (gallery || []).slice(0, MAX_MEDIA_FILES);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-neutral-black flex items-center gap-2">
          <Images className="h-5 w-5 text-brand-red-600" /> Media Gallery
        </h3>
        <span className="text-xs text-neutral-gray-medium">{items.length} of {MAX_MEDIA_FILES} max · pictures or videos</span>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((item, idx) => (
            <div key={idx} className="group relative aspect-square rounded-xl overflow-hidden bg-neutral-bg-light border border-neutral-gray-light hover:shadow-lg transition-all">
              {isVideoFile(item) ? (
                <div className="relative h-full w-full">
                  <video src={item} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                    <PlayCircle className="h-12 w-12 text-white opacity-80" />
                  </div>
                </div>
              ) : (
                <Image src={item} alt={`Media ${idx + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 50vw, 33vw" />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-neutral-gray-light">
          <ImageIcon className="h-12 w-12 text-neutral-gray-light mx-auto mb-4" />
          <p className="text-neutral-gray-medium">No media files uploaded yet.</p>
        </div>
      )}
    </div>
  );
}
