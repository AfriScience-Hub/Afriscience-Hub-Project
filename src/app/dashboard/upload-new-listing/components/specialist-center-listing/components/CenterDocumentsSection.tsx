'use client';

import { ShieldCheck, Trophy } from 'lucide-react';
import DocList, { type DocEntry } from '../../DocList';

interface CenterDocumentsSectionProps {
  licenses: DocEntry[];
  setLicenses: (v: DocEntry[]) => void;
  awards: DocEntry[];
  setAwards: (v: DocEntry[]) => void;
}

export default function CenterDocumentsSection({ licenses, setLicenses, awards, setAwards }: CenterDocumentsSectionProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-4 w-4 text-brand-navy-900" />
        <h4 className="text-sm font-bold uppercase tracking-wide text-neutral-black">Licenses &amp; Certifications</h4>
      </div>
      <p className="text-xs text-neutral-gray-medium">
        Upload valid licenses or certificates of your specialist establishment to further authenticate it. Uploaded documents are securely stored and protected from unauthorized access.
      </p>
      <DocList
        label="License/Certificate"
        addLabel="Add License / Certification"
        entries={licenses}
        onChange={setLicenses}
      />

      <div className="flex items-center gap-2 border-t border-neutral-gray-light pt-6">
        <Trophy className="h-4 w-4 text-amber-500" />
        <h4 className="text-sm font-bold uppercase tracking-wide text-neutral-black">Achievements &amp; Honorary Awards</h4>
      </div>
      <p className="text-xs text-neutral-gray-medium">
        Upload a copy of the achievements/honorary awards obtained by your establishment (if any). Uploaded documents are securely stored and protected from unauthorized access.
      </p>
      <DocList
        label="Achievement/Award"
        addLabel="Add Achievement / Award"
        entries={awards}
        onChange={setAwards}
      />
    </div>
  );
}
