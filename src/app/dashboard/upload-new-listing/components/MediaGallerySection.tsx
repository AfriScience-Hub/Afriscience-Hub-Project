'use client';

import { useState } from 'react';
import { ImagePlus, Upload } from 'lucide-react';
import CollapsibleSection from './CollapsibleSection';
import { toast } from 'sonner';
import { uploadFile } from '@/lib/upload';

interface MediaGallerySectionProps {
  galleryImages: { category: string; name: string }[];
  setGalleryImages: React.Dispatch<React.SetStateAction<{ category: string; name: string }[]>>;
  GALLERY_CATEGORIES: string[];
}

export default function MediaGallerySection({ galleryImages, setGalleryImages, GALLERY_CATEGORIES }: MediaGallerySectionProps) {
  const handleUpload = async (category: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const uploaded = await uploadFile(file);
      setGalleryImages(prev => [...prev, { category, name: uploaded.key }]);
      toast.success(`File uploaded to ${category}`);
    } catch {
      toast.error('Failed to upload file');
    }
    e.target.value = '';
  };

  return (
    <CollapsibleSection title="Media Gallery" icon={<ImagePlus className="h-5 w-5 text-brand-red-600" />} defaultOpen={false}>
      <div className="space-y-4">
        <p className="text-xs text-neutral-gray-medium">Upload images and videos organized by category.</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY_CATEGORIES.map(cat => {
            const count = galleryImages.filter(img => img.category === cat).length;
            return (
              <div key={cat} className="rounded-lg border border-neutral-gray-light p-4 text-center">
                <p className="text-sm font-bold text-neutral-black mb-1">{cat}</p>
                <p className="text-xs text-neutral-gray-medium mb-3">{count} file{count !== 1 ? 's' : ''} uploaded</p>
                <label className="inline-flex items-center gap-1 cursor-pointer rounded-lg border border-dashed border-brand-red-300 px-3 py-2 text-xs font-medium text-brand-red-600 hover:bg-brand-red-50 transition-colors">
                  <input type="file" accept="image/*,video/*" className="hidden" onChange={e => handleUpload(cat, e)} />
                  <Upload className="h-3.5 w-3.5" /> Upload Files
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </CollapsibleSection>
  );
}
