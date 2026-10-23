'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft, Users, Search, MoreVertical, Eye, Pencil,
  EyeOff, CheckCircle, Clock, XCircle,
} from 'lucide-react';
import TableActionMenu from '@/app/admin/components/TableActionMenu';
import { toast } from 'sonner';
import StatCard from '../../special-centres/components/StatCard';
import PagePagination from '../../special-centres/components/PagePagination';
import ScientistDetailModal from '../components/ScientistDetailModal';
import { ADMIN_SCIENTISTS, SCIENTIST_STATS, SCIENTIST_TRENDS, type AdminScientist, type ListingStatus } from '../data';
import { SCIENTIST_FIELDS, SCIENTIST_DEGREES, SCIENTIST_SERVICES, PROFESSIONS_BY_FIELD } from '@/app/data/mockData';

const STATUS_TONE: Record<ListingStatus, string> = {
  Published: 'bg-emerald-50 text-emerald-700',
  'Pending Review': 'bg-amber-50 text-amber-700',
  Unpublished: 'bg-red-50 text-red-700',
};

export default function AllScientistsPage() {
  const [records, setRecords] = useState<AdminScientist[]>(ADMIN_SCIENTISTS);
  const [search, setSearch] = useState('');
  const [fieldFilter, setFieldFilter] = useState('All Fields');
  const [professionFilter, setProfessionFilter] = useState('All Professions');
  const [degreeFilter, setDegreeFilter] = useState('All Degrees');
  const [serviceFilter, setServiceFilter] = useState('All Services');
  const [countryFilter, setCountryFilter] = useState('All Countries');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [selected, setSelected] = useState<AdminScientist | null>(null);
  const [page, setPage] = useState(1);
  const perPage = 8;

  const countries = useMemo(() => [...new Set(records.map((r) => r.country))].sort(), [records]);
  const professions = fieldFilter === 'All Fields'
    ? [...new Set(records.flatMap((r) => r.professions))].sort()
    : (PROFESSIONS_BY_FIELD[fieldFilter] || []);

  const filtered = useMemo(() => records.filter((r) => {
    if (search && !`${r.name} ${r.title} ${r.field} ${r.professions.join(' ')} ${r.location}`.toLowerCase().includes(search.toLowerCase())) return false;
    if (fieldFilter !== 'All Fields' && r.field !== fieldFilter) return false;
    if (professionFilter !== 'All Professions' && !r.professions.includes(professionFilter)) return false;
    if (degreeFilter !== 'All Degrees' && !r.degrees.includes(degreeFilter)) return false;
    if (serviceFilter !== 'All Services' && !r.services.includes(serviceFilter)) return false;
    if (countryFilter !== 'All Countries' && r.country !== countryFilter) return false;
    if (statusFilter !== 'All Statuses' && r.listingStatus !== statusFilter) return false;
    return true;
  }), [records, search, fieldFilter, professionFilter, degreeFilter, serviceFilter, countryFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const setStatus = (s: AdminScientist, status: ListingStatus) => {
    setRecords((prev) => prev.map((r) => (r.id === s.id ? { ...r, listingStatus: status } : r)));
    setSelected(null);
    toast.success(`Listing ${status.toLowerCase()}`);
  };

  const stats = [
    { label: 'Total Scientists', value: SCIENTIST_STATS.total, ...SCIENTIST_TRENDS.total, iconBg: 'bg-purple-100 text-purple-600', icon: <Users className="h-4 w-4" /> },
    { label: 'Published', value: SCIENTIST_STATS.published, ...SCIENTIST_TRENDS.published, iconBg: 'bg-green-100 text-green-600', icon: <CheckCircle className="h-4 w-4" /> },
    { label: 'Pending Review', value: SCIENTIST_STATS.pending, ...SCIENTIST_TRENDS.pending, iconBg: 'bg-amber-100 text-amber-600', icon: <Clock className="h-4 w-4" /> },
    { label: 'Unpublished', value: SCIENTIST_STATS.unpublished, ...SCIENTIST_TRENDS.unpublished, iconBg: 'bg-red-100 text-red-600', icon: <XCircle className="h-4 w-4" /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-gray-medium mb-4">
            <Link href="/admin/dashboard" className="hover:underline">Dashboard</Link><span>›</span>
            <Link href="/admin/categories/scientists-technologies" className="hover:underline">Scientists &amp; Technologists</Link><span>›</span>
            <span className="text-neutral-black font-medium">All Scientists</span>
          </div>
          <h1 className="text-xl font-bold text-neutral-black flex items-center gap-2">
            <span className="h-9 w-9 rounded-xl bg-purple-100 text-purple-600 grid place-items-center"><Users className="h-5 w-5" /></span>
            All Scientists &amp; Technologists
          </h1>
          <p className="text-[11px] text-neutral-gray-dark mt-1">Manage, view and update all scientist and technologist listings on AfriScience Hub.</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link href="/admin/categories/scientists-technologies" className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-neutral-gray-light bg-white text-xs font-semibold hover:bg-neutral-bg-light cursor-pointer">
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
            placeholder="Search by name, field, profession or location..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs focus:ring-2 focus:ring-[#453DD8] outline-none" />
        </div>
        <select value={fieldFilter} onChange={(e) => { setFieldFilter(e.target.value); setProfessionFilter('All Professions'); setPage(1); }} className="px-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs cursor-pointer outline-none">
          <option>All Fields</option>{SCIENTIST_FIELDS.map((f) => <option key={f}>{f}</option>)}
        </select>
        <select value={professionFilter} onChange={(e) => { setProfessionFilter(e.target.value); setPage(1); }} className="px-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs cursor-pointer outline-none">
          <option>All Professions</option>{professions.map((p) => <option key={p}>{p}</option>)}
        </select>
        <select value={degreeFilter} onChange={(e) => { setDegreeFilter(e.target.value); setPage(1); }} className="px-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs cursor-pointer outline-none">
          <option>All Degrees</option>{SCIENTIST_DEGREES.map((d) => <option key={d}>{d}</option>)}
        </select>
        <select value={serviceFilter} onChange={(e) => { setServiceFilter(e.target.value); setPage(1); }} className="px-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs cursor-pointer outline-none">
          <option>All Services</option>{SCIENTIST_SERVICES.map((s) => <option key={s}>{s}</option>)}
        </select>
        <select value={countryFilter} onChange={(e) => { setCountryFilter(e.target.value); setPage(1); }} className="px-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs cursor-pointer outline-none">
          <option>All Countries</option>{countries.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }} className="px-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs cursor-pointer outline-none">
          <option>All Statuses</option><option>Published</option><option>Pending Review</option><option>Unpublished</option>
        </select>
      </div>

      <div className="rounded-xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[1040px]">
            <thead>
              <tr className="border-b border-neutral-gray-light bg-neutral-bg-light/60">
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Scientist</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Field</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Profession</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Location</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Submitted On</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Published By</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Status</th>
                <th className="text-right px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Action</th>
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
                  <td className="px-3 py-3 text-xs text-neutral-gray-dark whitespace-nowrap">{r.submittedOn}<br /><span className="text-[11px] text-neutral-gray-medium">{r.submittedTime}</span></td>
                  <td className="px-3 py-3 text-xs text-neutral-gray-dark whitespace-nowrap">
                    {r.publishedBy || <span className="text-neutral-gray-medium">—</span>}
                  </td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap ${STATUS_TONE[r.listingStatus]}`}>{r.listingStatus}</span>
                  </td>
                  <td className="px-3 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                    <TableActionMenu
                      triggerIcon={<MoreVertical className="h-4 w-4 text-neutral-gray-dark" />}
                      items={[
                        { label: 'View Details', icon: <Eye className="h-3.5 w-3.5" />, onClick: () => setSelected(r) },
                        { label: 'Edit Listing', icon: <Pencil className="h-3.5 w-3.5" />, onClick: () => setSelected(r) },
                        ...(r.listingStatus === 'Published'
                          ? [{ label: 'Unpublish', icon: <EyeOff className="h-3.5 w-3.5" />, onClick: () => setStatus(r, 'Unpublished'), danger: true }]
                          : [{ label: 'Publish', icon: <CheckCircle className="h-3.5 w-3.5" />, onClick: () => setStatus(r, 'Published') }]),
                      ]}
                    />
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr><td colSpan={8} className="px-3 py-10 text-center text-xs text-neutral-gray-medium">No scientists match these filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <PagePagination page={page} totalPages={totalPages} perPage={perPage} total={SCIENTIST_STATS.total} count={filtered.length} noun="scientists" onPage={setPage} />
      </div>

      <ScientistDetailModal
        scientist={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
        onEdit={() => setSelected(null)}
        onApprove={() => setSelected(null)}
        onReject={() => setSelected(null)}
        onTogglePublish={(s) => setStatus(s, s.listingStatus === 'Published' ? 'Unpublished' : 'Published')}
      />
    </div>
  );
}
