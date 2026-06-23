import type { Competition } from '@/app/competitions/data';

import { AfriPresentationsDetails as LPDetails } from './lower-primary/AfriPresentationsDetails';
import { AfriPresentationsApply as LPApply } from './lower-primary/AfriPresentationsApply';
import { AfriPresentationsSubmission as LPSubmission } from './lower-primary/AfriPresentationsSubmission';

import { AfriPresentationsDetails as UPDetails } from './upper-primary/AfriPresentationsDetails';
import { AfriPresentationsApply as UPApply } from './upper-primary/AfriPresentationsApply';
import { AfriPresentationsSubmission as UPSubmission } from './upper-primary/AfriPresentationsSubmission';

import { AfriPresentationsDetails as JSDetails } from './junior-secondary/AfriPresentationsDetails';
import { AfriPresentationsApply as JSApply } from './junior-secondary/AfriPresentationsApply';
import { AfriPresentationsSubmission as JSSubmission } from './junior-secondary/AfriPresentationsSubmission';

import { AfriPresentationsDetails as SSDetails } from './senior-secondary/AfriPresentationsDetails';
import { AfriPresentationsApply as SSApply } from './senior-secondary/AfriPresentationsApply';
import { AfriPresentationsSubmission as SSSubmission } from './senior-secondary/AfriPresentationsSubmission';

import { AfriPresentationsDetails as UGDetails } from './undergraduates/AfriPresentationsDetails';
import { AfriPresentationsApply as UGApply } from './undergraduates/AfriPresentationsApply';
import { AfriPresentationsSubmission as UGSubmission } from './undergraduates/AfriPresentationsSubmission';

import { AfriPresentationsDetails as GRDetails } from './graduates/AfriPresentationsDetails';
import { AfriPresentationsApply as GRApply } from './graduates/AfriPresentationsApply';
import { AfriPresentationsSubmission as GRSubmission } from './graduates/AfriPresentationsSubmission';

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
    case 'Junior Secondary': return JSDetails as React.ComponentType<CompProps>;
    case 'Senior Secondary': return SSDetails as React.ComponentType<CompProps>;
    case 'Undergraduates': return UGDetails as React.ComponentType<CompProps>;
    case 'Graduates': return GRDetails as React.ComponentType<CompProps>;
    default: return null;
  }
}

export function getPresentationsApply(comp: Competition): React.ComponentType<{ comp: Competition }> | null {
  switch (comp.category) {
    case 'Lower Primary': return LPApply as React.ComponentType<{ comp: Competition }>;
    case 'Upper Primary': return UPApply as React.ComponentType<{ comp: Competition }>;
    case 'Junior Secondary': return JSApply as React.ComponentType<{ comp: Competition }>;
    case 'Senior Secondary': return SSApply as React.ComponentType<{ comp: Competition }>;
    case 'Undergraduates': return UGApply as React.ComponentType<{ comp: Competition }>;
    case 'Graduates': return GRApply as React.ComponentType<{ comp: Competition }>;
    default: return null;
  }
}

export function getPresentationsSubmission(comp: Competition): React.ComponentType<{ comp: Competition }> | null {
  switch (comp.category) {
    case 'Lower Primary': return LPSubmission as React.ComponentType<{ comp: Competition }>;
    case 'Upper Primary': return UPSubmission as React.ComponentType<{ comp: Competition }>;
    case 'Junior Secondary': return JSSubmission as React.ComponentType<{ comp: Competition }>;
    case 'Senior Secondary': return SSSubmission as React.ComponentType<{ comp: Competition }>;
    case 'Undergraduates': return UGSubmission as React.ComponentType<{ comp: Competition }>;
    case 'Graduates': return GRSubmission as React.ComponentType<{ comp: Competition }>;
    default: return null;
  }
}
