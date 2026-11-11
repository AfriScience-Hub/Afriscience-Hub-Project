'use client';

import Image from 'next/image';
import { X } from 'lucide-react';
import { normalizeFileSrc } from '@/lib/files';

interface ImagePreviewModalProps {
  src: string;
  alt: string;
  onClose: () => void;
}

/** Full-size image preview used by the scientist cards and profile header. */
export default function ImagePreviewModal({ src, alt, onClose }: ImagePreviewModalProps) {
  const resolved = normalizeFileSrc(src);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative w-full max-w-4xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        {resolved ? (
          <div className="relative h-[70vh] min-h-[240px] w-full">
            <Image
              src={resolved}
              alt={alt}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-contain"
              unoptimized={/^(data:|blob:)|X-Amz-/i.test(resolved)}
            />
          </div>
        ) : (
          <div className="flex h-[50vh] min-h-[240px] items-center justify-center rounded-xl bg-white/5">
            <p className="text-sm text-white/70">No image available.</p>
          </div>
        )}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 cursor-pointer rounded-full bg-white p-1.5 shadow-lg hover:bg-neutral-bg-light"
          title="Close preview"
        >
          <X className="h-4 w-4" />
        </button>
        {alt && <p className="mt-3 text-center text-sm text-white/80">{alt}</p>}
      </div>
    </div>
  );
}
