'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Microscope, MoreHorizontal, LayoutGrid, Settings2, Inbox, Plus,
  Clock, CheckCircle, XCircle,
} from 'lucide-react';
import { DonutCard, type Slice } from '../afro-innovations/components/OverviewWidgets';
import {
  ADMIN_CENTRES, CENTRE_STATS, CENTRE_TRENDS, FOCUS_AREA_COUNTS,
} from './data';

const STATUS_COLORS: Record<string, string> = {
  Published: '#3B82F6',
  'Pending Review': '#F59E0B',
  Rejected: '#EF4444',
};

function percentOf(count: number, total: number) {
  return total > 0 ? ((count / total) * 100).toFixed(1) : '0';
}

const STATUS_SLICES: Slice[] = (['Published', 'Pending Review', 'Rejected'] as const).map((name) => ({
  name,
  count: CENTRE_STATS[name === 'Published' ? 'published' : name === 'Pending Review' ? 'pending' : 'rejected'],
  percent: percentOf(
    CENTRE_STATS[name === 'Published' ? 'published' : name === 'Pending Review' ? 'pending' : 'rejected'],
    CENTRE_STATS.total,
  ),
  color: STATUS_COLORS[name],
}));

export default function SpecialCentresPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  // The overview only ever previews the five most recent listings.
  const recent = ADMIN_CENTRES.slice(0, 5);

  const focusMax = Math.max(...Object.values(FOCUS_AREA_COUNTS));

  const stats = [
    { label: 'Total Centers', value: CENTRE_STATS.total, ...CENTRE_TRENDS.total, iconBg: 'bg-purple-100 text-purple-600', icon: <Microscope className="h-4 w-4" /> },
    { label: 'Published', value: CENTRE_STATS.published, ...CENTRE_TRENDS.published, iconBg: 'bg-green-100 text-green-600', icon: <CheckCircle className="h-4 w-4" /> },
    { label: 'Pending Review', value: CENTRE_STATS.pending, ...CENTRE_TRENDS.pending, iconBg: 'bg-amber-100 text-amber-600', icon: <Clock className="h-4 w-4" /> },
    { label: 'Rejected', value: CENTRE_STATS.rejected, ...CENTRE_TRENDS.rejected, iconBg: 'bg-red-100 text-red-600', icon: <XCircle className="h-4 w-4" /> },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-gray-medium mb-4">
            <span>Dashboard</span><span>/</span><span>Categories</span><span>/</span>
            <span className="text-neutral-black font-medium">Special Centres</span>
          </div>
          <h1 className="text-xl font-bold text-neutral-black flex items-center gap-2">
            <span className="h-9 w-9 rounded-xl bg-purple-100 text-purple-600 grid place-items-center">
              <Microscope className="h-5 w-5" />
            </span>
            Specialist Centers
          </h1>
          <p className="text-[11px] text-neutral-gray-dark mt-1">
            Overview of specialist centres across the Afri-Science ecosystem.
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
              <Link href="/admin/categories/special-centres/all" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-3.5 py-2.5 hover:bg-neutral-bg-light cursor-pointer">
                <span className="h-8 w-8 rounded-lg bg-[#453DD8]/10 flex items-center justify-center shrink-0"><LayoutGrid className="h-4 w-4 text-[#453DD8]" /></span>
                <span className="text-xs font-semibold text-neutral-black">All Listings</span>
              </Link>
              <Link href="/admin/categories/special-centres/manage-options" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-3.5 py-2.5 hover:bg-neutral-bg-light cursor-pointer">
                <span className="h-8 w-8 rounded-lg bg-[#453DD8]/10 flex items-center justify-center shrink-0"><Settings2 className="h-4 w-4 text-[#453DD8]" /></span>
                <span className="text-xs font-semibold text-neutral-black">Manage Options</span>
              </Link>
              <Link href="/admin/categories/special-centres/submissions" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-3.5 py-2.5 hover:bg-neutral-bg-light cursor-pointer">
                <span className="h-8 w-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0"><Inbox className="h-4 w-4 text-emerald-600" /></span>
                <span className="text-xs font-semibold text-neutral-black">View Submissions</span>
              </Link>
              <Link href="/admin/categories/special-centres/create" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-3.5 py-2.5 hover:bg-neutral-bg-light cursor-pointer">
                <span className="h-8 w-8 rounded-lg bg-purple-50 flex items-center justify-center shrink-0"><Plus className="h-4 w-4 text-purple-600" /></span>
                <span className="text-xs font-semibold text-neutral-black">Add New Centre</span>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DonutCard title="Listings by Status" total={CENTRE_STATS.total} slices={STATUS_SLICES} />

        <div className="bg-white rounded-lg border border-neutral-gray-light p-6">
          <h3 className="text-xs font-semibold text-neutral-black mb-5">Centers by Focus Area</h3>
          <div className="space-y-5">
            {Object.entries(FOCUS_AREA_COUNTS).map(([area, count]) => (
              <div key={area} className="flex items-center gap-4">
                <span className="w-40 shrink-0 text-[11px] text-neutral-gray-dark">{area}</span>
                <div className="flex-1 h-3 rounded-full bg-neutral-bg-light overflow-hidden">
                  <div
                    className="h-3 rounded-full bg-[#453DD8]"
                    style={{ width: `${(count / focusMax) * 100}%` }}
                  />
                </div>
                <span className="w-8 text-right text-[11px] font-semibold text-neutral-black">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-neutral-gray-light p-6">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h3 className="text-sm font-bold text-neutral-black">Recent Specialist Center Listings</h3>
          <Link
            href="/admin/categories/special-centres/submissions"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#453DD8] text-white text-xs font-semibold hover:bg-[#3a33c0] cursor-pointer shrink-0"
          >
            View submissions
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="border-b border-neutral-gray-light">
                <th className="text-left px-3 py-3 text-xs font-semibold text-neutral-gray-medium">Center Name</th>
                <th className="text-left px-3 py-3 text-xs font-semibold text-neutral-gray-medium">Focus Area</th>
                <th className="text-left px-3 py-3 text-xs font-semibold text-neutral-gray-medium">Country</th>
                <th className="text-left px-3 py-3 text-xs font-semibold text-neutral-gray-medium">Submitted</th>
                <th className="text-left px-3 py-3 text-xs font-semibold text-neutral-gray-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((c) => (
                <tr key={c.id} className="border-b border-neutral-gray-light/60 last:border-0">
                  <td className="px-3 py-3.5">
                    <div className="flex gap-3 items-start max-w-[280px]">
                      <div className="relative h-9 w-9 rounded-lg overflow-hidden shrink-0 bg-brand-navy-900">
                        <Image src={c.image} alt={c.name} fill sizes="36px" className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-neutral-black truncate">{c.name}</p>
                        <p className="text-[11px] text-neutral-gray-medium line-clamp-2">{c.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3.5">
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-purple-50 text-purple-700 whitespace-nowrap">
                      {c.focusArea}
                    </span>
                  </td>
                  <td className="px-3 py-3.5 text-xs text-neutral-gray-dark whitespace-nowrap">{c.country}</td>
                  <td className="px-3 py-3.5 text-xs text-neutral-gray-dark whitespace-nowrap">{c.submittedOn}</td>
                  <td className="px-3 py-3.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap ${
                        c.status === 'Pending Review'
                          ? 'bg-amber-50 text-amber-700'
                          : c.status === 'Rejected'
                            ? 'bg-red-50 text-red-700'
                            : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
