'use client';

import { AlertCircle, Building2, Send, Target } from 'lucide-react';
import { Button } from '../../ui/Button';

export const CONTACT_PURPOSES = [
  'Investment | Partnership',
  'Purchase | Trade',
  'Marketing',
  'Training | Mentorship',
  'Sensitization',
  'General Inquiry',
  'Other',
] as const;

interface ContactInnovatorFormProps {
  purpose: string;
  organization: string;
  otherPurpose: string;
  message: string;
  submitting: boolean;
  onPurposeChange: (value: string) => void;
  onOrganizationChange: (value: string) => void;
  onOtherPurposeChange: (value: string) => void;
  onMessageChange: (value: string) => void;
  onSubmit: (event: React.FormEvent) => void;
}

export default function ContactInnovatorForm({
  purpose,
  organization,
  otherPurpose,
  message,
  submitting,
  onPurposeChange,
  onOrganizationChange,
  onOtherPurposeChange,
  onMessageChange,
  onSubmit,
}: ContactInnovatorFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-5 p-6">
      <div className="flex gap-3 rounded-xl border border-brand-red-100 bg-brand-red-50/70 p-4">
        <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-red-600" />
        <div>
          <p className="text-sm font-semibold text-neutral-black">Platform-facilitated communication</p>
          <p className="mt-1 text-xs leading-relaxed text-neutral-gray-dark">
            All conversations stay on AfriScience Hub to keep engagements safe and accountable.
          </p>
        </div>
      </div>

      <div>
        <label htmlFor="contact-purpose" className="mb-2 block text-sm font-bold text-neutral-black">
          Purpose of Contact <span className="text-brand-red-600">*</span>
        </label>
        <div className="relative">
          <Target className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-red-500" />
          <select
            id="contact-purpose"
            value={purpose}
            onChange={(event) => onPurposeChange(event.target.value)}
            className="w-full appearance-none rounded-xl border border-brand-red-200 bg-white py-3 pl-10 pr-4 text-sm text-neutral-black outline-none transition focus:border-brand-red-500 focus:ring-2 focus:ring-brand-red-100"
            required
          >
            <option value="">Select purpose of contact</option>
            {CONTACT_PURPOSES.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {purpose === 'Other' && (
        <div>
          <label htmlFor="contact-other-purpose" className="mb-2 block text-sm font-bold text-neutral-black">
            Please Specify <span className="text-brand-red-600">*</span>
          </label>
          <input
            id="contact-other-purpose"
            type="text"
            value={otherPurpose}
            onChange={(event) => onOtherPurposeChange(event.target.value)}
            placeholder="Tell us the purpose of your message"
            className="w-full rounded-xl border border-brand-red-200 bg-white px-4 py-3 text-sm text-neutral-black outline-none transition placeholder:text-neutral-gray-medium focus:border-brand-red-500 focus:ring-2 focus:ring-brand-red-100"
            required
          />
        </div>
      )}

      <div>
        <label htmlFor="contact-organization" className="mb-2 block text-sm font-bold text-neutral-black">
          Organization / Company{' '}
          <span className="text-xs font-normal text-neutral-gray-medium">(Optional)</span>
        </label>
        <div className="relative">
          <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-gray-medium" />
          <input
            id="contact-organization"
            type="text"
            value={organization}
            onChange={(event) => onOrganizationChange(event.target.value)}
            placeholder="Your organization name"
            className="w-full rounded-xl border border-neutral-gray-light bg-white py-3 pl-10 pr-4 text-sm text-neutral-black outline-none transition placeholder:text-neutral-gray-medium focus:border-brand-red-500 focus:ring-2 focus:ring-brand-red-100"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-2 block text-sm font-bold text-neutral-black">
          Message / Inquiry <span className="text-brand-red-600">*</span>
        </label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(event) => onMessageChange(event.target.value.slice(0, 1000))}
          placeholder="Tell the innovator about your interest, questions, or proposal..."
          rows={4}
          className="w-full resize-none rounded-xl border border-brand-red-200 bg-white px-4 py-3 text-sm text-neutral-black outline-none transition placeholder:text-neutral-gray-medium focus:border-brand-red-500 focus:ring-2 focus:ring-brand-red-100"
          required
        />
        <p className="mt-1.5 text-xs text-neutral-gray-medium">{message.length} / 1000 characters</p>
      </div>

      <div className="pt-1">
        <Button type="submit" loading={submitting} className="w-full py-3 text-base font-bold">
          {!submitting && <Send className="mr-2 h-4 w-4" />}
          Send Message
        </Button>
      </div>
    </form>
  );
}
