'use client';

import { useState, type ReactNode } from 'react';
import {
  Award,
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  FileText,
  ImagePlus,
  Info,
  Lightbulb,
  Phone,
  Trophy,
  Upload,
  User,
  X,
} from 'lucide-react';
import { categories, nameLabel, titleMap, type ListingType } from './listingTypes';

function Field({
  label,
  placeholder,
  required,
  select,
  wide,
}: {
  label: string;
  placeholder?: string;
  required?: boolean;
  select?: boolean;
  wide?: boolean;
}) {
  return (
    <div className={wide ? 'lg:col-span-2' : undefined}>
      <label className="mb-2 block text-[11px] font-semibold text-gray-700 lg:text-xs">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {select ? (
        <select
          defaultValue=""
          className="h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-black outline-none"
        >
          <option value="">{placeholder ?? 'Select'}</option>
          <option>Nigeria</option>
          <option>Kenya</option>
          <option>Ghana</option>
          <option>South Africa</option>
        </select>
      ) : (
        <input
          placeholder={placeholder}
          className="h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-black outline-none placeholder:text-gray-400"
        />
      )}
    </div>
  );
}

function Textarea({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <label className="mb-2 block text-[11px] font-semibold text-gray-700 lg:text-xs">
        {label}
      </label>
      <textarea
        placeholder={placeholder}
        className="h-20 w-full resize-none rounded-md border border-gray-200 bg-white px-3 py-3 text-xs text-black outline-none placeholder:text-gray-400"
      />
      <p className="mt-2 text-[10px] text-gray-400">0/500 characters</p>
    </div>
  );
}

function Accordion({
  title,
  subtitle,
  icon: Icon,
  defaultOpen = true,
  children,
}: {
  title: string;
  subtitle?: string;
  icon: typeof Building2;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full cursor-pointer items-center justify-between border-b border-gray-200 px-4 py-3 text-left"
      >
        <span className="flex items-center gap-3">
          <Icon size={16} className="text-red-500" />
          <span className="text-xs font-bold text-gray-950 lg:text-sm">{title}</span>
          {subtitle && <span className="text-[10px] font-semibold text-red-500">{subtitle}</span>}
        </span>
        <ChevronDown
          size={15}
          className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && <div className="p-4">{children}</div>}
    </section>
  );
}

function BasicProfile({ type }: { type: ListingType }) {
  return (
    <Accordion title="Basic Profile Information" subtitle="Required" icon={User}>
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-[11px] font-semibold text-gray-700 lg:text-xs">
            Profile Image
          </label>
          <div className="flex items-center gap-4">
            <button className="grid h-16 w-16 cursor-pointer place-items-center rounded-md border border-dashed border-gray-300 text-gray-400">
              <ImagePlus size={18} />
            </button>
            <p className="max-w-xs text-[10px] text-gray-400">
              Upload a clear image (JPG, PNG). Recommended: 400x400px or larger
            </p>
          </div>
        </div>
        <Field label={nameLabel[type]} placeholder={`Enter ${nameLabel[type].toLowerCase()}`} required />
        {type === 'institute' && (
          <Field label="Motto" placeholder="e.g. Knowledge for a Sustainable Future" />
        )}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Field label="Country" placeholder="Select Country" required select />
          <Field label="State / Region" placeholder="e.g. Lagos, Nairobi" />
        </div>
        <Textarea label="Short Bio / Description" placeholder="Tell us about yourself or your organization..." />
      </div>
    </Accordion>
  );
}

