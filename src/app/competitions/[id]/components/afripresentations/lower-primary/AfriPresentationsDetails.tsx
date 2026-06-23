'use client';

import { useState, useMemo } from 'react';
import { Trophy } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import type { Competition } from '@/app/competitions/data';
import {
  DescriptionSection, RegistrationRequirementsSection, RulesSection,
  ParentGuardianSection, ScreeningSection, ConsentSection,
  RewardSection, UndertakingSection, TopicsSection
} from '../shared/components/DetailsSections';
import { LP_DATA } from './data';

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
      <DescriptionSection description={LP_DATA.DESCRIPTION} />
      <RegistrationRequirementsSection
        requirements={LP_DATA.REGISTRATION_REQUIREMENTS}
        country={comp.country}
        fee={comp.registrationFee}
      />
      <RulesSection rules={LP_DATA.RULES} />
      <ParentGuardianSection />
      <ScreeningSection criteria={LP_DATA.SELECTION_CRITERIA} />
      <ConsentSection consent={LP_DATA.CONSENT} />
      <RewardSection rewards={LP_DATA.REWARDS} />
      <UndertakingSection
        undertaking={LP_DATA.UNDERTAKING}
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
