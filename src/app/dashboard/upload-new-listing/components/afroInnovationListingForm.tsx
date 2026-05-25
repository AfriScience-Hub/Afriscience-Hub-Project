'use client';

import { useMemo, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import {
  ChevronDown,
  FileText,
  Images,
  ImagePlus,
  Info,
  Lightbulb,
  Plus,
  Ruler,
  Upload,
  User,
  Phone,
  X,
} from 'lucide-react';
import type { ListingFormProps } from './listingTypes';

const africanCountries = [
  'Algeria',
  'Angola',
  'Benin',
  'Botswana',
  'Burkina Faso',
  'Burundi',
  'Cabo Verde',
  'Cameroon',
  'Central African Republic',
  'Chad',
  'Comoros',
  'Congo',
  'Democratic Republic of the Congo',
  'Djibouti',
  'Egypt',
  'Equatorial Guinea',
  'Eritrea',
  'Eswatini',
  'Ethiopia',
  'Gabon',
  'Gambia',
  'Ghana',
  'Guinea',
  'Guinea-Bissau',
  'Ivory Coast',
  'Kenya',
  'Lesotho',
  'Liberia',
  'Libya',
  'Madagascar',
  'Malawi',
  'Mali',
  'Mauritania',
  'Mauritius',
  'Morocco',
  'Mozambique',
  'Namibia',
  'Niger',
  'Nigeria',
  'Rwanda',
  'Sao Tome and Principe',
  'Senegal',
  'Seychelles',
  'Sierra Leone',
  'Somalia',
  'South Africa',
  'South Sudan',
  'Sudan',
  'Tanzania',
  'Togo',
  'Tunisia',
  'Uganda',
  'Zambia',
  'Zimbabwe',
];

const innovationFields = [
  'Hybrid',
  'Medical',
  'Engineering',
  'Pharmaceutical',
  'Computer & ICT',
  'Veterinary',
  'Agriculture',
  'Food & Nutrition',
  'Mathematics & Statistics',
  'Physics',
  'Chemistry',
  'Biology',
  'Environmental',
  'Industrial & Manufacturing',
  'Energy & Power',
  'Waste & Recycling',
  'Astronomy & Space',
];

const interests = [
  'Investment | Partnership',
  'Purchase | Trade',
  'Marketing',
  'Training | Mentorship',
  'Sensitization',
];

const interestTooltips: Record<string, string> = {
  'Investment | Partnership':
    'Get individuals/brands that can invest into your innovation.',
  'Purchase | Trade':
    'Get individuals/brands that can directly purchase and sell your innovative product.',
  Marketing:
    'Get individuals/brands that can link you to potential markets for your innovation.',
  'Training | Mentorship':
    'Get individuals/brands that can advance your knowledge further in the innovation.',
  Sensitization:
    'Get individuals/brands that can help create targeted awareness of your innovation.',
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
  Prototype:
    'A working model of innovation is created and ready for testing and validation.',
  MVP: 'A validated and useable version of the innovation is currently available to users.',
  'Scale-Up': 'Innovation is validated, usable and ready for mass-production.',
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

const dimensionUnits = ['mm', 'cm', 'in', 'ft', 'm'];
const weightUnits = ['mg', 'g', 'oz', 'lb', 'kg', 't'];

function Accordion({
  title,
  subtitle,
  icon: Icon,
  defaultOpen = true,
  children,
}: {
  title: string;
  subtitle?: string;
  icon: typeof Lightbulb;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="rounded-lg border border-gray-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full cursor-pointer items-center justify-between border-b border-gray-200 px-4 py-3 text-left"
      >
        <span className="flex items-center gap-3">
          <Icon size={16} className="text-red-500" />
          <span className="text-xs font-bold text-gray-950 lg:text-sm">{title}</span>
          {subtitle && <span className="text-[10px] font-semibold text-red-500">{subtitle}</span>}
        </span>
        <ChevronDown
          size={15}
          className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && <div className="p-4">{children}</div>}
    </section>
  );
}

function Field({
  label,
  placeholder,
  required,
}: {
  label: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-[11px] font-semibold text-gray-700 lg:text-xs">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        placeholder={placeholder}
        className="h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-black outline-none placeholder:text-gray-400"
        required={required}
      />
    </div>
  );
}

function CountrySearch() {
  const [countryQuery, setCountryQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const matchingCountries = useMemo(() => {
    const query = countryQuery.trim().toLowerCase();

    if (!query) {
      return africanCountries;
    }

    return africanCountries.filter((country) => country.toLowerCase().includes(query));
  }, [countryQuery]);

  return (
    <div className="relative">
      <label className="mb-2 block text-[11px] font-semibold text-gray-700 lg:text-xs">
        Country <span className="text-red-500">*</span>
      </label>
      <input
        value={countryQuery}
        onChange={(event) => {
          setCountryQuery(event.target.value);
          setDropdownOpen(true);
        }}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        placeholder="Search and select country"
        className="h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-black outline-none placeholder:text-gray-400"
      />
      {dropdownOpen ? (
        <div className="absolute left-0 right-0 top-[4.2rem] z-20 max-h-48 overflow-y-auto rounded-md border border-gray-200 bg-white py-1 shadow-lg">
          {matchingCountries.length ? (
            matchingCountries.map((country) => (
              <button
                key={country}
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  setCountryQuery(country);
                  setDropdownOpen(false);
                }}
                className="block w-full cursor-pointer px-3 py-2 text-left text-xs text-gray-700 hover:bg-red-50 hover:text-red-600"
              >
                {country}
              </button>
            ))
          ) : (
            <p className="px-3 py-2 text-xs text-gray-400">No African country found.</p>
          )}
        </div>
      ) : null}
    </div>
  );
}

