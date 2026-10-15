'use client';

import React from 'react';
import Image from 'next/image';
import { MoreVertical, Pencil, BadgeCheck, SearchX } from 'lucide-react';
import TableActionMenu from '@/app/admin/components/TableActionMenu';
import {
  getProgramChip,
  initialsForName,
  initialsText,
  STATUS_CHIP,
  type ImpactApplication,
} from '../../applicationsData';
import type { ApplicationsTab } from './ApplicationsHeader';

interface ApplicationsTableProps {
  rows: ImpactApplication[];
  tab: ApplicationsTab;
  /** Open the edit/publish modal for a submission */
  onEdit: (row: ImpactApplication) => void;
  /** Mark a published application as concluded */
  onConclude: (row: ImpactApplication) => void;
}

const HEADERS = ['Name', 'Username', 'Selected Support', 'Status', 'Email', 'Date Submitted', 'Action'];

/**
 * Applications table: name only (no title), username, selected support,
 * status, email, date submitted and the action menu. Pending rows get
 * Edit; published rows get Edit + Mark as Concluded; rejected and
 * concluded rows (on All) have no actions.
 */
export default function ApplicationsTable({ rows, tab, onEdit, onConclude }: ApplicationsTableProps) {
  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-14 text-center">
        <SearchX className="h-8 w-8 text-neutral-gray-light mb-2" />
        <p className="text-sm font-medium text-neutral-black">No applications found</p>
        <p className="text-xs text-neutral-gray-medium mt-0.5">Try adjusting your search or clearing filters.</p>
      </div>
    );
  }

  const actionsFor = (row: ImpactApplication) => {
    if (row.status === 'Pending') {
      return [{ label: 'Edit', icon: <Pencil className="h-3.5 w-3.5" />, onClick: () => onEdit(row) }];
    }
    if (row.status === 'Published') {
      return [
        { label: 'Edit', icon: <Pencil className="h-3.5 w-3.5" />, onClick: () => onEdit(row) },
        { label: 'Mark as Concluded', icon: <BadgeCheck className="h-3.5 w-3.5" />, onClick: () => onConclude(row) },
      ];
    }
    // Concluded rows can still be edited from the Published tab only.
    if (row.status === 'Concluded' && tab === 'published') {
      return [{ label: 'Edit', icon: <Pencil className="h-3.5 w-3.5" />, onClick: () => onEdit(row) }];
    }
    return [];
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px] text-xs">
        <thead>
          <tr className="border-b border-neutral-gray-light bg-neutral-bg-light/60">
            {HEADERS.map((label) => (
              <th
                key={label}
                className={`px-4 py-2.5 text-xs font-semibold text-neutral-gray-medium whitespace-nowrap ${label === 'Action' ? 'text-right' : 'text-left'}`}
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const actions = actionsFor(row);
            return (
              <tr key={row.id} className="border-b border-neutral-gray-light/60 last:border-0 hover:bg-neutral-bg-light/40">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    {row.avatar ? (
                      <Image src={row.avatar} alt={row.name} width={36} height={36} className="h-9 w-9 rounded-full object-cover flex-shrink-0" />
                    ) : (
                      <span className={`h-9 w-9 rounded-full grid place-items-center flex-shrink-0 text-[11px] font-bold ${row.initialsCls ?? initialsForName(row.name)}`}>
                        {initialsText(row.name)}
                      </span>
                    )}
                    <span className="text-xs font-semibold text-neutral-black whitespace-nowrap">{row.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-xs font-medium text-[#453DD8]">{row.username}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${getProgramChip(row.program)}`}>
                    {row.program}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${STATUS_CHIP[row.status]}`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-xs text-neutral-gray-dark">{row.email}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <p className="text-xs text-neutral-black">{row.date}</p>
                  <p className="text-[10px] text-neutral-gray-medium">{row.time}</p>
                </td>
                <td className="px-4 py-3 text-right">
                  {actions.length > 0 ? (
                    <TableActionMenu
                      triggerIcon={<MoreVertical className="h-4 w-4 text-neutral-gray-dark" />}
                      items={actions}
                    />
                  ) : (
                    <span className="text-[11px] text-neutral-gray-light">&mdash;</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
