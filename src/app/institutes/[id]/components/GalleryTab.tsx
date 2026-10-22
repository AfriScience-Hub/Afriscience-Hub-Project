'use client';

import Image from 'next/image';
import {
  Images, ImageIcon, ArrowLeft, PlayCircle
} from 'lucide-react';
import { GALLERY_ALBUMS, GALLERY_ALBUM_LIMIT } from '../../data';

interface Institute {
  [key: string]: any;
}

const UNIVERSITY_GALLERY_LABELS: Record<string, string> = {
  frontGate: 'Front Gate', compound: 'Compound', classrooms: 'Classrooms',
  laboratories: 'Laboratories', playground: 'Playground', halls: 'Halls',
  convenience: 'Convenience', libraries: 'Libraries', uniforms: 'Uniforms',
  offices: 'Offices', others: 'Others'
};

const isVideo = (url: string) => url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.ogg');

export default function GalleryTab({
  institute,
  openAlbum,
  setOpenAlbum
}: {
  institute: Institute;
  openAlbum: string | null;
  setOpenAlbum: (val: string | null) => void;
}) {
  const isUniversity = institute.type === 'University';
  const gallery: Record<string, string[]> = institute.gallery || {};

  // Schools show the full 12-album catalog (empty albums included); universities
  // keep listing only the albums that hold media.
  const albums: { key: string; label: string; items: string[] }[] = isUniversity
    ? Object.entries(gallery)
        .filter(([, items]) => items.length > 0)
        .map(([key, items]) => ({ key, label: UNIVERSITY_GALLERY_LABELS[key] || key, items: items.slice(0, GALLERY_ALBUM_LIMIT) }))
    : GALLERY_ALBUMS.map(a => ({ key: a.key, label: a.label, items: (gallery[a.key] || []).slice(0, GALLERY_ALBUM_LIMIT) }));

  const totalMedia = albums.reduce((sum, a) => sum + a.items.length, 0);
  const filledCount = albums.filter(a => a.items.length > 0).length;
  const active = albums.find(a => a.key === openAlbum);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {active === undefined ? (
        <>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <h3 className="text-lg font-bold text-neutral-black flex items-center gap-2">
              <Images className="h-5 w-5 text-brand-red-600" /> Media Gallery
            </h3>
            <span className="text-xs text-neutral-gray-medium">
              {totalMedia} items &middot; {filledCount} of {albums.length} albums &middot; Max {GALLERY_ALBUM_LIMIT} files per album
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {albums.map(({ key, label, items }) => {
              const cover = items[0];
              const count = items.length;
              return (
                <button
                  key={key}
                  onClick={() => setOpenAlbum(key)}
                  className="group relative aspect-square rounded-xl overflow-hidden bg-neutral-bg-light border border-neutral-gray-light hover:shadow-lg hover:border-brand-red-600/40 transition-all text-left cursor-pointer"
                >
                  <div className="absolute inset-0">
                    {!cover ? (
                      <div className="h-full w-full flex flex-col items-center justify-center gap-2 bg-neutral-bg-light text-neutral-gray-medium">
                        <ImageIcon className="h-8 w-8 text-neutral-gray-light" />
                        <span className="text-[10px] font-medium">No media yet</span>
                      </div>
                    ) : isVideo(cover) ? (
                      <div className="h-full w-full bg-brand-navy-900 flex items-center justify-center">
                        <PlayCircle className="h-12 w-12 text-white/60" />
                      </div>
                    ) : (
                      <Image src={cover} alt={label} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-black/60 text-white rounded-full px-2 py-1 backdrop-blur-sm">
                    <Images className="h-3 w-3" />
                    <span className="text-[10px] font-bold">{count}</span>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-3 z-10">
                    <p className="text-white text-sm font-bold truncate">{label}</p>
                    <p className="text-white/70 text-[10px]">{count} {count === 1 ? 'file' : 'files'}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={() => setOpenAlbum(null)}
              className="flex items-center gap-1.5 text-sm text-brand-red-600 hover:text-brand-red-700 font-semibold transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" /> All Albums
            </button>
            <span className="text-neutral-gray-light">|</span>
            <h3 className="text-lg font-bold text-neutral-black">{active.label}</h3>
            <span className="text-xs text-neutral-gray-medium ml-auto">
              {active.items.length} of {GALLERY_ALBUM_LIMIT} files
            </span>
          </div>

          {active.items.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-neutral-gray-light">
              <ImageIcon className="h-12 w-12 text-neutral-gray-light mx-auto mb-4" />
              <p className="text-neutral-gray-medium">No media items in this album yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {active.items.map((item: string, idx: number) => (
                <div key={idx} className="group relative aspect-square rounded-xl overflow-hidden bg-neutral-bg-light border border-neutral-gray-light hover:shadow-lg transition-all cursor-pointer">
                  {isVideo(item) ? (
                    <div className="relative h-full w-full">
                      <video src={item} className="h-full w-full object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                        <PlayCircle className="h-12 w-12 text-white opacity-80" />
                      </div>
                    </div>
                  ) : (
                    <Image src={item} alt={`${active.label} ${idx + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
