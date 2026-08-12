'use client';

import { Upload } from 'lucide-react';

interface PersonalInfoTabProps {
  firstName: string; onFirstNameChange: (v: string) => void;
  middleName: string; onMiddleNameChange: (v: string) => void;
  surname: string; onSurnameChange: (v: string) => void;
  username: string; onUsernameChange: (v: string) => void;
  gender: string; onGenderChange: (v: string) => void;
  dateOfBirth: string; onDateOfBirthChange: (v: string) => void;
  idCardType: string; onIdCardTypeChange: (v: string) => void;
  idCardNumber: string; onIdCardNumberChange: (v: string) => void;
  idCardFile: File | null;
  idCardFileName: string;
  handleIdCardUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  bio: string; onBioChange: (v: string) => void;
  email: string; onEmailChange: (v: string) => void;
  phone: string; onPhoneChange: (v: string) => void;
  altPhone: string; onAltPhoneChange: (v: string) => void;
  address: string; onAddressChange: (v: string) => void;
  city: string; onCityChange: (v: string) => void;
  stateOfResidence: string; onStateOfResidenceChange: (v: string) => void;
  localGovt: string; onLocalGovtChange: (v: string) => void;
  country: string; onCountryChange: (v: string) => void;
  zipCode: string; onZipCodeChange: (v: string) => void;
  website: string; onWebsiteChange: (v: string) => void;
}

export function PersonalInfoTab(props: PersonalInfoTabProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-neutral-black">Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">First Name <span className="text-red-600">*</span></label>
          <input type="text" value={props.firstName} onChange={e => props.onFirstNameChange(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Middle Name <span className="text-red-600">*</span></label>
          <input type="text" value={props.middleName} onChange={e => props.onMiddleNameChange(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Surname <span className="text-red-600">*</span></label>
          <input type="text" value={props.surname} onChange={e => props.onSurnameChange(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" required />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Date of Birth <span className="text-red-600">*</span></label>
          <input type="date" value={props.dateOfBirth} onChange={e => props.onDateOfBirthChange(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" required />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">ID Card Type <span className="text-red-600">*</span></label>
          <select value={props.idCardType} onChange={e => props.onIdCardTypeChange(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" required>
            <option value="">Select ID Card Type</option>
            <option value="National ID">National ID</option>
            <option value="Driver's License">Driver's License</option>
            <option value="International Passport">International Passport</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">ID Card Number <span className="text-red-600">*</span></label>
          <input type="text" value={props.idCardNumber} onChange={e => props.onIdCardNumberChange(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" required />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Upload ID Card <span className="text-red-600">*</span></label>
        <p className="text-xs text-neutral-gray-medium mb-2">
          To verify your user identity, kindly upload a copy of selected valid government issued ID card. Uploaded documents are securely stored and protected from unauthorized access
        </p>
        <div className="flex items-center gap-3">
          <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={props.handleIdCardUpload} className="hidden" id="id-card-upload" />
          <label htmlFor="id-card-upload" className="px-4 py-2 rounded-lg border border-neutral-gray-light bg-white hover:bg-neutral-bg-light cursor-pointer inline-flex items-center gap-2 transition-colors">
            <Upload className="h-4 w-4" />
            Choose File
          </label>
          <span className="text-sm text-neutral-gray-medium">{props.idCardFileName || 'No file chosen'}</span>
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
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Alternative Number <span className="text-neutral-gray-medium">(Optional)</span></label>
          <input type="tel" value={props.altPhone} onChange={e => props.onAltPhoneChange(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Address <span className="text-red-600">*</span></label>
          <input type="text" value={props.address} onChange={e => props.onAddressChange(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">City <span className="text-red-600">*</span></label>
          <input type="text" value={props.city} onChange={e => props.onCityChange(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">State of Residence <span className="text-red-600">*</span></label>
          <input type="text" value={props.stateOfResidence} onChange={e => props.onStateOfResidenceChange(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" required />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Local Government of Residence <span className="text-red-600">*</span></label>
          <input type="text" value={props.localGovt} onChange={e => props.onLocalGovtChange(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Country <span className="text-red-600">*</span></label>
          <input type="text" value={props.country} onChange={e => props.onCountryChange(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Zip / Postal Code <span className="text-neutral-gray-medium">(Optional)</span></label>
          <input type="text" value={props.zipCode} onChange={e => props.onZipCodeChange(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Website <span className="text-neutral-gray-medium">(Optional)</span></label>
        <input type="url" value={props.website} onChange={e => props.onWebsiteChange(e.target.value)} placeholder="https://example.com" className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" />
      </div>
    </div>
  );
}
