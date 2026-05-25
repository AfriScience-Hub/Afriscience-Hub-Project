'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';
import { ChevronDown, ChevronUp, Filter, RotateCcw } from 'lucide-react';

type ScientistStatus = 'ONLINE' | 'OFFLINE';

interface ScientistFilters {
  fields: string[];
  professions: string[];
  services: string[];
  status: ScientistStatus[];
  country: string;
  region: string;
}

interface FilterSidebarProps {
  selectedFilters: ScientistFilters;
  onToggleFilter: (
    key: 'fields' | 'professions' | 'services' | 'status',
    value: string,
    checked: boolean
  ) => void;
  onCountryChange: (value: string) => void;
  onRegionChange: (value: string) => void;
  onReset: () => void;
}

const fieldOptions = [
  'Medical',
  'Engineering',
  'Pharmaceutical',
  'Computer & ICT',
  'Hybrid',
  'Veterinary',
  'Agriculture',
  'Food & Nutrition',
  'Physics',
  'Chemistry',
  'Biology',
  'Environmental',
  'Industry & Manufacturing',
  'Energy & Power',
  'Waste & Recycling',
  'Astronomy & Space',
];

const professionOptions = [
  'Animal Nutritionist',
  'Clinical Pharmacologist',
  'Data Analyst',
  'Drug Discovery Scientist',
  'Machine Learning Engineer',
  'Project Manager',
  'Structural Engineer',
  'Toxicologist',
  'Veterinary Surgeon',
];

const serviceOptions = [
  'Architecture & Framework Design',
  'Building & Construction',
  'Consultancy',
  'Content Creation',
  'Education & Training',
  'Entrepreneurship & Business',
  'Fabrication & Installation',
  'Fieldwork',
  'Job Applicant',
  'Lab Analysis & Equipment Expert',
  'Modeling & Simulation',
  'Project Management',
  'Repairs & Maintenance',
  'Research & Development',
  'Writing & Documentations',
  'Others',
];

