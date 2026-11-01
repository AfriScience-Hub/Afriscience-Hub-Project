'use client';

import { X, Upload, Images } from 'lucide-react';
import { toast } from 'sonner';
import { GALLERY_ALBUMS, MAX_FILES_PER_ALBUM } from '../data';
import type { MediaItem } from '../types';

interface MediaGallerySectionProps {
  mediaGallery: Record<string, MediaItem[]>;
  onChange: (mediaGallery: Record<string, MediaItem[]>) => void;
}

/** Media gallery albums for the school listing form. */
export default function MediaGallerySection({ mediaGallery, onChange }: MediaGallerySectionProps) {
  const handleUpload = (album: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const current = mediaGallery[album] || [];
    if (current.length >= MAX_FILES_PER_ALBUM) {
      toast.error(`${album}: maximum of ${MAX_FILES_PER_ALBUM} files reached`);
      return;
    }
    const previewUrl = URL.createObjectURL(file);
    onChange({
      ...mediaGallery,
      [album]: [...current, { file, previewUrl, name: file.name }],
    });
    toast.success(`File added to ${album}`);
    e.target.value = '';
  };

  const removeMedia = (album: string, idx: number) => {
    const item = mediaGallery[album]?.[idx];
    if (item?.previewUrl.startsWith('blob:')) URL.revokeObjectURL(item.previewUrl);
    onChange({
      ...mediaGallery,
      [album]: (mediaGallery[album] || []).filter((_, i) => i !== idx),
    });
  };

  return (
    <div>
      <p className="text-xs text-neutral-gray-medium mb-4">Upload media into the following albums. Can be picture or video file formats. 10 files max. for each album.</p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {GALLERY_ALBUMS.map(album => {
          const items = mediaGallery[album] || [];
          const full = items.length >= MAX_FILES_PER_ALBUM;
          return (
            <div key={album} className="rounded-lg border border-neutral-gray-light p-4">
              <div className="mb-1 flex items-center justify-between">
                <p className="flex items-center gap-1.5 text-sm font-bold text-neutral-black">
                  <Images className="h-4 w-4 text-brand-red-600" /> {album}
                </p>
                <span className={`text-[10px] font-bold ${full ? 'text-brand-red-600' : 'text-neutral-gray-medium'}`}>
                  {items.length}/{MAX_FILES_PER_ALBUM}
                </span>
              </div>
              <p className="mb-3 text-xs text-neutral-gray-medium">
                {items.length} file{items.length !== 1 ? 's' : ''} added
              </p>

              {items.length > 0 && (
                <ul className="mb-3 space-y-1 max-h-32 overflow-y-auto">
                  {items.map((item, idx) => (
                    <li key={`${album}-${idx}`} className="flex items-center justify-between gap-2 rounded bg-neutral-bg-light px-2 py-1 text-[11px] text-neutral-gray-dark">
                      <span className="truncate">{truncateName(item.name)}</span>
                      <button type="button" onClick={() => removeMedia(album, idx)} className="flex-shrink-0 cursor-pointer text-red-400 hover:text-red-600">
                        <X className="h-3 w-3" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <label className="flex w-full cursor-pointer items-center justify-center gap-1 rounded-lg border border-dashed border-brand-red-300 px-3 py-2 text-xs font-medium text-brand-red-600 transition-colors hover:bg-brand-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                style={full ? { opacity: 0.4, pointerEvents: 'none' } : undefined}
              >
                <input type="file" accept="image/*,video/*" onChange={e => handleUpload(album, e)} className="hidden" disabled={full} />
                <Upload className="h-3.5 w-3.5" /> {full ? 'Album Full' : 'Upload Files'}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function truncateName(name: string, max = 30): string {
  if (name.length <= max) return name;
  const ext = name.split('.').pop() || '';
  const base = name.slice(0, name.length - ext.length - 1);
  return `${base.slice(0, max - ext.length - 3)}...${ext}`;
}
