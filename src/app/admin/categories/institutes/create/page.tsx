'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Send, Loader2, Building2, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useAuth } from '@/app/context/AuthContext';
import InstituteTypeSelectorModal, { isInstituteSubType, type InstituteSubType } from '@/app/dashboard/components/InstituteTypeSelectorModal';
import CollapsibleSection from '@/app/dashboard/upload-new-listing/components/CollapsibleSection';
import FormActions from '@/app/dashboard/upload-new-listing/components/FormActions';
import UndertakingSection from '@/app/dashboard/upload-new-listing/components/UndertakingSection';
import YourInformationSection from '@/app/dashboard/upload-new-listing/components/primary-secondary-listing/components/YourInformationSection';
import SchoolIdentitySection from '@/app/dashboard/upload-new-listing/components/primary-secondary-listing/components/SchoolIdentitySection';
import SchoolInformationSection from '@/app/dashboard/upload-new-listing/components/primary-secondary-listing/components/SchoolInformationSection';
import AcademicInformationSection from '@/app/dashboard/upload-new-listing/components/primary-secondary-listing/components/AcademicInformationSection';
import LicensesAchievementsSection from '@/app/dashboard/upload-new-listing/components/primary-secondary-listing/components/LicensesAchievementsSection';
import DownloadableResourcesSection from '@/app/dashboard/upload-new-listing/components/primary-secondary-listing/components/DownloadableResourcesSection';
import SchoolHighlightSection from '@/app/dashboard/upload-new-listing/components/primary-secondary-listing/components/SchoolHighlightSection';
import type { SchoolIdentity, SchoolInformation, AcademicInformation, LicensesAchievements, DownloadableResources, SchoolHighlight } from '@/app/dashboard/upload-new-listing/components/primary-secondary-listing/types';
import { EMPTY_IDENTITY, EMPTY_INFORMATION, EMPTY_ACADEMIC, EMPTY_LICENSES, EMPTY_RESOURCES, EMPTY_HIGHLIGHT } from '@/app/dashboard/upload-new-listing/components/primary-secondary-listing/types';

/**
 * Admin Create Institute form. The type selector lives on the overview page and
 * passes the chosen type through `?type=`; this page renders the matching
 * dashboard form composed for admin use.
 */
function CreateInstituteContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const typeParam = searchParams.get('type');
  const subType: InstituteSubType | null = isInstituteSubType(typeParam) ? typeParam : null;

  const [showTypeModal, setShowTypeModal] = useState(false);
  const [saving, setSaving] = useState(false);

  // Primary & Secondary form state.
  const [identity, setIdentity] = useState<SchoolIdentity>(EMPTY_IDENTITY);
  const [information, setInformation] = useState<SchoolInformation>(EMPTY_INFORMATION);
  const [academic, setAcademic] = useState<AcademicInformation>(EMPTY_ACADEMIC);
  const [licenses, setLicenses] = useState<LicensesAchievements>(EMPTY_LICENSES);
  const [resources, setResources] = useState<DownloadableResources>(EMPTY_RESOURCES);
  const [highlight, setHighlight] = useState<SchoolHighlight>(EMPTY_HIGHLIGHT);
  const [agreed, setAgreed] = useState(false);

  // Deep-linked without a type — send them back to the overview to pick one.
  useEffect(() => {
    if (!subType) router.replace('/admin/categories/institutes');
  }, [subType, router]);

  const patchIdentity = (patch: Partial<SchoolIdentity>) => setIdentity((prev) => ({ ...prev, ...patch }));
  const patchInformation = (patch: Partial<SchoolInformation>) => setInformation((prev) => ({ ...prev, ...patch }));
  const patchAcademic = (patch: Partial<AcademicInformation>) => setAcademic((prev) => ({ ...prev, ...patch }));
  const patchLicenses = (patch: Partial<LicensesAchievements>) => setLicenses((prev) => ({ ...prev, ...patch }));
  const patchResources = (patch: Partial<DownloadableResources>) => setResources((prev) => ({ ...prev, ...patch }));
  const patchHighlight = (patch: Partial<SchoolHighlight>) => setHighlight((prev) => ({ ...prev, ...patch }));

  const resetForm = () => {
    setIdentity(EMPTY_IDENTITY); setInformation(EMPTY_INFORMATION); setAcademic(EMPTY_ACADEMIC);
    setLicenses(EMPTY_LICENSES); setResources(EMPTY_RESOURCES); setHighlight(EMPTY_HIGHLIGHT); setAgreed(false);
  };

  const yourInfo = {
    fullName: user?.name || 'Platform Administrator',
    phone: user?.phone || '',
    email: user?.email || '',
    username: user?.email?.split('@')[0] || 'admin',
  };

  const hasAnySocial = Object.values(identity.socials).some((v) => v.trim().length > 0);
  const descriptionWords = identity.description.trim() ? identity.description.trim().split(/\s+/).length : 0;

  const isFormValid =
    subType === 'primary-secondary' &&
    identity.name.trim() && identity.address.trim() && identity.country &&
    identity.phone.trim() && identity.email.trim() && identity.description.trim() &&
    descriptionWords <= 1000 && hasAnySocial &&
    information.class && information.program && information.gender && information.ownership &&
    information.services.length > 0 && agreed;

  const handleSubmit = () => {
    if (descriptionWords > 1000) return toast.error('School Description must be a maximum of 1000 words');
    if (!hasAnySocial) return toast.error('Please provide at least one social handle');
    if (!information.class) return toast.error('Please select a Class');
    if (!information.program) return toast.error('Please select a Program');
    if (!information.gender) return toast.error('Please select a Gender');
    if (!information.ownership) return toast.error('Please select an Ownership type');
    if (information.services.length === 0) return toast.error('Please select at least one Service');
    if (!agreed) return toast.error('Please accept the undertaking remark before submitting');

    setSaving(true);
    toast.success('Listing submitted. It will appear in the queue for review before it is published.');
    resetForm();
    setTimeout(() => { setSaving(false); router.push('/admin/categories/institutes'); }, 1200);
  };

  const goBack = () => router.push('/admin/categories/institutes');

  // No valid ?type= — the effect above is redirecting back to the overview.
  if (!subType) return null;

  return (
    <div className="space-y-6">
      {/* Optional in-page reselector reachable from "Change type". */}
      <InstituteTypeSelectorModal
        isOpen={showTypeModal}
        onClose={() => setShowTypeModal(false)}
        onSelectInstituteType={(t) => {
          setShowTypeModal(false);
          router.replace(`/admin/categories/institutes/create?type=${t}`);
        }}
        title="Select institute type"
        subtitle="Choose the type of institute you want to create"
      />

      {/* Header with a "change type" affordance once a type is selected. */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link href="/admin/categories/institutes" className="inline-flex items-center gap-1.5 text-xs font-medium text-[#453DD8] hover:underline mb-1.5">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Institutes
          </Link>
          <h1 className="text-lg font-bold text-neutral-black flex items-center gap-2">
            {subType === 'university' ? <GraduationCap className="h-5 w-5 text-brand-red-600" /> : <Building2 className="h-5 w-5 text-brand-red-600" />}
            {subType === 'university' ? 'Create University Listing' : 'Create Primary & Secondary Listing'}
          </h1>
          <p className="text-xs text-neutral-gray-medium mt-0.5">
            Fill in the institute details below. Signed in as <span className="font-medium text-neutral-black">{yourInfo.fullName}</span>.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setShowTypeModal(true)}
            className="px-3.5 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs font-semibold hover:bg-neutral-bg-light cursor-pointer">
            Change type
          </button>
          {subType === 'primary-secondary' && (
            <button type="button" onClick={handleSubmit} disabled={saving}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#453DD8] text-white rounded-lg text-xs font-medium hover:bg-[#3a33c0] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
              {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />} Create Listing
            </button>
          )}
        </div>
      </div>

      {subType === 'primary-secondary' && (
        <>
          <YourInformationSection info={yourInfo} />

          <CollapsibleSection title="School identity" icon={<Building2 className="h-5 w-5 text-brand-red-600" />} badge="Required">
            <SchoolIdentitySection identity={identity} onChange={patchIdentity} />
          </CollapsibleSection>

          <CollapsibleSection title="School information" icon={<Building2 className="h-5 w-5 text-brand-red-600" />} badge="Required" defaultOpen={false}>
            <SchoolInformationSection info={information} onChange={patchInformation} />
          </CollapsibleSection>

          <CollapsibleSection title="Academic information" icon={<GraduationCap className="h-5 w-5 text-brand-red-600" />} badge="Required" defaultOpen={false}>
            <AcademicInformationSection info={academic} onChange={patchAcademic} schoolClass={information.class} />
          </CollapsibleSection>

          <CollapsibleSection title="Licenses & achievements" icon={<Building2 className="h-5 w-5 text-brand-navy-900" />} defaultOpen={false}>
            <LicensesAchievementsSection data={licenses} onChange={patchLicenses} />
          </CollapsibleSection>

          <CollapsibleSection title="Downloadable resources" icon={<Building2 className="h-5 w-5 text-brand-red-600" />} defaultOpen={false}>
            <DownloadableResourcesSection data={resources} onChange={patchResources} />
          </CollapsibleSection>

          <CollapsibleSection title="School highlight" icon={<Building2 className="h-5 w-5 text-brand-red-600" />} defaultOpen={false}>
            <SchoolHighlightSection highlight={highlight} onChange={patchHighlight} />
          </CollapsibleSection>

          <UndertakingSection agreed={agreed} setAgreed={setAgreed} />

          <FormActions onCancel={() => { resetForm(); goBack(); }} onSubmit={handleSubmit} disabled={!isFormValid} />
        </>
      )}

      {subType === 'university' && (
        <div className="rounded-xl border border-dashed border-neutral-gray-light bg-white p-10 text-center">
          <GraduationCap className="h-10 w-10 text-neutral-gray-medium mx-auto mb-3" />
          <h3 className="text-sm font-bold text-neutral-black mb-1">University listing form</h3>
          <p className="text-xs text-neutral-gray-medium max-w-md mx-auto">
            The university listing form is coming soon. Select <span className="font-medium text-neutral-black">Primary &amp; Secondary</span> to create a school listing in the meantime.
          </p>
        </div>
      )}
    </div>
  );
}

export default function AdminCreateInstitutePage() {
  return (
    <Suspense fallback={<div className="min-h-[40vh]" />}>
      <CreateInstituteContent />
    </Suspense>
  );
}
