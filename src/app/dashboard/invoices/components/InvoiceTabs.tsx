'use client';

import { cn } from '@/lib/utils';
import { MOCK_INVOICES } from '../../data';

export type InvoiceTab = 'pending' | 'awaiting' | 'paid' | 'rejected';

interface InvoiceTabsProps {
  activeTab: InvoiceTab;
  onTabChange: (tab: InvoiceTab) => void;
}

const TABS: { key: InvoiceTab; label: string }[] = [
  { key: 'pending', label: 'Pending' },
  { key: 'awaiting', label: 'Awaiting Confirmation' },
  { key: 'paid', label: 'Paid' },
  { key: 'rejected', label: 'Rejected' },
];

export default function InvoiceTabs({ activeTab, onTabChange }: InvoiceTabsProps) {
  return (
    <div className="flex gap-2 mb-6 overflow-x-auto">
      {TABS.map(tab => {
        const count = MOCK_INVOICES.filter(i => {
          if (tab.key === 'pending') return i.status === 'Pending';
          if (tab.key === 'awaiting') return i.status === 'Awaiting Confirmation';
          if (tab.key === 'paid') return i.status === 'Paid';
          if (tab.key === 'rejected') return i.status === 'Rejected';
          return false;
        }).length;
        return (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
              activeTab === tab.key
                ? "bg-brand-red-600 text-white"
                : "bg-neutral-bg-light text-neutral-gray-dark hover:bg-neutral-gray-light"
            )}
          >
            {tab.label} {count > 0 && <span className="ml-1.5">({count})</span>}
          </button>
        );
      })}
    </div>
  );
}
