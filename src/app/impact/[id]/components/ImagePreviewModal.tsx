'use client';

import { X } from 'lucide-react';

interface ImagePreviewModalProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export default function ImagePreviewModal({ src, alt, onClose }: ImagePreviewModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={onClose}>
      <div className="relative max-w-5xl max-h-[90vh]" onClick={e => e.stopPropagation()}>
        <img src={src} alt={alt} className="max-h-[85vh] max-w-full rounded-lg object-contain shadow-2xl" />
        <button onClick={onClose} className="absolute -top-3 -right-3 rounded-full bg-white p-2 shadow-lg hover:bg-neutral-bg-light transition-colors">
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
