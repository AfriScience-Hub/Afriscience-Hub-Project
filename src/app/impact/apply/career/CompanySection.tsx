'use client';

import { AFRICAN_COUNTRIES } from '@/app/data/mockData';
import { COUNTRY_STATES } from '@/app/support/volunteer/data';
import {
  FieldLabel,
  SectionCard,
  TextInput,
  SelectInput,
  FileUpload,
  SocialHandlesFields,
} from '../components/FormField';
import type { CareerFormState } from './types';

export default function CompanySection({
  value,
  ownerCount,
  onChange,
}: {
  value: CareerFormState['company'];
  ownerCount: number;
  onChange: (v: CareerFormState['company']) => void;
}) {
  const states = value.country ? COUNTRY_STATES[value.country] || [] : [];

  return (
    <SectionCard title="Company Information">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <FieldLabel required>Registration Status</FieldLabel>
          <SelectInput
            value={value.registrationStatus}
            onChange={(e) =>
              onChange({
                ...value,
                registrationStatus: e.target.value as CareerFormState['company']['registrationStatus'],
              })
            }
            required
          >
            <option value="">Select Status</option>
            <option value="Registered">Registered</option>
            <option value="Not Registered">Not Registered</option>
          </SelectInput>
        </div>
        <div>
          <FieldLabel>Number of Owners / Proprietors</FieldLabel>
          <TextInput value={String(ownerCount)} disabled />
          <p className="text-xs text-neutral-gray-medium mt-1">
            Head Proprietor + Secondary Proprietors
          </p>
        </div>

        {value.registrationStatus === 'Registered' && (
          <div className="sm:col-span-2">
            <FileUpload
              label="Display Image"
              required
              accept="image/*"
              hint="Upload the image of the internal setup of the business."
              file={value.displayImage}
              onChange={(f) => onChange({ ...value, displayImage: f })}
              onClear={() => onChange({ ...value, displayImage: null })}
            />
          </div>
        )}

        <div>
          <FieldLabel required>Company Name</FieldLabel>
          <TextInput
            value={value.companyName}
            onChange={(e) => onChange({ ...value, companyName: e.target.value })}
            required
          />
        </div>
        <div>
          <FieldLabel required>Company Address</FieldLabel>
          <TextInput
            value={value.companyAddress}
            onChange={(e) => onChange({ ...value, companyAddress: e.target.value })}
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
          <FieldLabel required>Company Phone Number</FieldLabel>
          <TextInput
            value={value.phone}
            onChange={(e) => onChange({ ...value, phone: e.target.value })}
            required
          />
        </div>
        <div>
          <FieldLabel required>Company E-mail</FieldLabel>
          <TextInput
            type="email"
            value={value.email}
            onChange={(e) => onChange({ ...value, email: e.target.value })}
            required
          />
        </div>
        <div className="sm:col-span-2">
          <FieldLabel>Website (if any)</FieldLabel>
          <TextInput
            value={value.website}
            onChange={(e) => onChange({ ...value, website: e.target.value })}
            placeholder="https://"
          />
        </div>
      </div>

      <div className="mt-4">
        <FieldLabel required>Social Handles</FieldLabel>
        <SocialHandlesFields
          value={value.socials}
          onChange={(socials) => onChange({ ...value, socials })}
        />
      </div>
    </SectionCard>
  );
}