const countryRegions: Record<string, string[]> = {
  Algeria: ['Algiers', 'Oran', 'Constantine'],
  Angola: ['Luanda', 'Benguela', 'Huambo'],
  Benin: ['Littoral', 'Atlantique', 'Borgou'],
  Botswana: ['South East', 'Central', 'North West'],
  'Burkina Faso': ['Centre', 'Hauts-Bassins', 'Sahel'],
  Burundi: ['Bujumbura Mairie', 'Gitega', 'Ngozi'],
  'Cabo Verde': ['Santiago', 'Sao Vicente', 'Sal'],
  Cameroon: ['Centre', 'Littoral', 'North West'],
  'Central African Republic': ['Bangui', 'Ombella-MPoko', 'Lobaye'],
  Chad: ['N Djamena', 'Logone Occidental', 'Ouaddai'],
  Comoros: ['Grande Comore', 'Anjouan', 'Moheli'],
  Congo: ['Brazzaville', 'Pointe-Noire', 'Kouilou'],
  'Democratic Republic of the Congo': ['Kinshasa', 'Kongo Central', 'Haut-Katanga'],
  Djibouti: ['Djibouti', 'Ali Sabieh', 'Tadjourah'],
  Egypt: ['Cairo', 'Alexandria', 'Giza'],
  'Equatorial Guinea': ['Bioko Norte', 'Litoral', 'Centro Sur'],
  Eritrea: ['Maekel', 'Debub', 'Anseba'],
  Eswatini: ['Hhohho', 'Manzini', 'Lubombo'],
  Ethiopia: ['Addis Ababa', 'Oromia', 'Amhara'],
  Gabon: ['Estuaire', 'Haut-Ogooue', 'Ogooue-Maritime'],
  Gambia: ['Banjul', 'Kanifing', 'West Coast'],
  Ghana: ['Greater Accra', 'Ashanti', 'Northern'],
  Guinea: ['Conakry', 'Kindia', 'Kankan'],
  'Guinea-Bissau': ['Bissau', 'Bafata', 'Cacheu'],
  'Ivory Coast': ['Abidjan', 'Yamoussoukro', 'Savanes'],
  Kenya: ['Nairobi County', 'Mombasa County', 'Kisumu County'],
  Lesotho: ['Maseru', 'Leribe', 'Berea'],
  Liberia: ['Montserrado', 'Bong', 'Nimba'],
  Libya: ['Tripoli', 'Benghazi', 'Misrata'],
  Madagascar: ['Analamanga', 'Atsinanana', 'Boeny'],
  Malawi: ['Central Region', 'Northern Region', 'Southern Region'],
  Mali: ['Bamako', 'Sikasso', 'Segou'],
  Mauritania: ['Nouakchott', 'Dakhlet Nouadhibou', 'Hodh El Gharbi'],
  Mauritius: ['Port Louis', 'Plaines Wilhems', 'Moka'],
  Morocco: ['Casablanca-Settat', 'Rabat-Sale-Kenitra', 'Marrakesh-Safi'],
  Mozambique: ['Maputo', 'Sofala', 'Nampula'],
  Namibia: ['Khomas', 'Erongo', 'Oshana'],
  Niger: ['Niamey', 'Maradi', 'Zinder'],
  Nigeria: ['Lagos', 'Abuja FCT', 'Rivers', 'Kano'],
  Rwanda: ['Kigali City', 'Northern Province', 'Southern Province'],
  'Sao Tome and Principe': ['Agua Grande', 'Me-Zochi', 'Principe'],
  Senegal: ['Dakar', 'Thiès', 'Saint-Louis'],
  Seychelles: ['Mahe', 'Praslin', 'La Digue'],
  'Sierra Leone': ['Western Area', 'Northern Province', 'Southern Province'],
  Somalia: ['Banaadir', 'Puntland', 'Somaliland'],
  'South Africa': ['Gauteng', 'Western Cape', 'KwaZulu-Natal'],
  'South Sudan': ['Central Equatoria', 'Jonglei', 'Upper Nile'],
  Sudan: ['Khartoum', 'Gezira', 'Red Sea'],
  Tanzania: ['Dar es Salaam', 'Arusha', 'Mwanza'],
  Togo: ['Maritime', 'Plateaux', 'Savanes'],
  Tunisia: ['Tunis', 'Sfax', 'Sousse'],
  Uganda: ['Central Region', 'Eastern Region', 'Northern Region'],
  Zambia: ['Lusaka', 'Copperbelt', 'Southern Province'],
  Zimbabwe: ['Harare', 'Bulawayo', 'Manicaland'],
};

function Section({
  title,
  sectionKey,
  openSections,
  onToggle,
  children,
}: {
  title: string;
  sectionKey: string;
  openSections: Record<string, boolean>;
  onToggle: (sectionKey: string) => void;
  children: ReactNode;
}) {
  const isOpen = openSections[sectionKey];

  return (
    <div className="border-t border-[#d9e1ec] py-5">
      <button
        type="button"
        onClick={() => onToggle(sectionKey)}
        className="flex w-full items-center justify-between gap-3 text-left"
      >
        <span className="text-sm font-bold text-[#1f2a3d]">{title}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-[#91a3bf]" />
        ) : (
          <ChevronDown className="h-5 w-5 text-[#91a3bf]" />
        )}
      </button>
      {isOpen ? <div className="pt-4">{children}</div> : null}
    </div>
  );
}

