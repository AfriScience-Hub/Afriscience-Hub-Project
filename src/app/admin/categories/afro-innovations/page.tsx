'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Lightbulb, MoreHorizontal, ArrowRight,
  LayoutGrid, Settings2, Inbox,
  Eye, Clock, CheckCircle, XCircle, Share2,
} from 'lucide-react';
import { DonutCard, ListCard, EmptyState, GrowthChart, StatSkeleton, ChartSkeleton, ListSkeleton } from './components/OverviewWidgets';
import { fetchAdminInnovations, mapAdminInnovation } from './api';

const COLORS = [
  '#453DD8', '#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316', '#6366F1',
];

function computeSlices(items: any[], getKey: (item: any) => string | string[]): { name: string; percent: string; count: number; color: string }[] {
  const counts: Record<string, number> = {};
  items.forEach((item: any) => {
    const rawKey = getKey(item);
    const keys: string[] = Array.isArray(rawKey) ? rawKey : [rawKey];
    keys.forEach((k: string) => {
      const name = String(k).trim();
      if (name) counts[name] = (counts[name] || 0) + 1;
    });
  });
  const total = Object.values(counts).reduce((a: number, b: number) => a + b, 0);
  return Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .map(([name, count], i: number) => ({
      name,
      percent: total > 0 ? ((count / total) * 100).toFixed(1) : '0',
      count,
      color: COLORS[i % COLORS.length],
    }));
}

function computeGrowth(items: any[]): { label: string; value: number }[] {
  const monthly: Record<string, number> = {};
  items.forEach(item => {
    const date = new Date(item.submittedOn || item.createdAt || '');
    if (!isNaN(date.getTime())) {
      const label = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      monthly[label] = (monthly[label] || 0) + 1;
    }
  });
  return Object.entries(monthly)
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .map(([label, value]) => ({ label, value }));
}

