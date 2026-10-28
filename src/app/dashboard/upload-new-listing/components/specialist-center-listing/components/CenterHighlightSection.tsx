'use client';

import HighlightFields from '../../HighlightFields';
import type { CenterHighlight } from '../types';

interface CenterHighlightSectionProps {
  highlight: CenterHighlight;
  onChange: (patch: Partial<CenterHighlight>) => void;
}

export default function CenterHighlightSection({ highlight, onChange }: CenterHighlightSectionProps) {
  return (
    <HighlightFields
      highlight={highlight}
      onChange={onChange}
      responseHint="How quick can your establishment respond to a client's request on this platform?"
      workDaysHint="Indicate the days your establishment operates in a week"
      workHoursHint="Indicate the time interval for work activities in a day"
    />
  );
}
