'use client';

import type { LucideIcon } from 'lucide-react';

interface Tab {
  key: string;
  label: string;
  icon: LucideIcon;
}

interface ProfileTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (key: string) => void;
}

export function ProfileTabs({ tabs, activeTab, onTabChange }: ProfileTabsProps) {
  return (
    <div className="border-b border-neutral-gray-light bg-white overflow-x-auto">
      <div className="flex min-w-max">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.key
                ? 'border-green-600 text-green-600'
                : 'border-transparent text-neutral-gray-medium hover:text-neutral-gray-dark'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span className="text-sm font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
