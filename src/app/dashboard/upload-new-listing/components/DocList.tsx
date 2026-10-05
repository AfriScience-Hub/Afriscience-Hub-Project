'use client';

import { Plus, X, FileText, Upload } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { toast } from 'sonner';
import { YEARS } from '../data';

export interface DocEntry {
  name: string;
  issuer: string;
  year: string;
  file: string;
}

interface DocListProps {
  label: string;
  addLabel: string;
  entries: DocEntry[];
  onChange: (entries: DocEntry[]) => void;
}

const EMPTY_DOC: DocEntry = { name: '', issuer: '', year: '', file: '' };

export default function DocList({ label, addLabel, entries, onChange }: DocListProps) {
  const inputClass = 'w-full rounded-lg border border-neutral-gray-light px-3 py-2.5 text-sm focus:border-brand-red-600 focus:ring-1 focus:ring-brand-red-600';

  const update = (idx: number, patch: Partial<DocEntry>) => {
    onChange(entries.map((entry, i) => (i === idx ? { ...entry, ...patch } : entry)));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const file = e.target.files?.[0];
    if (file) update(idx, { file: file.name });
    e.target.value = '';
  };

  return (
    <div>
      <label className="block text-sm font-medium text-neutral-black mb-1">{label} <span className="text-red-500">*</span> <span className="text-[10px] font-normal text-neutral-gray-medium">(multiple entries allowed)</span></label>
      <div className="space-y-3">
        {entries.map((entry, idx) => (
          <div key={idx} className="rounded-lg border border-neutral-gray-light bg-neutral-bg-light/50 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-neutral-gray-medium">
                <FileText className="h-3.5 w-3.5" /> {label} {idx + 1}
              </span>
              <button type="button" onClick={() => onChange(entries.filter((_, i) => i !== idx))} className="cursor-pointer text-red-400 hover:text-red-600">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-2">
              <input type="text" value={entry.name} onChange={(e) => update(idx, { name: e.target.value })} className={inputClass} placeholder={`${label} name`} />
              <div className="grid grid-cols-2 gap-2">
                <input type="text" value={entry.issuer} onChange={(e) => update(idx, { issuer: e.target.value })} className={inputClass} placeholder="Issued by" />
                <select value={entry.year} onChange={(e) => update(idx, { year: e.target.value })} className={`${inputClass} cursor-pointer`}>
                  <option value="">Year</option>
                  {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <label className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-brand-red-300 px-3 py-2 text-xs font-medium text-brand-red-600 transition-colors hover:bg-brand-red-50">
                <input type="file" accept=".pdf,image/*" onChange={(e) => handleFile(e, idx)} className="hidden" />
                <Upload className="h-3.5 w-3.5" /> {entry.file || 'Upload Document'}
              </label>
              {entry.file && <p className="flex items-center gap-1 text-[11px] text-neutral-gray-medium"><FileText className="h-3 w-3" /> {entry.file}</p>}
            </div>
          </div>
        ))}
      </div>
      <Button
        type="button"
        size="sm"
        variant="outline"
        className="mt-3 border-dashed"
        onClick={() => {
          if (entries.length >= 20) return toast.error('Maximum number of entries reached');
          onChange([...entries, { ...EMPTY_DOC }]);
        }}
      >
        <Plus className="mr-1 h-4 w-4" /> {addLabel}
      </Button>
    </div>
  );
}
