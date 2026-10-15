import React from 'react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface CompetitionPageHeaderProps {
  icon: LucideIcon;
  iconColor?: string;
  title: string;
  description: string;
  /** Optional actions rendered on the right side of the header */
  actions?: React.ReactNode;
}

/**
 * Shared header for every competition admin page:
 * breadcrumb + icon + title + description (+ optional actions).
 */
export default function CompetitionPageHeader({ icon: Icon, iconColor = 'text-purple-600', title, description, actions }: CompetitionPageHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-neutral-gray-medium mb-1">
          <Link href="/admin/dashboard" className="hover:text-neutral-black">Dashboard</Link>
          <span>/</span>
          <Link href="/admin/categories" className="hover:text-neutral-black">Categories</Link>
          <span>/</span>
          <span className="text-neutral-black font-medium">Competitions</span>
        </div>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0`}>
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-neutral-black leading-tight">{title}</h1>
            <p className="text-[11px] text-neutral-gray-dark mt-0.5">{description}</p>
          </div>
        </div>
      </div>
      {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
    </div>
  );
}
