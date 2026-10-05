'use client';

import { ImagePlus, Upload, X, Images } from 'lucide-react';
import { toast } from 'sonner';
import CollapsibleSection from '../../CollapsibleSection';

const MAX_MEDIA_FILES = 10;

interface ScientistGallerySectionProps {
  media: string[];
  onChange: (media: string[]) => void;
}

export default function ScientistGallerySection({ media, onChange }: ScientistGallerySectionProps) {
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (media.length >= MAX_MEDIA_FILES) {
      toast.error(`Maximum of ${MAX_MEDIA_FILES} media files reached`);
      e.target.value = '';
      return;
    }
    onChange([...media, file.name]);
    toast.success('Media file added');
    e.target.value = '';
  };

  return (
    <CollapsibleSection title="Media Gallery" icon={<ImagePlus className="h-5 w-5 text-brand-red-600" />} defaultOpen={false}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-1.5 text-xs text-neutral-gray-medium">
            <Images className="h-4 w-4 text-brand-red-600" /> Upload media files of your services/expertise (pictures or videos).
          </p>
          <span className={`text-[11px] font-bold ${media.length >= MAX_MEDIA_FILES ? 'text-brand-red-600' : 'text-neutral-gray-medium'}`}>
            {media.length}/{MAX_MEDIA_FILES}
          </span>
        </div>

        {media.length > 0 && (
          <ul className="space-y-2">
            {media.map((file, idx) => (
              <li key={`${file}-${idx}`} className="flex items-center justify-between gap-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light px-3 py-2">
                <span className="truncate text-sm text-neutral-black">{file}</span>
                <button
                  type="button"
                  onClick={() => onChange(media.filter((_, i) => i !== idx))}
                  className="flex-shrink-0 cursor-pointer text-red-400 hover:text-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}

        <label className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-brand-red-300 px-4 py-3 text-sm font-medium text-brand-red-600 transition-colors hover:bg-brand-red-50 disabled:opacity-40"
          style={media.length >= MAX_MEDIA_FILES ? { opacity: 0.4, pointerEvents: 'none' } : undefined}
        >
          <input type="file" accept="image/*,video/*" onChange={handleUpload} className="hidden" />
          <Upload className="h-4 w-4" /> Upload Media (max {MAX_MEDIA_FILES} files)
        </label>
      </div>
    </CollapsibleSection>
  );
}
