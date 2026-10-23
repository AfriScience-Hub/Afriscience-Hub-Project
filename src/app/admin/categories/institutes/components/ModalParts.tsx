'use client';

import type { ElementType, ReactNode } from 'react';

/** A labelled read-only value. Falls back to an em dash when empty. */
export function Field({ label, value }: { label: string; value?: string | string[] | number }) {
  const text = Array.isArray(value) ? value.join(', ') : value != null ? String(value) : '';
  const shown = text.trim() ? text : '—';
  return (
    <div>
      <p className="text-[11px] font-semibold text-neutral-gray-medium uppercase">{label}</p>
      <p className="text-sm text-neutral-black break-words whitespace-pre-wrap">{shown}</p>
    </div>
  );
}

/** Wraps each value in a pill. Pass `tone` to override the default styling. */
export function Chips({ items, tone }: { items: string[]; tone?: string }) {
  if (!items?.length) return <p className="text-sm text-neutral-gray-medium">—</p>;
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((i) => (
        <span key={i} className={tone ?? 'px-2.5 py-1 rounded-full bg-neutral-bg-light border border-neutral-gray-light text-xs text-neutral-gray-dark'}>{i}</span>
      ))}
    </div>
  );
}

/** A simple bulleted list with an em dash fallback. */
export function Bullets({ items }: { items: string[] }) {
  if (!items?.length) return <p className="text-sm text-neutral-gray-medium">—</p>;
  return (
    <ul className="list-disc pl-5 space-y-1 text-sm text-neutral-gray-dark">
      {items.map((i, idx) => <li key={idx}>{i}</li>)}
    </ul>
  );
}

/** A small bold sub-heading with an icon, used inside a collapsible section. */
export function SubHeading({ icon: Icon, children }: { icon: ElementType; children: ReactNode }) {
  return (
    <p className="text-sm font-bold text-neutral-black mb-2 flex items-center gap-1.5">
      <Icon className="h-4 w-4 text-neutral-gray-medium" /> {children}
    </p>
  );
}
