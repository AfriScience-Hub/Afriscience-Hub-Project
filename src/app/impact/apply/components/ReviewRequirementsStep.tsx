'use client';

import { ArrowLeft, ArrowRight, FileText } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import type { ImpactProgram } from '@/app/data/impactData';
import { PROGRAM_DETAILS } from '../data';

interface ReviewRequirementsStepProps {
  selectedCause: string;
  hasAgreed: boolean;
  setHasAgreed: (agreed: boolean) => void;
  handleNext: () => void;
  handleBack: () => void;
}

function BulletList({ items, tone }: { items: string[]; tone?: 'default' | 'green' | 'blue' }) {
  const dot =
    tone === 'green' ? 'bg-green-600' : tone === 'blue' ? 'bg-blue-600' : 'bg-brand-red-600';
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm text-neutral-gray-dark">
          <span className={`h-1.5 w-1.5 rounded-full ${dot} flex-shrink-0 mt-2`} />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function ReviewRequirementsStep({
  selectedCause,
  hasAgreed,
  setHasAgreed,
  handleNext,
  handleBack,
}: ReviewRequirementsStepProps) {
  const details = PROGRAM_DETAILS[selectedCause as ImpactProgram];

  if (!details) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light p-8">
      <h2 className="text-2xl font-bold text-neutral-black mb-2">
        {selectedCause} – Review Requirements
      </h2>
      <p className="text-neutral-gray-dark mb-6">
        Please review the requirements carefully before proceeding
      </p>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
        <h3 className="font-bold text-blue-900 mb-2">Description</h3>
        <p className="text-sm text-blue-800 leading-relaxed">{details.description}</p>
      </div>

      <div className="mb-6">
        <h3 className="font-bold text-neutral-black mb-3">Eligibility</h3>
        <BulletList items={details.eligibility} />
      </div>

      <div className="mb-6">
        <h3 className="font-bold text-neutral-black mb-3 flex items-center gap-2">
          <FileText className="h-5 w-5 text-brand-red-600" />
          Application Requirements
        </h3>
        <BulletList items={details.applicationRequirements} />
      </div>

      {details.preApprovalRequirements && (
        <div className="mb-6">
          <h3 className="font-bold text-neutral-black mb-3">Pre-Approval Requirements</h3>
          <BulletList items={details.preApprovalRequirements} tone="blue" />
        </div>
      )}

      {details.disbursementRequirements && (
        <div className="mb-6">
          <h3 className="font-bold text-neutral-black mb-3">Disbursement Requirements</h3>
          <BulletList items={details.disbursementRequirements} tone="blue" />
        </div>
      )}

      {details.approvalRequirements && (
        <div className="mb-6">
          <h3 className="font-bold text-neutral-black mb-3">Approval Requirements</h3>
          <BulletList items={details.approvalRequirements} tone="blue" />
        </div>
      )}

      {details.renewalRequirement && (
        <div className="mb-6">
          <h3 className="font-bold text-neutral-black mb-3">Renewal Requirement</h3>
          <BulletList items={details.renewalRequirement} />
        </div>
      )}

      {details.honoraryAwardRequirements && (
        <div className="mb-6">
          <h3 className="font-bold text-neutral-black mb-3">
            AfriScience Hub’s Completion Honorary Award Requirement
          </h3>
          <BulletList items={details.honoraryAwardRequirements} tone="green" />
        </div>
      )}

      <div className="mb-6">
        <h3 className="font-bold text-neutral-black mb-3">Post-Completion Requirements</h3>
        <BulletList items={details.postCompletionRequirements} />
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-5 mb-6">
        <h3 className="font-bold text-green-900 mb-3">Overall Program Impact</h3>
        <BulletList items={details.overallProgramImpact} tone="green" />
      </div>

      <label className="flex items-start gap-3 p-4 bg-neutral-bg-light rounded-lg cursor-pointer mb-6">
        <input
          type="checkbox"
          checked={hasAgreed}
          onChange={(e) => setHasAgreed(e.target.checked)}
          className="rounded border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600 mt-1"
        />
        <span className="text-sm text-neutral-gray-dark">{details.undertaking}</span>
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
