'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Building2, MoreHorizontal, LayoutGrid, Settings2, Inbox, Plus,
  Clock, CheckCircle, XCircle, Globe,
} from 'lucide-react';
import { ListCard } from '../afro-innovations/components/OverviewWidgets';
import InstituteTypeSelectorModal, { type InstituteSubType } from '@/app/dashboard/components/InstituteTypeSelectorModal';
import {
  ADMIN_SCHOOLS, INSTITUTE_STATS, INSTITUTE_BY_TYPE, TOP_COUNTRIES,
} from './data';
import { ADMIN_UNIVERSITIES } from './universities-data';

/** One combined row for the pending / recently added lists. */
interface FeedRow {
  id: string;
  name: string;
  image: string;
  country: string;
  type: string;
  submittedOn: string;
  pending: boolean;
}

const percent = (count: number, total: number) =>
  total > 0 ? ((count / total) * 100).toFixed(1) : '0';

const maxCountry = Math.max(...TOP_COUNTRIES.map((c) => c.count));
const maxType = Math.max(...INSTITUTE_BY_TYPE.map((t) => t.count));

export default function InstitutesAdminPage() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const feed = useMemo<FeedRow[]>(() => {
    const rows: FeedRow[] = [
      ...ADMIN_SCHOOLS.map((s) => ({
        id: s.id, name: s.name, image: s.image, country: s.country,
        type: 'Primary & Secondary', submittedOn: s.submittedOn,
        pending: s.workflowStatus === 'Pending Review',
      })),
      ...ADMIN_UNIVERSITIES.map((u) => ({
        id: u.id, name: u.name, image: u.image, country: u.country,
        type: 'University', submittedOn: u.submittedOn,
        pending: u.workflowStatus === 'Pending Review',
      })),
    ];
    return rows;
  }, []);

  const pending = feed.filter((r) => r.pending).slice(0, 5);
  const recent = [...feed].reverse().slice(0, 5);

  const stats = [
    { label: 'Total Institutes', value: INSTITUTE_STATS.total, change: '+10%', positive: true, iconBg: 'bg-purple-100 text-purple-600', icon: <Building2 className="h-4 w-4" /> },
    { label: 'Pending Review', value: INSTITUTE_STATS.pending, change: '+5%', positive: true, iconBg: 'bg-amber-100 text-amber-600', icon: <Clock className="h-4 w-4" /> },
    { label: 'Published', value: INSTITUTE_STATS.published, change: '+15%', positive: true, iconBg: 'bg-green-100 text-green-600', icon: <CheckCircle className="h-4 w-4" /> },
    { label: 'Rejected', value: INSTITUTE_STATS.rejected, change: '−3%', positive: false, iconBg: 'bg-red-100 text-red-600', icon: <XCircle className="h-4 w-4" /> },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-gray-medium mb-4">
            <span>Dashboard</span><span>/</span><span>Categories</span><span>/</span>
            <span className="text-neutral-black font-medium">Institutes</span>
          </div>
          <h1 className="text-xl font-bold text-neutral-black flex items-center gap-2">
            <span className="h-9 w-9 rounded-xl bg-purple-100 text-purple-600 grid place-items-center">
              <Building2 className="h-5 w-5" />
            </span>
            Institutes
          </h1>
          <p className="text-[11px] text-neutral-gray-dark mt-1">
            Overview of primary &amp; secondary schools and universities on AfriScience Hub.
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
              <Link href="/admin/categories/institutes/all" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-3.5 py-2.5 hover:bg-neutral-bg-light cursor-pointer">
                <span className="h-8 w-8 rounded-lg bg-[#453DD8]/10 flex items-center justify-center shrink-0"><LayoutGrid className="h-4 w-4 text-[#453DD8]" /></span>
                <span className="text-xs font-semibold text-neutral-black">All Institutes</span>
              </Link>
              <Link href="/admin/categories/institutes/manage-options" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-3.5 py-2.5 hover:bg-neutral-bg-light cursor-pointer">
                <span className="h-8 w-8 rounded-lg bg-[#453DD8]/10 flex items-center justify-center shrink-0"><Settings2 className="h-4 w-4 text-[#453DD8]" /></span>
                <span className="text-xs font-semibold text-neutral-black">Manage Options</span>
              </Link>
              <Link href="/admin/categories/institutes/submissions" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-3.5 py-2.5 hover:bg-neutral-bg-light cursor-pointer">
                <span className="h-8 w-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0"><Inbox className="h-4 w-4 text-emerald-600" /></span>
                <span className="text-xs font-semibold text-neutral-black">View Submissions</span>
              </Link>
              <button
                type="button"
                onClick={() => { setMenuOpen(false); setCreateModalOpen(true); }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 hover:bg-neutral-bg-light cursor-pointer text-left"
              >
                <span className="h-8 w-8 rounded-lg bg-purple-50 flex items-center justify-center shrink-0"><Plus className="h-4 w-4 text-purple-600" /></span>
                <span className="text-xs font-semibold text-neutral-black">Create Institute</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <InstituteTypeSelectorModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSelectInstituteType={(t: InstituteSubType) => {
          setCreateModalOpen(false);
          router.push(`/admin/categories/institutes/create?type=${t}`);
        }}
        title="Select institute type"
        subtitle="Choose the type of institute you want to create"
      />

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
        <ListCard title="Pending approvals" viewHref="/admin/categories/institutes/submissions">
          {pending.length === 0 ? (
            <p className="text-xs text-neutral-gray-medium">No pending approvals.</p>
          ) : (
            <ul className="space-y-3">
              {pending.map((row) => (
                <li key={row.id} className="flex items-center gap-3">
                  <div className="relative h-9 w-9 rounded-lg overflow-hidden shrink-0 bg-brand-navy-900">
                    <Image src={row.image} alt={row.name} fill sizes="36px" className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-neutral-black truncate">{row.name}</p>
                    <p className="text-[11px] text-neutral-gray-medium">{row.type} · {row.country}</p>
                  </div>
                  <span className="text-[11px] text-neutral-gray-medium whitespace-nowrap">{row.submittedOn}</span>
                </li>
              ))}
            </ul>
          )}
        </ListCard>

        <ListCard title="Recently added" viewHref="/admin/categories/institutes/all">
          <ul className="space-y-3">
            {recent.map((row) => (
              <li key={row.id} className="flex items-center gap-3">
                <div className="relative h-9 w-9 rounded-lg overflow-hidden shrink-0 bg-brand-navy-900">
                  <Image src={row.image} alt={row.name} fill sizes="36px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-neutral-black truncate">{row.name}</p>
                  <p className="text-[11px] text-neutral-gray-medium">{row.type} · {row.country}</p>
                </div>
                <span className="text-[11px] text-neutral-gray-medium whitespace-nowrap">{row.submittedOn}</span>
              </li>
            ))}
          </ul>
        </ListCard>

        <div className="bg-white rounded-lg border border-neutral-gray-light p-6">
          <h3 className="text-xs font-semibold text-neutral-black mb-5">Institutes by type</h3>
          <div className="space-y-5">
            {INSTITUTE_BY_TYPE.map((t) => (
              <div key={t.name} className="flex items-center gap-4">
                <span className="w-36 shrink-0 text-[11px] text-neutral-gray-dark">{t.name}</span>
                <div className="flex-1 h-3 rounded-full bg-neutral-bg-light overflow-hidden">
                  <div className="h-3 rounded-full bg-[#453DD8]" style={{ width: `${(t.count / maxType) * 100}%` }} />
                </div>
                <span className="w-14 text-right text-[11px] font-semibold text-neutral-black">
                  {t.count} <span className="text-neutral-gray-medium font-normal">({percent(t.count, INSTITUTE_STATS.total)}%)</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-neutral-gray-light p-6">
          <h3 className="text-xs font-semibold text-neutral-black mb-5 flex items-center gap-1.5">
            <Globe className="h-3.5 w-3.5 text-neutral-gray-medium" /> Top countries
          </h3>
          <div className="space-y-5">
            {TOP_COUNTRIES.map((c) => (
              <div key={c.name} className="flex items-center gap-4">
                <span className="w-36 shrink-0 text-[11px] text-neutral-gray-dark">{c.name}</span>
                <div className="flex-1 h-3 rounded-full bg-neutral-bg-light overflow-hidden">
                  <div className="h-3 rounded-full bg-brand-navy-900" style={{ width: `${(c.count / maxCountry) * 100}%` }} />
                </div>
                <span className="w-14 text-right text-[11px] font-semibold text-neutral-black">
                  {c.count} <span className="text-neutral-gray-medium font-normal">({percent(c.count, INSTITUTE_STATS.total)}%)</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
