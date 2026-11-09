'use client';

import { CheckCircle2, Clock, DollarSign, Eye, Send } from 'lucide-react';
import RowActionMenu from '@/app/dashboard/components/RowActionMenu';
import { cn } from '@/lib/utils';
import { formatUsd, type PayoutJob, type PayoutJobStatus } from '../data';

interface PayoutJobsTableProps {
  visibleJobs: PayoutJob[];
  onViewDetail: (job: PayoutJob) => void;
  onCheckoutSingle: (job: PayoutJob) => void;
}

function statusBadge(status: PayoutJobStatus) {
  switch (status) {
    case 'Completed':
      return {
        tone: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        icon: <CheckCircle2 className="h-3 w-3" />,
      };
    case 'In Progress':
      return {
        tone: 'bg-amber-50 text-amber-700 border-amber-200',
        icon: <Clock className="h-3 w-3" />,
      };
    case 'Payout Requested':
      return {
        tone: 'bg-blue-50 text-blue-700 border-blue-200',
        icon: <Send className="h-3 w-3" />,
      };
    case 'Paid Out':
      return {
        tone: 'bg-neutral-bg-light text-neutral-gray-dark border-neutral-gray-light',
        icon: <DollarSign className="h-3 w-3" />,
      };
  }
}

export default function PayoutJobsTable({
  visibleJobs,
  onViewDetail,
  onCheckoutSingle,
}: PayoutJobsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1160px] text-left text-xs">
        <thead>
          <tr className="border-b border-brand-red-100 bg-brand-red-50/60">
            <th className="min-w-[280px] px-6 py-3.5 font-semibold uppercase tracking-wide text-brand-red-700">
              Job / Service
            </th>
            <th className="min-w-[220px] px-6 py-3.5 font-semibold uppercase tracking-wide text-brand-red-700">
              Client
            </th>
            <th className="min-w-[170px] px-6 py-3.5 font-semibold uppercase tracking-wide text-brand-red-700">
              Status
            </th>
            <th className="min-w-[130px] px-6 py-3.5 text-right font-semibold uppercase tracking-wide text-brand-red-700">
              Price
            </th>
            <th className="min-w-[130px] px-6 py-3.5 text-right font-semibold uppercase tracking-wide text-brand-red-700">
              Fee (5%)
            </th>
            <th className="min-w-[150px] px-6 py-3.5 text-right font-semibold uppercase tracking-wide text-brand-red-700">
              Total Payout
            </th>
            <th className="min-w-[100px] px-6 py-3.5 text-right font-semibold uppercase tracking-wide text-brand-red-700">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-gray-light/70">
          {visibleJobs.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-6 py-12 text-center text-sm text-neutral-gray-medium">
                No jobs match the selected filter.
              </td>
            </tr>
          ) : (
            visibleJobs.map((job) => {
              const isReady = job.status === 'Completed';
              const badge = statusBadge(job.status);

              return (
                <tr
                  key={job.id}
                  className="transition-colors hover:bg-neutral-bg-light/50"
                >
                  <td className="px-6 py-4">
                    <p className="font-semibold text-neutral-black">{job.jobTitle}</p>
                    <p className="mt-1 text-[11px] text-neutral-gray-medium">
                      <span className="font-mono text-brand-navy-900">{job.reference}</span> &bull; {job.listingName}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-neutral-black">{job.clientName}</p>
                    <p className="mt-0.5 text-[11px] text-neutral-gray-medium">{job.clientEmail}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-bold whitespace-nowrap',
                        badge.tone,
                      )}
                    >
                      {badge.icon}
                      {job.status}
                    </span>
                    <p className="mt-1 text-[10px] text-neutral-gray-medium">
                      {job.completedDate ? `Completed ${job.completedDate}` : `Started ${job.startDate}`}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-neutral-black whitespace-nowrap">
                    {formatUsd(job.price)}
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-neutral-black whitespace-nowrap">
                    -{formatUsd(job.platformFee)}
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-neutral-black whitespace-nowrap">
                    {formatUsd(job.total)}
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <RowActionMenu
                      label={`Actions for ${job.jobTitle}`}
                      items={[
                        {
                          label: 'View Details',
                          icon: <Eye className="h-3.5 w-3.5" />,
                          onClick: () => onViewDetail(job),
                        },
                        ...(isReady
                          ? [
                              {
                                label: 'Checkout',
                                icon: <Send className="h-3.5 w-3.5 text-brand-red-600" />,
                                onClick: () => onCheckoutSingle(job),
                              },
                            ]
                          : []),
                      ]}
                    />
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
