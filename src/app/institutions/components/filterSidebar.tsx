'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';
import { ChevronDown, ChevronUp, Filter, RotateCcw } from 'lucide-react';

interface InstituteFilters {
  status: string[];
  class: string[];
  gender: string[];
  ownership: string[];
  services: string[];
  country: string;
  region: string;
}

interface FilterSidebarProps {
  selectedFilters: InstituteFilters;
  onToggleFilter: (
    type: 'status' | 'class' | 'gender' | 'ownership' | 'services',
    value: string,
    checked: boolean
  ) => void;
  onCountryChange: (value: string) => void;
  onRegionChange: (value: string) => void;
  onReset: () => void;
}

const africaData: Record<string, string[]> = {
  Nigeria: ['Lagos', 'Abuja FCT', 'Rivers', 'Kano'],
  Kenya: ['Nairobi County', 'Mombasa County', 'Kisumu County'],
  'South Africa': ['Gauteng', 'Western Cape', 'KwaZulu-Natal'],
  Ghana: ['Greater Accra', 'Ashanti', 'Western'],
  Egypt: ['Cairo', 'Alexandria', 'Giza'],
  Rwanda: ['Kigali City', 'Northern Province', 'Southern Province'],
};

function FilterSection({
  title,
  id,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  id: string;
  isOpen: boolean;
  onToggle: (id: string) => void;
  children: ReactNode;
}) {
  return (
    <div className="border-b border-gray-100 py-4">
      <button
        type="button"
        onClick={() => onToggle(id)}
        className="flex w-full items-center justify-between text-sm font-bold text-gray-900"
      >
        <span>{title}</span>
        {isOpen ? (
          <ChevronUp size={16} className="text-gray-400" />
        ) : (
          <ChevronDown size={16} className="text-gray-400" />
        )}
      </button>
      {isOpen ? (
        <div className="mt-4 space-y-3 max-h-60 overflow-y-auto scrollbar-hide">{children}</div>
      ) : null}
    </div>
  );
}

function CheckboxItem({
  label,
  category,
  checked,
  onToggleFilter,
}: {
  label: string;
  category: 'status' | 'class' | 'gender' | 'ownership' | 'services';
  checked: boolean;
  onToggleFilter: FilterSidebarProps['onToggleFilter'];
}) {
  return (
    <label className="group flex cursor-pointer items-center gap-3">
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => onToggleFilter(category, label, event.target.checked)}
          className="peer h-4 w-4 appearance-none rounded border-2 border-gray-300 transition-all checked:border-red-500 checked:bg-red-500"
        />
        <div className="absolute text-[10px] text-white opacity-0 peer-checked:opacity-100">✓</div>
      </div>
      <span className="text-sm text-gray-600 transition-colors group-hover:text-gray-900">
        {label}
      </span>
    </label>
  );
}

export default function FilterSidebar({
  selectedFilters,
  onToggleFilter,
  onCountryChange,
  onRegionChange,
  onReset,
}: FilterSidebarProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    class: true,
    ownership: false,
    gender: false,
    services: false,
    status: false,
    location: true,
  });

  const toggleSection = (id: string) => {
    setOpenSections((current) => ({ ...current, [id]: !current[id] }));
  };

  return (
    <aside className="scrollbar-hide sticky top-24 max-h-[40rem] w-full overflow-y-auto rounded-xl border border-gray-800 bg-white shadow-md">
      <div className="flex items-center justify-between px-4 pt-4">
        <div className="flex items-center gap-2 font-bold text-black">
          <Filter size={14} className="text-red-500" />
          <span>Filters</span>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1 text-xs text-red-500 hover:underline"
        >
          <RotateCcw size={12} /> Reset All
        </button>
      </div>

      <div className="p-4">
        <FilterSection title="Class" id="class" isOpen={openSections.class} onToggle={toggleSection}>
          {['Primary', 'Secondary', 'Primary & Secondary'].map((option) => (
            <CheckboxItem
              key={option}
              label={option}
              category="class"
              checked={selectedFilters.class.includes(option)}
              onToggleFilter={onToggleFilter}
            />
          ))}
        </FilterSection>

        <FilterSection
          title="Ownership"
          id="ownership"
          isOpen={openSections.ownership}
          onToggle={toggleSection}
        >
          {['Private', 'Government | Public', 'Mission', 'International', 'Inter-Government', 'NGO | Charity'].map((option) => (
            <CheckboxItem
              key={option}
              label={option}
              category="ownership"
              checked={selectedFilters.ownership.includes(option)}
              onToggleFilter={onToggleFilter}
            />
          ))}
        </FilterSection>

        <FilterSection title="Gender" id="gender" isOpen={openSections.gender} onToggle={toggleSection}>
          {['Female', 'Male', 'Mixed'].map((option) => (
            <CheckboxItem
              key={option}
              label={option}
              category="gender"
              checked={selectedFilters.gender.includes(option)}
              onToggleFilter={onToggleFilter}
            />
          ))}
        </FilterSection>

        <FilterSection
          title="Services"
          id="services"
          isOpen={openSections.services}
          onToggle={toggleSection}
        >
          {[
            'Competitions',
            'Conferences',
            'Excursions',
            'Exercises & Sports',
            'Extra Lessons',
            'Health Programs',
            'PTA Meetings',
            'Reunions',
            'Scholarships',
            'Science Clubs',
            'Teaching & Learning',
          ].map((option) => (
            <CheckboxItem
              key={option}
              label={option}
              category="services"
              checked={selectedFilters.services.includes(option)}
              onToggleFilter={onToggleFilter}
            />
          ))}
        </FilterSection>

        <FilterSection title="Status" id="status" isOpen={openSections.status} onToggle={toggleSection}>
          {['ONLINE', 'OFFLINE'].map((option) => (
            <CheckboxItem
              key={option}
              label={option}
              category="status"
              checked={selectedFilters.status.includes(option)}
              onToggleFilter={onToggleFilter}
            />
          ))}
        </FilterSection>

        <FilterSection title="Location" id="location" isOpen={openSections.location} onToggle={toggleSection}>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Country</label>
              <select
                value={selectedFilters.country}
                onChange={(event) => onCountryChange(event.target.value)}
                className="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 p-2.5 text-sm text-black outline-none transition-colors focus:border-red-500"
                style={{
                  backgroundImage:
                    'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%239ca3af\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'m19 9-7 7-7-7\'/%3E%3C/svg%3E")',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 10px center',
                  backgroundSize: '16px',
                }}
              >
                <option value="">Select Country</option>
                {Object.keys(africaData).map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">State / Region</label>
              <select
                value={selectedFilters.region}
                onChange={(event) => onRegionChange(event.target.value)}
                disabled={!selectedFilters.country}
                className="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 p-2.5 text-sm text-black outline-none transition-colors focus:border-red-500 disabled:opacity-50"
                style={{
                  backgroundImage:
                    'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%239ca3af\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'m19 9-7 7-7-7\'/%3E%3C/svg%3E")',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 10px center',
                  backgroundSize: '16px',
                }}
              >
                <option value="">Select State</option>
                {(selectedFilters.country ? africaData[selectedFilters.country] : []).map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </FilterSection>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </aside>
  );
}
