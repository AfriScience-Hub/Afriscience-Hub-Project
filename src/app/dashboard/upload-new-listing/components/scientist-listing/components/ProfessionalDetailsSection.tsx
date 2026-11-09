'use client';

import { useEffect, useRef, useState } from 'react';
import { Upload, FileText, ChevronDown } from 'lucide-react';
import CollapsibleSection from '../../CollapsibleSection';
import { cn } from '@/lib/utils';
import type { ProfessionalDetails } from '../types';
import type { ScientistOption, ScientistProfession } from '@/app/data/scientistOptions';

const MAX_PROFESSIONS = 4;

interface ProfessionalDetailsSectionProps {
  details: ProfessionalDetails;
  onChange: (patch: Partial<ProfessionalDetails>) => void;
  fields: ScientistOption[];
  degrees: ScientistOption[];
  services: ScientistOption[];
  professions: ScientistProfession[];
  /** Approved listings can add services but not remove existing ones. */
  approvedEditMode?: boolean;
}

// ------ Dropdowns modeled after the afro-innovation listing ------

function MultiSelectField({ label, options, value, onChange, max, disabled = false, lockSelected = false, loading = false }: {
  label?: string; options: string[]; value: string[];
  onChange: (v: string[] | ((p: string[]) => string[])) => void; max: number;
  disabled?: boolean; lockSelected?: boolean; loading?: boolean;
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
    const checked = value.includes(opt);
    if (checked && lockSelected) return;
    if (checked) {
      onChange(value.filter((v) => v !== opt));
      return;
    }
    if (value.length >= max) return;
    onChange([...value, opt]);
  };
  return (
    <div ref={ref}>
      {label && <label className="mb-2 block text-sm font-medium text-neutral-black">{label}</label>}
      <button type="button" onClick={() => setOpen(v => !v)} disabled={disabled}
        className="flex min-h-10 w-full cursor-pointer items-center justify-between gap-3 rounded-lg border border-neutral-gray-light bg-white px-4 py-2 text-left outline-none focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600 disabled:cursor-not-allowed disabled:bg-neutral-bg-light">
        <span className={`min-w-0 flex-1 truncate text-xs sm:text-sm ${value.length ? 'text-neutral-black' : 'text-neutral-gray-medium'}`}>
          {value.length ? value.join(', ') : loading ? 'Loading options...' : 'Select...'}
        </span>
        <ChevronDown size={15} className={`shrink-0 text-neutral-gray-medium transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="mt-2 max-h-60 overflow-y-auto rounded-lg border border-neutral-gray-light bg-white p-2 shadow-sm">
          {options.length === 0 && (
            <p className="px-3 py-2 text-xs text-neutral-gray-medium">
              {loading ? 'Loading options...' : 'No options available yet.'}
            </p>
          )}
          {options.map(opt => {
            const checked = value.includes(opt);
            const disabledOption = !checked && value.length >= max;
            return (
              <label key={opt} className={`flex cursor-pointer items-start justify-between gap-3 rounded-md px-3 py-2 text-sm ${disabledOption || (checked && lockSelected) ? 'text-neutral-gray-light' : 'text-neutral-gray-dark hover:bg-brand-red-50'}`}>
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span className="flex items-center gap-2">
                    <input type="checkbox" checked={checked} disabled={disabledOption || (checked && lockSelected)} onChange={() => toggle(opt)} className="mt-0.5 h-3.5 w-3.5 rounded accent-brand-red-600" />
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

function SingleSelectField({ label, options, value, onChange, disabled = false, loading = false }: {
  label?: string; options: string[]; value: string; onChange: (v: string) => void;
  disabled?: boolean; loading?: boolean;
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
      <button type="button" onClick={() => setOpen(v => !v)} disabled={disabled}
        className="flex min-h-10 w-full cursor-pointer items-center justify-between gap-3 rounded-lg border border-neutral-gray-light bg-white px-4 py-2 text-left outline-none focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600 disabled:cursor-not-allowed disabled:bg-neutral-bg-light">
        <span className={`min-w-0 flex-1 truncate text-xs sm:text-sm ${value ? 'text-neutral-black' : 'text-neutral-gray-medium'}`}>
          {value || (loading ? 'Loading options...' : 'Select...')}
        </span>
        <ChevronDown size={15} className={`shrink-0 text-neutral-gray-medium transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="mt-2 max-h-60 overflow-y-auto rounded-lg border border-neutral-gray-light bg-white p-2 shadow-sm">
          {options.length === 0 && (
            <p className="px-3 py-2 text-xs text-neutral-gray-medium">
              {loading ? 'Loading options...' : 'No options available yet.'}
            </p>
          )}
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

export default function ProfessionalDetailsSection({
  details,
  onChange,
  fields,
  degrees,
  services,
  professions,
  approvedEditMode = false,
}: ProfessionalDetailsSectionProps) {
  const fieldNames = fields.map((f) => f.name);
  const degreeNames = degrees.map((d) => d.name);
  const serviceNames = services.map((s) => s.name);
  const loading = fields.length === 0 && degrees.length === 0 && services.length === 0;

  const selectedField = fields.find((f) => f.name === details.field);
  const availableProfessions = details.field
    ? professions
        .filter((p) => (selectedField ? p.fieldId === selectedField.id : p.fieldName === details.field))
        .map((p) => p.name)
    : [];
  const professionList = details.field ? [...availableProfessions, 'Other'] : [];
  const inputClass = 'w-full rounded-lg border border-neutral-gray-light px-4 py-2.5 text-sm focus:border-brand-red-600 focus:ring-1 focus:ring-brand-red-600';

  const handleCertificate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Keep the file local until the listing is saved or submitted.
      onChange({
        degreeCertificate: URL.createObjectURL(file),
        degreeCertificateFile: file,
        degreeCertificateName: file.name,
      });
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
            options={fieldNames}
            value={details.field}
            onChange={(v) => onChange({ field: v, professions: [], professionOther: '' })}
            disabled={approvedEditMode}
            loading={loading && fields.length === 0}
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
              disabled={approvedEditMode}
            />
            <p className="mt-1.5 text-[11px] text-neutral-gray-medium">{details.professions.length}/{MAX_PROFESSIONS} selected</p>
            {details.professions.includes('Other') && (
              <input
                type="text"
                value={details.professionOther}
                onChange={(e) => onChange({ professionOther: e.target.value })}
                className={`${inputClass} mt-2`}
                placeholder="Specify the other profession"
                disabled={approvedEditMode}
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
            options={degreeNames}
            value={details.degree}
            onChange={(v) => onChange({ degree: v })}
            loading={loading && degrees.length === 0}
          />
          <label className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-brand-red-300 px-3 py-2.5 text-xs font-medium text-brand-red-600 transition-colors hover:bg-brand-red-50">
            <input type="file" accept=".pdf,image/*" onChange={handleCertificate} className="hidden" />
            <Upload className="h-3.5 w-3.5" /> {details.degreeCertificateName || (details.degreeCertificate ? 'Certificate uploaded' : 'Upload Degree Certificate (to verify academic qualification)')}
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-black mb-2">Services <span className="text-red-500">*</span> <span className="text-[10px] font-normal text-neutral-gray-medium">(multiple selections allowed)</span></label>
          <p className="mb-2 text-xs text-neutral-gray-medium">What kind of services are you hoping to render to clients?</p>
          <MultiSelectField
            options={serviceNames}
            value={details.services}
            onChange={(v) => {
              const next = typeof v === 'function' ? v(details.services) : v;
              if (approvedEditMode) {
                const added = next.filter((s) => !details.services.includes(s));
                onChange({ services: [...details.services, ...added] });
                return;
              }
              onChange({ services: next });
            }}
            max={Math.max(serviceNames.length, 1)}
            loading={loading && services.length === 0}
            lockSelected={approvedEditMode}
          />
          <p className="mt-1.5 text-[11px] text-neutral-gray-medium">
            {details.services.length} selected{approvedEditMode ? ' · services can be added but not removed' : ''}
          </p>
        </div>
      </div>
    </CollapsibleSection>
  );
}
