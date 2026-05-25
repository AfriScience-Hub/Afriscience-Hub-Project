'use client';

import { ImagePlus, Phone, Ruler, User } from 'lucide-react';
import {
  innovationFields,
  interests,
  interestTooltips,
  ownershipOptions,
  sdgOptions,
  stageOptions,
  stageTooltips,
} from './constants';
import {
  BulletListInput,
  DocumentUploadList,
  MediaGalleryUploads,
  SpecificationsFields,
} from './repeatableInputs';
import { MultiSelectDropdown, SingleSelectDropdown } from './selectFields';
import { Accordion, BioField, CountrySearch, Field } from './sharedFields';

export function InnovationIdentitySection() {
  return (
    <Accordion title="Innovation Identity" subtitle="Required" icon={User}>
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-[11px] font-semibold text-gray-700 lg:text-xs">
            Profile Image
          </label>
          <div className="flex items-center gap-4">
            <label className="grid h-16 w-16 cursor-pointer place-items-center rounded-md border border-dashed border-gray-300 text-gray-400">
              <ImagePlus size={18} />
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                className="sr-only"
              />
            </label>
            <p className="max-w-xs text-[10px] text-gray-400">
              Upload a clear image (JPG, PNG, WEBP, GIF). Recommended: 400x400px or larger
            </p>
          </div>
        </div>

        <Field label="Innovation Name" placeholder="Enter innovation name" required />
        <CountrySearch />
        <BioField />
      </div>
    </Accordion>
  );
}

export function InnovationDetailsSection() {
  return (
    <Accordion title="Innovation Details" subtitle="Required" icon={Ruler} defaultOpen={false}>
      <div className="space-y-4">
        <MultiSelectDropdown
          label="Innovation Field"
          placeholder="Select the best fields your innovation fits into"
          options={innovationFields}
          maxSelections={3}
          required
        />
        <MultiSelectDropdown
          label="Interests"
          placeholder="Select your interests"
          options={interests}
          maxSelections={3}
          required
          tooltips={interestTooltips}
        />
        <SingleSelectDropdown
          label="Ownership"
          placeholder="What is the Ownership Identity of the Innovation?"
          options={ownershipOptions}
          required
        />
        <SingleSelectDropdown
          label="Stage"
          placeholder="Select innovation stage"
          options={stageOptions}
          required
          tooltips={stageTooltips}
        />
        <MultiSelectDropdown
          label="SDGs"
          placeholder="Select appropriate sustainable development goals your innovation address"
          options={sdgOptions}
          maxSelections={5}
          required
        />
        <SpecificationsFields />
        <BulletListInput
          label="User Groups"
          placeholder="List possible users of your innovation"
          maxEntries={10}
        />
        <BulletListInput
          label="Applications and Impact"
          placeholder="In what areas can your innovation be used and what impacts can it bring about?"
        />
        <BulletListInput
          label="Recommendations"
          placeholder="How can users get the best out of your innovation?"
        />
        <BulletListInput
          label="Cautions"
          placeholder="What important notes should users be aware of when using innovation to prevent hazards and malfunction?"
        />
        <DocumentUploadList
          label="Licenses and Certifications"
          description="Upload any licenses or certifications that your innovation has. Uploaded documents are securely stored and protected from unauthorized access. Each uploaded document should have a title caption and can be uploaded in text or picture formats."
        />
        <DocumentUploadList
          label="Honorary Awards"
          description="Upload any recognition awards that your innovation has received previously. Uploaded documents are securely stored and protected from unauthorized access. Each uploaded document should have a title caption and can be uploaded in text or picture formats."
        />
        <MediaGalleryUploads />
      </div>
    </Accordion>
  );
}

export function InventorInformationSection() {
  return (
    <Accordion title="Inventor's Information" subtitle="Required" icon={Phone} defaultOpen={false}>
      <div className="space-y-4">
        <Field label="Inventor's Name" placeholder="Input inventor's name" required />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Field label="Phone Number" placeholder="Input inventor's phone number" required />
          <Field label="Email Address" placeholder="Input email address" required />
        </div>
        <Field label="Website" placeholder="Inventor's website (if any)" />

        <div>
          <p className="mb-2 text-[11px] font-semibold text-gray-700 lg:text-xs">
            Social Media Handles <span className="text-red-500">*</span>
          </p>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Field label="LinkedIn" placeholder="@yourlinkedinhandle" required />
            <Field label="Twitter" placeholder="@yourtwitterhandle" required />
            <Field label="Instagram" placeholder="@yourinstagramhandle" required />
            <Field label="Facebook" placeholder="@yourfacebookhandle" required />
          </div>
        </div>
      </div>
    </Accordion>
  );
}
