'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';
import { ChevronDown, ChevronUp, Filter as FilterIcon } from 'lucide-react';

type InterestOption =
  | 'Investment | Partnership'
  | 'Purchase | Trade'
  | 'Marketing'
  | 'Training | Mentorship'
  | 'Sensitization';

interface InnovationFilters {
  fields: string[];
  interests: InterestOption[];
  ownership: string[];
  sdgs: string[];
  country: string;
}

interface FilterSidebarProps {
  selectedFilters: InnovationFilters;
  onToggleFilter: (
    key: 'fields' | 'interests' | 'ownership' | 'sdgs',
    value: string,
    checked: boolean
  ) => void;
  onCountryChange: (value: string) => void;
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

const interestOptions: { label: InterestOption; icon: string }[] = [
  { label: 'Investment | Partnership', icon: '🤝' },
  { label: 'Purchase | Trade', icon: '🛒' },
  { label: 'Marketing', icon: '📊' },
  { label: 'Training | Mentorship', icon: '🎓' },
  { label: 'Sensitization', icon: '🗣️' },
];

const ownershipOptions = [
  'Private',
  'Government | Public',
  'Academic',
  'Mission',
  'Corporate',
  'Inter-Government',
  'NGO | Charity',
  'Other',
];

const sdgOptions = [
  'No Poverty',
  'Zero Hunger',
  'Good Health & Well-Being',
  'Quality Education',
  'Gender Equality',
  'Clean Water & Sanitation',
  'Affordable & Clean Energy',
  'Decent Work & Economic Growth',
  'Industry, Innovation & Infrastructure',
  'Reduced Inequalities',
  'Sustainable Cities & Communities',
  'Responsible Consumption & Production',
  'Climate Action',
  'Life Below Water',
  'Life on Land',
  'Peace, Justice & Strong Institutions',
  'Partnerships for the Goals',
];

const africanCountries = [
  'Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cameroon',
  'Central African Republic', 'Chad', 'Comoros', 'Congo', 'Democratic Republic of the Congo',
  'Djibouti', 'Egypt', 'Equatorial Guinea', 'Eritrea', 'Eswatini', 'Ethiopia', 'Gabon', 'Gambia',
  'Ghana', 'Guinea', 'Guinea-Bissau', 'Ivory Coast', 'Kenya', 'Lesotho', 'Liberia', 'Libya',
  'Madagascar', 'Malawi', 'Mali', 'Mauritania', 'Mauritius', 'Morocco', 'Mozambique', 'Namibia',
  'Niger', 'Nigeria', 'Rwanda', 'Sao Tome and Principe', 'Senegal', 'Seychelles', 'Sierra Leone',
  'Somalia', 'South Africa', 'South Sudan', 'Sudan', 'Tanzania', 'Togo', 'Tunisia', 'Uganda',
  'Zambia', 'Zimbabwe',
];

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
        className="cursor-pointer flex w-full items-center justify-between gap-3 text-left"
      >
        <span className="text-md font-bold text-[#1f2a3d]">{title}</span>
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
  icon,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  icon?: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-[#51637f]">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-3 w-3 rounded accent-[#1485ff]"
      />
      {icon ? <span className="text-2xl leading-none">{icon}</span> : null}
      <span className="text-sm font-medium">{label}</span>
    </label>
  );
}

export default function FilterSidebar({
  selectedFilters,
  onToggleFilter,
  onCountryChange,
  onReset,
}: FilterSidebarProps) {
  const [openSections, setOpenSections] = useState({
    fields: true,
    interests: true,
    ownership: true,
    sdgs: true,
    country: true,
  });

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
          <span className="text-md font-bold tracking-tight text-[#1a2538]">Filters</span>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 text-sm cursor-pointer hover:underline font-semibold text-black transition hover:opacity-80"
          aria-label="Reset filters"
        >
          <FilterIcon className="h-5 w-5" />
        </button>
      </div>

      <Section
        title="Fields"
        sectionKey="fields"
        openSections={openSections}
        onToggle={toggleSection}
      >
        <div className="scrollbar-hide max-h-72 space-y-4 overflow-y-auto">
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

      <Section
        title="Interests"
        sectionKey="interests"
        openSections={openSections}
        onToggle={toggleSection}
      >
        <div className="space-y-4">
          {interestOptions.map((interest) => (
            <CheckboxItem
              key={interest.label}
              label={interest.label}
              icon={interest.icon}
              checked={selectedFilters.interests.includes(interest.label)}
              onChange={(checked) => onToggleFilter('interests', interest.label, checked)}
            />
          ))}
        </div>
      </Section>

      <Section
        title="Ownership"
        sectionKey="ownership"
        openSections={openSections}
        onToggle={toggleSection}
      >
        <div className="scrollbar-hide max-h-60 space-y-4 overflow-y-auto">
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
        title="SDGs"
        sectionKey="sdgs"
        openSections={openSections}
        onToggle={toggleSection}
      >
        <div className="scrollbar-hide max-h-72 space-y-4 overflow-y-auto">
          {sdgOptions.map((sdg) => (
            <CheckboxItem
              key={sdg}
              label={sdg}
              checked={selectedFilters.sdgs.includes(sdg)}
              onChange={(checked) => onToggleFilter('sdgs', sdg, checked)}
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
          <option value="">All African Countries</option>
          {africanCountries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
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
