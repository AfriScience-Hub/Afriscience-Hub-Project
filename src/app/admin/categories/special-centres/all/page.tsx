'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft, Microscope, Search, MoreVertical, Eye, Pencil,
  EyeOff, CheckCircle, BadgeCheck, Clock, XCircle,
} from 'lucide-react';
import TableActionMenu from '@/app/admin/components/TableActionMenu';
import { toast } from 'sonner';
import StatCard from '../components/StatCard';
import PagePagination from '../components/PagePagination';
import CentreDetailModal from '../components/CentreDetailModal';
import { ADMIN_CENTRES, CENTRE_STATS, CENTRE_TRENDS, FOCUS_AREAS, type AdminCentre, type ListingStatus } from '../data';

const STATUS_TONE: Record<ListingStatus, string> = {
  Published: 'bg-emerald-50 text-emerald-700',
  'Pending Review': 'bg-amber-50 text-amber-700',
  Unpublished: 'bg-red-50 text-red-700',
};

export default function AllCentresPage() {
  const [records, setRecords] = useState<AdminCentre[]>(ADMIN_CENTRES);
  const [search, setSearch] = useState('');
  const [focusFilter, setFocusFilter] = useState('All Focus Areas');
  const [countryFilter, setCountryFilter] = useState('All Countries');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [verifyFilter, setVerifyFilter] = useState('All Verification');
  const [selected, setSelected] = useState<AdminCentre | null>(null);
  const [page, setPage] = useState(1);
  const perPage = 8;

  const countries = useMemo(() => [...new Set(records.map((c) => c.country))].sort(), [records]);

  const filtered = useMemo(() => records.filter((r) => {
    if (search && !`${r.name} ${r.description} ${r.submitterEmail}`.toLowerCase().includes(search.toLowerCase())) return false;
    if (focusFilter !== 'All Focus Areas' && r.focusArea !== focusFilter) return false;
    if (countryFilter !== 'All Countries' && r.country !== countryFilter) return false;
    if (statusFilter !== 'All Statuses' && r.listingStatus !== statusFilter) return false;
    if (verifyFilter !== 'All Verification' && r.verification !== verifyFilter) return false;
    return true;
  }), [records, search, focusFilter, countryFilter, statusFilter, verifyFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const setStatus = (c: AdminCentre, status: ListingStatus) => {
    setRecords((prev) => prev.map((r) => (r.id === c.id ? { ...r, listingStatus: status } : r)));
    setSelected(null);
    toast.success(`Centre ${status.toLowerCase()}`);
  };

  const stats = [
    { label: 'Total Centres', value: CENTRE_STATS.total, ...CENTRE_TRENDS.total, iconBg: 'bg-purple-100 text-purple-600', icon: <Microscope className="h-4 w-4" /> },
    { label: 'Published', value: CENTRE_STATS.published, ...CENTRE_TRENDS.published, iconBg: 'bg-green-100 text-green-600', icon: <CheckCircle className="h-4 w-4" /> },
    { label: 'Pending Review', value: CENTRE_STATS.pending, ...CENTRE_TRENDS.pending, iconBg: 'bg-amber-100 text-amber-600', icon: <Clock className="h-4 w-4" /> },
    { label: 'Unpublished', value: CENTRE_STATS.unpublished, ...CENTRE_TRENDS.unpublished, iconBg: 'bg-red-100 text-red-600', icon: <XCircle className="h-4 w-4" /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-gray-medium mb-4">
            <Link href="/admin/dashboard" className="hover:underline">Dashboard</Link><span>›</span>
            <Link href="/admin/categories/special-centres" className="hover:underline">Special Centres</Link><span>›</span>
            <span className="text-neutral-black font-medium">All Listings</span>
          </div>
          <h1 className="text-xl font-bold text-neutral-black flex items-center gap-2">
            <span className="h-9 w-9 rounded-xl bg-purple-100 text-purple-600 grid place-items-center"><Microscope className="h-5 w-5" /></span>
            All Specialist Centres
          </h1>
          <p className="text-[11px] text-neutral-gray-dark mt-1">Manage, view and update all specialist centre listings on AfriScience Hub.</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link href="/admin/categories/special-centres" className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-neutral-gray-light bg-white text-xs font-semibold hover:bg-neutral-bg-light cursor-pointer">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} icon={s.icon} iconBg={s.iconBg} change={s.change} positive={s.positive} />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <div className="relative flex-1 min-w-[220px] sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium" />
          <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by centre name, description, e-mail or username..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs focus:ring-2 focus:ring-[#453DD8] outline-none" />
        </div>
        <select value={focusFilter} onChange={(e) => setFocusFilter(e.target.value)} className="px-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs cursor-pointer outline-none">
          <option>All Focus Areas</option>{FOCUS_AREAS.map((f) => <option key={f}>{f}</option>)}
        </select>
        <select value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)} className="px-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs cursor-pointer outline-none">
          <option>All Countries</option>{countries.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs cursor-pointer outline-none">
          <option>All Statuses</option><option>Published</option><option>Pending Review</option><option>Unpublished</option>
        </select>
        <select value={verifyFilter} onChange={(e) => setVerifyFilter(e.target.value)} className="px-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs cursor-pointer outline-none">
          <option>All Verification</option><option>Verified</option><option>Pending</option><option>Unverified</option>
        </select>
      </div>

      <div className="rounded-xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[940px]">
            <thead>
              <tr className="border-b border-neutral-gray-light bg-neutral-bg-light/60">
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Centre</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Focus Area</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Location</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Verification</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Listing Status</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Date Added</th>
                <th className="text-right px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((r) => (
                <tr key={r.id} onClick={() => setSelected(r)} className="border-b border-neutral-gray-light/60 last:border-0 hover:bg-neutral-bg-light/40 cursor-pointer">
                  <td className="px-3 py-3">
                    <div className="flex gap-3 items-start max-w-[240px]">
                      <div className="relative h-10 w-10 rounded-lg overflow-hidden shrink-0 bg-brand-navy-900">
                        <Image src={r.image} alt={r.name} fill sizes="40px" className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-neutral-black truncate">{r.name}</p>
                        <p className="text-[11px] text-neutral-gray-medium line-clamp-2">{r.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3"><span className="px-2 py-0.5 rounded text-[11px] font-medium bg-purple-50 text-purple-700 whitespace-nowrap">{r.focusArea}</span></td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <p className="text-xs text-neutral-gray-dark">{r.country}</p>
                    <p className="text-[11px] text-neutral-gray-medium">{r.city}</p>
                  </td>
                  <td className="px-3 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap ${
                      r.verification === 'Verified' ? 'bg-emerald-50 text-emerald-700'
                        : r.verification === 'Pending' ? 'bg-amber-50 text-amber-700'
                          : 'bg-neutral-100 text-neutral-gray-medium'
                    }`}>
                      {r.verification === 'Verified' ? <BadgeCheck className="h-3 w-3" /> : r.verification === 'Pending' ? <Clock className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                      {r.verification}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap ${STATUS_TONE[r.listingStatus]}`}>{r.listingStatus}</span>
                  </td>
                  <td className="px-3 py-3 text-xs text-neutral-gray-dark whitespace-nowrap">{r.submittedOn}<br /><span className="text-[11px] text-neutral-gray-medium">{r.submittedTime}</span></td>
                  <td className="px-3 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                    <TableActionMenu
                      triggerIcon={<MoreVertical className="h-4 w-4 text-neutral-gray-dark" />}
                      items={[
                        { label: 'View Details', icon: <Eye className="h-3.5 w-3.5" />, onClick: () => setSelected(r) },
                        { label: 'Edit Centre', icon: <Pencil className="h-3.5 w-3.5" />, onClick: () => setSelected(r) },
                        ...(r.listingStatus === 'Published'
                          ? [{ label: 'Unpublish', icon: <EyeOff className="h-3.5 w-3.5" />, onClick: () => setStatus(r, 'Unpublished'), danger: true }]
                          : [{ label: 'Publish', icon: <CheckCircle className="h-3.5 w-3.5" />, onClick: () => setStatus(r, 'Published') }]),
                      ]}
                    />
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr><td colSpan={7} className="px-3 py-10 text-center text-xs text-neutral-gray-medium">No centres match these filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <PagePagination page={page} totalPages={totalPages} perPage={perPage} total={CENTRE_STATS.total} count={filtered.length} noun="centres" onPage={setPage} />
      </div>

      <CentreDetailModal
        centre={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
        onEdit={() => setSelected(null)}
        onApprove={() => setSelected(null)}
        onReject={() => setSelected(null)}
        onTogglePublish={(c) => setStatus(c, c.listingStatus === 'Published' ? 'Unpublished' : 'Published')}
      />
    </div>
  );
}
