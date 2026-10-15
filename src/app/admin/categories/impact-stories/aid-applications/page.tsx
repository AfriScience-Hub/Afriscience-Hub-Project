'use client';

import React, { useMemo, useState } from 'react';
import { Search, Funnel } from 'lucide-react';
import { toast } from 'sonner';
import Pagination from '@/app/admin/components/Pagination';
import PublishImpactModal from '../components/PublishImpactModal';
import ApplicationsHeader, { type ApplicationsTab } from './components/ApplicationsHeader';
import ApplicationsStats from './components/ApplicationsStats';
import ApplicationsTabs from './components/ApplicationsTabs';
import ApplicationsTable from './components/ApplicationsTable';
import {
  SUPPORT_PROGRAMS,
  appToDraft,
  fmtUtcDate,
  getApplications,
  getCounts,
  getLatestPublished,
  updateApplication,
  type ImpactApplication,
} from '../applicationsData';
import type { ImpactStory } from '@/app/data/impactData';

const PER_PAGE = 10;
const selectCls = 'px-3 py-2 text-xs text-neutral-black rounded-lg border border-neutral-gray-light bg-white outline-none focus:border-[#453DD8] cursor-pointer appearance-none';

/**
 * Impact Aid Applications: All / Rejected / Published tabs with
 * tab-aware header and stats. Edit opens the story modal where the admin
 * completes the impact details and publishes (approve + publish in one
 * action) or rejects; published rows can be marked as concluded.
 */
export default function AidApplicationsPage() {
  const [tab, setTab] = useState<ApplicationsTab>('all');
  const [rows, setRows] = useState<ImpactApplication[]>(() => getApplications());
  const [search, setSearch] = useState('');
  const [program, setProgram] = useState('All Support Programs');
  const [sort, setSort] = useState('Newest First');
  const [page, setPage] = useState(1);
  const [editTarget, setEditTarget] = useState<ImpactApplication | null>(null);

  const counts = getCounts();
  const latestPublished = getLatestPublished();

  const filtered = useMemo(() => {
    let list = rows.filter((row) => {
      if (tab === 'rejected' && row.status !== 'Rejected') return false;
      if (tab === 'published' && row.status !== 'Published' && row.status !== 'Concluded') return false;
      if (program !== 'All Support Programs' && row.program !== program) return false;
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        if (!`${row.name} ${row.username} ${row.email}`.toLowerCase().includes(q)) return false;
      }
      return true;
    });
    list = [...list].sort((a, b) => (sort === 'Newest First' ? b.ts - a.ts : a.ts - b.ts));
    return list;
  }, [rows, tab, program, search, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const refresh = () => setRows(getApplications());

  // Stable draft identity so the modal form isn't reset by re-renders.
  const editDraft = useMemo(() => (editTarget ? appToDraft(editTarget) : null), [editTarget]);

  const handleEdit = (row: ImpactApplication) => setEditTarget(row);

  const handleConclude = (row: ImpactApplication) => {
    updateApplication(row.id, { status: 'Concluded', story: row.story ? { ...row.story, status: 'Concluded' } : null });
    refresh();
    toast.success(`${row.name}'s application marked as concluded.`);
  };

  // Publish approves + publishes in one action; on published rows it saves edits.
  const handleSave = (story: ImpactStory) => {
    if (!editTarget) return;
    const wasPending = editTarget.status === 'Pending';
    updateApplication(editTarget.id, {
      story,
      status: wasPending ? 'Published' : editTarget.status,
      publishedOn: wasPending ? fmtUtcDate(Date.now()) : editTarget.publishedOn,
      publishedTs: wasPending ? Date.now() : editTarget.publishedTs,
    });
    refresh();
    toast.success(wasPending ? `${editTarget.name}'s application approved and published.` : `Story updated for ${editTarget.name}.`);
    setEditTarget(null);
  };

  const handleReject = () => {
    if (!editTarget) return;
    updateApplication(editTarget.id, { status: 'Rejected', publishedOn: null, publishedTs: null });
    refresh();
    toast.success(`${editTarget.name}'s application rejected.`);
    setEditTarget(null);
  };

  const resetFilters = () => { setSearch(''); setProgram('All Support Programs'); setSort('Newest First'); setPage(1); };
  const activeCount = [search.trim() !== '', program !== 'All Support Programs', sort !== 'Newest First'].filter(Boolean).length;

  return (
    <div className="space-y-5">
      <ApplicationsHeader tab={tab} />
      <ApplicationsStats tab={tab} counts={counts} latestPublished={latestPublished?.publishedOn ?? null} />
      <ApplicationsTabs tab={tab} counts={counts} onChange={(t) => { setTab(t); setPage(1); }} />

      <div className="flex flex-col lg:flex-row gap-3">
        <div className="relative flex-1 min-w-0 lg:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium pointer-events-none" />
          <input
            type="search"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by name, username, or email..."
            aria-label="Search applications"
            className="w-full pl-9 pr-3 py-2 text-xs text-neutral-black rounded-lg border border-neutral-gray-light bg-white outline-none focus:border-[#453DD8]"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <select value={program} onChange={(e) => { setProgram(e.target.value); setPage(1); }} aria-label="Filter by support program" className={selectCls}>
            <option value="All Support Programs">All Support Programs</option>
            {SUPPORT_PROGRAMS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort by date" className={selectCls}>
            <option value="Newest First">Newest First</option>
            <option value="Oldest First">Oldest First</option>
          </select>
          <button
            type="button"
            className="flex items-center gap-1.5 px-4 py-2 border border-neutral-gray-light bg-white rounded-lg text-xs font-medium text-neutral-gray-dark hover:bg-neutral-bg-light cursor-pointer"
          >
            <Funnel className="h-3.5 w-3.5" /> Filter
            {activeCount > 0 && (
              <span className="ml-0.5 h-4 min-w-4 px-1 rounded-full bg-[#453DD8] text-white text-[10px] grid place-items-center">{activeCount}</span>
            )}
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
        <ApplicationsTable rows={paginated} tab={tab} onEdit={handleEdit} onConclude={handleConclude} />
        <Pagination
          page={safePage}
          totalPages={totalPages}
          shownFrom={filtered.length === 0 ? 0 : (safePage - 1) * PER_PAGE + 1}
          shownTo={Math.min(safePage * PER_PAGE, filtered.length)}
          total={filtered.length}
          noun="applications"
          onChange={setPage}
        />
      </div>

      <PublishImpactModal
        open={editTarget !== null}
        onClose={() => setEditTarget(null)}
        onSave={handleSave}
        initial={editDraft}
        onReject={handleReject}
        primaryLabel={editTarget?.status === 'Pending' ? 'Publish' : 'Update'}
        hideStatusSelect
        title="Edit Impact Submission"
      />
    </div>
  );
}
