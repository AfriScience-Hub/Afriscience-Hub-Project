'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import SubmissionsHeader from './components/SubmissionsHeader';
import SubmissionsStats from './components/SubmissionsStats';
import SubmissionsFilters, { DEFAULT_SUBMISSIONS_FILTERS, type SubmissionsFilterState } from './components/SubmissionsFilters';
import SubmissionsTable from './components/SubmissionsTable';
import SubmissionsPagination from './components/SubmissionsPagination';
import SubmissionDetailModal from './components/SubmissionDetailModal';
import { ADMIN_ROUTES } from '@/app/admin/data/routes';
import { SUBMISSIONS, type CompetitionSubmission } from './data';

const PER_PAGE = 8;

/**
 * View Submissions: filters, table (View Submission opens the detail modal;
 * Score Participants navigates to the scoring page) and the Release Top 30
 * shortlist action.
 */
export default function CompetitionSubmissionsPage() {
  const router = useRouter();
  const rows = SUBMISSIONS;
  const [filters, setFilters] = useState<SubmissionsFilterState>(DEFAULT_SUBMISSIONS_FILTERS);
  const [page, setPage] = useState(1);
  const [viewOpen, setViewOpen] = useState(false);
  const [active, setActive] = useState<CompetitionSubmission | null>(null);

  const updateFilters = (patch: Partial<SubmissionsFilterState>) => {
    setFilters((prev) => ({ ...prev, ...patch }));
    setPage(1);
  };

  const resetFilters = () => {
    setFilters(DEFAULT_SUBMISSIONS_FILTERS);
    setPage(1);
  };

  const filtered = useMemo(
    () =>
      rows.filter((row) => {
        if (filters.type !== 'All Types' && row.type !== filters.type) return false;
        if (filters.category !== 'All Categories' && row.category !== filters.category) return false;
        if (filters.country !== 'All Countries' && row.country !== filters.country) return false;
        if (filters.search.trim()) {
          const q = filters.search.trim().toLowerCase();
          const haystack = `${row.participant} ${row.email} ${row.title} ${row.description} ${row.message}`.toLowerCase();
          if (!haystack.includes(q)) return false;
        }
        return true;
      }),
    [rows, filters]
  );

  const activeCount = useMemo(
    () => [
      filters.type !== 'All Types',
      filters.category !== 'All Categories',
      filters.country !== 'All Countries',
      Boolean(filters.search.trim()),
    ].filter(Boolean).length,
    [filters]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const handleView = (row: CompetitionSubmission) => {
    setActive(row);
    setViewOpen(true);
  };

  const handleScore = (row: CompetitionSubmission) => {
    router.push(`${ADMIN_ROUTES.competitionsScore}?id=${row.id}`);
  };

  const handleReleaseTop30 = () => {
    const scored = rows.filter((r) => r.status === 'Scored').length;
    toast.success(`Top 30 shortlist released for voting (${scored} scored submissions ranked)`);
  };

  return (
    <div className="space-y-4">
      <SubmissionsHeader onReleaseTop30={handleReleaseTop30} />
      <SubmissionsStats />
      <SubmissionsFilters
        filters={filters}
        onChange={updateFilters}
        onReset={resetFilters}
        activeCount={activeCount}
      />

      <div className="rounded-xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
        <SubmissionsTable rows={paginated} onView={handleView} onScore={handleScore} />
        <SubmissionsPagination
          page={safePage}
          totalPages={totalPages}
          shownFrom={filtered.length === 0 ? 0 : (safePage - 1) * PER_PAGE + 1}
          shownTo={Math.min(safePage * PER_PAGE, filtered.length)}
          total={filtered.length}
          onChange={setPage}
        />
      </div>

      <SubmissionDetailModal submission={active} open={viewOpen} onClose={() => setViewOpen(false)} />
    </div>
  );
}
