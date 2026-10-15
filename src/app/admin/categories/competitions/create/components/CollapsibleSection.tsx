'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CollapsibleSectionProps {
  number: number;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

/**
 * Numbered form section with a purple badge, title, subtitle and a
 * chevron that collapses/expands the body.
 */
export default function CollapsibleSection({ number, title, subtitle, children }: CollapsibleSectionProps) {
  const [open, setOpen] = useState(true);

  return (
    <section className="rounded-xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="w-full flex items-start gap-3 px-5 py-4 text-left hover:bg-neutral-bg-light/50 cursor-pointer"
      >
        <span className="w-7 h-7 rounded-full bg-[#453DD8] text-white text-xs font-bold grid place-items-center flex-shrink-0 mt-0.5">
          {number}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-bold text-neutral-black">{title}</span>
          <span className="block text-[11px] text-neutral-gray-dark mt-0.5">{subtitle}</span>
        </span>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-neutral-gray-medium transition-transform flex-shrink-0 mt-1.5',
            !open && '-rotate-90'
          )}
        />
      </button>
      {open && <div className="px-5 pb-5">{children}</div>}
    </section>
  );
}
