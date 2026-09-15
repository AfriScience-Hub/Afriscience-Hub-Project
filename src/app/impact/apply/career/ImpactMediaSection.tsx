'use client';

import { Target } from 'lucide-react';
import {
  FieldLabel,
  SectionCard,
  TextInput,
  TextArea,
  MultiStringList,
} from '../components/FormField';
import type { CareerFormState } from './types';

export default function ImpactMediaSection({
  impact,
  formUndertaking,
  onImpactChange,
  onUndertakingChange,
}: {
  impact: CareerFormState['impact'];
  formUndertaking: boolean;
  onImpactChange: (v: CareerFormState['impact']) => void;
  onUndertakingChange: (v: boolean) => void;
}) {
  return (
    <>
      <SectionCard
        title="Impact Assessment"
        icon={<Target className="h-5 w-5 text-brand-red-600" />}
        badge="Required"
        defaultOpen={false}
      >
        <div className="mb-4">
          <FieldLabel required>Career Path</FieldLabel>
          <TextInput
            value={impact.careerPath}
            onChange={(e) => onImpactChange({ ...impact, careerPath: e.target.value })}
            placeholder="e.g. tailoring, baking, AgriTech diagnostics"
            required
          />
        </div>
        <div className="space-y-4">
          <MultiStringList
            label="Career Objectives"
            required
            info="Mention the goals that your chosen entrepreneurial career will help you achieve."
            values={impact.careerObjectives}
            onChange={(careerObjectives) => onImpactChange({ ...impact, careerObjectives })}
          />
          <MultiStringList
            label="Career Requirements"
            required
            info="List all the tangible needs of your chosen career in specific terms (e.g. sewing machine, office space, PC, oven, etc.)."
            values={impact.careerRequirements}
            onChange={(careerRequirements) => onImpactChange({ ...impact, careerRequirements })}
          />
          <MultiStringList
            label="Expected Career Impacts"
            required
            info="Mention all possible impacts that your chosen entrepreneurial career is expected to cause."
            values={impact.expectedCareerImpacts}
            onChange={(expectedCareerImpacts) =>
              onImpactChange({ ...impact, expectedCareerImpacts })
            }
          />
          <div>
            <FieldLabel>Your Story</FieldLabel>
            <TextArea
              value={impact.story}
              onChange={(e) => onImpactChange({ ...impact, story: e.target.value })}
              placeholder="Give a detailed background story, highlighting the events and circumstances that surround your entrepreneurial journey and need for support (1000 words max)."
            />
          </div>
        </div>
      </SectionCard>

      <label className="flex items-start gap-3 p-4 bg-neutral-bg-light rounded-lg cursor-pointer mb-6 border border-neutral-gray-light">
        <input
          type="checkbox"
          checked={formUndertaking}
          onChange={(e) => onUndertakingChange(e.target.checked)}
          className="rounded border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600 mt-1"
          required
        />
        <span className="text-sm text-neutral-gray-dark">
          I confirm that all information provided are accurate, that all uploaded documents are
          valid, and that I accept the terms and conditions of this service.
        </span>
      </label>
    </>
  );
}
