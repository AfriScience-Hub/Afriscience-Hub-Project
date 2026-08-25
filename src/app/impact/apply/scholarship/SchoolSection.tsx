'use client';

import { GraduationCap } from 'lucide-react';
import { AFRICAN_COUNTRIES } from '@/app/data/mockData';
import { COUNTRY_STATES } from '@/app/support/volunteer/data';
import {
  FieldLabel,
  SectionCard,
  TextInput,
  SelectInput,
  FileUpload,
} from '../components/FormField';
import { ACADEMIC_YEARS, type ScholarshipFormState } from './types';

export default function SchoolSection({
  value,
  academicLevel,
  onChange,
}: {
  value: ScholarshipFormState['school'];
  academicLevel: string;
  onChange: (v: ScholarshipFormState['school']) => void;
}) {
  const states = value.country ? COUNTRY_STATES[value.country] || [] : [];
  const years = ACADEMIC_YEARS[academicLevel] || ACADEMIC_YEARS['Undergraduate'];

  return (
    <SectionCard
      title="Academic Information"
      icon={<GraduationCap className="h-5 w-5 text-brand-red-600" />}
      badge="Required"
      defaultOpen={false}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <FieldLabel required>Scholarship Level</FieldLabel>
          <TextInput
            value={academicLevel ? `${academicLevel} Scholarship` : ''}
            disabled
            placeholder="Auto-filled from Academic Level"
          />
        </div>
        <div>
          <FieldLabel required>Academic Year</FieldLabel>
          <SelectInput
            value={value.academicYear}
            onChange={(e) => onChange({ ...value, academicYear: e.target.value })}
            required
          >
            <option value="">Select Year</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </SelectInput>
        </div>
        <div>
          <FieldLabel required>Name of Institution</FieldLabel>
          <TextInput
            value={value.institutionName}
            onChange={(e) => onChange({ ...value, institutionName: e.target.value })}
            required
          />
        </div>
        <div>
          <FieldLabel required>Address of Institution</FieldLabel>
          <TextInput
            value={value.institutionAddress}
            onChange={(e) => onChange({ ...value, institutionAddress: e.target.value })}
            required
          />
        </div>
        <div>
          <FieldLabel required>Country</FieldLabel>
          <SelectInput
            value={value.country}
            onChange={(e) =>
              onChange({ ...value, country: e.target.value, stateRegion: '' })
            }
            required
          >
            <option value="">Select Country</option>
            {AFRICAN_COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </SelectInput>
        </div>
        <div>
          <FieldLabel required>State / Region</FieldLabel>
          {states.length > 0 ? (
            <SelectInput
              value={value.stateRegion}
              onChange={(e) => onChange({ ...value, stateRegion: e.target.value })}
              required
              disabled={!value.country}
            >
              <option value="">Select State/Region</option>
              {states.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </SelectInput>
          ) : (
            <TextInput
              placeholder={value.country ? 'Enter state/region' : 'Select country first'}
              value={value.stateRegion}
              onChange={(e) => onChange({ ...value, stateRegion: e.target.value })}
              required
              disabled={!value.country}
            />
          )}
        </div>
        <div>
          <FieldLabel required>Department Name</FieldLabel>
          <TextInput
            value={value.departmentName}
            onChange={(e) => onChange({ ...value, departmentName: e.target.value })}
            required
          />
        </div>
        <div>
          <FieldLabel required>Matriculation / Registration No.</FieldLabel>
          <TextInput
            value={value.matricNo}
            onChange={(e) => onChange({ ...value, matricNo: e.target.value })}
            required
          />
        </div>
        <div>
          <FieldLabel required>Current CGPA</FieldLabel>
          <TextInput
            type="number"
            step="0.01"
            min="0"
            max="5"
            value={value.currentCgpa}
            onChange={(e) => onChange({ ...value, currentCgpa: e.target.value })}
            placeholder="e.g. 3.50"
            required
          />
          <p className="text-xs text-neutral-gray-medium mt-1">Minimum CGPA of 3.0 at time of application.</p>
        </div>
        <FileUpload
          label="School Registration / Student ID"
          required
          accept="image/*,.pdf"
          hint="Upload your school ID card or registration document."
          file={value.schoolIdCard}
          onChange={(f) => onChange({ ...value, schoolIdCard: f })}
          onClear={() => onChange({ ...value, schoolIdCard: null })}
        />
      </div>
    </SectionCard>
  );
}
