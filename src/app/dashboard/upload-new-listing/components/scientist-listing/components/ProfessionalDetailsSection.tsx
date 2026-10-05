'use client';

import { Upload, FileText } from 'lucide-react';
import CollapsibleSection from '../../CollapsibleSection';
import {
  SCIENTIST_FIELDS,
  SCIENTIST_DEGREES,
  SCIENTIST_SERVICES,
  PROFESSIONS_BY_FIELD,
} from '@/app/data/mockData';
import { cn } from '@/lib/utils';
import type { ProfessionalDetails } from '../types';

const MAX_PROFESSIONS = 4;

interface ProfessionalDetailsSectionProps {
  details: ProfessionalDetails;
  onChange: (patch: Partial<ProfessionalDetails>) => void;
}

export default function ProfessionalDetailsSection({ details, onChange }: ProfessionalDetailsSectionProps) {
  const availableProfessions = details.field ? PROFESSIONS_BY_FIELD[details.field] || [] : [];
  const professionList = details.field ? [...availableProfessions, 'Other'] : [];
  const inputClass = 'w-full rounded-lg border border-neutral-gray-light px-4 py-2.5 text-sm focus:border-brand-red-600 focus:ring-1 focus:ring-brand-red-600';

  const toggleProfession = (prof: string) => {
    const selected = details.professions.includes(prof);
    if (selected) {
      onChange({ professions: details.professions.filter(p => p !== prof) });
      if (prof === 'Other') onChange({ professionOther: '' });
      return;
    }
    if (details.professions.length >= MAX_PROFESSIONS) return;
    onChange({ professions: [...details.professions, prof] });
  };

  const toggleService = (svc: string) => {
    onChange({
      services: details.services.includes(svc)
        ? details.services.filter(s => s !== svc)
        : [...details.services, svc],
    });
  };

  const handleCertificate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onChange({ degreeCertificate: file.name });
    e.target.value = '';
  };

  return (
    <CollapsibleSection title="Professional Details" icon={<FileText className="h-5 w-5 text-brand-red-600" />} badge="Required" defaultOpen={false}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-neutral-black mb-2">Field <span className="text-red-500">*</span> <span className="text-[10px] font-normal text-neutral-gray-medium">(max 1 selection)</span></label>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {SCIENTIST_FIELDS.map(field => (
              <label key={field} className={cn(
                "flex items-center gap-2 rounded-lg border p-2.5 text-sm transition-colors cursor-pointer",
                details.field === field ? "border-brand-red-600 bg-brand-red-50 text-neutral-black" : "border-neutral-gray-light text-neutral-gray-dark hover:border-brand-red-200"
              )}>
                <input
                  type="radio"
                  name="scientist-listing-field"
                  checked={details.field === field}
                  onChange={() => onChange({ field, professions: [], professionOther: '' })}
                  className="border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600 h-3.5 w-3.5"
                />
                {field}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-black mb-2">
            Profession <span className="text-red-500">*</span>
            <span className="text-[10px] font-normal text-neutral-gray-medium"> (max {MAX_PROFESSIONS} selections; entries made via admin dashboard)</span>
          </label>
          {details.field ? (
            <>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {professionList.map(prof => {
                  const checked = details.professions.includes(prof);
                  const full = !checked && details.professions.length >= MAX_PROFESSIONS;
                  return (
                    <label key={prof} className={cn(
                      "flex items-center gap-2 rounded-lg border p-2.5 text-sm transition-colors",
                      checked ? "border-brand-red-600 bg-brand-red-50" : "border-neutral-gray-light",
                      full ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                    )}>
                      <input
                        type="checkbox"
                        checked={checked}
                        disabled={full}
                        onChange={() => toggleProfession(prof)}
                        className="rounded border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600 h-3.5 w-3.5"
                      />
                      <span className="text-neutral-gray-dark">{prof}</span>
                    </label>
                  );
                })}
              </div>
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
            </>
          ) : (
            <p className="text-xs italic text-neutral-gray-medium">Select a field to see professions.</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-black mb-2">Degree <span className="text-red-500">*</span> <span className="text-[10px] font-normal text-neutral-gray-medium">(max 1 selection)</span></label>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {SCIENTIST_DEGREES.map(degree => (
              <label key={degree} className={cn(
                "flex items-center gap-2 rounded-lg border p-2.5 text-sm transition-colors cursor-pointer",
                details.degree === degree ? "border-brand-red-600 bg-brand-red-50 text-neutral-black" : "border-neutral-gray-light text-neutral-gray-dark hover:border-brand-red-200"
              )}>
                <input
                  type="radio"
                  name="scientist-listing-degree"
                  checked={details.degree === degree}
                  onChange={() => onChange({ degree })}
                  className="border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600 h-3.5 w-3.5"
                />
                {degree}
              </label>
            ))}
          </div>
          <label className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-brand-red-300 px-3 py-2.5 text-xs font-medium text-brand-red-600 transition-colors hover:bg-brand-red-50">
            <input type="file" accept=".pdf,image/*" onChange={handleCertificate} className="hidden" />
            <Upload className="h-3.5 w-3.5" /> {details.degreeCertificate || 'Upload Degree Certificate (to verify academic qualification)'}
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-black mb-2">Services <span className="text-red-500">*</span> <span className="text-[10px] font-normal text-neutral-gray-medium">(multiple selections allowed)</span></label>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {SCIENTIST_SERVICES.map(svc => (
              <label key={svc} className={cn(
                "flex items-center gap-2 rounded-lg border p-2.5 text-sm transition-colors cursor-pointer",
                details.services.includes(svc) ? "border-brand-red-600 bg-brand-red-50" : "border-neutral-gray-light"
              )}>
                <input
                  type="checkbox"
                  checked={details.services.includes(svc)}
                  onChange={() => toggleService(svc)}
                  className="rounded border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600 h-3.5 w-3.5"
                />
                <span className="text-neutral-gray-dark">{svc}</span>
              </label>
            ))}
          </div>
          <p className="mt-1.5 text-[11px] text-neutral-gray-medium">{details.services.length} selected</p>
        </div>
      </div>
    </CollapsibleSection>
  );
}