export default function AfroInnovationsPage() {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const raw = await fetchAdminInnovations();
        if (!cancelled) setRecords(raw.map(mapAdminInnovation));
      } catch {
        /* error toast is shown on the list pages; keep silent here */
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const total = records.length;
  const pending = records.filter((r: any) => r.status === 'Pending Review').length;
  const approved = records.filter((r: any) => r.status === 'Published').length;
  const rejected = records.filter((r: any) => r.status === 'Rejected').length;

  const stats = [
    { label: 'Total Innovations', value: loading ? '…' : String(total), change: '', positive: true, iconBg: 'bg-purple-100 text-purple-600', icon: 'lightbulb' },
    { label: 'Pending Approval', value: loading ? '…' : String(pending), change: '', positive: false, iconBg: 'bg-orange-100 text-orange-600', icon: 'clock' },
    { label: 'Approved', value: loading ? '…' : String(approved), change: '', positive: true, iconBg: 'bg-green-100 text-green-600', icon: 'check' },
    { label: 'Rejected', value: loading ? '…' : String(rejected), change: '', positive: false, iconBg: 'bg-red-100 text-red-600', icon: 'x' },
    { label: 'Total Views', value: '—', change: 'No data yet', positive: true, iconBg: 'bg-blue-100 text-blue-600', icon: 'eye' },
    { label: 'Total Shares', value: '—', change: 'No data yet', positive: true, iconBg: 'bg-teal-100 text-teal-600', icon: 'share' },
  ];

  const pendingList = records.filter((r: any) => r.status === 'Pending Review').slice(0, 5);
  const rejectedList = records.filter((r: any) => r.status === 'Rejected').slice(0, 5);
  const recentList = records.filter((r: any) => r.status === 'Published').slice(0, 5);

  const categorySlices = computeSlices(records, r => r.innovation?.field || '');
  const stageSlices = computeSlices(records, r => r.innovation?.stage || '');
  const interestSlices = computeSlices(records, r => r.innovation?.interests || []);
  const ownershipSlices = computeSlices(records, r => r.innovation?.ownership || '');
  const countrySlices = computeSlices(records, r => r.innovation?.country || '');
  const growthData = computeGrowth(records);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-gray-medium mb-4">
            <span>Dashboard</span><span>/</span><span>Categories</span><span>/</span>
            <span className="text-neutral-black font-medium">Afro Innovations</span>
          </div>
          <h1 className="text-xl font-bold text-neutral-black flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-purple-600" />
            Afro Innovations
          </h1>
          <p className="text-[11px] text-neutral-gray-dark mt-0.5">Discover, manage and promote innovative solutions from across Africa that are solving real problems and driving impact.</p>
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
              <Link
                href="/admin/categories/afro-innovations/all"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-3.5 py-2.5 hover:bg-neutral-bg-light cursor-pointer"
              >
                <span className="h-8 w-8 rounded-lg bg-[#453DD8]/10 flex items-center justify-center shrink-0"><LayoutGrid className="h-4 w-4 text-[#453DD8]" /></span>
                <span className="text-xs font-semibold text-neutral-black">All Innovations</span>
              </Link>
              <Link
                href="/admin/categories/afro-innovations/manage-options"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-3.5 py-2.5 hover:bg-neutral-bg-light cursor-pointer"
              >
                <span className="h-8 w-8 rounded-lg bg-[#453DD8]/10 flex items-center justify-center shrink-0"><Settings2 className="h-4 w-4 text-[#453DD8]" /></span>
                <span className="text-xs font-semibold text-neutral-black">Manage Options</span>
              </Link>
              <Link
                href="/admin/categories/afro-innovations/submissions"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-3.5 py-2.5 hover:bg-neutral-bg-light cursor-pointer"
              >
                <span className="h-8 w-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0"><Inbox className="h-4 w-4 text-emerald-600" /></span>
                <span className="text-xs font-semibold text-neutral-black">View Submissions</span>
              </Link>
              <Link
                href="/admin/categories/afro-innovations/create"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-3.5 py-2.5 hover:bg-neutral-bg-light cursor-pointer"
              >
                <span className="h-8 w-8 rounded-lg bg-purple-50 flex items-center justify-center shrink-0"><Lightbulb className="h-4 w-4 text-purple-600" /></span>
                <span className="text-xs font-semibold text-neutral-black">Create Innovation</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {loading ? (
          <>
            <StatSkeleton />
            <StatSkeleton />
            <StatSkeleton />
            <StatSkeleton />
            <StatSkeleton />
            <StatSkeleton />
          </>
        ) : (
          stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-lg border border-neutral-gray-light p-3">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center ${stat.iconBg}`}>
                {stat.icon === 'lightbulb' && <Lightbulb className="h-3.5 w-3.5" />}
                {stat.icon === 'clock' && <Clock className="h-3.5 w-3.5" />}
                {stat.icon === 'check' && <CheckCircle className="h-3.5 w-3.5" />}
                {stat.icon === 'x' && <XCircle className="h-3.5 w-3.5" />}
                {stat.icon === 'eye' && <Eye className="h-3.5 w-3.5" />}
                {stat.icon === 'share' && <Share2 className="h-3.5 w-3.5" />}
              </div>
              <p className="text-lg font-bold text-neutral-black mt-1.5">{stat.value}</p>
              <p className="text-[10px] text-neutral-gray-medium mt-0.5">{stat.label}</p>
              {stat.change && (
                <p className={`text-[10px] mt-0.5 ${stat.positive ? 'text-green-600' : 'text-red-500'}`}>{stat.change}</p>
              )}
            </div>
          ))
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <>
            <ChartSkeleton />
            <ChartSkeleton />
            <ChartSkeleton />
            <ChartSkeleton />
            <ChartSkeleton />
            <ChartSkeleton />
          </>
        ) : (
          <>
            <div className="bg-white rounded-lg border border-neutral-gray-light p-4">
              <h3 className="text-xs font-semibold text-neutral-black mb-3">Innovations Growth</h3>
              <GrowthChart data={growthData} />
            </div>
            <DonutCard title="Innovations by Category" total={categorySlices.length} slices={categorySlices} />
            <DonutCard title="Innovations by Stage" total={stageSlices.length} slices={stageSlices} />
            <DonutCard title="Innovations by Interest" total={interestSlices.length} slices={interestSlices} />
            <DonutCard title="Innovations by Ownership" total={ownershipSlices.length} slices={ownershipSlices} />
            <DonutCard title="Innovations by Country" total={countrySlices.length} slices={countrySlices} />
          </>
        )}
      </div>

      {/* Lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ListCard title="Pending Approvals" viewHref="/admin/categories/afro-innovations/submissions">
          {loading ? (
            <ListSkeleton />
          ) : pendingList.length === 0 ? (
            <EmptyState message="No pending submissions." />
          ) : (
            pendingList.map((r: any) => (
              <div key={r.id} className="flex items-center gap-2.5 my-3">
                {r.innovation.logo && (
                  <Image src={r.innovation.logo} alt={r.innovation.name} width={32} height={32} className="rounded-full object-cover shrink-0 h-8 w-8" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-medium text-neutral-black truncate">{r.innovation.name}</p>
                  <p className="text-[9px] text-neutral-gray-medium">{r.innovation.description}</p>
                  <p className="text-[9px] text-neutral-gray-medium">Submitted: {r.submittedOn}</p>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[8px] font-semibold bg-orange-100 text-orange-700 flex-shrink-0">Pending</span>
              </div>
            ))
          )}
        </ListCard>

        <ListCard title="Recently Added" viewHref="/admin/categories/afro-innovations/all">
          {loading ? (
            <ListSkeleton />
          ) : recentList.length === 0 ? (
            <EmptyState message="No approved innovations yet." />
          ) : (
            recentList.map((r: any) => (
              <div key={r.id} className="flex items-center gap-2.5 my-3">
                {r.innovation.logo && (
                  <Image src={r.innovation.logo} alt={r.innovation.name} width={32} height={32} className="rounded-full object-cover shrink-0 h-8 w-8" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-medium text-neutral-black truncate">{r.innovation.name}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[9px] text-neutral-gray-medium">{r.innovation.stage}</span>
                    <span className="text-[9px] text-neutral-gray-medium">·</span>
                    <span className="text-[9px] text-neutral-gray-medium">{r.submittedOn}</span>
                  </div>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[8px] font-semibold bg-green-100 text-green-700 flex-shrink-0">Approved</span>
              </div>
            ))
          )}
        </ListCard>

        <ListCard title="Top Viewed Innovations" viewHref="/admin/categories/afro-innovations/all">
          {loading ? (
            <ListSkeleton />
          ) : (
            <EmptyState />
          )}
        </ListCard>

        <ListCard title="New Submissions" viewHref="/admin/categories/afro-innovations/submissions">
          {loading ? (
            <ListSkeleton />
          ) : pendingList.length === 0 ? (
            <EmptyState message="No new submissions." />
          ) : (
            pendingList.map((r: any) => (
              <div key={r.id} className="flex items-start gap-2.5 my-3">
                {r.innovation.logo && (
                  <Image src={r.innovation.logo} alt={r.innovation.name} width={32} height={32} className="rounded-full object-cover shrink-0 h-8 w-8" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-medium text-neutral-black truncate">{r.innovation.name}</p>
                  <p className="text-[9px] text-neutral-gray-medium">{r.innovation.description}</p>
                </div>
                <span className="flex items-center gap-1 text-[9px] text-neutral-gray-medium flex-shrink-0">
                  <Clock className="h-3 w-3" />{r.submittedOn}
                </span>
              </div>
            ))
          )}
        </ListCard>

        <ListCard title="Rejected Innovations" viewHref="/admin/categories/afro-innovations/submissions">
          {loading ? (
            <ListSkeleton />
          ) : rejectedList.length === 0 ? (
            <EmptyState message="No rejected innovations." />
          ) : (
            rejectedList.map((r: any) => (
              <div key={r.id} className="flex items-start gap-2.5 my-3">
                {r.innovation.logo && (
                  <Image src={r.innovation.logo} alt={r.innovation.name} width={32} height={32} className="rounded-full object-cover shrink-0 h-8 w-8" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-medium text-neutral-black truncate">{r.innovation.name}</p>
                  <p className="text-[9px] text-neutral-gray-medium truncate">{r.reasonForRejection || 'No reason provided.'}</p>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[8px] font-semibold bg-red-100 text-red-700 flex-shrink-0">Rejected</span>
              </div>
            ))
          )}
        </ListCard>

        <ListCard title="Top Shared Innovations" viewHref="/admin/categories/afro-innovations/all">
          {loading ? (
            <ListSkeleton />
          ) : (
            <EmptyState />
          )}
        </ListCard>
      </div>
    </div>
  );
}
