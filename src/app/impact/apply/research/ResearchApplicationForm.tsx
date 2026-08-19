'use client';

import { useMemo, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { toast } from 'sonner';
import {
  createDefaultSupervisor,
  createInitialResearchForm,
  getDisplayResearchLevel,
  getResearchCategory,
  hasAtLeastOneSocial,
  wordCount,
  type ResearchFormState,
} from './types';
import HeadResearcherSection from './HeadResearcherSection';
import TeamMembersSection from './TeamMembersSection';
import ResearchInfoSection from './ResearchInfoSection';
import ResearchImpactMediaSection from './ResearchImpactMediaSection';

export default function ResearchApplicationForm({
  user,
  onBack,
  onSubmitSuccess,
}: {
  user: { name?: string; email?: string; phone?: string };
  onBack: () => void;
  onSubmitSuccess: () => void;
}) {
  const [form, setForm] = useState<ResearchFormState>(() => createInitialResearchForm(user));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const researcherCount = useMemo(() => 1 + form.team.length, [form.team.length]);

  const handleIdentityChange = (
    identity: ResearchFormState['head']['researcherIdentity']
  ) => {
    setForm((f) => {
      let team = f.team.filter((m) => !m.isDefaultSupervisor);
      if (identity === 'Academic Researcher') {
        const hasSupervisor = team.some((m) => m.role === 'Supervisor');
        if (!hasSupervisor) team = [createDefaultSupervisor(), ...team];
      }
      return {
        ...f,
        head: {
          ...f.head,
          researcherIdentity: identity,
          researchLevel: '',
          researchLevelOther: '',
        },
        team,
      };
    });
  };

  const validate = (): string | null => {
    const { head, team, research, impact } = form;
    if (!head.title) return 'Select head researcher title';
    if (!head.phone) return 'Enter head researcher phone number';
    if (!hasAtLeastOneSocial(head.socials))
      return 'Provide at least one social handle for head researcher';
    if (!head.displayImage) return 'Upload head researcher display image';
    if (!head.researcherIdentity) return 'Select researcher identity';
    if (!head.researchLevel) return 'Select research level';
    if (head.researchLevel === 'Other' && !head.researchLevelOther)
      return 'Specify research level';

    if (head.researcherIdentity === 'Academic Researcher') {
      if (!head.schoolName || !head.schoolAddress || !head.matricNo || !head.department)
        return 'Complete academic background information';
      if (!head.schoolIdCard) return 'Upload school ID card';
    }
    if (head.researcherIdentity === 'Independent Researcher') {
      const filled = head.previousPublications.filter((l) => l.trim()).length;
      if (filled < 7) return 'Provide at least 7 previous publication links';
    }

    if (!head.idCard.type || !head.idCard.file) return 'Complete government ID card upload';
    if (head.idCard.type === 'Other' && !head.idCard.otherSpecify)
      return 'Specify other ID card type';
    if (head.researchLevel !== 'Undergraduate Research' && !head.degreeCertificate)
      return 'Upload degree certificate';

    for (const [i, m] of team.entries()) {
      if (!m.role || !m.title || !m.name || !m.phone || !m.email)
        return `Complete details for team member ${i + 1}`;
      if (!hasAtLeastOneSocial(m.socials))
        return `Provide at least one social handle for team member ${i + 1}`;
    }

    if (!research.duration) return 'Select research duration';
    if (!research.country || !research.stateRegion) return 'Complete research location';
    if (!research.title.trim()) return 'Enter research title';
    if (!research.sampleSize.trim()) return 'Enter sample size';
    if (!research.materials.some((m) => m.trim())) return 'Enter at least one research material';
    if (!research.laboratories.some((l) => l.name.trim()))
      return 'Enter at least one research laboratory';
    if (!research.procedures.some((p) => p.name.trim()))
      return 'Enter at least one analytical procedure';
    if (!research.proposalDoc) return 'Upload research proposal document';
    if (!research.budgetDoc) return 'Upload research budget document';
    if (research.scopes.length === 0) return 'Select at least one research scope';
    if (research.scopes.includes('Others') && !research.scopeOther.trim())
      return 'Specify other research scope';

    if (!impact.researchAim.trim()) return 'Enter research aim';
    if (!impact.objectives.some((o) => o.trim())) return 'Enter at least one research objective';
    if (!impact.expectedOutcomes.some((o) => o.trim()))
      return 'Enter at least one expected outcome';
    if (wordCount(impact.researchSummary) > 200)
      return 'Research summary must be 200 words or fewer';
    if (!form.formUndertaking) return 'Accept the undertaking statement to submit';

    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      toast.error(err);
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Research Support application submitted successfully!');
      onSubmitSuccess();
    }, 1200);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light p-6 sm:p-8"
    >
      <h2 className="text-2xl font-bold text-neutral-black mb-1">
        Research Support – Application Form
      </h2>
      <p className="text-neutral-gray-dark mb-6">
        Complete all required sections. Fields marked * are mandatory.
      </p>

      <div className="bg-brand-red-50 border border-brand-red-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-neutral-gray-dark mb-1">Selected Program</p>
        <p className="font-bold text-brand-red-600">Research Support</p>
        <p className="text-xs text-neutral-gray-medium mt-1">
          {getResearchCategory(form.head.researcherIdentity)} ·{' '}
          {getDisplayResearchLevel(form.head)} · Researchers: {researcherCount}
        </p>
      </div>

      <HeadResearcherSection
        value={form.head}
        onChange={(head) => setForm((f) => ({ ...f, head }))}
        onIdentityChange={handleIdentityChange}
      />
      <TeamMembersSection
        value={form.team}
        onChange={(team) => setForm((f) => ({ ...f, team }))}
      />
      <ResearchInfoSection
        head={form.head}
        value={form.research}
        researcherCount={researcherCount}
        onChange={(research) => setForm((f) => ({ ...f, research }))}
      />
      <ResearchImpactMediaSection
        impact={form.impact}
        media={form.media}
        formUndertaking={form.formUndertaking}
        onImpactChange={(impact) => setForm((f) => ({ ...f, impact }))}
        onMediaChange={(media) => setForm((f) => ({ ...f, media }))}
        onUndertakingChange={(formUndertaking) =>
          setForm((f) => ({ ...f, formUndertaking }))
        }
      />

      <div className="flex flex-col sm:flex-row gap-3">
        <Button type="button" variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <Button
          type="submit"
          className="bg-brand-red-600 hover:bg-brand-red-700 flex-1"
          disabled={isSubmitting || !form.formUndertaking}
        >
          {isSubmitting ? 'Submitting…' : 'Submit Application'}
        </Button>
      </div>
    </form>
  );
}
