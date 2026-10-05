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
import {
  TITLES,
  RESEARCHER_IDENTITIES,
  ACADEMIC_RESEARCH_LEVELS,
  INDEPENDENT_RESEARCH_LEVELS,
} from '../data';
import type { ResearchFormState } from './types';

export default function HeadResearcherSection({
  value,
  onChange,
  onIdentityChange,
}: {
  value: ResearchFormState['head'];
  onChange: (v: ResearchFormState['head']) => void;
  onIdentityChange: (identity: ResearchFormState['head']['researcherIdentity']) => void;
}) {
  const isAcademic = value.researcherIdentity === 'Academic Researcher';
  const isIndependent = value.researcherIdentity === 'Independent Researcher';
  const levels = isAcademic
    ? ACADEMIC_RESEARCH_LEVELS
    : isIndependent
      ? INDEPENDENT_RESEARCH_LEVELS
      : [];
  const degreeDisabled = value.researchLevel === 'Undergraduate Research';

  return (
    <SectionCard
      title="Your Information (Lead Researcher)"
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
          <FieldLabel>ID Tag</FieldLabel>
          <TextInput value={value.idTag} disabled />
        </div>
        <div>
          <FieldLabel required>Phone Number</FieldLabel>
          <TextInput
            value={value.phone}
            onChange={(e) => onChange({ ...value, phone: e.target.value })}
            required
          />
        </div>
        <div>
          <FieldLabel>E-mail</FieldLabel>
          <TextInput type="email" value={value.email} disabled />
        </div>
        <div>
          <FieldLabel>Role</FieldLabel>
          <TextInput value={value.role} disabled />
        </div>
      </div>

      <div className="mt-4">
        <FieldLabel required>Social Handles</FieldLabel>
        <SocialHandlesFields
          value={value.socials}
          onChange={(socials) => onChange({ ...value, socials })}
        />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <FieldLabel
            required
            info="Are you conducting this research for an academic degree or independent knowledge?"
          >
            Researcher’s Identity
          </FieldLabel>
          <SelectInput
            value={value.researcherIdentity}
            onChange={(e) =>
              onIdentityChange(
                e.target.value as ResearchFormState['head']['researcherIdentity']
              )
            }
            required
          >
            <option value="">Select Identity</option>
            {RESEARCHER_IDENTITIES.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </SelectInput>
        </div>
        <div>
          <FieldLabel required info="Select the level that best describes research complexity.">
            Research Level
          </FieldLabel>
          <SelectInput
            value={value.researchLevel}
            onChange={(e) =>
              onChange({
                ...value,
                researchLevel: e.target.value,
                researchLevelOther: '',
                degreeCertificate:
                  e.target.value === 'Undergraduate Research' ? null : value.degreeCertificate,
              })
            }
            required
            disabled={!value.researcherIdentity}
          >
            <option value="">Select Level</option>
            {levels.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </SelectInput>
          {value.researchLevel === 'Other' && (
            <TextInput
              className="mt-2"
              placeholder="Specify research level"
              value={value.researchLevelOther}
              onChange={(e) => onChange({ ...value, researchLevelOther: e.target.value })}
              required
            />
          )}
        </div>
      </div>

      {isAcademic && (
        <div className="mt-6 rounded-xl border border-neutral-gray-light p-4 bg-neutral-bg-light/40">
          <h4 className="font-bold text-neutral-black mb-3">Background Information (Academic)</h4>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel required>Name of School/Institution</FieldLabel>
              <TextInput
                value={value.schoolName}
                onChange={(e) => onChange({ ...value, schoolName: e.target.value })}
                required
              />
            </div>
            <div>
              <FieldLabel required>School Address</FieldLabel>
              <TextInput
                value={value.schoolAddress}
                onChange={(e) => onChange({ ...value, schoolAddress: e.target.value })}
                required
              />
            </div>
            <div>
              <FieldLabel required>Matriculation/Registration No.</FieldLabel>
              <TextInput
                value={value.matricNo}
                onChange={(e) => onChange({ ...value, matricNo: e.target.value })}
                required
              />
            </div>
            <div>
              <FieldLabel required>Department of Study</FieldLabel>
              <TextInput
                value={value.department}
                onChange={(e) => onChange({ ...value, department: e.target.value })}
                required
              />
            </div>
            <div className="sm:col-span-2">
              <FileUpload
                label="School ID Card"
                required
                accept="image/*"
                file={value.schoolIdCard}
                onChange={(f) => onChange({ ...value, schoolIdCard: f })}
                onClear={() => onChange({ ...value, schoolIdCard: null })}
              />
            </div>
          </div>
        </div>
      )}

      <GovernmentIdCardUpload
        required
        idType={value.idCard.type}
        otherSpecify={value.idCard.otherSpecify}
        file={value.idCard.file}
        onChange={(patch) => onChange({ ...value, idCard: { ...value.idCard, ...patch } })}
      />

      <div className="mt-4 space-y-4">
        <FileUpload
          label="Display Image"
          required
          accept="image/*"
          hint="Upload your facial image only."
          file={value.displayImage}
          onChange={(f) => onChange({ ...value, displayImage: f })}
          onClear={() => onChange({ ...value, displayImage: null })}
        />
        {!degreeDisabled && (
          <FileUpload
            label="Degree Certificate"
            required
            accept="image/*"
            hint="To verify your academic qualification, kindly upload a copy of your most recent academic degree certificate. Uploaded documents are securely stored and protected from unauthorized access."
            file={value.degreeCertificate}
            onChange={(f) => onChange({ ...value, degreeCertificate: f })}
            onClear={() => onChange({ ...value, degreeCertificate: null })}
          />
        )}
        {degreeDisabled && (
          <p className="text-xs text-neutral-gray-medium">
            Degree certificate upload is not required for Undergraduate Research.
          </p>
        )}
      </div>
    </SectionCard>
  );
}