function CheckboxItem({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-4 text-[#51637f]">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-3 w-3 rounded accent-[#1485ff]"
      />
      <span className="text-sm font-medium">{label}</span>
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
  const [openSections, setOpenSections] = useState({
    fields: true,
    professions: false,
    services: false,
    status: false,
    country: false,
    region: false,
  });

  const toggleSection = (sectionKey: string) => {
    setOpenSections((current) =>
      Object.fromEntries(
        Object.keys(current).map((key) => [
          key,
          key === sectionKey ? !current[sectionKey as keyof typeof current] : false,
        ])
      ) as typeof current
    );
  };

  const sortedCountries = Object.keys(countryRegions).sort((a, b) => a.localeCompare(b));
  const selectedRegions = selectedFilters.country ? countryRegions[selectedFilters.country] ?? [] : [];

  return (
    <aside className="h-fit max-h-130 overflow-y-auto rounded-2xl border border-[#d8dfeb] bg-white px-6 py-5 shadow-md scrollbar-hide lg:sticky lg:top-24">
      <div className="flex items-center justify-between gap-2 pb-5">
        <div className="flex items-center gap-3">
          <Filter className="h-5 w-5 text-[#ff3b30]" />
          <span className="text-md font-bold tracking-tight text-[#1a2538]">Filters</span>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#ff3b30] transition hover:opacity-80 cursor-pointer hover:underline"
        >
          <RotateCcw className="h-4 w-4" />
          Reset All
        </button>
      </div>

      <Section title="Fields" sectionKey="fields" openSections={openSections} onToggle={toggleSection}>
        <div className="max-h-72 space-y-4 overflow-y-auto scrollbar-hide">
          {fieldOptions.map((field) => (
            <CheckboxItem
              key={field}
              label={field}
              checked={selectedFilters.fields.includes(field)}
              onChange={(checked) => onToggleFilter('fields', field, checked)}
            />
          ))}
        </div>
      </Section>

      <Section title="Profession" sectionKey="professions" openSections={openSections} onToggle={toggleSection}>
        <div className="max-h-72 space-y-4 overflow-y-auto scrollbar-hide">
          {professionOptions.map((profession) => (
            <CheckboxItem
              key={profession}
              label={profession}
              checked={selectedFilters.professions.includes(profession)}
              onChange={(checked) => onToggleFilter('professions', profession, checked)}
            />
          ))}
        </div>
      </Section>

      <Section title="Services" sectionKey="services" openSections={openSections} onToggle={toggleSection}>
        <div className="max-h-72 space-y-4 overflow-y-auto scrollbar-hide">
          {serviceOptions.map((service) => (
            <CheckboxItem
              key={service}
              label={service}
              checked={selectedFilters.services.includes(service)}
              onChange={(checked) => onToggleFilter('services', service, checked)}
            />
          ))}
        </div>
      </Section>

      <Section title="Status" sectionKey="status" openSections={openSections} onToggle={toggleSection}>
        <div className="space-y-4">
          {(['ONLINE', 'OFFLINE'] as ScientistStatus[]).map((status) => (
            <CheckboxItem
              key={status}
              label={status === 'ONLINE' ? 'Online' : 'Offline'}
              checked={selectedFilters.status.includes(status)}
              onChange={(checked) => onToggleFilter('status', status, checked)}
            />
          ))}
        </div>
      </Section>

      <Section title="Country" sectionKey="country" openSections={openSections} onToggle={toggleSection}>
        <select
          value={selectedFilters.country}
          onChange={(event) => onCountryChange(event.target.value)}
          className="w-full rounded-2xl border border-[#d9e1ec] bg-[#f7f9fc] p-3 text-md text-[#1f2a3d] outline-none transition focus:border-[#91a3bf]"
        >
          <option value="">All Countries</option>
          {sortedCountries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </Section>

      <Section title="State / Region" sectionKey="region" openSections={openSections} onToggle={toggleSection}>
        {selectedFilters.country ? (
          <select
            value={selectedFilters.region}
            onChange={(event) => onRegionChange(event.target.value)}
            className="w-full rounded-2xl border border-[#d9e1ec] bg-[#f7f9fc] p-3 text-md text-[#1f2a3d] outline-none transition focus:border-[#91a3bf]"
          >
            <option value="">All Regions</option>
            {selectedRegions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        ) : (
          <p className="italic text-[#91a0b8]">Select a country first.</p>
        )}
      </Section>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </aside>
  );
}
