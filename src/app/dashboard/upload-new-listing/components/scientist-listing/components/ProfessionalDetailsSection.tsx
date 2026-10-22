'use client';

import { useEffect, useRef, useState } from 'react';
import { Upload, FileText, ChevronDown } from 'lucide-react';
import CollapsibleSection from '../../CollapsibleSection';
import {
  SCIENTIST_FIELDS,
  SCIENTIST_DEGREES,
  SCIENTIST_SERVICES,
  PROFESSIONS_BY_FIELD,
} from '@/app/data/mockData';
import { cn } from '@/lib/utils';
import type { ProfessionalDetails } from '../types';
import { toast } from 'sonner';
import { uploadFile } from '@/lib/upload';

const MAX_PROFESSIONS = 4;

interface ProfessionalDetailsSectionProps {
  details: ProfessionalDetails;
  onChange: (patch: Partial<ProfessionalDetails>) => void;
}

// ------ Dropdowns modeled after the afro-innovation listing ------

function MultiSelectField({ label, options, value, onChange, max }: {
  label?: string; options: string[]; value: string[];
  onChange: (v: string[] | ((p: string[]) => string[])) => void; max: number;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);
  const toggle = (opt: string) => {
    onChange(p => {
      const arr = typeof p === 'function' ? (p as (prev: string[]) => string[])(value) : p;
      if (arr.includes(opt)) return arr.filter(f => f !== opt);
      if (arr.length >= max) return arr;
      return [...arr, opt];
    });
  };
  return (
    <div ref={ref}>
      {label && <label className="mb-2 block text-sm font-medium text-neutral-black">{label}</label>}
      <button type="button" onClick={() => setOpen(v => !v)}
        className="flex min-h-10 w-full cursor-pointer items-center justify-between gap-3 rounded-lg border border-neutral-gray-light bg-white px-4 py-2 text-left outline-none focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600">
        <span className={`min-w-0 flex-1 truncate text-xs sm:text-sm ${value.length ? 'text-neutral-black' : 'text-neutral-gray-medium'}`}>
          {value.length ? value.join(', ') : 'Select...'}
        </span>
        <ChevronDown size={15} className={`shrink-0 text-neutral-gray-medium transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <p className="mt-1 text-[11px] text-neutral-gray-medium">{value.length}/{max} selected</p>
      {open && (
        <div className="mt-2 max-h-60 overflow-y-auto rounded-lg border border-neutral-gray-light bg-white p-2 shadow-sm">
          {options.map(opt => {
            const checked = value.includes(opt);
            const disabled = !checked && value.length >= max;
            return (
              <label key={opt} className={`flex cursor-pointer items-start justify-between gap-3 rounded-md px-3 py-2 text-sm ${disabled ? 'text-neutral-gray-light' : 'text-neutral-gray-dark hover:bg-brand-red-50'}`}>
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span className="flex items-center gap-2">
                    <input type="checkbox" checked={checked} disabled={disabled} onChange={() => toggle(opt)} className="mt-0.5 h-3.5 w-3.5 rounded accent-brand-red-600" />
                    <span>{opt}</span>
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

function SingleSelectField({ label, options, value, onChange }: {
  label?: string; options: string[]; value: string; onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);
  return (
    <div ref={ref}>
      {label && <label className="mb-2 block text-sm font-medium text-neutral-black">{label}</label>}
      <button type="button" onClick={() => setOpen(v => !v)}
        className="flex min-h-10 w-full cursor-pointer items-center justify-between gap-3 rounded-lg border border-neutral-gray-light bg-white px-4 py-2 text-left outline-none focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600">
        <span className={`min-w-0 flex-1 truncate text-xs sm:text-sm ${value ? 'text-neutral-black' : 'text-neutral-gray-medium'}`}>
          {value || 'Select...'}
        </span>
        <ChevronDown size={15} className={`shrink-0 text-neutral-gray-medium transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="mt-2 max-h-60 overflow-y-auto rounded-lg border border-neutral-gray-light bg-white p-2 shadow-sm">
          {options.map(opt => (
            <button key={opt} type="button" onClick={() => { onChange(opt); setOpen(false); }}
              className={`flex w-full cursor-pointer flex-col rounded-md px-3 py-2 text-sm text-left ${value === opt ? 'font-semibold text-brand-red-600 bg-brand-red-50' : 'text-neutral-gray-dark hover:bg-brand-red-50'}`}>
              <span>{opt}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProfessionalDetailsSection({ details, onChange }: ProfessionalDetailsSectionProps) {
  const availableProfessions = details.field ? PROFESSIONS_BY_FIELD[details.field] || [] : [];
  const professionList = details.field ? [...availableProfessions, 'Other'] : [];
  const inputClass = 'w-full rounded-lg border border-neutral-gray-light px-4 py-2.5 text-sm focus:border-brand-red-600 focus:ring-1 focus:ring-brand-red-600';

  const handleCertificate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const uploaded = await uploadFile(file);
        onChange({ degreeCertificate: uploaded.url || uploaded.key });
        toast.success('Certificate uploaded');
      } catch {
        toast.error('Failed to upload certificate');
      }
    }
    e.target.value = '';
  };

  return (
    <CollapsibleSection title="Professional details" icon={<FileText className="h-5 w-5 text-brand-red-600" />} badge="Required" defaultOpen={false}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-neutral-black mb-2">Field <span className="text-red-500">*</span> <span className="text-[10px] font-normal text-neutral-gray-medium">(1 selection max)</span></label>
          <p className="mb-2 text-xs text-neutral-gray-medium">What major field of science does your profession fall under?</p>
          <SingleSelectField
            options={SCIENTIST_FIELDS}
            value={details.field}
            onChange={(v) => onChange({ field: v, professions: [], professionOther: '' })}
          />
        </div>

        {details.field ? (
          <div>
            <label className="block text-sm font-medium text-neutral-black mb-2">
              Profession <span className="text-red-500">*</span>
              <span className="text-[10px] font-normal text-neutral-gray-medium"> ({MAX_PROFESSIONS} selections max)</span>
            </label>
            <p className="mb-2 text-xs text-neutral-gray-medium">Select &ldquo;Other&rdquo; to enter any profession of your choice.</p>
            <MultiSelectField
              options={professionList}
              value={details.professions}
              onChange={(v) => {
                const next = typeof v === 'function' ? v(details.professions) : v;
                onChange({
                  professions: next,
                  ...(!next.includes('Other') ? { professionOther: '' } : {}),
                });
              }}
              max={MAX_PROFESSIONS}
            />
            <p className="mt-1.5 text-[11px] text-neutral-gray-medium">{details.professions.length}/{MAX_PROFESSIONS} selected</p>
            {details.professions.includes('Other') && (
              <input
                type="text"
                value={details.professionOther}
                onChange={(e) => onChange({ professionOther: e.target.value })}
                className={`${inputClass} mt-2`}
                placeholder="Specify the other profession"
              />
            )}
          </div>
        ) : (
          <p className="text-xs italic text-neutral-gray-medium">Select a field to see professions.</p>
        )}

        <div>
          <label className="block text-sm font-medium text-neutral-black mb-2">Degree <span className="text-red-500">*</span> <span className="text-[10px] font-normal text-neutral-gray-medium">(1 selection max)</span></label>
          <p className="mb-2 text-xs text-neutral-gray-medium">To verify your academic qualification, kindly upload a copy of your most recent degree certificate. Uploaded documents are securely stored and protected from unauthorized access.</p>
          <SingleSelectField
            options={SCIENTIST_DEGREES}
            value={details.degree}
            onChange={(v) => onChange({ degree: v })}
          />
          <label className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-brand-red-300 px-3 py-2.5 text-xs font-medium text-brand-red-600 transition-colors hover:bg-brand-red-50">
            <input type="file" accept=".pdf,image/*" onChange={handleCertificate} className="hidden" />
            <Upload className="h-3.5 w-3.5" /> {details.degreeCertificate || 'Upload Degree Certificate (to verify academic qualification)'}
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-black mb-2">Services <span className="text-red-500">*</span> <span className="text-[10px] font-normal text-neutral-gray-medium">(multiple selections allowed)</span></label>
          <p className="mb-2 text-xs text-neutral-gray-medium">What kind of services are you hoping to render to clients?</p>
          <MultiSelectField
            options={SCIENTIST_SERVICES}
            value={details.services}
            onChange={(v) => {
              const next = typeof v === 'function' ? v(details.services) : v;
              onChange({ services: next });
            }}
            max={SCIENTIST_SERVICES.length}
          />
          <p className="mt-1.5 text-[11px] text-neutral-gray-medium">{details.services.length} selected</p>
        </div>
      </div>
    </CollapsibleSection>
  );
}
