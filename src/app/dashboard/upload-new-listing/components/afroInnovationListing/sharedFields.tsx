'use client';

import { useMemo, useState, type ReactNode } from 'react';
import { ChevronDown, Lightbulb } from 'lucide-react';
import { africanCountries } from './constants';

export function Accordion({
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

export function Field({
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

export function CountrySearch() {
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

export function BioField() {
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
