'use client';

import {
  CENTER_FIELDS,
  CENTER_CATEGORIES_BY_FIELD,
  CENTER_OWNERSHIP_OPTIONS,
  CENTER_SERVICES,
} from '@/app/data/mockData';
import { cn } from '@/lib/utils';
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

  const toggleCategory = (cat: string) => {
    const selected = info.categories.includes(cat);
    if (selected) {
      onChange({ categories: info.categories.filter(c => c !== cat) });
      if (cat === 'Other') onChange({ categoryOther: '' });
      return;
    }
    if (info.categories.length >= MAX_CATEGORIES) return;
    onChange({ categories: [...info.categories, cat] });
  };

  const toggleService = (svc: string) => {
    onChange({
      services: info.services.includes(svc)
        ? info.services.filter(s => s !== svc)
        : [...info.services, svc],
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-neutral-black mb-2">Fields <span className="text-red-500">*</span> <span className="text-[10px] font-normal text-neutral-gray-medium">(max 1 selection)</span></label>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {CENTER_FIELDS.map(field => (
            <label key={field} className={cn(
              "flex items-center gap-2 rounded-lg border p-2.5 text-sm transition-colors cursor-pointer",
              info.field === field ? "border-brand-red-600 bg-brand-red-50 text-neutral-black" : "border-neutral-gray-light text-neutral-gray-dark hover:border-brand-red-200"
            )}>
              <input
                type="radio"
                name="center-listing-field"
                checked={info.field === field}
                onChange={() => onChange({ field, categories: [], categoryOther: '' })}
                className="border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600 h-3.5 w-3.5"
              />
              {field}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-black mb-2">
          Categories <span className="text-red-500">*</span>
          <span className="text-[10px] font-normal text-neutral-gray-medium"> (max {MAX_CATEGORIES} selections; entries made via admin dashboard)</span>
        </label>
        {info.field ? (
          <>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {categoryList.map(cat => {
                const checked = info.categories.includes(cat);
                const full = !checked && info.categories.length >= MAX_CATEGORIES;
                return (
                  <label key={cat} className={cn(
                    "flex items-center gap-2 rounded-lg border p-2.5 text-sm transition-colors",
                    checked ? "border-brand-red-600 bg-brand-red-50" : "border-neutral-gray-light",
                    full ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                  )}>
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={full}
                      onChange={() => toggleCategory(cat)}
                      className="rounded border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600 h-3.5 w-3.5"
                    />
                    <span className="text-neutral-gray-dark">{cat}</span>
                  </label>
                );
              })}
            </div>
            <p className="mt-1.5 text-[11px] text-neutral-gray-medium">{info.categories.length}/{MAX_CATEGORIES} selected</p>
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

      <div>
        <label className="block text-sm font-medium text-neutral-black mb-2">Ownership <span className="text-red-500">*</span> <span className="text-[10px] font-normal text-neutral-gray-medium">(max 1 selection)</span></label>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {CENTER_OWNERSHIP_OPTIONS.map(own => (
            <label key={own} className={cn(
              "flex items-center gap-2 rounded-lg border p-2.5 text-sm transition-colors cursor-pointer",
              info.ownership === own ? "border-brand-red-600 bg-brand-red-50 text-neutral-black" : "border-neutral-gray-light text-neutral-gray-dark hover:border-brand-red-200"
            )}>
              <input
                type="radio"
                name="center-listing-ownership"
                checked={info.ownership === own}
                onChange={() => onChange({ ownership: own })}
                className="border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600 h-3.5 w-3.5"
              />
              {own}
            </label>
          ))}
        </div>
        {info.ownership === 'Other' && (
          <input
            type="text"
            value={info.ownershipOther}
            onChange={(e) => onChange({ ownershipOther: e.target.value })}
            className={`${inputClass} mt-2`}
            placeholder="Specify the ownership type"
          />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-black mb-2">Services <span className="text-red-500">*</span> <span className="text-[10px] font-normal text-neutral-gray-medium">(multiple selections allowed; entries made via admin dashboard)</span></label>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {CENTER_SERVICES.map(svc => (
            <label key={svc} className={cn(
              "flex items-center gap-2 rounded-lg border p-2.5 text-sm transition-colors cursor-pointer",
              info.services.includes(svc) ? "border-brand-red-600 bg-brand-red-50" : "border-neutral-gray-light"
            )}>
              <input
                type="checkbox"
                checked={info.services.includes(svc)}
                onChange={() => toggleService(svc)}
                className="rounded border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600 h-3.5 w-3.5"
              />
              <span className="text-neutral-gray-dark">{svc}</span>
            </label>
          ))}
        </div>
        <p className="mt-1.5 text-[11px] text-neutral-gray-medium">{info.services.length} selected</p>
      </div>
    </div>
  );
}
