'use client';

import { useState, useEffect } from 'react';
import { Upload, X, ChevronDown } from 'lucide-react';
import { Field, SectionCard } from './FieldDisplay';
import { FilePreview } from './DocumentPreview';
import { WORLD_COUNTRIES } from '@/app/data/mockData';

/** Phone numbers only accept digits and the usual separators - no letters. */
const phoneOnly = (value: string) => value.replace(/[^\d+\-()\s]/g, '');

interface PersonalInfoTabProps {
  isEditing: boolean;
  fullName: string; onFullNameChange: (v: string) => void;
  username: string; onUsernameChange: (v: string) => void;
  gender: string; onGenderChange: (v: string) => void;
  dateOfBirth: string; onDateOfBirthChange: (v: string) => void;
  idCardType: string; onIdCardTypeChange: (v: string) => void;
  idCardNumber: string; onIdCardNumberChange: (v: string) => void;
  /** Employment status is part of the personal record the /personal endpoint takes. */
  employmentStatus: string; onEmploymentStatusChange: (v: string) => void;
  idCardFile: File | null;
  idCardFileName: string;
  idCardKey: string;
  idCardUrl: string;
  handleIdCardUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onIdCardClear?: () => void;
  bio: string; onBioChange: (v: string) => void;
  email: string;
  phone: string; onPhoneChange: (v: string) => void;
  altPhone: string; onAltPhoneChange: (v: string) => void;
  address: string; onAddressChange: (v: string) => void;
  city: string; onCityChange: (v: string) => void;
  stateOfResidence: string; onStateOfResidenceChange: (v: string) => void;
  localGovt: string; onLocalGovtChange: (v: string) => void;
  country: string; onCountryChange: (v: string) => void;
  zipCode: string; onZipCodeChange: (v: string) => void;
  website: string; onWebsiteChange: (v: string) => void;
  // CV
  cvFile: File | null;
  cvFileName: string;
  cvKey: string;
  cvUrl: string;
  handleCvUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearCv?: () => void;
}

