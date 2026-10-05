'use client';

import Image from 'next/image';
import { X } from 'lucide-react';

interface ImagePreviewModalProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export default function ImagePreviewModal({ src, alt, onClose }: ImagePreviewModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <div className="relative max-w-3xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        <Image
          src={src}
          alt={alt}
          width={0}
          height={0}
          sizes="100vw"
          className="max-h-[85vh] max-w-full rounded-lg object-contain shadow-2xl"
        />
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 cursor-pointer rounded-full bg-white p-1.5 shadow-lg hover:bg-neutral-bg-light"
          title="Close preview"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
