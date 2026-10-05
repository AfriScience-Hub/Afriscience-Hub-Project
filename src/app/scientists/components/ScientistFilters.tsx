'use client';

import { Filter, ChevronDown } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { SCIENTIST_FIELDS, SCIENTIST_DEGREES, SCIENTIST_SERVICES, PROFESSIONS_BY_FIELD } from '../../data/mockData';

const COUNTRIES = [
  'Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi',
  'Cameroon', 'Cape Verde', 'Central African Republic', 'Chad', 'Comoros',
  'Congo (DRC)', 'Congo (Republic)', "Côte d'Ivoire", 'Djibouti', 'Egypt',
  'Equatorial Guinea', 'Eritrea', 'Eswatini', 'Ethiopia', 'Gabon', 'Gambia',
  'Ghana', 'Guinea', 'Guinea-Bissau', 'Kenya', 'Lesotho', 'Liberia', 'Libya',
  'Madagascar', 'Malawi', 'Mali', 'Mauritania', 'Mauritius', 'Morocco',
  'Mozambique', 'Namibia', 'Niger', 'Nigeria', 'Rwanda', 'São Tomé and Príncipe',
  'Senegal', 'Seychelles', 'Sierra Leone', 'Somalia', 'South Africa', 'South Sudan',
  'Sudan', 'Tanzania', 'Togo', 'Tunisia', 'Uganda', 'Zambia', 'Zimbabwe'
];
const STATES: Record<string, string[]> = {
  'Egypt': ['Cairo', 'Alexandria', 'Giza', 'Luxor'],
  'Ethiopia': ['Addis Ababa', 'Dire Dawa', 'Bahir Dar'],
  'Ghana': ['Greater Accra', 'Ashanti', 'Central', 'Western', 'Eastern', 'Northern'],
  'Kenya': ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret'],
  'Morocco': ['Casablanca', 'Rabat', 'Marrakech', 'Fez'],
  'Nigeria': ['Lagos', 'Abuja', 'Kano', 'Rivers', 'Oyo', 'Enugu', 'Kaduna', 'Ogun', 'Delta'],
  'Rwanda': ['Kigali City', 'Northern', 'Southern', 'Eastern', 'Western'],
  'Senegal': ['Dakar', 'Saint-Louis', 'Thiès'],
  'South Africa': ['Western Cape', 'Gauteng', 'KwaZulu-Natal', 'Eastern Cape', 'Free State'],
  'Tanzania': ['Dar es Salaam', 'Dodoma', 'Arusha', 'Mwanza'],
  'Uganda': ['Central', 'Eastern', 'Northern', 'Western'],
};

type ScientistFiltersProps = {
  selectedField: string;
  handleFieldChange: (field: string) => void;
  selectedProfessions: string[];
  setSelectedProfessions: (val: string[]) => void;
  selectedDegree: string;
  setSelectedDegree: (val: string) => void;
  selectedServices: string[];
  setSelectedServices: (val: string[]) => void;
  selectedStatus: string;
  setSelectedStatus: (val: string) => void;
  selectedCountry: string;
  setSelectedCountry: (val: string) => void;
  selectedState: string;
  setSelectedState: (val: string) => void;
  showFilters: boolean;
  collapsedSections: Record<string, boolean>;
  toggleSection: (key: string) => void;
  activeFilterCount: number;
  resetFilters: () => void;
};

const inputCls = 'border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600 h-3.5 w-3.5';

