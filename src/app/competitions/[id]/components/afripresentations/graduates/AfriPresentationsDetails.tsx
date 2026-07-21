'use client';

import { useState } from 'react';
import {
  FileText, ClipboardCheck, ListChecks, ShieldCheck, Scale, Gift,
  AlertTriangle, CheckCircle, Trophy, BookOpen
} from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import type { Competition } from '@/app/competitions/data';
import { GR_DATA } from './data';

interface Props {
  comp: Competition;
  undertakingChecked: boolean;
  onUndertakingChange: (v: boolean) => void;
  onApply: (topic?: string) => void;
}

export function AfriPresentationsDetails({ comp, undertakingChecked, onUndertakingChange, onApply }: Props) {
  const [selectedTopicIdx, setSelectedTopicIdx] = useState<number | null>(null);
  const hasTopics = comp.topics && comp.topics.length > 0;

  const handleApply = () => {
    if (hasTopics && selectedTopicIdx !== null) {
      onApply(comp.topics[selectedTopicIdx]);
    } else {
      onApply();
    }
  };

  return (
    <div className="space-y-6">
      <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5 text-brand-navy-900" /> Competition Description
        </h3>
        <p className="text-neutral-gray-dark leading-relaxed">{GR_DATA.DESCRIPTION}</p>
      </section>

      <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
          <ClipboardCheck className="h-5 w-5 text-brand-red-600" /> Registration Requirements
        </h3>
        <ul className="space-y-2">
          {GR_DATA.REGISTRATION_REQUIREMENTS.map((req, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-neutral-gray-dark">
              <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
              {req}
            </li>
          ))}
          <li className="flex items-start gap-3 text-sm text-neutral-gray-dark">
            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
            Must be an African currently residing in &ldquo;{comp.country}&rdquo;
          </li>
          <li className="flex items-start gap-3 text-sm text-neutral-gray-dark">
            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
            Registration Fee of {comp.registrationFee}
          </li>
        </ul>
      </section>

      <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
          <ListChecks className="h-5 w-5 text-brand-navy-900" /> Rules
        </h3>
        <ol className="space-y-2 list-decimal list-inside">
          {GR_DATA.RULES.map((rule, idx) => (
            <li key={idx} className="text-sm text-neutral-gray-dark">{rule}</li>
          ))}
        </ol>
      </section>

      <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-brand-navy-900" /> Screening & Selection
        </h3>
        <ul className="space-y-2 text-sm text-neutral-gray-dark leading-relaxed list-disc list-inside">
          <li>All submitted entries will be reviewed and scored by our competition panel in the following areas:</li>
          {GR_DATA.SELECTION_CRITERIA.map((c, idx) => <li key={idx}>{c}</li>)}
          <li>Top 30 finalists will be listed under the &apos;Voting&apos; section of the platform after four (4) weeks of submission deadline.</li>
          <li>Public votes will be used to determine the final performance of finalists.</li>
          <li>At the end of voting sessions, winners will be ranked, announced and rewarded under the &apos;Awards&apos; section of the platform.</li>
          <li>When a tie exists either in the 1st, 2nd or 3rd positions, it will be resolved by further extending the voting window for affected finalists by 48 hours.</li>
        </ul>
      </section>

      <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
          <Scale className="h-5 w-5 text-neutral-gray-dark" /> Consent
        </h3>
        <p className="text-sm text-neutral-gray-dark leading-relaxed">{GR_DATA.CONSENT}</p>
      </section>

      <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
          <Gift className="h-5 w-5 text-amber-500" /> Reward
        </h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {GR_DATA.REWARDS.map((reward) => (
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

      <section className="bg-brand-red-50 rounded-xl p-6 shadow-sm border border-brand-red-200">
        <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-brand-red-600" /> Undertaking Remark
        </h3>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={undertakingChecked}
            onChange={(e) => onUndertakingChange(e.target.checked)}
            className="mt-1 rounded border-brand-red-300 text-brand-red-600 focus:ring-brand-red-600"
          />
          <span className="text-sm text-neutral-gray-dark leading-relaxed">{GR_DATA.UNDERTAKING}</span>
        </label>
      </section>

      {hasTopics && (
        <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
          <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-brand-navy-900" /> Topics
          </h3>
          <div className="space-y-3">
            {comp.topics.map((topic, idx) => (
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
                  onChange={() => setSelectedTopicIdx(idx)}
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
              onClick={handleApply}
            >
              <Trophy className="h-5 w-5 mr-2" /> Apply for Selected Topic
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
      )}

      {!hasTopics && (
        <div className="pt-2">
          <Button size="lg" className="w-full bg-brand-red-600 hover:bg-brand-red-700 py-6 text-lg" disabled={!undertakingChecked} onClick={handleApply}>
            <Trophy className="h-5 w-5 mr-2" /> Apply Now ({comp.registrationFee})
          </Button>
          {!undertakingChecked && (
            <p className="text-xs text-brand-red-600 text-center mt-2">Please accept the Undertaking Remark above to enable the Apply button.</p>
          )}
        </div>
      )}
    </div>
  );
}