function TypeDetails({ type }: { type: ListingType }) {
  if (type === 'institute') {
    return (
      <Accordion title="Institute Classification" icon={Building2}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Field label="Class / Type" placeholder="Select" required select />
          <Field label="Ownership" placeholder="Select" select />
          <Field label="Gender" placeholder="Select" select />
        </div>
      </Accordion>
    );
  }

  if (type === 'scientist') {
    return (
      <Accordion title="Professional Details" icon={BriefcaseBusiness}>
        <div className="space-y-4">
          <div>
            <p className="mb-2 text-[11px] font-semibold text-gray-700 lg:text-xs">
              Fields of Expertise
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                'Biotechnology',
                'Data Science',
                'Environmental Science',
                'Engineering',
                'Medicine',
                'Agriculture',
                'Physics',
                'Chemistry',
                'Computer Science',
                'Mathematics',
              ].map((field) => (
                <span key={field} className="rounded-full border border-gray-200 px-3 py-1 text-[10px] text-gray-600">
                  {field}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Field label="Profession" placeholder="Select" select />
            <Field label="Degrees / Qualifications" placeholder="e.g. Ph.D. Computer Science, M.Sc. AI" />
          </div>
        </div>
      </Accordion>
    );
  }

  if (type === 'innovation') {
    return (
      <Accordion title="Innovation Details" icon={Lightbulb}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Field label="Innovation Category" placeholder="Select" select />
          <Field label="Development Stage" placeholder="Select" select />
        </div>
      </Accordion>
    );
  }

  if (type === 'competition') {
    return (
      <Accordion title="Competition Details" icon={Trophy}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Field label="Competition Type" placeholder="Select" select />
          <Field label="Registration Fee" placeholder="e.g. $5" />
          <Field label="Deadline" placeholder="mm/dd/yyyy" />
        </div>
      </Accordion>
    );
  }

  if (type === 'award') {
    return (
      <Accordion title="Award Details" icon={Award}>
        <Field label="Award Type" placeholder="Select" select />
      </Accordion>
    );
  }

  return null;
}

function ContactInfo() {
  return (
    <Accordion title="Contact Information" icon={Phone}>
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Field label="Phone Number" placeholder="+234 800 000 0000" />
          <Field label="Email Address" placeholder="info@example.com" />
        </div>
        <Field label="Website" placeholder="https://www.example.com" />
        <div>
          <p className="mb-2 text-[11px] font-semibold text-gray-700 lg:text-xs">Social Media Links</p>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Field label="Twitter" placeholder="@yourtwitterhandle" />
            <Field label="LinkedIn" placeholder="@yourlinkedinhandle" />
            <Field label="Facebook" placeholder="@yourfacebookhandle" />
            <Field label="Instagram" placeholder="@yourinstagramhandle" />
          </div>
        </div>
      </div>
    </Accordion>
  );
}

function Services() {
  return (
    <Accordion title="Services & Offerings" subtitle="Add your services" icon={Info}>
      <div className="rounded-md border border-dashed border-gray-300 p-4">
        <p className="mb-3 text-[10px] font-bold uppercase text-gray-400">Add a service</p>
        <div className="space-y-3">
          <Field label="" placeholder="Service Name *" />
          <Field label="" placeholder="Brief description of this service..." />
          <div className="grid grid-cols-[1fr_auto] gap-3">
            <Field label="" placeholder="Cost Range (optional)" select />
            <button className="self-end cursor-pointer rounded-md bg-red-500 px-4 py-2 text-xs font-semibold text-white hover:bg-red-600">
              + Add
            </button>
          </div>
        </div>
      </div>
    </Accordion>
  );
}

function MediaGallery({ defaultOpen = true }: { defaultOpen?: boolean }) {
  return (
    <Accordion title="Media Gallery" icon={ImagePlus} defaultOpen={defaultOpen}>
      <p className="mb-4 text-[10px] text-gray-400">Upload images and videos organized by category.</p>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {['Workspaces', 'Projects', 'Facilities', 'Events', 'Other Media'].map((item) => (
          <div key={item} className="rounded-md border border-gray-200 p-5 text-center">
            <p className="text-xs font-bold text-gray-950">{item}</p>
            <p className="mt-1 text-[10px] text-gray-400">0 files uploaded</p>
            <button className="mt-3 cursor-pointer rounded-md border border-dashed border-red-500 px-4 py-2 text-[10px] font-semibold text-red-500">
              <Upload size={12} className="mr-1 inline" />
              Upload Files
            </button>
          </div>
        ))}
      </div>
    </Accordion>
  );
}

function Documents() {
  return (
    <Accordion title="Certifications & Documents" icon={FileText}>
      <p className="mb-3 text-[10px] text-gray-400">
        Upload licenses, certifications, accreditation documents, and awards (PDF or images).
      </p>
      <button className="w-full cursor-pointer rounded-md border border-dashed border-red-500 px-4 py-3 text-xs font-semibold text-red-500">
        <Upload size={14} className="mr-2 inline" />
        Upload Document (PDF, JPG, PNG)
      </button>
    </Accordion>
  );
}

function Policies() {
  return (
    <Accordion title="Policies / Rules / Terms of Engagement" icon={FileText}>
      <textarea
        placeholder="Define your terms of engagement, rules, service conditions, or any policies you'd like visitors to know about..."
        className="h-24 w-full resize-none rounded-md border border-gray-200 px-3 py-3 text-xs text-black outline-none placeholder:text-gray-400"
      />
    </Accordion>
  );
}

export function ListingFormScaffold({
  type,
  onChangeCategory,
}: {
  type: ListingType;
  onChangeCategory: () => void;
}) {
  const Icon = categories.find((category) => category.id === type)?.icon ?? Building2;

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white px-4 py-4 shadow-sm lg:flex-row lg:gap-0">
        <div className="flex items-center gap-3">
          <Icon size={20} className="text-red-500" />
          <div>
            <h1 className="text-base font-bold text-gray-950 lg:text-lg">{titleMap[type]}</h1>
            <p className="text-[10px] text-gray-400 lg:text-xs">
              Fill in the details below. Fields marked * are required.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onChangeCategory}
          className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
        >
          <X size={13} />
          Change Category
        </button>
      </div>

      <BasicProfile type={type} />
      <TypeDetails type={type} />
      <ContactInfo />
      <Services />
      <MediaGallery defaultOpen={type !== 'center'} />
      <Documents />
      <Policies />

      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <div className="mb-4 rounded-md border border-blue-200 bg-blue-50 px-4 py-3 text-[10px] text-blue-700 lg:text-xs">
          <Info size={14} className="mr-2 inline" />
          Your listing will be submitted for verification by the AfriScience Hub team. Once approved, it will be publicly visible with a Verified badge.
        </div>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <button className="w-max cursor-pointer rounded-md border border-gray-200 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50">
            Cancel
          </button>
          <div className="flex gap-3">
            <button className="cursor-pointer rounded-md border border-gray-200 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50">
              Save as Draft
            </button>
            <button className="cursor-pointer rounded-md bg-[#082947] px-4 py-2 text-xs font-semibold text-white hover:bg-slate-900">
              <Upload size={13} className="mr-2 inline" />
              Submit for Verification
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
