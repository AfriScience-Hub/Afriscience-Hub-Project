'use client';

import { useState } from 'react';
import { Info, X, CheckCircle2 } from 'lucide-react';
import { SPONSORSHIP_TIERS, TIER_BENEFITS } from '../data';

interface TierSelectionSectionProps {
  selectedTier: string;
  onTierChange: (tier: string) => void;
}

export function TierSelectionSection({ selectedTier, onTierChange }: TierSelectionSectionProps) {
  const [infoTier, setInfoTier] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light p-8">
      <h2 className="text-xl font-bold text-neutral-black mb-6">Sponsorship Tier *</h2>
      <p className="text-xs text-neutral-gray-medium mb-4">Choose the sponsorship tier that best suits your organization. Only one (1) tier can be selected.</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SPONSORSHIP_TIERS.map(tier => (
          <label
            key={tier.name}
            className={`relative rounded-xl border-2 p-4 cursor-pointer transition-all ${
              selectedTier === tier.name
                ? 'border-brand-red-600 bg-brand-red-50 ring-1 ring-brand-red-600'
                : 'border-neutral-gray-light hover:border-neutral-gray-medium'
            }`}
          >
            <input
              type="radio"
              name="tier"
              value={tier.name}
              checked={selectedTier === tier.name}
              onChange={() => onTierChange(tier.name)}
              className="sr-only"
            />
            <div className="text-center">
              <div className="text-3xl mb-1">{tier.badge}</div>
              <h3 className="font-bold text-neutral-black">{tier.name}</h3>
              <p className="text-brand-red-600 font-semibold text-sm mt-1">{tier.amount}</p>
              <p className="text-xs text-neutral-gray-medium mt-1">{tier.benefits}</p>
            </div>
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); setInfoTier(tier.name); }}
              className="cursor-pointer absolute top-2 right-2 p-1 text-neutral-gray-medium hover:text-brand-red-600 transition-colors"
              title="View benefits"
            >
              <Info className="h-4 w-4" />
            </button>
            {selectedTier === tier.name && (
              <div className="absolute top-2 left-2">
                <CheckCircle2 className="h-4 w-4 text-brand-red-600" />
              </div>
            )}
          </label>
        ))}
      </div>

      {infoTier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setInfoTier(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-neutral-black">{infoTier} Benefits</h3>
              <button onClick={() => setInfoTier(null)} className="cursor-pointer text-neutral-gray-medium hover:text-neutral-black">
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="space-y-2.5">
              {TIER_BENEFITS[infoTier]?.map((benefit, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-neutral-gray-dark">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>
            <button
              onClick={() => { onTierChange(infoTier); setInfoTier(null); }}
              className="cursor-pointer w-full mt-6 h-11 rounded-xl bg-brand-red-600 text-white font-medium hover:bg-brand-red-700 transition-colors"
            >
              Select {infoTier}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
