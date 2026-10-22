'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/app/components/ui/Button';
import { cn } from '@/lib/utils';
import { SCHOOL_CLASSES, SCHOOL_PROGRAMS, SCHOOL_GENDERS, SCHOOL_OWNERSHIP, SCHOOL_SERVICES, ALL_CURRENCIES } from '../data';
import type { SchoolInformation } from '../types';

interface SchoolInformationSectionProps {
  info: SchoolInformation;
  onChange: (patch: Partial<SchoolInformation>) => void;
}

export default function SchoolInformationSection({ info, onChange }: SchoolInformationSectionProps) {
  const inputClass = 'w-full rounded-lg border border-neutral-gray-light px-4 py-2.5 text-sm focus:border-brand-red-600 focus:ring-1 focus:ring-brand-red-600';

  const toggleService = (svc: string) => {
    onChange({
      services: info.services.includes(svc)
        ? info.services.filter(s => s !== svc)
        : [...info.services, svc],
    });
  };

  return (
    <div className="space-y-6">
      {/* CLASS */}
      <div>
        <label className="block text-sm font-medium text-neutral-black mb-1">Class <span className="text-red-500">*</span> <span className="text-[10px] font-normal text-neutral-gray-medium">(1 selection max.)</span></label>
        <p className="mb-1 text-xs text-neutral-gray-medium">Is the school Primary, Secondary or both?</p>
        <div className="grid gap-2 sm:grid-cols-3">
          {SCHOOL_CLASSES.map(cls => (
            <label key={cls} className={cn(
              "flex items-center gap-2 rounded-lg border p-2.5 text-sm transition-colors cursor-pointer",
              info.class === cls ? "border-brand-red-600 bg-brand-red-50 text-neutral-black" : "border-neutral-gray-light text-neutral-gray-dark hover:border-brand-red-200"
            )}>
              <input
                type="radio"
                name="school-class"
                checked={info.class === cls}
                onChange={() => onChange({ class: cls })}
                className="border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600 h-3.5 w-3.5"
              />
              {cls}
            </label>
          ))}
        </div>
      </div>

      {/* PROGRAM */}
      <div>
        <label className="block text-sm font-medium text-neutral-black mb-1">Program <span className="text-red-500">*</span> <span className="text-[10px] font-normal text-neutral-gray-medium">(1 selection at a time)</span></label>
        <p className="mb-1 text-xs text-neutral-gray-medium">Is the school Day, Boarding or both?</p>
        <div className="grid gap-2 sm:grid-cols-3">
          {SCHOOL_PROGRAMS.map(prog => (
            <label key={prog} className={cn(
              "flex items-center gap-2 rounded-lg border p-2.5 text-sm transition-colors cursor-pointer",
              info.program === prog ? "border-brand-red-600 bg-brand-red-50 text-neutral-black" : "border-neutral-gray-light text-neutral-gray-dark hover:border-brand-red-200"
            )}>
              <input
                type="radio"
                name="school-program"
                checked={info.program === prog}
                onChange={() => onChange({ program: prog })}
                className="border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600 h-3.5 w-3.5"
              />
              {prog}
            </label>
          ))}
        </div>
      </div>

      {/* GENDER */}
      <div>
        <label className="block text-sm font-medium text-neutral-black mb-1">Gender <span className="text-red-500">*</span> <span className="text-[10px] font-normal text-neutral-gray-medium">(1 selection at a time)</span></label>
        <p className="mb-1 text-xs text-neutral-gray-medium">What gender group does the school admit?</p>
        <div className="grid gap-2 sm:grid-cols-3">
          {SCHOOL_GENDERS.map(gender => (
            <label key={gender} className={cn(
              "flex items-center gap-2 rounded-lg border p-2.5 text-sm transition-colors cursor-pointer",
              info.gender === gender ? "border-brand-red-600 bg-brand-red-50 text-neutral-black" : "border-neutral-gray-light text-neutral-gray-dark hover:border-brand-red-200"
            )}>
              <input
                type="radio"
                name="school-gender"
                checked={info.gender === gender}
                onChange={() => onChange({ gender })}
                className="border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600 h-3.5 w-3.5"
              />
              {gender}
            </label>
          ))}
        </div>
      </div>

      {/* OWNERSHIP */}
      <div>
        <label className="block text-sm font-medium text-neutral-black mb-1">Ownership <span className="text-red-500">*</span> <span className="text-[10px] font-normal text-neutral-gray-medium">(1 selections max.)</span></label>
        <p className="mb-1 text-xs text-neutral-gray-medium">What is the ownership identity of the school? When "Other" is selected, user should specify</p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {SCHOOL_OWNERSHIP.map(own => (
            <label key={own} className={cn(
              "flex items-center gap-2 rounded-lg border p-2.5 text-sm transition-colors cursor-pointer",
              info.ownership === own ? "border-brand-red-600 bg-brand-red-50 text-neutral-black" : "border-neutral-gray-light text-neutral-gray-dark hover:border-brand-red-200"
            )}>
              <input
                type="radio"
                name="school-ownership"
                checked={info.ownership === own}
                onChange={() => onChange({ ownership: own, ownershipOther: own === 'Other' ? info.ownershipOther : '' })}
                className="border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600 h-3.5 w-3.5"
              />
              {own}
            </label>
          ))}
        </div>
        {info.ownership === 'Other' && (
          <input
            type="text"
            value={info.ownershipOther}
            onChange={(e) => onChange({ ownershipOther: e.target.value })}
            className={`${inputClass} mt-2`}
            placeholder="Specify the ownership type"
          />
        )}
      </div>

      {/* SERVICES */}
      <div>
        <label className="block text-sm font-medium text-neutral-black mb-1">Services <span className="text-red-500">*</span> <span className="text-[10px] font-normal text-neutral-gray-medium">(multiple selections allowed)</span></label>
        <p className="mb-1.5 text-[11px] text-neutral-gray-medium">{info.services.length} selected</p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {SCHOOL_SERVICES.map(svc => (
            <label key={svc} className={cn(
              "flex items-center gap-2 rounded-lg border p-2.5 text-sm transition-colors cursor-pointer",
              info.services.includes(svc) ? "border-brand-red-600 bg-brand-red-50" : "border-neutral-gray-light"
            )}>
              <input
                type="checkbox"
                checked={info.services.includes(svc)}
                onChange={() => toggleService(svc)}
                className="rounded border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600 h-3.5 w-3.5"
                disabled={svc === 'Teaching & Learning'}
              />
              <span className="text-neutral-gray-dark">{svc}</span>
              {svc === 'Teaching & Learning' && <span className="text-[10px] text-brand-red-600 font-medium">(default)</span>}
            </label>
          ))}
        </div>
      </div>

      {/* SCOPES */}
      <div>
        <label className="block text-sm font-medium text-neutral-black mb-1">Scopes <span className="text-[10px] font-normal text-neutral-gray-medium">(multiple entries allowed)</span></label>
        <p className="text-xs text-neutral-gray-medium mb-2">List other activities and programs that are unique to the school</p>
        <EntryList
          label=""
          hint="multiple entries allowed"
          placeholder="e.g. Robotics Club, Environmental Initiative"
          entries={info.scopes}
          onChange={(entries) => onChange({ scopes: entries })}
        />
      </div>

      {/* TUITION FEE */}
      <div>
        <label className="block text-sm font-medium text-neutral-black mb-1">Tuition fee <span className="text-[10px] font-normal text-neutral-gray-medium">(Currency can be in USD or local currency)</span></label>
        <p className="text-xs text-neutral-gray-medium mb-2">State the tuition cost for every level of study in the school</p>
        <TuitionFeeList
          entries={info.tuitionFees}
          onChange={(entries) => onChange({ tuitionFees: entries })}
        />
      </div>

      {/* OTHER FEES */}
      <div>
        <label className="block text-sm font-medium text-neutral-black mb-1">Other fees <span className="text-[10px] font-normal text-neutral-gray-medium">(multiple entries allowed)</span></label>
        <p className="text-xs text-neutral-gray-medium mb-2">State the cost of other fee (if any) that are required for pupils/students to pay by the school</p>
        <OtherFeeList
          entries={info.otherFees}
          onChange={(entries) => onChange({ otherFees: entries })}
        />
      </div>

      {/* ENGAGEMENT POLICIES */}
      <div>
        <label className="block text-sm font-medium text-neutral-black mb-1">Engagement policies <span className="text-[10px] font-normal text-neutral-gray-medium">(multiple entries allowed)</span></label>
        <p className="text-xs text-neutral-gray-medium mb-2">Mention important guidelines that pupils, students and parents must adhere to in the school</p>
        <EntryList
          label=""
          hint="multiple entries allowed"
          placeholder="e.g. 75% mandatory attendance for all classes"
          entries={info.engagementPolicies}
          onChange={(entries) => onChange({ engagementPolicies: entries })}
        />
      </div>
    </div>
  );
}

