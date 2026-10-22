'use client';

import { useState, useRef } from 'react';
import { Plus, X, FileText, Upload, Download } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/app/components/ui/Button';
import { cn } from '@/lib/utils';
import { uploadFile } from '@/lib/upload';
import type { DownloadableResources, ResourceEntry } from '../types';

interface DownloadableResourcesSectionProps {
  data: DownloadableResources;
  onChange: (patch: Partial<DownloadableResources>) => void;
}

export default function DownloadableResourcesSection({ data, onChange }: DownloadableResourcesSectionProps) {
  const sections = [
    { key: 'brochures' as const, label: 'School brochure & prospectus', hint: 'Upload the school\'s brochure/prospectus for public use' },
    { key: 'curricula' as const, label: 'Subject curriculum', hint: 'Upload the school\'s subject curriculum for public use' },
    { key: 'timetables' as const, label: 'School timetable', hint: 'Upload the school\'s teaching timetable for public use' },
    { key: 'feeStructures' as const, label: 'Fee structure', hint: 'Upload the school\'s fee structure for public use' },
    { key: 'policies' as const, label: 'School policies', hint: 'Upload a copy of the school\'s policies for public use' },
    { key: 'admissionForms' as const, label: 'Admission form', hint: 'Upload a copy of the school\'s admission form for public use' },
    { key: 'others' as const, label: 'Others', hint: 'Upload any other relevant document of the school that is for public use' },
  ];

  return (
    <div className="space-y-6">
      {sections.map((section, sectionIdx) => (
        <div key={section.key} className={sectionIdx > 0 ? 'border-t border-neutral-gray-light pt-6' : ''}>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-brand-red-600" />
            <h4 className="text-sm font-medium text-neutral-black">{section.label}</h4>
          </div>
          <p className="text-xs text-neutral-gray-medium mb-4">{section.hint}</p>
          <ResourceList
            label="Document"
            addLabel={`Add ${section.label}`}
            entries={data[section.key]}
            onChange={(entries) => onChange({ [section.key]: entries })}
          />
        </div>
      ))}
    </div>
  );
}

function ResourceList({ label, addLabel, entries, onChange }: { label: string; addLabel: string; entries: ResourceEntry[]; onChange: (entries: ResourceEntry[]) => void }) {
  const inputClass = 'w-full rounded-lg border border-neutral-gray-light px-3 py-2.5 text-sm focus:border-brand-red-600 focus:ring-1 focus:ring-brand-red-600';

  const update = (idx: number, patch: Partial<ResourceEntry>) => {
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

  function truncateName(name: string, max = 30): string {
    if (name.length <= max) return name;
    const ext = name.split('.').pop() || '';
    const base = name.slice(0, name.length - ext.length - 1);
    return `${base.slice(0, max - ext.length - 3)}...${ext}`;
  }

  return (
    <div>
      <label className="block text-sm font-medium text-neutral-black mb-1">{label} <span className="text-red-500">*</span> <span className="text-[10px] font-normal text-neutral-gray-medium">(multiple entries allowed)</span></label>
      <p className="text-xs text-neutral-gray-medium mb-3">Uploads should be made downloadable</p>
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
              <input type="text" value={entry.title} onChange={(e) => update(idx, { title: e.target.value })} className={inputClass} placeholder="Title" />
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
          onChange([...entries, { title: '', file: null, previewUrl: null }]);
        }}
      >
        <Plus className="mr-1 h-4 w-4" /> {addLabel}
      </Button>
    </div>
  );
}