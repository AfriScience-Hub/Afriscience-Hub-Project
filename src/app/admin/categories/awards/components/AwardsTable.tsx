'use client';

import React from 'react';
import Image from 'next/image';
import { MoreVertical, Eye, Pencil, Copy, SearchX } from 'lucide-react';
import TableActionMenu from '@/app/admin/components/TableActionMenu';
import { TYPE_CHIP, getRewardIcon, rewardLabel, type AdminAward } from '../data';

interface AwardsTableProps {
  rows: AdminAward[];
  /** Open the full-details View modal */
  onView: (row: AdminAward) => void;
  /** Navigate to the create page prefilled in edit mode */
  onEdit: (row: AdminAward) => void;
  /** Navigate to the create page prefilled in reuse mode */
  onReuse: (row: AdminAward) => void;
}

const HEADERS = ['Type', 'Recipient', 'Country', 'Year', 'Rewards', 'Action'];

/**
 * All Awards table: Type chip, Recipient (avatar + name), Country (plain
 * text — no flag), Year, Rewards (cash, certificates and honorary awards)
 * and the View / Edit / Reuse action menu.
 */
export default function AwardsTable({ rows, onView, onEdit, onReuse }: AwardsTableProps) {
  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-14 text-center">
        <SearchX className="h-8 w-8 text-neutral-gray-light mb-2" />
        <p className="text-sm font-medium text-neutral-black">No awards found</p>
        <p className="text-xs text-neutral-gray-medium mt-0.5">Try adjusting your search or clearing filters.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[860px] text-xs">
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
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-neutral-gray-light/60 last:border-0 hover:bg-neutral-bg-light/40">
              <td className="px-4 py-3 whitespace-nowrap">
                <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${TYPE_CHIP[row.type] ?? 'bg-slate-100 text-slate-600'}`}>
                  {row.type}
                </span>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center gap-2.5">
                  <Image src={row.avatar} alt={row.recipient} width={32} height={32} className="h-8 w-8 rounded-full object-cover flex-shrink-0" />
                  <span className="text-xs font-semibold text-neutral-black">{row.recipient}</span>
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-xs text-neutral-gray-dark">{row.country}</td>
              <td className="px-4 py-3 whitespace-nowrap text-xs text-neutral-gray-dark">{row.year}</td>
              <td className="px-4 py-3">
                <ul className="space-y-1">
                  {[...row.rewards, ...(row.honorary ?? [])].map((item, i) => {
                    const Icon = getRewardIcon(item.type);
                    return (
                      <li key={`${item.type}-${i}`} className="flex items-center gap-1.5 whitespace-nowrap">
                        <Icon className="h-3.5 w-3.5 flex-shrink-0 text-neutral-gray-medium" />
                        <span className="text-[11px] text-neutral-gray-dark">{rewardLabel(item)}</span>
                      </li>
                    );
                  })}
                </ul>
              </td>
              <td className="px-4 py-3 text-right">
                <TableActionMenu
                  triggerIcon={<MoreVertical className="h-4 w-4 text-neutral-gray-dark" />}
                  items={[
                    { label: 'View', icon: <Eye className="h-3.5 w-3.5" />, onClick: () => onView(row) },
                    { label: 'Edit', icon: <Pencil className="h-3.5 w-3.5" />, onClick: () => onEdit(row) },
                    { label: 'Reuse', icon: <Copy className="h-3.5 w-3.5" />, onClick: () => onReuse(row) },
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
