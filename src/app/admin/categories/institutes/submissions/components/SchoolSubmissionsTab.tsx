'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Search, MoreVertical, Eye, CheckCircle, XCircle, FileText, Clock, X } from 'lucide-react';
import TableActionMenu from '@/app/admin/components/TableActionMenu';
import { toast } from 'sonner';
import StatCard from '../../../special-centres/components/StatCard';
import PagePagination from '../../../special-centres/components/PagePagination';
import SchoolDetailModal from '../../components/SchoolDetailModal';
import { ADMIN_SCHOOLS, SCHOOL_STATS, SCHOOL_TRENDS, type AdminSchool } from '../../data';
import { SCHOOL_CLASSES, SCHOOL_PROGRAMS, SCHOOL_OWNERSHIPS, SCHOOL_GENDERS } from '@/app/institutes/data';

type TabId = 'all' | 'pending' | 'approved' | 'rejected';

export default function SchoolSubmissionsTab() {
  const [records, setRecords] = useState<AdminSchool[]>(ADMIN_SCHOOLS);
  const [tab, setTab] = useState<TabId>('all');
  const [search, setSearch] = useState('');
  const [classFilter, setClassFilter] = useState('All Classes');
  const [programFilter, setProgramFilter] = useState('All Programs');
  const [ownershipFilter, setOwnershipFilter] = useState('All Ownership');
  const [genderFilter, setGenderFilter] = useState('All Genders');
  const [countryFilter, setCountryFilter] = useState('All Countries');
  const [sort, setSort] = useState('Newest First');
  const [selected, setSelected] = useState<AdminSchool | null>(null);
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 8;

  const countries = useMemo(() => [...new Set(records.map((r) => r.country))].sort(), [records]);

  const filtered = useMemo(() => {
    const rows = records.filter((r) => {
      if (tab === 'pending' && r.workflowStatus !== 'Pending Review') return false;
      if (tab === 'approved' && !(r.workflowStatus === 'Approved' || r.workflowStatus === 'Published')) return false;
      if (tab === 'rejected' && r.workflowStatus !== 'Rejected') return false;
      if (search && !`${r.name} ${r.submitterEmail} ${r.country} ${r.state}`.toLowerCase().includes(search.toLowerCase())) return false;
      if (classFilter !== 'All Classes' && r.class !== classFilter) return false;
      if (programFilter !== 'All Programs' && r.program !== programFilter) return false;
      if (ownershipFilter !== 'All Ownership' && r.ownership !== ownershipFilter) return false;
      if (genderFilter !== 'All Genders' && r.gender !== genderFilter) return false;
      if (countryFilter !== 'All Countries' && r.country !== countryFilter) return false;
      return true;
    });
    return sort === 'Oldest First' ? [...rows].reverse() : rows;
  }, [records, tab, search, classFilter, programFilter, ownershipFilter, genderFilter, countryFilter, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const approve = (s: AdminSchool) => {
    setRecords((prev) => prev.map((r) => (r.id === s.id ? { ...r, workflowStatus: 'Approved' } : r)));
    setSelected(null);
    toast.success('Listing approved');
  };

  const confirmReject = () => {
    if (!rejectingId || !rejectReason.trim()) return;
    setRecords((prev) => prev.map((r) => (r.id === rejectingId ? { ...r, workflowStatus: 'Rejected', reason: rejectReason.trim() } : r)));
    setRejectingId(null);
    setRejectReason('');
    setSelected(null);
    toast.success('Listing rejected');
  };

  const statusTone = (status: string) =>
    status === 'Pending Review' ? 'bg-amber-50 text-amber-700'
      : status === 'Rejected' ? 'bg-red-50 text-red-700'
        : 'bg-emerald-50 text-emerald-700';

  const tabs: { id: TabId; label: string; count: number; icon: React.ReactNode; tone: string }[] = [
    { id: 'all', label: 'All Submissions', count: SCHOOL_STATS.total, icon: <FileText className="h-3.5 w-3.5" />, tone: 'text-[#453DD8]' },
    { id: 'pending', label: 'Pending', count: SCHOOL_STATS.pending, icon: <Clock className="h-3.5 w-3.5" />, tone: 'text-amber-600' },
    { id: 'approved', label: 'Approved', count: SCHOOL_STATS.approved, icon: <CheckCircle className="h-3.5 w-3.5" />, tone: 'text-emerald-600' },
    { id: 'rejected', label: 'Rejected', count: SCHOOL_STATS.rejected, icon: <XCircle className="h-3.5 w-3.5" />, tone: 'text-red-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard iconBg="bg-purple-100 text-purple-600" icon={<span className="text-xs font-bold">PS</span>} label="Total Submissions" value={SCHOOL_STATS.total} change={SCHOOL_TRENDS.total.change} positive />
        <StatCard iconBg="bg-green-100 text-green-600" icon={<CheckCircle className="h-4 w-4" />} label="Approved" value={SCHOOL_STATS.approved} change={SCHOOL_TRENDS.approved.change} positive />
        <StatCard iconBg="bg-amber-100 text-amber-600" icon={<Clock className="h-4 w-4" />} label="Pending Review" value={SCHOOL_STATS.pending} change={SCHOOL_TRENDS.pending.change} positive />
        <StatCard iconBg="bg-red-100 text-red-600" icon={<XCircle className="h-4 w-4" />} label="Rejected" value={SCHOOL_STATS.rejected} change={SCHOOL_TRENDS.rejected.change} positive={false} />
      </div>

      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => { setTab(t.id); setPage(1); }}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition-colors ${tab === t.id ? 'border-[#453DD8] bg-[#453DD8]/[0.07] text-[#453DD8]' : 'border-neutral-gray-light bg-white text-neutral-gray-medium hover:text-neutral-black'}`}>
            <span className={tab === t.id ? t.tone : ''}>{t.icon}</span>
            {t.label} ({t.count})
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <div className="relative flex-1 min-w-[220px] sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium" />
          <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search by name, e-mail, country or state..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs focus:ring-2 focus:ring-[#453DD8] outline-none" />
        </div>
        <select value={classFilter} onChange={(e) => { setClassFilter(e.target.value); setPage(1); }} className="px-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs cursor-pointer outline-none">
          <option>All Classes</option>{SCHOOL_CLASSES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={programFilter} onChange={(e) => { setProgramFilter(e.target.value); setPage(1); }} className="px-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs cursor-pointer outline-none">
          <option>All Programs</option>{SCHOOL_PROGRAMS.map((p) => <option key={p}>{p}</option>)}
        </select>
        <select value={ownershipFilter} onChange={(e) => { setOwnershipFilter(e.target.value); setPage(1); }} className="px-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs cursor-pointer outline-none">
          <option>All Ownership</option>{SCHOOL_OWNERSHIPS.map((o) => <option key={o}>{o}</option>)}
        </select>
        <select value={genderFilter} onChange={(e) => { setGenderFilter(e.target.value); setPage(1); }} className="px-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs cursor-pointer outline-none">
          <option>All Genders</option>{SCHOOL_GENDERS.map((g) => <option key={g}>{g}</option>)}
        </select>
        <select value={countryFilter} onChange={(e) => { setCountryFilter(e.target.value); setPage(1); }} className="px-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs cursor-pointer outline-none">
          <option>All Countries</option>{countries.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="px-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs cursor-pointer outline-none">
          <option>Newest First</option><option>Oldest First</option>
        </select>
      </div>

      <div className="rounded-xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[1040px]">
            <thead>
              <tr className="border-b border-neutral-gray-light bg-neutral-bg-light/60">
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Institute</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Class</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Program</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Ownership</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Gender</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Services</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Submitted By</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Submitted On</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Status</th>
                <th className="text-right px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((r) => (
                <tr key={r.id} onClick={() => setSelected(r)} className="border-b border-neutral-gray-light/60 last:border-0 hover:bg-neutral-bg-light/40 cursor-pointer">
                  <td className="px-3 py-3">
                    <div className="flex gap-3 items-start max-w-[200px]">
                      <div className="relative h-10 w-10 rounded-lg overflow-hidden shrink-0 bg-brand-navy-900">
                        <Image src={r.image} alt={r.name} fill sizes="40px" className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-neutral-black truncate">{r.name}</p>
                        <p className="text-[11px] text-neutral-gray-medium truncate">{r.country}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3"><span className="px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-700 whitespace-nowrap">{r.class}</span></td>
                  <td className="px-3 py-3 text-xs text-neutral-gray-dark whitespace-nowrap">{r.program}</td>
                  <td className="px-3 py-3 text-xs text-neutral-gray-dark whitespace-nowrap">{r.ownership}</td>
                  <td className="px-3 py-3 text-xs text-neutral-gray-dark whitespace-nowrap">{r.gender}</td>
                  <td className="px-3 py-3 text-xs text-neutral-gray-dark max-w-[140px]">
                    <p className="truncate">{r.services[0]}</p>
                    {r.services.length > 1 && <p className="text-[11px] text-neutral-gray-medium">+{r.services.length - 1} more</p>}
                  </td>
                  <td className="px-3 py-3">
                    <p className="text-xs font-medium text-neutral-black truncate">{r.submittedBy}</p>
                    <p className="text-[11px] text-neutral-gray-medium truncate">{r.submitterEmail}</p>
                  </td>
                  <td className="px-3 py-3 text-xs text-neutral-gray-dark whitespace-nowrap">{r.submittedOn}<br /><span className="text-[11px] text-neutral-gray-medium">{r.submittedTime}</span></td>
                  <td className="px-3 py-3"><span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap ${statusTone(r.workflowStatus)}`}>{r.workflowStatus}</span></td>
                  <td className="px-3 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                    <TableActionMenu triggerIcon={<MoreVertical className="h-4 w-4 text-neutral-gray-dark" />} items={[
                      { label: 'View', icon: <Eye className="h-3.5 w-3.5" />, onClick: () => setSelected(r) },
                      ...(r.workflowStatus === 'Pending Review' ? [
                        { label: 'Approve', icon: <CheckCircle className="h-3.5 w-3.5" />, onClick: () => approve(r) },
                        { label: 'Reject', icon: <XCircle className="h-3.5 w-3.5" />, onClick: () => { setRejectingId(r.id); setRejectReason(''); }, danger: true },
                      ] : []),
                    ]} />
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && <tr><td colSpan={10} className="px-3 py-10 text-center text-xs text-neutral-gray-medium">No submissions match these filters.</td></tr>}
            </tbody>
          </table>
        </div>
        <PagePagination page={page} totalPages={totalPages} perPage={perPage} total={SCHOOL_STATS.total} count={filtered.length} noun="submissions" onPage={setPage} />
      </div>

      <SchoolDetailModal school={selected} open={!!selected} onClose={() => setSelected(null)} onEdit={() => setSelected(null)} onApprove={approve} onReject={(s) => { setRejectingId(s.id); setRejectReason(''); }} />

      {rejectingId && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4" onClick={() => setRejectingId(null)}>
          <div className="bg-white rounded-2xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-neutral-gray-light">
              <h3 className="text-lg font-bold text-neutral-black">Reject Listing</h3>
              <button onClick={() => setRejectingId(null)} className="p-2 rounded-lg hover:bg-neutral-bg-light"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-4 space-y-4">
              <p className="text-sm text-neutral-gray-dark">Please provide a reason for rejecting this listing. The submitter will be notified.</p>
              <textarea value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} placeholder="Enter reason for rejection..." rows={4}
                className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light text-sm focus:outline-none focus:border-brand-red-600 resize-none" />
              <div className="flex justify-end gap-2">
                <button onClick={() => setRejectingId(null)} className="px-4 py-2 rounded-xl border border-neutral-gray-light text-xs font-semibold hover:bg-neutral-bg-light cursor-pointer">Cancel</button>
                <button onClick={confirmReject} disabled={!rejectReason.trim()} className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700 cursor-pointer disabled:opacity-50">Confirm Rejection</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
