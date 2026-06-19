'use client';

import { cn } from '@/lib/utils';

export default function SectionCard({ title, icon, children, className }: { title: string; icon: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-xl border border-neutral-gray-light bg-white p-6 shadow-sm", className)}>
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-neutral-gray-light">
        {icon}
        <h3 className="font-bold text-neutral-black">{title}</h3>
      </div>
      {children}
    </div>
  );
}
