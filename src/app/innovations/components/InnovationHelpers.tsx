'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { X, Info } from 'lucide-react';
import { INNOVATION_INTERESTS_EMOJI } from '../../data/mockData';

export function InterestEmoji({ interest }: { interest: string }) {
  const [showLabel, setShowLabel] = useState(false);
  const data = INNOVATION_INTERESTS_EMOJI[interest];
  if (!data) return null;

  return (
    <span
      className="relative cursor-default select-none"
      onMouseEnter={() => setShowLabel(true)}
      onMouseLeave={() => setShowLabel(false)}
      onTouchStart={() => setShowLabel(prev => !prev)}
    >
      <span className="text-lg" role="img" aria-label={data.label}>{data.emoji}</span>
      {showLabel && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-brand-navy-900 px-2 py-1 text-[10px] text-white shadow-lg z-20 pointer-events-none">
          {data.label}
        </span>
      )}
    </span>
  );
}

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
