'use client';

import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const PANEL_MAX_H = 240;

/** Chevron icon used by the dropdown triggers. */
export function ChevronDown({ size, className }: { size: number; className: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

/**
 * Positions a portalled dropdown panel against its trigger.
 *
 * The panel is rendered into `document.body` via a portal so it never
 * participates in the normal document flow (no content shifting up/down)
 * and is never clipped by a scrollable ancestor such as the admin modal's
 * `overflow-y-auto` body.
 */
function useDropdownPanel(open: boolean, ref: React.RefObject<HTMLDivElement | null>) {
  const [style, setStyle] = useState<React.CSSProperties>({ position: 'fixed', top: 0, left: 0, width: 0, opacity: 0 });

  React.useEffect(() => {
    if (!open || !ref.current) return;
    const place = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const openUp = spaceBelow < PANEL_MAX_H + 16 && rect.top > spaceBelow;
      setStyle({
        position: 'fixed',
        left: rect.left,
        width: rect.width,
        maxHeight: PANEL_MAX_H,
        top: openUp ? 'auto' : rect.bottom + 4,
        bottom: openUp ? window.innerHeight - rect.top + 4 : 'auto',
        opacity: 1,
      });
    };
    place();
    const onScroll = () => setStyle(s => ({ ...s, opacity: 0 }));
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', place);
    return () => {
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', place);
    };
  }, [open, ref]);

  return style;
}

/** Multi-select dropdown (checkbox list). */
export function MultiSelectField({ options, value, onChange, max }: {
  options: string[]; value: string[]; onChange: (v: string[]) => void; max: number;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const panelStyle = useDropdownPanel(open, ref);

  React.useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const toggle = (opt: string) => {
    const newValue = value.includes(opt)
      ? value.filter((f: string) => f !== opt)
      : value.length >= max
        ? value
        : [...value, opt];
    onChange(newValue);
  };

  return (
    <div ref={ref}>
      <button type="button" onClick={() => setOpen(v => !v)}
        className="flex min-h-10 w-full cursor-pointer items-center justify-between gap-3 rounded-lg border border-neutral-gray-light bg-white px-4 py-2 text-left outline-none focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600">
        <span className={`min-w-0 flex-1 truncate text-xs sm:text-sm ${value.length ? 'text-neutral-black' : 'text-neutral-gray-medium'}`}>
          {value.length ? value.join(', ') : 'Select...'}
        </span>
        <ChevronDown size={15} className={`shrink-0 text-neutral-gray-medium transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <p className="mt-1 text-[11px] text-neutral-gray-medium">{value.length}/{max} selected</p>
      {open && createPortal(
        <div style={panelStyle} className="z-[100] overflow-y-auto rounded-lg border border-neutral-gray-light bg-white p-2 shadow-lg">
          {options.map(opt => {
            const checked = value.includes(opt);
            const disabled = !checked && value.length >= max;
            return (
              <label key={opt} className={`flex cursor-pointer items-start justify-between gap-3 rounded-md px-3 py-2 text-sm ${disabled ? 'text-neutral-gray-light' : 'text-neutral-gray-dark hover:bg-brand-red-50'}`}>
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span className="flex items-center gap-2">
                    <input type="checkbox" checked={checked} disabled={disabled} onChange={() => toggle(opt)} className="mt-0.5 h-3.5 w-3.5 rounded accent-brand-red-600" />
                    <span>{opt}</span>
                  </span>
                </span>
              </label>
            );
          })}
        </div>,
        document.body
      )}
    </div>
  );
}

/** Single-select dropdown (radio-style list). */
export function SingleSelectField({ options, value, onChange }: {
  options: string[]; value: string; onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const panelStyle = useDropdownPanel(open, ref);

  React.useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div ref={ref}>
      <button type="button" onClick={() => setOpen(v => !v)}
        className="flex min-h-10 w-full cursor-pointer items-center justify-between gap-3 rounded-lg border border-neutral-gray-light bg-white px-4 py-2 text-left outline-none focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600">
        <span className={`min-w-0 flex-1 truncate text-xs sm:text-sm ${value ? 'text-neutral-black' : 'text-neutral-gray-medium'}`}>
          {value || 'Select...'}
        </span>
        <ChevronDown size={15} className={`shrink-0 text-neutral-gray-medium transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && createPortal(
        <div style={panelStyle} className="z-[100] overflow-y-auto rounded-lg border border-neutral-gray-light bg-white p-2 shadow-lg">
          {options.map(opt => (
            <button key={opt} type="button" onClick={() => { onChange(opt); setOpen(false); }}
              className={`flex w-full cursor-pointer flex-col rounded-md px-3 py-2 text-sm text-left ${value === opt ? 'font-semibold text-brand-red-600 bg-brand-red-50' : 'text-neutral-gray-dark hover:bg-brand-red-50'}`}>
              <span>{opt}</span>
            </button>
          ))}
        </div>,
        document.body
      )}
    </div>
  );
}
