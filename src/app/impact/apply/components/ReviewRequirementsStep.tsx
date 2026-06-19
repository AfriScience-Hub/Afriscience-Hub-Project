'use client';

import { ArrowLeft, ArrowRight, FileText } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { CAUSE_DETAILS } from '../data';

interface ReviewRequirementsStepProps {
  selectedCause: string;
  hasAgreed: boolean;
  setHasAgreed: (agreed: boolean) => void;
  handleNext: () => void;
  handleBack: () => void;
}

export default function ReviewRequirementsStep({
  selectedCause,
  hasAgreed,
  setHasAgreed,
  handleNext,
  handleBack
}: ReviewRequirementsStepProps) {
  const details = CAUSE_DETAILS[selectedCause as keyof typeof CAUSE_DETAILS];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light p-8">
      <h2 className="text-2xl font-bold text-neutral-black mb-2">{selectedCause} - Requirements</h2>
      <p className="text-neutral-gray-dark mb-6">Please review the requirements carefully before proceeding</p>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
        <h3 className="font-bold text-blue-900 mb-2">Description</h3>
        <p className="text-sm text-blue-800">{details?.description}</p>
      </div>

      <div className="mb-6">
        <h3 className="font-bold text-neutral-black mb-3 flex items-center gap-2">
          <FileText className="h-5 w-5 text-brand-red-600" />
          Required Documents & Information
        </h3>
        <ul className="space-y-2">
          {details?.requirements.map((req, index) => (
            <li key={index} className="flex items-start gap-3 text-sm text-neutral-gray-dark">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-red-600 flex-shrink-0 mt-2" />
              {req}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-5 mb-6">
        <h3 className="font-bold text-green-900 mb-2">Eligibility</h3>
        <p className="text-sm text-green-800">{details?.eligibility}</p>
      </div>

      <label className="flex items-start gap-3 p-4 bg-neutral-bg-light rounded-lg cursor-pointer mb-6">
        <input
          type="checkbox"
          checked={hasAgreed}
          onChange={(e) => setHasAgreed(e.target.checked)}
          className="rounded border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600 mt-1"
        />
        <span className="text-sm text-neutral-gray-dark">
          I understand the requirements and confirm that I have all the necessary documents and information to complete this application. I also confirm that my organization meets the eligibility criteria.
        </span>
      </label>

      <div className="flex gap-4">
        <Button variant="outline" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <Button
          onClick={handleNext}
          className="bg-brand-red-600 hover:bg-brand-red-700 flex-1"
          disabled={!hasAgreed}
        >
          Next <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
