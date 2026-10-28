'use client';

import React from 'react';
import Image from 'next/image';
import { MoreVertical, Eye, ClipboardCheck, SearchX, Ban, XCircle } from 'lucide-react';
import TableActionMenu from '@/app/admin/components/TableActionMenu';
import { releaseKey, type CompetitionSubmission } from '../data';

interface SubmissionsTableProps {
  rows: CompetitionSubmission[];
  onView: (row: CompetitionSubmission) => void;
  onScore: (row: CompetitionSubmission) => void;
  onDisqualify: (row: CompetitionSubmission) => void;
  /** Past competitions can no longer be scored. */
  canScore: boolean;
  releasedKeys: ReadonlySet<string>;
  disqualifiedIds: ReadonlySet<string>;
}

const STATUS_STYLES: Record<CompetitionSubmission['status'], string> = {
  Scored: 'bg-green-100 text-green-700',
  Pending: 'bg-orange-100 text-orange-700',
};

const HEADERS = ['Submission', 'Competition', 'Type', 'Category', 'Country', 'Contact', 'Submitted On', 'Status', 'Top 30', 'Scored By', 'Average Score', 'Action'];

/**
 * Submissions table. Columns: Submission, Competition, Type, Category, Country,
 * Contact, Submitted On, Status, Top 30, Scored By, Average Score and Action.
 */
export default function SubmissionsTable({
  rows,
  onView,
  onScore,
  onDisqualify,
  canScore,
  releasedKeys,
  disqualifiedIds,
}: SubmissionsTableProps) {
  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-14 text-center">
        <SearchX className="h-8 w-8 text-neutral-gray-light mb-2" />
        <p className="text-sm font-medium text-neutral-black">No submissions found</p>
        <p className="text-xs text-neutral-gray-medium mt-0.5">Try adjusting your search or clearing filters.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1260px] text-xs">
        <thead>
          <tr className="border-b border-neutral-gray-light bg-neutral-bg-light/60">
            {HEADERS.map((label) => (
              <th
                key={label}
                className={`px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium whitespace-nowrap ${label === 'Action' ? 'text-right' : 'text-left'}`}
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const isDisqualified = disqualifiedIds.has(row.id);
            const isReleased = releasedKeys.has(releaseKey(row.type, row.category));
            return (
              <tr key={row.id} className="border-b border-neutral-gray-light/60 last:border-0 hover:bg-neutral-bg-light/40">
                <td className="px-3 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-2.5">
                    <Image src={row.cover} alt={row.title} width={40} height={40} className="h-10 w-10 rounded-lg object-cover flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-neutral-black">{row.title}</p>
                      <p className="text-[10px] text-neutral-gray-medium">{row.participant}</p>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3 whitespace-nowrap">
                  <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-indigo-50 text-indigo-700">{row.competition}</span>
                </td>
                <td className="px-3 py-3 whitespace-nowrap">
                  <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-700">{row.type}</span>
                </td>
                <td className="px-3 py-3 whitespace-nowrap">
                  <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-purple-50 text-purple-700">{row.category}</span>
                </td>
                <td className="px-3 py-3 whitespace-nowrap text-xs text-neutral-gray-dark">{row.country}</td>
                <td className="px-3 py-3 text-xs text-neutral-gray-dark whitespace-nowrap">{row.email}</td>
                <td className="px-3 py-3 whitespace-nowrap">
                  <p className="text-xs text-neutral-gray-dark">{row.submittedOn}</p>
                  <p className="text-[10px] text-neutral-gray-medium">{row.submittedTime}</p>
                </td>
                <td className="px-3 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${STATUS_STYLES[row.status]}`}>
                      {row.status}
                    </span>
                    {isDisqualified && (
                      <span
                        title="Disqualified"
                        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-red-50 text-red-600"
                      >
                        <Ban className="h-3 w-3" /> Disqualified
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-3 py-3 whitespace-nowrap">
                  {isReleased ? (
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-700">
                      Released
                    </span>
                  ) : (
                    <span className="text-[11px] text-neutral-gray-medium">—</span>
                  )}
                </td>
                <td className="px-3 py-3 text-xs text-neutral-gray-dark whitespace-nowrap">{row.scoredBy ?? '—'}</td>
                <td className="px-3 py-3 text-xs font-semibold text-neutral-black whitespace-nowrap">
                  {row.avgScore != null ? row.avgScore.toFixed(1) : '—'}
                </td>
                <td className="px-3 py-3 text-right">
                  <TableActionMenu
                    triggerIcon={<MoreVertical className="h-4 w-4 text-neutral-gray-dark" />}
                    items={[
                      ...(canScore
                        ? [{ label: 'View work & Score', icon: <ClipboardCheck className="h-3.5 w-3.5" />, onClick: () => onScore(row) }]
                        : []),
                      { label: 'View Details', icon: <Eye className="h-3.5 w-3.5" />, onClick: () => onView(row) },
                      { label: 'Disqualify', icon: <XCircle className="h-3.5 w-3.5" />, onClick: () => onDisqualify(row), danger: true },
                    ]}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
