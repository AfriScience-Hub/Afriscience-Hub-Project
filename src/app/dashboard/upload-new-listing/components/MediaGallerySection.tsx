'use client';

import { ImagePlus, Upload } from 'lucide-react';
import CollapsibleSection from './CollapsibleSection';

interface MediaGallerySectionProps {
  galleryImages: { category: string; name: string }[];
  handleAddGalleryImage: (category: string) => void;
  GALLERY_CATEGORIES: string[];
}

export default function MediaGallerySection({ galleryImages, handleAddGalleryImage, GALLERY_CATEGORIES }: MediaGallerySectionProps) {
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
                <button
                  type="button"
                  onClick={() => handleAddGalleryImage(cat)}
                  className="inline-flex items-center gap-1 rounded-lg border border-dashed border-brand-red-300 px-3 py-2 text-xs font-medium text-brand-red-600 hover:bg-brand-red-50 transition-colors"
                >
                  <Upload className="h-3.5 w-3.5" /> Upload Files
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </CollapsibleSection>
  );
}
