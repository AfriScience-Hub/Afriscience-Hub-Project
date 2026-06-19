'use client';

import { cn } from '@/lib/utils';

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export default function TabButton({ active, onClick, children }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-6 py-4 text-sm font-semibold transition-all border-b-2 whitespace-nowrap",
        active
          ? "border-brand-red-600 text-brand-red-600 bg-brand-red-100/50"
          : "border-transparent text-neutral-gray-medium hover:text-neutral-black hover:bg-neutral-bg-light"
      )}
    >
      {children}
    </button>
  );
}
