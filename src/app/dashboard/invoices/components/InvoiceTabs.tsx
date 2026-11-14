'use client';

import { cn } from '@/lib/utils';

export type InvoiceTab = 'all' | 'pending' | 'awaiting' | 'paid' | 'void' | 'rejected' | 'cancelled';

const TABS: { key: InvoiceTab; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'awaiting', label: 'Awaiting Confirmation' },
  { key: 'paid', label: 'Paid' },
  { key: 'rejected', label: 'Rejected' },
  { key: 'void', label: 'Void' },
  { key: 'cancelled', label: 'Cancelled' },
];

interface InvoiceTabsProps {
  activeTab: InvoiceTab;
  counts: Record<InvoiceTab, number>;
  onTabChange: (tab: InvoiceTab) => void;
}

export default function InvoiceTabs({ activeTab, counts, onTabChange }: InvoiceTabsProps) {
  return (
    <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
      {TABS.map((tab) => {
        const count = counts[tab.key] || 0;
        return (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer',
              activeTab === tab.key
                ? 'bg-brand-red-600 text-white'
                : 'bg-neutral-bg-light text-neutral-gray-dark hover:bg-neutral-gray-light',
            )}
          >
            {tab.label} {count > 0 && <span className="ml-1.5">({count})</span>}
          </button>
        );
      })}
    </div>
  );
}
