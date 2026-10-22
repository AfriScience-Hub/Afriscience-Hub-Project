'use client';

import { useState, useRef } from 'react';
import { Plus, X, FileText, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/app/components/ui/Button';
import { cn } from '@/lib/utils';
import { uploadFile } from '@/lib/upload';
import { YEARS } from '../data';
import type { LicensesAchievements, DocEntry, AlumniEntry } from '../types';

interface LicensesAchievementsSectionProps {
  data: LicensesAchievements;
  onChange: (patch: Partial<LicensesAchievements>) => void;
}

export default function LicensesAchievementsSection({ data, onChange }: LicensesAchievementsSectionProps) {
  return (
    <div className="space-y-6">
      {/* LICENSES & CERTIFICATIONS */}
      <div className="flex items-center gap-2">
        <FileText className="h-4 w-4 text-brand-navy-900" />
        <h4 className="text-sm font-medium text-neutral-black">Licenses & certifications</h4>
      </div>
      <p className="text-xs text-neutral-gray-medium mb-4">Upload valid licenses or certifications of the school to further authenticate it. Uploaded documents are securely stored and protected from unauthorized access.</p>
      <DocList
        label="File"
        addLabel="Add License / Certification"
        entries={data.licenses}
        onChange={(entries) => onChange({ licenses: entries })}
        namePlaceholder="License/Certification Name"
      />

      {/* ACHIEVEMENTS & HONORARY AWARDS */}
      <div className="flex items-center gap-2 border-t border-neutral-gray-light pt-6">
        <FileText className="h-4 w-4 text-amber-500" />
        <h4 className="text-sm font-medium text-neutral-black">Achievements & honorary awards</h4>
      </div>
      <p className="text-xs text-neutral-gray-medium mb-4">Upload a copy of the achievements/honorary awards obtained by the school (if any). Uploaded documents are securely stored and protected from unauthorized access.</p>
      <DocList
        label="Achievement"
        addLabel="Add Achievement / Award"
        entries={data.achievements}
        onChange={(entries) => onChange({ achievements: entries })}
        namePlaceholder="Achievement/Award Name"
      />

      {/* NOTABLE ALUMNI */}
      <div className="flex items-center gap-2 border-t border-neutral-gray-light pt-6">
        <FileText className="h-4 w-4 text-brand-red-600" />
        <h4 className="text-sm font-medium text-neutral-black">Notable alumni</h4>
      </div>
      <p className="text-xs text-neutral-gray-medium mb-4">Provide information of notable alumni of the school with positive societal impact</p>
      <AlumniList
        entries={data.notableAlumni}
        onChange={(entries) => onChange({ notableAlumni: entries })}
      />
    </div>
  );
}

function DocList({ label, addLabel, entries, onChange, namePlaceholder }: { label: string; addLabel: string; entries: DocEntry[]; onChange: (entries: DocEntry[]) => void; namePlaceholder?: string }) {
  const inputClass = 'w-full rounded-lg border border-neutral-gray-light px-3 py-2.5 text-sm focus:border-brand-red-600 focus:ring-1 focus:ring-brand-red-600';

  const update = (idx: number, patch: Partial<DocEntry>) => {
    onChange(entries.map((entry, i) => (i === idx ? { ...entry, ...patch } : entry)));
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const uploaded = await uploadFile(file);
        update(idx, { file, previewUrl: uploaded.url });
        toast.success('Document uploaded');
      } catch {
        toast.error('Failed to upload document');
      }
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

  function truncateName(name: string, max = 30): string {
    if (name.length <= max) return name;
    const ext = name.split('.').pop() || '';
    const base = name.slice(0, name.length - ext.length - 1);
    return `${base.slice(0, max - ext.length - 3)}...${ext}`;
  }

  return (
    <div>
      <label className="block text-sm font-medium text-neutral-black mb-1">{label} <span className="text-red-500">*</span> <span className="text-[10px] font-normal text-neutral-gray-medium">(multiple entries allowed)</span></label>
      <div className="space-y-3">
        {entries.map((entry, idx) => (
          <div key={idx} className="rounded-lg border border-neutral-gray-light bg-neutral-bg-light/50 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-medium text-neutral-gray-medium">
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
        className={cn("mt-3 border")}
        onClick={() => {
          if (entries.length >= 20) return toast.error('Maximum number of entries reached');
          onChange([...entries, { name: '', issuer: '', year: '', file: null, previewUrl: null }]);
        }}
      >
        <Plus className="mr-1 h-4 w-4" /> {addLabel}
      </Button>
    </div>
  );
}

function AlumniList({ entries, onChange }: { entries: AlumniEntry[]; onChange: (entries: AlumniEntry[]) => void }) {
  const inputClass = 'w-full rounded-lg border border-neutral-gray-light px-3 py-2.5 text-sm focus:border-brand-red-600 focus:ring-1 focus:ring-brand-red-600';

  const update = (idx: number, patch: Partial<AlumniEntry>) => {
    onChange(entries.map((entry, i) => (i === idx ? { ...entry, ...patch } : entry)));
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      try {
        const uploaded = await uploadFile(file);
        update(idx, { displayPicture: file, previewUrl: uploaded.url });
        toast.success('Image uploaded');
      } catch {
        toast.error('Failed to upload image');
      }
    }
    e.target.value = '';
  };

  const handleImpactChange = (idx: number, value: string) => {
    const words = value.trim().split(/\s+/).filter(Boolean);
    if (words.length > 10) {
      toast.error('Impact must be 10 words max.');
      return;
    }
    update(idx, { impact: value });
  };

  const removeFile = (idx: number) => {
    onChange(entries.map((entry, i) => {
      if (i === idx) {
        if (entry.previewUrl?.startsWith('blob:')) URL.revokeObjectURL(entry.previewUrl);
        return { ...entry, displayPicture: null, previewUrl: null };
      }
      return entry;
    }));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-neutral-black mb-1">Alumni <span className="text-red-500">*</span> <span className="text-[10px] font-normal text-neutral-gray-medium">(multiple entries allowed)</span></label>
      <p className="text-xs text-neutral-gray-medium mb-3">10 words max. for impact</p>
      <div className="space-y-3">
        {entries.map((entry, idx) => (
          <div key={idx} className="rounded-lg border border-neutral-gray-light bg-neutral-bg-light/50 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-medium text-neutral-gray-medium">
                Alumni {idx + 1}
              </span>
              <button type="button" onClick={() => onChange(entries.filter((_, i) => i !== idx))} className="cursor-pointer text-red-400 hover:text-red-600">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-2">
              <input type="text" value={entry.fullName} onChange={(e) => update(idx, { fullName: e.target.value })} className={inputClass} placeholder="Full name" />
              <input type="text" value={entry.impact} onChange={(e) => handleImpactChange(idx, e.target.value)} className={inputClass} placeholder="Impact (10 words max.)" />
              <label className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-brand-red-300 px-3 py-2 text-xs font-medium text-brand-red-600 transition-colors hover:bg-brand-red-50">
                <input type="file" accept="image/*" onChange={(e) => handleFile(e, idx)} className="hidden" />
                <Upload className="h-3.5 w-3.5" /> {entry.previewUrl ? 'Image added' : 'Upload Display Picture'}
              </label>
              {entry.previewUrl && (
                <p className="flex items-center gap-1 text-[11px] text-neutral-gray-medium truncate max-w-[250px]">
                  <FileText className="h-3 w-3" /> {entry.displayPicture?.name || 'Image'}
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
        className="mt-3 border"
        onClick={() => {
          if (entries.length >= 20) return toast.error('Maximum number of entries reached');
          onChange([...entries, { fullName: '', impact: '', displayPicture: null, previewUrl: null }]);
        }}
      >
        <Plus className="mr-1 h-4 w-4" /> Add Alumni
      </Button>
    </div>
  );
}