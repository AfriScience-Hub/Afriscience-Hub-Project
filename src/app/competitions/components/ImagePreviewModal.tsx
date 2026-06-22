'use client';

import Image from 'next/image';

interface ImagePreviewModalProps {
  image: string;
  onClose: () => void;
}

export function ImagePreviewModal({ image, onClose }: ImagePreviewModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="relative max-w-3xl max-h-[80vh] w-full rounded-xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
        <Image src={image} alt="Preview" fill className="object-contain" sizes="90vw" />
        <button onClick={onClose} className="absolute top-3 right-3 h-8 w-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors text-lg">&times;</button>
      </div>
    </div>
  );
}
