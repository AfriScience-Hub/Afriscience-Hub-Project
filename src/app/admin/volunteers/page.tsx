'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Users2, Search, MoreVertical, Eye, CheckCircle, XCircle, Clock, Loader2, X, GraduationCap, MapPin, Gift } from 'lucide-react';
import TableActionMenu from '@/app/admin/components/TableActionMenu';
import { toast } from 'sonner';
import { fetchAdminVolunteers, mapAdminVolunteer } from './api';
import type { VolunteerRecord } from './data';

export default function VolunteersPage() {
  const [records, setRecords] = useState<VolunteerRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<VolunteerRecord | null>(null);
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const raw = await fetchAdminVolunteers();
        if (!cancelled) setRecords(raw.map(mapAdminVolunteer));
      } catch (e: any) {
        toast.error(e?.message || 'Failed to load volunteers');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const filtered = useMemo(() => {
    return records.filter((r) => {
      if (search && !`${r.country} ${r.state} ${r.qualification} ${r.tasks.join(' ')}`.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [records, search]);

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-neutral-black flex items-center gap-2"><Users2 className="h-5 w-5 text-purple-600" />Volunteer Applications</h1>
      <p className="text-xs text-neutral-gray-medium mt-1">Review and manage volunteer applications.</p>

      <div className="rounded-xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[1180px]">
            <thead>
              <tr className="border-b border-neutral-gray-light bg-neutral-bg-light/60">
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Volunteer</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Qualification</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Country / State</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Tasks</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Compensation</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Submitted On</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Status</th>
                <th className="text-right px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={8} className="p-8 text-center">
                    <Loader2 className="h-6 w-6 animate-spin text-brand-red-600 mx-auto mb-2" />
                    <p className="text-sm text-neutral-gray-medium">Loading volunteers&hellip;</p>
                  </td>
                </tr>
              )}
              {!loading && filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-8 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Users2 className="h-8 w-8 text-neutral-gray-medium mb-2" />
                      <p className="text-sm font-medium text-neutral-black">No volunteers yet</p>
                      <p className="text-xs text-neutral-gray-medium">Applications will appear here once submitted.</p>
                    </div>
                  </td>
                </tr>
              )}
              {!loading && filtered.length === 0 ? null : paginated.map((r) => (
                <tr key={r.id} onClick={() => setSelected(r)} className="border-b border-neutral-gray-light/60 last:border-0 hover:bg-neutral-bg-light/40 cursor-pointer">
                  <td className="px-3 py-2.5">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-neutral-black truncate">User ID: {r.userId}</p>
                      <p className="text-[11px] text-neutral-gray-medium truncate">Volunteer ID: {r.id.slice(0, 8)}...</p>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-xs text-neutral-gray-dark whitespace-nowrap">{r.qualification}</td>
                  <td className="px-3 py-2.5 text-xs text-neutral-gray-dark whitespace-nowrap">{r.country} / {r.state}</td>
                  <td className="px-3 py-2.5">
                    <div className="flex flex-wrap gap-1 max-w-[180px]">
                      {r.tasks.slice(0, 2).map((t) => <span key={t} className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-50 text-amber-700 whitespace-nowrap">{t}</span>)}
                      {r.tasks.length > 2 && <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-neutral-gray-light text-neutral-gray-medium">+{r.tasks.length - 2} more</span>}
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-xs text-neutral-gray-dark whitespace-nowrap">{r.compensations.join(', ')}</td>
                  <td className="px-3 py-2.5 text-xs text-neutral-gray-dark whitespace-nowrap">{r.submittedOn}<br /><span className="text-[11px] text-neutral-gray-medium">{r.submittedTime}</span></td>
                  <td className="px-3 py-2.5"><span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap ${r.status === 'Submitted' ? 'bg-amber-50 text-amber-700' : r.status === 'Approved' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>{r.status}</span></td>
                  <td className="px-3 py-2.5 text-right" onClick={(e) => e.stopPropagation()}>
                    <TableActionMenu
                      triggerIcon={<MoreVertical className="h-4 w-4 text-neutral-gray-dark" />}
                      items={[
                        { label: 'View Details', icon: <Eye className="h-3.5 w-3.5" />, onClick: () => setSelected(r) },
                      ]}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 py-3 border-t border-neutral-gray-light text-xs text-neutral-gray-medium">
          <span>Showing {filtered.length === 0 ? 0 : (page - 1) * perPage + 1} to {Math.min(page * perPage, filtered.length)} of {filtered.length} volunteers</span>
          <div className="flex items-center gap-1 flex-wrap">
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

      <VolunteerDetailModal volunteer={selected} open={!!selected} onClose={() => setSelected(null)} />
    </div>
  );
}

function VolunteerDetailModal({ volunteer, open, onClose }: { volunteer: any; open: boolean; onClose: () => void }) {
  if (!open || !volunteer) return null;

  const handleClose = () => onClose();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-8 flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 bg-white rounded-t-2xl border-b border-neutral-gray-light flex items-center justify-between gap-3 shrink-0">
          <div className="min-w-0">
            <h2 className="text-base font-bold text-neutral-black truncate">Volunteer Application Details</h2>
            <p className="text-xs text-neutral-gray-medium">Application ID: {volunteer.id}</p>
          </div>
          <button onClick={handleClose} className="h-9 w-9 rounded-full bg-neutral-bg-light hover:bg-neutral-gray-light flex items-center justify-center cursor-pointer">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Qualification" value={volunteer.qualification} icon={<GraduationCap className="h-4 w-4 text-blue-600" />} />
            <Field label="Country" value={volunteer.country} icon={<MapPin className="h-4 w-4 text-green-600" />} />
            <Field label="State/Region" value={volunteer.state} icon={<MapPin className="h-4 w-4 text-green-600" />} />
            <Field label="Compensation" value={volunteer.compensations.join(', ')} icon={<Gift className="h-4 w-4 text-amber-600" />} />
          </div>

          <div>
            <p className="text-[11px] font-semibold text-neutral-gray-medium uppercase mb-2">Tasks Selected</p>
            <div className="flex flex-wrap gap-1.5">
              {volunteer.tasks.map((t: string) => (
                <span key={t} className="px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-medium text-amber-700">{t}</span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold text-neutral-gray-medium uppercase mb-2">Compensation</p>
            <div className="flex flex-wrap gap-1.5">
              {volunteer.compensations.map((c: string) => (
                <span key={c} className="px-2.5 py-1 rounded-full bg-purple-50 border border-purple-200 text-xs font-medium text-purple-700">{c}</span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-gray-light">
            <p className="text-[11px] font-semibold text-neutral-gray-medium uppercase mb-2">Submitted On</p>
            <p className="text-sm text-neutral-black">{volunteer.submittedOn} {volunteer.submittedTime}</p>
          </div>
        </div>

        <div className="px-6 py-4 bg-white rounded-b-2xl border-t border-neutral-gray-light flex items-center justify-end shrink-0 gap-3">
          <button onClick={handleClose} className="px-4 py-2 rounded-xl border border-neutral-gray-light text-xs font-semibold hover:bg-neutral-bg-light cursor-pointer">Close</button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, icon }: { label: string; value?: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-neutral-gray-light p-4">
      <div className="flex items-center gap-2 text-xs font-semibold text-neutral-gray-medium uppercase mb-2">
        {icon}
        {label}
      </div>
      <p className="text-sm text-neutral-black break-words">{value || '—'}</p>
    </div>
  );
}