'use client';

import { Upload, X } from 'lucide-react';
import { Field, SectionCard } from './FieldDisplay';

interface PersonalInfoTabProps {
  isEditing: boolean;
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
  onIdCardClear?: () => void;
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

function PersonalDisplay(props: PersonalInfoTabProps) {
  return (
    <div className="space-y-6">
      <SectionCard title="Personal Information">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Field label="First Name" value={props.firstName} />
          <Field label="Middle Name" value={props.middleName} />
          <Field label="Surname" value={props.surname} />
          <Field label="Username" value={props.username} />
          <Field label="Gender" value={props.gender} />
          <Field label="Date of Birth" value={props.dateOfBirth ? new Date(props.dateOfBirth).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : null} />
          <Field label="ID Card Type" value={props.idCardType} />
          <Field label="ID Card Number" value={props.idCardNumber} />
          <Field label="ID Card File" value={props.idCardFileName || 'Not uploaded'} />
        </div>
        <div className="mt-3">
          <Field label="Bio / About Me" value={props.bio} />
        </div>
      </SectionCard>

      <SectionCard title="Contact Information">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Field label="Email" value={props.email} />
          <Field label="Phone Number" value={props.phone} />
          <Field label="Alternative Number" value={props.altPhone} />
          <Field label="Address" value={props.address} />
          <Field label="City" value={props.city} />
          <Field label="State of Residence" value={props.stateOfResidence} />
          <Field label="Local Government" value={props.localGovt} />
          <Field label="Country" value={props.country} />
          <Field label="Zip / Postal Code" value={props.zipCode} />
          <div>
            <label className="block text-xs text-neutral-gray-medium mb-1">Website</label>
            {props.website ? (
              <a href={props.website.startsWith('http') ? props.website : `https://${props.website}`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-600 hover:underline break-all">{props.website}</a>
            ) : (
              <p className="text-sm font-medium text-neutral-black">{'\u2014'}</p>
            )}
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

function PersonalForm(props: PersonalInfoTabProps) {
  const inputClass = "w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-white focus:outline-none focus:border-brand-navy-900";
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-neutral-black">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-neutral-gray-dark mb-2">First Name <span className="text-red-600">*</span></label>
            <input type="text" value={props.firstName} onChange={e => props.onFirstNameChange(e.target.value)} className={inputClass} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Middle Name</label>
            <input type="text" value={props.middleName} onChange={e => props.onMiddleNameChange(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Surname <span className="text-red-600">*</span></label>
            <input type="text" value={props.surname} onChange={e => props.onSurnameChange(e.target.value)} className={inputClass} required />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Username <span className="text-red-600">*</span></label>
            <input type="text" value={props.username} onChange={e => props.onUsernameChange(e.target.value)} className={inputClass} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Gender <span className="text-red-600">*</span></label>
            <select value={props.gender} onChange={e => props.onGenderChange(e.target.value)} className={inputClass} required>
              <option value="">Select Gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Date of Birth <span className="text-red-600">*</span></label>
            <input type="date" value={props.dateOfBirth} onChange={e => props.onDateOfBirthChange(e.target.value)} className={inputClass} required />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-neutral-gray-dark mb-2">ID Card Type <span className="text-red-600">*</span></label>
            <select value={props.idCardType} onChange={e => props.onIdCardTypeChange(e.target.value)} className={inputClass} required>
              <option value="">Select ID Card Type</option>
              <option value="National ID">National ID</option>
              <option value="Driver's License">Driver&apos;s License</option>
              <option value="International Passport">International Passport</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-gray-dark mb-2">ID Card Number <span className="text-red-600">*</span></label>
            <input type="text" value={props.idCardNumber} onChange={e => props.onIdCardNumberChange(e.target.value)} className={inputClass} required />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Upload ID Card <span className="text-red-600">*</span></label>
          <p className="text-xs text-neutral-gray-medium mb-2">To verify your identity, upload a copy of a valid government-issued ID card.</p>
          <div className="flex items-center gap-3">
            <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={props.handleIdCardUpload} className="hidden" id="id-card-upload" />
            <label htmlFor="id-card-upload" className="px-4 py-2 rounded-lg border border-neutral-gray-light bg-white hover:bg-neutral-bg-light cursor-pointer inline-flex items-center gap-2 transition-colors">
              <Upload className="h-4 w-4" /> Choose File
            </label>
            {props.idCardFileName && (
              <button type="button" onClick={() => props.onIdCardClear?.()} className="text-red-500 hover:text-red-700 cursor-pointer" title="Remove file">
                <X className="h-4 w-4" />
              </button>
            )}
            <span className="text-sm text-neutral-gray-medium">{props.idCardFileName || 'No file chosen'}</span>
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Bio / About Me <span className="text-red-600">*</span></label>
          <textarea value={props.bio} onChange={e => props.onBioChange(e.target.value)} rows={3} className={`w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-white focus:outline-none focus:border-brand-navy-900 resize-none`} required />
        </div>
      </div>

      <div className="pt-4 border-t border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Email <span className="text-red-600">*</span></label>
            <input type="email" value={props.email} onChange={e => props.onEmailChange(e.target.value)} className={inputClass} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Phone Number <span className="text-red-600">*</span></label>
            <input type="tel" value={props.phone} onChange={e => props.onPhoneChange(e.target.value)} className={inputClass} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Alternative Number <span className="text-neutral-gray-medium">(Optional)</span></label>
            <input type="tel" value={props.altPhone} onChange={e => props.onAltPhoneChange(e.target.value)} className={inputClass} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Address <span className="text-red-600">*</span></label>
            <input type="text" value={props.address} onChange={e => props.onAddressChange(e.target.value)} className={inputClass} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-gray-dark mb-2">City <span className="text-red-600">*</span></label>
            <input type="text" value={props.city} onChange={e => props.onCityChange(e.target.value)} className={inputClass} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-gray-dark mb-2">State of Residence <span className="text-red-600">*</span></label>
            <input type="text" value={props.stateOfResidence} onChange={e => props.onStateOfResidenceChange(e.target.value)} className={inputClass} required />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Local Government of Residence <span className="text-red-600">*</span></label>
            <input type="text" value={props.localGovt} onChange={e => props.onLocalGovtChange(e.target.value)} className={inputClass} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Country <span className="text-red-600">*</span></label>
            <input type="text" value={props.country} onChange={e => props.onCountryChange(e.target.value)} className={inputClass} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Zip / Postal Code <span className="text-neutral-gray-medium">(Optional)</span></label>
            <input type="text" value={props.zipCode} onChange={e => props.onZipCodeChange(e.target.value)} className={inputClass} />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Website <span className="text-neutral-gray-medium">(Optional)</span></label>
          <input type="url" value={props.website} onChange={e => props.onWebsiteChange(e.target.value)} placeholder="https://example.com" className={inputClass} />
        </div>
      </div>
    </div>
  );
}

export function PersonalInfoTab(props: PersonalInfoTabProps) {
  return props.isEditing ? <PersonalForm {...props} /> : <PersonalDisplay {...props} />;
}
