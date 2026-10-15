'use client';

import React from 'react';
import { MoreVertical, Pencil, EyeOff, Eye, SearchX } from 'lucide-react';
import TableActionMenu from '@/app/admin/components/TableActionMenu';
import { formatUsd, getProgramIcon, getProgramIconCls, type SupportProgram } from '../../data';

interface ProgramsTableProps {
  rows: SupportProgram[];
  /** Navigate to the create page prefilled with the program */
  onEdit: (row: SupportProgram) => void;
  /**
   * Hide (or show again) a program — a hidden program stops displaying
   * on the main Donations page.
   */
  onToggleHidden: (row: SupportProgram) => void;
}

const HEADERS = ['Icon', 'Program Name', 'Description', 'Target Amount (USD)', 'Action'];

/**
 * Support Programs table: icon, name, description, USD target and the
 * Edit / Hide action menu (Hide becomes Show for hidden programs).
 */
export default function ProgramsTable({ rows, onEdit, onToggleHidden }: ProgramsTableProps) {
  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-14 text-center">
        <SearchX className="h-8 w-8 text-neutral-gray-light mb-2" />
        <p className="text-sm font-medium text-neutral-black">No programs found</p>
        <p className="text-xs text-neutral-gray-medium mt-0.5">Try adjusting your search or clearing filters.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] text-xs">
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
            const Icon = getProgramIcon(row.iconKey);
            return (
              <tr key={row.id} className="border-b border-neutral-gray-light/60 last:border-0 hover:bg-neutral-bg-light/40">
                <td className="px-4 py-3">
                  <span className={`w-9 h-9 rounded-lg grid place-items-center ${getProgramIconCls(row.iconKey)}`}>
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-neutral-black">{row.name}</span>
                    {row.hidden && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-500">
                        Hidden
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 max-w-[320px]">
                  <p className="text-[11px] text-neutral-gray-dark line-clamp-2">{row.description}</p>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-xs font-semibold text-neutral-black">
                  {formatUsd(row.targetAmount)}
                </td>
                <td className="px-4 py-3 text-right">
                  <TableActionMenu
                    triggerIcon={<MoreVertical className="h-4 w-4 text-neutral-gray-dark" />}
                    items={[
                      { label: 'Edit', icon: <Pencil className="h-3.5 w-3.5" />, onClick: () => onEdit(row) },
                      {
                        label: row.hidden ? 'Show' : 'Hide',
                        icon: row.hidden ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />,
                        onClick: () => onToggleHidden(row),
                      },
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
