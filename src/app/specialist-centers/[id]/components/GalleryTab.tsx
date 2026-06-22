'use client';

import Image from 'next/image';
import { Images, ImageIcon, ArrowLeft, PlayCircle } from 'lucide-react';

const GALLERY_LABELS: Record<string, string> = {
  frontGate: 'Front Gate',
  compound: 'Compound / Premise',
  hallways: 'Hallways / Lobbies',
  operationsRoom: 'Operations Room / Wards',
  instruments: 'Instruments Room',
  laboratories: 'Laboratories',
  libraries: 'Libraries',
  offices: 'Offices',
  others: 'Others'
};

const isVideoFile = (url: string) => url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.ogg');

interface GalleryTabProps {
  gallery?: Record<string, string[]>;
  openAlbum: string | null;
  onSetOpenAlbum: (album: string | null) => void;
}

export default function GalleryTab({ gallery, openAlbum, onSetOpenAlbum }: GalleryTabProps) {
  const galleryEntries = gallery ? Object.entries(gallery).filter(([, imgs]) => imgs.length > 0) : [];
  const totalMedia = galleryEntries.reduce((sum, [, imgs]) => sum + imgs.length, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {openAlbum === null ? (
        <>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-neutral-black flex items-center gap-2">
              <Images className="h-5 w-5 text-brand-red-600" /> Media Gallery
            </h3>
            <span className="text-xs text-neutral-gray-medium">{totalMedia} items · {galleryEntries.length} albums</span>
          </div>

          {galleryEntries.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {galleryEntries.map(([category, items]) => {
                const cover = items[0];
                const count = items.length;
                const label = GALLERY_LABELS[category] || category.replace(/([A-Z])/g, ' $1');
                return (
                  <button
                    key={category}
                    onClick={() => onSetOpenAlbum(category)}
                    className="group relative aspect-square rounded-xl overflow-hidden bg-neutral-bg-light border border-neutral-gray-light hover:shadow-lg hover:border-brand-red-600/40 transition-all text-left"
                  >
                    <div className="absolute inset-0">
                      {isVideoFile(cover) ? (
                        <div className="h-full w-full bg-brand-navy-900 flex items-center justify-center">
                          <PlayCircle className="h-12 w-12 text-white/60" />
                        </div>
                      ) : (
                        <Image src={cover} alt={label} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 50vw, 33vw" />
                      )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-black/60 text-white rounded-full px-2 py-1 backdrop-blur-sm">
                      <Images className="h-3 w-3" />
                      <span className="text-[10px] font-bold">{count}</span>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 p-3 z-10">
                      <p className="text-white text-sm font-bold capitalize truncate">{label}</p>
                      <p className="text-white/70 text-[10px]">{count} {count === 1 ? 'item' : 'items'}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-neutral-gray-light">
              <ImageIcon className="h-12 w-12 text-neutral-gray-light mx-auto mb-4" />
              <p className="text-neutral-gray-medium">No media items available yet.</p>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={() => onSetOpenAlbum(null)}
              className="flex items-center gap-1.5 text-sm text-brand-red-600 hover:text-brand-red-700 font-semibold transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> All Albums
            </button>
            <span className="text-neutral-gray-light">|</span>
            <h3 className="text-lg font-bold text-neutral-black capitalize">
              {GALLERY_LABELS[openAlbum] || openAlbum.replace(/([A-Z])/g, ' $1')}
            </h3>
            <span className="text-xs text-neutral-gray-medium ml-auto">
              {(gallery?.[openAlbum] || []).length} items
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {(gallery?.[openAlbum] || []).map((item: string, idx: number) => (
              <div key={idx} className="group relative aspect-square rounded-xl overflow-hidden bg-neutral-bg-light border border-neutral-gray-light hover:shadow-lg transition-all cursor-pointer">
                {isVideoFile(item) ? (
                  <div className="relative h-full w-full">
                    <video src={item} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                      <PlayCircle className="h-12 w-12 text-white opacity-80" />
                    </div>
                  </div>
                ) : (
                  <Image src={item} alt={`${openAlbum} ${idx + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 50vw, 33vw" />
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
