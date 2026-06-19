'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CollapsibleSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  badge?: string;
}

export default function CollapsibleSection({ title, icon, children, defaultOpen = true, badge }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-neutral-gray-light bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 hover:bg-neutral-bg-light transition-colors"
      >
        <div className="flex items-center gap-3">
          {icon}
          <h3 className="font-bold text-neutral-black">{title}</h3>
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
