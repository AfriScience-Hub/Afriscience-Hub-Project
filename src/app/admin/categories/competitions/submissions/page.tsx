'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import SubmissionsHeader from './components/SubmissionsHeader';
import SubmissionsStats from './components/SubmissionsStats';
import SubmissionsFilters, { DEFAULT_SUBMISSIONS_FILTERS, type ScoreOrder, type SubmissionsFilterState } from './components/SubmissionsFilters';
import SubmissionsTable from './components/SubmissionsTable';
import SubmissionsTabs, { type SubmissionsTab } from './components/SubmissionsTabs';
import SubmissionsTypeTabs from './components/SubmissionsTypeTabs';
import SubmissionsPagination from './components/SubmissionsPagination';
import ReleaseTop30Modal from './components/ReleaseTop30Modal';
import { ADMIN_ROUTES } from '@/app/admin/data/routes';
import { SUBMISSIONS, isPastSubmission, releaseKey, type CompetitionSubmission, type SubmissionTypeTab } from './data';
import { categoryOptionsForType } from '../filterOptions';

const PER_PAGE = 8;

/**
 * View Submissions: type tabs scope the data, then Ongoing/Past phase tabs
 * toggle the table. The filter bar adapts to the selected type.
 */
export default function CompetitionSubmissionsPage() {
  const router = useRouter();

  const [typeTab, setTypeTab] = useState<SubmissionTypeTab>('All Competitions');
  const [tab, setTab] = useState<SubmissionsTab>('Ongoing');
  const [filters, setFilters] = useState<Record<SubmissionsTab, SubmissionsFilterState>>({
    Ongoing: DEFAULT_SUBMISSIONS_FILTERS,
    Past: DEFAULT_SUBMISSIONS_FILTERS,
  });
  const [page, setPage] = useState<Record<SubmissionsTab, number>>({ Ongoing: 1, Past: 1 });
  const [scoreOrder, setScoreOrder] = useState<ScoreOrder>('none');
  const [releaseOpen, setReleaseOpen] = useState(false);
  const [releasedKeys, setReleasedKeys] = useState<Set<string>>(new Set());
  const [disqualifiedIds, setDisqualifiedIds] = useState<Set<string>>(
    () => new Set(SUBMISSIONS.filter((row) => row.disqualified).map((row) => row.id))
  );

  const showCategory = typeTab === 'All Competitions' || typeTab === 'Afri-Presentations';
  const categoryOptions = categoryOptionsForType(typeTab === 'All Competitions' ? 'All Types' : typeTab);

  const byPhase = useMemo(() => {
    const scoped = typeTab === 'All Competitions'
      ? SUBMISSIONS
      : SUBMISSIONS.filter((row) => row.type === typeTab);
    return {
      Ongoing: scoped.filter((row) => !isPastSubmission(row)),
      Past: scoped.filter((row) => isPastSubmission(row)),
    };
  }, [typeTab]);

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

  const handleTypeChange = (next: SubmissionTypeTab) => {
    setTypeTab(next);
    setFilters((prev) => ({
      Ongoing: { ...prev.Ongoing, category: 'All Categories' },
      Past: { ...prev.Past, category: 'All Categories' },
    }));
    setPage({ Ongoing: 1, Past: 1 });
  };

  const handleTabChange = (next: SubmissionsTab) => setTab(next);

  const filtered = useMemo(
    () =>
      currentRows.filter((row) => {
        if (showCategory && currentFilters.category !== 'All Categories' && row.category !== currentFilters.category) return false;
        if (currentFilters.country !== 'All Countries' && row.country !== currentFilters.country) return false;
        if (currentFilters.search.trim()) {
          const q = currentFilters.search.trim().toLowerCase();
          const haystack = `${row.participant} ${row.email} ${row.title} ${row.description} ${row.message} ${row.competition}`.toLowerCase();
          if (!haystack.includes(q)) return false;
        }
        return true;
      }),
    [currentRows, currentFilters, showCategory]
  );

  const ordered = useMemo(() => {
    if (scoreOrder === 'none') return filtered;
    return [...filtered].sort((a, b) => {
      if (a.avgScore == null && b.avgScore == null) return 0;
      if (a.avgScore == null) return 1;
      if (b.avgScore == null) return -1;
      return scoreOrder === 'asc' ? a.avgScore - b.avgScore : b.avgScore - a.avgScore;
    });
  }, [filtered, scoreOrder]);

  const activeCount = useMemo(
    () =>
      [
        showCategory && currentFilters.category !== 'All Categories',
        currentFilters.country !== 'All Countries',
        Boolean(currentFilters.search.trim()),
      ].filter(Boolean).length,
    [currentFilters, showCategory]
  );

  const totalPages = Math.max(1, Math.ceil(ordered.length / PER_PAGE));
  const safePage = Math.min(page[tab], totalPages);
  const paginated = ordered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const handleView = (row: CompetitionSubmission) => {
    router.push(`${ADMIN_ROUTES.competitionsSubmissionView}?id=${row.id}`);
  };

  const handleScore = (row: CompetitionSubmission) => {
    router.push(`${ADMIN_ROUTES.competitionsScore}?id=${row.id}`);
  };

  const handleDisqualify = (row: CompetitionSubmission) => {
    if (disqualifiedIds.has(row.id)) {
      toast.info(`"${row.title}" is already disqualified.`);
      return;
    }
    setDisqualifiedIds((prev) => new Set(prev).add(row.id));
    toast.success(`"${row.title}" has been disqualified.`);
  };

  const handleRelease = (type: string, category?: string) => {
    const key = releaseKey(type, category);
    setReleasedKeys((prev) => new Set(prev).add(key));
  };

  return (
    <div className="space-y-4">
      <SubmissionsHeader onReleaseTop30={() => setReleaseOpen(true)} />
      <SubmissionsStats />

      <div className="rounded-xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
        <div className="px-4 pt-3">
          <SubmissionsTypeTabs active={typeTab} onChange={handleTypeChange} />
        </div>

        <div className="px-4 pt-2">
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
            showCategory={showCategory}
            categoryOptions={categoryOptions}
            scoreOrder={scoreOrder}
            onToggleScoreOrder={() => setScoreOrder((prev) => prev === 'none' ? 'desc' : prev === 'desc' ? 'asc' : 'none')}
          />
        </div>

        <SubmissionsTable
          rows={paginated}
          onView={handleView}
          onScore={handleScore}
          onDisqualify={handleDisqualify}
          canScore={tab === 'Ongoing'}
          releasedKeys={releasedKeys}
          disqualifiedIds={disqualifiedIds}
        />
        <SubmissionsPagination
          page={safePage}
          totalPages={totalPages}
          shownFrom={ordered.length === 0 ? 0 : (safePage - 1) * PER_PAGE + 1}
          shownTo={Math.min(safePage * PER_PAGE, ordered.length)}
          total={ordered.length}
          onChange={(p) => setPage((prev) => ({ ...prev, [tab]: p }))}
        />
      </div>

      <ReleaseTop30Modal
        open={releaseOpen}
        onClose={() => setReleaseOpen(false)}
        phase={tab}
        activeType={typeTab}
        releasedKeys={releasedKeys}
        onRelease={handleRelease}
      />
    </div>
  );
}
