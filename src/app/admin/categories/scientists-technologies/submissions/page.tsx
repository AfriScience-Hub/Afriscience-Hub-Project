'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft, FileText, Search, MoreVertical, Eye, CheckCircle, XCircle,
  ShieldCheck, Clock, Loader2,
} from 'lucide-react';
import TableActionMenu from '@/app/admin/components/TableActionMenu';
import { toast } from 'sonner';
import StatCard from '../../special-centres/components/StatCard';
import PagePagination from '../../special-centres/components/PagePagination';
import ScientistDetailModal from '../components/ScientistDetailModal';
import RejectScientistModal from '../components/RejectScientistModal';
import type { AdminScientist } from '../data';
import SubscriptionBadge from '../../afro-innovations/components/SubscriptionBadge';
import {
  approveAdminScientistListing,
  fetchAdminScientistListing,
  fetchAdminScientistListings,
  rejectAdminScientistListing,
} from '../api';

type TabId = 'all' | 'pending' | 'approved' | 'rejected';

const distinctOptions = (values: string[]) => [...new Set(values.filter(Boolean))].sort();

export default function ScientistSubmissionsPage() {
  const [records, setRecords] = useState<AdminScientist[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<TabId>('all');
  const [search, setSearch] = useState('');
  const [fieldFilter, setFieldFilter] = useState('All Fields');
  const [countryFilter, setCountryFilter] = useState('All Countries');
  const [degreeFilter, setDegreeFilter] = useState('All Degrees');
  const [serviceFilter, setServiceFilter] = useState('All Services');
  const [subscriptionFilter, setSubscriptionFilter] = useState('All Subscriptions');
  const [sort, setSort] = useState('Newest First');
  const [selected, setSelected] = useState<AdminScientist | null>(null);
  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [rejectSaving, setRejectSaving] = useState(false);
  const [page, setPage] = useState(1);
  const detailRequest = useRef(0);
  const perPage = 8;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const rows = await fetchAdminScientistListings();
        if (!cancelled) setRecords(rows);
      } catch (e: any) {
        toast.error(e?.message || 'Failed to load scientist submissions');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const countries = useMemo(() => distinctOptions(records.map((r) => r.country)), [records]);
  const fields = useMemo(() => distinctOptions(records.map((r) => r.field)), [records]);
  const degrees = useMemo(() => distinctOptions(records.flatMap((r) => r.degrees)), [records]);
  const services = useMemo(() => distinctOptions(records.flatMap((r) => r.services)), [records]);

  const filtered = useMemo(() => {
    const rows = records.filter((r) => {
      if (tab === 'pending' && r.status !== 'Pending Review') return false;
      if (tab === 'approved' && !(r.status === 'Approved' || r.status === 'Published')) return false;
      if (tab === 'rejected' && r.status !== 'Rejected') return false;
      if (search && !`${r.name} ${r.title} ${r.submitterEmail} ${r.country}`.toLowerCase().includes(search.toLowerCase())) return false;
      if (fieldFilter !== 'All Fields' && r.field !== fieldFilter) return false;
      if (countryFilter !== 'All Countries' && r.country !== countryFilter) return false;
      if (degreeFilter !== 'All Degrees' && !r.degrees.includes(degreeFilter)) return false;
      if (serviceFilter !== 'All Services' && !r.services.includes(serviceFilter)) return false;
      if (subscriptionFilter !== 'All Subscriptions' && r.subscription !== subscriptionFilter) return false;
      return true;
    });
    return sort === 'Oldest First' ? [...rows].reverse() : rows;
  }, [records, tab, search, fieldFilter, countryFilter, degreeFilter, serviceFilter, subscriptionFilter, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const openRecord = async (record: AdminScientist) => {
    const request = ++detailRequest.current;
    setSelected(record);
    try {
      const detail = await fetchAdminScientistListing(record.id);
      if (request !== detailRequest.current) return;
      setSelected(detail);
      setRecords((prev) => prev.map((r) => (r.id === detail.id ? detail : r)));
    } catch (e: any) {
      toast.error(e?.message || 'Failed to load the full listing');
    }
  };

  const approve = async (s: AdminScientist) => {
    if (approvingId) return;
    setApprovingId(s.id);
    try {
      await approveAdminScientistListing(s.id);
      setRecords((prev) => prev.map((r) => (
        r.id === s.id ? { ...r, status: 'Approved', listingStatus: 'Published' } : r
      )));
      setSelected(null);
      toast.success('Listing approved');
    } catch (e: any) {
      toast.error(e?.message || 'Failed to approve listing');
    } finally {
      setApprovingId(null);
    }
  };

  const confirmReject = async () => {
    if (!rejectingId || !rejectReason.trim() || rejectSaving) return;
    setRejectSaving(true);
    try {
      await rejectAdminScientistListing(rejectingId, rejectReason.trim());
      setRecords((prev) => prev.map((r) => (
        r.id === rejectingId
          ? { ...r, status: 'Rejected', listingStatus: 'Unpublished', reason: rejectReason.trim() }
          : r
      )));
      setRejectingId(null);
      setRejectReason('');
      setSelected(null);
      toast.success('Listing rejected');
    } catch (e: any) {
      toast.error(e?.message || 'Failed to reject listing');
    } finally {
      setRejectSaving(false);
    }
  };

  const total = records.length;
  const pending = records.filter((r) => r.status === 'Pending Review').length;
  const approved = records.filter((r) => r.status === 'Approved' || r.status === 'Published').length;
  const rejected = records.filter((r) => r.status === 'Rejected').length;

  const tabs: { id: TabId; label: string; count: number; icon: React.ReactNode; tone: string }[] = [
    { id: 'all', label: 'All Submissions', count: total, icon: <FileText className="h-3.5 w-3.5" />, tone: 'text-[#453DD8]' },
    { id: 'pending', label: 'Pending', count: pending, icon: <Clock className="h-3.5 w-3.5" />, tone: 'text-amber-600' },
    { id: 'approved', label: 'Approved', count: approved, icon: <CheckCircle className="h-3.5 w-3.5" />, tone: 'text-emerald-600' },
    { id: 'rejected', label: 'Rejected', count: rejected, icon: <XCircle className="h-3.5 w-3.5" />, tone: 'text-red-500' },
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
        <StatCard iconBg="bg-purple-100 text-purple-600" icon={<ShieldCheck className="h-4 w-4" />} label="Total Submissions" value={total} />
        <StatCard iconBg="bg-green-100 text-green-600" icon={<CheckCircle className="h-4 w-4" />} label="Approved" value={approved} />
        <StatCard iconBg="bg-amber-100 text-amber-600" icon={<Clock className="h-4 w-4" />} label="Pending Review" value={pending} />
        <StatCard iconBg="bg-red-100 text-red-600" icon={<XCircle className="h-4 w-4" />} label="Rejected" value={rejected} />
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
          <option>All Fields</option>{fields.map((f) => <option key={f}>{f}</option>)}
        </select>
        <select value={countryFilter} onChange={(e) => { setCountryFilter(e.target.value); setPage(1); }} className="px-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs cursor-pointer outline-none">
          <option>All Countries</option>{countries.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={degreeFilter} onChange={(e) => { setDegreeFilter(e.target.value); setPage(1); }} className="px-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs cursor-pointer outline-none">
          <option>All Degrees</option>{degrees.map((d) => <option key={d}>{d}</option>)}
        </select>
        <select value={serviceFilter} onChange={(e) => { setServiceFilter(e.target.value); setPage(1); }} className="px-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs cursor-pointer outline-none">
          <option>All Services</option>{services.map((s) => <option key={s}>{s}</option>)}
        </select>
        <select value={subscriptionFilter} onChange={(e) => { setSubscriptionFilter(e.target.value); setPage(1); }} className="px-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs cursor-pointer outline-none">
          <option>All Subscriptions</option><option>Pro Plan</option><option>Free Plan</option>
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="px-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs cursor-pointer outline-none">
          <option>Newest First</option>
          <option>Oldest First</option>
        </select>
      </div>

      <div className="rounded-xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[1420px]">
            <thead>
              <tr className="border-b border-neutral-gray-light bg-neutral-bg-light/60">
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Scientist</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Field</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Degree</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Services</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Subscription</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Profession</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Location</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Submitted By</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Submitted On</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Status</th>
                <th className="text-right px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={11} className="px-3 py-12 text-center">
                    <Loader2 className="mx-auto h-5 w-5 animate-spin text-[#453DD8]" />
                    <p className="mt-2 text-xs text-neutral-gray-medium">Loading submissions...</p>
                  </td>
                </tr>
              )}
              {!loading && paginated.map((r) => (
                <tr key={r.id} onClick={() => void openRecord(r)} className="border-b border-neutral-gray-light/60 last:border-0 hover:bg-neutral-bg-light/40 cursor-pointer">
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
                  <td className="px-3 py-3"><span className="px-2 py-0.5 rounded text-[11px] font-medium bg-purple-50 text-purple-700 whitespace-nowrap">{r.field || '—'}</span></td>
                  <td className="px-3 py-3 text-xs text-neutral-gray-dark whitespace-nowrap">{r.degrees.join(', ') || '—'}</td>
                  <td className="px-3 py-3 text-xs text-neutral-gray-dark max-w-[180px]">
                    <p className="truncate">{r.services.slice(0, 2).join(', ') || '—'}</p>
                    {r.services.length > 2 && <p className="text-[11px] text-neutral-gray-medium">+{r.services.length - 2} more</p>}
                  </td>
                  <td className="px-3 py-3"><SubscriptionBadge payingUser={r.subscription === 'Pro Plan'} /></td>
                  <td className="px-3 py-3 text-xs text-neutral-gray-dark max-w-[180px]">
                    <p className="truncate">{r.professions[0] || '—'}</p>
                    {r.professions.length > 1 && <p className="text-[11px] text-neutral-gray-medium">+{r.professions.length - 1} more</p>}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <p className="text-xs text-neutral-gray-dark">{r.country || '—'}</p>
                    <p className="text-[11px] text-neutral-gray-medium">{r.city}</p>
                  </td>
                  <td className="px-3 py-3">
                    <p className="text-xs font-medium text-neutral-black truncate">{r.submittedBy || '—'}</p>
                    <p className="text-[11px] text-neutral-gray-medium truncate">{r.submitterEmail}</p>
                  </td>
                  <td className="px-3 py-3 text-xs text-neutral-gray-dark whitespace-nowrap">{r.submittedOn || '—'}<br /><span className="text-[11px] text-neutral-gray-medium">{r.submittedTime}</span></td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap ${
                      r.status === 'Pending Review' ? 'bg-amber-50 text-amber-700'
                        : r.status === 'Rejected' ? 'bg-red-50 text-red-700'
                          : 'bg-emerald-50 text-emerald-700'
                    }`}>{r.status}</span>
                  </td>
                  <td className="px-3 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                    <TableActionMenu
                      triggerIcon={approvingId === r.id
                        ? <Loader2 className="h-4 w-4 animate-spin text-neutral-gray-dark" />
                        : <MoreVertical className="h-4 w-4 text-neutral-gray-dark" />}
                      items={[
                        { label: 'View', icon: <Eye className="h-3.5 w-3.5" />, onClick: () => void openRecord(r) },
                        ...(r.status === 'Pending Review' ? [
                          {
                            label: approvingId === r.id ? 'Approving...' : 'Approve',
                            icon: approvingId === r.id
                              ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              : <CheckCircle className="h-3.5 w-3.5" />,
                            onClick: () => { if (!approvingId) void approve(r); },
                          },
                          { label: 'Reject', icon: <XCircle className="h-3.5 w-3.5" />, onClick: () => { setRejectingId(r.id); setRejectReason(''); }, danger: true },
                        ] : []),
                      ]}
                    />
                  </td>
                </tr>
              ))}
              {!loading && paginated.length === 0 && (
                <tr><td colSpan={11} className="px-3 py-10 text-center text-xs text-neutral-gray-medium">No submissions match these filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <PagePagination page={page} totalPages={totalPages} perPage={perPage} total={records.length} count={filtered.length} noun="submissions" onPage={setPage} />
      </div>

      <ScientistDetailModal
        scientist={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
        onApprove={(s) => void approve(s)}
        onReject={(s) => { setRejectingId(s.id); setRejectReason(''); }}
      />

      <RejectScientistModal
        open={!!rejectingId}
        reason={rejectReason}
        saving={rejectSaving}
        onReason={setRejectReason}
        onCancel={() => { if (!rejectSaving) { setRejectingId(null); setRejectReason(''); } }}
        onConfirm={() => void confirmReject()}
      />
    </div>
  );
}