function BioField() {
  const [bio, setBio] = useState('');

  const wordCount = bio.trim() ? bio.trim().split(/\s+/).length : 0;

  const handleBioChange = (value: string) => {
    const words = value.trim().split(/\s+/).filter(Boolean);

    if (words.length <= 500) {
      setBio(value);
      return;
    }

    setBio(words.slice(0, 500).join(' '));
  };

  return (
    <div>
      <label className="mb-2 block text-[11px] font-semibold text-gray-700 lg:text-xs">
        Short Bio / Description <span className="text-red-500">*</span>
      </label>
      <textarea
        value={bio}
        onChange={(event) => handleBioChange(event.target.value)}
        placeholder="Tell us about the innovation..."
        required
        className="h-20 w-full resize-none rounded-md border border-gray-200 bg-white px-3 py-3 text-xs text-black outline-none placeholder:text-gray-400"
      />
      <p className="mt-2 text-[10px] text-gray-400">{wordCount}/500 words</p>
    </div>
  );
}

function OptionInfo({ text }: { text: string }) {
  const [tooltipPosition, setTooltipPosition] = useState<{ left: number; top: number } | null>(
    null
  );

  const showTooltip = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const tooltipWidth = 224;
    const tooltipGap = 10;
    const viewportPadding = 12;

    setTooltipPosition({
      left: Math.min(
        rect.right + tooltipGap,
        window.innerWidth - tooltipWidth - viewportPadding
      ),
      top: Math.max(viewportPadding, rect.top - 10),
    });
  };

  return (
    <span
      className="inline-flex cursor-help items-center"
      onMouseEnter={(event) => showTooltip(event.currentTarget)}
      onMouseLeave={() => setTooltipPosition(null)}
      onFocus={(event) => showTooltip(event.currentTarget)}
      onBlur={() => setTooltipPosition(null)}
      tabIndex={0}
    >
      <Info size={13} className="text-gray-400" />
      {tooltipPosition
        ? createPortal(
            <span
              className="pointer-events-none fixed z-9999 w-56 rounded-md bg-[#1f2a3d] px-3 py-2 text-left text-[10px] font-medium leading-4 text-white shadow-lg"
              style={{
                left: tooltipPosition.left,
                top: tooltipPosition.top,
              }}
            >
              {text}
            </span>,
            document.body
          )
        : null}
    </span>
  );
}

