'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus, Trophy } from 'lucide-react';
import AwardsStats from './components/AwardsStats';
import AwardsFilters, { DEFAULT_AWARD_FILTERS, type AwardsFilterState } from './components/AwardsFilters';
import AwardsTable from './components/AwardsTable';
import AwardsPagination from './components/AwardsPagination';
import AwardDetailModal from './components/AwardDetailModal';
import { ADMIN_ROUTES } from '@/app/admin/data/routes';
import { ADMIN_AWARDS, type AdminAward } from './data';

const PER_PAGE = 10;

/**
 * All Awards: stats, filters and the awards table. View opens the
 * full-details modal; Edit and Reuse navigate to the create-award page
 * prefilled with the award (edit submits as "Edit Award", reuse as
 * "Save Award" and creates a new award).
 */
export default function AwardsPage() {
  const router = useRouter();
  const [filters, setFilters] = useState<AwardsFilterState>(DEFAULT_AWARD_FILTERS);
  const [page, setPage] = useState(1);
  const [viewTarget, setViewTarget] = useState<AdminAward | null>(null);

  const updateFilters = (patch: Partial<AwardsFilterState>) => {
    setFilters((prev) => ({ ...prev, ...patch }));
    setPage(1);
  };

  const filtered = useMemo(
    () =>
      ADMIN_AWARDS.filter((row) => {
        if (filters.type !== 'All Types' && row.type !== filters.type) return false;
        if (filters.country !== 'All Countries' && row.country !== filters.country) return false;
        if (filters.year !== 'All Years' && row.year !== filters.year) return false;
        if (filters.search.trim()) {
          const q = filters.search.trim().toLowerCase();
          const haystack = `${row.recipient} ${row.type} ${row.email} ${row.category}`.toLowerCase();
          if (!haystack.includes(q)) return false;
        }
        return true;
      }),
    [filters]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const openCreate = (mode: 'edit' | 'reuse', row: AdminAward) =>
    router.push(`${ADMIN_ROUTES.awardsCreate}?mode=${mode}&id=${row.id}`);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-neutral-gray-medium mb-1">
            <Link href="/admin/dashboard" className="hover:text-neutral-black">Dashboard</Link>
            <span>&rsaquo;</span>
            <Link href={ADMIN_ROUTES.awards} className="hover:text-neutral-black">Awards</Link>
            <span>&rsaquo;</span>
            <span className="text-neutral-black font-medium">All Awards</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
              <Trophy className="h-5 w-5 text-purple-600" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl font-bold text-neutral-black leading-tight">Awards</h1>
              <p className="text-[11px] text-neutral-gray-dark mt-0.5">View all awards and their recipients.</p>
            </div>
          </div>
        </div>
        <Link
          href={ADMIN_ROUTES.awardsCreate}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#453DD8] text-white rounded-lg text-xs font-semibold hover:bg-[#3a33c0] cursor-pointer whitespace-nowrap flex-shrink-0"
        >
          <Plus className="h-4 w-4" /> Create Award
        </Link>
      </div>

      <AwardsStats />
      <AwardsFilters filters={filters} onChange={updateFilters} />

      <div className="rounded-xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
        <AwardsTable
          rows={paginated}
          onView={setViewTarget}
          onEdit={(row) => openCreate('edit', row)}
          onReuse={(row) => openCreate('reuse', row)}
        />
        <AwardsPagination
          page={safePage}
          totalPages={totalPages}
          shownFrom={filtered.length === 0 ? 0 : (safePage - 1) * PER_PAGE + 1}
          shownTo={Math.min(safePage * PER_PAGE, filtered.length)}
          total={filtered.length}
          onChange={setPage}
        />
      </div>

      <AwardDetailModal award={viewTarget} open={viewTarget !== null} onClose={() => setViewTarget(null)} />
    </div>
  );
}
