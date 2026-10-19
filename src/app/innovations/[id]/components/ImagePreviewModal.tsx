'use client';

import Image from 'next/image';
import { X } from 'lucide-react';
import { normalizeFileSrc } from '@/lib/files';

export default function ImagePreviewModal({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  const resolved = normalizeFileSrc(src);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <div className="relative w-full max-w-3xl max-h-[90vh]" onClick={e => e.stopPropagation()}>
        {resolved ? (
          <div className="relative w-full h-[85vh] min-h-[240px]">
            <Image
              src={resolved}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-contain drop-shadow-2xl"
              unoptimized={/^(data:|blob:)|X-Amz-/i.test(resolved)}
            />
          </div>
        ) : (
          <div className="flex h-[50vh] min-h-[240px] items-center justify-center rounded-lg bg-white/5">
            <p className="text-sm text-white/70">No image available.</p>
          </div>
        )}
        <button onClick={onClose} className="absolute -top-3 -right-3 rounded-full bg-white p-1.5 shadow-lg hover:bg-neutral-bg-light">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
