'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, Layers, Plus } from 'lucide-react';
import OptionsTable from './OptionsTable';
import type { CategoryPrice, ManagedOption } from '../data';

interface Props {
  /** Canonical field headings, in display order. */
  fields: string[];
  options: ManagedOption[];
  /** Show the price column (Categories only). */
  showPrice?: boolean;
  categoryPrice?: CategoryPrice;
  /** Only Categories carry the info icon. */
  showNote?: boolean;
  singular: string;
  emptyHint: string;
  onEdit: (opt: ManagedOption) => void;
  onDelete: (id: string, name: string) => void;
  onToggleStatus: (id: string, currentStatus: string) => void;
  onAddUnder: (field: string) => void;
}

/**
 * Categories and Services are scoped to a Field, so they are presented as one
 * collapsible section per field. An empty field shows a placeholder instead of
 * an empty table.
 */
export default function FieldSections({
  fields, options, showPrice = false, categoryPrice, showNote = false,
  singular, emptyHint, onEdit, onDelete, onToggleStatus, onAddUnder,
}: Props) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const toggle = (f: string) => setCollapsed((prev) => ({ ...prev, [f]: !prev[f] }));

  return (
    <div className="divide-y divide-neutral-gray-light rounded-xl border border-neutral-gray-light overflow-hidden">
      {fields.map((field) => {
        const rows = options.filter((o) => o.field === field);
        const isCollapsed = collapsed[field] ?? false;

        return (
          <div key={field} className="bg-white">
            <button
              onClick={() => toggle(field)}
              className="w-full flex items-center gap-2.5 px-3.5 py-3 text-left hover:bg-neutral-bg-light/60 cursor-pointer"
            >
              {isCollapsed
                ? <ChevronRight className="h-4 w-4 shrink-0 text-neutral-gray-medium" />
                : <ChevronDown className="h-4 w-4 shrink-0 text-neutral-gray-medium" />}
              <Layers className="h-4 w-4 shrink-0 text-[#453DD8]" />
              <span className="text-xs font-bold text-neutral-black">{field}</span>
              <span className="text-[11px] text-neutral-gray-medium">
                {rows.length} {rows.length === 1 ? singular.toLowerCase() : `${singular.toLowerCase()}s`}
              </span>
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => { e.stopPropagation(); onAddUnder(field); }}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); onAddUnder(field); } }}
                className="ml-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[#453DD8]/40 text-[#453DD8] bg-[#453DD8]/[0.06] text-[11px] font-semibold hover:bg-[#453DD8]/[0.12] cursor-pointer shrink-0"
              >
                <Plus className="h-3 w-3" /> Add
              </span>
            </button>

            {!isCollapsed && (
              <div className="px-3.5 pb-3.5">
                {rows.length === 0 ? (
                  <p className="text-xs text-neutral-gray-medium rounded-xl border border-dashed border-neutral-gray-light bg-neutral-bg-light/40 px-3.5 py-4 text-center">
                    {emptyHint}
                  </p>
                ) : (
                  <div className="rounded-xl border border-neutral-gray-light overflow-hidden">
                    <OptionsTable
                      options={rows}
                      showPrice={showPrice}
                      priceMode="scheme"
                      categoryPrice={categoryPrice}
                      showNote={showNote}
                      onEdit={onEdit}
                      onDelete={onDelete}
                      onToggleStatus={onToggleStatus}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
