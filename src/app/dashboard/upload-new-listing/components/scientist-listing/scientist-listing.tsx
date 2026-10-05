'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/app/context/AuthContext';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchFullProfile } from '@/store/profileSlice';
import FormActions from '../FormActions';
import UndertakingSection from '../UndertakingSection';
import { type DocEntry } from '../DocList';
import ScientistProfileSection from './components/ScientistProfileSection';
import ProfessionalDetailsSection from './components/ProfessionalDetailsSection';
import ScientistFeesSection from './components/ScientistFeesSection';
import ScientistScopePolicySection from './components/ScientistScopePolicySection';
import ScientistDocumentsSection from './components/ScientistDocumentsSection';
import ScientistGallerySection from './components/ScientistGallerySection';
import ScientistContactSection from './components/ScientistContactSection';
import type { ProfessionalDetails, ScientistContact, ScientistFees, ScientistProfile } from './types';

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

interface ScientistListingProps {
  onCancel: () => void;
}

export default function ScientistListing({ onCancel }: ScientistListingProps) {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const personal = useAppSelector((s) => s.profile.personal);

  const [profile, setProfile] = useState<ScientistProfile>(EMPTY_PROFILE);
  const [details, setDetails] = useState<ProfessionalDetails>(EMPTY_DETAILS);
  const [fees, setFees] = useState<ScientistFees>(EMPTY_FEES);
  const [scopes, setScopes] = useState<string[]>([]);
  const [policies, setPolicies] = useState<string[]>([]);
  const [certifications, setCertifications] = useState<DocEntry[]>([]);
  const [achievements, setAchievements] = useState<DocEntry[]>([]);
  const [media, setMedia] = useState<string[]>([]);
  const [contact, setContact] = useState<ScientistContact>(EMPTY_CONTACT);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => { dispatch(fetchFullProfile()); }, [dispatch]);

  const fullName = personal ? [personal.firstname, personal.middlename, personal.surname].filter(Boolean).join(' ') : (user?.name || '');
  const profilePhone = personal?.phone || user?.phone || '';
  const profileEmail = (personal as any)?.email || user?.email || '';

  useEffect(() => {
    setProfile(prev => ({ ...prev, name: prev.name || fullName }));
    setContact(prev => ({ ...prev, phone: prev.phone || profilePhone, email: prev.email || profileEmail }));
  }, [fullName, profilePhone, profileEmail]);

  const patchProfile = (patch: Partial<ScientistProfile>) => setProfile(prev => ({ ...prev, ...patch }));
  const patchDetails = (patch: Partial<ProfessionalDetails>) => setDetails(prev => ({ ...prev, ...patch }));
  const patchFees = (patch: Partial<ScientistFees>) => setFees(prev => ({ ...prev, ...patch }));
  const patchContact = (patch: Partial<ScientistContact>) => setContact(prev => ({ ...prev, ...patch }));

  const resetForm = () => {
    setProfile(EMPTY_PROFILE);
    setDetails(EMPTY_DETAILS);
    setFees(EMPTY_FEES);
    setScopes([]); setPolicies([]); setCertifications([]); setAchievements([]);
    setMedia([]); setContact(EMPTY_CONTACT); setAgreed(false);
  };

  const hasAnySocial = Object.values(contact.socials).some(v => v.trim().length > 0);
  const bioWords = profile.bio.trim() ? profile.bio.trim().split(/\s+/).length : 0;
  const certificatesOk = !details.degree || ['Field Expert | No Degree', 'Others'].includes(details.degree) || !!details.degreeCertificate;

  const isFormValid =
    profile.name.trim() && profile.country && profile.bio.trim() && bioWords <= 1000 &&
    details.field && details.professions.length > 0 && details.degree &&
    (details.professions.includes('Other') ? details.professionOther.trim() : true) &&
    details.services.length > 0 && certificatesOk &&
    contact.phone.trim() && contact.email.trim() && hasAnySocial && agreed;

  const handleSubmit = () => {
    if (bioWords > 1000) return toast.error('Short Bio must be a maximum of 1000 words');
    if (!profile.name.trim() || !profile.country) return toast.error('Please fill in your Name and Country');
    if (!details.field) return toast.error('Please select a Field');
    if (details.professions.length === 0) return toast.error('Please select at least one Profession');
    if (details.professions.includes('Other') && !details.professionOther.trim()) return toast.error('Please specify the other Profession');
    if (!details.degree) return toast.error('Please select a Degree');
    if (!certificatesOk) return toast.error('Please upload your Degree Certificate to verify your academic qualification');
    if (details.services.length === 0) return toast.error('Please select at least one Service');
    if (!contact.phone.trim() || !contact.email.trim()) return toast.error('Please provide your Phone Number and E-mail');
    if (!hasAnySocial) return toast.error('Please provide at least one social handle');
    if (!agreed) return toast.error('Please accept the undertaking remark before submitting');

    toast.success('Your listing will be submitted for review by the AfriScience Hub Team. Once approved, it will be published on the platform. Your listing will earn a \u201cVerified Badge\u201d once all submitted documents are successfully verified.');
    resetForm();
    onCancel();
  };

  return (
    <>
      <ScientistProfileSection profile={profile} onChange={patchProfile} />

      <ProfessionalDetailsSection details={details} onChange={patchDetails} />

      <ScientistFeesSection services={details.services} fees={fees} onChange={patchFees} />

      <ScientistScopePolicySection scopes={scopes} setScopes={setScopes} policies={policies} setPolicies={setPolicies} />

      <ScientistDocumentsSection
        certifications={certifications} setCertifications={setCertifications}
        achievements={achievements} setAchievements={setAchievements}
      />

      <ScientistGallerySection media={media} onChange={setMedia} />

      <ScientistContactSection contact={contact} onChange={patchContact} />

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
