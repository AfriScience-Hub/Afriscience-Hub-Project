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
import { createCoOwner, type CoOwner } from './types';

export default function CoOwnersSection({
  value,
  onChange,
}: {
  value: CoOwner[];
  onChange: (v: CoOwner[]) => void;
}) {
  const update = (id: string, patch: Partial<CoOwner>) =>
    onChange(value.map((c) => (c.id === id ? { ...c, ...patch } : c)));

  return (
    <SectionCard
      title="Co-Owners | Secondary Proprietors"
      icon={<Users className="h-5 w-5 text-brand-red-600" />}
      defaultOpen={false}
    >
      <p className="text-sm text-neutral-gray-medium mb-4">
        Optional. Add co-owners if the startup has more than one proprietor.
      </p>

      {value.map((owner, index) => (
        <div
          key={owner.id}
          className="mb-6 rounded-xl border border-neutral-gray-light p-4 sm:p-5 bg-neutral-bg-light/40"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-neutral-black">Secondary Proprietor {index + 1}</h4>
            <button
              type="button"
              onClick={() => onChange(value.filter((c) => c.id !== owner.id))}
              className="inline-flex items-center gap-1 text-xs font-semibold text-brand-red-600"
            >
              <Trash2 className="h-3.5 w-3.5" /> Remove
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel required>Title</FieldLabel>
              <SelectInput
                value={owner.title}
                onChange={(e) => update(owner.id, { title: e.target.value })}
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
                value={owner.name}
                onChange={(e) => update(owner.id, { name: e.target.value })}
              />
            </div>
            <div>
              <FieldLabel required>Phone Number</FieldLabel>
              <TextInput
                value={owner.phone}
                onChange={(e) => update(owner.id, { phone: e.target.value })}
              />
            </div>
            <div>
              <FieldLabel required>E-mail</FieldLabel>
              <TextInput
                type="email"
                value={owner.email}
                onChange={(e) => update(owner.id, { email: e.target.value })}
              />
            </div>
          </div>

          <div className="mt-4">
            <FieldLabel required>Social Handles</FieldLabel>
            <SocialHandlesFields
              value={owner.socials}
              onChange={(socials) => update(owner.id, { socials })}
            />
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <FileUpload
              label="Display Image"
              accept="image/*"
              hint="Facial image only."
              file={owner.displayImage}
              onChange={(f) => update(owner.id, { displayImage: f })}
              onClear={() => update(owner.id, { displayImage: null })}
            />
            <FileUpload
              label="Curriculum Vitae"
              accept=".pdf,.doc,.docx,image/*"
              file={owner.cv}
              onChange={(f) => update(owner.id, { cv: f })}
              onClear={() => update(owner.id, { cv: null })}
            />
            <div>
              <FieldLabel>Government ID Card Type</FieldLabel>
              <SelectInput
                value={owner.idCard.type}
                onChange={(e) =>
                  update(owner.id, { idCard: { ...owner.idCard, type: e.target.value } })
                }
              >
                <option value="">Select ID card type</option>
                {ID_CARD_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </SelectInput>
              {owner.idCard.type === 'Other' && (
                <TextInput
                  className="mt-2"
                  placeholder="Specify ID type"
                  value={owner.idCard.otherSpecify}
                  onChange={(e) =>
                    update(owner.id, {
                      idCard: { ...owner.idCard, otherSpecify: e.target.value },
                    })
                  }
                />
              )}
            </div>
            <FileUpload
              label="Upload ID Card"
              accept="image/*"
              file={owner.idCard.file}
              onChange={(f) => update(owner.id, { idCard: { ...owner.idCard, file: f } })}
              onClear={() => update(owner.id, { idCard: { ...owner.idCard, file: null } })}
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => onChange([...value, createCoOwner()])}
        className="inline-flex items-center gap-2 rounded-lg border border-brand-navy-900 px-4 py-2.5 text-sm font-bold text-brand-navy-900 hover:bg-brand-navy-900 hover:text-white transition-colors"
      >
        <Plus className="h-4 w-4" /> ADD Co-Owner / Secondary Proprietor
      </button>
    </SectionCard>
  );
}
