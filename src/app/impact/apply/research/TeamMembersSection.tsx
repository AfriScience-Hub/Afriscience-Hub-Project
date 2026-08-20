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
import { TITLES, ID_CARD_TYPES, TEAM_ROLES } from '../data';
import { createTeamMember, type TeamMember } from './types';

export default function TeamMembersSection({
  value,
  onChange,
}: {
  value: TeamMember[];
  onChange: (v: TeamMember[]) => void;
}) {
  const update = (id: string, patch: Partial<TeamMember>) =>
    onChange(value.map((m) => (m.id === id ? { ...m, ...patch } : m)));

  return (
    <SectionCard
      title="Research Team Members"
      icon={<Users className="h-5 w-5 text-brand-red-600" />}
      defaultOpen={false}
    >
      <p className="text-sm text-neutral-gray-medium mb-4">
        Add co-researchers and supervisors. A Supervisor is added by default for Academic
        Researchers.
      </p>

      {value.map((member, index) => (
        <div
          key={member.id}
          className="mb-6 rounded-xl border border-neutral-gray-light p-4 sm:p-5 bg-neutral-bg-light/40"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-neutral-black">
              Team Member {index + 1}
              {member.isDefaultSupervisor ? ' (Supervisor)' : ''}
            </h4>
            {!member.isDefaultSupervisor && (
              <button
                type="button"
                onClick={() => onChange(value.filter((m) => m.id !== member.id))}
                className="inline-flex items-center gap-1 text-xs font-semibold text-brand-red-600"
              >
                <Trash2 className="h-3.5 w-3.5" /> Remove
              </button>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel required>Role</FieldLabel>
              <SelectInput
                value={member.role}
                onChange={(e) => update(member.id, { role: e.target.value })}
                disabled={member.isDefaultSupervisor}
                required
              >
                <option value="">Select Role</option>
                {TEAM_ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </SelectInput>
            </div>
            <div>
              <FieldLabel required>Title</FieldLabel>
              <SelectInput
                value={member.title}
                onChange={(e) => update(member.id, { title: e.target.value })}
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
              <FieldLabel required>Name</FieldLabel>
              <TextInput
                value={member.name}
                onChange={(e) => update(member.id, { name: e.target.value })}
                required
              />
            </div>
            <div>
              <FieldLabel required>Phone Number</FieldLabel>
              <TextInput
                value={member.phone}
                onChange={(e) => update(member.id, { phone: e.target.value })}
                required
              />
            </div>
            <div className="sm:col-span-2">
              <FieldLabel required>E-mail</FieldLabel>
              <TextInput
                type="email"
                value={member.email}
                onChange={(e) => update(member.id, { email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <FieldLabel required>Social Handles</FieldLabel>
            <SocialHandlesFields
              value={member.socials}
              onChange={(socials) => update(member.id, { socials })}
            />
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <FileUpload
              label="Display Image"
              accept="image/*"
              hint="Facial image only."
              file={member.displayImage}
              onChange={(f) => update(member.id, { displayImage: f })}
              onClear={() => update(member.id, { displayImage: null })}
            />
            <div>
              <FieldLabel>Government ID Card Type</FieldLabel>
              <SelectInput
                value={member.idCard.type}
                onChange={(e) =>
                  update(member.id, {
                    idCard: { ...member.idCard, type: e.target.value },
                  })
                }
              >
                <option value="">Select ID card type</option>
                {ID_CARD_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </SelectInput>
              {member.idCard.type === 'Other' && (
                <TextInput
                  className="mt-2"
                  placeholder="Specify ID type"
                  value={member.idCard.otherSpecify}
                  onChange={(e) =>
                    update(member.id, {
                      idCard: { ...member.idCard, otherSpecify: e.target.value },
                    })
                  }
                />
              )}
            </div>
            <FileUpload
              label="Upload ID Card"
              accept="image/*"
              file={member.idCard.file}
              onChange={(f) =>
                update(member.id, { idCard: { ...member.idCard, file: f } })
              }
              onClear={() =>
                update(member.id, { idCard: { ...member.idCard, file: null } })
              }
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => onChange([...value, createTeamMember()])}
        className="inline-flex items-center gap-2 rounded-lg border border-brand-navy-900 px-4 py-2.5 text-sm font-bold text-brand-navy-900 hover:bg-brand-navy-900 hover:text-white transition-colors"
      >
        <Plus className="h-4 w-4" /> ADD Research Team Member
      </button>
    </SectionCard>
  );
}
