'use client';

import React, { useMemo, useState } from 'react';
import { Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TABS, ONGOING_COMPETITIONS, UPCOMING_COMPETITIONS, type Competition } from './data';
import CompetitionPageHeader from './components/CompetitionPageHeader';
import CompetitionPagesMenu from './components/CompetitionPagesMenu';
import CompetitionStats from './components/CompetitionStats';
import CompetitionFilters, { DEFAULT_FILTERS, type CompetitionFiltersState } from './components/CompetitionFilters';
import CompetitionTrendChart from './components/CompetitionTrendChart';
import ParticipantsOverviewChart from './components/ParticipantsOverviewChart';
import VotesOverviewChart from './components/VotesOverviewChart';
import OngoingCompetitionsCard from './components/OngoingCompetitionsCard';
import UpcomingCompetitionsCard from './components/UpcomingCompetitionsCard';

/** True when the competition's relevant date falls inside the selected range. */
function inDateRange(comp: Competition, range: CompetitionFiltersState['range']): boolean {
  const { from, to } = range;
  if (!from && !to) return true;
  const iso = comp.endDateISO || comp.startDateISO;
  if (!iso) return true;
  if (from && iso < from) return false;
  if (to && iso > to) return false;
  return true;
}

export default function CompetitionsPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [filters, setFilters] = useState<CompetitionFiltersState>(DEFAULT_FILTERS);

  const updateFilters = (patch: Partial<CompetitionFiltersState>) => setFilters((prev) => ({ ...prev, ...patch }));
  const clearFilters = () => setFilters(DEFAULT_FILTERS);

  const filteredOngoing = useMemo(
    () => ONGOING_COMPETITIONS.filter((c) =>
      (filters.status === 'All Status' || c.status === filters.status) &&
      (filters.category === 'All Categories' || c.category === filters.category) &&
      (filters.country === 'All Countries' || c.country === filters.country) &&
      inDateRange(c, filters.range)
    ),
    [filters]
  );

  const filteredUpcoming = useMemo(
    () => UPCOMING_COMPETITIONS.filter((c) =>
      (filters.status === 'All Status' || c.status === filters.status) &&
      (filters.category === 'All Categories' || c.category === filters.category) &&
      (filters.country === 'All Countries' || c.country === filters.country) &&
      inDateRange(c, filters.range)
    ),
    [filters]
  );

  return (
    <div className="space-y-4">
      <CompetitionPageHeader
        icon={Trophy}
        title="Competitions"
        description="Create, manage and monitor science and technology competitions across Africa."
        actions={<CompetitionPagesMenu />}
      />

      <CompetitionStats />

      <div className="border-b border-neutral-gray-light">
        <div className="flex gap-0 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-3 py-2 text-xs font-medium whitespace-nowrap border-b-2 transition-colors cursor-pointer",
                activeTab === tab
                  ? "border-[#453DD8] text-[#453DD8]"
                  : "border-transparent text-neutral-gray-medium hover:text-neutral-black"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <CompetitionFilters filters={filters} onChange={updateFilters} onClear={clearFilters} />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <CompetitionTrendChart />
        <ParticipantsOverviewChart />
        <VotesOverviewChart />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <OngoingCompetitionsCard competitions={filteredOngoing} total={ONGOING_COMPETITIONS.length} />
        <UpcomingCompetitionsCard competitions={filteredUpcoming} total={UPCOMING_COMPETITIONS.length} />
      </div>
    </div>
  );
}
