'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import type { ManagedOption } from '../data';

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (opt: ManagedOption) => void;
  initial: ManagedOption | null;
  tabLabel: string;
}

export default function OptionDialog({ open, onClose, onSave, initial, tabLabel }: Props) {
  const [name, setName] = useState('');

  useEffect(() => {
    if (open) setName(initial?.name ?? '');
  }, [open, initial]);

  if (!open) return null;

  const handleSave = () => {
    if (!name.trim()) {
      toast.error('Name is required');
      return;
    }
    if (initial) onSave({ ...initial, name: name.trim() });
    else onSave({ id: `${Date.now()}`, name: name.trim(), status: 'Active', count: 0 });
    toast.success(initial ? 'Option updated' : 'Option added');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-gray-light">
          <h3 className="text-sm font-bold text-neutral-black">{initial ? 'Edit' : 'Add'} {tabLabel.slice(0, -1) || tabLabel}</h3>
          <button onClick={onClose} className="h-8 w-8 rounded-full bg-neutral-bg-light hover:bg-neutral-gray-light flex items-center justify-center cursor-pointer">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-5 space-y-4">
          <label className="block space-y-1">
            <span className="text-xs font-semibold text-neutral-black">Name *</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={`e.g. ${tabLabel} name`}
              className="w-full px-3 py-2.5 rounded-xl border border-neutral-gray-light text-sm focus:ring-2 focus:ring-[#453DD8] focus:border-[#453DD8] outline-none"
              autoFocus
            />
          </label>
        </div>
        <div className="flex gap-2 justify-end px-5 py-4 border-t border-neutral-gray-light">
          <button onClick={onClose} className="px-4 py-2 rounded-xl border border-neutral-gray-light text-xs font-semibold hover:bg-neutral-bg-light cursor-pointer">
            Cancel
          </button>
          <button onClick={handleSave} className="px-5 py-2 rounded-xl bg-[#453DD8] text-white text-xs font-semibold hover:bg-[#3a33c0] cursor-pointer">
            {initial ? 'Update' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}
