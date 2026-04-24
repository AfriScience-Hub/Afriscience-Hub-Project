'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';
import { ChevronDown, ChevronUp, Filter, RotateCcw } from 'lucide-react';

interface CenterFilters {
  field: string;
  categories: string[];
  services: string[];
  ownership: string[];
  status: string[];
  country: string;
  region: string;
}

interface FilterSidebarProps {
  selectedFilters: CenterFilters;
  onFieldChange: (value: string) => void;
  onToggleFilter: (
    key: 'categories' | 'services' | 'ownership' | 'status',
    value: string,
    checked: boolean
  ) => void;
  onCountryChange: (value: string) => void;
  onRegionChange: (value: string) => void;
  onReset: () => void;
}

const fieldCategories: Record<string, string[]> = {
  Medical: ['Basic Clinical Diagnostics', 'Haematology', 'Immunology', 'Radiology', 'Emergency Medicine', 'Public Health'],
  Engineering: ['Civil Engineering', 'Mechanical Systems', 'Materials Testing', 'Process Design', 'Mechatronics', 'Industrial Automation'],
  Pharmaceutical: ['Drug Discovery', 'Quality Control', 'Pharmacovigilance', 'Clinical Trials', 'Formulation Science', 'Bioanalysis'],
  'Computer & ICT': ['Cybersecurity', 'AI & Machine Learning', 'Cloud Computing', 'Data Analytics', 'Software Engineering', 'Networking & Telecoms', 'Blockchain & Fintech'],
  Hybrid: ['Bioinformatics', 'Health Informatics', 'Agri-Tech Systems', 'Digital Manufacturing', 'Robotics', 'Smart Infrastructure'],
  Veterinary: ['Animal Surgery', 'Veterinary Pathology', 'Livestock Health', 'Wildlife Care', 'Epidemiology', 'Animal Nutrition'],
  Agriculture: ['Crop Science', 'Soil Science', 'Precision Agriculture', 'Irrigation Systems', 'Seed Technology', 'Post-Harvest'],
  'Food & Nutrition': ['Food Safety', 'Nutrition Science', 'Food Processing', 'Dietetics', 'Sensory Analysis', 'Packaging Systems'],
  Physics: ['Applied Physics', 'Instrumentation', 'Nuclear Science', 'Photonics', 'Geophysics', 'Medical Physics'],
  Chemistry: ['Analytical Chemistry', 'Industrial Chemistry', 'Petrochemicals', 'Polymer Science', 'Biochemistry', 'Forensic Chemistry'],
  Biology: ['Molecular Biology', 'Microbiology', 'Conservation Biology', 'Genetics', 'Biotechnology', 'Marine Biology'],
  Environmental: ['Climate Research', 'Conservation Biology', 'Environmental Impact', 'Water Systems', 'Air Quality', 'Biodiversity'],
  'Industry & Manufacturing': ['Production Systems', 'Lean Manufacturing', 'Metrology', 'Quality Engineering', 'Supply Chain', 'Fabrication'],
  'Energy & Power': ['Solar Energy', 'Wind Power', 'Power Systems', 'Battery Storage', 'Grid Research', 'Energy Efficiency'],
  'Waste & Recycling': ['Waste Sorting', 'Circular Economy', 'E-Waste Recycling', 'Plastic Recovery', 'Waste-to-Energy', 'Hazardous Waste'],
  'Astronomy & Space': ['Astrophysics', 'Satellite Systems', 'Remote Sensing', 'Space Robotics', 'Planetary Science', 'Observational Astronomy'],
};

const services = [
  'Diagnosis (Screening)',
  'Guidance & Counseling',
  'Monitoring',
  'Prevention & Control',
  'Quality Control & Assurance',
  'Research & Development',
  'Result Interpretation',
  'Safety & Compliance',
  'Sales',
  'Surgery',
  'Training (Industrial)',
  'Transplant',
  'Treatment',
  'Workspace & Accommodation',
];

const ownershipOptions = [
  'Private',
  'Academic',
  'Corporate',
  'Government | Public',
  'NGO | Charity',
  'Inter-Government',
];

