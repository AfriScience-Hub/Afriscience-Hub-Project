'use client';

import { Filter, CheckCircle, ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '../../../lib/utils';
import {
  SCHOOL_CLASSES, SCHOOL_OWNERSHIPS, SCHOOL_GENDERS, SCHOOL_PROGRAMS,
  SCHOOL_SERVICES, STATUSES, WORLD_COUNTRIES,
} from '../data';

const UNI_OWNERSHIPS = ['Private', 'Government | Public', 'Open', 'Inter-Government', 'NGO | Charity'];
const UNI_SERVICES = [
  'Community Service', 'Competitions', 'Fieldworks & Workshops',
  'Research & Development', 'Scholarships', 'Student Welfare Programs',
  'Teaching & Learning'
];

function FilterSection({ title, isOpen, onToggle, children }: { title: string; isOpen: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <div className="border-b border-neutral-gray-light py-4 last:border-0">
      <button
        className="flex w-full items-center justify-between text-sm font-bold text-neutral-black hover:text-brand-red-600 transition-colors cursor-pointer"
        onClick={onToggle}
      >
        {title}
        {isOpen ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
      </button>
      {isOpen && <div className="mt-3 animate-in slide-in-from-top-1 duration-200">{children}</div>}
    </div>
  );
}

/**
 * One option row. `multi` renders a checkbox, otherwise a radio. In both cases
 * clicking the active option clears it, so every filter can be turned off.
 */
function FilterOption({ label, active, onToggle, multi = true }: {
  label: string;
  active: boolean;
  onToggle: () => void;
  multi?: boolean;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <input
        type={multi ? 'checkbox' : 'radio'}
        checked={active}
        onChange={onToggle}
        className={cn(
          "border-slate-300 bg-white text-brand-red-600 focus:ring-brand-red-600",
          multi && "rounded"
        )}
      />
      <span className="text-sm text-slate-600 group-hover:text-neutral-black">{label}</span>
    </label>
  );
}

type InstituteFiltersProps = {
  activeTab: 'schools' | 'universities';
  selectedClasses: string[];
  setSelectedClasses: (val: string[]) => void;
  selectedPrograms: string[];
  setSelectedPrograms: (val: string[]) => void;
  selectedOwnerships: string[];
  setSelectedOwnerships: (val: string[]) => void;
  selectedGenders: string[];
  setSelectedGenders: (val: string[]) => void;
  selectedServices: string[];
  setSelectedServices: (val: string[]) => void;
  selectedStatus: string[];
  setSelectedStatus: (val: string[]) => void;
  selectedCountry: string;
  setSelectedCountry: (val: string) => void;
  selectedState: string;
  setSelectedState: (val: string) => void;
  showFilters: boolean;
  openFilterSection: string | null;
  handleFilterSectionToggle: (section: string) => void;
  resetFilters: () => void;
};

export default function InstituteFilters({
  activeTab,
  selectedClasses, setSelectedClasses,
  selectedPrograms, setSelectedPrograms,
  selectedOwnerships, setSelectedOwnerships,
  selectedGenders, setSelectedGenders,
  selectedServices, setSelectedServices,
  selectedStatus, setSelectedStatus,
  selectedCountry, setSelectedCountry,
  selectedState, setSelectedState,
  showFilters,
  openFilterSection, handleFilterSectionToggle,
  resetFilters,
}: InstituteFiltersProps) {
  const isSchools = activeTab === 'schools';

  /** Multi-select toggle (services, university filters). */
  const toggleFilter = (item: string, current: string[], set: (val: string[]) => void) => {
    if (current.includes(item)) {
      set(current.filter(i => i !== item));
    } else {
      set([...current, item]);
    }
  };

  /** Single-select toggle — one value at a time, click again to clear. */
  const selectOne = (item: string, current: string[], set: (val: string[]) => void) => {
    set(current.length === 1 && current[0] === item ? [] : [item]);
  };

  return (
    <aside className={cn(
      "w-full lg:w-60 flex-shrink-0 transition-all duration-300 ease-in-out",
      showFilters ? "block" : "hidden lg:block"
    )}>
      <div className="rounded-xl border bg-white p-5 shadow-sm lg:sticky lg:top-32 max-h-[calc(100vh-10rem)] overflow-y-auto custom-scrollbar">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-neutral-black flex items-center gap-2">
            <Filter className="h-4 w-4 text-brand-red-600" />
            Filters
          </h3>
          <button onClick={resetFilters} className="text-xs text-brand-red-600 hover:underline font-medium cursor-pointer">
            Reset All
          </button>
        </div>

        <div className="divide-y divide-neutral-gray-light">
          {isSchools && (
            <>
              <FilterSection title="Class" isOpen={openFilterSection === 'class'} onToggle={() => handleFilterSectionToggle('class')}>
                <div className="space-y-2">
                  {SCHOOL_CLASSES.map((cls) => (
                    <FilterOption key={cls} label={cls} multi={false}
                      active={selectedClasses.includes(cls)}
                      onToggle={() => selectOne(cls, selectedClasses, setSelectedClasses)} />
                  ))}
                </div>
              </FilterSection>

              <FilterSection title="Program" isOpen={openFilterSection === 'program'} onToggle={() => handleFilterSectionToggle('program')}>
                <div className="space-y-2">
                  {SCHOOL_PROGRAMS.map((prog) => (
                    <FilterOption key={prog} label={prog} multi={false}
                      active={selectedPrograms.includes(prog)}
                      onToggle={() => selectOne(prog, selectedPrograms, setSelectedPrograms)} />
                  ))}
                </div>
              </FilterSection>

              <FilterSection title="Gender" isOpen={openFilterSection === 'gender'} onToggle={() => handleFilterSectionToggle('gender')}>
                <div className="space-y-2">
                  {SCHOOL_GENDERS.map((gen) => (
                    <FilterOption key={gen} label={gen} multi={false}
                      active={selectedGenders.includes(gen)}
                      onToggle={() => selectOne(gen, selectedGenders, setSelectedGenders)} />
                  ))}
                </div>
              </FilterSection>
            </>
          )}

          {!isSchools && (
            <div className="py-4 border-b border-neutral-gray-light">
              <div className="text-sm font-bold text-neutral-black mb-2">Type</div>
              <div className="flex items-center gap-2 text-brand-red-600 bg-brand-red-100 px-3 py-2 rounded-lg border border-brand-red-100">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Universities</span>
              </div>
            </div>
          )}

          <FilterSection title="Ownership" isOpen={openFilterSection === 'ownership'} onToggle={() => handleFilterSectionToggle('ownership')}>
            <div className="space-y-2">
              {(isSchools ? SCHOOL_OWNERSHIPS : UNI_OWNERSHIPS).map((own) => (
                <FilterOption key={own} label={own} multi={!isSchools}
                  active={selectedOwnerships.includes(own)}
                  onToggle={() => isSchools
                    ? selectOne(own, selectedOwnerships, setSelectedOwnerships)
                    : toggleFilter(own, selectedOwnerships, setSelectedOwnerships)} />
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Services" isOpen={openFilterSection === 'services'} onToggle={() => handleFilterSectionToggle('services')}>
            <div className="max-h-56 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
              {(isSchools ? SCHOOL_SERVICES : UNI_SERVICES).map((svc) => (
                <FilterOption key={svc} label={svc}
                  active={selectedServices.includes(svc)}
                  onToggle={() => toggleFilter(svc, selectedServices, setSelectedServices)} />
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Status" isOpen={openFilterSection === 'status'} onToggle={() => handleFilterSectionToggle('status')}>
            <div className="space-y-2">
              {STATUSES.map((stat) => (
                <FilterOption key={stat} label={stat} multi={!isSchools}
                  active={selectedStatus.includes(stat)}
                  onToggle={() => isSchools
                    ? selectOne(stat, selectedStatus, setSelectedStatus)
                    : toggleFilter(stat, selectedStatus, setSelectedStatus)} />
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Country" isOpen={openFilterSection === 'country'} onToggle={() => handleFilterSectionToggle('country')}>
            <select className="w-full rounded-md border border-slate-300 p-2 text-sm focus:border-brand-red-600 focus:outline-none bg-white cursor-pointer"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}>
              <option value="">All Countries</option>
              {WORLD_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </FilterSection>

          <FilterSection title="State / Region" isOpen={openFilterSection === 'state'} onToggle={() => handleFilterSectionToggle('state')}>
            <input
              type="text"
              placeholder="Type a state or region"
              className="w-full rounded-md border border-slate-300 p-2 text-sm focus:border-brand-red-600 focus:outline-none bg-white"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
            />
          </FilterSection>
        </div>
      </div>
    </aside>
  );
}
