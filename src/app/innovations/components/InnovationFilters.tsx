'use client';

import { ChevronDown } from 'lucide-react';
import { cn } from '../../../lib/utils';
import {
  INNOVATION_FIELDS,
  INNOVATION_INTERESTS,
  INNOVATION_INTERESTS_EMOJI,
  INNOVATION_OWNERSHIP,
  INNOVATION_STAGES,
  INNOVATION_SDGS,
  AFRICAN_COUNTRIES,
} from '../../data/mockData';
import { InfoTooltip } from './InnovationHelpers';

type InnovationFiltersProps = {
  activeFilterCount: number;
  selectedField: string;
  setSelectedField: React.Dispatch<React.SetStateAction<string>>;
  selectedInterests: string[];
  setSelectedInterests: React.Dispatch<React.SetStateAction<string[]>>;
  selectedOwnership: string;
  setSelectedOwnership: React.Dispatch<React.SetStateAction<string>>;
  selectedSDGs: string[];
  setSelectedSDGs: React.Dispatch<React.SetStateAction<string[]>>;
  selectedCountry: string;
  setSelectedCountry: React.Dispatch<React.SetStateAction<string>>;
  selectedStages: string;
  setSelectedStages: React.Dispatch<React.SetStateAction<string>>;
  showFilters: boolean;
  openSection: string | null;
  toggleSection: (key: string) => void;
  clearAllFilters: () => void;
};

