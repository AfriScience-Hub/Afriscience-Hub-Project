'use client';

import { useState } from 'react';
import { ArrowLeft, Send, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuth } from '@/app/context/AuthContext';
import FormActions from '@/app/dashboard/upload-new-listing/components/FormActions';
import UndertakingSection from '@/app/dashboard/upload-new-listing/components/UndertakingSection';
import { type DocEntry, EMPTY_DOC } from '@/app/dashboard/upload-new-listing/components/DocList';
import ScientistProfileSection from '@/app/dashboard/upload-new-listing/components/scientist-listing/components/ScientistProfileSection';
import ProfessionalDetailsSection from '@/app/dashboard/upload-new-listing/components/scientist-listing/components/ProfessionalDetailsSection';
import ScientistFeesSection from '@/app/dashboard/upload-new-listing/components/scientist-listing/components/ScientistFeesSection';
import ScientistScopePolicySection from '@/app/dashboard/upload-new-listing/components/scientist-listing/components/ScientistScopePolicySection';
import ScientistDocumentsSection from '@/app/dashboard/upload-new-listing/components/scientist-listing/components/ScientistDocumentsSection';
import ProfessionalHighlightSection from '@/app/dashboard/upload-new-listing/components/scientist-listing/components/ProfessionalHighlightSection';
import ScientistGallerySection, { type MediaItem } from '@/app/dashboard/upload-new-listing/components/scientist-listing/components/ScientistGallerySection';
import ScientistContactSection from '@/app/dashboard/upload-new-listing/components/scientist-listing/components/ScientistContactSection';
import type { ProfessionalDetails, ProfessionalHighlight, ScientistContact, ScientistFees, ScientistProfile } from '@/app/dashboard/upload-new-listing/components/scientist-listing/types';

const EMPTY_PROFILE: ScientistProfile = {
  profileImage: null, backgroundImage: null, name: '', country: '', stateRegion: '', bio: '',
};

const EMPTY_DETAILS: ProfessionalDetails = {
  field: '', professions: [], professionOther: '', degree: '', degreeCertificate: '', services: [],
};

const EMPTY_FEES: ScientistFees = { serviceCosts: {}, otherCharges: [] };

const EMPTY_CONTACT: ScientistContact = {
  phone: '', email: '', website: '',
  socials: { LinkedIn: '', Twitter: '', Instagram: '', Facebook: '' },
};

const EMPTY_HIGHLIGHT: ProfessionalHighlight = { responseTime: '', workDays: [], workHours: [] };

/**
 * Admin counterpart of the dashboard scientist form. It composes the exact
 * same section components, but the submit only creates the listing on the
 * admin side and returns to the scientists overview.
 */
