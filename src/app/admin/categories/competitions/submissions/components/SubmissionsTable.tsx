'use client';

import React from 'react';
import Image from 'next/image';
import { MoreVertical, Eye, ClipboardCheck, SearchX } from 'lucide-react';
import TableActionMenu from '@/app/admin/components/TableActionMenu';
import { type CompetitionSubmission } from '../data';

interface SubmissionsTableProps {
  rows: CompetitionSubmission[];
  onView: (row: CompetitionSubmission) => void;
  onScore: (row: CompetitionSubmission) => void;
}

const HEADERS = ['Submission', 'Competition', 'Type', 'Category', 'Country', 'Contact', 'Submitted On', 'Status', 'Scored By', 'Average Score', 'Action'];

/**
 * Submissions table. Columns: Submission, Competition, Type, Category, Country,
 * Contact, Submitted On, Status, Scored By, Average Score and Action
 * (View Submission / Score Participants).
 */
export default function SubmissionsTable({ rows, onView, onScore }: SubmissionsTableProps) {
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
      <table className="w-full min-w-[1100px] text-xs">
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
          {rows.map((row) => (
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
                <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${row.status === 'Scored' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                  {row.status}
                </span>
              </td>
              <td className="px-3 py-3 text-xs text-neutral-gray-dark whitespace-nowrap">{row.scoredBy ?? '—'}</td>
              <td className="px-3 py-3 text-xs font-semibold text-neutral-black whitespace-nowrap">
                {row.avgScore != null ? row.avgScore.toFixed(1) : '—'}
              </td>
              <td className="px-3 py-3 text-right">
                <TableActionMenu
                  triggerIcon={<MoreVertical className="h-4 w-4 text-neutral-gray-dark" />}
                  items={[
                    { label: 'View Submission', icon: <Eye className="h-3.5 w-3.5" />, onClick: () => onView(row) },
                    { label: 'Score Participants', icon: <ClipboardCheck className="h-3.5 w-3.5" />, onClick: () => onScore(row) },
                  ]}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
