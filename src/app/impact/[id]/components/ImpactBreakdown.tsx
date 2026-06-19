'use client';

import { X, Target, CheckCircle } from 'lucide-react';

interface ImpactBreakdownProps {
  impactBreakdown: {
    problemBefore?: string;
    solutionProvided?: string;
    outcomeAfter?: string;
    researchPurpose?: string;
    expectedOutcome?: string;
    areaOfImpact?: string;
  };
  type: 'community' | 'individual';
}

export default function ImpactBreakdown({ impactBreakdown, type }: ImpactBreakdownProps) {
  return (
    <div className="p-8 border-b border-neutral-gray-light">
      <h2 className="text-xl font-bold text-neutral-black mb-6">Impact Breakdown</h2>

      <div className="space-y-6">
        {type === 'community' ? (
          <>
            {impactBreakdown.problemBefore && (
              <div className="p-5 rounded-xl bg-red-50 border border-red-100">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-neutral-black mb-2">Problem Before Intervention</h3>
                    <p className="text-sm text-neutral-gray-dark leading-relaxed">
                      {impactBreakdown.problemBefore}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {impactBreakdown.solutionProvided && (
              <div className="p-5 rounded-xl bg-blue-50 border border-blue-100">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Target className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-neutral-black mb-2">Solution Provided</h3>
                    <p className="text-sm text-neutral-gray-dark leading-relaxed">
                      {impactBreakdown.solutionProvided}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {impactBreakdown.outcomeAfter && (
              <div className="p-5 rounded-xl bg-green-50 border border-green-100">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-neutral-black mb-2">Outcome After Intervention</h3>
                    <p className="text-sm text-neutral-gray-dark leading-relaxed">
                      {impactBreakdown.outcomeAfter}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {impactBreakdown.researchPurpose && (
              <div className="p-5 rounded-xl bg-blue-50 border border-blue-100">
                <h3 className="font-bold text-neutral-black mb-2">Research Purpose</h3>
                <p className="text-sm text-neutral-gray-dark leading-relaxed">
                  {impactBreakdown.researchPurpose}
                </p>
              </div>
            )}

            {impactBreakdown.expectedOutcome && (
              <div className="p-5 rounded-xl bg-purple-50 border border-purple-100">
                <h3 className="font-bold text-neutral-black mb-2">Expected Outcome</h3>
                <p className="text-sm text-neutral-gray-dark leading-relaxed">
                  {impactBreakdown.expectedOutcome}
                </p>
              </div>
            )}

            {impactBreakdown.areaOfImpact && (
              <div className="p-5 rounded-xl bg-green-50 border border-green-100">
                <h3 className="font-bold text-neutral-black mb-2">Area of Impact</h3>
                <p className="text-sm text-neutral-gray-dark leading-relaxed">
                  {impactBreakdown.areaOfImpact}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
