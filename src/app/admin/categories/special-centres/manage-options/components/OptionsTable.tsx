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
  /** Which country group the scheme price column should show. */
  priceGroup?: 'africa' | 'nonAfrica' | 'both';
  /** Show the info icon (Categories only). */
  showNote?: boolean;
  onEdit: (opt: ManagedOption) => void;
  onDelete?: (id: string, name: string) => void;
  onToggleStatus: (id: string, currentStatus: string) => void;
}

function PriceCell({ opt, mode, categoryPrice, priceGroup = 'africa' }: { opt: ManagedOption; mode: 'row' | 'scheme'; categoryPrice?: CategoryPrice; priceGroup?: 'africa' | 'nonAfrica' | 'both' }) {
  if (mode === 'row') {
    return (
      <span className={opt.price ? 'font-semibold text-neutral-black' : 'text-neutral-gray-medium'}>
        {formatPrice(opt.price)}
      </span>
    );
  }

  const pair = (label: string, one?: string, twoPlus?: string) => (
    <span className="inline-flex items-center gap-1 whitespace-nowrap">
      <span className="text-[9px] font-medium uppercase text-neutral-gray-medium">{label}</span>
      <span className="font-semibold text-neutral-black">{formatPrice(one)}</span>
      {twoPlus && <span className="text-[10px] text-neutral-gray-medium">/ 2+ {formatPrice(twoPlus)}</span>}
    </span>
  );

  if (priceGroup === 'both') {
    return (
      <span className="inline-flex items-center gap-3 whitespace-nowrap">
        {pair('AF', categoryPrice?.africaOne, categoryPrice?.africaTwoOrMore)}
        {pair('Non-AF', categoryPrice?.nonAfricaOne, categoryPrice?.nonAfricaTwoOrMore)}
      </span>
    );
  }

  const one = priceGroup === 'nonAfrica' ? categoryPrice?.nonAfricaOne : categoryPrice?.africaOne;
  const twoPlus = priceGroup === 'nonAfrica' ? categoryPrice?.nonAfricaTwoOrMore : categoryPrice?.africaTwoOrMore;
  if (!one && !twoPlus) return <span className="text-neutral-gray-medium">—</span>;

  return pair(priceGroup === 'nonAfrica' ? 'Non-African' : 'African', one, twoPlus);
}

export default function OptionsTable({
  options, showPrice = false, priceMode = 'row', categoryPrice, priceGroup = 'africa', showNote = false,
  onEdit, onDelete, onToggleStatus,
}: Props) {
  if (options.length === 0) {
    return <p className="text-sm text-neutral-gray-medium py-8 text-center">No options yet.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm min-w-[520px] table-fixed">
        <colgroup>
          <col className={showPrice ? 'w-[40%]' : 'w-[64%]'} />
          {showPrice && <col className="w-[30%]" />}
          <col className="w-[16%]" />
          <col className={showPrice ? 'w-[14%]' : 'w-[18%]'} />
        </colgroup>
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
                  <PriceCell opt={opt} mode={priceMode} categoryPrice={categoryPrice} priceGroup={priceGroup} />
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
                      ...(onDelete ? [{ label: 'Delete', icon: <Trash2 className="h-3.5 w-3.5" />, onClick: () => onDelete(opt.id, opt.name), danger: true }] : []),
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
