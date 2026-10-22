'use client';

import { useState } from 'react';
import { ImagePlus, Upload, X } from 'lucide-react';
import CollapsibleSection from './CollapsibleSection';
import { toast } from 'sonner';

interface MediaItem {
  category: string;
  file: File;
  name: string;
  previewUrl: string;
}

interface MediaGallerySectionProps {
  galleryImages: MediaItem[];
  setGalleryImages: React.Dispatch<React.SetStateAction<MediaItem[]>>;
  GALLERY_CATEGORIES: string[];
}

function truncateName(name: string, max = 30): string {
  if (name.length <= max) return name;
  const ext = name.split('.').pop() || '';
  const base = name.slice(0, name.length - ext.length - 1);
  return `${base.slice(0, max - ext.length - 3)}...${ext}`;
}

export default function MediaGallerySection({ galleryImages, setGalleryImages, GALLERY_CATEGORIES }: MediaGallerySectionProps) {
  const handleUpload = (category: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setGalleryImages(prev => [...prev, { category, file, name: file.name, previewUrl }]);
    toast.success(`File added to ${category}`);
    e.target.value = '';
  };

  const removeFile = (index: number) => {
    setGalleryImages(prev => {
      const item = prev[index];
      if (item.previewUrl.startsWith('blob:')) URL.revokeObjectURL(item.previewUrl);
      return prev.filter((_, i) => i !== index);
    });
  };

  return (
    <CollapsibleSection title="Media gallery" icon={<ImagePlus className="h-5 w-5 text-brand-red-600" />} defaultOpen={false}>
      <div className="space-y-4">
        <p className="text-xs text-neutral-gray-medium">Upload images and videos organized by category.</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY_CATEGORIES.map(cat => {
            const items = galleryImages.filter(img => img.category === cat);
            return (
              <div key={cat} className="rounded-lg border border-neutral-gray-light p-4 text-center">
                <p className="text-sm font-bold text-neutral-black mb-1">{cat}</p>
                <p className="text-xs text-neutral-gray-medium mb-3">{items.length} file{items.length !== 1 ? 's' : ''} added</p>
                <label className="inline-flex items-center gap-1 cursor-pointer rounded-lg border border-dashed border-brand-red-300 px-3 py-2 text-xs font-medium text-brand-red-600 hover:bg-brand-red-50 transition-colors">
                  <input type="file" accept="image/*,video/*" className="hidden" onChange={e => handleUpload(cat, e)} />
                  <Upload className="h-3.5 w-3.5" /> Upload Files
                </label>
                {items.length > 0 && (
                  <ul className="mt-3 space-y-1 max-h-32 overflow-y-auto text-left">
                    {items.map((item, idx) => (
                      <li key={`${cat}-${idx}`} className="flex items-center justify-between gap-2 px-2 py-1 rounded bg-neutral-bg-light text-[11px] text-neutral-black">
                        <span className="truncate max-w-[150px]">{truncateName(item.name)}</span>
                        <button type="button" onClick={() => removeFile(galleryImages.findIndex(i => i === item))} className="flex-shrink-0 text-red-400 hover:text-red-600">
                          <X className="h-3 w-3" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </CollapsibleSection>
  );
}
