'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';

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
  stage: string[];
  sdgs: string[];
  country: string;
}

interface FilterSidebarProps {
  selectedFilters: InnovationFilters;
  onToggleFilter: (
    key: 'fields' | 'interests' | 'ownership' | 'stage' | 'sdgs',
    value: string,
    checked: boolean
  ) => void;
  onCountryChange: (value: string) => void;
  onReset: () => void;
}

const fieldOptions = [
  'Hybrid',
  'Medical',
  'Engineering',
  'Pharmaceutical',
  'Computer & ICT',
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

const interestTooltips: Record<InterestOption, string> = {
  'Investment | Partnership':
    'Inventor wishes to work with individuals/brands that can invest into their innovation.',
  'Purchase | Trade':
    'Inventor wishes to work with individuals/brands that can directly purchase and sell their innovative product.',
  Marketing:
    'Inventor wishes to work with individuals/brands that can link them to potential markets for their innovation.',
  'Training | Mentorship':
    'Inventor wishes to work with individuals/brands that can advance their knowledge further in the innovation.',
  Sensitization:
    'Inventor wishes to work with individuals/brands that can help create targeted awareness of their innovation.',
};

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

const stageOptions = [
  'Ideation',
  'Research & Development',
  'Prototype',
  'MVP',
  'Scale-Up',
  'Commercialization',
];

const stageTooltips: Record<string, string> = {
  Ideation: 'Innovation only exists as an idea or concept.',
  'Research & Development':
    'Innovative idea is under scientific experimentation and technical development.',
  Prototype: 'A working model of innovation is created and ready for testing and validation.',
  MVP: 'A validated and useable version of the innovation is currently available to users.',
  'Scale-Up': 'Innovation is validated and ready for mass-production.',
  Commercialization:
    'Innovation is ready to be introduced and distributed in suitable markets.',
};

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
    <div className="py-2">
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
  tooltip,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  icon?: string;
  tooltip?: string;
}) {
  const [tooltipPosition, setTooltipPosition] = useState<{ left: number; top: number } | null>(
    null
  );

  const showTooltip = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const tooltipWidth = 256;
    const tooltipGap = 10;
    const viewportPadding = 12;

    setTooltipPosition({
      left: Math.min(
        rect.right + tooltipGap,
        window.innerWidth - tooltipWidth - viewportPadding
      ),
      top: Math.max(viewportPadding, rect.top - 12),
    });
  };

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
      {tooltip ? (
        <span
          className="inline-flex cursor-help items-center"
          onMouseEnter={(event) => showTooltip(event.currentTarget)}
          onMouseLeave={() => setTooltipPosition(null)}
          onFocus={(event) => showTooltip(event.currentTarget)}
          onBlur={() => setTooltipPosition(null)}
          tabIndex={0}
        >
          <Info className="h-3.5 w-3.5 text-[#91a3bf]" aria-hidden="true" />
          {tooltipPosition
            ? createPortal(
                <span
                  className="pointer-events-none fixed z-9999 w-64 rounded-md bg-[#1f2a3d] px-3 py-2 text-xs font-medium leading-5 text-white shadow-lg"
                  style={{
                    left: tooltipPosition.left,
                    top: tooltipPosition.top,
                  }}
                >
                  {tooltip}
                </span>,
                document.body
              )
            : null}
        </span>
      ) : null}
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
    interests: false,
    ownership: false,
    stage: false,
    sdgs: false,
    country: false,
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

  return (
    <aside className="scrollbar-hide max-h-130 overflow-y-auto rounded-2xl border border-[#d8dfeb] bg-white px-4 py-5 shadow-md lg:sticky lg:top-24">
      <div className="flex items-center justify-between gap-2 pb-2">
        <div className="flex items-center gap-3">
          <span className="text-md font-bold tracking-tight text-[#1a2538]">Filters</span>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 text-sm cursor-pointer hover:underline font-semibold text-red-600 transition hover:opacity-80"
          aria-label="Reset filters"
        >
          <p  className="text-xs text-red-600"> Reset All</p>
        </button>
      </div>

      <Section
        title="Fields"
        sectionKey="fields"
        openSections={openSections}
        onToggle={toggleSection}
      >
        <div className="scrollbar-hide max-h-72 space-y-2 overflow-y-auto">
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
        <div className="scrollbar-hide max-h-60 space-y-2 overflow-y-auto">
          {interestOptions.map((interest) => (
            <CheckboxItem
              key={interest.label}
              label={interest.label}
              icon={interest.icon}
              tooltip={interestTooltips[interest.label]}
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
        <div className="space-y-2">
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
        title="Stage"
        sectionKey="stage"
        openSections={openSections}
        onToggle={toggleSection}
      >
        <div className="space-y-2">
          {stageOptions.map((stage) => (
            <CheckboxItem
              key={stage}
              label={stage}
              tooltip={stageTooltips[stage]}
              checked={selectedFilters.stage.includes(stage)}
              onChange={(checked) => onToggleFilter('stage', stage, checked)}
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
        <div className="scrollbar-hide max-h-72 space-y-3 overflow-y-auto">
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
