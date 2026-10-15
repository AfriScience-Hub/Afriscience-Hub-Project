'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import CollapsibleSection from './CollapsibleSection';
import ProfileImageField from './ProfileImageField';
import { COUNTRY_OPTIONS, RECIPIENT_TYPES, isValidEmail, type AwardFormState } from '../data';

interface RecipientSectionProps {
  value: AwardFormState;
  onChange: (patch: Partial<AwardFormState>) => void;
}

const selectCls = 'w-full px-3 py-2 text-xs text-neutral-black rounded-lg border border-neutral-gray-light bg-white outline-none focus:border-[#453DD8] cursor-pointer appearance-none';
const inputCls = 'w-full px-3 py-2 text-xs text-neutral-black rounded-lg border border-neutral-gray-light bg-white outline-none focus:border-[#453DD8]';

/**
 * Section 2 — Recipient Information: recipient type cards, optional user
 * search, name, email, country (no flag) and the profile image upload.
 */
export default function RecipientSection({ value, onChange }: RecipientSectionProps) {
  const emailInvalid = value.email !== '' && !isValidEmail(value.email);

  return (
    <CollapsibleSection
      number={2}
      title="Recipient Information"
      subtitle="Provide details about the person, team or organization receiving the award."
    >
      <div className="space-y-4">
        <div>
          <p className="text-xs font-medium text-neutral-black mb-1.5">
            Recipient Type <span className="text-brand-red-600">*</span>
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            {RECIPIENT_TYPES.map((option) => {
              const selected = value.recipientType === option.value;
              const Icon = option.icon;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onChange({ recipientType: option.value })}
                  aria-pressed={selected}
                  className={cn(
                    'text-left rounded-xl border p-3 flex items-start gap-2.5 cursor-pointer transition-colors',
                    selected ? 'border-[#453DD8] bg-[#453DD8]/5' : 'border-neutral-gray-light hover:bg-neutral-bg-light'
                  )}
                >
                  {selected ? (
                    <span className="w-5 h-5 rounded-full bg-[#453DD8]/10 grid place-items-center flex-shrink-0 mt-0.5">
                      <Icon className="h-3.5 w-3.5 text-[#453DD8]" />
                    </span>
                  ) : (
                    <span className="w-5 h-5 rounded-full border-2 border-neutral-gray-light flex-shrink-0 mt-0.5" aria-hidden="true" />
                  )}
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold text-neutral-black">{option.value}</span>
                    <span className="block text-[11px] text-neutral-gray-medium mt-0.5">{option.hint}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label htmlFor="recipient-search" className="text-xs font-medium text-neutral-gray-dark block mb-1.5">
            Search Existing User (Optional)
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium pointer-events-none" />
            <input
              id="recipient-search"
              type="text"
              value={value.searchUser}
              onChange={(e) => onChange({ searchUser: e.target.value })}
              placeholder="Search by name, email or username..."
              className={cn(inputCls, 'pl-9')}
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="recipient-name" className="text-xs font-medium text-neutral-black block mb-1.5">
              Full Name <span className="text-brand-red-600">*</span>
            </label>
            <input
              id="recipient-name"
              type="text"
              value={value.fullName}
              onChange={(e) => onChange({ fullName: e.target.value })}
              placeholder="e.g. Amaka Chinedu"
              className={inputCls}
            />
          </div>
          <div>
            <label htmlFor="recipient-email" className="text-xs font-medium text-neutral-black block mb-1.5">
              Email Address <span className="text-brand-red-600">*</span>
            </label>
            <input
              id="recipient-email"
              type="email"
              value={value.email}
              onChange={(e) => onChange({ email: e.target.value })}
              placeholder="e.g. amaka@gmail.com"
              className={cn(inputCls, emailInvalid && 'border-brand-red-600')}
            />
            {emailInvalid && <p className="text-[11px] text-brand-red-600 mt-1">Enter a valid email address.</p>}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="recipient-country" className="text-xs font-medium text-neutral-black block mb-1.5">
              Country <span className="text-brand-red-600">*</span>
            </label>
            <select id="recipient-country" value={value.country} onChange={(e) => onChange({ country: e.target.value })} className={selectCls}>
              <option value="">Select country</option>
              {COUNTRY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <ProfileImageField
            file={value.profileFile}
            initialUrl={value.profileUrl}
            onSelect={(f) => onChange({ profileFile: f })}
          />
        </div>
      </div>
    </CollapsibleSection>
  );
}
