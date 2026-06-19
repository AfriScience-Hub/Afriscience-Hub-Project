'use client';

import { ChevronDown, Filter } from 'lucide-react';
import {
  CENTER_FIELDS,
  CENTER_OWNERSHIP_OPTIONS,
  CENTER_SERVICES,
} from '@/app/data/mockData';
import { cn } from '@/lib/utils';
import InfoTooltip from './InfoTooltip';
import { FIELD_DESCRIPTIONS, CATEGORY_DESCRIPTIONS, COUNTRIES, STATES } from '../data';

interface FilterSidebarProps {
  selectedField: string;
  onFieldChange: (field: string) => void;
  selectedCategories: string[];
  onCategoryToggle: (cat: string) => void;
  selectedOwnership: string[];
  onOwnershipToggle: (own: string) => void;
  selectedServices: string[];
  onServiceToggle: (svc: string) => void;
  selectedStatus: string[];
  onStatusToggle: (st: string) => void;
  selectedCountry: string;
  onCountryChange: (country: string) => void;
  selectedState: string;
  onStateChange: (state: string) => void;
  collapsedSections: Record<string, boolean>;
  onToggleSection: (key: string) => void;
  onClearAll: () => void;
  activeFilterCount: number;
  showFilters: boolean;
  availableCategories: string[];
}

