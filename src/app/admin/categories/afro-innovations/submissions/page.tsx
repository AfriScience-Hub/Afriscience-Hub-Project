'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Lightbulb, Search, MoreVertical, Eye, CheckCircle, XCircle, ShieldCheck } from 'lucide-react';
import { SUBMISSIONS } from './data';
import type { SubmissionRecord, SubmissionStatus } from './data';
import SubmissionDetailModal from './components/SubmissionDetailModal';
import { INNOVATION_FIELDS, INNOVATION_STAGES, AFRICAN_COUNTRIES } from '@/app/data/mockData';

export default function SubmissionsPage() {
  const [records, setRecords] = useState<SubmissionRecord[]>(SUBMISSIONS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All Status');
  const [fieldFilter, setFieldFilter] = useState<string>('All Fields');
  const [stageFilter, setStageFilter] = useState<string>('All Stages');
  const [countryFilter, setCountryFilter] = useState<string>('All Countries');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [selected, setSelected] = useState<SubmissionRecord | null>(null);
  const [page, setPage] = useState(1);
  const perPage = 10;
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpenMenuId(null); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const filtered = useMemo(() => {
    return records.filter((r) => {
      if (search && !`${r.innovation.name} ${r.submitter.name}`.toLowerCase().includes(search.toLowerCase())) return false;
      if (statusFilter !== 'All Status' && r.status !== statusFilter) return false;
      if (fieldFilter !== 'All Fields' && r.innovation.field !== fieldFilter) return false;
      if (stageFilter !== 'All Stages' && r.innovation.stage !== stageFilter) return false;
      if (countryFilter !== 'All Countries' && r.innovation.country !== countryFilter) return false;
      return true;
    });
  }, [records, search, statusFilter, fieldFilter, stageFilter, countryFilter]);

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

  const updateStatus = (id: string, status: SubmissionStatus) => {
    setRecords((prev) => prev.map((r) => (r.id === id ? { ...r, status, publishedBy: status === 'Published' ? { name: 'Claire Nwanyanwu', date: new Date().toLocaleDateString(), avatar: r.submitter.avatar } : r.publishedBy } : r)));
  };

  const total = records.length;
  const pending = records.filter((r) => r.status === 'Pending Review').length;
  const published = records.filter((r) => r.status === 'Published').length;
  const rejected = records.filter((r) => r.status === 'Rejected').length;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-gray-medium mb-1">
            <Link href="/admin/dashboard" className="hover:underline">Dashboard</Link><span>›</span><Link href="/admin/categories/afro-innovations" className="hover:underline">Afro-Innovations</Link><span>›</span><span className="text-neutral-black font-medium">Submissions</span>
          </div>
          <h1 className="text-xl font-bold text-neutral-black flex items-center gap-2"><Lightbulb className="h-5 w-5 text-purple-600" />Afro-Innovation Submissions</h1>
          <p className="text-xs text-neutral-gray-medium mt-1">Review and manage all submitted innovations. You can publish, reject or request changes.</p>
        </div>
        <Link href="/admin/categories/afro-innovations" className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-neutral-gray-light bg-white text-xs font-semibold hover:bg-neutral-bg-light cursor-pointer shrink-0">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard iconBg="bg-purple-100 text-purple-600" icon={<ShieldCheck className="h-4 w-4" />} label="Total Submissions" value={total} change="↑ 18.3% this month" positive />
        <StatCard iconBg="bg-orange-100 text-orange-600" icon={<span className="text-sm">◷</span>} label="Pending Review" value={pending} change="↑ 8.6% this month" positive />
        <StatCard iconBg="bg-green-100 text-green-600" icon={<CheckCircle className="h-4 w-4" />} label="Published" value={published} change="↑ 24.5% this month" positive />
        <StatCard iconBg="bg-red-100 text-red-600" icon={<XCircle className="h-4 w-4" />} label="Rejected" value={rejected} change="↓ 4.2% this month" positive={false} />
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search innovations by name or keyword..." className="w-full pl-9 pr-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs focus:ring-2 focus:ring-[#453DD8] outline-none" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs cursor-pointer outline-none">
          <option>All Status</option><option>Pending Review</option><option>Published</option><option>Rejected</option>
        </select>
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
        <div className="overflow-x-auto" ref={menuRef}>
          <table className="w-full text-sm min-w-[900px]">
            <thead>
              <tr className="border-b border-neutral-gray-light bg-neutral-bg-light/60">
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Innovation</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Submitted By</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Submitted On</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Field</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Stage</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Status</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Published By</th>
                <th className="text-right px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((r) => (
                <tr key={r.id} onClick={() => setSelected(r)} className="border-b border-neutral-gray-light/60 last:border-0 hover:bg-neutral-bg-light/40 cursor-pointer">
                  <td className="px-3 py-2.5">
                    <div className="flex gap-2.5 items-start max-w-[220px]">
                      <Image src={r.innovation.logo} alt={r.innovation.name} width={32} height={32} className="rounded-sm object-cover shrink-0 w-10 h-10" />
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
                  <td className="px-3 py-2.5 text-xs text-neutral-gray-dark whitespace-nowrap">{r.submittedOn}<br /><span className="text-[11px] text-neutral-gray-medium">{r.submittedTime}</span></td>
                  <td className="px-3 py-2.5"><span className="px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-700 whitespace-nowrap">{r.innovation.field}</span></td>
                  <td className="px-3 py-2.5"><span className="px-2 py-0.5 rounded text-[11px] font-medium bg-purple-50 text-purple-700 whitespace-nowrap">{r.innovation.stage}</span></td>
                  <td className="px-3 py-2.5"><span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap ${r.status === 'Pending Review' ? 'bg-amber-50 text-amber-700' : r.status === 'Published' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>{r.status}</span></td>
                  <td className="px-3 py-2.5">
                    {r.publishedBy ? (
                      <div className="flex gap-1.5 items-center">
                        <Image src={r.publishedBy.avatar} alt={r.publishedBy.name} width={24} height={24} className="rounded-full object-cover shrink-0 h-8 w-8" />
                        <div><p className="text-xs font-medium text-neutral-black truncate">{r.publishedBy.name}</p><p className="text-[11px] text-neutral-gray-medium">{r.publishedBy.date}</p></div>
                      </div>
                    ) : <span className="text-xs text-neutral-gray-medium">—</span>}
                  </td>
                  <td className="px-3 py-2.5 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="relative inline-block">
                      <button onClick={() => setOpenMenuId(openMenuId === r.id ? null : r.id)} className="h-8 w-8 rounded-lg border border-neutral-gray-light bg-white hover:bg-neutral-bg-light inline-flex items-center justify-center cursor-pointer">
                        <MoreVertical className="h-4 w-4 text-neutral-gray-dark" />
                      </button>
                      {openMenuId === r.id && (
                        <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-neutral-gray-light rounded-xl shadow-lg py-1 z-10">
                          <button onClick={() => { setSelected(r); setOpenMenuId(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs hover:bg-neutral-bg-light cursor-pointer"><Eye className="h-3.5 w-3.5" /> View</button>
                          <button onClick={() => { updateStatus(r.id, 'Published'); setOpenMenuId(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-emerald-700 hover:bg-emerald-50 cursor-pointer"><CheckCircle className="h-3.5 w-3.5" /> Approve</button>
                          <button onClick={() => { updateStatus(r.id, 'Rejected'); setOpenMenuId(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50 cursor-pointer"><XCircle className="h-3.5 w-3.5" /> Reject</button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-t border-neutral-gray-light text-xs text-neutral-gray-medium">
          <span>Showing {(page - 1) * perPage + 1} to {Math.min(page * perPage, filtered.length)} of {filtered.length} submissions</span>
          <div className="flex items-center gap-1">
            <button disabled={page === 1} onClick={() => setPage((p) => p - 1)} className="h-7 w-7 rounded border border-neutral-gray-light grid place-items-center disabled:opacity-40 cursor-pointer">‹</button>
            {Array.from({ length: totalPages }).slice(0, 5).map((_, i) => (
              <button key={i} onClick={() => setPage(i + 1)} className={`h-7 w-7 rounded text-xs font-semibold cursor-pointer ${page === i + 1 ? 'bg-[#453DD8] text-white' : 'border border-neutral-gray-light bg-white'}`}>{i + 1}</button>
            ))}
            {totalPages > 5 && <span className="px-1">…</span>}
            {totalPages > 5 && <button onClick={() => setPage(totalPages)} className={`h-7 w-7 rounded text-xs font-semibold cursor-pointer ${page === totalPages ? 'bg-[#453DD8] text-white' : 'border border-neutral-gray-light'}`}>{totalPages}</button>}
            <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)} className="h-7 w-7 rounded border border-neutral-gray-light grid place-items-center disabled:opacity-40 cursor-pointer">›</button>
            <span className="ml-2 px-2 py-1 rounded border border-neutral-gray-light bg-white">{perPage} / page</span>
          </div>
        </div>
      </div>

      <SubmissionDetailModal submission={selected} open={!!selected} onClose={() => setSelected(null)} onApprove={(id) => updateStatus(id, 'Published')} onReject={(id) => updateStatus(id, 'Rejected')} />
    </div>
  );
}

function StatCard({ label, value, change, positive, icon, iconBg }: { label: string; value: number; change: string; positive: boolean; icon: React.ReactNode; iconBg: string }) {
  return (
    <div className="bg-white rounded-xl border border-neutral-gray-light p-4 flex flex-col">
      <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${iconBg} text-xs shrink-0`}>{icon}</div>
      <p className="text-2xl font-bold text-neutral-black mt-2">{value}</p>
      <p className="text-[11px] text-neutral-gray-medium">{label}</p>
      <p className={`text-[11px] font-medium mt-1 ${positive ? 'text-emerald-600' : 'text-red-500'}`}>{change}</p>
    </div>
  );
}
