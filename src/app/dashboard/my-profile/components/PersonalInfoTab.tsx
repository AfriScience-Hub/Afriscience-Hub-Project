'use client';

import { Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';

interface PersonalInfoTabProps {
  fullName: string; onFullNameChange: (v: string) => void;
  username: string; onUsernameChange: (v: string) => void;
  gender: string; onGenderChange: (v: string) => void;
  dateOfBirth: string; onDateOfBirthChange: (v: string) => void;
  govIdCode: string; onGovIdCodeChange: (v: string) => void;
  bio: string; onBioChange: (v: string) => void;
  email: string; onEmailChange: (v: string) => void;
  phone: string; onPhoneChange: (v: string) => void;
  altPhone: string; onAltPhoneChange: (v: string) => void;
  address: string; onAddressChange: (v: string) => void;
  city: string; onCityChange: (v: string) => void;
  stateProvince: string; onStateProvinceChange: (v: string) => void;
  stateOfResidence: string; onStateOfResidenceChange: (v: string) => void;
  localGovt: string; onLocalGovtChange: (v: string) => void;
  country: string; onCountryChange: (v: string) => void;
  zipCode: string; onZipCodeChange: (v: string) => void;
  website: string; onWebsiteChange: (v: string) => void;
  linkedinUrl: string; onLinkedinUrlChange: (v: string) => void;
  twitterUrl: string; onTwitterUrlChange: (v: string) => void;
  facebookUrl: string; onFacebookUrlChange: (v: string) => void;
  instagramUrl: string; onInstagramUrlChange: (v: string) => void;
}

export function PersonalInfoTab(props: PersonalInfoTabProps) {
  const fields = [
    props.fullName, props.username, props.bio, props.gender, props.dateOfBirth, props.govIdCode,
    props.email, props.phone, props.address, props.city, props.stateProvince, props.country,
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-neutral-black">Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Full Name <span className="text-red-600">*</span></label>
          <input type="text" value={props.fullName} onChange={e => props.onFullNameChange(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Username <span className="text-red-600">*</span></label>
          <input type="text" value={props.username} onChange={e => props.onUsernameChange(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Gender <span className="text-red-600">*</span></label>
          <select value={props.gender} onChange={e => props.onGenderChange(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" required>
            <option value="">Select Gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Date of Birth <span className="text-red-600">*</span></label>
          <input type="date" value={props.dateOfBirth} onChange={e => props.onDateOfBirthChange(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Government ID Code <span className="text-red-600">*</span></label>
          <input type="text" value={props.govIdCode} onChange={e => props.onGovIdCodeChange(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" required />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Bio / About Me <span className="text-red-600">*</span></label>
        <textarea value={props.bio} onChange={e => props.onBioChange(e.target.value)} rows={3} className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900 resize-none" required />
      </div>
      <h3 className="text-lg font-bold text-neutral-black pt-4">Contact Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Email <span className="text-red-600">*</span></label>
          <input type="email" value={props.email} onChange={e => props.onEmailChange(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Phone Number <span className="text-red-600">*</span></label>
          <input type="tel" value={props.phone} onChange={e => props.onPhoneChange(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Alternative Number</label>
          <input type="tel" value={props.altPhone} onChange={e => props.onAltPhoneChange(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Address</label>
          <input type="text" value={props.address} onChange={e => props.onAddressChange(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">City</label>
          <input type="text" value={props.city} onChange={e => props.onCityChange(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">State of Origin</label>
          <input type="text" value={props.stateProvince} onChange={e => props.onStateProvinceChange(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">State of Residence</label>
          <input type="text" value={props.stateOfResidence} onChange={e => props.onStateOfResidenceChange(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Local Government of Residence</label>
          <input type="text" value={props.localGovt} onChange={e => props.onLocalGovtChange(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Country</label>
          <input type="text" value={props.country} onChange={e => props.onCountryChange(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Zip / Postal Code</label>
          <input type="text" value={props.zipCode} onChange={e => props.onZipCodeChange(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Website</label>
          <input type="url" value={props.website} onChange={e => props.onWebsiteChange(e.target.value)} placeholder="https://example.com" className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" />
        </div>
      </div>
      <h3 className="text-lg font-bold text-neutral-black pt-4">Social Media Links</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2 md:flex items-center gap-2"><Linkedin className="h-4 w-4 text-blue-600" /> LinkedIn Profile</label>
          <input type="url" value={props.linkedinUrl} onChange={e => props.onLinkedinUrlChange(e.target.value)} placeholder="https://linkedin.com/in/username" className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2 flex items-center gap-2"><Twitter className="h-4 w-4 text-sky-500" /> Twitter Profile</label>
          <input type="url" value={props.twitterUrl} onChange={e => props.onTwitterUrlChange(e.target.value)} placeholder="https://twitter.com/username" className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2 flex items-center gap-2"><Facebook className="h-4 w-4 text-blue-700" /> Facebook Profile</label>
          <input type="url" value={props.facebookUrl} onChange={e => props.onFacebookUrlChange(e.target.value)} placeholder="https://facebook.com/username" className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2 flex items-center gap-2"><Instagram className="h-4 w-4 text-pink-600" /> Instagram Profile</label>
          <input type="url" value={props.instagramUrl} onChange={e => props.onInstagramUrlChange(e.target.value)} placeholder="https://instagram.com/username" className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" />
        </div>
      </div>
    </div>
  );
}
