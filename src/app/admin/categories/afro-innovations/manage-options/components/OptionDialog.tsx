'use client';

import { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import type { ManagedOption } from '../data';
import { TABS_WITHOUT_NOTE } from '../data';
import { priceToInput, priceToStorage } from '@/lib/utils';

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (
    payload: { content: string; type: string; notes?: string; price?: string },
    isEdit: boolean,
    id?: string
  ) => void | Promise<void>;
  initial: ManagedOption | null;
  tabLabel: string;
  tabType: string;
  /** Show the price field (only the STAGE option type accepts a price). */
  showPrice?: boolean;
  /** True while the save request is in flight. */
  saving?: boolean;
  /** Error from the last save attempt, shown inside the modal. */
  error?: string | null;
}

export default function OptionDialog({
  open, onClose, onSave, initial, tabLabel, tabType,
  showPrice = false, saving = false, error = null,
}: Props) {
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [price, setPrice] = useState('');

  const showNote = !TABS_WITHOUT_NOTE.includes(tabLabel as any);

  useEffect(() => {
    if (open) {
      setName(initial?.name ?? '');
      setNote(initial?.note ?? '');
      // The stored price is in the smallest unit - show it divided by 100.
      setPrice(priceToInput(initial?.price));
    }
  }, [open, initial]);

  if (!open) return null;

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error('Name is required');
      return;
    }
    const payload: { content: string; type: string; notes?: string; price?: string } = {
      content: name.trim(),
      type: tabType,
    };
    if (showNote && note.trim()) {
      payload.notes = note.trim();
    }
    // The API only accepts a price for the STAGE option type, and stores it
    // in the smallest unit - so convert the displayed value back.
    if (showPrice && price.trim()) {
      payload.price = priceToStorage(price);
    }
    // The parent owns the request, the toast and closing the modal, so the
    // user only ever sees one notification and errors stay in this dialog.
    await onSave(payload, Boolean(initial), initial?.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-gray-light">
          <h3 className="text-sm font-bold text-neutral-black">{initial ? 'Edit' : 'Add'} {tabLabel.slice(0, -1) || tabLabel}</h3>
          <button
            onClick={onClose}
            disabled={saving}
            className="h-8 w-8 rounded-full bg-neutral-bg-light hover:bg-neutral-gray-light flex items-center justify-center cursor-pointer disabled:opacity-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-5 space-y-4">
          {error && (
            <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
              {error}
            </p>
          )}
          <label className="block space-y-1">
            <span className="text-xs font-semibold text-neutral-black">Name *</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={`e.g. ${tabLabel} name`}
              className="w-full px-3 py-2.5 rounded-xl border border-neutral-gray-light text-sm focus:ring-2 focus:ring-[#453DD8] focus:border-[#453DD8] outline-none"
              autoFocus
              disabled={saving}
            />
          </label>
          {showPrice && (
            <label className="block space-y-1">
              <span className="text-xs font-semibold text-neutral-black">Price</span>
              <input
                type="number"
                min="0"
                step="any"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 50"
                className="w-full px-3 py-2.5 rounded-xl border border-neutral-gray-light text-sm focus:ring-2 focus:ring-[#453DD8] focus:border-[#453DD8] outline-none"
                disabled={saving}
              />
            </label>
          )}
          {showNote && (
            <label className="block space-y-1">
              <span className="text-xs font-semibold text-neutral-black flex items-center gap-1">
                Note
                <span title="Extra information shown as an info tooltip beside the option." className="cursor-help text-[#453DD8]">&#9432;</span>
              </span>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                placeholder="Extra info shown as an info tooltip beside this option..."
                className="w-full px-3 py-2.5 rounded-xl border border-neutral-gray-light text-sm focus:ring-2 focus:ring-[#453DD8] focus:border-[#453DD8] outline-none resize-none"
                disabled={saving}
              />
            </label>
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
            disabled={saving || !name.trim()}
            className="px-5 py-2 rounded-xl bg-[#453DD8] text-white text-xs font-semibold hover:bg-[#3a33c0] cursor-pointer disabled:opacity-50 inline-flex items-center gap-1.5"
          >
            {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            {saving ? 'Saving...' : (initial ? 'Update' : 'Add')}
          </button>
        </div>
      </div>
    </div>
  );
}
