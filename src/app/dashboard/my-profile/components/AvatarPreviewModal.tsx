'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface Props {
  open: boolean;
  src?: string | null;
  alt: string;
  onClose: () => void;
}

/** Full-size lightbox for the user's profile photo. */
export default function AvatarPreviewModal({ open, src, alt, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open || !src) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${alt} profile photo preview`}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close preview"
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 cursor-pointer"
      >
        <X className="h-5 w-5" />
      </button>
      <div
        className="relative h-[min(80vh,720px)] w-full max-w-4xl"
        onClick={(event) => event.stopPropagation()}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="90vw"
          className="object-contain"
          unoptimized={/^(data:|blob:)|X-Amz-/i.test(src)}
        />
      </div>
    </div>
  );
}
