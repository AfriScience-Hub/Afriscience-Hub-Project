'use client';

import React, { useMemo, useState } from 'react';
import { MoreVertical, Eye, Pencil, Copy, UserPlus, SearchX, ChevronsUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import TableActionMenu from '@/app/admin/components/TableActionMenu';
import { formatDate, formatRegFee, getStatus, type AllCompetition, type AllCompetitionStatus } from '../data';

type SortKey = 'createdISO';

interface AllCompetitionsTableProps {
  rows: AllCompetition[];
  /** Open the full-details View modal for a competition */
  onView: (row: AllCompetition) => void;
  /** Open the Assign Judges modal for a competition */
  onAssignJudges: (row: AllCompetition) => void;
  /** Navigate to the create page prefilled in edit mode */
  onEdit: (row: AllCompetition) => void;
  /** Navigate to the create page prefilled in reuse mode */
  onReuse: (row: AllCompetition) => void;
}

const STATUS_STYLES: Record<AllCompetitionStatus, string> = {
  Ongoing: 'bg-green-100 text-green-700',
  Upcoming: 'bg-blue-100 text-blue-700',
  Past: 'bg-neutral-100 text-neutral-gray-dark',
};

const COLUMNS: { key: string; label: string; sort?: SortKey; align?: 'right' }[] = [
  { key: 'createdISO', label: 'Date Created', sort: 'createdISO' },
  { key: 'type', label: 'Type' },
  { key: 'category', label: 'Categories' },
  { key: 'country', label: 'Country' },
  { key: 'regFee', label: 'Reg. Fee (USD)', align: 'right' },
  { key: 'startISO', label: 'Start Date' },
  { key: 'submissionISO', label: 'Submission Deadline' },
  { key: 'participants', label: 'Participants' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions', align: 'right' },
];

/**
 * All Competitions data table.
 * Columns: Date Created, Type, Categories, Country, Reg. Fee, Start Date,
 * Deadline, Participants, Status, Actions. Status is derived from dates.
 */
export default function AllCompetitionsTable({ rows, onView, onAssignJudges, onEdit, onReuse }: AllCompetitionsTableProps) {
  const [sort, setSort] = useState<{ key: SortKey; dir: 'asc' | 'desc' } | null>(null);

  const sorted = useMemo(() => {
    if (!sort) return rows;
    const copy = [...rows];
    copy.sort((a, b) => {
      const av = a[sort.key];
      const bv = b[sort.key];
      const cmp = typeof av === 'number' && typeof bv === 'number'
        ? av - bv
        : String(av).localeCompare(String(bv));
      return sort.dir === 'asc' ? cmp : -cmp;
    });
    return copy;
  }, [rows, sort]);

  const toggleSort = (key: SortKey) =>
    setSort((prev) =>
      prev?.key === key
        ? prev.dir === 'desc'
          ? { key, dir: 'asc' }
          : null
        : { key, dir: 'desc' }
    );

  const sortIcon = (key?: SortKey) => {
    if (!key) return null;
    if (sort?.key !== key) return <ChevronsUpDown className="h-3 w-3 text-neutral-gray-light inline -mt-0.5" />;
    return sort.dir === 'desc'
      ? <ArrowDown className="h-3 w-3 text-[#453DD8] inline -mt-0.5" />
      : <ArrowUp className="h-3 w-3 text-[#453DD8] inline -mt-0.5" />;
  };

  const actionItems = (row: AllCompetition) => [
    { label: 'View', icon: <Eye className="h-3.5 w-3.5" />, onClick: () => onView(row) },
    { label: 'Edit', icon: <Pencil className="h-3.5 w-3.5" />, onClick: () => onEdit(row) },
    { label: 'Assign Judges', icon: <UserPlus className="h-3.5 w-3.5" />, onClick: () => onAssignJudges(row) },
    { label: 'Reuse', icon: <Copy className="h-3.5 w-3.5" />, onClick: () => onReuse(row) },
  ];

  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-14 text-center">
        <SearchX className="h-8 w-8 text-neutral-gray-light mb-2" />
        <p className="text-sm font-medium text-neutral-black">No competitions found</p>
        <p className="text-xs text-neutral-gray-medium mt-0.5">Try adjusting your search or clearing filters.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1080px] text-xs">
        <thead>
          <tr className="border-b border-neutral-gray-light bg-neutral-bg-light/60">
            {COLUMNS.map((col) => (
              <th
                key={col.key}
                onClick={() => col.sort && toggleSort(col.sort)}
                className={`text-left px-3 py-2.5 text-xs font-semibold text-neutral-gray-medium whitespace-nowrap ${col.align === 'right' ? 'text-right' : ''} ${col.sort ? 'cursor-pointer select-none hover:text-neutral-black' : ''}`}
              >
                {col.label} {col.sort && sortIcon(col.sort)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => {
            const status = getStatus(row);
            return (
              <tr key={row.id} className="border-b border-neutral-gray-light/60 last:border-0 hover:bg-neutral-bg-light/40">
                <td className="px-3 py-3 text-xs text-neutral-gray-dark whitespace-nowrap">{formatDate(row.createdISO)}</td>
                <td className="px-3 py-3 whitespace-nowrap">
                  <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-700">{row.type}</span>
                </td>
                <td className="px-3 py-3 whitespace-nowrap">
                  <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-purple-50 text-purple-700">{row.category}</span>
                </td>
                <td className="px-3 py-3 text-xs text-neutral-gray-dark whitespace-nowrap">{row.country}</td>
                <td className="px-3 py-3 text-xs text-neutral-gray-dark text-right whitespace-nowrap font-medium">{formatRegFee(row.regFee)}</td>
                <td className="px-3 py-3 text-xs text-neutral-gray-dark whitespace-nowrap">{formatDate(row.startISO)}</td>
                <td className="px-3 py-3 text-xs text-neutral-gray-dark whitespace-nowrap">{formatDate(row.submissionISO)}</td>
                <td className="px-3 py-3 text-xs text-neutral-black whitespace-nowrap font-medium">{row.participants.toLocaleString()}</td>
                <td className="px-3 py-3 whitespace-nowrap">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${STATUS_STYLES[status]}`}>{status}</span>
                </td>
                <td className="px-3 py-3 text-right">
                  <TableActionMenu
                    triggerIcon={<MoreVertical className="h-4 w-4 text-neutral-gray-dark" />}
                    items={actionItems(row)}
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
