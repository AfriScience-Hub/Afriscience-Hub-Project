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
import type { CareerFormState } from './types';

export default function HeadProprietorSection({
  value,
  onChange,
}: {
  value: CareerFormState['head'];
  onChange: (v: CareerFormState['head']) => void;
}) {
  return (
    <SectionCard title="Your Information (Head Proprietor)">
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
          hint="Upload your facial image only. Picture/image file formats only."
          file={value.displayImage}
          onChange={(f) => onChange({ ...value, displayImage: f })}
          onClear={() => onChange({ ...value, displayImage: null })}
        />
        <FileUpload
          label="Degree Certificate"
          required
          accept="image/*"
          hint="Upload a copy of your most recent tertiary degree certificate."
          file={value.degreeCertificate}
          onChange={(f) => onChange({ ...value, degreeCertificate: f })}
          onClear={() => onChange({ ...value, degreeCertificate: null })}
        />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <FieldLabel required info="To verify your identity, upload a copy of the selected ID card.">
            Government ID Card Type
          </FieldLabel>
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
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <FieldLabel required>Employment Letter / Training Certificate</FieldLabel>
          <SelectInput
            value={value.experienceDocType}
            onChange={(e) => onChange({ ...value, experienceDocType: e.target.value })}
            required
          >
            <option value="">Select Document</option>
            <option value="Employment Letter">Employment Letter</option>
            <option value="Training Certificate">Training Certificate</option>
          </SelectInput>
        </div>
        <FileUpload
          label="Upload Selected Document"
          required
          accept="image/*"
          hint="Picture/image file formats only."
          file={value.experienceDoc}
          onChange={(f) => onChange({ ...value, experienceDoc: f })}
          onClear={() => onChange({ ...value, experienceDoc: null })}
        />
        <FileUpload
          label="Curriculum Vitae"
          required
          accept=".pdf,.doc,.docx,image/*"
          file={value.cv}
          onChange={(f) => onChange({ ...value, cv: f })}
          onClear={() => onChange({ ...value, cv: null })}
        />
      </div>
    </SectionCard>
  );
}