function EntryList({ label, hint, placeholder, entries, onChange }: { label: string; hint: string; placeholder: string; entries: string[]; onChange: (entries: string[]) => void }) {
  const [draft, setDraft] = useState('');
  const inputClass = 'w-full rounded-lg border border-neutral-gray-light px-4 py-2.5 text-sm focus:border-brand-red-600 focus:ring-1 focus:ring-brand-red-600';

  const add = () => {
    const value = draft.trim();
    if (!value) return toast.error('Please enter a value first');
    if (entries.includes(value)) return toast.error('This entry already exists');
    onChange([...entries, value]);
    setDraft('');
  };

  return (
    <div>
      {label && <label className="block text-sm font-medium text-neutral-black mb-1">{label} <span className="text-[10px] font-normal text-neutral-gray-medium">({hint})</span></label>}
      <div className="flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); add(); } }}
          className={inputClass}
          placeholder={placeholder}
        />
        <Button type="button" size="sm" className="flex-shrink-0 bg-brand-red-600 hover:bg-brand-red-700" onClick={add}>
          <Plus className="mr-1 h-4 w-4" /> Add
        </Button>
      </div>
      {entries.length > 0 && (
        <ul className="mt-3 space-y-2">
          {entries.map((entry, idx) => (
            <li key={`${entry}-${idx}`} className="flex items-center justify-between gap-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light px-3 py-2">
              <div className="flex min-w-0 items-center gap-2">
                <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-navy-900 text-[10px] font-bold text-white">{idx + 1}</span>
                <span className="truncate text-sm text-neutral-black">{entry}</span>
              </div>
              <button
                type="button"
                onClick={() => onChange(entries.filter((_, i) => i !== idx))}
                className="flex-shrink-0 cursor-pointer text-red-400 hover:text-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function TuitionFeeList({ entries, onChange }: { entries: { level: string; fee: string; currency: string }[]; onChange: (entries: { level: string; fee: string; currency: string }[]) => void }) {
  const [draft, setDraft] = useState({ level: '', fee: '', currency: 'USD' });
  const inputClass = 'w-full rounded-lg border border-neutral-gray-light px-3 py-2.5 text-sm focus:border-brand-red-600 focus:ring-1 focus:ring-brand-red-600';

  const add = () => {
    if (!draft.level.trim() || !draft.fee.trim()) return toast.error('Please fill in all fields');
    onChange([...entries, { ...draft }]);
    setDraft({ level: '', fee: '', currency: 'USD' });
  };

  const update = (idx: number, patch: Partial<{ level: string; fee: string; currency: string }>) => {
    onChange(entries.map((entry, i) => (i === idx ? { ...entry, ...patch } : entry)));
  };

  return (
    <div className="space-y-3">
      {entries.map((entry, idx) => (
        <div key={idx} className="rounded-lg border border-neutral-gray-light bg-neutral-bg-light/50 p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-neutral-gray-medium">
              Tuition {idx + 1}
            </span>
            <button type="button" onClick={() => onChange(entries.filter((_, i) => i !== idx))} className="cursor-pointer text-red-400 hover:text-red-600">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-2">
              <input type="text" value={entry.level} onChange={(e) => update(idx, { level: e.target.value })} className={inputClass} placeholder="Level" />
              <input type="text" value={entry.fee} onChange={(e) => update(idx, { fee: e.target.value })} className={`${inputClass} col-span-2`} placeholder="Tuition Fee" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="self-center text-sm text-neutral-gray-medium">Currency</span>
              <select value={entry.currency} onChange={(e) => update(idx, { currency: e.target.value })} className={`${inputClass} col-span-2 cursor-pointer`}>
                {ALL_CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>
      ))}
      <div className="rounded-lg border border-dashed border-neutral-gray-light p-4 space-y-2">
        <p className="text-xs font-bold text-neutral-gray-medium uppercase tracking-wider">Add Tuition Fee</p>
        <div className="grid grid-cols-3 gap-2">
          <input type="text" value={draft.level} onChange={(e) => setDraft(prev => ({ ...prev, level: e.target.value }))} className={inputClass} placeholder="Level" />
          <input type="text" value={draft.fee} onChange={(e) => setDraft(prev => ({ ...prev, fee: e.target.value }))} className={`${inputClass} col-span-2`} placeholder="Tuition Fee" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <span className="self-center text-sm text-neutral-gray-medium">Currency</span>
          <select value={draft.currency} onChange={(e) => setDraft(prev => ({ ...prev, currency: e.target.value }))} className={`${inputClass} col-span-2 cursor-pointer`}>
            {ALL_CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <Button type="button" size="sm" className="bg-brand-red-600 hover:bg-brand-red-700 flex-shrink-0" onClick={add}>
          <Plus className="mr-1 h-4 w-4" /> Add
        </Button>
      </div>
    </div>
  );
}

function OtherFeeList({ entries, onChange }: { entries: { name: string; description: string; cost: string; currency: string }[]; onChange: (entries: { name: string; description: string; cost: string; currency: string }[]) => void }) {
  const [draft, setDraft] = useState({ name: '', description: '', cost: '', currency: 'USD' });
  const inputClass = 'w-full rounded-lg border border-neutral-gray-light px-3 py-2.5 text-sm focus:border-brand-red-600 focus:ring-1 focus:ring-brand-red-600';

  const add = () => {
    if (!draft.name.trim() || !draft.cost.trim()) return toast.error('Please fill in Fee Name and Cost');
    if (draft.description.split(/\s+/).filter(Boolean).length > 20) return toast.error('Description must be 20 words max.');
    onChange([...entries, { ...draft }]);
    setDraft({ name: '', description: '', cost: '', currency: 'USD' });
  };

  const update = (idx: number, patch: Partial<{ name: string; description: string; cost: string; currency: string }>) => {
    onChange(entries.map((entry, i) => (i === idx ? { ...entry, ...patch } : entry)));
  };

  return (
    <div className="space-y-3">
      {entries.map((entry, idx) => (
        <div key={idx} className="rounded-lg border border-neutral-gray-light p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-neutral-gray-medium">
              Fee {idx + 1}
            </span>
            <button type="button" onClick={() => onChange(entries.filter((_, i) => i !== idx))} className="cursor-pointer text-red-400 hover:text-red-600">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-2">
            <input type="text" value={entry.name} onChange={(e) => update(idx, { name: e.target.value })} className={inputClass} placeholder="Fee Name" />
            <input type="text" value={entry.description} onChange={(e) => update(idx, { description: e.target.value })} className={inputClass} placeholder="Description (20 words max.)" />
            <div className="grid grid-cols-3 gap-2">
              <input type="text" value={entry.cost} onChange={(e) => update(idx, { cost: e.target.value })} className={`${inputClass} col-span-2`} placeholder="Cost" />
              <select value={entry.currency} onChange={(e) => update(idx, { currency: e.target.value })} className={`${inputClass} cursor-pointer`}>
                {ALL_CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>
      ))}
      <div className="rounded-lg border border-dashed border-neutral-gray-light p-4 space-y-2">
        <p className="text-xs font-bold text-neutral-gray-medium uppercase tracking-wider">Add Fee</p>
        <input type="text" value={draft.name} onChange={(e) => setDraft(prev => ({ ...prev, name: e.target.value }))} className={inputClass} placeholder="Fee Name" />
        <input type="text" value={draft.description} onChange={(e) => setDraft(prev => ({ ...prev, description: e.target.value }))} className={inputClass} placeholder="Description (20 words max.)" />
        <div className="grid grid-cols-3 gap-2">
          <input type="text" value={draft.cost} onChange={(e) => setDraft(prev => ({ ...prev, cost: e.target.value }))} className={`${inputClass} col-span-2`} placeholder="Cost" />
          <select value={draft.currency} onChange={(e) => setDraft(prev => ({ ...prev, currency: e.target.value }))} className={`${inputClass} cursor-pointer`}>
            {ALL_CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <Button type="button" size="sm" className="bg-brand-red-600 hover:bg-brand-red-700 flex-shrink-0" onClick={add}>
          <Plus className="mr-1 h-4 w-4" /> Add
        </Button>
      </div>
    </div>
  );
}