export default function InnovationFilters({
  activeFilterCount,
  selectedField, setSelectedField,
  selectedInterests, setSelectedInterests,
  selectedOwnership, setSelectedOwnership,
  selectedSDGs, setSelectedSDGs,
  selectedCountry, setSelectedCountry,
  selectedStages, setSelectedStages,
  showFilters,
  openSection, toggleSection,
  clearAllFilters,
}: InnovationFiltersProps) {
  const toggleFilter = (value: string, setter: React.Dispatch<React.SetStateAction<string[]>>) =>
    setter(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);

  return (
    <aside className={cn(
      "w-full lg:w-80 flex-shrink-0 space-y-4 transition-all duration-300",
      showFilters ? "block" : "hidden lg:block"
    )}>
      <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm lg:sticky lg:top-20 max-h-[calc(100vh-6rem)] overflow-y-auto custom-scrollbar">
        <div className="mb-4 flex items-center justify-between border-b border-neutral-gray-light pb-3">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-neutral-black">Filters</h3>
            {activeFilterCount > 0 && (
              <span className="flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-brand-red-600 text-white text-[10px] font-bold">
                {activeFilterCount}
              </span>
            )}
          </div>
          {activeFilterCount > 0 ? (
            <button onClick={clearAllFilters} className="text-xs text-brand-red-600 hover:underline font-medium">Reset all</button>
          ) : (
            <span className="text-xs text-neutral-gray-light">Reset all</span>
          )}
        </div>

        <div className="space-y-5">
          {/* Fields */}
          <div>
            <button onClick={() => toggleSection('fields')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black mb-2">
              <span className="flex items-center gap-1.5">
                Fields
                {selectedField && (
                  <span className="text-[10px] font-bold text-brand-red-600 bg-brand-red-100 px-1.5 py-0.5 rounded-full">1</span>
                )}
              </span>
              <ChevronDown className={cn("h-4 w-4 text-neutral-gray-medium transition-transform", openSection === 'fields' && "rotate-180")} />
            </button>
            {openSection === 'fields' && (
              <div className="space-y-1.5 max-h-52 overflow-y-auto pr-2">
                {INNOVATION_FIELDS.map(f => (
                  <label key={f} className="flex items-center gap-2 cursor-pointer group">
                    <input type="radio" name="field-filter" checked={selectedField === f} onChange={() => setSelectedField(prev => prev === f ? '' : f)}
                      className="border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600 h-3.5 w-3.5" />
                    <span className="text-sm text-neutral-gray-dark group-hover:text-brand-navy-900 transition-colors">{f}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Interests */}
          <div>
            <button onClick={() => toggleSection('interests')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black mb-2">
              <span className="flex items-center gap-1.5">
                Interests
                {selectedInterests.length > 0 && (
                  <span className="text-[10px] font-bold text-brand-red-600 bg-brand-red-100 px-1.5 py-0.5 rounded-full">{selectedInterests.length}</span>
                )}
              </span>
              <ChevronDown className={cn("h-4 w-4 text-neutral-gray-medium transition-transform", openSection === 'interests' && "rotate-180")} />
            </button>
            {openSection === 'interests' && (
              <div className="space-y-1.5">
                {INNOVATION_INTERESTS.map(i => (
                  <label key={i} className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" checked={selectedInterests.includes(i)} onChange={() => toggleFilter(i, setSelectedInterests)}
                      className="rounded border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600 h-3.5 w-3.5" />
                    <span className="text-lg mr-1">{INNOVATION_INTERESTS_EMOJI[i]?.emoji}</span>
                    <span className="text-xs text-neutral-gray-dark group-hover:text-brand-navy-900 transition-colors">{i}</span>
                    <InfoTooltip content={
                      i === 'Investment | Partnership' ? 'Inventor wishes to work with individuals/brands that can invest into their innovation.' :
                      i === 'Purchase | Trade' ? 'Inventor wishes to work with individuals/brands that can directly purchase and sell their innovative product.' :
                      i === 'Marketing' ? 'Inventor wishes to work with individuals/brands that can link them to potential markets for their innovation.' :
                      i === 'Training | Mentorship' ? 'Inventor wishes to work with individuals/brands that can advance their knowledge further in the innovation.' :
                      'Inventor wishes to work with individuals/brands that can help create targeted awareness of their innovation.'
                    } />
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Stage */}
          <div>
            <button onClick={() => toggleSection('stage')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black mb-2">
              <span className="flex items-center gap-1.5">
                Stage
                {selectedStages && (
                  <span className="text-[10px] font-bold text-brand-red-600 bg-brand-red-100 px-1.5 py-0.5 rounded-full">1</span>
                )}
              </span>
              <ChevronDown className={cn("h-4 w-4 text-neutral-gray-medium transition-transform", openSection === 'stage' && "rotate-180")} />
            </button>
            {openSection === 'stage' && (
              <div className="space-y-1.5">
                {INNOVATION_STAGES.map(s => (
                  <label key={s} className="flex items-center gap-2 cursor-pointer group">
                    <input type="radio" name="stage-filter" checked={selectedStages === s} onChange={() => setSelectedStages(prev => prev === s ? '' : s)}
                      className="border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600 h-3.5 w-3.5" />
                    <span className="text-sm text-neutral-gray-dark group-hover:text-brand-navy-900 transition-colors">{s}</span>
                    <InfoTooltip content={
                      s === 'Ideation' ? 'Innovation only exists as an idea or concept.' :
                      s === 'Research & Development' ? 'Innovative idea is under scientific experimentation and technical development.' :
                      s === 'Prototype' ? 'A working model of innovation is created and ready for testing and validation.' :
                      s === 'MVP' ? 'A validated and useable version of the innovation is currently available to users.' :
                      s === 'Scale-Up' ? 'Innovation is validated and ready for mass-production.' :
                      'Innovation is ready to be introduced and distributed in suitable markets.'
                    } />
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Ownership */}
          <div>
            <button onClick={() => toggleSection('ownership')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black mb-2">
              <span className="flex items-center gap-1.5">
                Ownership
                {selectedOwnership && (
                  <span className="text-[10px] font-bold text-brand-red-600 bg-brand-red-100 px-1.5 py-0.5 rounded-full">1</span>
                )}
              </span>
              <ChevronDown className={cn("h-4 w-4 text-neutral-gray-medium transition-transform", openSection === 'ownership' && "rotate-180")} />
            </button>
            {openSection === 'ownership' && (
              <div className="space-y-1.5 max-h-44 overflow-y-auto pr-2">
                {INNOVATION_OWNERSHIP.map(o => (
                  <label key={o} className="flex items-center gap-2 cursor-pointer group">
                    <input type="radio" name="ownership-filter" checked={selectedOwnership === o} onChange={() => setSelectedOwnership(prev => prev === o ? '' : o)}
                      className="border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600 h-3.5 w-3.5" />
                    <span className="text-sm text-neutral-gray-dark group-hover:text-brand-navy-900 transition-colors">{o}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* SDGs */}
          <div>
            <button onClick={() => toggleSection('sdgs')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black mb-2">
              <span className="flex items-center gap-1.5">
                SDGs
                {selectedSDGs.length > 0 && (
                  <span className="text-[10px] font-bold text-brand-red-600 bg-brand-red-100 px-1.5 py-0.5 rounded-full">{selectedSDGs.length}</span>
                )}
              </span>
              <ChevronDown className={cn("h-4 w-4 text-neutral-gray-medium transition-transform", openSection === 'sdgs' && "rotate-180")} />
            </button>
            {openSection === 'sdgs' && (
              <div className="space-y-1.5 max-h-52 overflow-y-auto pr-2">
                {INNOVATION_SDGS.map(s => (
                  <label key={s} className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" checked={selectedSDGs.includes(s)} onChange={() => toggleFilter(s, setSelectedSDGs)}
                      className="rounded border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600 h-3.5 w-3.5" />
                    <span className="text-xs text-neutral-gray-dark group-hover:text-brand-navy-900 transition-colors leading-tight">{s}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Country */}
          <div>
            <button onClick={() => toggleSection('country')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black mb-2">
              <span className="flex items-center gap-1.5">
                Country
                {selectedCountry && (
                  <span className="text-[10px] font-bold text-brand-red-600 bg-brand-red-100 px-1.5 py-0.5 rounded-full">1</span>
                )}
              </span>
              <ChevronDown className={cn("h-4 w-4 text-neutral-gray-medium transition-transform", openSection === 'country' && "rotate-180")} />
            </button>
            {openSection === 'country' && (
              <div className="space-y-1.5">
                <select
                  value={selectedCountry}
                  onChange={e => setSelectedCountry(e.target.value)}
                  className="w-full rounded-lg border border-neutral-gray-light text-sm p-2 bg-neutral-bg-light focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
                >
                  <option value="">All African Countries</option>
                  {AFRICAN_COUNTRIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
