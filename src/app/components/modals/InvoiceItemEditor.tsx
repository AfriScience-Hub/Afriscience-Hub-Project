'use client';

import { Trash2 } from 'lucide-react';

export interface InvoiceItemDraft {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

interface InvoiceItemEditorProps {
  item: InvoiceItemDraft;
  index: number;
  canRemove: boolean;
  onChange: (id: string, field: 'description' | 'quantity' | 'rate', value: string | number) => void;
  onRemove: (id: string) => void;
}

/** One editable line item inside the create-invoice modal. */
export default function InvoiceItemEditor({ item, index, canRemove, onChange, onRemove }: InvoiceItemEditorProps) {
  const amount = (Number(item.quantity) || 0) * (Number(item.rate) || 0);

  return (
    <div className="p-4 rounded-xl border border-neutral-gray-light bg-neutral-bg-light/50">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-bold text-neutral-gray-medium uppercase">Item {index + 1}</p>
        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="text-red-600 hover:text-red-700 transition-colors cursor-pointer"
            aria-label="Remove item"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="space-y-3">
        <input
          type="text"
          value={item.description}
          onChange={(event) => onChange(item.id, 'description', event.target.value)}
          placeholder="Service or product description"
          className="w-full px-4 py-2.5 rounded-lg border border-neutral-gray-light focus:ring-2 focus:ring-brand-red-600 focus:border-brand-red-600 transition-all"
          required
        />

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs text-neutral-gray-medium mb-1.5">Quantity</label>
            <input
              type="number"
              value={item.quantity}
              onChange={(event) => onChange(item.id, 'quantity', parseFloat(event.target.value) || 0)}
              min="0"
              step="0.01"
              className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light focus:ring-2 focus:ring-brand-red-600 focus:border-brand-red-600 transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-xs text-neutral-gray-medium mb-1.5">Rate</label>
            <input
              type="number"
              value={item.rate}
              onChange={(event) => onChange(item.id, 'rate', parseFloat(event.target.value) || 0)}
              min="0"
              step="0.01"
              className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light focus:ring-2 focus:ring-brand-red-600 focus:border-brand-red-600 transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-xs text-neutral-gray-medium mb-1.5">Amount</label>
            <div className="px-3 py-2 rounded-lg bg-neutral-bg-light border border-neutral-gray-light font-bold text-neutral-black">
              {amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
