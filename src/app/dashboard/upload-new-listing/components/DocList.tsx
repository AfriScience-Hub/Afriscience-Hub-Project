'use client';

import { Plus, X, FileText, Upload } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { YEARS } from '../data';

export interface DocEntry {
  name: string;
  issuer: string;
  year: string;
  file: File | null;
  previewUrl: string | null;
}

interface DocListProps {
  label: string;
  addLabel: string;
  entries: DocEntry[];
  onChange: (entries: DocEntry[]) => void;
  addButtonClassName?: string;
  namePlaceholder?: string;
  /** Explanatory text shown directly below the section label. */
  hint?: string;
}

export const EMPTY_DOC: DocEntry = { name: '', issuer: '', year: '', file: null, previewUrl: null };

function truncateName(name: string, max = 30): string {
  if (name.length <= max) return name;
  const ext = name.split('.').pop() || '';
  const base = name.slice(0, name.length - ext.length - 1);
  return `${base.slice(0, max - ext.length - 3)}...${ext}`;
}

export default function DocList({ label, addLabel, entries, onChange, addButtonClassName, namePlaceholder, hint }: DocListProps) {
  const inputClass = 'w-full rounded-lg border border-neutral-gray-light px-3 py-2.5 text-sm focus:border-brand-red-600 focus:ring-1 focus:ring-brand-red-600';

  const update = (idx: number, patch: Partial<DocEntry>) => {
    onChange(entries.map((entry, i) => (i === idx ? { ...entry, ...patch } : entry)));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      update(idx, { file, previewUrl });
      toast.success('Document added');
    }
    e.target.value = '';
  };

  const removeFile = (idx: number) => {
    onChange(entries.map((entry, i) => {
      if (i === idx) {
        if (entry.previewUrl?.startsWith('blob:')) URL.revokeObjectURL(entry.previewUrl);
        return { ...entry, file: null, previewUrl: null };
      }
      return entry;
    }));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-neutral-black mb-1">{label} <span className="text-red-500">*</span> <span className="text-[10px] font-normal text-neutral-gray-medium">(multiple entries allowed)</span></label>
      {hint && <p className="mb-2 text-xs text-neutral-gray-medium">{hint}</p>}
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
              <input type="text" value={entry.name} onChange={(e) => update(idx, { name: e.target.value })} className={inputClass} placeholder={namePlaceholder || `${label} name`} />
              <div className="grid grid-cols-2 gap-2">
                <input type="text" value={entry.issuer} onChange={(e) => update(idx, { issuer: e.target.value })} className={inputClass} placeholder="Issued by" />
                <select value={entry.year} onChange={(e) => update(idx, { year: e.target.value })} className={`${inputClass} cursor-pointer`}>
                  <option value="">Year</option>
                  {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <label className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-brand-red-300 px-3 py-2 text-xs font-medium text-brand-red-600 transition-colors hover:bg-brand-red-50">
                <input type="file" accept=".pdf,image/*" onChange={(e) => handleFile(e, idx)} className="hidden" />
                <Upload className="h-3.5 w-3.5" /> {entry.previewUrl ? 'File added' : 'Upload Document'}
              </label>
              {entry.previewUrl && (
                <p className="flex items-center gap-1 text-[11px] text-neutral-gray-medium truncate max-w-[250px]">
                  <FileText className="h-3 w-3" /> {truncateName(entry.file?.name || 'File')}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      <Button
        type="button"
        size="sm"
        variant="outline"
        className={cn("mt-3 border", addButtonClassName)}
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
