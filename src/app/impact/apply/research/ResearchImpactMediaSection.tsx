'use client';

import { Target, Link2 } from 'lucide-react';
import { FieldLabel, SectionCard, TextArea, MultiStringList } from '../components/FormField';
import type { ResearchFormState } from './types';

export default function ResearchImpactMediaSection({
  impact,
  formUndertaking,
  onImpactChange,
  onUndertakingChange,
}: {
  impact: ResearchFormState['impact'];
  formUndertaking: boolean;
  onImpactChange: (v: ResearchFormState['impact']) => void;
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
          <FieldLabel required>Research Aim</FieldLabel>
          <TextArea
            value={impact.researchAim}
            onChange={(e) => onImpactChange({ ...impact, researchAim: e.target.value })}
            required
          />
        </div>
        <div className="space-y-4">
          <MultiStringList
            label="Research Objectives"
            required
            info="Mention the specific practical operations to be done in the research process."
            values={impact.objectives}
            onChange={(objectives) => onImpactChange({ ...impact, objectives })}
          />
          <MultiStringList
            label="Expected Research Outcomes"
            required
            info="What end-results are you likely to achieve in the research?"
            values={impact.expectedOutcomes}
            onChange={(expectedOutcomes) => onImpactChange({ ...impact, expectedOutcomes })}
          />
        </div>
      </SectionCard>

      <SectionCard
        title="Publication Links"
        icon={<Link2 className="h-5 w-5 text-brand-red-600" />}
        defaultOpen={false}
      >
        <p className="text-xs text-neutral-gray-medium mb-3">
          To be provided after the research is published. Multiple entries allowed.
        </p>
        <MultiStringList
          label="Links"
          values={impact.publicationLinks}
          onChange={(publicationLinks) => onImpactChange({ ...impact, publicationLinks })}
          placeholder="https://"
        />
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
