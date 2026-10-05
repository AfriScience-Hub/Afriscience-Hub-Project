'use client';

import { User } from 'lucide-react';
import {
  FieldLabel,
  SectionCard,
  TextInput,
  SelectInput,
  FileUpload,
  SocialHandlesFields,
  GovernmentIdCardUpload,
} from '../components/FormField';
import { TITLES } from '../data';
import { ACADEMIC_LEVELS } from './types';
import type { ScholarshipFormState } from './types';

export default function ApplicantSection({
  value,
  onChange,
}: {
  value: ScholarshipFormState['applicant'];
  onChange: (v: ScholarshipFormState['applicant']) => void;
}) {
  const degreeDisabled = value.academicLevel === 'Undergraduate';

  return (
    <SectionCard
      title="Your Information (Beneficiary)"
      icon={<User className="h-5 w-5 text-brand-red-600" />}
      badge="Required"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <FieldLabel required info="Select the appropriate title that best describes you.">
            Title
          </FieldLabel>
          <SelectInput
            value={value.title}
            onChange={(e) => onChange({ ...value, title: e.target.value })}
            required
          >
            <option value="">Select Title</option>
            {TITLES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </SelectInput>
        </div>
        <div>
          <FieldLabel>Name</FieldLabel>
          <TextInput value={value.name} disabled />
        </div>
        <div>
          <FieldLabel>Username</FieldLabel>
          <TextInput value={value.username} disabled />
        </div>
        <div>
          <FieldLabel required>Phone Number</FieldLabel>
          <TextInput
            value={value.phone}
            onChange={(e) => onChange({ ...value, phone: e.target.value })}
            required
          />
        </div>
        <div className="sm:col-span-2">
          <FieldLabel>E-mail</FieldLabel>
          <TextInput type="email" value={value.email} disabled />
        </div>
      </div>

      <div className="mt-4">
        <FieldLabel required>Social Handles</FieldLabel>
        <SocialHandlesFields
          hintPosition="above"
          value={value.socials}
          onChange={(socials) => onChange({ ...value, socials })}
        />
      </div>

      <div className="mt-4 space-y-4">
        <div>
          <FieldLabel required>Academic Level</FieldLabel>
          <SelectInput
            value={value.academicLevel}
            onChange={(e) => onChange({ ...value, academicLevel: e.target.value, academicLevelOther: '' })}
            required
          >
            <option value="">Select Level</option>
            {ACADEMIC_LEVELS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </SelectInput>
          {value.academicLevel === 'Other' && (
            <TextInput
              className="mt-2"
              placeholder="Specify your academic level"
              value={value.academicLevelOther}
              onChange={(e) => onChange({ ...value, academicLevelOther: e.target.value })}
              required
            />
          )}
        </div>
        <FileUpload
          label="Display Image"
          required
          accept="image/*"
          hint="Facial image of beneficiary only."
          file={value.displayImage}
          onChange={(f) => onChange({ ...value, displayImage: f })}
          onClear={() => onChange({ ...value, displayImage: null })}
        />
        <GovernmentIdCardUpload
          required
          note="To verify your identity, kindly upload a copy of the selected ID card. Uploaded documents are securely stored and protected from unauthorized access."
          idType={value.idCard.type}
          otherSpecify={value.idCard.otherSpecify}
          file={value.idCard.file}
          onChange={(patch) => onChange({ ...value, idCard: { ...value.idCard, ...patch } })}
        />
        {!degreeDisabled && (
          <FileUpload
            label="Degree Certificate (where applicable)"
            accept="image/*,.pdf"
            hint="To verify your academic portfolio, kindly upload a copy of your most recent academic degree certificate. Uploaded documents are securely stored and protected from unauthorized access."
            file={value.degreeCertificate}
            onChange={(f) => onChange({ ...value, degreeCertificate: f })}
            onClear={() => onChange({ ...value, degreeCertificate: null })}
          />
        )}
        {degreeDisabled && (
          <p className="text-xs text-neutral-gray-medium">
            Degree certificate upload is not required for Undergraduate applicants.
          </p>
        )}
      </div>
    </SectionCard>
  );
}
