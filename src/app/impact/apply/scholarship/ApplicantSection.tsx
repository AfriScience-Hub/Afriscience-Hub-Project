'use client';

import {
  FieldLabel,
  SectionCard,
  TextInput,
  SelectInput,
  FileUpload,
  SocialHandlesFields,
} from '../components/FormField';
import { TITLES, ID_CARD_TYPES } from '../data';
import type { ScholarshipFormState } from './types';

export default function ApplicantSection({
  value,
  onChange,
}: {
  value: ScholarshipFormState['applicant'];
  onChange: (v: ScholarshipFormState['applicant']) => void;
}) {
  return (
    <SectionCard title="Your Information (Beneficiary)">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <FieldLabel required>Title</FieldLabel>
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
        <div className="sm:col-span-2">
          <FieldLabel>E-mail</FieldLabel>
          <TextInput type="email" value={value.email} disabled />
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
          hint="Facial image of beneficiary only."
          file={value.displayImage}
          onChange={(f) => onChange({ ...value, displayImage: f })}
          onClear={() => onChange({ ...value, displayImage: null })}
        />
        <FileUpload
          label="Current Academic Transcript"
          required
          accept="image/*,.pdf"
          file={value.academicTranscript}
          onChange={(f) => onChange({ ...value, academicTranscript: f })}
          onClear={() => onChange({ ...value, academicTranscript: null })}
        />
        <div>
          <FieldLabel required>Government ID Card Type</FieldLabel>
          <SelectInput
            value={value.idCard.type}
            onChange={(e) =>
              onChange({
                ...value,
                idCard: { ...value.idCard, type: e.target.value },
              })
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
          file={value.idCard.file}
          onChange={(f) =>
            onChange({
              ...value,
              idCard: { ...value.idCard, file: f },
            })
          }
          onClear={() =>
            onChange({
              ...value,
              idCard: { ...value.idCard, file: null },
            })
          }
        />
        <FileUpload
          label="Degree Certificate (where applicable)"
          accept="image/*,.pdf"
          hint="Optional — upload if you already hold a prior tertiary certificate."
          file={value.degreeCertificate}
          onChange={(f) => onChange({ ...value, degreeCertificate: f })}
          onClear={() => onChange({ ...value, degreeCertificate: null })}
        />
      </div>
    </SectionCard>
  );
}
