'use client';

import { Target, Link2, ImageIcon } from 'lucide-react';
import {
  FieldLabel,
  SectionCard,
  TextArea,
  MultiStringList,
} from '../components/FormField';
import MediaGroupUpload from '../components/MediaGroupUpload';
import { wordCount, type ResearchFormState } from './types';

export default function ResearchImpactMediaSection({
  impact,
  media,
  formUndertaking,
  onImpactChange,
  onMediaChange,
  onUndertakingChange,
}: {
  impact: ResearchFormState['impact'];
  media: ResearchFormState['media'];
  formUndertaking: boolean;
  onImpactChange: (v: ResearchFormState['impact']) => void;
  onMediaChange: (v: ResearchFormState['media']) => void;
  onUndertakingChange: (v: boolean) => void;
}) {
  const summaryWords = wordCount(impact.researchSummary);

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
            info="Specific practical operations in the research process."
            values={impact.objectives}
            onChange={(objectives) => onImpactChange({ ...impact, objectives })}
          />
          <MultiStringList
            label="Expected Research Outcomes"
            required
            info="What end-results are you likely to achieve?"
            values={impact.expectedOutcomes}
            onChange={(expectedOutcomes) => onImpactChange({ ...impact, expectedOutcomes })}
          />
          <MultiStringList
            label="Result Interpretations"
            info="To be provided at the end of the research."
            values={impact.resultInterpretations}
            onChange={(resultInterpretations) =>
              onImpactChange({ ...impact, resultInterpretations })
            }
          />
          <div>
            <FieldLabel info="To be provided at the end of the research. 200 words max.">
              Research Summary
            </FieldLabel>
            <TextArea
              value={impact.researchSummary}
              onChange={(e) =>
                onImpactChange({ ...impact, researchSummary: e.target.value })
              }
              placeholder="Optional until research completion"
            />
            <p
              className={`text-xs mt-1 ${
                summaryWords > 200 ? 'text-brand-red-600' : 'text-neutral-gray-medium'
              }`}
            >
              {summaryWords} / 200 words max.
            </p>
          </div>
          <MultiStringList
            label="Possible Research-Impact Areas"
            info="To be provided at the end of the research."
            values={impact.impactAreas}
            onChange={(impactAreas) => onImpactChange({ ...impact, impactAreas })}
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

      <SectionCard
        title="Media Gallery"
        icon={<ImageIcon className="h-5 w-5 text-brand-red-600" />}
        defaultOpen={false}
      >
        <div className="grid gap-6">
          <MediaGroupUpload
            label="Materials Acquisition"
            files={media.materialsAcquisition}
            onChange={(materialsAcquisition) =>
              onMediaChange({ ...media, materialsAcquisition })
            }
          />
          <MediaGroupUpload
            label="Sample Collection"
            files={media.sampleCollection}
            onChange={(sampleCollection) => onMediaChange({ ...media, sampleCollection })}
          />
          <MediaGroupUpload
            label="Setup & Experimentation"
            files={media.setupExperimentation}
            onChange={(setupExperimentation) =>
              onMediaChange({ ...media, setupExperimentation })
            }
          />
          <MediaGroupUpload
            label="Project Completion"
            files={media.projectCompletion}
            onChange={(projectCompletion) => onMediaChange({ ...media, projectCompletion })}
          />
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