function MultiSelectDropdown({
  label,
  placeholder,
  options,
  maxSelections,
  required,
  tooltips,
}: {
  label: string;
  placeholder: string;
  options: string[];
  maxSelections: number;
  required?: boolean;
  tooltips?: Record<string, string>;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const toggleOption = (option: string) => {
    setSelected((current) => {
      if (current.includes(option)) {
        return current.filter((item) => item !== option);
      }

      if (current.length >= maxSelections) {
        return current;
      }

      return [...current, option];
    });
  };

  return (
    <div>
      <label className="mb-2 block text-[11px] font-semibold text-gray-700 lg:text-xs">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex min-h-10 w-full cursor-pointer items-center justify-between gap-3 rounded-md border border-gray-200 bg-white px-3 py-2 text-left text-xs text-black outline-none"
      >
        <span className={selected.length ? 'text-black' : 'text-gray-400'}>
          {selected.length ? selected.join(', ') : placeholder}
        </span>
        <ChevronDown
          size={14}
          className={`shrink-0 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <p className="mt-1 text-[10px] text-gray-400">
        {selected.length}/{maxSelections} selected
      </p>

      {open ? (
        <div className="mt-2 max-h-60 overflow-y-auto rounded-md border border-gray-200 bg-white p-2 shadow-sm">
          {options.map((option) => {
            const checked = selected.includes(option);
            const disabled = !checked && selected.length >= maxSelections;

            return (
              <label
                key={option}
                className={`flex cursor-pointer items-center justify-between gap-3 rounded-md px-2 py-2 text-xs ${
                  disabled ? 'text-gray-300' : 'text-gray-700 hover:bg-red-50'
                }`}
              >
                <span className="flex min-w-0 items-center gap-2">
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled={disabled}
                    onChange={() => toggleOption(option)}
                    className="h-3 w-3 rounded accent-red-500"
                  />
                  <span>{option}</span>
                </span>
                {tooltips?.[option] ? <OptionInfo text={tooltips[option]} /> : null}
              </label>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function SingleSelectDropdown({
  label,
  placeholder,
  options,
  required,
  tooltips,
}: {
  label: string;
  placeholder: string;
  options: string[];
  required?: boolean;
  tooltips?: Record<string, string>;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('');

  return (
    <div>
      <label className="mb-2 block text-[11px] font-semibold text-gray-700 lg:text-xs">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex h-10 w-full cursor-pointer items-center justify-between gap-3 rounded-md border border-gray-200 bg-white px-3 text-left text-xs text-black outline-none"
      >
        <span className={selected ? 'text-black' : 'text-gray-400'}>
          {selected || placeholder}
        </span>
        <ChevronDown
          size={14}
          className={`shrink-0 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open ? (
        <div className="mt-2 max-h-60 overflow-y-auto rounded-md border border-gray-200 bg-white p-2 shadow-sm">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                setSelected(option);
                setOpen(false);
              }}
              className={`flex w-full cursor-pointer items-center justify-between gap-3 rounded-md px-2 py-2 text-left text-xs hover:bg-red-50 ${
                selected === option ? 'font-semibold text-red-600' : 'text-gray-700'
              }`}
            >
              <span>{option}</span>
              {tooltips?.[option] ? <OptionInfo text={tooltips[option]} /> : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function SpecificationsFields() {
  const [materials, setMaterials] = useState(['']);
  const [dimensions, setDimensions] = useState([
    { length: '', width: '', height: '', unit: 'cm' },
  ]);
  const [weights, setWeights] = useState([{ value: '', unit: 'kg' }]);

  return (
    <div className="space-y-5 rounded-md border border-dashed border-gray-300 p-4">
      <div>
        <div className="mb-2 flex items-center justify-between gap-3">
          <label className="block text-[11px] font-semibold text-gray-700 lg:text-xs">
            Materials <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={() => setMaterials((current) => [...current, ''])}
            className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-red-200 px-2 py-1 text-[10px] font-semibold text-red-500 hover:bg-red-50"
          >
            <Plus size={12} />
            Add
          </button>
        </div>
        <div className="space-y-2">
          {materials.map((material, index) => (
            <input
              key={index}
              value={material}
              onChange={(event) =>
                setMaterials((current) =>
                  current.map((item, itemIndex) =>
                    itemIndex === index ? event.target.value : item
                  )
                )
              }
              placeholder="State some materials used in the innovation"
              required
              className="h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-black outline-none placeholder:text-gray-400"
            />
          ))}
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between gap-3">
          <label className="block text-[11px] font-semibold text-gray-700 lg:text-xs">
            Dimensions <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={() =>
              setDimensions((current) => [
                ...current,
                { length: '', width: '', height: '', unit: 'cm' },
              ])
            }
            className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-red-200 px-2 py-1 text-[10px] font-semibold text-red-500 hover:bg-red-50"
          >
            <Plus size={12} />
            Add
          </button>
        </div>
        <div className="space-y-3">
          {dimensions.map((dimension, index) => (
            <div key={index} className="grid grid-cols-1 gap-2 lg:grid-cols-[1fr_1fr_1fr_84px]">
              {(['length', 'width', 'height'] as const).map((key) => (
                <input
                  key={key}
                  value={dimension[key]}
                  onChange={(event) =>
                    setDimensions((current) =>
                      current.map((item, itemIndex) =>
                        itemIndex === index ? { ...item, [key]: event.target.value } : item
                      )
                    )
                  }
                  placeholder={`State ${key}`}
                  required
                  className="h-10 rounded-md border border-gray-200 bg-white px-3 text-xs text-black outline-none placeholder:text-gray-400"
                />
              ))}
              <select
                value={dimension.unit}
                onChange={(event) =>
                  setDimensions((current) =>
                    current.map((item, itemIndex) =>
                      itemIndex === index ? { ...item, unit: event.target.value } : item
                    )
                  )
                }
                className="h-10 rounded-md border border-gray-200 bg-white px-3 text-xs text-black outline-none"
              >
                {dimensionUnits.map((unit) => (
                  <option key={unit}>{unit}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <p className="mt-2 text-[10px] text-gray-400">State the measurements of innovation.</p>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between gap-3">
          <label className="block text-[11px] font-semibold text-gray-700 lg:text-xs">
            Weight <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={() => setWeights((current) => [...current, { value: '', unit: 'kg' }])}
            className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-red-200 px-2 py-1 text-[10px] font-semibold text-red-500 hover:bg-red-50"
          >
            <Plus size={12} />
            Add
          </button>
        </div>
        <div className="space-y-2">
          {weights.map((weight, index) => (
            <div key={index} className="grid grid-cols-[1fr_84px] gap-2">
              <input
                value={weight.value}
                onChange={(event) =>
                  setWeights((current) =>
                    current.map((item, itemIndex) =>
                      itemIndex === index ? { ...item, value: event.target.value } : item
                    )
                  )
                }
                placeholder="State innovation weight"
                required
                className="h-10 rounded-md border border-gray-200 bg-white px-3 text-xs text-black outline-none placeholder:text-gray-400"
              />
              <select
                value={weight.unit}
                onChange={(event) =>
                  setWeights((current) =>
                    current.map((item, itemIndex) =>
                      itemIndex === index ? { ...item, unit: event.target.value } : item
                    )
                  )
                }
                className="h-10 rounded-md border border-gray-200 bg-white px-3 text-xs text-black outline-none"
              >
                {weightUnits.map((unit) => (
                  <option key={unit}>{unit}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BulletListInput({
  label,
  placeholder,
  maxEntries,
}: {
  label: string;
  placeholder: string;
  maxEntries?: number;
}) {
  const [entries, setEntries] = useState(['']);
  const limitReached = typeof maxEntries === 'number' && entries.length >= maxEntries;

  return (
    <div className="rounded-md border border-dashed border-gray-300 p-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <label className="block text-[11px] font-semibold text-gray-700 lg:text-xs">
          {label} <span className="text-red-500">*</span>
        </label>
        <button
          type="button"
          onClick={() => {
            if (!limitReached) {
              setEntries((current) => [...current, '']);
            }
          }}
          disabled={limitReached}
          className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-red-200 px-2 py-1 text-[10px] font-semibold text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-300 disabled:hover:bg-white"
        >
          <Plus size={12} />
          Add
        </button>
      </div>
      <div className="space-y-2">
        {entries.map((entry, index) => (
          <div key={index} className="grid grid-cols-[auto_1fr] items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
            <input
              value={entry}
              onChange={(event) =>
                setEntries((current) =>
                  current.map((item, itemIndex) =>
                    itemIndex === index ? event.target.value : item
                  )
                )
              }
              placeholder={placeholder}
              required
              className="h-10 rounded-md border border-gray-200 bg-white px-3 text-xs text-black outline-none placeholder:text-gray-400"
            />
          </div>
        ))}
      </div>
      {maxEntries ? (
        <p className="mt-2 text-[10px] text-gray-400">
          {entries.length}/{maxEntries} entries
        </p>
      ) : null}
    </div>
  );
}

function DocumentUploadList({
  label,
  description,
}: {
  label: string;
  description: string;
}) {
  const [documents, setDocuments] = useState([{ title: '' }]);

  return (
    <div className="rounded-md border border-dashed border-gray-300 p-4">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <label className="block text-[11px] font-semibold text-gray-700 lg:text-xs">
            {label} <span className="text-red-500">*</span>
          </label>
          <p className="mt-1 max-w-2xl text-[10px] leading-4 text-gray-400">{description}</p>
        </div>
        <button
          type="button"
          onClick={() => setDocuments((current) => [...current, { title: '' }])}
          className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-md border border-red-200 px-2 py-1 text-[10px] font-semibold text-red-500 hover:bg-red-50"
        >
          <Plus size={12} />
          Add
        </button>
      </div>
      <div className="space-y-3">
        {documents.map((document, index) => (
          <div key={index} className="rounded-md border border-gray-200 p-3">
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_auto]">
              <input
                value={document.title}
                onChange={(event) =>
                  setDocuments((current) =>
                    current.map((item, itemIndex) =>
                      itemIndex === index ? { title: event.target.value } : item
                    )
                  )
                }
                placeholder="Document title caption"
                required
                className="h-10 rounded-md border border-gray-200 bg-white px-3 text-xs text-black outline-none placeholder:text-gray-400"
              />
              <label className="inline-flex h-10 cursor-pointer items-center justify-center rounded-md border border-dashed border-red-500 px-4 text-xs font-semibold text-red-500 hover:bg-red-50">
                <FileText size={13} className="mr-2" />
                Upload Document
                <input
                  type="file"
                  accept="image/*,.txt,.rtf,.doc,.docx,.pdf"
                  required
                  className="sr-only"
                />
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GalleryUploadGroup({
  label,
  description,
}: {
  label: string;
  description: string;
}) {
  const [uploads, setUploads] = useState([{ title: '' }]);
  const limitReached = uploads.length >= 3;

  return (
    <div className="rounded-md border border-gray-200 p-4">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <label className="block text-[11px] font-semibold text-gray-700 lg:text-xs">
            {label} <span className="text-red-500">*</span>
          </label>
          <p className="mt-1 text-[10px] leading-4 text-gray-400">{description}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            if (!limitReached) {
              setUploads((current) => [...current, { title: '' }]);
            }
          }}
          disabled={limitReached}
          className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-md border border-red-200 px-2 py-1 text-[10px] font-semibold text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-300 disabled:hover:bg-white"
        >
          <Plus size={12} />
          Add
        </button>
      </div>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        {uploads.map((upload, index) => (
          <div key={index} className="rounded-md border border-gray-200 p-3">
            <input
              value={upload.title}
              onChange={(event) =>
                setUploads((current) =>
                  current.map((item, itemIndex) =>
                    itemIndex === index ? { title: event.target.value } : item
                  )
                )
              }
              placeholder="Media title caption"
              required
              className="mb-3 h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-black outline-none placeholder:text-gray-400"
            />
            <label className="flex h-24 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-red-500 px-4 text-center text-[10px] font-semibold text-red-500 hover:bg-red-50">
              <Images size={16} className="mb-2" />
              Upload Image or Video
              <input type="file" accept="image/*,video/*" required className="sr-only" />
            </label>
          </div>
        ))}
      </div>
      <p className="mt-2 text-[10px] text-gray-400">{uploads.length}/3 uploads</p>
    </div>
  );
}

function MediaGalleryUploads() {
  return (
    <div className="space-y-3 rounded-md border border-dashed border-gray-300 p-4">
      <div className="flex items-center gap-2">
        <Images size={14} className="text-red-500" />
        <p className="text-[11px] font-semibold text-gray-700 lg:text-xs">
          Media Gallery <span className="text-red-500">*</span>
        </p>
      </div>
      <GalleryUploadGroup
        label="Working Materials"
        description="Upload media files showing the work materials used in building innovation."
      />
      <GalleryUploadGroup
        label="Work-In-Progress"
        description="Upload media files showing the building process of innovation."
      />
      <GalleryUploadGroup
        label="Finished Work"
        description="Upload media files showing the completed/built innovation."
      />
    </div>
  );
}

function InnovationDetailsSection() {
  return (
    <Accordion title="Innovation Details" subtitle="Required" icon={Ruler} defaultOpen={false}>
      <div className="space-y-4">
        <MultiSelectDropdown
          label="Innovation Field"
          placeholder="Select the best fields your innovation fits into"
          options={innovationFields}
          maxSelections={3}
          required
        />
        <MultiSelectDropdown
          label="Interests"
          placeholder="Select your interests"
          options={interests}
          maxSelections={3}
          required
          tooltips={interestTooltips}
        />
        <SingleSelectDropdown
          label="Ownership"
          placeholder="What is the Ownership Identity of the Innovation?"
          options={ownershipOptions}
          required
        />
        <SingleSelectDropdown
          label="Stage"
          placeholder="Select innovation stage"
          options={stageOptions}
          required
          tooltips={stageTooltips}
        />
        <MultiSelectDropdown
          label="SDGs"
          placeholder="Select appropriate sustainable development goals your innovation address"
          options={sdgOptions}
          maxSelections={5}
          required
        />
        <SpecificationsFields />
        <BulletListInput
          label="User Groups"
          placeholder="List possible users of your innovation"
          maxEntries={10}
        />
        <BulletListInput
          label="Applications and Impact"
          placeholder="In what areas can your innovation be used and what impacts can it bring about?"
        />
        <BulletListInput
          label="Recommendations"
          placeholder="How can users get the best out of your innovation?"
        />
        <BulletListInput
          label="Cautions"
          placeholder="What important notes should users be aware of when using innovation to prevent hazards and malfunction?"
        />
        <DocumentUploadList
          label="Licenses and Certifications"
          description="Upload any licenses or certifications that your innovation has. Uploaded documents are securely stored and protected from unauthorized access. Each uploaded document should have a title caption and can be uploaded in text or picture formats."
        />
        <DocumentUploadList
          label="Honorary Awards"
          description="Upload any recognition awards that your innovation has received previously. Uploaded documents are securely stored and protected from unauthorized access. Each uploaded document should have a title caption and can be uploaded in text or picture formats."
        />
        <MediaGalleryUploads />
      </div>
    </Accordion>
  );
}

function InventorInformationSection() {
  return (
    <Accordion title="Inventor's Information" subtitle="Required" icon={Phone} defaultOpen={false}>
      <div className="space-y-4">
        <Field label="Inventor's Name" placeholder="Input inventor's name" required />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Field label="Phone Number" placeholder="Input inventor's phone number" required />
          <Field label="Email Address" placeholder="Input email address" required />
        </div>
        <Field label="Website" placeholder="Inventor's website (if any)" />

        <div>
          <p className="mb-2 text-[11px] font-semibold text-gray-700 lg:text-xs">
            Social Media Handles <span className="text-red-500">*</span>
          </p>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Field label="LinkedIn" placeholder="@yourlinkedinhandle" required />
            <Field label="Twitter" placeholder="@yourtwitterhandle" required />
            <Field label="Instagram" placeholder="@yourinstagramhandle" required />
            <Field label="Facebook" placeholder="@yourfacebookhandle" required />
          </div>
        </div>
      </div>
    </Accordion>
  );
}

function InnovationIdentitySection() {
  return (
    <Accordion title="Innovation Identity" subtitle="Required" icon={User}>
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-[11px] font-semibold text-gray-700 lg:text-xs">
            Profile Image
          </label>
          <div className="flex items-center gap-4">
            <label className="grid h-16 w-16 cursor-pointer place-items-center rounded-md border border-dashed border-gray-300 text-gray-400">
              <ImagePlus size={18} />
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                className="sr-only"
              />
            </label>
            <p className="max-w-xs text-[10px] text-gray-400">
              Upload a clear image (JPG, PNG, WEBP, GIF). Recommended: 400x400px or larger
            </p>
          </div>
        </div>

        <Field label="Innovation Name" placeholder="Enter innovation name" required />
        <CountrySearch />
        <BioField />
      </div>
    </Accordion>
  );
}

export default function AfroInnovationListingForm({ onChangeCategory }: ListingFormProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white px-4 py-4 shadow-sm lg:flex-row lg:gap-0">
        <div className="flex items-center gap-3">
          <Lightbulb size={20} className="text-red-500" />
          <div>
            <h1 className="text-base font-bold text-gray-950 lg:text-lg">
              New Afro-Innovation Listing
            </h1>
            <p className="text-[10px] text-gray-400 lg:text-xs">
              Fill in the details below. Fields marked * are required.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onChangeCategory}
          className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
        >
          <X size={13} />
          Change Category
        </button>
      </div>

      <InnovationIdentitySection />
      <InnovationDetailsSection />
      <InventorInformationSection />

      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <div className="mb-4 rounded-md border border-blue-200 bg-blue-50 px-4 py-3 text-[10px] text-blue-700 lg:text-xs">
          <Info size={14} className="mr-2 inline" />
          Your listing will be submitted for verification by the AfriScience Hub team. Once approved, it will be publicly visible with a Verified badge.
        </div>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <button className="w-max cursor-pointer rounded-md border border-gray-200 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50">
            Cancel
          </button>
          <div className="flex gap-3">
            <button className="cursor-pointer rounded-md border border-gray-200 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50">
              Save as Draft
            </button>
            <button className="cursor-pointer rounded-md bg-[#082947] px-4 py-2 text-xs font-semibold text-white hover:bg-slate-900">
              <Upload size={13} className="mr-2 inline" />
              Submit for Verification
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
