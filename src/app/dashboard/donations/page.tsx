'use client';

import Link from 'next/link';
import { Briefcase, CalendarDays, GraduationCap, HandHeart, Microscope, ReceiptText, X } from 'lucide-react';
import { useMemo, useState } from 'react';

const donations = [
  {
    id: 'DON-2026-001',
    program: 'Career Support',
    description: "Financial head-start support for Africa's top graduating tertiary students entering their chosen career paths.",
    amount: 1250,
    currency: 'USD',
    date: '2026-04-12',
    year: '2026',
    status: 'Completed',
    method: 'Paystack',
    icon: Briefcase,
    cardClass: 'bg-emerald-200/30 border-emerald-400',
    iconBgClass: 'bg-emerald-50',
    iconTextClass: 'text-emerald-700',
  },
  {
    id: 'DON-2025-014',
    program: 'Research Support',
    description: 'Financial aid for African researchers accessing materials and equipment for scientific and technological studies.',
    amount: 2500,
    currency: 'USD',
    date: '2025-11-03',
    year: '2025',
    status: 'Completed',
    method: 'Paystack',
    icon: Microscope,
    cardClass: 'bg-sky-200/30 border-sky-400',
    iconBgClass: 'bg-sky-50',
    iconTextClass: 'text-sky-700',
  },
  {
    id: 'DON-2024-027',
    program: 'Educational Scholarships (Tertiary)',
    description: 'Scholarship support for African tertiary students completing science and technology related programs.',
    amount: 3150,
    currency: 'USD',
    date: '2024-08-19',
    year: '2024',
    status: 'Completed',
    method: 'Paystack',
    icon: GraduationCap,
    cardClass: 'bg-amber-200/30 border-amber-400',
    iconBgClass: 'bg-amber-50',
    iconTextClass: 'text-amber-700',
  },
];

type Donation = (typeof donations)[number];

export default function DashboardDonationsPage() {
  const [programFilter, setProgramFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);

  const programs = useMemo(() => ['all', ...new Set(donations.map((donation) => donation.program))], []);
  const years = useMemo(() => ['all', ...new Set(donations.map((donation) => donation.year))], []);

  const filteredDonations = donations.filter((donation) => {
    const matchesProgram = programFilter === 'all' || donation.program === programFilter;
    const matchesYear = yearFilter === 'all' || donation.year === yearFilter;

    return matchesProgram && matchesYear;
  });

  const totalDonated = filteredDonations.reduce((total, donation) => total + donation.amount, 0);

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-950 lg:text-2xl">Donations</h1>
          <p className="mt-1 text-xs text-gray-400 lg:text-sm">
            Track previous donations and review program support history.
          </p>
        </div>
        <Link
          href="/support/donate"
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md bg-red-500 px-4 py-3 text-sm font-semibold text-white hover:bg-red-600"
        >
          <HandHeart size={16} />
          <span>Make Donations</span>
        </Link>
      </div>

      <div className="mb-6 grid gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 lg:grid-cols-[1fr_1fr_auto] lg:items-end">
        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-500">Programs</span>
          <select
            value={programFilter}
            onChange={(event) => setProgramFilter(event.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm font-medium text-gray-800 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-100"
          >
            {programs.map((program) => (
              <option key={program} value={program}>
                {program === 'all' ? 'All programs' : program}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-500">Years</span>
          <select
            value={yearFilter}
            onChange={(event) => setYearFilter(event.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm font-medium text-gray-800 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-100"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year === 'all' ? 'All years' : year}
              </option>
            ))}
          </select>
        </label>

        <div className="rounded-lg bg-white px-4 py-3 text-sm shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Filtered Total</p>
          <p className="mt-1 text-lg font-black text-gray-950">${totalDonated.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {filteredDonations.map((donation) => {
          const Icon = donation.icon;

          return (
            <article
              key={donation.id}
              className={`${donation.cardClass} flex flex-col rounded-3xl border-2 p-6 transition-shadow hover:shadow-md`}
            >
              <div className="mb-5 flex flex-col lg:flex-row items-start gap-4">
                <div className={`rounded-xl p-3 ${donation.iconBgClass}`}>
                  <Icon className={`h-6 w-6 ${donation.iconTextClass}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
                    <h2 className="text-base font-bold text-gray-950">{donation.program}</h2>
                    <span className="w-fit rounded-full bg-white px-3 py-1 text-[10px] font-bold text-green-700">
                      {donation.status}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-gray-500">{donation.description}</p>
                </div>
              </div>

              <div className="mt-auto space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-center gap-3 text-sm">
                  <div className="rounded-xl bg-white/70 p-3">
                    <p className="text-xs font-semibold text-gray-400">Amount</p>
                    <p className="mt-1 font-black text-gray-950">
                      {donation.currency} {donation.amount.toLocaleString()}
                    </p>
                  </div>
                  <div className="rounded-xl bg-white/70 p-3">
                    <p className="text-xs font-semibold text-gray-400">Date</p>
                    <p className="mt-1 font-bold text-gray-950">{donation.date}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedDonation(donation)}
                  className="w-full cursor-pointer rounded-lg border border-gray-200 bg-white py-3 text-sm font-semibold text-black transition-colors hover:border-gray-400 hover:bg-gray-100 text-start lg:text-center px-3 lg:px-0"
                >
                  View details
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {filteredDonations.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
          <p className="text-sm font-semibold text-gray-600">No donations match these filters.</p>
        </div>
      ) : null}

      {selectedDonation ? (
        <DonationDetailsModal donation={selectedDonation} onClose={() => setSelectedDonation(null)} />
      ) : null}
    </section>
  );
}

function DonationDetailsModal({
  donation,
  onClose,
}: {
  donation: Donation;
  onClose: () => void;
}) {
  const Icon = donation.icon;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 px-4 py-6 overflow-y-auto">
      <div className="mx-auto max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-gray-200 px-6 py-5">
          <div className="flex items-start gap-4">
            <div className={`rounded-xl p-3 ${donation.iconBgClass}`}>
              <Icon className={`h-6 w-6 ${donation.iconTextClass}`} />
            </div>
            <div>
              <h2 className="text-lg font-black text-gray-950">Donation Details</h2>
              <p className="mt-1 text-sm text-gray-500">{donation.program}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close donation details"
            className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-5 px-6 py-6">
          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Donation</p>
            <p className="mt-2 text-2xl font-black text-gray-950">
              {donation.currency} {donation.amount.toLocaleString()}
            </p>
          </div>

          <p className="text-sm leading-relaxed text-gray-600">{donation.description}</p>

          <div className="grid gap-3 text-sm sm:grid-cols-2">
            <Detail label="Donation ID" value={donation.id} icon={ReceiptText} />
            <Detail label="Date" value={donation.date} icon={CalendarDays} />
            <Detail label="Payment Method" value={donation.method} icon={HandHeart} />
            <Detail label="Status" value={donation.status} icon={ReceiptText} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Detail({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: typeof ReceiptText;
}) {
  return (
    <div className="rounded-xl border border-gray-200 p-4">
      <div className="mb-2 flex items-center gap-2 text-gray-400">
        <Icon size={15} />
        <span className="text-xs font-bold uppercase tracking-wide">{label}</span>
      </div>
      <p className="font-semibold text-gray-900">{value}</p>
    </div>
  );
}
