/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, RotateCcw, Filter } from 'lucide-react';

const africaData: Record<string, string[]> = {
  "Nigeria": ["Lagos", "Abuja", "Rivers", "Kano"],
  "Kenya": ["Nairobi", "Mombasa", "Kisumu"],
  "South Africa": ["Gauteng", "Western Cape", "KwaZulu-Natal"],
  "Ghana": ["Greater Accra", "Ashanti", "Western"],
  "Egypt": ["Cairo", "Alexandria", "Giza"]
};

// --- 1. MOVE SUB-COMPONENTS OUTSIDE ---
interface FilterSidebarProps {
  onFilterChange: (type: string, value: string, checked: boolean) => void;
  selectedFilters: any;
}

interface FilterSectionProps {
  title: string;
  id: string;
  isOpen: boolean;
  onToggle: (id: string) => void;
  children: React.ReactNode;
}

const FilterSection = ({ title, id, isOpen, onToggle, children }: FilterSectionProps) => (
  <div className="border-b border-gray-100 py-4">
    <button 
      onClick={() => onToggle(id)}
      className="flex w-full items-center justify-between text-sm font-bold text-gray-900"
    >
      <span>{title}</span>
      {isOpen ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
    </button>
    {isOpen && (
      <div className="mt-4 space-y-3 max-h-60 overflow-y-auto scrollbar-hide">
        {children}
      </div>
    )}
  </div>
);

const CheckboxItem = ({ 
  label, 
  category, 
  onFilterChange 
}: { 
  label: string; 
  category: string; 
  onFilterChange: any 
}) => (
  <label className="flex items-center gap-3 cursor-pointer group">
    <div className="relative flex items-center justify-center">
      <input 
        type="checkbox" 
        onChange={(e) => onFilterChange(category, label, e.target.checked)}
        className="peer appearance-none w-4 h-4 border-2 border-gray-300 rounded checked:bg-red-500 checked:border-red-500 transition-all" 
      />
      <div className="absolute text-white opacity-0 peer-checked:opacity-100 text-[10px]">✓</div>
    </div>
    <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{label}</span>
  </label>
);

// --- 2. MAIN COMPONENT ---

export default function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    class: true,
    ownership: false,
    gender: false,
    services: false,
    status: false,
    location: true
  });

  const [selectedCountry, setSelectedCountry] = useState("");

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <aside className="w-full md:w-70 bg-white border border-gray-800 shadow-md rounded-xl sticky top-24 overflow-y-auto max-h-120 scrollbar-hide">
      <div className="px-4 pt-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-black font-bold">
          <Filter size={14} className='text-red-500'/>
          <span>Filters</span>
        </div>
        <button className="text-xs text-red-500 flex items-center gap-1 hover:underline">
          <RotateCcw size={12} /> Reset All
        </button>
      </div>

      <div className="p-4 ">
        {/* Pass state and toggle function as props now */}
        <FilterSection 
          title="Class" 
          id="class" 
          isOpen={openSections.class} 
          onToggle={toggleSection}
        >
          {["Primary", "Secondary", "Primary & Secondary"].map(opt => (
            <CheckboxItem key={opt} label={opt} onFilterChange={onFilterChange} category="class"/>
          ))}
        </FilterSection>

        <FilterSection 
          title="Ownership" 
          id="ownership" 
          isOpen={openSections.ownership} 
          onToggle={toggleSection}
        >
          {["Private", "Government | Public", "Mission", "International", "Inter-Government", "NGO | Charity"].map(opt => (
            <CheckboxItem key={opt} label={opt} onFilterChange={onFilterChange} category="ownership"/>
          ))}
        </FilterSection>

        <FilterSection 
          title="Gender" 
          id="gender" 
          isOpen={openSections.gender} 
          onToggle={toggleSection}
        >
          {["Female", "Male", "Mixed"].map(opt => (
            <CheckboxItem key={opt} label={opt} onFilterChange={onFilterChange} category="gender"/>
          ))}
        </FilterSection>

        <FilterSection 
          title="Services" 
          id="services" 
          isOpen={openSections.services} 
          onToggle={toggleSection}
        >
          {[
            "Competitions", "Conferences", "Excursions", "Exercises & Sports", 
            "Extra Lessons", "Health Programs", "PTA Meetings", "Reunions", 
            "Scholarships", "Science Clubs", "Teaching & Learning"
          ].map(opt => (
            <CheckboxItem key={opt} label={opt} onFilterChange={onFilterChange} category="services"/>
          ))}
        </FilterSection>

        <FilterSection 
          title="Status" 
          id="status" 
          isOpen={openSections.status} 
          onToggle={toggleSection}
        >
          {["Online", "Offline"].map(opt => (
            <CheckboxItem key={opt} label={opt} onFilterChange={onFilterChange} category="status"/>
          ))}
        </FilterSection>

        <FilterSection 
          title="Location" 
          id="location" 
          isOpen={openSections.location} 
          onToggle={toggleSection}
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Country</label>
              <select 
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="text-black w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-red-500 transition-colors appearance-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m19 9-7 7-7-7'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center', backgroundSize: '16px' }}
              >
                <option value="">Select Country</option>
                {Object.keys(africaData).map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">State / Region</label>
              <select 
                disabled={!selectedCountry}
                className="w-full p-2.5 bg-gray-50 text-black border border-gray-200 rounded-lg text-sm outline-none focus:border-red-500 transition-colors disabled:opacity-50 appearance-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m19 9-7 7-7-7'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center', backgroundSize: '16px' }}
              >
                <option value="">Select State</option>
                {selectedCountry && africaData[selectedCountry].map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>
        </FilterSection>
      </div>

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