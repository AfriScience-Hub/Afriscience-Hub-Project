'use client';

import { Building2, Beaker, Lightbulb, Trophy, Award, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import CollapsibleSection from './CollapsibleSection';
import {
  INSTITUTE_CLASSES, INSTITUTE_OWNERSHIP, INSTITUTE_GENDER,
  SCIENTIST_FIELDS, SCIENTIST_PROFESSIONS,
  INNOVATION_CATEGORIES, COMPETITION_TYPES, AWARD_TYPES
} from '../data';

interface CategorySpecificSectionProps {
  selectedType: string;
  instClass: string; setInstClass: (v: string) => void;
  instOwnership: string; setInstOwnership: (v: string) => void;
  instGender: string; setInstGender: (v: string) => void;
  sciFields: string[]; setSciFields: (v: string[] | ((prev: string[]) => string[])) => void;
  sciProfession: string; setSciProfession: (v: string) => void;
  sciDegrees: string; setSciDegrees: (v: string) => void;
  innovCategory: string; setInnovCategory: (v: string) => void;
  innovStage: string; setInnovStage: (v: string) => void;
  compType: string; setCompType: (v: string) => void;
  compDeadline: string; setCompDeadline: (v: string) => void;
  compFee: string; setCompFee: (v: string) => void;
  awardType: string; setAwardType: (v: string) => void;
}

export default function CategorySpecificSection({
  selectedType,
  instClass, setInstClass, instOwnership, setInstOwnership, instGender, setInstGender,
  sciFields, setSciFields, sciProfession, setSciProfession, sciDegrees, setSciDegrees,
  innovCategory, setInnovCategory, innovStage, setInnovStage,
  compType, setCompType, compDeadline, setCompDeadline, compFee, setCompFee,
  awardType, setAwardType
}: CategorySpecificSectionProps) {
  return (
    <>
      {selectedType === 'institute' && (
        <CollapsibleSection title="Institute Classification" icon={<Building2 className="h-5 w-5 text-brand-red-600" />}>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-neutral-black mb-1">Class / Type <span className="text-red-500">*</span></label>
              <select value={instClass} onChange={e => setInstClass(e.target.value)}
                className="w-full cursor-pointer rounded-lg border border-neutral-gray-light px-4 py-2.5 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600">
                <option value="">Select</option>
                {INSTITUTE_CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-black mb-1">Ownership</label>
              <select value={instOwnership} onChange={e => setInstOwnership(e.target.value)}
                className="w-full cursor-pointer rounded-lg border border-neutral-gray-light px-4 py-2.5 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600">
                <option value="">Select</option>
                {INSTITUTE_OWNERSHIP.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-black mb-1">Gender</label>
              <select value={instGender} onChange={e => setInstGender(e.target.value)}
                className="w-full cursor-pointer rounded-lg border border-neutral-gray-light px-4 py-2.5 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600">
                <option value="">Select</option>
                {INSTITUTE_GENDER.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
          </div>
        </CollapsibleSection>
      )}

      {selectedType === 'scientist' && (
        <CollapsibleSection title="Professional Details" icon={<Beaker className="h-5 w-5 text-brand-red-600" />}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-black mb-1">Fields of Expertise</label>
              <div className="flex flex-wrap gap-2">
                {SCIENTIST_FIELDS.map(field => (
                  <button
                    key={field}
                    type="button"
                    onClick={() => setSciFields(prev => prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field])}
                    className={cn(
                      "cursor-pointer px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
                      sciFields.includes(field)
                        ? "bg-brand-red-600 text-white border-brand-red-600"
                        : "bg-white text-neutral-gray-dark border-neutral-gray-light hover:border-brand-red-400"
                    )}
                  >
                    {sciFields.includes(field) && <Check className="h-3 w-3 inline mr-1" />}
                    {field}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-neutral-black mb-1">Profession</label>
                <select value={sciProfession} onChange={e => setSciProfession(e.target.value)}
                  className="w-full cursor-pointer rounded-lg border border-neutral-gray-light px-4 py-2.5 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600">
                  <option value="">Select</option>
                  {SCIENTIST_PROFESSIONS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-black mb-1">Degrees / Qualifications</label>
                <input type="text" value={sciDegrees} onChange={e => setSciDegrees(e.target.value)}
                  className="w-full cursor-pointer rounded-lg border border-neutral-gray-light px-4 py-2.5 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
                  placeholder="e.g. Ph.D. Computer Science, M.Sc. AI" />
              </div>
            </div>
          </div>
        </CollapsibleSection>
      )}

      {selectedType === 'innovation' && (
        <CollapsibleSection title="Innovation Details" icon={<Lightbulb className="h-5 w-5 text-brand-red-600" />}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-neutral-black mb-1">Innovation Category</label>
              <select value={innovCategory} onChange={e => setInnovCategory(e.target.value)}
                className="w-full cursor-pointer rounded-lg border border-neutral-gray-light px-4 py-2.5 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600">
                <option value="">Select</option>
                {INNOVATION_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-black mb-1">Development Stage</label>
              <select value={innovStage} onChange={e => setInnovStage(e.target.value)}
                className="w-full cursor-pointer rounded-lg border border-neutral-gray-light px-4 py-2.5 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600">
                <option value="">Select</option>
                <option value="Concept">Concept</option>
                <option value="Prototype">Prototype</option>
                <option value="MVP">MVP</option>
                <option value="Market Ready">Market Ready</option>
                <option value="Scaling">Scaling</option>
              </select>
            </div>
          </div>
        </CollapsibleSection>
      )}

      {selectedType === 'competition' && (
        <CollapsibleSection title="Competition Details" icon={<Trophy className="h-5 w-5 text-brand-red-600" />}>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-neutral-black mb-1">Competition Type</label>
              <select value={compType} onChange={e => setCompType(e.target.value)}
                className="w-full cursor-pointer rounded-lg border border-neutral-gray-light px-4 py-2.5 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600">
                <option value="">Select</option>
                {COMPETITION_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-black mb-1">Registration Fee</label>
              <input type="text" value={compFee} onChange={e => setCompFee(e.target.value)}
                className="w-full cursor-pointer rounded-lg border border-neutral-gray-light px-4 py-2.5 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
                placeholder="e.g. $5" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-black mb-1">Deadline</label>
              <input type="date" value={compDeadline} onChange={e => setCompDeadline(e.target.value)}
                className="w-full cursor-pointer rounded-lg border border-neutral-gray-light px-4 py-2.5 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600" />
            </div>
          </div>
        </CollapsibleSection>
      )}

      {selectedType === 'award' && (
        <CollapsibleSection title="Award Details" icon={<Award className="h-5 w-5 text-brand-red-600" />}>
          <div>
            <label className="block text-sm font-medium text-neutral-black mb-1">Award Type</label>
            <select value={awardType} onChange={e => setAwardType(e.target.value)}
              className="w-full cursor-pointer rounded-lg border border-neutral-gray-light px-4 py-2.5 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600">
              <option value="">Select</option>
              {AWARD_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </CollapsibleSection>
      )}
    </>
  );
}
