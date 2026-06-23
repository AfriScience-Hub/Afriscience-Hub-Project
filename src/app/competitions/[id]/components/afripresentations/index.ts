import type { Competition } from '@/app/competitions/data';

import { AfriPresentationsDetails as LPDetails } from './lower-primary/AfriPresentationsDetails';
import { AfriPresentationsApply as LPApply } from './lower-primary/AfriPresentationsApply';
import { AfriPresentationsSubmission as LPSubmission } from './lower-primary/AfriPresentationsSubmission';

import { AfriPresentationsDetails as UPDetails } from './upper-primary/AfriPresentationsDetails';
import { AfriPresentationsApply as UPApply } from './upper-primary/AfriPresentationsApply';
import { AfriPresentationsSubmission as UPSubmission } from './upper-primary/AfriPresentationsSubmission';

interface CompProps {
  comp: Competition;
  undertakingChecked?: boolean;
  onUndertakingChange?: (v: boolean) => void;
  onApply?: (topic?: string) => void;
}

export function getPresentationsDetails(comp: Competition): React.ComponentType<CompProps> | null {
  switch (comp.category) {
    case 'Lower Primary': return LPDetails as React.ComponentType<CompProps>;
    case 'Upper Primary': return UPDetails as React.ComponentType<CompProps>;
    default: return null;
  }
}

export function getPresentationsApply(comp: Competition): React.ComponentType<{ comp: Competition }> | null {
  switch (comp.category) {
    case 'Lower Primary': return LPApply as React.ComponentType<{ comp: Competition }>;
    case 'Upper Primary': return UPApply as React.ComponentType<{ comp: Competition }>;
    default: return null;
  }
}

export function getPresentationsSubmission(comp: Competition): React.ComponentType<{ comp: Competition }> | null {
  switch (comp.category) {
    case 'Lower Primary': return LPSubmission as React.ComponentType<{ comp: Competition }>;
    case 'Upper Primary': return UPSubmission as React.ComponentType<{ comp: Competition }>;
    default: return null;
  }
}
