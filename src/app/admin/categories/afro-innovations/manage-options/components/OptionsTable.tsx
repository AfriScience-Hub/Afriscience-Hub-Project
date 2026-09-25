'use client';

import { MoreVertical, Pencil, Power } from 'lucide-react';
import TableActionMenu from '@/app/admin/components/TableActionMenu';
import type { ManagedOption } from '../data';

interface Props {
  options: ManagedOption[];
  onEdit: (opt: ManagedOption) => void;
  onToggleStatus: (id: string) => void;
}

export default function OptionsTable({ options, onEdit, onToggleStatus }: Props) {
  if (options.length === 0) {
    return <p className="text-sm text-neutral-gray-medium py-8 text-center">No options yet.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm min-w-[520px]">
        <thead>
          <tr className="border-b border-neutral-gray-light bg-neutral-bg-light/60">
            <th className="text-left px-4 py-2.5 text-xs font-semibold text-neutral-gray-medium">Name</th>
            <th className="text-left px-4 py-2.5 text-xs font-semibold text-neutral-gray-medium">Status</th>
            <th className="text-left px-4 py-2.5 text-xs font-semibold text-neutral-gray-medium">Innovations Using</th>
            <th className="text-right px-4 py-2.5 text-xs font-semibold text-neutral-gray-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {options.map((opt) => (
            <tr key={opt.id} className="border-b border-neutral-gray-light/60 last:border-0 hover:bg-neutral-bg-light/40">
              <td className="px-4 py-3 text-xs font-medium text-neutral-black">{opt.name}</td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                    opt.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-neutral-100 text-neutral-gray-medium'
                  }`}
                >
                  {opt.status}
                </span>
              </td>
              <td className="px-4 py-3 text-xs text-neutral-gray-dark">{opt.count}</td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end" onClick={(e) => e.stopPropagation()}>
                  <TableActionMenu
                    triggerIcon={<MoreVertical className="h-4 w-4 text-neutral-gray-dark" />}
                    items={[
                      { label: 'Edit', icon: <Pencil className="h-3.5 w-3.5 text-[#453DD8]" />, onClick: () => onEdit(opt) },
                      { label: opt.status === 'Active' ? 'Deactivate' : 'Activate', icon: <Power className="h-3.5 w-3.5" />, onClick: () => onToggleStatus(opt.id) },
                    ]}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
