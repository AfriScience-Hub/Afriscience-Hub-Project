'use client';

import { useMemo, useState } from 'react';
import { Search, ShieldCheck, Wallet } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { formatUsd, MOCK_PAYOUT_JOBS, type PayoutJob } from './data';
import PayoutCheckoutModal from './components/PayoutCheckoutModal';
import PayoutJobDetailModal from './components/PayoutJobDetailModal';
import PayoutSummaryCards from './components/PayoutSummaryCards';
import PayoutJobsTable from './components/PayoutJobsTable';

type FilterTab = 'all' | 'completed' | 'in_progress' | 'requested' | 'paid';

const FILTER_TABS: { id: FilterTab; label: string }[] = [
  { id: 'all', label: 'All Jobs' },
  { id: 'completed', label: 'Completed (Ready)' },
  { id: 'in_progress', label: 'In Progress' },
  { id: 'requested', label: 'Payout Requested' },
  { id: 'paid', label: 'Paid Out' },
];

export default function PayoutPage() {
  const [jobs, setJobs] = useState<PayoutJob[]>(MOCK_PAYOUT_JOBS);
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [search, setSearch] = useState('');
  const [checkoutJobs, setCheckoutJobs] = useState<PayoutJob[]>([]);
  const [detailJob, setDetailJob] = useState<PayoutJob | null>(null);

  const completedReadyJobs = useMemo(
    () => jobs.filter((j) => j.status === 'Completed'),
    [jobs],
  );
  const inProgressJobs = useMemo(
    () => jobs.filter((j) => j.status === 'In Progress'),
    [jobs],
  );
  const requestedJobs = useMemo(
    () => jobs.filter((j) => j.status === 'Payout Requested'),
    [jobs],
  );
  const paidOutJobs = useMemo(
    () => jobs.filter((j) => j.status === 'Paid Out'),
    [jobs],
  );

  const availableEscrowTotal = useMemo(
    () => completedReadyJobs.reduce((sum, j) => sum + j.total, 0),
    [completedReadyJobs],
  );
  const inProgressEscrowTotal = useMemo(
    () => inProgressJobs.reduce((sum, j) => sum + j.total, 0),
    [inProgressJobs],
  );
  const processingEscrowTotal = useMemo(
    () => requestedJobs.reduce((sum, j) => sum + j.total, 0),
    [requestedJobs],
  );
  const paidOutTotal = useMemo(
    () => paidOutJobs.reduce((sum, j) => sum + j.total, 0),
    [paidOutJobs],
  );

  const visibleJobs = useMemo(() => {
    return jobs.filter((job) => {
      if (activeTab === 'completed' && job.status !== 'Completed') return false;
      if (activeTab === 'in_progress' && job.status !== 'In Progress') return false;
      if (activeTab === 'requested' && job.status !== 'Payout Requested') return false;
      if (activeTab === 'paid' && job.status !== 'Paid Out') return false;
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        const hay = `${job.reference} ${job.jobTitle} ${job.listingName} ${job.clientName} ${job.listingCategory}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [jobs, activeTab, search]);

  const handleOpenCheckout = (targetJobs: PayoutJob[]) => {
    if (targetJobs.length === 0) return;
    setCheckoutJobs(targetJobs);
  };

  const handleConfirmCheckout = (destination: string) => {
    const ids = new Set(checkoutJobs.map((j) => j.id));
    const totalDisbursed = checkoutJobs.reduce((sum, j) => sum + j.total, 0);
    setJobs((prev) =>
      prev.map((job) =>
        ids.has(job.id)
          ? {
              ...job,
              status: 'Payout Requested',
              escrowNote: `Checkout notification sent to AfriScience Hub (${destination}). Processing escrow release.`,
            }
          : job,
      ),
    );
    setCheckoutJobs([]);
    toast.success(
      `Platform notified! Escrow payout of ${formatUsd(totalDisbursed)} to ${destination} has been initiated.`,
    );
  };

  const countForTab = (tab: FilterTab) => {
    if (tab === 'all') return jobs.length;
    if (tab === 'completed') return completedReadyJobs.length;
    if (tab === 'in_progress') return inProgressJobs.length;
    if (tab === 'requested') return requestedJobs.length;
    return paidOutJobs.length;
  };

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-red-50 text-brand-red-600">
            <Wallet className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-neutral-black">Payout &amp; Escrow</h2>
            <p className="mt-0.5 text-sm text-neutral-gray-medium">
              Track jobs in progress, completed service earnings held in escrow, and request payout checkout.
            </p>
          </div>
        </div>

        {/* Escrow Explanation Banner */}
        <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-brand-navy-900/15 bg-brand-navy-900/[0.03] px-4 py-3 text-xs text-neutral-gray-dark">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-navy-900" />
          <p className="leading-relaxed">
            <span className="font-semibold text-neutral-black">How Escrow Payout Works:</span>{' '}
            Client payments to service providers are securely held in escrow by AfriScience Hub while the job is being worked on. Once a job is marked <span className="font-semibold text-emerald-700">Completed</span>, use the action menu on that job and select <span className="font-semibold text-brand-red-600">Checkout</span> to notify the platform to release your funds.
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <PayoutSummaryCards
        readyTotal={availableEscrowTotal}
        readyCount={completedReadyJobs.length}
        inProgressTotal={inProgressEscrowTotal}
        inProgressCount={inProgressJobs.length}
        requestedTotal={processingEscrowTotal}
        requestedCount={requestedJobs.length}
        paidOutTotal={paidOutTotal}
        paidOutCount={paidOutJobs.length}
      />

      {/* Jobs Table Card */}
      <div className="overflow-hidden rounded-xl border border-neutral-gray-light bg-white shadow-sm">
        {/* Tabs & Search */}
        <div className="flex flex-col gap-3 border-b border-neutral-gray-light px-4 py-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex overflow-x-auto">
            {FILTER_TABS.map((tab) => {
              const active = activeTab === tab.id;
              const count = countForTab(tab.id);
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer',
                    active
                      ? 'border-brand-red-600 text-brand-red-600'
                      : 'border-transparent text-neutral-gray-medium hover:text-neutral-black',
                  )}
                >
                  <span>{tab.label}</span>
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 text-[10px] font-bold',
                      active
                        ? 'bg-brand-red-50 text-brand-red-600'
                        : 'bg-neutral-bg-light text-neutral-gray-dark',
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full py-1 sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-gray-medium" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search job, client, or reference..."
              className="w-full rounded-lg border border-neutral-gray-light bg-white py-2 pl-9 pr-3 text-xs text-neutral-black outline-none focus:border-brand-navy-900 focus:ring-2 focus:ring-brand-navy-900/20"
            />
          </div>
        </div>

        {/* Table */}
        <PayoutJobsTable
          visibleJobs={visibleJobs}
          onViewDetail={setDetailJob}
          onCheckoutSingle={(job) => handleOpenCheckout([job])}
        />
      </div>

      <PayoutCheckoutModal
        open={checkoutJobs.length > 0}
        jobs={checkoutJobs}
        onClose={() => setCheckoutJobs([])}
        onConfirm={(destination) => handleConfirmCheckout(destination)}
      />

      <PayoutJobDetailModal
        job={detailJob}
        onClose={() => setDetailJob(null)}
        onCheckoutSingle={(job) => handleOpenCheckout([job])}
      />
    </div>
  );
}
