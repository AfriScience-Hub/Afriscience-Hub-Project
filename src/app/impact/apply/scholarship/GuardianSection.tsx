'use client';

import { Plus, Trash2, Users } from 'lucide-react';
import {
  FieldLabel,
  SectionCard,
  TextInput,
  SelectInput,
  FileUpload,
  SocialHandlesFields,
} from '../components/FormField';
import { TITLES, ID_CARD_TYPES } from '../data';
import { emptySocials, emptyIdCard, type Guardian } from './types';

export function createGuardian(): Guardian {
  return {
    id: `guardian-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title: '',
    name: '',
    phone: '',
    email: '',
    socials: emptySocials(),
    displayImage: null,
    idCard: emptyIdCard(),
  };
}

export default function GuardianSection({
  value,
  onChange,
}: {
  value: Guardian[];
  onChange: (v: Guardian[]) => void;
}) {
  const update = (id: string, patch: Partial<Guardian>) =>
    onChange(value.map((g) => (g.id === id ? { ...g, ...patch } : g)));

  return (
    <SectionCard
      title="Guardian's Information"
      icon={<Users className="h-5 w-5 text-brand-red-600" />}
      badge="Required"
      defaultOpen={false}
    >
      <p className="text-sm text-neutral-gray-medium mb-4">
        Provide the details of at least one guardian. Maximum of 2 guardians.
      </p>

      {value.map((guardian, index) => (
        <div
          key={guardian.id}
          className="mb-6 rounded-xl border border-neutral-gray-light p-4 sm:p-5 bg-neutral-bg-light/40"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-neutral-black">Guardian {index + 1}</h4>
            {value.length > 1 && (
              <button
                type="button"
                onClick={() => onChange(value.filter((g) => g.id !== guardian.id))}
                className="inline-flex items-center gap-1 text-xs font-semibold text-brand-red-600"
              >
                <Trash2 className="h-3.5 w-3.5" /> Remove
              </button>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel required>
                Title
              </FieldLabel>
              <SelectInput
                value={guardian.title}
                onChange={(e) => update(guardian.id, { title: e.target.value })}
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
              <FieldLabel required>Name</FieldLabel>
              <TextInput
                value={guardian.name}
                onChange={(e) => update(guardian.id, { name: e.target.value })}
              />
            </div>
            <div>
              <FieldLabel required>Phone Number</FieldLabel>
              <TextInput
                value={guardian.phone}
                onChange={(e) => update(guardian.id, { phone: e.target.value })}
              />
            </div>
            <div>
              <FieldLabel required>E-mail</FieldLabel>
              <TextInput
                type="email"
                value={guardian.email}
                onChange={(e) => update(guardian.id, { email: e.target.value })}
              />
            </div>
          </div>

          <div className="mt-4">
            <FieldLabel>Social Handles</FieldLabel>
            <SocialHandlesFields
              value={guardian.socials}
              onChange={(socials) => update(guardian.id, { socials })}
            />
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <FileUpload
              label="Display Image"
              accept="image/*"
              hint="Upload guardian's facial image only."
              file={guardian.displayImage}
              onChange={(f) => update(guardian.id, { displayImage: f })}
              onClear={() => update(guardian.id, { displayImage: null })}
            />
            <div>
              <FieldLabel required>Government ID Card Type</FieldLabel>
              <SelectInput
                value={guardian.idCard.type}
                onChange={(e) =>
                  update(guardian.id, { idCard: { ...guardian.idCard, type: e.target.value } })
                }
              >
                <option value="">Select ID card type</option>
                {ID_CARD_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </SelectInput>
              {guardian.idCard.type === 'Other' && (
                <TextInput
                  className="mt-2"
                  placeholder="Specify ID type"
                  value={guardian.idCard.otherSpecify}
                  onChange={(e) =>
                    update(guardian.id, {
                      idCard: { ...guardian.idCard, otherSpecify: e.target.value },
                    })
                  }
                />
              )}
            </div>
            <FileUpload
              label="Upload ID Card"
              accept="image/*"
              hint="To verify guardian's identity. Documents are securely stored."
              file={guardian.idCard.file}
              onChange={(f) => update(guardian.id, { idCard: { ...guardian.idCard, file: f } })}
              onClear={() => update(guardian.id, { idCard: { ...guardian.idCard, file: null } })}
            />
          </div>
        </div>
      ))}

      {value.length < 2 && (
        <button
          type="button"
          onClick={() => onChange([...value, createGuardian()])}
          className="flex items-center gap-1 rounded-lg bg-brand-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-red-700 transition-colors"
        >
          <Plus className="h-4 w-4" /> Add Guardian
        </button>
      )}
    </SectionCard>
  );
}
