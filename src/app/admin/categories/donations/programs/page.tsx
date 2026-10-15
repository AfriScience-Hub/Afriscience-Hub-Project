'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import ProgramsHeader from './components/ProgramsHeader';
import ProgramsStats from './components/ProgramsStats';
import ProgramsTable from './components/ProgramsTable';
import DonationsPagination from '../components/DonationsPagination';
import { ADMIN_ROUTES } from '@/app/admin/data/routes';
import { getPrograms, setProgramHidden, type SupportProgram } from '../data';

const PER_PAGE = 10;

/**
 * Support Programs: create and manage the programs that receive
 * donations. Edit navigates to the create page prefilled; Hide stops a
 * program from displaying on the main Donations page (stat card and
 * program filter) without deleting it.
 */
export default function ProgramsPage() {
  const router = useRouter();
  // Fresh read on mount so previous Hide/Create/Edit actions persist.
  const [rows, setRows] = useState<SupportProgram[]>(() => getPrograms());
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!search.trim()) return rows;
    const q = search.trim().toLowerCase();
    return rows.filter((r) => `${r.name} ${r.description}`.toLowerCase().includes(q));
  }, [rows, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const handleToggleHidden = (row: SupportProgram) => {
    const nowHidden = !row.hidden;
    setProgramHidden(row.id, nowHidden);
    setRows(getPrograms());
    toast.success(
      nowHidden
        ? `${row.name} is hidden from the Donations page.`
        : `${row.name} is visible on the Donations page again.`
    );
  };

  const handleEdit = (row: SupportProgram) =>
    router.push(`${ADMIN_ROUTES.donationsProgramsCreate}?mode=edit&id=${row.id}`);

  return (
    <div className="space-y-4">
      <ProgramsHeader />
      <ProgramsStats programs={rows} />

      <div className="relative max-w-md">
        <input
          type="search"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search programs by name or description..."
          aria-label="Search programs"
          className="w-full pl-3 pr-3 py-2 text-xs text-neutral-black rounded-lg border border-neutral-gray-light bg-white outline-none focus:border-[#453DD8]"
        />
      </div>

      <div className="rounded-xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
        <ProgramsTable rows={paginated} onEdit={handleEdit} onToggleHidden={handleToggleHidden} />
        <DonationsPagination
          page={safePage}
          totalPages={totalPages}
          shownFrom={filtered.length === 0 ? 0 : (safePage - 1) * PER_PAGE + 1}
          shownTo={Math.min(safePage * PER_PAGE, filtered.length)}
          total={filtered.length}
          noun="programs"
          onChange={setPage}
        />
      </div>
    </div>
  );
}
