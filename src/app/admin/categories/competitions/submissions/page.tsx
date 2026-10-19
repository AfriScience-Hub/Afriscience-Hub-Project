'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import SubmissionsHeader from './components/SubmissionsHeader';
import SubmissionsStats from './components/SubmissionsStats';
import SubmissionsFilters, { DEFAULT_SUBMISSIONS_FILTERS, type SubmissionsFilterState } from './components/SubmissionsFilters';
import SubmissionsTable from './components/SubmissionsTable';
import SubmissionsTabs, { type SubmissionsTab } from './components/SubmissionsTabs';
import SubmissionsPagination from './components/SubmissionsPagination';
import { ADMIN_ROUTES } from '@/app/admin/data/routes';
import { SUBMISSIONS, isPastSubmission, type CompetitionSubmission } from './data';

const PER_PAGE = 8;

/**
 * View Submissions: split into Ongoing and Past tabs, each with its own
 * filters, table and pagination. View Submission navigates to the standalone
 * submission page; Score Participants navigates to the scoring page.
 */
export default function CompetitionSubmissionsPage() {
  const router = useRouter();

  const [tab, setTab] = useState<SubmissionsTab>('Ongoing');
  const [filters, setFilters] = useState<Record<SubmissionsTab, SubmissionsFilterState>>({
    Ongoing: DEFAULT_SUBMISSIONS_FILTERS,
    Past: DEFAULT_SUBMISSIONS_FILTERS,
  });
  const [page, setPage] = useState<Record<SubmissionsTab, number>>({ Ongoing: 1, Past: 1 });

  const byPhase = useMemo(
    () => ({
      Ongoing: SUBMISSIONS.filter((row) => !isPastSubmission(row)),
      Past: SUBMISSIONS.filter((row) => isPastSubmission(row)),
    }),
    []
  );

  const currentFilters = filters[tab];
  const currentRows = byPhase[tab];

  const updateFilters = (patch: Partial<SubmissionsFilterState>) => {
    setFilters((prev) => ({ ...prev, [tab]: { ...prev[tab], ...patch } }));
    setPage((prev) => ({ ...prev, [tab]: 1 }));
  };

  const resetFilters = () => {
    setFilters((prev) => ({ ...prev, [tab]: DEFAULT_SUBMISSIONS_FILTERS }));
    setPage((prev) => ({ ...prev, [tab]: 1 }));
  };

  const handleTabChange = (next: SubmissionsTab) => setTab(next);

  const filtered = useMemo(
    () =>
      currentRows.filter((row) => {
        if (currentFilters.type !== 'All Types' && row.type !== currentFilters.type) return false;
        if (currentFilters.category !== 'All Categories' && row.category !== currentFilters.category) return false;
        if (currentFilters.country !== 'All Countries' && row.country !== currentFilters.country) return false;
        if (currentFilters.search.trim()) {
          const q = currentFilters.search.trim().toLowerCase();
          const haystack = `${row.participant} ${row.email} ${row.title} ${row.description} ${row.message} ${row.competition}`.toLowerCase();
          if (!haystack.includes(q)) return false;
        }
        return true;
      }),
    [currentRows, currentFilters]
  );

  const activeCount = useMemo(
    () =>
      [
        currentFilters.type !== 'All Types',
        currentFilters.category !== 'All Categories',
        currentFilters.country !== 'All Countries',
        Boolean(currentFilters.search.trim()),
      ].filter(Boolean).length,
    [currentFilters]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page[tab], totalPages);
  const paginated = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const handleView = (row: CompetitionSubmission) => {
    router.push(`${ADMIN_ROUTES.competitionsSubmissionView}?id=${row.id}`);
  };

  const handleScore = (row: CompetitionSubmission) => {
    router.push(`${ADMIN_ROUTES.competitionsScore}?id=${row.id}`);
  };

  const handleReleaseTop30 = () => {
    const scored = byPhase.Ongoing.filter((r) => r.status === 'Scored').length;
    toast.success(`Top 30 shortlist released for voting (${scored} scored submissions ranked)`);
  };

  return (
    <div className="space-y-4">
      <SubmissionsHeader onReleaseTop30={handleReleaseTop30} />
      <SubmissionsStats />

      <div className="rounded-xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
        <div className="px-4 pt-3">
          <SubmissionsTabs
            active={tab}
            onChange={handleTabChange}
            counts={{ Ongoing: byPhase.Ongoing.length, Past: byPhase.Past.length }}
          />
        </div>

        <div className="px-4 py-3 border-b border-neutral-gray-light">
          <SubmissionsFilters
            filters={currentFilters}
            onChange={updateFilters}
            onReset={resetFilters}
            activeCount={activeCount}
          />
        </div>

        <SubmissionsTable rows={paginated} onView={handleView} onScore={handleScore} />
        <SubmissionsPagination
          page={safePage}
          totalPages={totalPages}
          shownFrom={filtered.length === 0 ? 0 : (safePage - 1) * PER_PAGE + 1}
          shownTo={Math.min(safePage * PER_PAGE, filtered.length)}
          total={filtered.length}
          onChange={(p) => setPage((prev) => ({ ...prev, [tab]: p }))}
        />
      </div>
    </div>
  );
}
