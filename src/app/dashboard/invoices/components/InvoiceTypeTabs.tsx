'use client';

import { Building2, FlaskConical, Stethoscope } from 'lucide-react';
import { cn } from '@/lib/utils';

export type InvoiceListingType = 'scientists' | 'institutes' | 'specialist-centers';

const TABS: { key: InvoiceListingType; label: string; icon: typeof FlaskConical }[] = [
  { key: 'scientists', label: 'Scientists & Technologists', icon: FlaskConical },
  { key: 'institutes', label: 'Institutes', icon: Building2 },
  { key: 'specialist-centers', label: 'Specialist Centres', icon: Stethoscope },
];

interface InvoiceTypeTabsProps {
  activeTab: InvoiceListingType;
  onTabChange: (tab: InvoiceListingType) => void;
}

/** Secondary tabs that split invoices by the listing type that generated them. */
export default function InvoiceTypeTabs({ activeTab, onTabChange }: InvoiceTypeTabsProps) {
  return (
    <div className="flex gap-2 mb-5 overflow-x-auto border-t border-neutral-gray-light pt-4">
      {TABS.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          onClick={() => onTabChange(key)}
          className={cn(
            'inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer',
            activeTab === key
              ? 'bg-brand-navy-900 text-white'
              : 'bg-white text-neutral-gray-dark border border-neutral-gray-light hover:bg-neutral-bg-light',
          )}
        >
          <Icon className="h-3.5 w-3.5" />
          {label}
        </button>
      ))}
    </div>
  );
}
