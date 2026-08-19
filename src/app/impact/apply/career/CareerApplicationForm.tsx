'use client';

import { useMemo, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { toast } from 'sonner';
import {
  createInitialCareerForm,
  hasAtLeastOneSocial,
  wordCount,
  type CareerFormState,
} from './types';
import HeadProprietorSection from './HeadProprietorSection';
import CoOwnersSection from './CoOwnersSection';
import CompanySection from './CompanySection';
import BusinessPlanSection from './BusinessPlanSection';
import ImpactMediaSection from './ImpactMediaSection';

export default function CareerApplicationForm({
  user,
  onBack,
  onSubmitSuccess,
}: {
  user: { name?: string; email?: string; phone?: string };
  onBack: () => void;
  onSubmitSuccess: () => void;
}) {
  const [form, setForm] = useState<CareerFormState>(() => createInitialCareerForm(user));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ownerCount = useMemo(() => 1 + form.coOwners.length, [form.coOwners.length]);

  const validate = (): string | null => {
    if (!form.head.title) return 'Select head proprietor title';
    if (!form.head.phone) return 'Enter head proprietor phone number';
    if (!hasAtLeastOneSocial(form.head.socials)) return 'Provide at least one social handle for head proprietor';
    if (!form.head.displayImage) return 'Upload head proprietor display image';
    if (!form.head.idCard.type || !form.head.idCard.file) return 'Complete government ID card upload';
    if (form.head.idCard.type === 'Other' && !form.head.idCard.otherSpecify)
      return 'Specify other ID card type';
    if (!form.head.degreeCertificate) return 'Upload degree certificate';
    if (!form.head.experienceDocType || !form.head.experienceDoc)
      return 'Upload employment letter or training certificate';
    if (!form.head.cv) return 'Upload curriculum vitae';

    for (const [i, c] of form.coOwners.entries()) {
      if (!c.title || !c.name || !c.phone || !c.email)
        return `Complete details for secondary proprietor ${i + 1}`;
      if (!hasAtLeastOneSocial(c.socials))
        return `Provide at least one social handle for secondary proprietor ${i + 1}`;
    }

    if (!form.company.registrationStatus) return 'Select company registration status';
    if (form.company.registrationStatus === 'Registered' && !form.company.displayImage)
      return 'Upload business interior image (required for registered businesses)';
    if (!form.company.companyName || !form.company.companyAddress)
      return 'Complete company name and address';
    if (!form.company.country || !form.company.stateRegion) return 'Select country and state/region';
    if (!form.company.phone || !form.company.email) return 'Enter company phone and email';
    if (!hasAtLeastOneSocial(form.company.socials))
      return 'Provide at least one company social handle';

    if (!form.businessPlan.industry) return 'Select industry';
    if (form.businessPlan.industry === 'Other' && !form.businessPlan.industryOther)
      return 'Specify industry';
    if (!form.businessPlan.description.trim()) return 'Enter business description';
    if (wordCount(form.businessPlan.description) > 1000)
      return 'Business description must be 1000 words or fewer';
    if (!form.businessPlan.currentCustomerBase) return 'Select current customer base';
    if (!form.businessPlan.customerGrowthProjection) return 'Select customer growth projection';
    if (!form.businessPlan.budgetDocument) return 'Upload career budget breakdown document';
    if (!form.impact.careerPath) return 'Enter career path';
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
      toast.success('Career Support application submitted successfully!');
      onSubmitSuccess();
    }, 1200);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light p-6 sm:p-8"
    >
      <h2 className="text-2xl font-bold text-neutral-black mb-1">Career Support – Application Form</h2>
      <p className="text-neutral-gray-dark mb-6">
        Complete all required sections. Fields marked * are mandatory.
      </p>

      <div className="bg-brand-red-50 border border-brand-red-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-neutral-gray-dark mb-1">Selected Program</p>
        <p className="font-bold text-brand-red-600">Career Support</p>
        <p className="text-xs text-neutral-gray-medium mt-1">No. of Owners: {ownerCount}</p>
      </div>

      <HeadProprietorSection
        value={form.head}
        onChange={(head) => setForm((f) => ({ ...f, head }))}
      />
      <CoOwnersSection
        value={form.coOwners}
        onChange={(coOwners) => setForm((f) => ({ ...f, coOwners }))}
      />
      <CompanySection
        value={form.company}
        ownerCount={ownerCount}
        onChange={(company) => setForm((f) => ({ ...f, company }))}
      />
      <BusinessPlanSection
        value={form.businessPlan}
        onChange={(businessPlan) => setForm((f) => ({ ...f, businessPlan }))}
      />
      <ImpactMediaSection
        impact={form.impact}
        media={form.media}
        formUndertaking={form.formUndertaking}
        onImpactChange={(impact) => setForm((f) => ({ ...f, impact }))}
        onMediaChange={(media) => setForm((f) => ({ ...f, media }))}
        onUndertakingChange={(formUndertaking) => setForm((f) => ({ ...f, formUndertaking }))}
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