export default function AdminCreateScientistPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [profile, setProfile] = useState<ScientistProfile>(EMPTY_PROFILE);
  const [details, setDetails] = useState<ProfessionalDetails>(EMPTY_DETAILS);
  const [fees, setFees] = useState<ScientistFees>(EMPTY_FEES);
  const [scopes, setScopes] = useState<string[]>([]);
  const [policies, setPolicies] = useState<string[]>([]);
  const [certifications, setCertifications] = useState<DocEntry[]>([EMPTY_DOC]);
  const [achievements, setAchievements] = useState<DocEntry[]>([EMPTY_DOC]);
  const [highlight, setHighlight] = useState<ProfessionalHighlight>(EMPTY_HIGHLIGHT);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [contact, setContact] = useState<ScientistContact>(EMPTY_CONTACT);
  const [agreed, setAgreed] = useState(false);
  const [saving, setSaving] = useState(false);

  const patchProfile = (patch: Partial<ScientistProfile>) => setProfile((prev) => ({ ...prev, ...patch }));
  const patchDetails = (patch: Partial<ProfessionalDetails>) => setDetails((prev) => ({ ...prev, ...patch }));
  const patchFees = (patch: Partial<ScientistFees>) => setFees((prev) => ({ ...prev, ...patch }));
  const patchHighlight = (patch: Partial<ProfessionalHighlight>) => setHighlight((prev) => ({ ...prev, ...patch }));
  const patchContact = (patch: Partial<ScientistContact>) => setContact((prev) => ({ ...prev, ...patch }));

  const resetForm = () => {
    setProfile(EMPTY_PROFILE);
    setDetails(EMPTY_DETAILS);
    setFees(EMPTY_FEES);
    setScopes([]); setPolicies([]); setCertifications([EMPTY_DOC]); setAchievements([EMPTY_DOC]);
    setHighlight(EMPTY_HIGHLIGHT);
    setMedia([]); setContact(EMPTY_CONTACT); setAgreed(false);
  };

  const hasAnySocial = Object.values(contact.socials).some((v) => v.trim().length > 0);
  const bioWords = profile.bio.trim() ? profile.bio.trim().split(/\s+/).length : 0;
  const certificatesOk = !details.degree || ['Field Expert | No Degree', 'Others'].includes(details.degree) || !!details.degreeCertificate;
  const highlightOk = !!highlight.responseTime && highlight.workDays.length > 0 && highlight.workHours.length > 0;

  const isFormValid =
    profile.name.trim() && profile.country && profile.bio.trim() && bioWords <= 1000 &&
    details.field && details.professions.length > 0 && details.degree &&
    (details.professions.includes('Other') ? details.professionOther.trim() : true) &&
    details.services.length > 0 && certificatesOk && highlightOk &&
    contact.phone.trim() && contact.email.trim() && hasAnySocial && agreed;

  const handleSubmit = () => {
    if (bioWords > 1000) return toast.error('Short Bio must be a maximum of 1000 words');
    if (!profile.name.trim() || !profile.country) return toast.error('Please fill in the Name and Country');
    if (!details.field) return toast.error('Please select a Field');
    if (details.professions.length === 0) return toast.error('Please select at least one Profession');
    if (details.professions.includes('Other') && !details.professionOther.trim()) return toast.error('Please specify the other Profession');
    if (!details.degree) return toast.error('Please select a Degree');
    if (!certificatesOk) return toast.error('Please upload the Degree Certificate to verify the academic qualification');
    if (!highlight.responseTime) return toast.error('Please select a Response Time');
    if (highlight.workDays.length === 0) return toast.error('Please select at least one Work Day');
    if (highlight.workHours.length === 0) return toast.error('Please add at least one Work Hour');
    if (details.services.length === 0) return toast.error('Please select at least one Service');
    if (!contact.phone.trim() || !contact.email.trim()) return toast.error('Please provide the Phone Number and E-mail');
    if (!hasAnySocial) return toast.error('Please provide at least one social handle');
    if (!agreed) return toast.error('Please accept the undertaking remark before submitting');

    setSaving(true);
    toast.success('Listing submitted. It will appear in the queue for review before it is published.');
    resetForm();
    setTimeout(() => {
      setSaving(false);
      router.push('/admin/categories/scientists-technologies');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link
            href="/admin/categories/scientists-technologies"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#453DD8] hover:underline mb-1.5"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Scientists &amp; Technologists
          </Link>
          <h1 className="text-lg font-bold text-neutral-black">Create Scientist Listing</h1>
          <p className="text-xs text-neutral-gray-medium mt-0.5">
            Fill in the scientist details below. New listings are created directly under the platform. Signed in as{' '}
            <span className="font-medium text-neutral-black">{user?.name || 'Platform Administrator'}</span>.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={saving}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#453DD8] text-white rounded-lg text-xs font-medium hover:bg-[#3a33c0] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
          Create Listing
        </button>
      </div>

      <ScientistProfileSection profile={profile} onChange={patchProfile} />

      <ProfessionalDetailsSection details={details} onChange={patchDetails} />

      <ScientistFeesSection services={details.services} fees={fees} onChange={patchFees} />

      <ScientistScopePolicySection scopes={scopes} setScopes={setScopes} policies={policies} setPolicies={setPolicies} />

      <ScientistDocumentsSection
        certifications={certifications} setCertifications={setCertifications}
        achievements={achievements} setAchievements={setAchievements}
      />

      <ProfessionalHighlightSection highlight={highlight} onChange={patchHighlight} />

      <ScientistGallerySection media={media} onChange={setMedia} />

      <ScientistContactSection contact={contact} onChange={patchContact} />

      <UndertakingSection agreed={agreed} setAgreed={setAgreed} />

      <FormActions
        onCancel={() => { resetForm(); router.push('/admin/categories/scientists-technologies'); }}
        onSubmit={handleSubmit}
        disabled={!isFormValid}
      />
    </div>
  );
}
