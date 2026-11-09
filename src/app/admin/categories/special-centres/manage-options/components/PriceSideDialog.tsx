'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { priceToInput, priceToStorage } from '@/lib/utils';

export type PriceSide = 'african' | 'nonAfrican';

interface Props {
  open: boolean;
  side: PriceSide | null;
  /** Stored (smallest-unit) values for the selected side. */
  one?: string;
  twoOrMore?: string;
  /** Stored (smallest-unit) additional charge for the selected side. */
  extraCharge?: string;
  /** Render the additional-charge input (scientists Price tab). */
  showExtraCharge?: boolean;
  /** Singular noun used in the labels, e.g. "profession". */
  itemNoun: string;
  onClose: () => void;
  onSave: (
    side: PriceSide,
    values: { one?: string; twoOrMore?: string; extraCharge?: string },
  ) => void | Promise<void>;
}

/**
 * Edits the two prices (one item / more than one) for a single region, plus an
 * optional additional charge. The region is preset by the button that opened
 * the modal. Values are shown divided by 100 but saved exactly as typed.
 */
export default function PriceSideDialog({
  open, side, one, twoOrMore, extraCharge, showExtraCharge, itemNoun, onClose, onSave,
}: Props) {
  const [oneValue, setOneValue] = useState('');
  const [multipleValue, setMultipleValue] = useState('');
  const [chargeValue, setChargeValue] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setOneValue(priceToInput(one));
      setMultipleValue(priceToInput(twoOrMore));
      setChargeValue(priceToInput(extraCharge));
    }
  }, [open, side, one, twoOrMore, extraCharge]);

  if (!open || !side) return null;

  const isAfrican = side === 'african';
  const sideLabel = isAfrican ? 'African' : 'Non-African';

  const handleSave = async () => {
    if (!oneValue.trim() && !multipleValue.trim()) {
      toast.error('Enter a price for at least one of the two fields');
      return;
    }
    setSaving(true);
    try {
      await onSave(side, {
        one: oneValue.trim() ? priceToStorage(oneValue) : undefined,
        twoOrMore: multipleValue.trim() ? priceToStorage(multipleValue) : undefined,
        ...(showExtraCharge
          ? { extraCharge: chargeValue.trim() ? priceToStorage(chargeValue) : '' }
          : {}),
      });
      toast.success(`${sideLabel} price saved`);
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save price');
    } finally {
      setSaving(false);
    }
  };

  const field = (label: string, value: string, setter: (v: string) => void, placeholder: string) => (
    <label className="block space-y-1">
      <span className="text-[11px] font-semibold text-neutral-gray-dark">{label}</span>
      <input
        type="number"
        min="0"
        step="any"
        value={value}
        onChange={(e) => setter(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 rounded-xl border border-neutral-gray-light text-sm focus:ring-2 focus:ring-[#453DD8] focus:border-[#453DD8] outline-none"
      />
    </label>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-gray-light">
          <h3 className="text-sm font-bold text-neutral-black">{sideLabel} pricing</h3>
          <button
            onClick={onClose}
            disabled={saving}
            className="h-8 w-8 rounded-full bg-neutral-bg-light hover:bg-neutral-gray-light flex items-center justify-center cursor-pointer disabled:opacity-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-5 space-y-3 overflow-y-auto">
          {field(`Price for one ${itemNoun}`, oneValue, setOneValue, 'e.g. 50')}
          {field(`Price for more than one ${itemNoun}`, multipleValue, setMultipleValue, 'e.g. 80')}
          {showExtraCharge && (
            <div className="space-y-1">
              {field(
                `Additional ${sideLabel} charge`,
                chargeValue,
                setChargeValue,
                'e.g. 10 (optional)',
              )}
              <p className="text-[11px] text-neutral-gray-medium">
                Added on top of these listing prices for {sideLabel} listings.
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-2 justify-end px-5 py-4 border-t border-neutral-gray-light">
          <button
            onClick={onClose}
            disabled={saving}
            className="px-4 py-2 rounded-xl border border-neutral-gray-light text-xs font-semibold hover:bg-neutral-bg-light cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2 rounded-xl bg-[#453DD8] text-white text-xs font-semibold hover:bg-[#3a33c0] cursor-pointer disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save price'}
          </button>
        </div>
      </div>
    </div>
  );
}
