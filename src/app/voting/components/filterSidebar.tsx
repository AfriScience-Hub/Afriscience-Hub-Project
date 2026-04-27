'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';
import { ChevronDown, ChevronUp, Filter, RotateCcw } from 'lucide-react';

interface VotingFilters {
  type: string[];
  competition: string[];
  category: string[];
  year: string;
  country: string;
}

interface FilterSidebarProps {
  selectedFilters: VotingFilters;
  onToggleFilter: (key: 'type' | 'competition' | 'category', value: string, checked: boolean) => void;
  onYearChange: (value: string) => void;
  onCountryChange: (value: string) => void;
  onReset: () => void;
}

const typeOptions = [
  'Afri – Anime',
  'Afri – Presentations',
  'Afri – Memes',
  'Afri – MySpace',
];

const categoryOptions = [
  'General (18+)',
  'Junior Secondary',
  'Senior Secondary',
  'Undergraduates',
  'Postgraduates',
];

const yearOptions = ['2026', '2025', '2024', '2023'];

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
        className="flex w-full items-center justify-between gap-3 text-left"
      >
        <span className="text-[1.05rem] font-bold text-[#1f2a3d]">{title}</span>
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
  onToggleFilter,
  onYearChange,
  onCountryChange,
  onReset,
}: FilterSidebarProps) {
  const [openSections, setOpenSections] = useState({
    type: false,
    competition: true,
    category: true,
    year: true,
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
          <Filter className="h-4 w-4 text-[#ff3b30]" />
          <span className="text-md font-bold tracking-tight text-[#1a2538]">Filters</span>
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

      <Section title="Type" sectionKey="type" openSections={openSections} onToggle={toggleSection}>
        <div className="space-y-4">
          {typeOptions.map((type) => (
            <CheckboxItem
              key={type}
              label={type}
              checked={selectedFilters.type.includes(type)}
              onChange={(checked) => onToggleFilter('type', type, checked)}
            />
          ))}
        </div>
      </Section>

      <Section title="Competition" sectionKey="competition" openSections={openSections} onToggle={toggleSection}>
        <div className="space-y-4">
          {typeOptions.map((competition) => (
            <CheckboxItem
              key={competition}
              label={competition}
              checked={selectedFilters.competition.includes(competition)}
              onChange={(checked) => onToggleFilter('competition', competition, checked)}
            />
          ))}
        </div>
      </Section>

      <Section title="Category" sectionKey="category" openSections={openSections} onToggle={toggleSection}>
        <div className="space-y-4">
          {categoryOptions.map((category) => (
            <CheckboxItem
              key={category}
              label={category}
              checked={selectedFilters.category.includes(category)}
              onChange={(checked) => onToggleFilter('category', category, checked)}
            />
          ))}
        </div>
      </Section>

      <Section title="Year" sectionKey="year" openSections={openSections} onToggle={toggleSection}>
        <select
          value={selectedFilters.year}
          onChange={(event) => onYearChange(event.target.value)}
          className="w-full rounded-2xl border border-[#d9e1ec] bg-[#f7f9fc] p-3 text-md text-[#1f2a3d] outline-none transition focus:border-[#91a3bf]"
        >
          <option value="">All Years</option>
          {yearOptions.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </Section>

      <Section title="Country" sectionKey="country" openSections={openSections} onToggle={toggleSection}>
        <select
          value={selectedFilters.country}
          onChange={(event) => onCountryChange(event.target.value)}
          className="w-full rounded-2xl border border-[#d9e1ec] bg-[#f7f9fc] p-3 text-md text-[#1f2a3d] outline-none transition focus:border-[#91a3bf]"
        >
          <option value="">All Countries</option>
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
