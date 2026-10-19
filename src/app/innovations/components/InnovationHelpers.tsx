'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { X, Info } from 'lucide-react';
import { normalizeFileSrc } from '@/lib/files';

export function InfoTooltip({ content }: { content: string }) {
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);

  useEffect(() => {
    if (!pos) return;
    const onScroll = () => setPos(null);
    window.addEventListener('scroll', onScroll, true);
    return () => window.removeEventListener('scroll', onScroll, true);
  }, [pos]);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (pos) {
      setPos(null);
      return;
    }
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const tooltipW = 256;
    const gap = 10;
    const pad = 12;
    setPos({
      left: Math.min(rect.right + gap, window.innerWidth - tooltipW - pad),
      top: Math.max(pad, rect.top - 12),
    });
  };

  return (
    <span
      className="ml-auto inline-flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center"
      onClick={toggle}
      onBlur={() => setPos(null)}
      tabIndex={0}
      role="button"
      aria-label="More info"
    >
      <Info className="h-4 w-4 text-blue-400 font-black" />
      {pos && createPortal(
        <span
          className="pointer-events-none fixed z-[9999] w-64 rounded-md bg-brand-navy-900 px-3 py-2 text-xs font-medium leading-5 text-white shadow-lg"
          style={{ left: pos.left, top: pos.top }}
        >
          {content}
        </span>,
        document.body
      )}
    </span>
  );
}

export function ImagePreviewModal({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  const resolved = normalizeFileSrc(src);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="relative w-full max-w-4xl max-h-[90vh]" onClick={e => e.stopPropagation()}>
        {resolved ? (
          <div className="relative w-full h-[70vh] min-h-[240px]">
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
            <p className="text-sm text-white/70">No image available for this innovation.</p>
          </div>
        )}
        <button onClick={onClose} className="absolute -top-3 -right-3 rounded-full bg-white p-1.5 shadow-lg hover:bg-neutral-bg-light cursor-pointer">
          <X className="h-4 w-4" />
        </button>
        {alt && <p className="mt-3 text-center text-sm text-white/80">{alt}</p>}
      </div>
    </div>
  );
}
