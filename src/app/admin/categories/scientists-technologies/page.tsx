'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Users, MoreHorizontal, LayoutGrid, Settings2, Inbox, Plus,
  Clock, CheckCircle, XCircle,
} from 'lucide-react';
import { DonutCard, type Slice } from '../afro-innovations/components/OverviewWidgets';
import {
  ADMIN_SCIENTISTS, SCIENTIST_STATS, SCIENTIST_TRENDS,
  FIELD_COUNTS, DEGREE_COUNTS, COUNTRY_COUNTS, SCIENTIST_REGISTRATION_TREND,
} from './data';
import ScientistRegistrationTrend from './components/ScientistRegistrationTrend';
import ScientistListCard from './components/ScientistListCard';

const SLICE_COLORS = ['#453DD8', '#3B82F6', '#22C55E', '#F59E0B', '#EC4899', '#06B6D4', '#8B5CF6', '#94A3B8'];

const STATUS_COLORS: Record<string, string> = {
  Published: '#3B82F6',
  'Pending Review': '#F59E0B',
  Rejected: '#EF4444',
};

const percentOf = (count: number, total: number) =>
  total > 0 ? ((count / total) * 100).toFixed(1) : '0';

const STATUS_SLICES: Slice[] = (['Published', 'Pending Review', 'Rejected'] as const).map((name) => {
  const count = SCIENTIST_STATS[name === 'Published' ? 'published' : name === 'Pending Review' ? 'pending' : 'rejected'];
  return { name, count, percent: percentOf(count, SCIENTIST_STATS.total), color: STATUS_COLORS[name] };
});

function countSlices(counts: Record<string, number>, total: number): Slice[] {
  return Object.entries(counts).map(([name, count], idx) => ({
    name,
    count,
    percent: percentOf(count, total),
    color: SLICE_COLORS[idx % SLICE_COLORS.length],
  }));
}