const countryRegions: Record<string, string[]> = {
  Algeria: ['Algiers', 'Oran', 'Constantine'],
  Angola: ['Luanda', 'Benguela', 'Huambo'],
  Benin: ['Littoral', 'Atlantique', 'Borgou'],
  Botswana: ['South East', 'Central', 'North West'],
  'Burkina Faso': ['Centre', 'Hauts-Bassins', 'Sahel'],
  Burundi: ['Bujumbura Mairie', 'Gitega', 'Ngozi'],
  CaboVerde: ['Santiago', 'Sao Vicente', 'Sal'],
  Cameroon: ['Centre', 'Littoral', 'North West'],
  'Central African Republic': ['Bangui', 'Ombella-MPoko', 'Lobaye'],
  Chad: ['N Djamena', 'Logone Occidental', 'Ouaddai'],
  Comoros: ['Grande Comore', 'Anjouan', 'Moheli'],
  Congo: ['Brazzaville', 'Pointe-Noire', 'Kouilou'],
  'Democratic Republic of the Congo': ['Kinshasa', 'Kongo Central', 'Haut-Katanga'],
  Djibouti: ['Djibouti', 'Ali Sabieh', 'Tadjourah'],
  Egypt: ['Cairo Governorate', 'Alexandria', 'Giza'],
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

function countActiveFilters(filters: CenterFilters) {
  return [
    filters.field,
    filters.country,
    filters.region,
    ...filters.categories,
    ...filters.services,
    ...filters.ownership,
    ...filters.status,
  ].filter(Boolean).length;
}

function Section({
  title,
  sectionKey,
  openSections,
  onToggle,
  badge,
  children,
}: {
  title: string;
  sectionKey: string;
  openSections: Record<string, boolean>;
  onToggle: (sectionKey: string) => void;
  badge?: number;
  children: ReactNode;
}) {
  const isOpen = openSections[sectionKey];

  return (
    <div className="border-t border-[#d9e1ec] py-5">
      <button
        type="button"
        onClick={() => onToggle(sectionKey)}
        className="flex w-full items-center justify-between gap-3 text-left cursor-pointer"
      >
        <span className="flex items-center gap-3">
          <span className="text-md font-bold text-[#1f2a3d]">{title}</span>
          {badge ? (
            <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-[#fff2f2] px-2 text-sm font-semibold text-[#ff3b30]">
              {badge}
            </span>
          ) : null}
        </span>
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

function RadioItem({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-[#51637f]">
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        className="h-3 w-3 accent-[#1485ff]"
      />
      <span className="text-sm font-medium">{label}</span>
    </label>
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
    <label className="flex cursor-pointer items-center gap-2 text-[#51637f]">
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
  onFieldChange,
  onToggleFilter,
  onCountryChange,
  onRegionChange,
  onReset,
}: FilterSidebarProps) {
  const [openSections, setOpenSections] = useState({
    fields: true,
    categories: true,
    services: false,
    ownership: false,
    status: true,
    country: true,
    region: true,
  });

  const activeCount = countActiveFilters(selectedFilters);
  const availableCategories = selectedFilters.field
    ? fieldCategories[selectedFilters.field]
    : [];
  const selectedRegions = selectedFilters.country
    ? countryRegions[selectedFilters.country] ?? []
    : [];

  const toggleSection = (sectionKey: string) => {
    setOpenSections((current) => ({
      ...current,
      [sectionKey]: !current[sectionKey as keyof typeof current],
    }));
  };

  return (
    <aside className="h-fit max-h-130 overflow-y-auto rounded-2xl border border-[#d8dfeb] bg-white px-6 py-5 shadow-md scrollbar-hide lg:sticky lg:top-24">
      <div className="flex items-center justify-between gap-2 pb-5">
        <div className="flex items-center gap-3">
          <Filter className="h-4 w-4 text-[#ff3b30]" />
          <span className="text-md font-bold tracking-tight text-[#1a2538]">Filters</span>
          {activeCount ? (
            <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[#ff3b30] px-1 text-sm font-bold text-white">
              {activeCount}
            </span>
          ) : null}
        </div>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 text-sm cursor-pointer hover:underline font-semibold text-[#ff3b30] transition hover:opacity-80"
        >
          <RotateCcw className="h-4 w-4" />
          Reset All
        </button>
      </div>

      <Section
        title="Fields"
        sectionKey="fields"
        openSections={openSections}
        onToggle={toggleSection}
        badge={selectedFilters.field ? 1 : 0}
      >
        <div className="max-h-72 space-y-4 overflow-y-auto scrollbar-hide">
          {Object.keys(fieldCategories).map((field) => (
            <RadioItem
              key={field}
              label={field}
              checked={selectedFilters.field === field}
              onChange={() => onFieldChange(field)}
            />
          ))}
        </div>
      </Section>

      <Section
        title="Categories"
        sectionKey="categories"
        openSections={openSections}
        onToggle={toggleSection}
        badge={selectedFilters.categories.length}
      >
        {selectedFilters.field ? (
          <div className="space-y-4">
            <p className="text-sm text-[#91a0b8]">
              Showing categories for: <span className="font-semibold text-[#18304f]">{selectedFilters.field}</span>
            </p>
            <div className="max-h-72 space-y-4 overflow-y-auto  scrollbar-hide">
              {availableCategories.map((category) => (
                <CheckboxItem
                  key={category}
                  label={category}
                  checked={selectedFilters.categories.includes(category)}
                  onChange={(checked) => onToggleFilter('categories', category, checked)}
                />
              ))}
            </div>
          </div>
        ) : (
          <p className="italic text-[#91a0b8]">Select a field to see categories.</p>
        )}
      </Section>

      <Section
        title="Services"
        sectionKey="services"
        openSections={openSections}
        onToggle={toggleSection}
        badge={selectedFilters.services.length}
      >
        <div className="max-h-72 space-y-4 overflow-y-auto scrollbar-hide">
          {services.map((service) => (
            <CheckboxItem
              key={service}
              label={service}
              checked={selectedFilters.services.includes(service)}
              onChange={(checked) => onToggleFilter('services', service, checked)}
            />
          ))}
        </div>
      </Section>

      <Section
        title="Ownership"
        sectionKey="ownership"
        openSections={openSections}
        onToggle={toggleSection}
        badge={selectedFilters.ownership.length}
      >
        <div className="space-y-4">
          {ownershipOptions.map((ownership) => (
            <CheckboxItem
              key={ownership}
              label={ownership}
              checked={selectedFilters.ownership.includes(ownership)}
              onChange={(checked) => onToggleFilter('ownership', ownership, checked)}
            />
          ))}
        </div>
      </Section>

      <Section
        title="Status"
        sectionKey="status"
        openSections={openSections}
        onToggle={toggleSection}
        badge={selectedFilters.status.length}
      >
        <div className="space-y-4">
          {['ONLINE', 'OFFLINE'].map((status) => (
            <CheckboxItem
              key={status}
              label={status === 'ONLINE' ? 'Online' : 'Offline'}
              checked={selectedFilters.status.includes(status)}
              onChange={(checked) => onToggleFilter('status', status, checked)}
            />
          ))}
        </div>
      </Section>

      <Section
        title="Country"
        sectionKey="country"
        openSections={openSections}
        onToggle={toggleSection}
      >
        <select
          value={selectedFilters.country}
          onChange={(event) => onCountryChange(event.target.value)}
          className="w-full rounded-2xl border border-[#d9e1ec] bg-[#f7f9fc] p-3 text-md text-[#1f2a3d] outline-none transition focus:border-[#91a3bf]"
        >
          <option value="">All Countries</option>
          {Object.keys(countryRegions)
            .sort((a, b) => a.localeCompare(b))
            .map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
            ))}
        </select>
      </Section>

      <Section
        title="State / Region"
        sectionKey="region"
        openSections={openSections}
        onToggle={toggleSection}
      >
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
