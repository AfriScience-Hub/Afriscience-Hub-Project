'use client';

import {
  CENTER_FIELDS,
  CENTER_CATEGORIES_BY_FIELD,
  CENTER_OWNERSHIP_OPTIONS,
  CENTER_SERVICES,
} from '@/app/data/mockData';
import { MultiSelectField, SingleSelectField } from '../../afro-innovation-listing/components/InnovationFormControls';
import type { CenterInformation } from '../types';

const MAX_CATEGORIES = 4;

interface CenterInformationSectionProps {
  info: CenterInformation;
  onChange: (patch: Partial<CenterInformation>) => void;
}

export default function CenterInformationSection({ info, onChange }: CenterInformationSectionProps) {
  const availableCategories = info.field ? CENTER_CATEGORIES_BY_FIELD[info.field] || [] : [];
  const categoryList = info.field ? [...availableCategories, 'Other'] : [];
  const inputClass = 'w-full rounded-lg border border-neutral-gray-light px-4 py-2.5 text-sm focus:border-brand-red-600 focus:ring-1 focus:ring-brand-red-600';

  return (
    <div className="space-y-6">
      <SingleSelectField
        label="Field"
        placeholder="Select field"
        options={CENTER_FIELDS}
        value={info.field}
        onChange={(field) => onChange({ field, categories: [], categoryOther: '' })}
        required
        hint="What major field of science does your specialist establishment fall under?"
      />

      <div>
        {info.field ? (
          <>
            <MultiSelectField
              label="Categories"
              placeholder="Select categories"
              options={categoryList}
              value={info.categories}
              max={MAX_CATEGORIES}
              required
              searchable
              searchPlaceholder="Search categories..."
              hint="Which areas within the selected field does your establishment specialize?"
              onChange={(value) => {
                const next = typeof value === 'function' ? value(info.categories) : value;
                onChange({
                  categories: next,
                  ...(!next.includes('Other') ? { categoryOther: '' } : {}),
                });
              }}
            />
            {info.categories.includes('Other') && (
              <input
                type="text"
                value={info.categoryOther}
                onChange={(e) => onChange({ categoryOther: e.target.value })}
                className={`${inputClass} mt-2`}
                placeholder="Specify the other category"
              />
            )}
          </>
        ) : (
          <p className="text-xs italic text-neutral-gray-medium">Select a field to see categories.</p>
        )}
      </div>

      <SingleSelectField
        label="Ownership"
        placeholder="Select ownership"
        options={CENTER_OWNERSHIP_OPTIONS}
        value={info.ownership}
        onChange={(ownership) => onChange({
          ownership,
          ...(ownership !== 'Other' ? { ownershipOther: '' } : {}),
        })}
        required
        hint="What is the ownership identity of the specialist establishment?"
      />
      {info.ownership === 'Other' && (
        <input
          type="text"
          value={info.ownershipOther}
          onChange={(e) => onChange({ ownershipOther: e.target.value })}
          className={`${inputClass} mt-2`}
          placeholder="Specify the ownership type"
        />
      )}

      <MultiSelectField
        label="Services"
        placeholder="Select services"
        options={CENTER_SERVICES}
        value={info.services}
        onChange={(services) => {
          const next = typeof services === 'function' ? services(info.services) : services;
          onChange({ services: next });
        }}
        max={CENTER_SERVICES.length}
        required
        hint="What services does your specialist center render?"
      />
    </div>
  );
}
