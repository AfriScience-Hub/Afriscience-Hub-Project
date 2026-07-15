'use client';

import { Input } from '../../../../components/ui/input';
import { COUNTRIES } from '../data';

interface LocationContactSectionProps {
  address: string;
  onAddressChange: (v: string) => void;
  country: string;
  onCountryChange: (v: string) => void;
  state: string;
  onStateChange: (v: string) => void;
  phone: string;
  onPhoneChange: (v: string) => void;
  email: string;
  onEmailChange: (v: string) => void;
  website: string;
  onWebsiteChange: (v: string) => void;
  linkedin: string;
  onLinkedinChange: (v: string) => void;
  twitter: string;
  onTwitterChange: (v: string) => void;
  instagram: string;
  onInstagramChange: (v: string) => void;
  facebook: string;
  onFacebookChange: (v: string) => void;
}

export function LocationContactSection({
  address, onAddressChange,
  country, onCountryChange,
  state, onStateChange,
  phone, onPhoneChange,
  email, onEmailChange,
  website, onWebsiteChange,
  linkedin, onLinkedinChange,
  twitter, onTwitterChange,
  instagram, onInstagramChange,
  facebook, onFacebookChange,
}: LocationContactSectionProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light p-8">
      <h2 className="text-xl font-bold text-neutral-black mb-6">Company Location &amp; Contact</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-neutral-gray-dark mb-1.5">Address *</label>
          <Input value={address} onChange={e => onAddressChange(e.target.value)} placeholder="Enter Company's Address" required />
          <p className="text-xs text-neutral-gray-medium mt-1">Do not include State/Region and Country</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-1.5">Country *</label>
          <select
            value={country}
            onChange={e => onCountryChange(e.target.value)}
            className="cursor-pointer w-full rounded-xl border border-neutral-gray-light px-4 py-3 text-sm focus:border-brand-red-600 focus:outline-none focus:ring-1 focus:ring-brand-red-600 bg-white"
            required
          >
            <option value="">Select Country</option>
            {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-1.5">State/Region *</label>
          <Input value={state} onChange={e => onStateChange(e.target.value)} placeholder="Enter State/Region" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-1.5">Phone Number *</label>
          <Input value={phone} onChange={e => onPhoneChange(e.target.value)} placeholder="Enter company's phone number" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-1.5">E-mail *</label>
          <Input value={email} onChange={e => onEmailChange(e.target.value)} type="email" placeholder="Enter company's e-mail address" required />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-neutral-gray-dark mb-1.5">Website</label>
          <Input value={website} onChange={e => onWebsiteChange(e.target.value)} placeholder="Enter company's website (if any)" />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-1.5">LinkedIn *</label>
          <Input value={linkedin} onChange={e => onLinkedinChange(e.target.value)} placeholder="linkedin.com/company/..." required />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-1.5">Twitter *</label>
          <Input value={twitter} onChange={e => onTwitterChange(e.target.value)} placeholder="@username" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-1.5">Instagram *</label>
          <Input value={instagram} onChange={e => onInstagramChange(e.target.value)} placeholder="@username" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-1.5">Facebook *</label>
          <Input value={facebook} onChange={e => onFacebookChange(e.target.value)} placeholder="facebook.com/..." required />
        </div>
        <p className="text-xs text-neutral-gray-medium sm:col-span-2">Provide at least one social media handle.</p>
      </div>
    </div>
  );
}
