'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/app/components/ui/Button';
import { YEARS } from '../data';
import type { AcademicInformation, GradingEntry, DegreeEntry } from '../types';

interface AcademicInformationSectionProps {
  info: AcademicInformation;
  onChange: (patch: Partial<AcademicInformation>) => void;
  schoolClass: string;
}

export default function AcademicInformationSection({ info, onChange, schoolClass }: AcademicInformationSectionProps) {
  const inputClass = 'w-full rounded-lg border border-neutral-gray-light px-4 py-2.5 text-sm focus:border-brand-red-600 focus:ring-1 focus:ring-brand-red-600';

  return (
    <div className="space-y-6">
      {/* ACADEMIC CALENDAR */}
      <div>
        <label className="block text-sm font-medium text-neutral-black mb-2">Academic calendar <span className="text-[10px] font-normal text-neutral-gray-medium">(automatically display entries for the three terms.)</span></label>
        <p className="text-xs text-neutral-gray-medium mb-2">Provide the termly information about the school's academic calendar</p>
        <div className="space-y-4">
          {info.academicCalendar.map((term, idx) => (
            <div key={term.term} className="rounded-lg border border-neutral-gray-light bg-neutral-bg-light/50 p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-bold text-neutral-black">{term.term}</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-sm font-medium text-neutral-black mb-1">Start date</label>
                  <input type="date" value={term.startDate} onChange={(e) => updateTerm(idx, { startDate: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-black mb-1">Midterm break date</label>
                  <input type="date" value={term.midtermBreakDate} onChange={(e) => updateTerm(idx, { midtermBreakDate: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-black mb-1">Closure date</label>
                  <input type="date" value={term.closureDate} onChange={(e) => updateTerm(idx, { closureDate: e.target.value })} className={inputClass} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SUBJECTS */}
      <div>
        <label className="block text-sm font-medium text-neutral-black mb-1">Subjects <span className="text-[10px] font-normal text-neutral-gray-medium">(multiple entries allowed)</span></label>
        <p className="text-xs text-neutral-gray-medium mb-2">List all the subjects offered by the school</p>
        <EntryList
          label=""
          hint="multiple entries allowed"
          placeholder="e.g. Mathematics, English Language, Physics"
          entries={info.subjects}
          onChange={(entries) => onChange({ subjects: entries })}
        />
      </div>

      {/* GRADING SYSTEM */}
      <div>
        <label className="block text-sm font-medium text-neutral-black mb-1">Grading system <span className="text-[10px] font-normal text-neutral-gray-medium">(multiple entries allowed)</span></label>
        <p className="text-xs text-neutral-gray-medium mb-2">How do you report a pupil's/student's performance grade?</p>
        <GradingList
          entries={info.gradingSystem}
          onChange={(entries) => onChange({ gradingSystem: entries })}
        />
      </div>

      {/* DEGREES AWARDED */}
      <div>
        <label className="block text-sm font-medium text-neutral-black mb-1">Degrees awarded <span className="text-[10px] font-normal text-neutral-gray-medium">(multiple entries allowed)</span></label>
        <p className="text-xs text-neutral-gray-medium mb-2">List all the types of degree that the school is licensed to award pupils/students</p>
        <DegreeList
          entries={info.degreesAwarded}
          onChange={(entries) => onChange({ degreesAwarded: entries })}
        />
      </div>

      {/* ADMISSION REQUIREMENTS */}
      <div>
        <label className="block text-sm font-medium text-neutral-black mb-1">Admission requirements <span className="text-[10px] font-normal text-neutral-gray-medium">(multiple "Requirement" entries are allowed)</span></label>
        <p className="text-xs text-neutral-gray-medium mb-2">State the requirements necessary to gain admission into the school</p>
        <p className="text-xs text-neutral-gray-medium mb-4">Automatically display "Levels" depending on what user selected in "Class"</p>
        
        {(schoolClass === 'Primary' || schoolClass === 'Primary & Secondary') && (
          <div>
            <label className="block text-sm font-medium text-neutral-black mb-1">Primary level</label>
            <EntryList
              label=""
              hint="multiple entries allowed"
              placeholder="e.g. Completed Kindergarten, Birth certificate"
              entries={info.admissionRequirements.primary}
              onChange={(entries) => onChange({ admissionRequirements: { ...info.admissionRequirements, primary: entries } })}
            />
          </div>
        )}
        
        {(schoolClass === 'Secondary' || schoolClass === 'Primary & Secondary') && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-neutral-black mb-1">Secondary level</label>
            <EntryList
              label=""
              hint="multiple entries allowed"
              placeholder="e.g. 5 credit passes including English & Math, Entrance exam"
              entries={info.admissionRequirements.secondary}
              onChange={(entries) => onChange({ admissionRequirements: { ...info.admissionRequirements, secondary: entries } })}
            />
          </div>
        )}
      </div>
    </div>
  );

  function updateTerm(idx: number, patch: Partial<{ startDate: string; midtermBreakDate: string; closureDate: string }>) {
    onChange({
      academicCalendar: info.academicCalendar.map((term, i) => (i === idx ? { ...term, ...patch } : term)),
    });
  }
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

function GradingList({ entries, onChange }: { entries: GradingEntry[]; onChange: (entries: GradingEntry[]) => void }) {
  const [draft, setDraft] = useState({ scoreRange: '', symbol: '', interpretation: '' });
  const inputClass = 'w-full rounded-lg border border-neutral-gray-light px-3 py-2.5 text-sm focus:border-brand-red-600 focus:ring-1 focus:ring-brand-red-600';

  const add = () => {
    if (!draft.scoreRange.trim() || !draft.symbol.trim() || !draft.interpretation.trim()) return toast.error('Please fill in all fields');
    onChange([...entries, { ...draft }]);
    setDraft({ scoreRange: '', symbol: '', interpretation: '' });
  };

  const update = (idx: number, patch: Partial<GradingEntry>) => {
    onChange(entries.map((entry, i) => (i === idx ? { ...entry, ...patch } : entry)));
  };

  return (
    <div className="space-y-3">
      {entries.map((entry, idx) => (
        <div key={idx} className="rounded-lg border border-neutral-gray-light bg-neutral-bg-light/50 p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="flex items-center gap-2 text-xs font-medium text-neutral-gray-medium">
              Grade {idx + 1}
            </span>
            <button type="button" onClick={() => onChange(entries.filter((_, i) => i !== idx))} className="cursor-pointer text-red-400 hover:text-red-600">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-2">
              <input type="text" value={entry.scoreRange} onChange={(e) => update(idx, { scoreRange: e.target.value })} className={inputClass} placeholder="Score range (e.g. 80-100)" />
              <input type="text" value={entry.symbol} onChange={(e) => update(idx, { symbol: e.target.value })} className={inputClass} placeholder="Symbol (e.g. A1)" />
              <input type="text" value={entry.interpretation} onChange={(e) => update(idx, { interpretation: e.target.value })} className={inputClass} placeholder="Interpretation (e.g. Excellent)" />
            </div>
          </div>
        </div>
      ))}
      <div className="rounded-lg border border-dashed border-neutral-gray-light p-4 space-y-2">
        <p className="text-xs font-medium text-neutral-gray-medium">Add grade</p>
        <div className="grid grid-cols-3 gap-2">
          <input type="text" value={draft.scoreRange} onChange={(e) => setDraft(prev => ({ ...prev, scoreRange: e.target.value }))} className={inputClass} placeholder="Score range (e.g. 80-100)" />
          <input type="text" value={draft.symbol} onChange={(e) => setDraft(prev => ({ ...prev, symbol: e.target.value }))} className={inputClass} placeholder="Symbol (e.g. A1)" />
          <input type="text" value={draft.interpretation} onChange={(e) => setDraft(prev => ({ ...prev, interpretation: e.target.value }))} className={inputClass} placeholder="Interpretation (e.g. Excellent)" />
        </div>
        <Button type="button" size="sm" className="bg-brand-red-600 hover:bg-brand-red-700 flex-shrink-0" onClick={add}>
          <Plus className="mr-1 h-4 w-4" /> Add
        </Button>
      </div>
    </div>
  );
}

function DegreeList({ entries, onChange }: { entries: DegreeEntry[]; onChange: (entries: DegreeEntry[]) => void }) {
  const [draft, setDraft] = useState({ abbreviation: '', fullName: '' });
  const inputClass = 'w-full rounded-lg border border-neutral-gray-light px-3 py-2.5 text-sm focus:border-brand-red-600 focus:ring-1 focus:ring-brand-red-600';

  const add = () => {
    if (!draft.abbreviation.trim() || !draft.fullName.trim()) return toast.error('Please fill in both Abbreviation and Full Name');
    onChange([...entries, { ...draft }]);
    setDraft({ abbreviation: '', fullName: '' });
  };

  const update = (idx: number, patch: Partial<DegreeEntry>) => {
    onChange(entries.map((entry, i) => (i === idx ? { ...entry, ...patch } : entry)));
  };

  return (
    <div className="space-y-3">
      {entries.map((entry, idx) => (
        <div key={idx} className="rounded-lg border border-neutral-gray-light bg-neutral-bg-light/50 p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="flex items-center gap-2 text-xs font-medium text-neutral-gray-medium">
              Degree {idx + 1}
            </span>
            <button type="button" onClick={() => onChange(entries.filter((_, i) => i !== idx))} className="cursor-pointer text-red-400 hover:text-red-600">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <input type="text" value={entry.abbreviation} onChange={(e) => update(idx, { abbreviation: e.target.value })} className={inputClass} placeholder="Abbreviation (e.g. B.Sc.)" />
              <input type="text" value={entry.fullName} onChange={(e) => update(idx, { fullName: e.target.value })} className={inputClass} placeholder="Full name (e.g. Bachelor of Science)" />
            </div>
          </div>
        </div>
      ))}
      <div className="rounded-lg border border-dashed border-neutral-gray-light p-4 space-y-2">
        <p className="text-xs font-medium text-neutral-gray-medium">Add degree</p>
        <div className="grid grid-cols-2 gap-2">
          <input type="text" value={draft.abbreviation} onChange={(e) => setDraft(prev => ({ ...prev, abbreviation: e.target.value }))} className={inputClass} placeholder="Abbreviation (e.g. B.Sc.)" />
          <input type="text" value={draft.fullName} onChange={(e) => setDraft(prev => ({ ...prev, fullName: e.target.value }))} className={inputClass} placeholder="Full name (e.g. Bachelor of Science)" />
        </div>
        <Button type="button" size="sm" className="bg-brand-red-600 hover:bg-brand-red-700 flex-shrink-0" onClick={add}>
          <Plus className="mr-1 h-4 w-4" /> Add
        </Button>
      </div>
    </div>
  );
}