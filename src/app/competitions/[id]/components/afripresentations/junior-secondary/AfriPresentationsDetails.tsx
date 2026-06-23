'use client';

import { useState } from 'react';
import { Trophy } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import type { Competition } from '@/app/competitions/data';
import {
  DescriptionSection, RegistrationRequirementsSection, RulesSection,
  ParentGuardianSection, ScreeningSection, ConsentSection,
  RewardSection, UndertakingSection, TopicsSection
} from '../shared/components/DetailsSections';
import { JS_DATA } from './data';

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
      <DescriptionSection description={JS_DATA.DESCRIPTION} />
      <RegistrationRequirementsSection
        requirements={JS_DATA.REGISTRATION_REQUIREMENTS}
        country={comp.country}
        fee={comp.registrationFee}
      />
      <RulesSection rules={JS_DATA.RULES} />
      <ParentGuardianSection />
      <ScreeningSection criteria={JS_DATA.SELECTION_CRITERIA} />
      <ConsentSection consent={JS_DATA.CONSENT} />
      <RewardSection rewards={JS_DATA.REWARDS} />
      <UndertakingSection
        undertaking={JS_DATA.UNDERTAKING}
        checked={undertakingChecked}
        onChange={onUndertakingChange}
      />
      {hasTopics && (
        <TopicsSection
          topics={comp.topics}
          selectedTopicIdx={selectedTopicIdx}
          undertakingChecked={undertakingChecked}
          onSelectTopic={setSelectedTopicIdx}
          onApply={handleApply}
          fee={comp.registrationFee}
        />
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
