'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Lightbulb, Search, MoreVertical, Eye, CheckCircle, MapPin, LayoutGrid } from 'lucide-react';
import TableActionMenu from '@/app/admin/components/TableActionMenu';
import { SUBMISSIONS } from '../submissions/data';
import type { SubmissionRecord } from '../submissions/data';
import SubmissionDetailModal from '../submissions/components/SubmissionDetailModal';
import { INNOVATION_FIELDS, INNOVATION_STAGES, AFRICAN_COUNTRIES } from '@/app/data/mockData';

export default function AllInnovationsPage() {
  const live = useMemo(() => SUBMISSIONS.filter((r) => r.status === 'Published'), []);
  const [search, setSearch] = useState('');
  const [fieldFilter, setFieldFilter] = useState('All Fields');
  const [stageFilter, setStageFilter] = useState('All Stages');
  const [countryFilter, setCountryFilter] = useState('All Countries');
  const [selected, setSelected] = useState<SubmissionRecord | null>(null);
  const [page, setPage] = useState(1);
  const perPage = 10;

  const filtered = useMemo(() => live.filter((r) => {
    if (search && !`${r.innovation.name} ${r.submitter.name}`.toLowerCase().includes(search.toLowerCase())) return false;
    if (fieldFilter !== 'All Fields' && r.innovation.field !== fieldFilter) return false;
    if (stageFilter !== 'All Stages' && r.innovation.stage !== stageFilter) return false;
    if (countryFilter !== 'All Countries' && r.innovation.country !== countryFilter) return false;
    return true;
  }), [live, search, fieldFilter, stageFilter, countryFilter]);

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

  const countryCount = new Set(live.map((r) => r.innovation.country)).size;
  const fieldCount = new Set(live.map((r) => r.innovation.field)).size;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-gray-medium mb-4">
            <Link href="/admin/dashboard" className="hover:underline">Dashboard</Link>
            <span>›</span>
            <Link href="/admin/categories/afro-innovations" className="hover:underline">Afro-Innovations</Link>
            <span>›</span>
            <span className="text-neutral-black font-medium">All Innovations</span>
          </div>
          <h1 className="text-xl font-bold text-neutral-black flex items-center gap-2"><Lightbulb className="h-5 w-5 text-purple-600" />All Innovations</h1>
          <p className="text-xs text-neutral-gray-medium mt-1">Approved innovations that are currently live on the platform.</p>
        </div>
        <Link href="/admin/categories/afro-innovations" className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-neutral-gray-light bg-white text-xs font-semibold hover:bg-neutral-bg-light cursor-pointer shrink-0">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <StatCard iconBg="bg-emerald-100 text-emerald-600" icon={<CheckCircle className="h-4 w-4" />} label="Live Innovations" value={live.length} />
        <StatCard iconBg="bg-blue-100 text-blue-600" icon={<MapPin className="h-4 w-4" />} label="Countries" value={countryCount} />
        <StatCard iconBg="bg-purple-100 text-purple-600" icon={<LayoutGrid className="h-4 w-4" />} label="Fields" value={fieldCount} />
      </div>

      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center">
        <div className="relative col-span-2 sm:flex-1 sm:min-w-[200px] sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search innovations by name or keyword..." className="w-full pl-9 pr-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs focus:ring-2 focus:ring-[#453DD8] outline-none" />
        </div>
        <select value={fieldFilter} onChange={(e) => setFieldFilter(e.target.value)} className="px-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs cursor-pointer outline-none">
          <option>All Fields</option>{INNOVATION_FIELDS.map((f) => <option key={f} value={f}>{f}</option>)}
        </select>
        <select value={stageFilter} onChange={(e) => setStageFilter(e.target.value)} className="px-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs cursor-pointer outline-none">
          <option>All Stages</option>{INNOVATION_STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)} className="px-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs cursor-pointer outline-none">
          <option>All Countries</option>{AFRICAN_COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="rounded-xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[960px]">
            <thead>
              <tr className="border-b border-neutral-gray-light bg-neutral-bg-light/60">
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Innovation</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Submitted By</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Published On</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Field</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Stage</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Country</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Status</th>
                <th className="text-right px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((r) => (
                <tr key={r.id} onClick={() => setSelected(r)} className="border-b border-neutral-gray-light/60 last:border-0 hover:bg-neutral-bg-light/40 cursor-pointer">
                  <td className="px-3 py-2.5">
                    <div className="flex gap-2.5 items-start max-w-[220px]">
                      <Image src={r.innovation.logo} alt={r.innovation.name} width={40} height={40} className="rounded-sm object-cover shrink-0 w-10 h-10" />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-neutral-black truncate">{r.innovation.name}</p>
                        <p className="text-[11px] text-neutral-gray-medium line-clamp-2">{r.innovation.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="flex gap-2 items-center">
                      <Image src={r.submitter.avatar} alt={r.submitter.name} width={28} height={28} className="rounded-full object-cover shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-neutral-black truncate">{r.submitter.name}</p>
                        <p className="text-[11px] text-neutral-gray-medium truncate">{r.submitter.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-xs text-neutral-gray-dark whitespace-nowrap">
                    {r.publishedBy?.date || r.submittedOn}<br />
                    <span className="text-[11px] text-neutral-gray-medium">{r.submittedTime}</span>
                  </td>
                  <td className="px-3 py-2.5"><span className="px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-700 whitespace-nowrap">{r.innovation.field}</span></td>
                  <td className="px-3 py-2.5"><span className="px-2 py-0.5 rounded text-[11px] font-medium bg-purple-50 text-purple-700 whitespace-nowrap">{r.innovation.stage}</span></td>
                  <td className="px-3 py-2.5 text-xs text-neutral-gray-dark whitespace-nowrap">{r.innovation.country}</td>
                  <td className="px-3 py-2.5"><span className="px-2 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap bg-emerald-50 text-emerald-700">Live</span></td>
                  <td className="px-3 py-2.5 text-right" onClick={(e) => e.stopPropagation()}>
                    <TableActionMenu
                      triggerIcon={<MoreVertical className="h-4 w-4 text-neutral-gray-dark" />}
                      items={[{ label: 'View', icon: <Eye className="h-3.5 w-3.5" />, onClick: () => setSelected(r) }]}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 py-3 border-t border-neutral-gray-light text-xs text-neutral-gray-medium">
          <span>Showing {filtered.length === 0 ? 0 : (page - 1) * perPage + 1} to {Math.min(page * perPage, filtered.length)} of {filtered.length} innovations</span>
          <div className="flex items-center gap-1 flex-wrap">
            <button disabled={page === 1} onClick={() => setPage((p) => p - 1)} className="h-7 w-7 rounded border border-neutral-gray-light grid place-items-center disabled:opacity-40 cursor-pointer">‹</button>
            {Array.from({ length: totalPages }).slice(0, 5).map((_, i) => (
              <button key={i} onClick={() => setPage(i + 1)} className={`h-7 w-7 rounded text-xs font-semibold cursor-pointer ${page === i + 1 ? 'bg-[#453DD8] text-white' : 'border border-neutral-gray-light bg-white'}`}>{i + 1}</button>
            ))}
            <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)} className="h-7 w-7 rounded border border-neutral-gray-light grid place-items-center disabled:opacity-40 cursor-pointer">›</button>
            <span className="ml-1 px-2 py-1 rounded border border-neutral-gray-light bg-white">{perPage} / page</span>
          </div>
        </div>
      </div>

      <SubmissionDetailModal submission={selected} open={!!selected} onClose={() => setSelected(null)} onApprove={() => {}} onReject={() => {}} />
    </div>
  );
}

function StatCard({ label, value, icon, iconBg }: { label: string; value: number; icon: React.ReactNode; iconBg: string }) {
  return (
    <div className="bg-white rounded-xl border border-neutral-gray-light p-4 flex flex-col">
      <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${iconBg} text-xs shrink-0`}>{icon}</div>
      <p className="text-2xl font-bold text-neutral-black mt-2">{value}</p>
      <p className="text-[11px] text-neutral-gray-medium">{label}</p>
    </div>
  );
}
