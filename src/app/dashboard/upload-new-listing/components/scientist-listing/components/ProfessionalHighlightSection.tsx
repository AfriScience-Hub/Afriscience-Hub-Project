'use client';

import { Clock } from 'lucide-react';
import CollapsibleSection from '../../CollapsibleSection';
import HighlightFields from '../../HighlightFields';
import type { ProfessionalHighlight } from '../types';

interface ProfessionalHighlightSectionProps {
  highlight: ProfessionalHighlight;
  onChange: (patch: Partial<ProfessionalHighlight>) => void;
}

export default function ProfessionalHighlightSection({ highlight, onChange }: ProfessionalHighlightSectionProps) {
  return (
    <CollapsibleSection title="Professional highlight" icon={<Clock className="h-5 w-5 text-brand-navy-900" />} badge="Required" defaultOpen={false}>
      <HighlightFields
        highlight={highlight}
        onChange={onChange}
        responseHint="How quick can you respond to a client's request on this platform?"
        workDaysHint="Indicate the days you operate in a week"
        workHoursHint="Indicate the time interval for work activities in a day"
      />
    </CollapsibleSection>
  );
}
