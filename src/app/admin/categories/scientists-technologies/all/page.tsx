'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft, Users, Search, MoreVertical, Eye,
  EyeOff, CheckCircle, BadgeCheck, Star, CalendarCheck,
} from 'lucide-react';
import TableActionMenu from '@/app/admin/components/TableActionMenu';
import { toast } from 'sonner';
import StatCard from '../../special-centres/components/StatCard';
import PagePagination from '../../special-centres/components/PagePagination';
import ScientistDetailModal from '../components/ScientistDetailModal';
import SubscriptionBadge from '../../afro-innovations/components/SubscriptionBadge';
import {
  ADMIN_SCIENTISTS, SCIENTIST_STATS, SCIENTIST_TRENDS,
  type AdminScientist, type Verification,
} from '../data';
import { SCIENTIST_FIELDS, SCIENTIST_DEGREES, SCIENTIST_SERVICES, PROFESSIONS_BY_FIELD } from '@/app/data/mockData';

type ViewTab = 'Live' | 'Updated';
type DisplayStatus = 'Live' | 'Unpublished' | 'Updated';

const VERIFICATION_OPTIONS = ['All Verification', 'Verified', 'Unverified'];

function displayStatus(r: AdminScientist): DisplayStatus {
  if (r.pendingUpdate) return 'Updated';
  return r.listingStatus === 'Published' ? 'Live' : 'Unpublished';
}

