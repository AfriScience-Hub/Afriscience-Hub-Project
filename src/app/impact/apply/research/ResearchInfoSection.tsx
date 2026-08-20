'use client';

import { FlaskConical } from 'lucide-react';
import { AFRICAN_COUNTRIES } from '@/app/data/mockData';
import { COUNTRY_STATES } from '@/app/support/volunteer/data';
import {
  FieldLabel,
  SectionCard,
  TextInput,
  SelectInput,
  FileUpload,
  MultiStringList,
} from '../components/FormField';
import { RESEARCH_DURATIONS, RESEARCH_SCOPES } from '../data';
import {
  getDisplayResearchLevel,
  getResearchCategory,
  type ResearchFormState,
} from './types';
import { LaboratoriesBlock, ProceduresBlock } from './LaboratoriesProcedures';

export default function ResearchInfoSection({
  head,
  value,
  researcherCount,
  onChange,
}: {
  head: ResearchFormState['head'];
  value: ResearchFormState['research'];
  researcherCount: number;
  onChange: (v: ResearchFormState['research']) => void;
}) {
  const states = value.country ? COUNTRY_STATES[value.country] || [] : [];

  const toggleScope = (scope: string) => {
    const scopes = value.scopes.includes(scope)
      ? value.scopes.filter((s) => s !== scope)
      : [...value.scopes, scope];
    onChange({
      ...value,
      scopes,
      scopeOther: scope === 'Others' && !scopes.includes('Others') ? '' : value.scopeOther,
    });
  };

  return (
    <SectionCard
      title="Research Information"
      icon={<FlaskConical className="h-5 w-5 text-brand-red-600" />}
      badge="Required"
      defaultOpen={false}
    >
      <div className="grid gap-4 sm:grid-cols-2 mb-4">
        <div>
          <FieldLabel>Research Category</FieldLabel>
          <TextInput value={getResearchCategory(head.researcherIdentity)} disabled />
        </div>
        <div>
          <FieldLabel>Research Level</FieldLabel>
          <TextInput value={getDisplayResearchLevel(head)} disabled />
        </div>
        <div>
          <FieldLabel>Number of Researchers</FieldLabel>
          <TextInput value={String(researcherCount)} disabled />
          <p className="text-xs text-neutral-gray-medium mt-1">
            Head Researcher + team members
          </p>
        </div>
        <div>
          <FieldLabel required info="How long will it take for your research to be concluded?">
            Research Duration
          </FieldLabel>
          <SelectInput
            value={value.duration}
            onChange={(e) => onChange({ ...value, duration: e.target.value })}
            required
          >
            <option value="">Select Duration</option>
            {RESEARCH_DURATIONS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </SelectInput>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 mb-4">
        <div>
          <FieldLabel required>Research Location – Country</FieldLabel>
          <SelectInput
            value={value.country}
            onChange={(e) =>
              onChange({ ...value, country: e.target.value, stateRegion: '' })
            }
            required
          >
            <option value="">Select Country</option>
            {AFRICAN_COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </SelectInput>
        </div>
        <div>
          <FieldLabel required>Research Location – State/Region</FieldLabel>
          {states.length > 0 ? (
            <SelectInput
              value={value.stateRegion}
              onChange={(e) => onChange({ ...value, stateRegion: e.target.value })}
              required
              disabled={!value.country}
            >
              <option value="">Select State/Region</option>
              {states.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </SelectInput>
          ) : (
            <TextInput
              placeholder={value.country ? 'Enter state/region' : 'Select country first'}
              value={value.stateRegion}
              onChange={(e) => onChange({ ...value, stateRegion: e.target.value })}
              required
              disabled={!value.country}
            />
          )}
        </div>
        <div className="sm:col-span-2">
          <FieldLabel required>Research Title</FieldLabel>
          <TextInput
            value={value.title}
            onChange={(e) => onChange({ ...value, title: e.target.value })}
            required
          />
        </div>
        <div>
          <FieldLabel required info="Specify the quantity of samples to be analyzed.">
            Sample Size
          </FieldLabel>
          <TextInput
            value={value.sampleSize}
            onChange={(e) => onChange({ ...value, sampleSize: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <MultiStringList
          label="Research Materials"
          required
          info="Mention all the materials needed for the research."
          values={value.materials}
          onChange={(materials) => onChange({ ...value, materials })}
          placeholder="Material"
        />
      </div>

      <LaboratoriesBlock
        laboratories={value.laboratories}
        onChange={(laboratories) => onChange({ ...value, laboratories })}
      />
      <ProceduresBlock
        procedures={value.procedures}
        onChange={(procedures) => onChange({ ...value, procedures })}
      />

      <div className="grid gap-4 sm:grid-cols-2 mb-6">
        <FileUpload
          label="Research Proposal"
          required
          accept=".pdf,.doc,.docx,.txt"
          hint="Text/document file formats only."
          file={value.proposalDoc}
          onChange={(f) => onChange({ ...value, proposalDoc: f })}
          onClear={() => onChange({ ...value, proposalDoc: null })}
        />
        <FileUpload
          label="Research Budget"
          required
          accept=".pdf,.doc,.docx,.txt,.xls,.xlsx"
          hint="Text/document file formats only."
          file={value.budgetDoc}
          onChange={(f) => onChange({ ...value, budgetDoc: f })}
          onClear={() => onChange({ ...value, budgetDoc: null })}
        />
      </div>

      <div>
        <FieldLabel
          required
          info="Select the options that best summarize the scope of your research study."
        >
          Research Scope
        </FieldLabel>
        <div className="space-y-2 mt-2">
          {RESEARCH_SCOPES.map((scope) => (
            <label key={scope} className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={value.scopes.includes(scope)}
                onChange={() => toggleScope(scope)}
                className="rounded border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600 mt-0.5"
              />
              <span className="text-sm text-neutral-gray-dark">{scope}</span>
            </label>
          ))}
        </div>
        {value.scopes.includes('Others') && (
          <TextInput
            className="mt-2"
            placeholder="Specify other scope"
            value={value.scopeOther}
            onChange={(e) => onChange({ ...value, scopeOther: e.target.value })}
            required
          />
        )}
      </div>
    </SectionCard>
  );
}
