'use client';

import { ArrowLeft, Upload, X } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/input';

interface ApplicationFormStepProps {
  selectedCause: string;
  formData: {
    applicantName: string;
    applicantEmail: string;
    organizationName: string;
    organizationType: string;
    registrationNumber: string;
    country: string;
    state: string;
    address: string;
    phone: string;
    website: string;
    projectTitle: string;
    projectDescription: string;
    targetBeneficiaries: string;
    expectedImpact: string;
    timeline: string;
    budget: string;
    documents: File[];
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeDocument: (index: number) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleBack: () => void;
  isSubmitting: boolean;
}

export default function ApplicationFormStep({
  selectedCause,
  formData,
  handleInputChange,
  handleFileChange,
  removeDocument,
  handleSubmit,
  handleBack,
  isSubmitting
}: ApplicationFormStepProps) {
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light p-8">
      <h2 className="text-2xl font-bold text-neutral-black mb-2">Application Form</h2>
      <p className="text-neutral-gray-dark mb-6">Fill in all required information below</p>

      <div className="bg-brand-red-50 border border-brand-red-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-neutral-gray-dark mb-1">Selected Cause</p>
        <p className="font-bold text-brand-red-600">{selectedCause}</p>
      </div>

      <div className="mb-8">
        <h3 className="font-bold text-neutral-black mb-4">Your Information</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-neutral-black mb-1">Full Name *</label>
            <Input
              name="applicantName"
              value={formData.applicantName}
              onChange={handleInputChange}
              required
              disabled
              className="bg-neutral-bg-light"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-black mb-1">Email *</label>
            <Input
              type="email"
              name="applicantEmail"
              value={formData.applicantEmail}
              onChange={handleInputChange}
              required
              disabled
              className="bg-neutral-bg-light"
            />
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="font-bold text-neutral-black mb-4">Organization Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-black mb-1">Organization Name *</label>
            <Input
              name="organizationName"
              value={formData.organizationName}
              onChange={handleInputChange}
              placeholder="Enter organization name"
              required
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-neutral-black mb-1">Organization Type *</label>
              <select
                name="organizationType"
                value={formData.organizationType}
                onChange={handleInputChange}
                required
                className="w-full rounded-lg border border-neutral-gray-light p-2.5"
              >
                <option value="">Select Type</option>
                <option value="NGO">NGO</option>
                <option value="Community Group">Community Group</option>
                <option value="Institution">Institution</option>
                <option value="Local Government">Local Government</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-black mb-1">Registration Number</label>
              <Input
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleInputChange}
                placeholder="Organization reg. number"
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-neutral-black mb-1">Country *</label>
              <Input
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                placeholder="Country"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-black mb-1">State/Region *</label>
              <Input
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="State or region"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-black mb-1">Address *</label>
            <Input
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Full address"
              required
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-neutral-black mb-1">Phone *</label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+234 XXX XXX XXXX"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-black mb-1">Website</label>
              <Input
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="www.yourorg.org"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="font-bold text-neutral-black mb-4">Project Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-black mb-1">Project Title *</label>
            <Input
              name="projectTitle"
              value={formData.projectTitle}
              onChange={handleInputChange}
              placeholder="Brief, descriptive title"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-black mb-1">Project Description *</label>
            <textarea
              name="projectDescription"
              value={formData.projectDescription}
              onChange={handleInputChange}
              placeholder="Detailed description of your project, objectives, and methodology"
              required
              rows={6}
              className="w-full rounded-lg border border-neutral-gray-light p-2.5"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-neutral-black mb-1">Target Beneficiaries *</label>
              <Input
                name="targetBeneficiaries"
                value={formData.targetBeneficiaries}
                onChange={handleInputChange}
                placeholder="Number and type of beneficiaries"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-black mb-1">Timeline *</label>
              <Input
                name="timeline"
                value={formData.timeline}
                onChange={handleInputChange}
                placeholder="e.g., 6 months"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-black mb-1">Expected Impact *</label>
            <textarea
              name="expectedImpact"
              value={formData.expectedImpact}
              onChange={handleInputChange}
              placeholder="Describe the expected outcomes and long-term impact"
              required
              rows={4}
              className="w-full rounded-lg border border-neutral-gray-light p-2.5"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-black mb-1">Budget Request *</label>
            <Input
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              placeholder="e.g., $50,000"
              required
            />
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="font-bold text-neutral-black mb-4">Supporting Documents</h3>
        <div className="space-y-3">
          <input
            type="file"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            multiple
            onChange={handleFileChange}
            className="hidden"
            id="documents"
          />
          <label htmlFor="documents">
            <Button type="button" variant="outline" className="cursor-pointer" asChild>
              <span>
                <Upload className="h-4 w-4 mr-2" />
                Upload Documents
              </span>
            </Button>
          </label>
          {formData.documents.length > 0 && (
            <div className="space-y-2">
              {formData.documents.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-neutral-bg-light rounded-lg">
                  <span className="text-sm text-neutral-gray-dark flex-1 truncate">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeDocument(index)}
                    className="text-red-600 hover:text-red-700 ml-2"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <p className="text-xs text-neutral-gray-medium">
            Upload relevant documents such as proposals, budgets, registration certificates, etc. (PDF, DOC, DOCX, JPG, PNG)
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <Button type="button" variant="outline" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <Button
          type="submit"
          className="bg-brand-red-600 hover:bg-brand-red-700 flex-1"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Submitting...
            </span>
          ) : (
            'Submit Application'
          )}
        </Button>
      </div>
    </form>
  );
}
