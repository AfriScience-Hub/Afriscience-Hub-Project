'use client';

import { useEffect, useState } from 'react';
import { IdCard, Microscope, DollarSign, Flag, ShieldCheck, ImagePlus } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/app/context/AuthContext';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchFullProfile } from '@/store/profileSlice';
import CollapsibleSection from '../CollapsibleSection';
import FormActions from '../FormActions';
import YourInformationSection, { type YourInformation } from './components/YourInformationSection';
import CenterIdentitySection from './components/CenterIdentitySection';
import CenterInformationSection from './components/CenterInformationSection';
import CenterFeesSection from './components/CenterFeesSection';
import CenterScopePolicySection from './components/CenterScopePolicySection';
import CenterDocumentsSection from './components/CenterDocumentsSection';
import CenterGallerySection from './components/CenterGallerySection';
import UndertakingSection from '../UndertakingSection';
import type { CenterDocEntry, CenterFees, CenterIdentity, CenterInformation } from './types';

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

interface SpecialistCenterListingProps {
  onCancel: () => void;
}

export default function SpecialistCenterListing({ onCancel }: SpecialistCenterListingProps) {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const personal = useAppSelector((s) => s.profile.personal);

  const [identity, setIdentity] = useState<CenterIdentity>(EMPTY_IDENTITY);
  const [info, setInfo] = useState<CenterInformation>(EMPTY_INFO);
  const [fees, setFees] = useState<CenterFees>(EMPTY_FEES);
  const [scopes, setScopes] = useState<string[]>([]);
  const [policies, setPolicies] = useState<string[]>([]);
  const [licenses, setLicenses] = useState<CenterDocEntry[]>([]);
  const [awards, setAwards] = useState<CenterDocEntry[]>([]);
  const [gallery, setGallery] = useState<Record<string, string[]>>({});
  const [agreed, setAgreed] = useState(false);

  useEffect(() => { dispatch(fetchFullProfile()); }, [dispatch]);

  const fullName = personal ? [personal.firstname, personal.middlename, personal.surname].filter(Boolean).join(' ') : (user?.name || '');
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

  const resetForm = () => {
    setIdentity(EMPTY_IDENTITY);
    setInfo(EMPTY_INFO);
    setFees(EMPTY_FEES);
    setScopes([]); setPolicies([]); setLicenses([]); setAwards([]);
    setGallery({}); setAgreed(false);
  };

  const hasAnySocial = Object.values(identity.socials).some(v => v.trim().length > 0);
  const descriptionWords = identity.description.trim() ? identity.description.trim().split(/\s+/).length : 0;

  const isFormValid =
    identity.name.trim() && identity.address.trim() && identity.country &&
    identity.phone.trim() && identity.email.trim() && identity.description.trim() &&
    descriptionWords <= 1000 && hasAnySocial &&
    info.field && info.categories.length > 0 && info.ownership &&
    (info.ownership !== 'Other' || info.ownershipOther.trim()) &&
    info.services.length > 0 && agreed;

  const handleSubmit = () => {
    if (descriptionWords > 1000) return toast.error('Center Description must be a maximum of 1000 words');
    if (!hasAnySocial) return toast.error('Please provide at least one social handle');
    if (!info.field) return toast.error('Please select a Field');
    if (info.categories.length === 0) return toast.error('Please select at least one Category');
    if (!info.ownership) return toast.error('Please select an Ownership type');
    if (info.ownership === 'Other' && !info.ownershipOther.trim()) return toast.error('Please specify the Ownership type');
    if (info.services.length === 0) return toast.error('Please select at least one Service');
    if (!agreed) return toast.error('Please accept the undertaking remark before submitting');
    if (!identity.name.trim() || !identity.country) return toast.error('Please fill in the Center Name and Country');
    if (!fullName || !profileEmail) return toast.error('Your platform information is incomplete — please complete your profile first');

    toast.success('Your listing will be submitted for review by the AfriScience Hub Team. Once approved, it will be published on the platform. Your listing will earn a \u201cVerified Badge\u201d once all submitted documents are successfully verified.');
    resetForm();
    onCancel();
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

      <CollapsibleSection title="Media Gallery" icon={<ImagePlus className="h-5 w-5 text-brand-red-600" />} defaultOpen={false}>
        <CenterGallerySection gallery={gallery} onChange={setGallery} />
      </CollapsibleSection>

      <UndertakingSection agreed={agreed} setAgreed={setAgreed} />

      <FormActions
        onCancel={() => { resetForm(); onCancel(); }}
        onDraft={() => toast.success('Draft saved!')}
        onSubmit={handleSubmit}
        disabled={!isFormValid}
      />
    </>
  );
}
