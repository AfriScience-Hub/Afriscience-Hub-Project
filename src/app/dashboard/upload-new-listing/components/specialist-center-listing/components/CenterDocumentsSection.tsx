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
      <DocList label="File" addLabel="Add License / Certification" entries={licenses} onChange={setLicenses} />

      <div className="flex items-center gap-2 border-t border-neutral-gray-light pt-6">
        <Trophy className="h-4 w-4 text-amber-500" />
        <h4 className="text-sm font-bold uppercase tracking-wide text-neutral-black">Achievements &amp; Honorary Awards</h4>
      </div>
      <DocList label="Achievement" addLabel="Add Achievement / Award" entries={awards} onChange={setAwards} />
    </div>
  );
}
