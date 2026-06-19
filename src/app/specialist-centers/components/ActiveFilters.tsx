'use client';

import { X } from 'lucide-react';

interface ActiveFiltersProps {
  selectedField: string;
  onClearField: () => void;
  selectedCategories: string[];
  onClearCategory: (cat: string) => void;
  selectedServices: string[];
  onClearService: (svc: string) => void;
  selectedOwnership: string[];
  onClearOwnership: (own: string) => void;
  selectedStatus: string[];
  onClearStatus: (st: string) => void;
  selectedCountry: string;
  selectedState: string;
  onClearLocation: () => void;
  onClearAll: () => void;
  activeFilterCount: number;
}

export default function ActiveFilters({
  selectedField, onClearField,
  selectedCategories, onClearCategory,
  selectedServices, onClearService,
  selectedOwnership, onClearOwnership,
  selectedStatus, onClearStatus,
  selectedCountry, selectedState,
  onClearLocation, onClearAll, activeFilterCount,
}: ActiveFiltersProps) {
  if (activeFilterCount === 0) return null;

  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {selectedField && (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-navy-100 text-brand-navy-900 text-xs font-medium">
          {selectedField}
          <button onClick={onClearField}><X className="h-3 w-3" /></button>
        </span>
      )}
      {selectedCategories.map(c => (
        <span key={`c-${c}`} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-red-100 text-brand-red-600 text-xs font-medium">
          {c}
          <button onClick={() => onClearCategory(c)}><X className="h-3 w-3" /></button>
        </span>
      ))}
      {selectedServices.map(s => (
        <span key={`s-${s}`} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
          {s}
          <button onClick={() => onClearService(s)}><X className="h-3 w-3" /></button>
        </span>
      ))}
      {selectedOwnership.map(o => (
        <span key={`o-${o}`} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">
          {o}
          <button onClick={() => onClearOwnership(o)}><X className="h-3 w-3" /></button>
        </span>
      ))}
      {selectedStatus.map(st => (
        <span key={`st-${st}`} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-bg-light text-neutral-gray-dark text-xs font-medium border border-neutral-gray-light">
          {st}
          <button onClick={() => onClearStatus(st)}><X className="h-3 w-3" /></button>
        </span>
      ))}
      {selectedCountry && (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">
          {selectedCountry}{selectedState ? ` > ${selectedState}` : ''}
          <button onClick={onClearLocation}><X className="h-3 w-3" /></button>
        </span>
      )}
      <button onClick={onClearAll} className="text-xs text-brand-red-600 hover:underline font-medium px-2 py-1">
        Clear All
      </button>
    </div>
  );
}