export default function ScientistFilters({
  selectedField, handleFieldChange,
  selectedProfessions, setSelectedProfessions,
  selectedDegree, setSelectedDegree,
  selectedServices, setSelectedServices,
  selectedStatus, setSelectedStatus,
  selectedCountry, setSelectedCountry,
  selectedState, setSelectedState,
  showFilters,
  collapsedSections, toggleSection,
  activeFilterCount, resetFilters,
}: ScientistFiltersProps) {
  const availableProfessions = selectedField ? PROFESSIONS_BY_FIELD[selectedField] || [] : [];

  const toggleProfession = (item: string) => {
    setSelectedProfessions(
      selectedProfessions.includes(item)
        ? selectedProfessions.filter(i => i !== item)
        : [...selectedProfessions, item]
    );
  };

  const toggleService = (item: string) => {
    setSelectedServices(
      selectedServices.includes(item)
        ? selectedServices.filter(i => i !== item)
        : [...selectedServices, item]
    );
  };

  return (
    <aside className={cn(
      "w-full lg:w-72 flex-shrink-0 space-y-6 transition-all duration-300",
      showFilters ? "block" : "hidden lg:block"
    )}>
      <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm lg:sticky lg:top-20 max-h-[calc(100vh-6rem)] overflow-y-auto custom-scrollbar">
        <div className="mb-4 flex items-center justify-between border-b border-neutral-gray-light pb-3">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-brand-red-600" />
            <h3 className="font-bold text-neutral-black">Filters</h3>
            {activeFilterCount > 0 && (
              <span className="flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-brand-red-600 text-white text-[10px] font-bold">
                {activeFilterCount}
              </span>
            )}
          </div>
          <button onClick={resetFilters} className="text-xs text-brand-red-600 hover:underline font-medium cursor-pointer">
            Reset All
          </button>
        </div>

        <div className="space-y-0 divide-y divide-neutral-gray-light">
          {/* Fields (1 selection at a time) */}
          <div className="py-4 first:pt-0">
            <button onClick={() => toggleSection('fields')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black mb-0 hover:text-brand-red-600 transition-colors cursor-pointer">
              <span className="flex items-center gap-1.5">
                Fields
                {selectedField && (
                  <span className="text-[10px] font-bold text-brand-red-600 bg-brand-red-100 px-1.5 py-0.5 rounded-full">1</span>
                )}
              </span>
              <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", !collapsedSections.fields && "rotate-180")} />
            </button>
            {!collapsedSections.fields && (
              <div className="mt-3 space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar animate-in fade-in duration-200">
                {SCIENTIST_FIELDS.map((field) => (
                  <label key={field} className="flex items-center gap-2 cursor-pointer group">
                    <input type="radio" name="scientist-field" checked={selectedField === field}
                      onChange={() => handleFieldChange(field)} className={inputCls} />
                    <span className="text-sm text-neutral-gray-dark group-hover:text-brand-navy-900 transition-colors">{field}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Profession (professions under the selected field) */}
          <div className="py-4">
            <button onClick={() => toggleSection('profession')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black mb-0 hover:text-brand-red-600 transition-colors cursor-pointer">
              <span className="flex items-center gap-1.5">
                Profession
                {selectedProfessions.length > 0 && (
                  <span className="text-[10px] font-bold text-brand-red-600 bg-brand-red-100 px-1.5 py-0.5 rounded-full">{selectedProfessions.length}</span>
                )}
              </span>
              <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", !collapsedSections.profession && "rotate-180")} />
            </button>
            {selectedField && (
              <p className="text-[10px] text-neutral-gray-medium mt-1">
                Showing professions for: <span className="font-bold text-brand-navy-900">{selectedField}</span>
              </p>
            )}
            {!collapsedSections.profession && (
              <div className="mt-3 space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar animate-in fade-in duration-200">
                {availableProfessions.length > 0 ? availableProfessions.map((prof) => (
                  <label key={prof} className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" checked={selectedProfessions.includes(prof)}
                      onChange={() => toggleProfession(prof)} className="rounded border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600 h-3.5 w-3.5" />
                    <span className="text-sm text-neutral-gray-dark group-hover:text-brand-navy-900 transition-colors">{prof}</span>
                  </label>
                )) : (
                  <p className="text-xs text-neutral-gray-medium italic">Select a field to see professions.</p>
                )}
              </div>
            )}
          </div>

          {/* Degree (1 selection at a time) */}
          <div className="py-4">
            <button onClick={() => toggleSection('degree')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black mb-0 hover:text-brand-red-600 transition-colors cursor-pointer">
              <span className="flex items-center gap-1.5">
                Degree
                {selectedDegree && (
                  <span className="text-[10px] font-bold text-brand-red-600 bg-brand-red-100 px-1.5 py-0.5 rounded-full">1</span>
                )}
              </span>
              <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", !collapsedSections.degree && "rotate-180")} />
            </button>
            {!collapsedSections.degree && (
              <div className="mt-3 space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar animate-in fade-in duration-200">
                {SCIENTIST_DEGREES.map((degree) => (
                  <label key={degree} className="flex items-center gap-2 cursor-pointer group">
                    <input type="radio" name="scientist-degree" checked={selectedDegree === degree}
                      onChange={() => setSelectedDegree(selectedDegree === degree ? '' : degree)} className={inputCls} />
                    <span className="text-sm text-neutral-gray-dark group-hover:text-brand-navy-900 transition-colors">{degree}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Services */}
          <div className="py-4">
            <button onClick={() => toggleSection('services')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black mb-0 hover:text-brand-red-600 transition-colors cursor-pointer">
              <span className="flex items-center gap-1.5">
                Services
                {selectedServices.length > 0 && (
                  <span className="text-[10px] font-bold text-brand-red-600 bg-brand-red-100 px-1.5 py-0.5 rounded-full">{selectedServices.length}</span>
                )}
              </span>
              <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", !collapsedSections.services && "rotate-180")} />
            </button>
            {!collapsedSections.services && (
              <div className="mt-3 space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar animate-in fade-in duration-200">
                {SCIENTIST_SERVICES.map((svc) => (
                  <label key={svc} className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" checked={selectedServices.includes(svc)}
                      onChange={() => toggleService(svc)} className="rounded border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600 h-3.5 w-3.5" />
                    <span className="text-sm text-neutral-gray-dark group-hover:text-brand-navy-900 transition-colors truncate" title={svc}>{svc}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Status (1 selection at a time) */}
          <div className="py-4">
            <button onClick={() => toggleSection('status')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black mb-0 hover:text-brand-red-600 transition-colors cursor-pointer">
              <span className="flex items-center gap-1.5">
                Status
                {selectedStatus && (
                  <span className="text-[10px] font-bold text-brand-red-600 bg-brand-red-100 px-1.5 py-0.5 rounded-full">1</span>
                )}
              </span>
              <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", !collapsedSections.status && "rotate-180")} />
            </button>
            {!collapsedSections.status && (
              <div className="mt-3 space-y-2 animate-in fade-in duration-200">
                {['Online', 'Offline'].map((status) => (
                  <label key={status} className="flex items-center gap-2 cursor-pointer group">
                    <input type="radio" name="scientist-status" checked={selectedStatus === status}
                      onChange={() => setSelectedStatus(selectedStatus === status ? '' : status)} className={inputCls} />
                    <span className="text-sm text-neutral-gray-dark group-hover:text-brand-navy-900 transition-colors">{status}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Country */}
          <div className="py-4">
            <button onClick={() => toggleSection('country')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black mb-0 hover:text-brand-red-600 transition-colors cursor-pointer">
              Country
              <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", !collapsedSections.country && "rotate-180")} />
            </button>
            {!collapsedSections.country && (
              <div className="mt-3 animate-in fade-in duration-200">
                <select className="w-full rounded-lg border border-neutral-gray-light text-sm p-2 bg-neutral-bg-light focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
                  value={selectedCountry}
                  onChange={(e) => { setSelectedCountry(e.target.value); setSelectedState(''); }}>
                  <option value="">All Countries</option>
                  {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            )}
          </div>

          {/* State / Region */}
          <div className="py-4 last:pb-0">
            <button onClick={() => toggleSection('state')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black mb-0 hover:text-brand-red-600 transition-colors cursor-pointer">
              State / Region
              <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", !collapsedSections.state && "rotate-180")} />
            </button>
            {!collapsedSections.state && (
              <div className="mt-3 animate-in fade-in duration-200">
                {selectedCountry && STATES[selectedCountry] ? (
                  <select className="w-full rounded-lg border border-neutral-gray-light text-sm p-2 bg-neutral-bg-light focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}>
                    <option value="">All Regions</option>
                    {STATES[selectedCountry].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                ) : (
                  <p className="text-xs text-slate-400 italic">Select a country first</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
