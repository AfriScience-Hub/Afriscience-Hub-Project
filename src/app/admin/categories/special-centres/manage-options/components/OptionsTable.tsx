'use client';

import { MoreVertical, Pencil, Power, Trash2 } from 'lucide-react';
import TableActionMenu from '@/app/admin/components/TableActionMenu';
import { formatPrice } from '@/lib/utils';
import type { CategoryPrice, ManagedOption } from '../data';

interface Props {
  options: ManagedOption[];
  /** Render the Price column (Categories and Country). */
  showPrice?: boolean;
  /**
   * `row` - each row carries its own price (Country).
   * `scheme` - every row shares the single category price (Categories).
   */
  priceMode?: 'row' | 'scheme';
  /** Shared category price used when `priceMode` is `scheme`. */
  categoryPrice?: CategoryPrice;
  /** Show the info icon (Categories only). */
  showNote?: boolean;
  onEdit: (opt: ManagedOption) => void;
  onDelete: (id: string, name: string) => void;
  onToggleStatus: (id: string, currentStatus: string) => void;
}

function PriceCell({ opt, mode, categoryPrice }: { opt: ManagedOption; mode: 'row' | 'scheme'; categoryPrice?: CategoryPrice }) {
  if (mode === 'row') {
    return (
      <span className={opt.price ? 'font-semibold text-neutral-black' : 'text-neutral-gray-medium'}>
        {formatPrice(opt.price)}
      </span>
    );
  }

  const hasScheme = Boolean(
    categoryPrice?.africaOne || categoryPrice?.africaTwoOrMore ||
    categoryPrice?.nonAfricaOne || categoryPrice?.nonAfricaTwoOrMore
  );
  if (!hasScheme) return <span className="text-neutral-gray-medium">—</span>;

  return (
    <span className="inline-flex flex-col leading-tight whitespace-nowrap">
      <span className="font-semibold text-neutral-black">{formatPrice(categoryPrice?.africaOne)}</span>
      {categoryPrice?.africaTwoOrMore && (
        <span className="text-[10px] text-neutral-gray-medium">2+ at {formatPrice(categoryPrice.africaTwoOrMore)}</span>
      )}
    </span>
  );
}

export default function OptionsTable({
  options, showPrice = false, priceMode = 'row', categoryPrice, showNote = false,
  onEdit, onDelete, onToggleStatus,
}: Props) {
  if (options.length === 0) {
    return <p className="text-sm text-neutral-gray-medium py-8 text-center">No options yet.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm min-w-[520px]">
        <thead>
          <tr className="border-b border-neutral-gray-light bg-neutral-bg-light/60">
            <th className="text-left px-4 py-2.5 text-xs font-semibold text-neutral-gray-medium">Name</th>
            {showPrice && (
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-neutral-gray-medium">Price</th>
            )}
            <th className="text-left px-4 py-2.5 text-xs font-semibold text-neutral-gray-medium">Status</th>
            <th className="text-right px-4 py-2.5 text-xs font-semibold text-neutral-gray-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {options.map((opt) => (
            <tr key={opt.id} className="border-b border-neutral-gray-light/60 last:border-0 hover:bg-neutral-bg-light/40">
              <td className="px-4 py-3 text-xs font-medium text-neutral-black">
                <span className="inline-flex items-center gap-1.5">
                  {opt.name}
                  {showNote && opt.note && (
                    <span title={opt.note} aria-label="Note" className="cursor-help text-[#453DD8]">&#9432;</span>
                  )}
                </span>
              </td>
              {showPrice && (
                <td className="px-4 py-3 text-xs text-neutral-gray-dark whitespace-nowrap">
                  <PriceCell opt={opt} mode={priceMode} categoryPrice={categoryPrice} />
                </td>
              )}
              <td className="px-4 py-3">
                <span
                  className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                    opt.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-neutral-100 text-neutral-gray-medium'
                  }`}
                >
                  {opt.status}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end" onClick={(e) => e.stopPropagation()}>
                  <TableActionMenu
                    triggerIcon={<MoreVertical className="h-4 w-4 text-neutral-gray-dark" />}
                    items={[
                      { label: 'Edit', icon: <Pencil className="h-3.5 w-3.5 text-[#453DD8]" />, onClick: () => onEdit(opt) },
                      { label: opt.status === 'Active' ? 'Deactivate' : 'Activate', icon: <Power className="h-3.5 w-3.5" />, onClick: () => onToggleStatus(opt.id, opt.status) },
                      { label: 'Delete', icon: <Trash2 className="h-3.5 w-3.5" />, onClick: () => onDelete(opt.id, opt.name), danger: true },
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
