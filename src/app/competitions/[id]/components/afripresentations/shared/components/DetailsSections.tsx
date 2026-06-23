'use client';

import { useState } from 'react';
import {
  FileText, ClipboardCheck, ListChecks, ShieldCheck, Scale, Gift,
  AlertTriangle, CheckCircle, Trophy, BookOpen, Users, ChevronRight
} from 'lucide-react';
import { Button } from '@/app/components/ui/Button';

interface SectionProps {
  comp: { country: string; registrationFee: string; topics?: string[] };
  undertakingChecked: boolean;
  onUndertakingChange: (v: boolean) => void;
  onApply: (topic?: string) => void;
}

interface DescriptionSectionProps {
  description: string;
}

export function DescriptionSection({ description }: DescriptionSectionProps) {
  return (
    <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
      <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
        <FileText className="h-5 w-5 text-brand-navy-900" /> Competition Description
      </h3>
      <p className="text-neutral-gray-dark leading-relaxed">{description}</p>
    </section>
  );
}

interface RegistrationRequirementsSectionProps {
  requirements: string[];
  country: string;
  fee: string;
}

export function RegistrationRequirementsSection({ requirements, country, fee }: RegistrationRequirementsSectionProps) {
  return (
    <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
      <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
        <ClipboardCheck className="h-5 w-5 text-brand-red-600" /> Registration Requirements
      </h3>
      <ul className="space-y-2">
        {requirements.map((req, idx) => (
          <li key={idx} className="flex items-start gap-3 text-sm text-neutral-gray-dark">
            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
            {req}
          </li>
        ))}
        <li className="flex items-start gap-3 text-sm text-neutral-gray-dark">
          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
          Must be an African currently residing in &ldquo;{country}&rdquo;
        </li>
        <li className="flex items-start gap-3 text-sm text-neutral-gray-dark">
          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
          Registration Fee of {fee}
        </li>
      </ul>
    </section>
  );
}

interface RulesSectionProps {
  rules: string[];
}

export function RulesSection({ rules }: RulesSectionProps) {
  return (
    <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
      <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
        <ListChecks className="h-5 w-5 text-brand-navy-900" /> Rules
      </h3>
      <ol className="space-y-2 list-decimal list-inside">
        {rules.map((rule, idx) => (
          <li key={idx} className="text-sm text-neutral-gray-dark">{rule}</li>
        ))}
      </ol>
    </section>
  );
}

export function ParentGuardianSection() {
  return (
    <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
      <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
        <Users className="h-5 w-5 text-brand-navy-900" /> Parent / Guardian
      </h3>
      <p className="text-sm text-neutral-gray-dark leading-relaxed">
        The role of a parent or guardian is to assist contestants through the registration process of this competition and prepare them for presentation.
      </p>
    </section>
  );
}

interface ScreeningSectionProps {
  criteria: string[];
}

export function ScreeningSection({ criteria }: ScreeningSectionProps) {
  return (
    <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
      <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-brand-navy-900" /> Screening & Selection
      </h3>
      <div className="space-y-3 text-sm text-neutral-gray-dark leading-relaxed">
        <p>All submitted entries will be reviewed and scored by our competition panel in the following areas:</p>
        <ul className="list-disc list-inside pl-4 space-y-1">
          {criteria.map((c, idx) => <li key={idx}>{c}</li>)}
        </ul>
        <p>Top 30 finalists will be listed under the &apos;Voting&apos; section of the platform after four (4) weeks of submission deadline.</p>
        <p>Public votes will be used to determine the final performance of finalists.</p>
        <p>At the end of voting sessions, winners will be ranked, announced and rewarded under the &apos;Awards&apos; section of the platform.</p>
        <p>When a tie exists either in the 1st, 2nd or 3rd positions, it will be resolved by further extending the voting window for affected finalists by 48 hours.</p>
      </div>
    </section>
  );
}

interface ConsentSectionProps {
  consent: string;
}

export function ConsentSection({ consent }: ConsentSectionProps) {
  return (
    <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
      <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
        <Scale className="h-5 w-5 text-neutral-gray-dark" /> Consent
      </h3>
      <p className="text-sm text-neutral-gray-dark leading-relaxed">{consent}</p>
    </section>
  );
}

interface RewardItem {
  position: string;
  color: string;
  bg: string;
  border: string;
  items: string[];
}

interface RewardSectionProps {
  rewards: RewardItem[];
}

export function RewardSection({ rewards }: RewardSectionProps) {
  return (
    <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
      <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
        <Gift className="h-5 w-5 text-amber-500" /> Reward
      </h3>
      <div className="grid gap-4 sm:grid-cols-3">
        {rewards.map((reward) => (
          <div key={reward.position} className={`rounded-xl border-2 ${reward.border} ${reward.bg} p-4`}>
            <h4 className={`text-sm font-bold ${reward.color} mb-2`}>{reward.position}</h4>
            <ul className="space-y-1.5">
              {reward.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-neutral-gray-dark">
                  <Trophy className={`h-3 w-3 ${reward.color} flex-shrink-0 mt-0.5`} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

interface UndertakingSectionProps {
  undertaking: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}

export function UndertakingSection({ undertaking, checked, onChange }: UndertakingSectionProps) {
  return (
    <section className="bg-brand-red-50 rounded-xl p-6 shadow-sm border border-brand-red-200">
      <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-brand-red-600" /> Undertaking Remark
      </h3>
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-1 rounded border-brand-red-300 text-brand-red-600 focus:ring-brand-red-600"
        />
        <span className="text-sm text-neutral-gray-dark leading-relaxed">{undertaking}</span>
      </label>
    </section>
  );
}

interface TopicsSectionProps {
  topics: string[];
  selectedTopicIdx: number | null;
  undertakingChecked: boolean;
  onSelectTopic: (idx: number) => void;
  onApply: () => void;
  fee: string;
}

export function TopicsSection({ topics, selectedTopicIdx, undertakingChecked, onSelectTopic, onApply, fee }: TopicsSectionProps) {
  return (
    <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
      <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-brand-navy-900" /> Topics
      </h3>
      <div className="space-y-3">
        {topics.map((topic, idx) => (
          <label
            key={idx}
            className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
              selectedTopicIdx === idx
                ? 'border-brand-red-300 bg-brand-red-50/50'
                : 'border-neutral-gray-light bg-neutral-bg-light/50 hover:border-brand-red-200'
            } ${!undertakingChecked ? 'opacity-50 pointer-events-none' : ''}`}
          >
            <input
              type="radio"
              name="presentation-topic"
              checked={selectedTopicIdx === idx}
              onChange={() => onSelectTopic(idx)}
              disabled={!undertakingChecked}
              className="mt-0.5 border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600"
            />
            <div className="flex-1">
              <p className="text-sm text-neutral-black font-medium leading-relaxed">{topic}</p>
            </div>
          </label>
        ))}
      </div>
      <div className="mt-6">
        <Button
          size="lg"
          className="w-full bg-brand-red-600 hover:bg-brand-red-700 py-5 text-lg"
          disabled={!undertakingChecked || selectedTopicIdx === null}
          onClick={onApply}
        >
          <Trophy className="h-5 w-5 mr-2" /> Apply for Selected Topic ({fee})
        </Button>
        {(!undertakingChecked || selectedTopicIdx === null) && (
          <p className="text-xs text-brand-red-600 text-center mt-2">
            {!undertakingChecked
              ? 'Please accept the Undertaking Remark above to select a topic.'
              : 'Please select a topic to continue.'}
          </p>
        )}
      </div>
    </section>
  );
}