export default function FilterSidebar({
  selectedField, onFieldChange,
  selectedCategories, onCategoryToggle,
  selectedOwnership, onOwnershipToggle,
  selectedServices, onServiceToggle,
  selectedStatus, onStatusToggle,
  selectedCountry, onCountryChange,
  selectedState, onStateChange,
  collapsedSections, onToggleSection,
  onClearAll, activeFilterCount, showFilters, availableCategories,
}: FilterSidebarProps) {
  return (
    <aside className={cn(
      "w-full lg:w-72 flex-shrink-0 space-y-4 transition-all duration-300",
      showFilters ? "block" : "hidden lg:block"
    )}>
      <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm lg:sticky lg:top-20 max-h-[calc(100vh-6rem)] overflow-y-auto custom-scrollbar">
        <div className="mb-4 flex items-center justify-between border-b border-neutral-gray-light pb-3">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-brand-red-600" />
            <h3 className="font-bold text-neutral-black">Filters</h3>
            {activeFilterCount > 0 && (
              <span className="flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-brand-red-600 text-white text-[10px] font-bold">
                {activeFilterCount}
              </span>
            )}
          </div>
          <button onClick={onClearAll} className="text-xs text-brand-red-600 hover:underline font-medium">
            Reset All
          </button>
        </div>

        <div className="space-y-0 divide-y divide-neutral-gray-light">
          {/* Fields */}
          <div className="py-4 first:pt-0">
            <button
              onClick={() => onToggleSection('fields')}
              className="w-full flex items-center justify-between text-sm font-bold text-neutral-black mb-0 hover:text-brand-red-600 transition-colors"
            >
              <span className="flex items-center gap-1.5">
                Fields
                {selectedField && (
                  <span className="text-[10px] font-bold text-brand-red-600 bg-brand-red-100 px-1.5 py-0.5 rounded-full">1</span>
                )}
              </span>
              <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", !collapsedSections.fields && "rotate-180")} />
            </button>
            {!collapsedSections.fields && (
              <div className="mt-3 space-y-2 max-h-52 overflow-y-auto pr-2 custom-scrollbar animate-in fade-in duration-200">
                {CENTER_FIELDS.map((field) => (
                  <label key={field} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="center-field"
                      checked={selectedField === field}
                      onChange={() => onFieldChange(field)}
                      className="border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600 h-3.5 w-3.5"
                    />
                    <span className="flex-1 text-sm text-neutral-gray-dark group-hover:text-brand-navy-900 transition-colors">{field}</span>
                    {FIELD_DESCRIPTIONS[field] && <InfoTooltip text={FIELD_DESCRIPTIONS[field]} />}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Categories */}
          <div className="py-4">
            <button
              onClick={() => onToggleSection('categories')}
              className="w-full flex items-center justify-between text-sm font-bold text-neutral-black mb-0 hover:text-brand-red-600 transition-colors"
            >
              <span className="flex items-center gap-1.5">
                Categories
                {selectedCategories.length > 0 && (
                  <span className="text-[10px] font-bold text-brand-red-600 bg-brand-red-100 px-1.5 py-0.5 rounded-full">{selectedCategories.length}</span>
                )}
              </span>
              <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", !collapsedSections.categories && "rotate-180")} />
            </button>
            {selectedField && (
              <p className="text-[10px] text-neutral-gray-medium mt-1">
                Showing categories for: <span className="font-bold text-brand-navy-900">{selectedField}</span>
              </p>
            )}
            {!collapsedSections.categories && (
              <div className="mt-3 space-y-2 max-h-52 overflow-y-auto pr-2 custom-scrollbar animate-in fade-in duration-200">
                {availableCategories.length > 0 ? availableCategories.map((cat) => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => onCategoryToggle(cat)}
                      className="rounded border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600 h-3.5 w-3.5"
                    />
                    <span className="flex-1 text-xs text-neutral-gray-dark group-hover:text-brand-navy-900 transition-colors leading-tight">{cat}</span>
                    {CATEGORY_DESCRIPTIONS[cat] && <InfoTooltip text={CATEGORY_DESCRIPTIONS[cat]} />}
                  </label>
                )) : (
                  <p className="text-xs text-neutral-gray-medium italic">Select a field to see categories.</p>
                )}
              </div>
            )}
          </div>

          {/* Services */}
          <div className="py-4">
            <button
              onClick={() => onToggleSection('services')}
              className="w-full flex items-center justify-between text-sm font-bold text-neutral-black mb-0 hover:text-brand-red-600 transition-colors"
            >
              <span className="flex items-center gap-1.5">
                Services
                {selectedServices.length > 0 && (
                  <span className="text-[10px] font-bold text-brand-red-600 bg-brand-red-100 px-1.5 py-0.5 rounded-full">{selectedServices.length}</span>
                )}
              </span>
              <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", !collapsedSections.services && "rotate-180")} />
            </button>
            {!collapsedSections.services && (
              <div className="mt-3 space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar animate-in fade-in duration-200">
                {CENTER_SERVICES.map((service) => (
                  <label key={service} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(service)}
                      onChange={() => onServiceToggle(service)}
                      className="rounded border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600 h-3.5 w-3.5"
                    />
                    <span className="text-xs text-neutral-gray-dark group-hover:text-brand-navy-900 transition-colors">{service}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Ownership */}
          <div className="py-4">
            <button
              onClick={() => onToggleSection('ownership')}
              className="w-full flex items-center justify-between text-sm font-bold text-neutral-black mb-0 hover:text-brand-red-600 transition-colors"
            >
              <span className="flex items-center gap-1.5">
                Ownership
                {selectedOwnership.length > 0 && (
                  <span className="text-[10px] font-bold text-brand-red-600 bg-brand-red-100 px-1.5 py-0.5 rounded-full">{selectedOwnership.length}</span>
                )}
              </span>
              <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", !collapsedSections.ownership && "rotate-180")} />
            </button>
            {!collapsedSections.ownership && (
              <div className="mt-3 space-y-2 max-h-44 overflow-y-auto pr-2 custom-scrollbar animate-in fade-in duration-200">
                {CENTER_OWNERSHIP_OPTIONS.map((own) => (
                  <label key={own} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedOwnership.includes(own)}
                      onChange={() => onOwnershipToggle(own)}
                      className="rounded border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600 h-3.5 w-3.5"
                    />
                    <span className="text-sm text-neutral-gray-dark group-hover:text-brand-navy-900 transition-colors">{own}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Status */}
          <div className="py-4">
            <button
              onClick={() => onToggleSection('status')}
              className="w-full flex items-center justify-between text-sm font-bold text-neutral-black mb-0 hover:text-brand-red-600 transition-colors"
            >
              <span className="flex items-center gap-1.5">
                Status
                {selectedStatus.length > 0 && (
                  <span className="text-[10px] font-bold text-brand-red-600 bg-brand-red-100 px-1.5 py-0.5 rounded-full">{selectedStatus.length}</span>
                )}
              </span>
              <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", !collapsedSections.status && "rotate-180")} />
            </button>
            {!collapsedSections.status && (
              <div className="mt-3 space-y-2 animate-in fade-in duration-200">
                {['Online', 'Offline'].map((status) => (
                  <label key={status} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedStatus.includes(status)}
                      onChange={() => onStatusToggle(status)}
                      className="rounded border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600 h-3.5 w-3.5"
                    />
                    <span className="text-sm text-neutral-gray-dark group-hover:text-brand-navy-900 transition-colors">{status}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Country */}
          <div className="py-4">
            <button
              onClick={() => onToggleSection('country')}
              className="w-full flex items-center justify-between text-sm font-bold text-neutral-black mb-0 hover:text-brand-red-600 transition-colors"
            >
              Country
              <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", !collapsedSections.country && "rotate-180")} />
            </button>
            {!collapsedSections.country && (
              <div className="mt-3 animate-in fade-in duration-200">
                <select
                  value={selectedCountry}
                  onChange={(e) => { onCountryChange(e.target.value); onStateChange(''); }}
                  className="w-full rounded-lg border border-neutral-gray-light text-sm p-2 bg-neutral-bg-light focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
                >
                  <option value="">All Countries</option>
                  {COUNTRIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* State / Region */}
          <div className="py-4 last:pb-0">
            <button
              onClick={() => onToggleSection('state')}
              className="w-full flex items-center justify-between text-sm font-bold text-neutral-black mb-0 hover:text-brand-red-600 transition-colors"
            >
              State / Region
              <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", !collapsedSections.state && "rotate-180")} />
            </button>
            {!collapsedSections.state && (
              <div className="mt-3 animate-in fade-in duration-200">
                {selectedCountry && STATES[selectedCountry] ? (
                  <select
                    value={selectedState}
                    onChange={(e) => onStateChange(e.target.value)}
                    className="w-full rounded-lg border border-neutral-gray-light text-sm p-2 bg-neutral-bg-light focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
                  >
                    <option value="">All Regions</option>
                    {STATES[selectedCountry].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                ) : (
                  <p className="text-xs text-slate-400 italic">Select a country first</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
