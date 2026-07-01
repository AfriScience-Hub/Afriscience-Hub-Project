'use client';

import { Filter, CheckCircle, ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '../../../lib/utils';

const STATUSES = ['Online', 'Offline'];
const COUNTRIES = [
  'Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi',
  'Cameroon', 'Cape Verde', 'Central African Republic', 'Chad', 'Comoros',
  'Congo (DRC)', 'Congo (Republic)', 'Côte d\'Ivoire', 'Djibouti', 'Egypt',
  'Equatorial Guinea', 'Eritrea', 'Eswatini', 'Ethiopia', 'Gabon', 'Gambia',
  'Ghana', 'Guinea', 'Guinea-Bissau', 'Kenya', 'Lesotho', 'Liberia', 'Libya',
  'Madagascar', 'Malawi', 'Mali', 'Mauritania', 'Mauritius', 'Morocco',
  'Mozambique', 'Namibia', 'Niger', 'Nigeria', 'Rwanda', 'São Tomé and Príncipe',
  'Senegal', 'Seychelles', 'Sierra Leone', 'Somalia', 'South Africa', 'South Sudan',
  'Sudan', 'Tanzania', 'Togo', 'Tunisia', 'Uganda', 'Zambia', 'Zimbabwe'
];
const SCHOOL_CLASSES = ['Primary', 'Secondary', 'Primary & Secondary'];
const SCHOOL_OWNERSHIPS = ['Private', 'Government | Public', 'Mission', 'International', 'Inter-Government', 'NGO | Charity'];
const SCHOOL_GENDERS = ['Female', 'Male', 'Mixed'];
const SCHOOL_SERVICES = [
  'Competitions', 'Conferences', 'Excursions', 'Exercises & Sports',
  'Extra Lessons', 'Health Programs', 'PTA Meetings', 'Reunions',
  'Scholarships', 'Science Clubs', 'Teaching & Learning'
];
const UNI_OWNERSHIPS = ['Private', 'Government | Public', 'Open', 'Inter-Government', 'NGO | Charity'];
const UNI_SERVICES = [
  'Community Service', 'Competitions', 'Fieldworks & Workshops',
  'Research & Development', 'Scholarships', 'Student Welfare Programs',
  'Teaching & Learning'
];
const STATES: Record<string, string[]> = {
  'Algeria': ['Algiers', 'Oran', 'Constantine'],
  'Angola': ['Luanda', 'Benguela', 'Huambo'],
  'Benin': ['Cotonou', 'Porto-Novo', 'Parakou'],
  'Botswana': ['Gaborone', 'Francistown'],
  'Cameroon': ['Yaoundé', 'Douala', 'Bamenda'],
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
  'Zambia': ['Lusaka', 'Copperbelt', 'Southern'],
  'Zimbabwe': ['Harare', 'Bulawayo', 'Manicaland'],
};

function FilterSection({ title, isOpen, onToggle, children }: { title: string; isOpen: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <div className="border-b border-neutral-gray-light py-4 last:border-0">
      <button
        className="flex w-full items-center justify-between text-sm font-bold text-neutral-black hover:text-brand-red-600 transition-colors"
        onClick={onToggle}
      >
        {title}
        {isOpen ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
      </button>
      {isOpen && <div className="mt-3 animate-in slide-in-from-top-1 duration-200">{children}</div>}
    </div>
  );
}

type InstituteFiltersProps = {
  activeTab: 'schools' | 'universities';
  selectedClasses: string[];
  setSelectedClasses: (val: string[]) => void;
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
  const toggleFilter = (item: string, current: string[], set: (val: string[]) => void) => {
    if (current.includes(item)) {
      set(current.filter(i => i !== item));
    } else {
      set([...current, item]);
    }
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
          <button onClick={resetFilters} className="text-xs text-brand-red-600 hover:underline font-medium">
            Reset All
          </button>
        </div>

        <div className="divide-y divide-neutral-gray-light">
          {activeTab === 'schools' && (
            <FilterSection title="Class" isOpen={openFilterSection === 'class'} onToggle={() => handleFilterSectionToggle('class')}>
              <div className="space-y-2">
                {SCHOOL_CLASSES.map((cls) => (
                  <label key={cls} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" checked={selectedClasses.includes(cls)}
                      onChange={() => toggleFilter(cls, selectedClasses, setSelectedClasses)}
                      className="rounded border-slate-300 bg-white text-brand-red-600 focus:ring-brand-red-600" />
                    <span className="text-sm text-slate-600 group-hover:text-neutral-black">{cls}</span>
                  </label>
                ))}
              </div>
            </FilterSection>
          )}

          {activeTab === 'universities' && (
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
              {(activeTab === 'schools' ? SCHOOL_OWNERSHIPS : UNI_OWNERSHIPS).map((own) => (
                <label key={own} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" checked={selectedOwnerships.includes(own)}
                    onChange={() => toggleFilter(own, selectedOwnerships, setSelectedOwnerships)}
                    className="rounded border-slate-300 bg-white text-brand-red-600 focus:ring-brand-red-600" />
                  <span className="text-sm text-slate-600 group-hover:text-neutral-black">{own}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          {activeTab === 'schools' && (
            <FilterSection title="Gender" isOpen={openFilterSection === 'gender'} onToggle={() => handleFilterSectionToggle('gender')}>
              <div className="space-y-2">
                {SCHOOL_GENDERS.map((gen) => (
                  <label key={gen} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" checked={selectedGenders.includes(gen)}
                      onChange={() => toggleFilter(gen, selectedGenders, setSelectedGenders)}
                      className="rounded border-slate-300 bg-white text-brand-red-600 focus:ring-brand-red-600" />
                    <span className="text-sm text-slate-600 group-hover:text-neutral-black">{gen}</span>
                  </label>
                ))}
              </div>
            </FilterSection>
          )}

          <FilterSection title="Services" isOpen={openFilterSection === 'services'} onToggle={() => handleFilterSectionToggle('services')}>
            <div className="max-h-48 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
              {(activeTab === 'schools' ? SCHOOL_SERVICES : UNI_SERVICES).map((svc) => (
                <label key={svc} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" checked={selectedServices.includes(svc)}
                    onChange={() => toggleFilter(svc, selectedServices, setSelectedServices)}
                    className="rounded border-slate-300 bg-white text-brand-red-600 focus:ring-brand-red-600" />
                  <span className="text-sm text-slate-600 group-hover:text-neutral-black truncate" title={svc}>{svc}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Status" isOpen={openFilterSection === 'status'} onToggle={() => handleFilterSectionToggle('status')}>
            <div className="space-y-2">
              {STATUSES.map((stat) => (
                <label key={stat} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" checked={selectedStatus.includes(stat)}
                    onChange={() => toggleFilter(stat, selectedStatus, setSelectedStatus)}
                    className="rounded border-slate-300 bg-white text-brand-red-600 focus:ring-brand-red-600" />
                  <span className="text-sm text-slate-600 group-hover:text-neutral-black">{stat}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Country" isOpen={openFilterSection === 'country'} onToggle={() => handleFilterSectionToggle('country')}>
            <select className="w-full rounded-md border border-slate-300 p-2 text-sm focus:border-brand-red-600 focus:outline-none bg-white"
              value={selectedCountry}
              onChange={(e) => { setSelectedCountry(e.target.value); setSelectedState(''); }}>
              <option value="">All Countries</option>
              {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </FilterSection>

          <FilterSection title="State / Region" isOpen={openFilterSection === 'state'} onToggle={() => handleFilterSectionToggle('state')}>
            {selectedCountry && STATES[selectedCountry] ? (
              <select className="w-full rounded-md border border-slate-300 p-2 text-sm focus:border-brand-red-600 focus:outline-none bg-white"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}>
                <option value="">All Regions</option>
                {STATES[selectedCountry].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            ) : (
              <p className="text-xs text-slate-400 italic">Select a country first</p>
            )}
          </FilterSection>
        </div>
      </div>
    </aside>
  );
}
