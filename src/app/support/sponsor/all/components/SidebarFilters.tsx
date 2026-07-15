'use client';

import { ChevronUp, ChevronDown, Search } from 'lucide-react';
import { useState } from 'react';
import { Input } from '../../../../components/ui/input';
import { INDUSTRIES, COUNTRIES } from '../data';

interface SidebarFiltersProps {
  searchTerm: string;
  onSearchChange: (v: string) => void;
  selectedIndustry: string;
  onIndustryChange: (industry: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  selectedCountry: string;
  onCountryChange: (country: string) => void;
  onReset: () => void;
}

export function SidebarFilters({
  searchTerm, onSearchChange,
  selectedIndustry, onIndustryChange,
  selectedStatus, onStatusChange,
  selectedCountry, onCountryChange,
  onReset,
}: SidebarFiltersProps) {
  const [industryOpen, setIndustryOpen] = useState(true);
  const [statusOpen, setStatusOpen] = useState(true);
  const [countryOpen, setCountryOpen] = useState(true);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light p-6 sticky top-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-neutral-black text-lg">Filters</h3>
        <button onClick={onReset} className="cursor-pointer text-sm text-brand-red-600 hover:underline font-medium">
          Reset All
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-xs font-bold text-neutral-gray-medium uppercase mb-2">Search</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium" />
          <Input
            placeholder="Search sponsors..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="mb-6">
        <button onClick={() => setIndustryOpen(!industryOpen)} className="cursor-pointer w-full flex items-center justify-between text-xs font-bold text-neutral-gray-medium uppercase mb-2">
          <span>Industry</span>
          {industryOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {industryOpen && (
          <div className="space-y-1 max-h-64 overflow-y-auto">
            {INDUSTRIES.map(industry => (
              <label key={industry} className={`flex items-center gap-2 cursor-pointer text-sm p-1.5 rounded transition-colors ${selectedIndustry === industry ? 'bg-brand-red-50 text-brand-red-600 font-medium' : 'text-neutral-gray-dark hover:bg-neutral-bg-light'}`}>
                <input
                  type="radio"
                  name="industry"
                  checked={selectedIndustry === industry}
                  onChange={() => onIndustryChange(industry)}
                  className="text-brand-red-600 focus:ring-brand-red-600"
                />
                <span>{industry}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="mb-6">
        <button onClick={() => setStatusOpen(!statusOpen)} className="cursor-pointer w-full flex items-center justify-between text-xs font-bold text-neutral-gray-medium uppercase mb-2">
          <span>Status</span>
          {statusOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {statusOpen && (
          <div className="space-y-1">
            {['Online', 'Offline'].map(status => (
              <label key={status} className={`flex items-center gap-2 cursor-pointer text-sm p-1.5 rounded transition-colors ${selectedStatus === status ? 'bg-brand-red-50 text-brand-red-600 font-medium' : 'text-neutral-gray-dark hover:bg-neutral-bg-light'}`}>
                <input
                  type="radio"
                  name="status"
                  checked={selectedStatus === status}
                  onChange={() => onStatusChange(status)}
                  className="text-brand-red-600 focus:ring-brand-red-600"
                />
                <span>{status}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="mb-6">
        <button onClick={() => setCountryOpen(!countryOpen)} className="cursor-pointer w-full flex items-center justify-between text-xs font-bold text-neutral-gray-medium uppercase mb-2">
          <span>Country</span>
          {countryOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {countryOpen && (
          <select
            value={selectedCountry}
            onChange={(e) => onCountryChange(e.target.value)}
            className="cursor-pointer w-full rounded-lg border border-neutral-gray-light p-2 text-sm"
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
