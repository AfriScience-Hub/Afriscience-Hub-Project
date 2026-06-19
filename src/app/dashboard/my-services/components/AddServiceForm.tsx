'use client';

import { X, Check } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { COST_RANGES } from '../../data';

interface AddServiceFormProps {
  newSvcName: string;
  newSvcDesc: string;
  newSvcCost: string;
  onNameChange: (value: string) => void;
  onDescChange: (value: string) => void;
  onCostChange: (value: string) => void;
  onAdd: () => void;
  onCancel: () => void;
}

export default function AddServiceForm({
  newSvcName, newSvcDesc, newSvcCost,
  onNameChange, onDescChange, onCostChange,
  onAdd, onCancel
}: AddServiceFormProps) {
  return (
    <div className="mb-6 p-5 rounded-xl border-2 border-dashed border-brand-red-300 bg-brand-red-50/30">
      <div className="flex items-center justify-between mb-4">
        <p className="font-bold text-neutral-black">Add New Service</p>
        <button onClick={onCancel}><X className="h-4 w-4 text-neutral-gray-medium" /></button>
      </div>
      <div className="space-y-3">
        <input
          type="text" value={newSvcName} onChange={e => onNameChange(e.target.value)}
          className="w-full rounded-lg border border-neutral-gray-light px-4 py-2.5 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
          placeholder="Service Name *"
        />
        <textarea
          value={newSvcDesc} onChange={e => onDescChange(e.target.value)}
          className="w-full rounded-lg border border-neutral-gray-light px-4 py-2.5 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600 resize-none"
          rows={2} placeholder="Describe this service..."
        />
        <div className="flex items-center gap-3">
          <select
            value={newSvcCost} onChange={e => onCostChange(e.target.value)}
            className="flex-1 rounded-lg border border-neutral-gray-light px-4 py-2.5 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
          >
            <option value="">Cost Range</option>
            {COST_RANGES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <Button size="sm" onClick={onAdd} className="bg-brand-navy-900 hover:bg-brand-navy-800">
            <Check className="h-4 w-4 mr-1" /> Add Service
          </Button>
        </div>
      </div>
    </div>
  );
}
