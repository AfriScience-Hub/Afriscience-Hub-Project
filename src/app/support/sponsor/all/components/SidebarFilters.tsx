'use client';

import { ChevronUp, ChevronDown } from 'lucide-react';
import { Input } from '../../../../components/ui/input';
import { INDUSTRIES, COUNTRIES } from '../data';

interface SidebarFiltersProps {
  searchTerm: string;
  onSearchChange: (v: string) => void;
  selectedIndustry: string[];
  onIndustryChange: (industry: string) => void;
  selectedStatus: string[];
  onStatusChange: (status: string) => void;
  selectedCountry: string;
  onCountryChange: (country: string) => void;
  onReset: () => void;
  industryOpen: boolean;
  setIndustryOpen: (v: boolean) => void;
  statusOpen: boolean;
  setStatusOpen: (v: boolean) => void;
  countryOpen: boolean;
  setCountryOpen: (v: boolean) => void;
}

export function SidebarFilters({
  searchTerm, onSearchChange,
  selectedIndustry, onIndustryChange,
  selectedStatus, onStatusChange,
  selectedCountry, onCountryChange,
  onReset,
  industryOpen, setIndustryOpen,
  statusOpen, setStatusOpen,
  countryOpen, setCountryOpen,
}: SidebarFiltersProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light p-6 sticky top-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-neutral-black text-lg">Filters</h3>
        <button onClick={onReset} className="text-sm text-brand-red-600 hover:underline font-medium">
          Reset All
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-xs font-bold text-neutral-gray-medium uppercase mb-2">Search</label>
        <Input
          placeholder="Search sponsors..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <button onClick={() => setIndustryOpen(!industryOpen)} className="w-full flex items-center justify-between text-xs font-bold text-neutral-gray-medium uppercase mb-2">
          <span>Industry</span>
          {industryOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {industryOpen && (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {INDUSTRIES.map(industry => (
              <label key={industry} className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="checkbox"
                  checked={selectedIndustry.includes(industry)}
                  onChange={() => onIndustryChange(industry)}
                  className="rounded border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600"
                />
                <span className="text-neutral-gray-dark">{industry}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="mb-6">
        <button onClick={() => setStatusOpen(!statusOpen)} className="w-full flex items-center justify-between text-xs font-bold text-neutral-gray-medium uppercase mb-2">
          <span>Status</span>
          {statusOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {statusOpen && (
          <div className="space-y-2">
            {['Online', 'Offline'].map(status => (
              <label key={status} className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="checkbox"
                  checked={selectedStatus.includes(status)}
                  onChange={() => onStatusChange(status)}
                  className="rounded border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600"
                />
                <span className="text-neutral-gray-dark">{status}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="mb-6">
        <button onClick={() => setCountryOpen(!countryOpen)} className="w-full flex items-center justify-between text-xs font-bold text-neutral-gray-medium uppercase mb-2">
          <span>Country</span>
          {countryOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {countryOpen && (
          <select
            value={selectedCountry}
            onChange={(e) => onCountryChange(e.target.value)}
            className="w-full rounded-lg border border-neutral-gray-light p-2 text-sm"
          >
            <option value="">All Countries</option>
            {COUNTRIES.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}
