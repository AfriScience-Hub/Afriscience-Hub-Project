'use client';

import { ArrowRight } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { IMPACT_PROGRAMS, type ImpactProgram } from '@/app/data/impactData';
import { PROGRAM_DETAILS } from '../data';

interface SelectCauseStepProps {
  selectedCause: string;
  setSelectedCause: (cause: string) => void;
  handleNext: () => void;
}

export default function SelectCauseStep({
  selectedCause,
  setSelectedCause,
  handleNext,
}: SelectCauseStepProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light p-8">
      <h2 className="text-2xl font-bold text-neutral-black mb-2">Select Program</h2>
      <p className="text-neutral-gray-dark mb-6">
        Choose the program you are applying for aid under
      </p>

      <div className="grid gap-4 sm:grid-cols-1">
        {IMPACT_PROGRAMS.map((program) => {
          const details = PROGRAM_DETAILS[program as ImpactProgram];
          return (
            <button
              key={program}
              type="button"
              onClick={() => setSelectedCause(program)}
              className={`text-left p-5 rounded-xl border-2 transition-all cursor-pointer ${
                selectedCause === program
                  ? 'border-brand-red-600 bg-brand-red-50'
                  : 'border-neutral-gray-light hover:border-brand-red-600 hover:bg-neutral-bg-light'
              }`}
            >
              <h3 className="font-bold text-neutral-black mb-1">{program}</h3>
              <p className="text-sm text-neutral-gray-dark">{details?.summary}</p>
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex justify-end">
        <Button
          onClick={handleNext}
          className="bg-brand-red-600 hover:bg-brand-red-700"
          disabled={!selectedCause}
        >
          Next <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
