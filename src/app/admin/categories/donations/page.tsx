'use client';

import React, { useMemo, useState } from 'react';
import DonationsHeader from './components/DonationsHeader';
import DonationsStats from './components/DonationsStats';
import DonationsFilters, { DEFAULT_DONATION_FILTERS, type DonationsFilterState } from './components/DonationsFilters';
import DonationsTable from './components/DonationsTable';
import DonationsPagination from './components/DonationsPagination';
import { DONATIONS, getPrograms } from './data';

const PER_PAGE = 10;

/**
 * Main Donations page: every donation to Afri-Science Hub programs.
 * Only visible support programs appear in the stat card and the program
 * filter — programs hidden from the Support Programs page stay hidden
 * here.
 */
export default function DonationsPage() {
  const [filters, setFilters] = useState<DonationsFilterState>(DEFAULT_DONATION_FILTERS);
  const [page, setPage] = useState(1);
  // Read fresh so Hide/Create on the programs page is reflected on mount.
  const visiblePrograms = useMemo(() => getPrograms().filter((p) => !p.hidden), []);

  const updateFilters = (patch: Partial<DonationsFilterState>) => {
    setFilters((prev) => ({ ...prev, ...patch }));
    setPage(1);
  };

  const filtered = useMemo(
    () =>
      DONATIONS.filter((row) => {
        if (filters.program !== 'All Programs' && row.program !== filters.program) return false;
        if (filters.search.trim()) {
          const q = filters.search.trim().toLowerCase();
          if (!`${row.donor} ${row.id}`.toLowerCase().includes(q)) return false;
        }
        return true;
      }),
    [filters]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  return (
    <div className="space-y-4">
      <DonationsHeader />
      <DonationsStats totalDonations={DONATIONS.length} visiblePrograms={visiblePrograms.length} />
      <DonationsFilters filters={filters} programs={visiblePrograms} onChange={updateFilters} />

      <div className="rounded-xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
        <DonationsTable rows={paginated} />
        <DonationsPagination
          page={safePage}
          totalPages={totalPages}
          shownFrom={filtered.length === 0 ? 0 : (safePage - 1) * PER_PAGE + 1}
          shownTo={Math.min(safePage * PER_PAGE, filtered.length)}
          total={filtered.length}
          noun="donations"
          onChange={setPage}
        />
      </div>
    </div>
  );
}
