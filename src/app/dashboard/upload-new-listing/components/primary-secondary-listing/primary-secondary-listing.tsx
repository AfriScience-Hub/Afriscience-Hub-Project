'use client';

import { useEffect, useState } from 'react';
import { IdCard, Building2, DollarSign, Flag, ShieldCheck, ImagePlus, GraduationCap, Download, ClipboardCheck } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/app/context/AuthContext';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchFullProfile } from '@/store/profileSlice';
import CollapsibleSection from '../CollapsibleSection';
import FormActions from '../FormActions';
import ListingSuccessModal from '../ListingSuccessModal';
import UndertakingSection from '../UndertakingSection';
import { useRouter } from 'next/navigation';
import YourInformationSection from './components/YourInformationSection';
import SchoolIdentitySection from './components/SchoolIdentitySection';
import SchoolInformationSection from './components/SchoolInformationSection';
import AcademicInformationSection from './components/AcademicInformationSection';
import LicensesAchievementsSection from './components/LicensesAchievementsSection';
import DownloadableResourcesSection from './components/DownloadableResourcesSection';
import SchoolHighlightSection from './components/SchoolHighlightSection';
import type { YourInformation } from './types';
import type { SchoolIdentity, SchoolInformation, AcademicInformation, LicensesAchievements, DownloadableResources, SchoolHighlight } from './types';
import { EMPTY_IDENTITY, EMPTY_INFORMATION, EMPTY_ACADEMIC, EMPTY_LICENSES, EMPTY_RESOURCES, EMPTY_HIGHLIGHT } from './types';

interface PrimarySecondaryListingProps {
  onCancel: () => void;
}

