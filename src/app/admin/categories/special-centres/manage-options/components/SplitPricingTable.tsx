'use client';

import { Globe, Pencil, Plus, Tag } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import type { CategoryPrice } from '../data';

interface SplitPricingTableProps {
  price: CategoryPrice;
  /** Singular noun, e.g. "profession", "category", "ownership". */
  itemNoun: string;
  /** Plural noun, e.g. "professions", "categories", "ownerships". */
  itemNounPlural?: string;
  /** Group label, e.g. "African Scientists", "African Centres", "African Institutes". */
  africanTitle?: string;
  /** Group label, e.g. "Non-African Scientists", "Non-African Centres", "Non-African Institutes". */
  nonAfricanTitle?: string;
  /** Optional subtitle/note under the table. */
  footnote?: string;
  onEditAfrican: () => void;
  onEditNonAfrican: () => void;
}

export default function SplitPricingTable({
  price,
  itemNoun,
  itemNounPlural,
  africanTitle = 'African Listings',
  nonAfricanTitle = 'Non-African Listings',
  footnote,
  onEditAfrican,
  onEditNonAfrican,
}: SplitPricingTableProps) {
  const plural = itemNounPlural || `${itemNoun}s`;
  const hasAfrican = Boolean(price.africaOne || price.africaTwoOrMore);
  const hasNonAfrican = Boolean(price.nonAfricaOne || price.nonAfricaTwoOrMore);

  const editButton = (hasValues: boolean, onClick: () => void) => (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#453DD8]/40 text-[#453DD8] bg-white text-[11px] font-semibold hover:bg-[#453DD8]/[0.08] cursor-pointer shrink-0 transition-colors"
    >
      {hasValues ? <Pencil className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
      {hasValues ? 'Edit price' : 'Add price'}
    </button>
  );

  return (
    <div className="rounded-xl border border-neutral-gray-light bg-white overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3.5 border-b border-neutral-gray-light bg-neutral-bg-light/40">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#453DD8]/10 text-[#453DD8]">
          <Tag className="h-4 w-4" />
        </span>
        <div>
          <p className="text-xs font-bold text-neutral-black capitalize">
            {itemNoun} Pricing Structure
          </p>
          <p className="text-[11px] text-neutral-gray-medium">
            Shared pricing tiers for single and multiple {plural} across regions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-gray-light">
        {/* Left Half: African */}
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b border-neutral-gray-light bg-[#453DD8]/[0.04]">
            <Globe className="h-4 w-4 text-[#453DD8]" />
            <span className="text-xs font-bold text-neutral-black">{africanTitle}</span>
            
            {editButton(hasAfrican, onEditAfrican)}
          </div>

          <div className="divide-y divide-neutral-gray-light">
            <div className="flex items-center justify-between px-4 py-4 hover:bg-neutral-bg-light/30 transition-colors">
              <div>
                <p className="text-xs font-semibold text-neutral-black">
                  Price for one {itemNoun}
                </p>
                <p className="text-[11px] text-neutral-gray-medium mt-0.5">
                  Single {itemNoun} selection
                </p>
              </div>
              <span className="text-sm font-bold text-neutral-black">
                {price.africaOne ? formatPrice(price.africaOne) : '—'}
              </span>
            </div>

            <div className="flex items-center justify-between px-4 py-4 hover:bg-neutral-bg-light/30 transition-colors">
              <div>
                <p className="text-xs font-semibold text-neutral-black">
                  Price for more than one {itemNoun}
                </p>
                <p className="text-[11px] text-neutral-gray-medium mt-0.5">
                  Two or more {plural} selected
                </p>
              </div>
              <span className="text-sm font-bold text-neutral-black">
                {price.africaTwoOrMore ? formatPrice(price.africaTwoOrMore) : '—'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Half: Non-African */}
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b border-neutral-gray-light bg-amber-50/50">
            <Globe className="h-4 w-4 text-amber-600" />
            <span className="text-xs font-bold text-neutral-black">{nonAfricanTitle}</span>
            
            {editButton(hasNonAfrican, onEditNonAfrican)}
          </div>

          <div className="divide-y divide-neutral-gray-light">
            <div className="flex items-center justify-between px-4 py-4 hover:bg-neutral-bg-light/30 transition-colors">
              <div>
                <p className="text-xs font-semibold text-neutral-black">
                  Price for one {itemNoun}
                </p>
                <p className="text-[11px] text-neutral-gray-medium mt-0.5">
                  Single {itemNoun} selection
                </p>
              </div>
              <span className="text-sm font-bold text-neutral-black">
                {price.nonAfricaOne ? formatPrice(price.nonAfricaOne) : '—'}
              </span>
            </div>

            <div className="flex items-center justify-between px-4 py-4 hover:bg-neutral-bg-light/30 transition-colors">
              <div>
                <p className="text-xs font-semibold text-neutral-black">
                  Price for more than one {itemNoun}
                </p>
                <p className="text-[11px] text-neutral-gray-medium mt-0.5">
                  Two or more {plural} selected
                </p>
              </div>
              <span className="text-sm font-bold text-neutral-black">
                {price.nonAfricaTwoOrMore ? formatPrice(price.nonAfricaTwoOrMore) : '—'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {footnote && (
        <div className="px-4 py-2.5 border-t border-neutral-gray-light bg-neutral-bg-light/30">
          <p className="text-[11px] text-neutral-gray-dark">{footnote}</p>
        </div>
      )}
    </div>
  );
}
