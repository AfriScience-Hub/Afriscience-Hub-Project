'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import type { CategoryPrice } from '../data';
import { priceToInput, priceToStorage } from '@/lib/utils';

interface Props {
  open: boolean;
  onClose: () => void;
  initial: CategoryPrice;
  onSave: (price: CategoryPrice) => void;
  /** Noun for the option the price applies to, e.g. "category" or "profession". */
  title?: string;
}

const hasValue = (p: CategoryPrice) =>
  Boolean(p.africaOne || p.africaTwoOrMore || p.nonAfricaOne || p.nonAfricaTwoOrMore);

/**
 * Sets the single price shared by every option, split per country group:
 * one rate for a single option and a higher rate for two or more, each
 * defined separately for African and non-African listings.
 */
export default function CategoryPriceDialog({ open, onClose, initial, onSave, title = 'category' }: Props) {
  const [africaOne, setAfricaOne] = useState('');
  const [africaTwoOrMore, setAfricaTwoOrMore] = useState('');
  const [nonAfricaOne, setNonAfricaOne] = useState('');
  const [nonAfricaTwoOrMore, setNonAfricaTwoOrMore] = useState('');

  useEffect(() => {
    if (open) {
      setAfricaOne(priceToInput(initial.africaOne));
      setAfricaTwoOrMore(priceToInput(initial.africaTwoOrMore));
      setNonAfricaOne(priceToInput(initial.nonAfricaOne));
      setNonAfricaTwoOrMore(priceToInput(initial.nonAfricaTwoOrMore));
    }
  }, [open, initial]);

  if (!open) return null;

  const isEdit = hasValue(initial);

  const handleSave = () => {
    if (![africaOne, africaTwoOrMore, nonAfricaOne, nonAfricaTwoOrMore].some((v) => v.trim())) {
      toast.error('Enter a price for at least one of the four fields');
      return;
    }
    onSave({
      africaOne: africaOne.trim() ? priceToStorage(africaOne) : undefined,
      africaTwoOrMore: africaTwoOrMore.trim() ? priceToStorage(africaTwoOrMore) : undefined,
      nonAfricaOne: nonAfricaOne.trim() ? priceToStorage(nonAfricaOne) : undefined,
      nonAfricaTwoOrMore: nonAfricaTwoOrMore.trim() ? priceToStorage(nonAfricaTwoOrMore) : undefined,
    });
    toast.success(`Category price ${isEdit ? 'updated' : 'created'}`);
    onClose();
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

  const group = (title: string, children: React.ReactNode) => (
    <div className="rounded-xl border border-neutral-gray-light bg-neutral-bg-light/40 p-3.5 space-y-3">
      <p className="text-xs font-bold text-neutral-black">{title}</p>
      {children}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-gray-light">
          <h3 className="text-sm font-bold text-neutral-black">{isEdit ? 'Edit' : 'Create'} price</h3>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-full bg-neutral-bg-light hover:bg-neutral-gray-light flex items-center justify-center cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-5 space-y-4 overflow-y-auto">
          {group('African countries', (
            <>
              {field(`Price for one ${title}`, africaOne, setAfricaOne, 'e.g. 50')}
              {field(`Price for two or more ${title}s`, africaTwoOrMore, setAfricaTwoOrMore, 'e.g. 80')}
            </>
          ))}

          {group('Non-African countries', (
            <>
              {field(`Price for one ${title}`, nonAfricaOne, setNonAfricaOne, 'e.g. 120')}
              {field(`Price for two or more ${title}s`, nonAfricaTwoOrMore, setNonAfricaTwoOrMore, 'e.g. 160')}
            </>
          ))}
        </div>

        <div className="flex gap-2 justify-end px-5 py-4 border-t border-neutral-gray-light">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-neutral-gray-light text-xs font-semibold hover:bg-neutral-bg-light cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-[#453DD8] text-white text-xs font-semibold hover:bg-[#3a33c0] cursor-pointer"
          >
            {isEdit ? 'Update price' : 'Save price'}
          </button>
        </div>
      </div>
    </div>
  );
}
