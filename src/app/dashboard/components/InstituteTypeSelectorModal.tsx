'use client';

import { GraduationCap, Building2, X, type LucideIcon } from 'lucide-react';

/** The two kinds of institute a user can list. */
export type InstituteSubType = 'primary-secondary' | 'university';

export interface InstituteSubTypeInfo {
  id: InstituteSubType;
  label: string;
  description: string;
  icon: LucideIcon;
}

export const INSTITUTE_SUBTYPES: InstituteSubTypeInfo[] = [
  {
    id: 'primary-secondary',
    label: 'Primary & Secondary',
    description: 'Primary and/or secondary school listing',
    icon: GraduationCap,
  },
  {
    id: 'university',
    label: 'University',
    description: 'University or higher education institution',
    icon: Building2,
  },
];

export const INSTITUTE_SUBTYPE_LABEL: Record<InstituteSubType, string> = {
  'primary-secondary': 'Primary & Secondary',
  university: 'University',
};

/** Type guard for values coming from a URL query string. */
export function isInstituteSubType(value: unknown): value is InstituteSubType {
  return value === 'primary-secondary' || value === 'university';
}

interface InstituteTypeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectInstituteType: (type: InstituteSubType) => void;
  title?: string;
  subtitle?: string;
}

export default function InstituteTypeSelectorModal({
  isOpen,
  onClose,
  onSelectInstituteType,
  title = 'Select institute type',
  subtitle = 'Choose the type of institute you want to list',
}: InstituteTypeSelectorModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-neutral-gray-light"
        >
          <X className="h-4 w-4 text-neutral-gray-medium" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-neutral-black">{title}</h2>
          <p className="text-sm text-neutral-gray-medium mt-1">{subtitle}</p>
        </div>

        <div className="grid gap-4">
          {INSTITUTE_SUBTYPES.map((type) => (
            <button
              key={type.id}
              onClick={() => {
                onSelectInstituteType(type.id);
                onClose();
              }}
              className="group flex cursor-pointer items-center gap-4 rounded-xl border-2 border-neutral-gray-light p-4 transition-all hover:border-brand-red-600 hover:shadow-md focus:border-brand-red-600 focus:outline-none"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-red-50 group-hover:bg-brand-red-100 transition-colors">
                <type.icon className="h-6 w-6 text-brand-red-600" />
              </div>
              <div className="text-left">
                <p className="font-bold text-neutral-black">{type.label}</p>
                <p className="text-xs text-neutral-gray-medium mt-0.5">{type.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
