'use client';

import { Check } from 'lucide-react';

interface ProgressIndicatorProps {
  currentStep: number;
}

export default function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  const steps = [
    { step: 1, label: 'Select Cause' },
    { step: 2, label: 'Review Requirements' },
    { step: 3, label: 'Application Form' }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((item, index) => (
          <div key={item.step} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  currentStep > item.step
                    ? 'bg-green-600 text-white'
                    : currentStep === item.step
                    ? 'bg-brand-red-600 text-white'
                    : 'bg-neutral-gray-light text-neutral-gray-medium'
                }`}
              >
                {currentStep > item.step ? <Check className="h-5 w-5" /> : item.step}
              </div>
              <span className={`mt-2 text-xs font-medium text-center ${
                currentStep >= item.step ? 'text-neutral-black' : 'text-neutral-gray-medium'
              }`}>
                {item.label}
              </span>
            </div>
            {index < 2 && (
              <div className={`h-1 flex-1 mx-2 ${
                currentStep > item.step ? 'bg-green-600' : 'bg-neutral-gray-light'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