export default function PrimarySecondaryListing({ onCancel }: PrimarySecondaryListingProps) {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const router = useRouter();
  const personal = useAppSelector((s) => s.profile.personal);

  const [identity, setIdentity] = useState<SchoolIdentity>(EMPTY_IDENTITY);
  const [information, setInformation] = useState<SchoolInformation>(EMPTY_INFORMATION);
  const [academic, setAcademic] = useState<AcademicInformation>(EMPTY_ACADEMIC);
  const [licenses, setLicenses] = useState<LicensesAchievements>(EMPTY_LICENSES);
  const [resources, setResources] = useState<DownloadableResources>(EMPTY_RESOURCES);
  const [highlight, setHighlight] = useState<SchoolHighlight>(EMPTY_HIGHLIGHT);
  const [agreed, setAgreed] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const finish = () => {
    setShowSuccess(false);
    resetForm();
    onCancel();
  };

  useEffect(() => { dispatch(fetchFullProfile()); }, [dispatch]);

  const fullName = personal?.fullName || (personal ? [personal.firstname, personal.middlename, personal.surname].filter(Boolean).join(' ') : (user?.name || ''));
  const profilePhone = personal?.phone || user?.phone || '';
  const profileEmail = (personal as any)?.email || user?.email || '';
  const username = (personal as any)?.username || profileEmail.split('@')[0] || '—';

  const yourInfo: YourInformation = { fullName, phone: profilePhone, email: profileEmail, username };

  useEffect(() => {
    setIdentity(prev => ({
      ...prev,
      phone: prev.phone || profilePhone,
      email: prev.email || profileEmail,
    }));
  }, [profilePhone, profileEmail]);

  const patchIdentity = (patch: Partial<SchoolIdentity>) => setIdentity(prev => ({ ...prev, ...patch }));
  const patchInformation = (patch: Partial<SchoolInformation>) => setInformation(prev => ({ ...prev, ...patch }));
  const patchAcademic = (patch: Partial<AcademicInformation>) => setAcademic(prev => ({ ...prev, ...patch }));
  const patchLicenses = (patch: Partial<LicensesAchievements>) => setLicenses(prev => ({ ...prev, ...patch }));
  const patchResources = (patch: Partial<DownloadableResources>) => setResources(prev => ({ ...prev, ...patch }));
  const patchHighlight = (patch: Partial<SchoolHighlight>) => setHighlight(prev => ({ ...prev, ...patch }));

  const resetForm = () => {
    setIdentity(EMPTY_IDENTITY);
    setInformation(EMPTY_INFORMATION);
    setAcademic(EMPTY_ACADEMIC);
    setLicenses(EMPTY_LICENSES);
    setResources(EMPTY_RESOURCES);
    setHighlight(EMPTY_HIGHLIGHT);
    setAgreed(false);
  };

  const hasAnySocial = Object.values(identity.socials).some(v => v.trim().length > 0);
  const descriptionWords = identity.description.trim() ? identity.description.trim().split(/\s+/).length : 0;

  const isFormValid =
    identity.name.trim() && identity.address.trim() && identity.country &&
    identity.phone.trim() && identity.email.trim() && identity.description.trim() &&
    descriptionWords <= 1000 && hasAnySocial &&
    information.class && information.program && information.gender && information.ownership &&
    (information.ownership !== 'Other' || information.ownershipOther.trim()) &&
    information.services.length > 0 &&
    academic.academicCalendar.every(t => t.startDate && t.midtermBreakDate && t.closureDate) &&
    agreed &&
    fullName && profileEmail;

  const handleSubmit = () => {
    if (descriptionWords > 1000) return toast.error('School Description must be a maximum of 1000 words');
    if (!hasAnySocial) return toast.error('Please provide at least one social handle');
    if (!information.class) return toast.error('Please select a Class');
    if (!information.program) return toast.error('Please select a Program');
    if (!information.gender) return toast.error('Please select a Gender');
    if (!information.ownership) return toast.error('Please select an Ownership type');
    if (information.ownership === 'Other' && !information.ownershipOther.trim()) return toast.error('Please specify the Ownership type');
    if (information.services.length === 0) return toast.error('Please select at least one Service');
    if (!academic.academicCalendar.every(t => t.startDate && t.midtermBreakDate && t.closureDate)) return toast.error('Please fill in all Academic Calendar dates for all three terms');
    if (!agreed) return toast.error('Please accept the undertaking remark before submitting');
    if (!identity.name.trim() || !identity.country) return toast.error('Please fill in the School Name and Country');
    if (!fullName || !profileEmail) return toast.error('Your platform information is incomplete — please complete your profile first');

    setShowSuccess(true);
  };

  return (
    <>
      <YourInformationSection info={yourInfo} />

      <CollapsibleSection title="2. School identity" icon={<Building2 className="h-5 w-5 text-brand-red-600" />} badge="Required">
        <SchoolIdentitySection identity={identity} onChange={patchIdentity} />
      </CollapsibleSection>

      <CollapsibleSection title="3. School information" icon={<Building2 className="h-5 w-5 text-brand-red-600" />} badge="Required" defaultOpen={false}>
        <SchoolInformationSection info={information} onChange={patchInformation} />
      </CollapsibleSection>

      <CollapsibleSection title="4. Academic information" icon={<GraduationCap className="h-5 w-5 text-brand-red-600" />} badge="Required" defaultOpen={false}>
        <AcademicInformationSection info={academic} onChange={patchAcademic} schoolClass={information.class} />
      </CollapsibleSection>

      <CollapsibleSection title="5. Licenses & achievements" icon={<ShieldCheck className="h-5 w-5 text-brand-navy-900" />} defaultOpen={false}>
        <LicensesAchievementsSection data={licenses} onChange={patchLicenses} />
      </CollapsibleSection>

      <CollapsibleSection title="6. Downloadable resources" icon={<Download className="h-5 w-5 text-brand-red-600" />} defaultOpen={false}>
        <DownloadableResourcesSection data={resources} onChange={patchResources} />
      </CollapsibleSection>

      <CollapsibleSection title="7. School highlight" icon={<ImagePlus className="h-5 w-5 text-brand-red-600" />} defaultOpen={false}>
        <SchoolHighlightSection highlight={highlight} onChange={patchHighlight} />
      </CollapsibleSection>

      <UndertakingSection agreed={agreed} setAgreed={setAgreed} />

      <FormActions
        onCancel={() => { resetForm(); onCancel(); }}
        onSubmit={handleSubmit}
        disabled={!isFormValid}
      />

      <ListingSuccessModal
        open={showSuccess}
        title="School listing submitted"
        message="Your primary/secondary school listing has been submitted and is now waiting for review."
        onClose={finish}
        onGoToSubmissions={() => { finish(); router.push('/dashboard/submissions'); }}
      />
    </>
  );
}