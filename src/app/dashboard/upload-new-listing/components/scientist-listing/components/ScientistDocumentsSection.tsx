'use client';

import { ShieldCheck, Trophy } from 'lucide-react';
import CollapsibleSection from '../../CollapsibleSection';
import DocList, { type DocEntry } from '../../DocList';

interface ScientistDocumentsSectionProps {
  certifications: DocEntry[];
  setCertifications: (v: DocEntry[]) => void;
  achievements: DocEntry[];
  setAchievements: (v: DocEntry[]) => void;
}

export default function ScientistDocumentsSection({ certifications, setCertifications, achievements, setAchievements }: ScientistDocumentsSectionProps) {
  return (
    <CollapsibleSection title="Certifications & Achievements" icon={<ShieldCheck className="h-5 w-5 text-brand-navy-900" />} defaultOpen={false}>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-brand-navy-900" />
          <h4 className="text-sm font-bold uppercase tracking-wide text-neutral-black">Certifications &amp; Degrees</h4>
        </div>
        <DocList label="Certificate" addLabel="Add Certification / Degree" entries={certifications} onChange={setCertifications} />

        <div className="flex items-center gap-2 border-t border-neutral-gray-light pt-6">
          <Trophy className="h-4 w-4 text-amber-500" />
          <h4 className="text-sm font-bold uppercase tracking-wide text-neutral-black">Major Achievements &amp; Awards</h4>
        </div>
        <DocList label="Achievement" addLabel="Add Achievement / Award" entries={achievements} onChange={setAchievements} />
      </div>
    </CollapsibleSection>
  );
}
