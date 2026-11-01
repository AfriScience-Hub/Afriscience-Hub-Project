'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Accordion wrapper used by the university programme levels. */
export function CollapsibleSection({ title, icon, children, defaultOpen = false, badge }: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  badge?: string;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-neutral-gray-light bg-white shadow-sm mb-4 last:mb-0 overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex cursor-pointer items-center justify-between p-5 hover:bg-neutral-bg-light transition-colors"
      >
        <div className="flex items-center gap-3">
          {icon}
          <h4 className="font-bold text-neutral-black text-left">{title}</h4>
          {badge && (
            <span className="px-2 py-0.5 rounded-full bg-brand-red-50 text-brand-red-600 text-[10px] font-bold">{badge}</span>
          )}
        </div>
        <ChevronDown className={cn("h-4 w-4 text-neutral-gray-medium transition-transform", isOpen && "rotate-180")} />
      </button>
      {isOpen && <div className="px-5 pb-5 border-t border-neutral-gray-light pt-4">{children}</div>}
    </div>
  );
}

export function BulletList({ items }: { items: string[] }) {
  if (!items?.length) return null;
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="text-sm text-neutral-gray-dark flex items-start gap-2">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-red-600 flex-shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Formats a fee amount in the school's local currency. */
export function formatMoney(amount: number, institute: Record<string, any>) {
  return (institute.currencySymbol || '') + amount.toLocaleString();
}