export default function AllScientistsPage() {
  const [records, setRecords] = useState<AdminScientist[]>(ADMIN_SCIENTISTS);
  const [view, setView] = useState<ViewTab>('Live');
  const [search, setSearch] = useState('');
  const [fieldFilter, setFieldFilter] = useState('All Fields');
  const [professionFilter, setProfessionFilter] = useState('All Professions');
  const [degreeFilter, setDegreeFilter] = useState('All Degrees');
  const [serviceFilter, setServiceFilter] = useState('All Services');
  const [countryFilter, setCountryFilter] = useState('All Countries');
  const [ratingFilter, setRatingFilter] = useState('All Ratings');
  const [verificationFilter, setVerificationFilter] = useState('All Verification');
  const [subscriptionFilter, setSubscriptionFilter] = useState('All Subscriptions');
  const [bookingFilter, setBookingFilter] = useState('All Bookings');
  const [selected, setSelected] = useState<AdminScientist | null>(null);
  const [page, setPage] = useState(1);
  const perPage = 8;

  const countries = useMemo(() => [...new Set(records.map((r) => r.country))].sort(), [records]);
  const professions = fieldFilter === 'All Fields'
    ? [...new Set(records.flatMap((r) => r.professions))].sort()
    : (PROFESSIONS_BY_FIELD[fieldFilter] || []);

  const liveRows = useMemo(
    () => records.filter((r) => r.listingStatus === 'Published' && !r.pendingUpdate),
    [records]
  );
  const updatedRows = useMemo(
    () => records.filter((r) => r.pendingUpdate && r.verification === 'Verified'),
    [records]
  );
  const viewRows = view === 'Live' ? liveRows : updatedRows;

  const filtered = useMemo(() => viewRows.filter((r) => {
    if (search && !`${r.name} ${r.title} ${r.field} ${r.professions.join(' ')} ${r.location}`.toLowerCase().includes(search.toLowerCase())) return false;
    if (fieldFilter !== 'All Fields' && r.field !== fieldFilter) return false;
    if (professionFilter !== 'All Professions' && !r.professions.includes(professionFilter)) return false;
    if (degreeFilter !== 'All Degrees' && !r.degrees.includes(degreeFilter)) return false;
    if (serviceFilter !== 'All Services' && !r.services.includes(serviceFilter)) return false;
    if (countryFilter !== 'All Countries' && r.country !== countryFilter) return false;
    if (ratingFilter === 'Top Rating' && r.rating < 4.5) return false;
    if (verificationFilter === 'Verified' && r.verification !== 'Verified') return false;
    if (verificationFilter === 'Unverified' && r.verification === 'Verified') return false;
    if (subscriptionFilter !== 'All Subscriptions' && r.subscription !== subscriptionFilter) return false;
    if (bookingFilter === '100+ Bookings' && r.bookings < 100) return false;
    if (bookingFilter === '50–99 Bookings' && (r.bookings < 50 || r.bookings >= 100)) return false;
    if (bookingFilter === 'Under 50 Bookings' && r.bookings >= 50) return false;
    return true;
  }), [viewRows, search, fieldFilter, professionFilter, degreeFilter, serviceFilter, countryFilter, ratingFilter, verificationFilter, subscriptionFilter, bookingFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const setStatus = (s: AdminScientist, status: 'Published' | 'Unpublished') => {
    setRecords((prev) => prev.map((r) => (
      r.id === s.id ? { ...r, listingStatus: status, pendingUpdate: false } : r
    )));
    setSelected(null);
    toast.success(status === 'Published' ? 'Listing published successfully' : 'Listing unpublished');
  };

  const toggleVerification = (s: AdminScientist) => {
    const next: Verification = s.verification === 'Verified' ? 'Unverified' : 'Verified';
    setRecords((prev) => prev.map((r) => (r.id === s.id ? { ...r, verification: next } : r)));
    setSelected(null);
    toast.success(next === 'Verified' ? 'Scientist verified' : 'Scientist unverified');
  };

  const stats = [
    { label: 'Total Scientists', value: SCIENTIST_STATS.total, ...SCIENTIST_TRENDS.total, iconBg: 'bg-purple-100 text-purple-600', icon: <Users className="h-4 w-4" /> },
    { label: 'Live', value: liveRows.length, ...SCIENTIST_TRENDS.published, iconBg: 'bg-green-100 text-green-600', icon: <CheckCircle className="h-4 w-4" /> },
    { label: 'Verified', value: records.filter((r) => r.verification === 'Verified').length, ...SCIENTIST_TRENDS.approved, iconBg: 'bg-blue-100 text-blue-600', icon: <BadgeCheck className="h-4 w-4" /> },
    { label: 'Updated', value: updatedRows.length, ...SCIENTIST_TRENDS.total, iconBg: 'bg-amber-100 text-amber-600', icon: <CalendarCheck className="h-4 w-4" /> },
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

      <div className="flex items-center gap-2 border-b border-neutral-gray-light">
        {(['Live', 'Updated'] as ViewTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => { setView(tab); setPage(1); }}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 cursor-pointer transition-colors ${
              view === tab ? 'border-[#453DD8] text-[#453DD8]' : 'border-transparent text-neutral-gray-medium hover:text-neutral-black'
            }`}
          >
            {tab} ({tab === 'Live' ? liveRows.length : updatedRows.length})
          </button>
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
        <select value={ratingFilter} onChange={(e) => { setRatingFilter(e.target.value); setPage(1); }} className="px-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs cursor-pointer outline-none">
          <option>All Ratings</option><option>Top Rating</option>
        </select>
        <select value={verificationFilter} onChange={(e) => { setVerificationFilter(e.target.value); setPage(1); }} className="px-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs cursor-pointer outline-none">
          {VERIFICATION_OPTIONS.map((v) => <option key={v}>{v}</option>)}
        </select>
        <select value={subscriptionFilter} onChange={(e) => { setSubscriptionFilter(e.target.value); setPage(1); }} className="px-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs cursor-pointer outline-none">
          <option>All Subscriptions</option><option>Pro Plan</option><option>Free Plan</option>
        </select>
        <select value={bookingFilter} onChange={(e) => { setBookingFilter(e.target.value); setPage(1); }} className="px-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs cursor-pointer outline-none">
          <option>All Bookings</option><option>100+ Bookings</option><option>50–99 Bookings</option><option>Under 50 Bookings</option>
        </select>
      </div>

      <div className="rounded-xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[1500px]">
            <thead>
              <tr className="border-b border-neutral-gray-light bg-neutral-bg-light/60">
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Scientist</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Field</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Profession</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Degree</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Subscription</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Rating</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Location</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Bookings</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Submitted On</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Status</th>
                <th className="text-right px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((r) => {
                const status = displayStatus(r);
                return (
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
                    <td className="px-3 py-3 text-xs text-neutral-gray-dark max-w-[160px]">
                      <p className="truncate">{r.professions[0]}</p>
                      {r.professions.length > 1 && <p className="text-[11px] text-neutral-gray-medium">+{r.professions.length - 1} more</p>}
                    </td>
                    <td className="px-3 py-3 text-xs text-neutral-gray-dark whitespace-nowrap">{r.degrees.join(', ') || '—'}</td>
                    <td className="px-3 py-3"><SubscriptionBadge payingUser={r.subscription === 'Pro Plan'} /></td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-black">
                        <Star className="h-3.5 w-3.5 text-amber-500 fill-current" /> {r.rating.toFixed(1)}
                      </span>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <p className="text-xs text-neutral-gray-dark">{r.country}</p>
                      <p className="text-[11px] text-neutral-gray-medium">{r.city}</p>
                    </td>
                    <td className="px-3 py-3 text-xs font-semibold text-neutral-black whitespace-nowrap">{r.bookings.toLocaleString()}</td>
                    <td className="px-3 py-3 text-xs text-neutral-gray-dark whitespace-nowrap">{r.submittedOn}<br /><span className="text-[11px] text-neutral-gray-medium">{r.submittedTime}</span></td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1.5">
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap ${
                          status === 'Live' ? 'bg-emerald-50 text-emerald-700'
                            : status === 'Updated' ? 'bg-amber-50 text-amber-700'
                              : 'bg-red-50 text-red-700'
                        }`}>{status}</span>
                        {r.verification === 'Verified' && (
                          <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap bg-blue-50 text-blue-700">Verified</span>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                      <TableActionMenu
                        triggerIcon={<MoreVertical className="h-4 w-4 text-neutral-gray-dark" />}
                        items={[
                          { label: 'View Details', icon: <Eye className="h-3.5 w-3.5" />, onClick: () => setSelected(r) },
                          {
                            label: r.verification === 'Verified' ? 'Unverify' : 'Verify',
                            icon: <BadgeCheck className="h-3.5 w-3.5" />,
                            onClick: () => toggleVerification(r),
                          },
                          ...(r.listingStatus === 'Published' && !r.pendingUpdate
                            ? [{ label: 'Unpublish', icon: <EyeOff className="h-3.5 w-3.5" />, onClick: () => setStatus(r, 'Unpublished'), danger: true }]
                            : [{ label: r.pendingUpdate ? 'Publish Update' : 'Publish', icon: <CheckCircle className="h-3.5 w-3.5" />, onClick: () => setStatus(r, 'Published') }]),
                        ]}
                      />
                    </td>
                  </tr>
                );
              })}
              {paginated.length === 0 && (
                <tr><td colSpan={11} className="px-3 py-10 text-center text-xs text-neutral-gray-medium">No scientists match these filters.</td></tr>
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
