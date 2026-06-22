'use client';

import Image from 'next/image';
import { Folder, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MediaItem {
  url: string;
  caption: string;
}

interface MediaGalleryProps {
  mediaGallery: {
    before?: MediaItem[];
    during?: MediaItem[];
    after?: MediaItem[];
  };
  openFolder: 'before' | 'during' | 'after' | null;
  toggleFolder: (folder: 'before' | 'during' | 'after') => void;
  onImageClick: (src: string, alt: string) => void;
}

export default function MediaGallery({ mediaGallery, openFolder, toggleFolder, onImageClick }: MediaGalleryProps) {
  return (
    <div className="rounded-2xl border border-neutral-gray-light bg-white shadow-sm p-8 mb-8">
      <h2 className="text-2xl font-bold text-neutral-black mb-6">Media Gallery</h2>

      <div className="space-y-4">
        {mediaGallery.before && mediaGallery.before.length > 0 && (
          <div className="rounded-xl border border-neutral-gray-light overflow-hidden">
            <button
              onClick={() => toggleFolder('before')}
              className="w-full flex items-center justify-between p-4 bg-neutral-bg-light hover:bg-neutral-gray-light/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Folder className="h-6 w-6 text-red-600" />
                <div className="text-left">
                  <h3 className="font-bold text-neutral-black">Before</h3>
                  <p className="text-xs text-neutral-gray-medium">{mediaGallery.before.length} {mediaGallery.before.length === 1 ? 'image' : 'images'}</p>
                </div>
              </div>
              <ChevronRight className={cn(
                "h-5 w-5 text-neutral-gray-medium transition-transform",
                openFolder === 'before' && "rotate-90"
              )} />
            </button>
            {openFolder === 'before' && (
              <div className="p-4 bg-white border-t border-neutral-gray-light">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mediaGallery.before.map((media, idx) => (
                    <div key={idx} className="group cursor-pointer" onClick={() => onImageClick(media.url, media.caption)}>
                      <div className="relative rounded-xl overflow-hidden bg-neutral-bg-light h-48 mb-2">
                        <Image src={media.url} alt={media.caption} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                          <ImageIcon className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                      <p className="text-xs text-neutral-gray-medium">{media.caption}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {mediaGallery.during && mediaGallery.during.length > 0 && (
          <div className="rounded-xl border border-neutral-gray-light overflow-hidden">
            <button
              onClick={() => toggleFolder('during')}
              className="w-full flex items-center justify-between p-4 bg-neutral-bg-light hover:bg-neutral-gray-light/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Folder className="h-6 w-6 text-blue-600" />
                <div className="text-left">
                  <h3 className="font-bold text-neutral-black">During</h3>
                  <p className="text-xs text-neutral-gray-medium">{mediaGallery.during.length} {mediaGallery.during.length === 1 ? 'image' : 'images'}</p>
                </div>
              </div>
              <ChevronRight className={cn(
                "h-5 w-5 text-neutral-gray-medium transition-transform",
                openFolder === 'during' && "rotate-90"
              )} />
            </button>
            {openFolder === 'during' && (
              <div className="p-4 bg-white border-t border-neutral-gray-light">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mediaGallery.during.map((media, idx) => (
                    <div key={idx} className="group cursor-pointer" onClick={() => onImageClick(media.url, media.caption)}>
                      <div className="relative rounded-xl overflow-hidden bg-neutral-bg-light h-48 mb-2">
                        <Image src={media.url} alt={media.caption} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                          <ImageIcon className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                      <p className="text-xs text-neutral-gray-medium">{media.caption}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {mediaGallery.after && mediaGallery.after.length > 0 && (
          <div className="rounded-xl border border-neutral-gray-light overflow-hidden">
            <button
              onClick={() => toggleFolder('after')}
              className="w-full flex items-center justify-between p-4 bg-neutral-bg-light hover:bg-neutral-gray-light/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Folder className="h-6 w-6 text-green-600" />
                <div className="text-left">
                  <h3 className="font-bold text-neutral-black">After</h3>
                  <p className="text-xs text-neutral-gray-medium">{mediaGallery.after.length} {mediaGallery.after.length === 1 ? 'image' : 'images'}</p>
                </div>
              </div>
              <ChevronRight className={cn(
                "h-5 w-5 text-neutral-gray-medium transition-transform",
                openFolder === 'after' && "rotate-90"
              )} />
            </button>
            {openFolder === 'after' && (
              <div className="p-4 bg-white border-t border-neutral-gray-light">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mediaGallery.after.map((media, idx) => (
                    <div key={idx} className="group cursor-pointer" onClick={() => onImageClick(media.url, media.caption)}>
                      <div className="relative rounded-xl overflow-hidden bg-neutral-bg-light h-48 mb-2">
                        <Image src={media.url} alt={media.caption} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                          <ImageIcon className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                      <p className="text-xs text-neutral-gray-medium">{media.caption}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
