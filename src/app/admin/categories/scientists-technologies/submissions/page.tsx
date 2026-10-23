'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft, FileText, Search, MoreVertical, Eye, CheckCircle, XCircle,
  ShieldCheck, Clock, X,
} from 'lucide-react';
import TableActionMenu from '@/app/admin/components/TableActionMenu';
import { toast } from 'sonner';
import StatCard from '../../special-centres/components/StatCard';
import PagePagination from '../../special-centres/components/PagePagination';
import ScientistDetailModal from '../components/ScientistDetailModal';
import { ADMIN_SCIENTISTS, SCIENTIST_STATS, SCIENTIST_TRENDS, type AdminScientist } from '../data';
import { SCIENTIST_FIELDS } from '@/app/data/mockData';

type TabId = 'all' | 'pending' | 'approved' | 'rejected';

export default function ScientistSubmissionsPage() {
  const [records, setRecords] = useState<AdminScientist[]>(ADMIN_SCIENTISTS);
  const [tab, setTab] = useState<TabId>('all');
  const [search, setSearch] = useState('');
  const [fieldFilter, setFieldFilter] = useState('All Fields');
  const [countryFilter, setCountryFilter] = useState('All Countries');
  const [sort, setSort] = useState('Newest First');
  const [selected, setSelected] = useState<AdminScientist | null>(null);
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 8;

  const countries = useMemo(() => [...new Set(records.map((r) => r.country))].sort(), [records]);

  const filtered = useMemo(() => {
    const rows = records.filter((r) => {
      if (tab === 'pending' && r.status !== 'Pending Review') return false;
      if (tab === 'approved' && !(r.status === 'Approved' || r.status === 'Published')) return false;
      if (tab === 'rejected' && r.status !== 'Rejected') return false;
      if (search && !`${r.name} ${r.title} ${r.submitterEmail} ${r.country}`.toLowerCase().includes(search.toLowerCase())) return false;
      if (fieldFilter !== 'All Fields' && r.field !== fieldFilter) return false;
      if (countryFilter !== 'All Countries' && r.country !== countryFilter) return false;
      return true;
    });
    return sort === 'Oldest First' ? [...rows].reverse() : rows;
  }, [records, tab, search, fieldFilter, countryFilter, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const approve = (s: AdminScientist) => {
    setRecords((prev) => prev.map((r) => (r.id === s.id ? { ...r, status: 'Approved' } : r)));
    setSelected(null);
    toast.success('Listing approved');
  };

  const confirmReject = () => {
    if (!rejectingId || !rejectReason.trim()) return;
    setRecords((prev) => prev.map((r) => (r.id === rejectingId ? { ...r, status: 'Rejected', reason: rejectReason.trim() } : r)));
    setRejectingId(null);
    setRejectReason('');
    setSelected(null);
    toast.success('Listing rejected');
  };

  const tabs: { id: TabId; label: string; count: number; icon: React.ReactNode; tone: string }[] = [
    { id: 'all', label: 'All Submissions', count: SCIENTIST_STATS.total, icon: <FileText className="h-3.5 w-3.5" />, tone: 'text-[#453DD8]' },
    { id: 'pending', label: 'Pending', count: SCIENTIST_STATS.pending, icon: <Clock className="h-3.5 w-3.5" />, tone: 'text-amber-600' },
    { id: 'approved', label: 'Approved', count: SCIENTIST_STATS.approved, icon: <CheckCircle className="h-3.5 w-3.5" />, tone: 'text-emerald-600' },
    { id: 'rejected', label: 'Rejected', count: SCIENTIST_STATS.rejected, icon: <XCircle className="h-3.5 w-3.5" />, tone: 'text-red-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-gray-medium mb-4">
            <Link href="/admin/dashboard" className="hover:underline">Dashboard</Link><span>›</span>
            <Link href="/admin/categories/scientists-technologies" className="hover:underline">Scientists &amp; Technologists</Link><span>›</span>
            <span className="text-neutral-black font-medium">View Submissions</span>
          </div>
          <h1 className="text-xl font-bold text-neutral-black flex items-center gap-2">
            <span className="h-9 w-9 rounded-xl bg-purple-100 text-purple-600 grid place-items-center">
              <FileText className="h-5 w-5" />
            </span>
            View Submissions
          </h1>
          <p className="text-[11px] text-neutral-gray-dark mt-1">Review and manage scientist &amp; technologist submissions from the AfriScience ecosystem.</p>
        </div>
        <Link href="/admin/categories/scientists-technologies" className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-neutral-gray-light bg-white text-xs font-semibold hover:bg-neutral-bg-light cursor-pointer shrink-0">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard iconBg="bg-purple-100 text-purple-600" icon={<ShieldCheck className="h-4 w-4" />} label="Total Submissions" value={SCIENTIST_STATS.total} change={SCIENTIST_TRENDS.total.change} positive />
        <StatCard iconBg="bg-green-100 text-green-600" icon={<CheckCircle className="h-4 w-4" />} label="Approved" value={SCIENTIST_STATS.approved} change={SCIENTIST_TRENDS.approved.change} positive />
        <StatCard iconBg="bg-amber-100 text-amber-600" icon={<Clock className="h-4 w-4" />} label="Pending Review" value={SCIENTIST_STATS.pending} change={SCIENTIST_TRENDS.pending.change} positive />
        <StatCard iconBg="bg-red-100 text-red-600" icon={<XCircle className="h-4 w-4" />} label="Rejected" value={SCIENTIST_STATS.rejected} change={SCIENTIST_TRENDS.rejected.change} positive={false} />
      </div>

      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => { setTab(t.id); setPage(1); }}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition-colors ${
              tab === t.id
                ? 'border-[#453DD8] bg-[#453DD8]/[0.07] text-[#453DD8]'
                : 'border-neutral-gray-light bg-white text-neutral-gray-medium hover:text-neutral-black'
            }`}
          >
            <span className={tab === t.id ? t.tone : ''}>{t.icon}</span>
            {t.label} ({t.count})
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <div className="relative flex-1 min-w-[220px] sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by name, title, country or e-mail..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs focus:ring-2 focus:ring-[#453DD8] outline-none"
          />
        </div>
        <select value={fieldFilter} onChange={(e) => { setFieldFilter(e.target.value); setPage(1); }} className="px-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs cursor-pointer outline-none">
          <option>All Fields</option>{SCIENTIST_FIELDS.map((f) => <option key={f}>{f}</option>)}
        </select>
        <select value={countryFilter} onChange={(e) => { setCountryFilter(e.target.value); setPage(1); }} className="px-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs cursor-pointer outline-none">
          <option>All Countries</option>{countries.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="px-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs cursor-pointer outline-none">
          <option>Newest First</option>
          <option>Oldest First</option>
        </select>
      </div>

      <div className="rounded-xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[1020px]">
            <thead>
              <tr className="border-b border-neutral-gray-light bg-neutral-bg-light/60">
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Scientist</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Field</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Profession</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Location</th>
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
                    <div className="flex gap-3 items-start max-w-[220px]">
                      <div className="relative h-10 w-10 rounded-lg overflow-hidden shrink-0 bg-brand-navy-900">
                        <Image src={r.image} alt={r.name} fill sizes="40px" className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-neutral-black truncate">{r.name}</p>
                        <p className="text-[11px] text-neutral-gray-medium line-clamp-2">{r.title}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3"><span className="px-2 py-0.5 rounded text-[11px] font-medium bg-purple-50 text-purple-700 whitespace-nowrap">{r.field}</span></td>
                  <td className="px-3 py-3 text-xs text-neutral-gray-dark max-w-[180px]">
                    <p className="truncate">{r.professions[0]}</p>
                    {r.professions.length > 1 && <p className="text-[11px] text-neutral-gray-medium">+{r.professions.length - 1} more</p>}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <p className="text-xs text-neutral-gray-dark">{r.country}</p>
                    <p className="text-[11px] text-neutral-gray-medium">{r.city}</p>
                  </td>
                  <td className="px-3 py-3">
                    <p className="text-xs font-medium text-neutral-black truncate">{r.submittedBy}</p>
                    <p className="text-[11px] text-neutral-gray-medium truncate">{r.submitterEmail}</p>
                  </td>
                  <td className="px-3 py-3 text-xs text-neutral-gray-dark whitespace-nowrap">{r.submittedOn}<br /><span className="text-[11px] text-neutral-gray-medium">{r.submittedTime}</span></td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap ${
                      r.status === 'Pending Review' ? 'bg-amber-50 text-amber-700'
                        : r.status === 'Rejected' ? 'bg-red-50 text-red-700'
                          : 'bg-emerald-50 text-emerald-700'
                    }`}>{r.status}</span>
                  </td>
                  <td className="px-3 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                    <TableActionMenu
                      triggerIcon={<MoreVertical className="h-4 w-4 text-neutral-gray-dark" />}
                      items={[
                        { label: 'View', icon: <Eye className="h-3.5 w-3.5" />, onClick: () => setSelected(r) },
                        ...(r.status === 'Pending Review' ? [
                          { label: 'Approve', icon: <CheckCircle className="h-3.5 w-3.5" />, onClick: () => approve(r) },
                          { label: 'Reject', icon: <XCircle className="h-3.5 w-3.5" />, onClick: () => { setRejectingId(r.id); setRejectReason(''); }, danger: true },
                        ] : []),
                      ]}
                    />
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr><td colSpan={8} className="px-3 py-10 text-center text-xs text-neutral-gray-medium">No submissions match these filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <PagePagination page={page} totalPages={totalPages} perPage={perPage} total={SCIENTIST_STATS.total} count={filtered.length} noun="submissions" onPage={setPage} />
      </div>

      <ScientistDetailModal
        scientist={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
        onEdit={() => setSelected(null)}
        onApprove={approve}
        onReject={(s) => { setRejectingId(s.id); setRejectReason(''); }}
      />

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