/** Searchable country dropdown listing every country in the world. */
function CountryDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [filtered, setFiltered] = useState(WORLD_COUNTRIES);

  useEffect(() => {
    setFiltered(WORLD_COUNTRIES.filter(c => c.toLowerCase().includes(search.toLowerCase())));
  }, [search]);

  return (
    <div className="relative mt-4" onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => setOpen(!open)}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Type to search country…"
          className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-sm focus:outline-none focus:border-brand-navy-900"
        />
        <ChevronDown className={`h-4 w-4 text-neutral-gray-medium transition-transform ${open ? 'rotate-180' : ''}`} />
      </div>
      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-neutral-gray-light rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="px-3 py-2 text-sm text-neutral-gray-medium">No countries found</div>
          ) : (
            filtered.map(c => (
              <div
                key={c}
                onClick={() => { setOpen(false); setSearch(c); onChange(c); }}
                className={`px-3 py-2 text-sm cursor-pointer hover:bg-neutral-bg-light ${value === c ? 'bg-brand-navy-900 text-white' : ''}`}
              >
                {c}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function PersonalDisplay(props: PersonalInfoTabProps) {
  return (
    <div className="space-y-6">
      <SectionCard title="Personal Information">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Field label="Full Name" value={props.fullName} />
          <Field label="Username" value={props.username} />
          <Field label="Gender" value={props.gender} />
          <Field label="Date of Birth" value={props.dateOfBirth ? new Date(props.dateOfBirth).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : null} />
          <Field label="ID Card Type" value={props.idCardType} />
          <Field label="ID Card Number" value={props.idCardNumber} />
          <Field label="Employment Status" value={props.employmentStatus} />
          <FilePreview label="ID Card File" title="ID Card" src={props.idCardUrl || props.idCardKey || props.idCardFileName} localFile={props.idCardFile} />
          <FilePreview label="CV File" title="CV" src={props.cvUrl || props.cvKey || props.cvFileName} localFile={props.cvFile} />
        </div>
        <div className="mt-3">
          <Field label="Bio / About Me" value={props.bio} />
        </div>
      </SectionCard>

      <SectionCard title="Contact Information">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-neutral-gray-medium mb-1">Email</label>
            <p className="text-sm font-medium text-neutral-black">{props.email || '—'}</p>
          </div>
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

  const FileUploadField = ({ label, required, accept, fileName, src, title, localFile, onUpload, onClear, children }: {
    label: string;
    required?: boolean;
    accept: string;
    fileName: string;
    src?: string;
    title: string;
    localFile?: File | null;
    onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClear?: () => void;
    children?: React.ReactNode;
  }) => (
    <div className="mt-4">
      <label className="block text-sm font-medium text-neutral-gray-dark mb-2">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      {children}
      <div className="flex flex-wrap items-center gap-3">
        <input type="file" accept={accept} onChange={onUpload} className="hidden" id={`file-upload-${label.toLowerCase().replace(/\s+/g, '-')}`} />
        <label htmlFor={`file-upload-${label.toLowerCase().replace(/\s+/g, '-')}`} className="px-4 py-2 rounded-lg border border-neutral-gray-light bg-white hover:bg-neutral-bg-light cursor-pointer inline-flex items-center gap-2 transition-colors">
          <Upload className="h-4 w-4" /> Choose File
        </label>
        {fileName && (
          <button type="button" onClick={() => onClear?.()} className="text-red-500 hover:text-red-700 cursor-pointer" title="Remove file">
            <X className="h-4 w-4" />
          </button>
        )}
        {fileName || src ? <FilePreview title={title} src={src || fileName} localFile={localFile} /> : <span className="text-sm text-neutral-gray-medium">No file chosen</span>}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-neutral-black">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Full Name <span className="text-red-600">*</span></label>
            <input type="text" value={props.fullName} className={`${inputClass} bg-neutral-bg-light cursor-not-allowed`} readOnly />
            <p className="text-xs text-neutral-gray-medium mt-1">Full name cannot be changed</p>
          </div>
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
              <option value="Voter's Card">Voter&apos;s Card</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-gray-dark mb-2">ID Card Number <span className="text-red-600">*</span></label>
            <input type="text" value={props.idCardNumber} onChange={e => props.onIdCardNumberChange(e.target.value)} className={inputClass} required />
          </div>
        </div>
        <FileUploadField
          label="Upload ID Card"
          required
          accept=".pdf,.jpg,.jpeg,.png"
          fileName={props.idCardFileName}
          src={props.idCardUrl || props.idCardKey}
          title="ID Card"
          localFile={props.idCardFile}
          onUpload={props.handleIdCardUpload}
          onClear={props.onIdCardClear}
        />
        <p className="text-xs text-neutral-gray-medium">To verify your identity, upload a copy of a valid government-issued ID card.</p>
        <FileUploadField
          label="Upload CV"
          required
          accept=".pdf,.doc,.docx,.rtf,.odt,.txt"
          fileName={props.cvFileName}
          src={props.cvUrl || props.cvKey}
          title="CV"
          localFile={props.cvFile}
          onUpload={props.handleCvUpload}
          onClear={props.clearCv}
        />
        <div className="mt-4">
          <label className="block text-sm font-medium text-neutral-gray-dark mb-3">Employment Status <span className="text-red-600">*</span></label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {['Employed (full time)', 'Self Employed (business owner)', 'Student', 'Unemployed'].map(status => (
              <button
                key={status}
                type="button"
                onClick={() => props.onEmploymentStatusChange(status)}
                className={`py-3 px-4 rounded-lg border cursor-pointer transition-colors text-sm ${props.employmentStatus === status ? 'border-brand-navy-900 bg-brand-navy-900 text-white' : 'border-neutral-gray-light bg-white text-neutral-gray-dark hover:border-brand-navy-900'}`}
              >
                {status}
              </button>
            ))}
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
            <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Phone Number <span className="text-red-600">*</span></label>
            <input type="tel" inputMode="tel" value={props.phone} onChange={e => props.onPhoneChange(phoneOnly(e.target.value))} className={inputClass} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Alternative Number <span className="text-neutral-gray-medium">(Optional)</span></label>
            <input type="tel" inputMode="tel" value={props.altPhone} onChange={e => props.onAltPhoneChange(phoneOnly(e.target.value))} className={inputClass} />
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
            <CountryDropdown value={props.country} onChange={e => props.onCountryChange(e)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Zip / Postal Code <span className="text-neutral-gray-medium">(Optional)</span></label>
            <input type="text" value={props.zipCode} onChange={e => props.onZipCodeChange(e.target.value)} className={inputClass} />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Website <span className="text-neutral-gray-medium">(Optional)</span></label>
          <input type="text" value={props.website} onChange={e => props.onWebsiteChange(e.target.value)} placeholder="e.g. www.facebook.com/user or facebook.com/user" className={inputClass} />
        </div>
      </div>
    </div>
  );
}

export function PersonalInfoTab(props: PersonalInfoTabProps) {
  return props.isEditing ? <PersonalForm {...props} /> : <PersonalDisplay {...props} />;
}
