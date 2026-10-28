'use client';

import { useEffect, useState } from 'react';
import { IdCard, Microscope, DollarSign, Flag, ShieldCheck, ImagePlus, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/app/context/AuthContext';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchFullProfile } from '@/store/profileSlice';
import CollapsibleSection from '../CollapsibleSection';
import FormActions from '../FormActions';
import ListingSuccessModal from '../ListingSuccessModal';
import { useRouter } from 'next/navigation';
import YourInformationSection, { type YourInformation } from './components/YourInformationSection';
import CenterIdentitySection from './components/CenterIdentitySection';
import CenterInformationSection from './components/CenterInformationSection';
import CenterFeesSection from './components/CenterFeesSection';
import CenterScopePolicySection from './components/CenterScopePolicySection';
import CenterDocumentsSection from './components/CenterDocumentsSection';
import CenterHighlightSection from './components/CenterHighlightSection';
import CenterGallerySection from './components/CenterGallerySection';
import UndertakingSection from '../UndertakingSection';
import type { CenterDocEntry, CenterFees, CenterHighlight, CenterIdentity, CenterInformation } from './types';
import type { MediaItem } from './components/CenterGallerySection';

const EMPTY_IDENTITY: CenterIdentity = {
  profileImage: null, backgroundImage: null, name: '', motto: '', address: '',
  country: '', stateRegion: '', phone: '', email: '', website: '',
  socials: { LinkedIn: '', Twitter: '', Instagram: '', Facebook: '' },
  description: '',
};

const EMPTY_INFO: CenterInformation = {
  field: '', categories: [], categoryOther: '', ownership: '', ownershipOther: '', services: [],
};

const EMPTY_FEES: CenterFees = { serviceFees: {}, otherFees: [] };

const EMPTY_HIGHLIGHT: CenterHighlight = { responseTime: '', workDays: [], workHours: [] };

const EMPTY_LICENSE: CenterDocEntry = { name: '', issuer: '', year: '', file: null, previewUrl: null };

interface SpecialistCenterListingProps {
  onCancel: () => void;
}

export default function SpecialistCenterListing({ onCancel }: SpecialistCenterListingProps) {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const router = useRouter();
  const personal = useAppSelector((s) => s.profile.personal);

  const [identity, setIdentity] = useState<CenterIdentity>(EMPTY_IDENTITY);
  const [info, setInfo] = useState<CenterInformation>(EMPTY_INFO);
  const [fees, setFees] = useState<CenterFees>(EMPTY_FEES);
  const [scopes, setScopes] = useState<string[]>([]);
  const [policies, setPolicies] = useState<string[]>([]);
  const [licenses, setLicenses] = useState<CenterDocEntry[]>([{ ...EMPTY_LICENSE }]);
  const [awards, setAwards] = useState<CenterDocEntry[]>([]);
  const [highlight, setHighlight] = useState<CenterHighlight>(EMPTY_HIGHLIGHT);
  const [gallery, setGallery] = useState<Record<string, MediaItem[]>>({});
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

  const patchIdentity = (patch: Partial<CenterIdentity>) => setIdentity(prev => ({ ...prev, ...patch }));
  const patchInfo = (patch: Partial<CenterInformation>) => setInfo(prev => ({ ...prev, ...patch }));
  const patchFees = (patch: Partial<CenterFees>) => setFees(prev => ({ ...prev, ...patch }));
  const patchHighlight = (patch: Partial<CenterHighlight>) => setHighlight(prev => ({ ...prev, ...patch }));

  const resetForm = () => {
    setIdentity(EMPTY_IDENTITY);
    setInfo(EMPTY_INFO);
    setFees(EMPTY_FEES);
    setScopes([]); setPolicies([]); setLicenses([{ ...EMPTY_LICENSE }]); setAwards([]);
    setHighlight(EMPTY_HIGHLIGHT);
    setGallery({}); setAgreed(false);
  };

  const hasAnySocial = Object.values(identity.socials).some(v => v.trim().length > 0);
  const descriptionWords = identity.description.trim() ? identity.description.trim().split(/\s+/).length : 0;
  const highlightOk = !!highlight.responseTime && highlight.workDays.length > 0 && highlight.workHours.length > 0;

  const isFormValid =
    identity.name.trim() && identity.address.trim() && identity.country &&
    identity.phone.trim() && identity.email.trim() && identity.description.trim() &&
    descriptionWords <= 1000 && hasAnySocial &&
    info.field && info.categories.length > 0 && info.ownership &&
    (info.ownership !== 'Other' || info.ownershipOther.trim()) &&
    info.services.length > 0 && highlightOk && agreed;

  const handleSubmit = () => {
    if (descriptionWords > 1000) return toast.error('Center Description must be a maximum of 1000 words');
    if (!hasAnySocial) return toast.error('Please provide at least one social handle');
    if (!info.field) return toast.error('Please select a Field');
    if (info.categories.length === 0) return toast.error('Please select at least one Category');
    if (!info.ownership) return toast.error('Please select an Ownership type');
    if (info.ownership === 'Other' && !info.ownershipOther.trim()) return toast.error('Please specify the Ownership type');
    if (info.services.length === 0) return toast.error('Please select at least one Service');
    if (!highlight.responseTime) return toast.error('Please select a Response Time');
    if (highlight.workDays.length === 0) return toast.error('Please select at least one Work Day');
    if (highlight.workHours.length === 0) return toast.error('Please add at least one Work Hour');
    if (!agreed) return toast.error('Please accept the undertaking remark before submitting');
    if (!identity.name.trim() || !identity.country) return toast.error('Please fill in the Center Name and Country');
    if (!fullName || !profileEmail) return toast.error('Your platform information is incomplete — please complete your profile first');

    setShowSuccess(true);
  };

  return (
    <>
      <YourInformationSection info={yourInfo} />

      <CollapsibleSection title="Center Identity" icon={<IdCard className="h-5 w-5 text-brand-red-600" />} badge="Required">
        <CenterIdentitySection identity={identity} onChange={patchIdentity} />
      </CollapsibleSection>

      <CollapsibleSection title="Center Information" icon={<Microscope className="h-5 w-5 text-brand-red-600" />} badge="Required" defaultOpen={false}>
        <CenterInformationSection info={info} onChange={patchInfo} />
      </CollapsibleSection>

      <CollapsibleSection title="Service Fees & Other Fees" icon={<DollarSign className="h-5 w-5 text-brand-red-600" />} defaultOpen={false}>
        <CenterFeesSection services={info.services} fees={fees} onChange={patchFees} />
      </CollapsibleSection>

      <CollapsibleSection title="Scopes & Engagement Policies" icon={<Flag className="h-5 w-5 text-brand-navy-900" />} defaultOpen={false}>
        <CenterScopePolicySection scopes={scopes} setScopes={setScopes} policies={policies} setPolicies={setPolicies} />
      </CollapsibleSection>

      <CollapsibleSection title="Licenses & Achievements" icon={<ShieldCheck className="h-5 w-5 text-brand-navy-900" />} defaultOpen={false}>
        <CenterDocumentsSection licenses={licenses} setLicenses={setLicenses} awards={awards} setAwards={setAwards} />
      </CollapsibleSection>

      <CollapsibleSection title="Center Highlight" icon={<Clock className="h-5 w-5 text-brand-navy-900" />} badge="Required" defaultOpen={false}>
        <CenterHighlightSection highlight={highlight} onChange={patchHighlight} />
      </CollapsibleSection>

      <CollapsibleSection title="Media Gallery" icon={<ImagePlus className="h-5 w-5 text-brand-red-600" />} defaultOpen={false}>
        <CenterGallerySection gallery={gallery} onChange={setGallery} />
      </CollapsibleSection>

      <UndertakingSection agreed={agreed} setAgreed={setAgreed} />

      <FormActions
        onCancel={() => { resetForm(); onCancel(); }}
        onSubmit={handleSubmit}
        disabled={!isFormValid}
      />

      <ListingSuccessModal
        open={showSuccess}
        title="Specialist Center submitted"
        message="Your specialist center listing has been submitted and is now waiting for review."
        onClose={finish}
        onGoToSubmissions={() => { finish(); router.push('/dashboard/submissions'); }}
      />
    </>
  );
}
