'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export type CurrencyMode = 'local' | 'usd';

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

/**
 * Formats a fee amount either in the school's local currency or converted to
 * USD using the listing's local-units-per-dollar rate.
 */
export function formatMoney(amount: number, institute: Record<string, any>, mode: CurrencyMode) {
  if (mode === 'usd' && institute.usdRate) {
    return '$' + Math.round(amount / institute.usdRate).toLocaleString();
  }
  return (institute.currencySymbol || '') + amount.toLocaleString();
}

/** Switches a fee section between the local currency and USD. */
export function CurrencyToggle({ mode, onChange, symbol }: {
  mode: CurrencyMode;
  onChange: (mode: CurrencyMode) => void;
  symbol: string;
}) {
  return (
    <div className="flex p-0.5 bg-slate-100 rounded-lg">
      {([['local', symbol], ['usd', 'USD']] as [CurrencyMode, string][]).map(([key, label]) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          className={cn(
            "px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors cursor-pointer",
            mode === key ? "bg-white text-neutral-black shadow-sm" : "text-slate-500 hover:text-slate-700"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
