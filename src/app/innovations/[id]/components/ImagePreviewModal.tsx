'use client';

import Image from 'next/image';
import { X } from 'lucide-react';

export default function ImagePreviewModal({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <div className="relative max-w-3xl max-h-[90vh]" onClick={e => e.stopPropagation()}>
        <Image src={src} alt={alt} width={0} height={0} sizes="100vw" className="max-h-[85vh] max-w-full rounded-lg object-contain shadow-2xl" />
        <button onClick={onClose} className="absolute -top-3 -right-3 rounded-full bg-white p-1.5 shadow-lg hover:bg-neutral-bg-light">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
