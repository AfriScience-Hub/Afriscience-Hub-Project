'use client';

import {
  FieldLabel,
  SectionCard,
  TextInput,
  SelectInput,
  FileUpload,
  SocialHandlesFields,
} from '../components/FormField';
import {
  TITLES,
  ID_CARD_TYPES,
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
    <SectionCard title="Your Information (Head Researcher)">
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
        <FileUpload
          label="Display Image"
          required
          accept="image/*"
          hint="Upload your facial image only."
          file={value.displayImage}
          onChange={(f) => onChange({ ...value, displayImage: f })}
          onClear={() => onChange({ ...value, displayImage: null })}
        />
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

      {isIndependent && (
        <div className="mt-6 rounded-xl border border-neutral-gray-light p-4 bg-neutral-bg-light/40">
          <h4 className="font-bold text-neutral-black mb-2">Previous Publication Links</h4>
          <p className="text-xs text-neutral-gray-medium mb-3">
            Minimum of 7 previous research publication links required.
          </p>
          <div className="space-y-2">
            {value.previousPublications.map((link, idx) => (
              <TextInput
                key={idx}
                type="url"
                placeholder={`Publication link ${idx + 1}`}
                value={link}
                onChange={(e) => {
                  const previousPublications = [...value.previousPublications];
                  previousPublications[idx] = e.target.value;
                  onChange({ ...value, previousPublications });
                }}
                required
              />
            ))}
            <button
              type="button"
              className="text-xs font-bold text-brand-navy-900 hover:underline"
              onClick={() =>
                onChange({
                  ...value,
                  previousPublications: [...value.previousPublications, ''],
                })
              }
            >
              + Add publication link
            </button>
          </div>
        </div>
      )}

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <FieldLabel required>Government ID Card Type</FieldLabel>
          <SelectInput
            value={value.idCard.type}
            onChange={(e) =>
              onChange({ ...value, idCard: { ...value.idCard, type: e.target.value } })
            }
            required
          >
            <option value="">Select ID card type</option>
            {ID_CARD_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </SelectInput>
          {value.idCard.type === 'Other' && (
            <TextInput
              className="mt-2"
              placeholder="Specify ID type"
              value={value.idCard.otherSpecify}
              onChange={(e) =>
                onChange({
                  ...value,
                  idCard: { ...value.idCard, otherSpecify: e.target.value },
                })
              }
              required
            />
          )}
        </div>
        <FileUpload
          label="Upload ID Card"
          required
          accept="image/*"
          hint="Picture/image file formats only."
          file={value.idCard.file}
          onChange={(f) => onChange({ ...value, idCard: { ...value.idCard, file: f } })}
          onClear={() => onChange({ ...value, idCard: { ...value.idCard, file: null } })}
        />
        {!degreeDisabled && (
          <FileUpload
            label="Degree Certificate"
            required
            accept="image/*"
            hint="Upload most recent academic degree certificate."
            file={value.degreeCertificate}
            onChange={(f) => onChange({ ...value, degreeCertificate: f })}
            onClear={() => onChange({ ...value, degreeCertificate: null })}
          />
        )}
        {degreeDisabled && (
          <p className="text-xs text-neutral-gray-medium sm:col-span-2">
            Degree certificate upload is not required for Undergraduate Research.
          </p>
        )}
      </div>
    </SectionCard>
  );
}
