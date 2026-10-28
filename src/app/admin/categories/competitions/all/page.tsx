'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ALL_COMPETITIONS, getStatus, type AllCompetition } from './data';
import AllCompetitionsHeader from './components/AllCompetitionsHeader';
import AllCompetitionsStats from './components/AllCompetitionsStats';
import AllCompetitionsTabs, { type AllCompetitionsTab } from './components/AllCompetitionsTabs';
import AllCompetitionsFilters, { DEFAULT_ALL_FILTERS, type AllCompetitionsFilterState } from './components/AllCompetitionsFilters';
import AllCompetitionsTable from './components/AllCompetitionsTable';
import AllCompetitionsPagination from './components/AllCompetitionsPagination';
import CompetitionDetailModal from './components/CompetitionDetailModal';
import AssignJudgesModal from './components/AssignJudgesModal';
import { categoryForType } from '../filterOptions';

const PER_PAGE = 8;

/** Status is derived: Upcoming (start ahead) / Ongoing (start reached) / Past (deadline passed). */
const STATUS_BY_ID = new Map(ALL_COMPETITIONS.map((c) => [c.id, getStatus(c)]));

function matchFilters(row: AllCompetition, filters: AllCompetitionsFilterState): boolean {
  if (filters.search) {
    const q = filters.search.toLowerCase();
    if (!`${row.name} ${row.type} ${row.category} ${row.country}`.toLowerCase().includes(q)) return false;
  }
  if (filters.type !== 'All Types' && row.type !== filters.type) return false;
  if (filters.category !== 'All Categories' && row.category !== filters.category) return false;
  if (filters.country !== 'All Countries' && row.country !== filters.country) return false;
  const { from, to } = filters.range;
  if (from && row.startISO < from) return false;
  if (to && row.startISO > to) return false;
  return true;
}

export default function AllCompetitionsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AllCompetitionsTab>('All Competitions');
  const [filters, setFilters] = useState<AllCompetitionsFilterState>(DEFAULT_ALL_FILTERS);
  const [page, setPage] = useState(1);
  /** Judge emails per competition id */
  const [judgesById, setJudgesById] = useState<Record<number, string[]>>({ 1: ['adaeze.nwankwo@afrisciencehub.org'], 5: ['chika.anyanwu@afrisciencehub.org', 'layla.haddad@afrisciencehub.org'] });
  const [viewTarget, setViewTarget] = useState<AllCompetition | null>(null);
  const [assignTarget, setAssignTarget] = useState<AllCompetition | null>(null);

  const updateFilters = (patch: Partial<AllCompetitionsFilterState>) => {
    setFilters((prev) => {
      const next = { ...prev, ...patch };
      if (patch.type !== undefined) {
        next.category = categoryForType(patch.type);
      }
      return next;
    });
    setPage(1);
  };

  const resetFilters = () => {
    setFilters(DEFAULT_ALL_FILTERS);
    setPage(1);
  };

  /** Stats and tab counts follow the current filter selection. */
  const filteredByFilters = useMemo(
    () => ALL_COMPETITIONS.filter((row) => matchFilters(row, filters)),
    [filters]
  );

  const counts = useMemo(() => {
    const c = { 'All Competitions': filteredByFilters.length, Ongoing: 0, Upcoming: 0, Past: 0 } as Record<AllCompetitionsTab, number>;
    filteredByFilters.forEach((row) => { c[STATUS_BY_ID.get(row.id)!] += 1; });
    return c;
  }, [filteredByFilters]);

  const filtered = useMemo(
    () =>
      filteredByFilters.filter((row) => {
        if (activeTab !== 'All Competitions' && STATUS_BY_ID.get(row.id) !== activeTab) return false;
        return true;
      }),
    [activeTab, filteredByFilters]
  );

  const activeCount = useMemo(
    () => [
      Boolean(filters.search.trim()),
      filters.type !== DEFAULT_ALL_FILTERS.type,
      filters.category !== DEFAULT_ALL_FILTERS.category,
      filters.country !== DEFAULT_ALL_FILTERS.country,
      Boolean(filters.range.from || filters.range.to),
    ].filter(Boolean).length,
    [filters]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const handleAssignSave = (competition: AllCompetition, emails: string[]) => {
    setJudgesById((prev) => ({ ...prev, [competition.id]: emails }));
    setAssignTarget(null);
    // TODO (later): dispatch invitation emails to the judges instantly
    toast.success(`${emails.length} judge${emails.length === 1 ? '' : 's'} assigned to "${competition.name}"`);
  };

  return (
    <div className="space-y-4">
      <AllCompetitionsHeader />

      <AllCompetitionsStats
        total={counts['All Competitions']}
        ongoing={counts.Ongoing}
        upcoming={counts.Upcoming}
        past={counts.Past}
      />

      <AllCompetitionsTabs active={activeTab} onChange={(t) => { setActiveTab(t); setPage(1); }} counts={counts} />

      <AllCompetitionsFilters
        filters={filters}
        onChange={updateFilters}
        onReset={resetFilters}
        activeCount={activeCount}
      />

      <div className="rounded-xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
        <AllCompetitionsTable
          rows={paginated}
          onView={setViewTarget}
          onAssignJudges={setAssignTarget}
          onEdit={(row) => router.push(`/admin/categories/competitions/create?mode=edit&id=${row.id}`)}
          onReuse={(row) => router.push(`/admin/categories/competitions/create?mode=reuse&id=${row.id}`)}
        />
        <AllCompetitionsPagination
          page={safePage}
          totalPages={totalPages}
          shownFrom={filtered.length === 0 ? 0 : (safePage - 1) * PER_PAGE + 1}
          shownTo={Math.min(safePage * PER_PAGE, filtered.length)}
          total={filtered.length}
          onChange={setPage}
        />
      </div>

      <CompetitionDetailModal
        competition={viewTarget}
        judgeEmails={viewTarget ? judgesById[viewTarget.id] ?? [] : []}
        open={viewTarget !== null}
        onClose={() => setViewTarget(null)}
      />
      <AssignJudgesModal
        competition={assignTarget}
        currentEmails={assignTarget ? judgesById[assignTarget.id] ?? [] : []}
        open={assignTarget !== null}
        onClose={() => setAssignTarget(null)}
        onAssign={handleAssignSave}
      />
    </div>
  );
}
