'use client';

import { Upload, X } from 'lucide-react';

interface MediaSectionProps {
  mediaGallery: File[];
  onAddMedia: (files: FileList) => void;
  onRemoveMedia: (index: number) => void;
  undertakingAccepted: boolean;
  onUndertakingChange: (accepted: boolean) => void;
}

export function MediaSection({
  mediaGallery, onAddMedia, onRemoveMedia,
  undertakingAccepted, onUndertakingChange,
}: MediaSectionProps) {
  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light p-8">
        <h2 className="text-xl font-bold text-neutral-black mb-2">Media Gallery</h2>
        <div className="border-2 border-dashed border-neutral-gray-light rounded-xl p-6 text-center hover:border-brand-red-600 transition-colors">
          {mediaGallery.length > 0 ? (
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2 justify-center">
                {mediaGallery.map((file, idx) => (
                  <div key={idx} className="relative group">
                    {file.type.startsWith('image/') ? (
                      <img src={URL.createObjectURL(file)} alt="" className="h-16 w-16 object-cover rounded-lg" />
                    ) : (
                      <div className="h-16 w-16 bg-neutral-bg-light rounded-lg flex items-center justify-center">
                        <svg className="h-8 w-8 text-neutral-gray-medium" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      </div>
                    )}
                    <button type="button" onClick={() => onRemoveMedia(idx)} className="cursor-pointer absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
              <p className="text-xs text-neutral-gray-medium">{mediaGallery.length}/10 files</p>
            </div>
          ) : (
            <label className="cursor-pointer">
              <Upload className="h-8 w-8 text-neutral-gray-medium mx-auto mb-2" />
              <p className="text-xs text-neutral-gray-medium">Upload media files of your business, organization or brand</p>
              <p className="text-xs text-neutral-gray-medium mt-1">10 files max. Can include both picture and video files.</p>
              <input type="file" multiple accept="image/*,video/*" className="hidden" onChange={e => e.target.files && onAddMedia(e.target.files)} />
            </label>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light p-8">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={undertakingAccepted}
            onChange={e => onUndertakingChange(e.target.checked)}
            className="mt-1 rounded border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600"
          />
          <span className="text-sm text-neutral-gray-dark">
            I confirm that all information provided are accurate, that all uploaded documents are valid and that I accept the terms and conditions of this service.
          </span>
        </label>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
        <p className="text-sm text-amber-800">
          Your sponsorship application will be submitted for review and verification by the AfriScience Hub Team. Once approved (usually within 5 business days), your organization will be published on the platform as a sponsor.
        </p>
      </div>
    </>
  );
}
