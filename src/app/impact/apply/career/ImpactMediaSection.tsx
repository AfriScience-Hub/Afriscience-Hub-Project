'use client';

import { Target, ImageIcon } from 'lucide-react';
import {
  FieldLabel,
  SectionCard,
  TextInput,
  MultiStringList,
} from '../components/FormField';
import type { CareerFormState } from './types';

const MAX_MEDIA = 5;

function MediaGroupUpload({
  label,
  files,
  onChange,
}: {
  label: string;
  files: File[];
  onChange: (f: File[]) => void;
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <p className="text-xs text-neutral-gray-medium mb-2">
        Optional for now — collected as program progresses. Max {MAX_MEDIA} uploads. Picture and
        video formats only.
      </p>
      <label className="flex flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-neutral-gray-light px-4 py-5 cursor-pointer hover:border-brand-red-300 transition-colors">
        <span className="text-sm font-medium text-neutral-gray-dark">
          Upload media ({files.length}/{MAX_MEDIA})
        </span>
        <input
          type="file"
          accept="image/*,video/*"
          multiple
          className="hidden"
          onChange={(e) => {
            const incoming = Array.from(e.target.files || []);
            onChange([...files, ...incoming].slice(0, MAX_MEDIA));
            e.target.value = '';
          }}
        />
      </label>
      {files.length > 0 && (
        <ul className="mt-2 space-y-1">
          {files.map((f, i) => (
            <li
              key={`${f.name}-${i}`}
              className="flex items-center justify-between text-xs bg-neutral-bg-light rounded px-2 py-1.5"
            >
              <span className="truncate">{f.name}</span>
              <button
                type="button"
                className="text-brand-red-600 font-semibold shrink-0 ml-2"
                onClick={() => onChange(files.filter((_, idx) => idx !== i))}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function ImpactMediaSection({
  impact,
  media,
  formUndertaking,
  onImpactChange,
  onMediaChange,
  onUndertakingChange,
}: {
  impact: CareerFormState['impact'];
  media: CareerFormState['media'];
  formUndertaking: boolean;
  onImpactChange: (v: CareerFormState['impact']) => void;
  onMediaChange: (v: CareerFormState['media']) => void;
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
            info="List all tangible needs in specific terms (e.g. sewing machine, office space, PC)."
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
        </div>
      </SectionCard>

      <SectionCard
        title="Media Gallery"
        icon={<ImageIcon className="h-5 w-5 text-brand-red-600" />}
        defaultOpen={false}
      >
        <div className="grid gap-6">
          <MediaGroupUpload
            label="Business & Market Survey"
            files={media.businessMarketSurvey}
            onChange={(businessMarketSurvey) => onMediaChange({ ...media, businessMarketSurvey })}
          />
          <MediaGroupUpload
            label="Funding & Setup"
            files={media.fundingSetup}
            onChange={(fundingSetup) => onMediaChange({ ...media, fundingSetup })}
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
