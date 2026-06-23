'use client';

import { School, Hash, GraduationCap, ChevronDown } from 'lucide-react';

interface DepartmentSectionProps {
  department: string;
  onDepartmentChange: (v: string) => void;
}

export function DepartmentSection({ department, onDepartmentChange }: DepartmentSectionProps) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
        <School className="h-3.5 w-3.5" /> Department of Study
      </label>
      <input
        type="text"
        value={department}
        onChange={(e) => onDepartmentChange(e.target.value)}
        placeholder="Enter your current study department..."
        className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
      />
    </div>
  );
}

interface MatricSectionProps {
  matricNo: string;
  onMatricNoChange: (v: string) => void;
}

export function MatricSection({ matricNo, onMatricNoChange }: MatricSectionProps) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
        <Hash className="h-3.5 w-3.5" /> Matriculation/Registration No.
      </label>
      <input
        type="text"
        value={matricNo}
        onChange={(e) => onMatricNoChange(e.target.value)}
        placeholder="Enter your matriculation no. or registration no...."
        className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
      />
    </div>
  );
}

interface DegreeTypeSectionProps {
  degreeType: string;
  otherDegreeType: string;
  onDegreeTypeChange: (v: string) => void;
  onOtherDegreeTypeChange: (v: string) => void;
}

const DEGREE_TYPES = ['OND', 'HND', 'BSc', 'PGD', 'MSc', 'PhD', 'Other'];

export function DegreeTypeSection({ degreeType, otherDegreeType, onDegreeTypeChange, onOtherDegreeTypeChange }: DegreeTypeSectionProps) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
        <GraduationCap className="h-3.5 w-3.5" /> Degree Type
      </label>
      <div className="relative">
        <select
          value={degreeType}
          onChange={(e) => onDegreeTypeChange(e.target.value)}
          className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm appearance-none bg-white focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
        >
          <option value="">Select Type</option>
          {DEGREE_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium pointer-events-none" />
      </div>
      <p className="text-[10px] text-neutral-gray-medium mt-1">Mention your most recent academic degree</p>
      {degreeType === 'Other' && (
        <input
          type="text"
          value={otherDegreeType}
          onChange={(e) => onOtherDegreeTypeChange(e.target.value)}
          placeholder="Specify degree type..."
          className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm mt-2 focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
        />
      )}
    </div>
  );
}
