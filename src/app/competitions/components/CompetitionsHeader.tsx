'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Trophy, Clock, SlidersHorizontal } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { cn } from '@/lib/utils';

interface CompetitionsHeaderProps {
  activeFilterCount: number;
  showFilters: boolean;
  setShowFilters: (v: boolean) => void;
  description?: string;
}

export function CompetitionsHeader({ activeFilterCount, showFilters, setShowFilters, description }: CompetitionsHeaderProps) {
  const pathname = usePathname();
  const isPast = pathname === '/competitions/pastcompetition';

  const tabs = [
    { href: '/competitions', label: 'Current', icon: Trophy },
    { href: '/competitions/pastcompetition', label: 'Past', icon: Clock },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <Trophy className="h-8 w-8 text-brand-red-600" />
        <h1 className="text-3xl font-bold text-neutral-black">Competitions</h1>
      </div>
      <p className="text-neutral-gray-dark max-w-2xl">
        {description || 'Join competitors across Africa to showcase your skills, creativity and scientific knowledge. Win prizes, recognition and collaboration opportunities.'}
      </p>
      <div className="flex py-1 px-1.5 bg-slate-200   rounded-lg w-full max-w-fit mt-6">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const active = isPast ? tab.href === '/competitions/pastcompetition' : tab.href === '/competitions';
          return (
            <Link key={tab.href} href={tab.href}
              className={cn(
                "flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-md text-sm font-semibold transition-all duration-200 ",
                active
                  ? "bg-white text-brand-red-600 shadow-sm ring-1 ring-slate-200"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
              )}
            >
              <Icon className="h-4 w-4" /> {tab.label}
            </Link>
          );
        })}
      </div>
      <Button variant="outline" className="mt-4 lg:hidden flex items-center gap-2" onClick={() => setShowFilters(!showFilters)}>
        <SlidersHorizontal className="h-4 w-4" />
        {showFilters ? 'Hide Filters' : 'Show Filters'}
        {activeFilterCount > 0 && (
          <span className="flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-brand-red-600 text-white text-[10px] font-bold">{activeFilterCount}</span>
        )}
      </Button>
    </div>
  );
}
