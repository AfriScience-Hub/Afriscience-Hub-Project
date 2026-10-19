'use client';

import { ChevronDown } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { AFRICAN_COUNTRIES } from '../../data/mockData';
import { useInnovationOptionsMap, type InnovationOptionType } from '../../data/innovationOptions';
import { InfoTooltip } from './InnovationHelpers';

const OPTION_TYPES: InnovationOptionType[] = ['FIELD', 'INTEREST', 'STAGE', 'OWNERSHIP', 'SDG'];

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
  const { options, loading } = useInnovationOptionsMap(OPTION_TYPES);

  const toggleFilter = (value: string, setter: React.Dispatch<React.SetStateAction<string[]>>) =>
    setter(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);

  const list = (type: InnovationOptionType) => options[type] ?? [];

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
            <button onClick={clearAllFilters} className="text-xs text-brand-red-600 hover:underline font-medium cursor-pointer">Reset all</button>
          ) : (
            <span className="text-xs text-neutral-gray-light">Reset all</span>
          )}
        </div>

        <div className="space-y-5">
          {loading && (
            <p className="flex items-center gap-2 text-xs text-neutral-gray-medium">
              <span className="h-3 w-3 rounded-full border-2 border-neutral-gray-light border-t-brand-red-600 animate-spin" />
              Loading options...
            </p>
          )}

          {/* Fields */}
          <div>
            <button onClick={() => toggleSection('fields')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black mb-2 cursor-pointer">
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
                {list('FIELD').map(f => (
                  <label key={f.id} className="flex items-center gap-2 cursor-pointer group">
                    <input type="radio" name="field-filter" checked={selectedField === f.content} onChange={() => setSelectedField(prev => prev === f.content ? '' : f.content)}
                      className="border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600 h-3.5 w-3.5" />
                    <span className="text-sm text-neutral-gray-dark group-hover:text-brand-navy-900 transition-colors">{f.content}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Interests */}
          <div>
            <button onClick={() => toggleSection('interests')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black mb-2 cursor-pointer">
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
                {list('INTEREST').map(i => (
                  <label key={i.id} className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" checked={selectedInterests.includes(i.content)} onChange={() => toggleFilter(i.content, setSelectedInterests)}
                      className="rounded border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600 h-3.5 w-3.5" />
                    <span className="text-xs text-neutral-gray-dark group-hover:text-brand-navy-900 transition-colors">{i.content}</span>
                    {i.notes && <InfoTooltip content={i.notes} />}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Stage */}
          <div>
            <button onClick={() => toggleSection('stage')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black mb-2 cursor-pointer">
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
                {list('STAGE').map(s => (
                  <label key={s.id} className="flex items-center gap-2 cursor-pointer group">
                    <input type="radio" name="stage-filter" checked={selectedStages === s.content} onChange={() => setSelectedStages(prev => prev === s.content ? '' : s.content)}
                      className="border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600 h-3.5 w-3.5" />
                    <span className="text-sm text-neutral-gray-dark group-hover:text-brand-navy-900 transition-colors">{s.content}</span>
                    {s.notes && <InfoTooltip content={s.notes} />}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Ownership */}
          <div>
            <button onClick={() => toggleSection('ownership')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black mb-2 cursor-pointer">
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
                {list('OWNERSHIP').map(o => (
                  <label key={o.id} className="flex items-center gap-2 cursor-pointer group">
                    <input type="radio" name="ownership-filter" checked={selectedOwnership === o.content} onChange={() => setSelectedOwnership(prev => prev === o.content ? '' : o.content)}
                      className="border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600 h-3.5 w-3.5" />
                    <span className="text-sm text-neutral-gray-dark group-hover:text-brand-navy-900 transition-colors">{o.content}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* SDGs */}
          <div>
            <button onClick={() => toggleSection('sdgs')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black mb-2 cursor-pointer">
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
                {list('SDG').map(s => (
                  <label key={s.id} className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" checked={selectedSDGs.includes(s.content)} onChange={() => toggleFilter(s.content, setSelectedSDGs)}
                      className="rounded border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600 h-3.5 w-3.5" />
                    <span className="text-xs text-neutral-gray-dark group-hover:text-brand-navy-900 transition-colors leading-tight">{s.content}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Country */}
          <div>
            <button onClick={() => toggleSection('country')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black mb-2 cursor-pointer">
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
