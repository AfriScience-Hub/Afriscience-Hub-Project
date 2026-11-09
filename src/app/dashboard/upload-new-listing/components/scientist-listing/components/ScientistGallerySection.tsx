'use client';

import { ImagePlus, Upload, X, Images } from 'lucide-react';
import { toast } from 'sonner';
import CollapsibleSection from '../../CollapsibleSection';

const MAX_MEDIA_FILES = 10;

export interface MediaItem {
  /** Staged file that still needs uploading (new selections). */
  file?: File | null;
  /** Blob preview for a staged file or the remote URL for an existing image. */
  previewUrl: string;
  name: string;
  /** Storage key/URL already saved on the server (edit mode). */
  url?: string;
}

interface ScientistGallerySectionProps {
  media: MediaItem[];
  onChange: React.Dispatch<React.SetStateAction<MediaItem[]>>;
}

function truncateName(name: string, max = 30): string {
  if (name.length <= max) return name;
  const ext = name.split('.').pop() || '';
  const base = name.slice(0, name.length - ext.length - 1);
  return `${base.slice(0, max - ext.length - 3)}...${ext}`;
}

export default function ScientistGallerySection({ media, onChange }: ScientistGallerySectionProps) {
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const images = files.filter((file) => file.type.startsWith('image/'));
    if (images.length !== files.length) {
      toast.error('Only image files can be added to the media gallery');
    }
    const remaining = MAX_MEDIA_FILES - media.length;
    if (remaining <= 0) {
      toast.error(`Maximum of ${MAX_MEDIA_FILES} images reached`);
      e.target.value = '';
      return;
    }
    const accepted = images.slice(0, remaining);
    if (images.length > remaining) {
      toast.error(`Only ${remaining} more image${remaining === 1 ? '' : 's'} can be added`);
    }
    if (!accepted.length) {
      e.target.value = '';
      return;
    }

    const items: MediaItem[] = accepted.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
      name: file.name,
    }));
    onChange((prev) => [...prev, ...items]);
    toast.success(`${items.length} image${items.length === 1 ? '' : 's'} added`);
    e.target.value = '';
  };

  const removeFile = (idx: number) => {
    onChange(prev => {
      const item = prev[idx];
      if (item.previewUrl.startsWith('blob:')) URL.revokeObjectURL(item.previewUrl);
      return prev.filter((_, i) => i !== idx);
    });
  };

  return (
    <CollapsibleSection title="Media gallery" icon={<ImagePlus className="h-5 w-5 text-brand-red-600" />} defaultOpen={false}>
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <p className="flex items-center gap-1.5 text-xs text-neutral-gray-medium">
            <Images className="h-4 w-4 shrink-0 text-brand-red-600" /> Upload up to {MAX_MEDIA_FILES} images of your services or expertise.
          </p>
          <span className={`text-[11px] font-bold ${media.length >= MAX_MEDIA_FILES ? 'text-brand-red-600' : 'text-neutral-gray-medium'}`}>
            {media.length}/{MAX_MEDIA_FILES}
          </span>
        </div>

        {media.length > 0 && (
          <ul className="space-y-2">
            {media.map((item, idx) => (
              <li key={`${item.name}-${idx}`} className="flex items-center justify-between gap-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light px-3 py-2">
                <span className="truncate text-sm text-neutral-black">{truncateName(item.name)}</span>
                <button
                  type="button"
                  onClick={() => removeFile(idx)}
                  className="flex-shrink-0 cursor-pointer text-red-400 hover:text-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}

        <label className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-brand-red-300 px-4 py-3 text-sm font-medium text-brand-red-600 transition-colors hover:bg-brand-red-50"
          style={media.length >= MAX_MEDIA_FILES ? { opacity: 0.4, pointerEvents: 'none' } : undefined}
        >
          <input type="file" accept="image/*" multiple onChange={handleUpload} className="hidden" />
          <Upload className="h-4 w-4" /> Upload Images (max {MAX_MEDIA_FILES})
        </label>
      </div>
    </CollapsibleSection>
  );
}
