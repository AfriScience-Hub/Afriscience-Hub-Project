'use client';

import { useRef } from 'react';
import { Upload, X, Images } from 'lucide-react';
import { toast } from 'sonner';
import { CENTER_GALLERY_ALBUMS, MAX_FILES_PER_ALBUM } from '../data';

interface CenterGallerySectionProps {
  gallery: Record<string, string[]>;
  onChange: (gallery: Record<string, string[]>) => void;
}

export default function CenterGallerySection({ gallery, onChange }: CenterGallerySectionProps) {
  const handleUpload = (album: string) => {
    const current = gallery[album] || [];
    if (current.length >= MAX_FILES_PER_ALBUM) {
      toast.error(`${album}: maximum of ${MAX_FILES_PER_ALBUM} files reached`);
      return;
    }
    onChange({ ...gallery, [album]: [...current, `file_${Date.now()}_${current.length + 1}.jpg`] });
    toast.success(`File added to ${album}`);
  };

  const handleRemove = (album: string, idx: number) => {
    onChange({ ...gallery, [album]: (gallery[album] || []).filter((_, i) => i !== idx) });
  };

  return (
    <div className="space-y-4">
      <p className="text-xs text-neutral-gray-medium">
        Upload media into the designated albums (images or videos). Max {MAX_FILES_PER_ALBUM} files per album.
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {CENTER_GALLERY_ALBUMS.map(album => {
          const files = gallery[album] || [];
          const full = files.length >= MAX_FILES_PER_ALBUM;
          return (
            <div key={album} className="rounded-lg border border-neutral-gray-light p-4">
              <div className="mb-1 flex items-center justify-between">
                <p className="flex items-center gap-1.5 text-sm font-bold text-neutral-black">
                  <Images className="h-4 w-4 text-brand-red-600" /> {album}
                </p>
                <span className={`text-[10px] font-bold ${full ? 'text-brand-red-600' : 'text-neutral-gray-medium'}`}>
                  {files.length}/{MAX_FILES_PER_ALBUM}
                </span>
              </div>
              <p className="mb-3 text-xs text-neutral-gray-medium">
                {files.length} file{files.length !== 1 ? 's' : ''} uploaded
              </p>

              {files.length > 0 && (
                <ul className="mb-3 space-y-1">
                  {files.map((file, idx) => (
                    <li key={`${file}-${idx}`} className="flex items-center justify-between gap-2 rounded bg-neutral-bg-light px-2 py-1 text-[11px] text-neutral-gray-dark">
                      <span className="truncate">{file}</span>
                      <button type="button" onClick={() => handleRemove(album, idx)} className="flex-shrink-0 cursor-pointer text-red-400 hover:text-red-600">
                        <X className="h-3 w-3" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <button
                type="button"
                disabled={full}
                onClick={() => handleUpload(album)}
                className="flex w-full items-center justify-center gap-1 rounded-lg border border-dashed border-brand-red-300 px-3 py-2 text-xs font-medium text-brand-red-600 transition-colors hover:bg-brand-red-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Upload className="h-3.5 w-3.5" /> {full ? 'Album Full' : 'Upload Files'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
