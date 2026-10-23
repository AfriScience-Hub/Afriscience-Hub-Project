'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Search, MoreVertical, Eye, Pencil, EyeOff, CheckCircle, XCircle } from 'lucide-react';
import TableActionMenu from '@/app/admin/components/TableActionMenu';
import { toast } from 'sonner';
import StatCard from '../../../special-centres/components/StatCard';
import PagePagination from '../../../special-centres/components/PagePagination';
import SchoolDetailModal from '../../components/SchoolDetailModal';
import { ADMIN_SCHOOLS, SCHOOL_STATS, SCHOOL_TRENDS, type AdminSchool, type ListingStatus } from '../../data';
import { SCHOOL_CLASSES, SCHOOL_PROGRAMS, SCHOOL_OWNERSHIPS, SCHOOL_GENDERS, SCHOOL_SERVICES } from '@/app/institutes/data';

const STATUS_TONE: Record<ListingStatus, string> = {
  Published: 'bg-emerald-50 text-emerald-700',
  'Pending Review': 'bg-amber-50 text-amber-700',
  Unpublished: 'bg-red-50 text-red-700',
};

export default function SchoolsTab() {
  const [records, setRecords] = useState<AdminSchool[]>(ADMIN_SCHOOLS);
  const [search, setSearch] = useState('');
  const [classFilter, setClassFilter] = useState('All Classes');
  const [programFilter, setProgramFilter] = useState('All Programs');
  const [ownershipFilter, setOwnershipFilter] = useState('All Ownership');
  const [genderFilter, setGenderFilter] = useState('All Genders');
  const [serviceFilter, setServiceFilter] = useState('All Services');
  const [countryFilter, setCountryFilter] = useState('All Countries');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [selected, setSelected] = useState<AdminSchool | null>(null);
  const [page, setPage] = useState(1);
  const perPage = 8;

  const countries = useMemo(() => [...new Set(records.map((r) => r.country))].sort(), [records]);

  const filtered = useMemo(() => records.filter((r) => {
    if (search && !`${r.name} ${r.country} ${r.state} ${r.ownership}`.toLowerCase().includes(search.toLowerCase())) return false;
    if (classFilter !== 'All Classes' && r.class !== classFilter) return false;
    if (programFilter !== 'All Programs' && r.program !== programFilter) return false;
    if (ownershipFilter !== 'All Ownership' && r.ownership !== ownershipFilter) return false;
    if (genderFilter !== 'All Genders' && r.gender !== genderFilter) return false;
    if (serviceFilter !== 'All Services' && !r.services.includes(serviceFilter)) return false;
    if (countryFilter !== 'All Countries' && r.country !== countryFilter) return false;
    if (statusFilter !== 'All Statuses' && r.listingStatus !== statusFilter) return false;
    return true;
  }), [records, search, classFilter, programFilter, ownershipFilter, genderFilter, serviceFilter, countryFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const setStatus = (s: AdminSchool, status: ListingStatus) => {
    setRecords((prev) => prev.map((r) => (r.id === s.id ? { ...r, listingStatus: status } : r)));
    setSelected(null);
    toast.success(`Listing ${status.toLowerCase()}`);
  };

  const stats = [
    { label: 'Total Schools', value: SCHOOL_STATS.total, ...SCHOOL_TRENDS.total, iconBg: 'bg-purple-100 text-purple-600' },
    { label: 'Published', value: SCHOOL_STATS.published, ...SCHOOL_TRENDS.published, iconBg: 'bg-green-100 text-green-600' },
    { label: 'Pending Review', value: SCHOOL_STATS.pending, ...SCHOOL_TRENDS.pending, iconBg: 'bg-amber-100 text-amber-600' },
    { label: 'Unpublished', value: SCHOOL_STATS.unpublished, ...SCHOOL_TRENDS.unpublished, iconBg: 'bg-red-100 text-red-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} icon={<span className="text-xs font-bold">PS</span>} iconBg={s.iconBg} change={s.change} positive={s.positive} />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <div className="relative flex-1 min-w-[220px] sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium" />
          <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search by name, country or state..."
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
        <select value={serviceFilter} onChange={(e) => { setServiceFilter(e.target.value); setPage(1); }} className="px-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs cursor-pointer outline-none">
          <option>All Services</option>{SCHOOL_SERVICES.map((s) => <option key={s}>{s}</option>)}
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
          <table className="w-full text-sm min-w-[980px]">
            <thead>
              <tr className="border-b border-neutral-gray-light bg-neutral-bg-light/60">
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Institute</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Class</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Program</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Ownership</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Services</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Country</th>
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
                        <p className="text-[11px] text-neutral-gray-medium truncate">{r.gender} · {r.activeStudents} students</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3"><span className="px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-700 whitespace-nowrap">{r.class}</span></td>
                  <td className="px-3 py-3 text-xs text-neutral-gray-dark whitespace-nowrap">{r.program}</td>
                  <td className="px-3 py-3 text-xs text-neutral-gray-dark whitespace-nowrap">{r.ownership}</td>
                  <td className="px-3 py-3 text-xs text-neutral-gray-dark max-w-[160px]">
                    <p className="truncate">{r.services[0]}</p>
                    {r.services.length > 1 && <p className="text-[11px] text-neutral-gray-medium">+{r.services.length - 1} more</p>}
                  </td>
                  <td className="px-3 py-3 text-xs text-neutral-gray-dark whitespace-nowrap">{r.country}</td>
                  <td className="px-3 py-3"><span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap ${STATUS_TONE[r.listingStatus]}`}>{r.listingStatus}</span></td>
                  <td className="px-3 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                    <TableActionMenu triggerIcon={<MoreVertical className="h-4 w-4 text-neutral-gray-dark" />} items={[
                      { label: 'View Details', icon: <Eye className="h-3.5 w-3.5" />, onClick: () => setSelected(r) },
                      { label: 'Edit Listing', icon: <Pencil className="h-3.5 w-3.5" />, onClick: () => setSelected(r) },
                      ...(r.listingStatus === 'Published'
                        ? [{ label: 'Unpublish', icon: <EyeOff className="h-3.5 w-3.5" />, onClick: () => setStatus(r, 'Unpublished'), danger: true }]
                        : [{ label: 'Publish', icon: <CheckCircle className="h-3.5 w-3.5" />, onClick: () => setStatus(r, 'Published') }]),
                    ]} />
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && <tr><td colSpan={8} className="px-3 py-10 text-center text-xs text-neutral-gray-medium">No schools match these filters.</td></tr>}
            </tbody>
          </table>
        </div>
        <PagePagination page={page} totalPages={totalPages} perPage={perPage} total={SCHOOL_STATS.total} count={filtered.length} noun="schools" onPage={setPage} />
      </div>

      <SchoolDetailModal school={selected} open={!!selected} onClose={() => setSelected(null)} onEdit={() => setSelected(null)} onApprove={() => setSelected(null)} onReject={() => setSelected(null)} onTogglePublish={(s) => setStatus(s, s.listingStatus === 'Published' ? 'Unpublished' : 'Published')} />
    </div>
  );
}