export default function ScientistsAdminPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const fieldSlices = countSlices(FIELD_COUNTS, SCIENTIST_STATS.total);
  const degreeSlices = countSlices(DEGREE_COUNTS, SCIENTIST_STATS.total);
  const countrySlices = countSlices(COUNTRY_COUNTS, SCIENTIST_STATS.total);

  const recent = ADMIN_SCIENTISTS.slice(0, 5).map((s) => ({
    name: s.name,
    meta: `${s.field} · ${s.country}`,
    value: s.submittedOn,
  }));
  const topRated = [...ADMIN_SCIENTISTS]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5)
    .map((s) => ({ name: s.name, meta: `${s.field} · ${s.country}`, value: `${s.rating.toFixed(1)} ★` }));
  const topBooked = [...ADMIN_SCIENTISTS]
    .sort((a, b) => b.bookings - a.bookings)
    .slice(0, 5)
    .map((s) => ({ name: s.name, meta: `${s.field} · ${s.country}`, value: s.bookings.toLocaleString() }));

  const newSubmissions = [...ADMIN_SCIENTISTS]
    .sort((a, b) => b.submittedOn.localeCompare(a.submittedOn))
    .slice(0, 5)
    .map((s) => ({ name: s.name, meta: `${s.field} · ${s.country}`, value: s.submittedOn }));
  const pending = ADMIN_SCIENTISTS.filter((s) => s.status === 'Pending Review').map((s) => ({
    name: s.name,
    meta: `${s.field} · ${s.country}`,
    value: s.submittedOn,
  }));
  const rejected = ADMIN_SCIENTISTS.filter((s) => s.status === 'Rejected').map((s) => ({
    name: s.name,
    meta: `${s.field} · ${s.country}`,
    value: s.submittedOn,
  }));

  const stats = [
    { label: 'Total Scientists', value: SCIENTIST_STATS.total, ...SCIENTIST_TRENDS.total, iconBg: 'bg-purple-100 text-purple-600', icon: <Users className="h-4 w-4" /> },
    { label: 'Published', value: SCIENTIST_STATS.published, ...SCIENTIST_TRENDS.published, iconBg: 'bg-green-100 text-green-600', icon: <CheckCircle className="h-4 w-4" /> },
    { label: 'Pending Review', value: SCIENTIST_STATS.pending, ...SCIENTIST_TRENDS.pending, iconBg: 'bg-amber-100 text-amber-600', icon: <Clock className="h-4 w-4" /> },
    { label: 'Rejected', value: SCIENTIST_STATS.rejected, ...SCIENTIST_TRENDS.rejected, iconBg: 'bg-red-100 text-red-600', icon: <XCircle className="h-4 w-4" /> },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-gray-medium mb-4">
            <span>Dashboard</span><span>/</span><span>Categories</span><span>/</span>
            <span className="text-neutral-black font-medium">Scientists &amp; Technologists</span>
          </div>
          <h1 className="text-xl font-bold text-neutral-black flex items-center gap-2">
            <span className="h-9 w-9 rounded-xl bg-purple-100 text-purple-600 grid place-items-center">
              <Users className="h-5 w-5" />
            </span>
            Scientists &amp; Technologists
          </h1>
          <p className="text-[11px] text-neutral-gray-dark mt-1">
            Overview of scientists and technologists across the AfriScience ecosystem.
          </p>
        </div>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="h-9 w-9 inline-flex items-center justify-center rounded-xl bg-white border border-neutral-gray-light shadow-sm hover:bg-neutral-bg-light cursor-pointer"
            aria-label="More actions"
          >
            <MoreHorizontal className="h-5 w-5 text-neutral-gray-dark" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-neutral-gray-light rounded-xl shadow-xl py-1.5 z-50 overflow-hidden">
              <Link href="/admin/categories/scientists-technologies/all" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-3.5 py-2.5 hover:bg-neutral-bg-light cursor-pointer">
                <span className="h-8 w-8 rounded-lg bg-[#453DD8]/10 flex items-center justify-center shrink-0"><LayoutGrid className="h-4 w-4 text-[#453DD8]" /></span>
                <span className="text-xs font-semibold text-neutral-black">All Scientists</span>
              </Link>
              <Link href="/admin/categories/scientists-technologies/manage-options" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-3.5 py-2.5 hover:bg-neutral-bg-light cursor-pointer">
                <span className="h-8 w-8 rounded-lg bg-[#453DD8]/10 flex items-center justify-center shrink-0"><Settings2 className="h-4 w-4 text-[#453DD8]" /></span>
                <span className="text-xs font-semibold text-neutral-black">Manage Options</span>
              </Link>
              <Link href="/admin/categories/scientists-technologies/submissions" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-3.5 py-2.5 hover:bg-neutral-bg-light cursor-pointer">
                <span className="h-8 w-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0"><Inbox className="h-4 w-4 text-emerald-600" /></span>
                <span className="text-xs font-semibold text-neutral-black">View Submissions</span>
              </Link>
              <Link href="/admin/categories/scientists-technologies/create" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-3.5 py-2.5 hover:bg-neutral-bg-light cursor-pointer">
                <span className="h-8 w-8 rounded-lg bg-purple-50 flex items-center justify-center shrink-0"><Plus className="h-4 w-4 text-purple-600" /></span>
                <span className="text-xs font-semibold text-neutral-black">Create Scientist</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-neutral-gray-light p-5">
            <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${stat.iconBg}`}>{stat.icon}</div>
            <p className="text-2xl font-bold text-neutral-black mt-3">{stat.value}</p>
            <p className="text-[11px] text-neutral-gray-medium mt-1">{stat.label}</p>
            <p className={`text-[11px] font-medium mt-1 ${stat.positive ? 'text-green-600' : 'text-red-500'}`}>
              {stat.change} <span className="text-neutral-gray-medium font-normal">vs previous period</span>
            </p>
          </div>
        ))}
      </div>

      <ScientistRegistrationTrend data={SCIENTIST_REGISTRATION_TREND} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <DonutCard title="Listings by Status" total={SCIENTIST_STATS.total} slices={STATUS_SLICES} />
        <DonutCard title="Scientists by Field" total={SCIENTIST_STATS.total} slices={fieldSlices} />
        <DonutCard title="Scientists by Degree" total={SCIENTIST_STATS.total} slices={degreeSlices} />
        <DonutCard title="Scientists by Country" total={SCIENTIST_STATS.total} slices={countrySlices} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <ScientistListCard title="Recently Added Scientists" viewHref="/admin/categories/scientists-technologies/all" rows={recent} valueLabel="Submitted" />
        <ScientistListCard title="Top Rated Scientists" viewHref="/admin/categories/scientists-technologies/all" rows={topRated} valueLabel="Rating" />
        <ScientistListCard title="Top Booked Scientists" viewHref="/admin/categories/scientists-technologies/all" rows={topBooked} valueLabel="Bookings" />
        <ScientistListCard title="New Submissions" viewHref="/admin/categories/scientists-technologies/submissions" rows={newSubmissions} valueLabel="Submitted" />
        <ScientistListCard title="Pending Approvals" viewHref="/admin/categories/scientists-technologies/submissions" rows={pending} valueLabel="Submitted" />
        <ScientistListCard title="Rejected Submissions" viewHref="/admin/categories/scientists-technologies/submissions" rows={rejected} valueLabel="Submitted" />
      </div>
    </div>
  );
}
