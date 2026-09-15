'use client';

import { useState } from 'react';
import { ArrowLeft, Target, ImageIcon, Users } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { toast } from 'sonner';
import {
  FieldLabel,
  SectionCard,
  TextArea,
  MultiStringList,
} from '../components/FormField';
import MediaGroupUpload from '../components/MediaGroupUpload';
import {
  createInitialScholarshipForm,
  hasAtLeastOneSocial,
  type ScholarshipFormState,
} from './types';
import ApplicantSection from './ApplicantSection';
import SchoolSection from './SchoolSection';
import GuardianSection from './GuardianSection';

export default function ScholarshipApplicationForm({
  user,
  onBack,
  onSubmitSuccess,
}: {
  user: { name?: string; email?: string; phone?: string };
  onBack: () => void;
  onSubmitSuccess: () => void;
}) {
  const [form, setForm] = useState<ScholarshipFormState>(() =>
    createInitialScholarshipForm(user)
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): string | null => {
    const { applicant, school, guardians, impact } = form;
    if (!applicant.title) return 'Select title';
    if (!applicant.phone) return 'Enter phone number';
    if (!hasAtLeastOneSocial(applicant.socials))
      return 'Provide at least one social handle';
    if (!applicant.displayImage) return 'Upload facial display image';
    if (!applicant.idCard.type || !applicant.idCard.file)
      return 'Complete government ID card upload';
    if (applicant.idCard.type === 'Other' && !applicant.idCard.otherSpecify)
      return 'Specify other ID card type';

    if (!school.institutionName || !school.institutionAddress)
      return 'Complete institution name and address';
    if (!school.country || !school.stateRegion) return 'Select country and state/region';
    if (!school.departmentName) return 'Enter department name';
    if (!school.matricNo) return 'Enter matriculation/registration number';
    if (!school.academicYear) return 'Enter academic year';
    if (!school.currentCgpa) return 'Enter current CGPA';
    const cgpa = parseFloat(school.currentCgpa);
    if (Number.isNaN(cgpa) || cgpa < 3.0) return 'Current CGPA must be at least 3.0';
    if (!school.schoolIdCard) return 'Upload school registration / ID document';

    for (const g of guardians) {
      if (!g.title || !g.name || !g.phone) return 'Complete guardian details';
      if (!g.idCard.type || !g.idCard.file) return 'Complete guardian ID card upload';
      if (g.idCard.type === 'Other' && !g.idCard.otherSpecify)
        return 'Specify guardian ID card type';
    }

    if (!impact.problemsEncountered.some((p) => p.trim()))
      return 'Enter at least one problem encountered';
    if (!impact.expectedOutcome.some((o) => o.trim()))
      return 'Enter at least one expected outcome';
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
      toast.success('Educational Scholarship application submitted successfully!');
      onSubmitSuccess();
    }, 1200);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light p-6 sm:p-8"
    >
      <h2 className="text-2xl font-bold text-neutral-black mb-1">
        Educational Scholarship – Application Form
      </h2>
      <p className="text-neutral-gray-dark mb-6">
        Complete registration details for tertiary scholarship aid. Fields marked * are mandatory.
      </p>

      <div className="bg-brand-red-50 border border-brand-red-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-neutral-gray-dark mb-1">Selected Program</p>
        <p className="font-bold text-brand-red-600">Educational Scholarship</p>
      </div>

      <ApplicantSection
        value={form.applicant}
        onChange={(applicant) => setForm((f) => ({ ...f, applicant }))}
      />
      <SchoolSection
        value={form.school}
        academicLevel={form.applicant.academicLevel || form.applicant.academicLevelOther}
        onChange={(school) => setForm((f) => ({ ...f, school }))}
      />
      <GuardianSection
        value={form.guardians}
        onChange={(guardians) => setForm((f) => ({ ...f, guardians }))}
      />

      <SectionCard
        title="Impact Assessment"
        icon={<Target className="h-5 w-5 text-brand-red-600" />}
        badge="Required"
        defaultOpen={false}
      >
        <div className="space-y-4">
          <MultiStringList
            label="Problems Encountered"
            required
            info="Mention the specific challenges you're currently experiencing in your academic journey."
            values={form.impact.problemsEncountered}
            onChange={(problemsEncountered) =>
              setForm((f) => ({ ...f, impact: { ...f.impact, problemsEncountered } }))
            }
          />
          <MultiStringList
            label="Expected Outcome"
            required
            info="What end-results are you hoping to achieve in your academic journey with this scholarship program?"
            values={form.impact.expectedOutcome}
            onChange={(expectedOutcome) =>
              setForm((f) => ({
                ...f,
                impact: { ...f.impact, expectedOutcome },
              }))
            }
          />
          <MultiStringList
            label="Outcomes After Intervention"
            info="What were the actual results that were achieved with this scholarship intervention?"
            values={form.impact.outcomesAfterIntervention}
            onChange={(outcomesAfterIntervention) =>
              setForm((f) => ({
                ...f,
                impact: { ...f.impact, outcomesAfterIntervention },
              }))
            }
          />
          <div>
            <FieldLabel>Your Story</FieldLabel>
            <TextArea
              value={form.impact.story}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  impact: { ...f.impact, story: e.target.value },
                }))
              }
              placeholder="Give a detailed background story, highlighting the events and circumstances that surrounds your academic journey and need for support (1000 words max)."
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Media Gallery"
        icon={<ImageIcon className="h-5 w-5 text-brand-red-600" />}
        defaultOpen={false}
      >
        <div className="grid gap-6">
          <MediaGroupUpload
            label="Screening Exercise"
            files={form.media.screeningExercise}
            onChange={(screeningExercise) =>
              setForm((f) => ({ ...f, media: { ...f.media, screeningExercise } }))
            }
          />
          <MediaGroupUpload
            label="Clearance & Funding"
            files={form.media.clearanceFunding}
            onChange={(clearanceFunding) =>
              setForm((f) => ({ ...f, media: { ...f.media, clearanceFunding } }))
            }
          />
          <MediaGroupUpload
            label="Project Completion"
            files={form.media.projectCompletion}
            onChange={(projectCompletion) =>
              setForm((f) => ({ ...f, media: { ...f.media, projectCompletion } }))
            }
          />
          <MediaGroupUpload
            label="Award Ceremony"
            files={form.media.awardCeremony}
            onChange={(awardCeremony) =>
              setForm((f) => ({ ...f, media: { ...f.media, awardCeremony } }))
            }
          />
        </div>
      </SectionCard>

      <label className="flex items-start gap-3 p-4 bg-neutral-bg-light rounded-lg cursor-pointer mb-6 border border-neutral-gray-light">
        <input
          type="checkbox"
          checked={form.formUndertaking}
          onChange={(e) => setForm((f) => ({ ...f, formUndertaking: e.target.checked }))}
          className="rounded border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600 mt-1"
          required
        />
        <span className="text-sm text-neutral-gray-dark">
          I confirm that all information provided are accurate, that all uploaded documents are
          valid, and that I accept the terms and conditions of this service.
        </span>
      </label>

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
