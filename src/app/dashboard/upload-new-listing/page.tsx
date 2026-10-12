'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/app/components/ui/Button';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { LISTING_TYPES, AFRICAN_COUNTRIES, GALLERY_CATEGORIES, type ListingType, type ServiceEntry } from './data';
import ListingTypeSelector from './components/ListingTypeSelector';
import BasicProfileSection from './components/BasicProfileSection';
import CategorySpecificSection from './components/CategorySpecificSection';
import AfroInnovationListing from './components/afro-innovation-listing/afro-innovation-listing';
import SpecialistCenterListing from './components/specialist-center-listing/specialist-center-listing';
import ScientistListing from './components/scientist-listing/scientist-listing';
import ContactSection from './components/ContactSection';
import ServicesSection from './components/ServicesSection';
import MediaGallerySection from './components/MediaGallerySection';
import DocumentsSection from './components/DocumentsSection';
import PoliciesSection from './components/PoliciesSection';
import FormActions from './components/FormActions';
import { uploadFile } from '@/lib/upload';
import { buildInnovationPayload, createInnovation, fetchInnovation, MEDIA_REV, OWNERSHIP_REV, SDG_REV, STAGE_REV, updateInnovation } from './innovationApi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchWalletBalance } from '@/store/walletSlice';
import { fetchFullProfile } from '@/store/profileSlice';

const MIN_ASH_COINS = 300;

export default function UploadNewListing() {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const router = useRouter();
  const personal = useAppSelector((s) => s.profile.personal);
  const [editId, setEditId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [selectedType, setSelectedType] = useState<ListingType | null>(null);
  const [step, setStep] = useState<'select' | 'form'>('select');

  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileImageKey, setProfileImageKey] = useState<string | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  const [country, setCountry] = useState('');
  const [stateRegion, setStateRegion] = useState('');
  const [bio, setBio] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [socialLinks, setSocialLinks] = useState({ x: '', linkedin: '', facebook: '', instagram: '' });
  const [innovatorName, setInnovatorName] = useState('');
  const [innovatorUsername, setInnovatorUsername] = useState('');
  const [altPhone, setAltPhone] = useState('');
  const [agreed, setAgreed] = useState(false);

  const [services, setServices] = useState<ServiceEntry[]>([]);
  const [newService, setNewService] = useState<ServiceEntry>({ id: '', name: '', description: '', costRange: '' });

  const [galleryImages, setGalleryImages] = useState<{ category: string; file: File; name: string; previewUrl: string }[]>([]);
  const [certifications, setCertifications] = useState<{ name: string; file: File; previewUrl: string }[]>([]);
  const [policies, setPolicies] = useState('');

  const [instClass, setInstClass] = useState('');
  const [instOwnership, setInstOwnership] = useState('');
  const [instGender, setInstGender] = useState('');
  const [instMotto, setInstMotto] = useState('');

  const [sciFields, setSciFields] = useState<string[]>([]);
  const [sciProfession, setSciProfession] = useState('');
  const [sciDegrees, setSciDegrees] = useState('');

  const [innovCategory, setInnovCategory] = useState('');
  const [innovStage, setInnovStage] = useState('');

  const [innovFields, setInnovFields] = useState<string[]>([]);
  const [innovInterests, setInnovInterests] = useState<string[]>([]);
  const [innovOwnership, setInnovOwnership] = useState('');
  const [innovSdgs, setInnovSdgs] = useState<string[]>([]);
  const [innovMaterials, setInnovMaterials] = useState<string[]>([]);
  const [innovDimensions, setInnovDimensions] = useState({ length: '', width: '', height: '', unit: 'cm' });
  const [innovWeight, setInnovWeight] = useState({ value: '', unit: 'kg' });
  const [innovUserGroups, setInnovUserGroups] = useState<string[]>([]);
  const [innovApplications, setInnovApplications] = useState<string[]>([]);
  const [innovImpact, setInnovImpact] = useState<string[]>([]);
  const [innovRecommendations, setInnovRecommendations] = useState<string[]>([]);
  const [innovCautions, setInnovCautions] = useState<string[]>([]);
  const [innovLicenses, setInnovLicenses] = useState<{ title: string; issuer: string; date: string; file: string }[]>([]);
  const [innovAwards, setInnovAwards] = useState<{ title: string; issuer: string; date: string; file: string }[]>([]);
  const [innovGallery, setInnovGallery] = useState<{ category: string; type: 'image' | 'video'; name: string; caption: string }[]>([]);

  const [compType, setCompType] = useState('');
  const [compDeadline, setCompDeadline] = useState('');
  const [compFee, setCompFee] = useState('');

  const [awardType, setAwardType] = useState('');

  const handleProfileImageUpload = () => {};

  // Helper to extract storage key from a full URL
  const extractKeyFromUrl = (url: string | null): string | null => {
    if (!url) return null;
    // If it's already a key (no protocol), return as-is
    if (!url.startsWith('http')) return url;
    // Extract key from bucket URL: https://bucket.s3.region.amazonaws.com/uploads/xxx
    const match = url.match(/\/uploads\/(.+)$/);
    return match ? `uploads/${match[1]}` : null;
  };

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('id');
    if (!id) return;
    setEditId(id);
    setSelectedType('innovation');
    setStep('form');
    fetchInnovation(id).then((item: any) => {
      setName(item.innovationName || item.name || '');
      const imageUrl = item.image || null;
      setProfileImage(imageUrl);
      setProfileImagePreview(imageUrl); // for preview in edit mode
      setProfileImageKey(extractKeyFromUrl(imageUrl));
      setCountry(item.country || '');
      setBio(item.shortDescription || item.bio || '');
      setInnovFields(item.fields || []);
      setInnovInterests((item.interests || []).map((i: string) => i.replace(/\|/g, ' | ')));
      setInnovOwnership(OWNERSHIP_REV[item.ownership] || item.ownership || '');
      setInnovStage(STAGE_REV[item.stage] || item.stage || '');
      setInnovSdgs((item.sdgs || []).map((s: string) => SDG_REV[s] || s));
      setInnovMaterials(item.materialsUsed ? String(item.materialsUsed).split(', ').filter(Boolean) : []);
      setInnovDimensions({
        length: item.length != null ? String(item.length) : '',
        width: item.width != null ? String(item.width) : '',
        height: item.height != null ? String(item.height) : '',
        unit: String(item.dimensionUnit || 'cm').toLowerCase(),
      });
      setInnovWeight({ value: item.weight != null ? String(item.weight) : '', unit: String(item.weightUnit || 'kg').toLowerCase() });
      setInnovUserGroups((item.userGroups || []).map((g: any) => g.userGroup || g));
      const lines = (v: unknown) => typeof v === 'string' ? v.split('\n').filter(Boolean) : Array.isArray(v) ? v : [];
      setInnovApplications(lines(item.applications));
      setInnovImpact(lines(item.impact));
      setInnovRecommendations(lines(item.recommendations));
      setInnovCautions(lines(item.cautions));
      const docs = item.documents || [];
      setInnovLicenses(docs.filter((d: any) => d.type === 'CERTIFICATION').map((d: any) => ({ title: d.documentTitle, issuer: d.issuer, date: String(d.year || ''), file: d.documentFile })));
      setInnovAwards(docs.filter((d: any) => d.type === 'AWARD').map((d: any) => ({ title: d.documentTitle, issuer: d.issuer, date: String(d.year || ''), file: d.documentFile })));
      setInnovGallery((item.media || []).map((m: any) => ({ category: MEDIA_REV[m.category] || m.category, type: 'image' as const, name: m.mediaFile, caption: '' })));
      // Innovator info from the innovation record (if present)
      if (item.innovatorName) setInnovatorName(item.innovatorName);
      if (item.innovatorUsername) setInnovatorUsername(item.innovatorUsername);
      if (item.phone) setPhone(item.phone);
      if (item.altPhone) setAltPhone(item.altPhone);
      if (item.email) setEmail(item.email);
      if (item.website) setWebsite(item.website);
      if (item.socialLinks) setSocialLinks(item.socialLinks);
    }).catch((e: any) => toast.error(e?.message || 'Failed to load innovation'));
  }, []);

  // Make sure the profile is loaded so the innovator info can be prefilled.
  useEffect(() => { dispatch(fetchFullProfile()); }, [dispatch]);

  // Prefill the innovator's information from the profile whenever the form is
  // opened. Only empty fields are filled, so anything the user types or edits
  // is never overwritten.
  useEffect(() => {
    if (step !== 'form') return;
    const fullName = personal?.fullName || (personal ? [personal.firstname, personal.middlename, personal.surname].filter(Boolean).join(' ') : '');
    if (fullName) setInnovatorName(v => v || fullName);
    if (personal?.username) setInnovatorUsername(v => v || personal.username);
    if (personal?.phone) setPhone(v => v || personal.phone);
    if (personal?.website) setWebsite(v => v || personal.website);
    const email = (personal as any)?.email || user?.email;
    if (email) setEmail(v => v || email);
  }, [personal, step, user?.email]);

  const handleSubmit = async () => {
    if (!name.trim() || !country) {
      toast.error('Please fill in at least the Name and Country fields');
      return;
    }
    if (selectedType !== 'innovation') {
      toast.success('Listing submitted for verification! You will be notified once reviewed.');
      setStep('select');
      setSelectedType(null);
      return;
    }
    setSaving(true);
    try {
      // Submitting an innovation costs 300 ASH coins — verify the balance first.
      const wallet = await dispatch(fetchWalletBalance()).unwrap().catch(() => null);
      const balance = wallet ? Number(wallet.balance) : 0;
      if (!wallet || balance < MIN_ASH_COINS) {
        toast.error(
          wallet
            ? `Not enough balance. You need at least ${MIN_ASH_COINS} ASH coins to submit an innovation (your balance is ${balance.toLocaleString()} ASH coins).`
            : 'Could not verify your wallet balance. Please try again.',
        );
        setSaving(false);
        return;
      }

      // Upload profile image if a new file was selected
      let finalProfileImageKey = profileImageKey;
      if (profileImageFile) {
        try {
          const uploaded = await uploadFile(profileImageFile);
          finalProfileImageKey = uploaded.key;
        } catch {
          toast.error('Failed to upload profile image. Please try again.');
          setSaving(false);
          return;
        }
      }

      // Upload gallery images
      let finalInnovGallery = innovGallery;
      if (galleryImages.length > 0) {
        try {
          const uploadedGallery = await Promise.all(
            galleryImages.map(async item => {
              const uploaded = await uploadFile(item.file);
              return { category: item.category, type: 'image' as const, name: uploaded.key, caption: '' };
            })
          );
          finalInnovGallery = uploadedGallery;
        } catch {
          toast.error('Failed to upload gallery images. Please try again.');
          setSaving(false);
          return;
        }
      }

      // Upload certifications
      let finalInnovLicenses = innovLicenses;
      let finalInnovAwards = innovAwards;
      if (certifications.length > 0) {
        try {
          const uploadedCerts = await Promise.all(
            certifications.map(async item => {
              const uploaded = await uploadFile(item.file);
              return { title: item.name, issuer: '', date: new Date().getFullYear().toString(), file: uploaded.key };
            })
          );
          // Split into licenses and awards (for simplicity, all go to licenses)
          finalInnovLicenses = uploadedCerts;
        } catch {
          toast.error('Failed to upload certifications. Please try again.');
          setSaving(false);
          return;
        }
      }

      const payload = buildInnovationPayload({
        name, profileImage: finalProfileImageKey, country, bio, innovFields, innovInterests, innovOwnership, innovStage,
        innovSdgs, innovMaterials, innovDimensions, innovWeight, innovUserGroups, innovApplications,
        innovImpact, innovRecommendations, innovCautions, innovLicenses, innovAwards, innovGallery,
      });
      if (editId) await updateInnovation(editId, payload);
      else await createInnovation(payload);
      toast.success(editId ? 'Innovation updated' : 'Innovation submitted');
      // Navigate to listings page after successful submission
      setTimeout(() => router.push('/dashboard/listings'), 1500);
    } catch (e: any) {
      toast.error(e?.message || 'Failed to save innovation');
      setSaving(false);
      return;
    }
    setSaving(false);
    setEditId(null);
    setStep('select');
    setSelectedType(null);
    setName(''); setProfileImage(null); setProfileImageKey(null); setProfileImageFile(null); setProfileImagePreview(null); setCountry(''); setStateRegion('');
    setBio(''); setPhone(''); setEmail(''); setWebsite('');
    setSocialLinks({ x: '', linkedin: '', facebook: '', instagram: '' });
    setServices([]); setGalleryImages([]); setCertifications([]); setPolicies('');
    setInnovFields([]); setInnovInterests([]); setInnovOwnership('');
    setInnovStage(''); setInnovSdgs([]); setInnovMaterials([]);
    setInnovDimensions({ length: '', width: '', height: '', unit: 'cm' });
    setInnovWeight({ value: '', unit: 'kg' }); setInnovUserGroups([]);
    setInnovApplications([]); setInnovImpact([]); setInnovRecommendations([]); setInnovCautions([]);
    setInnovLicenses([]); setInnovAwards([]); setInnovGallery([]);
    setInnovatorName(''); setAltPhone(''); setInnovatorUsername('');
  };

  if (step === 'select') {
    return <ListingTypeSelector onSelectType={(typeId) => { setSelectedType(typeId as ListingType); setStep('form'); }} />;
  }

  const selectedTypeInfo = LISTING_TYPES.find(t => t.id === selectedType);

  const hasAnySocial = Object.values(socialLinks).some(v => v.trim().length > 0);
  const isFormValid = agreed && hasAnySocial;

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {selectedTypeInfo && <selectedTypeInfo.icon className="h-6 w-6 text-brand-red-600" />}
            <div>
              <h2 className="text-xl font-bold text-neutral-black">New {selectedTypeInfo?.label} Listing</h2>
              <p className="text-sm text-neutral-gray-medium">Fill in the details below. Fields marked <span className="text-brand-red-600">*</span> are required.</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => { setStep('select'); setSelectedType(null); }}>
            <X className="h-4 w-4 mr-1" /> Change Category
          </Button>
        </div>
      </div>

      {selectedType === 'center' ? (
        <SpecialistCenterListing onCancel={() => { setStep('select'); setSelectedType(null); }} />
      ) : selectedType === 'scientist' ? (
        <ScientistListing onCancel={() => { setStep('select'); setSelectedType(null); }} />
      ) : selectedType === 'innovation' ? (
        <AfroInnovationListing
          name={name} setName={setName}
          profileImage={profileImagePreview || profileImage} setProfileImage={setProfileImage}
          profileImageKey={profileImageKey} setProfileImageKey={setProfileImageKey}
          profileImageFile={profileImageFile} setProfileImageFile={setProfileImageFile}
          profileImagePreview={profileImagePreview} setProfileImagePreview={setProfileImagePreview}
          country={country} setCountry={setCountry}
          bio={bio} setBio={setBio}
          AFRICAN_COUNTRIES={AFRICAN_COUNTRIES}
          innovFields={innovFields} setInnovFields={setInnovFields}
          innovInterests={innovInterests} setInnovInterests={setInnovInterests}
          innovOwnership={innovOwnership} setInnovOwnership={setInnovOwnership}
          innovStage={innovStage} setInnovStage={setInnovStage}
          innovSdgs={innovSdgs} setInnovSdgs={setInnovSdgs}
          innovMaterials={innovMaterials} setInnovMaterials={setInnovMaterials}
          innovDimensions={innovDimensions} setInnovDimensions={setInnovDimensions}
          innovWeight={innovWeight} setInnovWeight={setInnovWeight}
          innovUserGroups={innovUserGroups} setInnovUserGroups={setInnovUserGroups}
          innovApplications={innovApplications} setInnovApplications={setInnovApplications}
          innovImpact={innovImpact} setInnovImpact={setInnovImpact}
          innovRecommendations={innovRecommendations} setInnovRecommendations={setInnovRecommendations}
          innovCautions={innovCautions} setInnovCautions={setInnovCautions}
          innovLicenses={innovLicenses} setInnovLicenses={setInnovLicenses}
          innovAwards={innovAwards} setInnovAwards={setInnovAwards}
          innovGallery={innovGallery} setInnovGallery={setInnovGallery}
          innovatorName={innovatorName} setInnovatorName={setInnovatorName}
          username={innovatorUsername} setUsername={setInnovatorUsername}
          phone={phone} setPhone={setPhone}
          altPhone={altPhone} setAltPhone={setAltPhone}
          email={email} setEmail={setEmail}
          website={website} setWebsite={setWebsite}
          socialLinks={socialLinks} setSocialLinks={setSocialLinks}
          agreed={agreed} setAgreed={setAgreed}
        />
      ) : (
        <>
<BasicProfileSection
              selectedType={selectedType!}
              name={name} setName={setName}
              profileImage={profileImage} setProfileImage={setProfileImage}
              profileImageKey={profileImageKey} setProfileImageKey={setProfileImageKey}
              country={country} setCountry={setCountry}
              stateRegion={stateRegion} setStateRegion={setStateRegion}
              bio={bio} setBio={setBio}
              instMotto={instMotto} setInstMotto={setInstMotto}
              AFRICAN_COUNTRIES={AFRICAN_COUNTRIES}
            />

          <CategorySpecificSection
            selectedType={selectedType!}
            instClass={instClass} setInstClass={setInstClass}
            instOwnership={instOwnership} setInstOwnership={setInstOwnership}
            instGender={instGender} setInstGender={setInstGender}
            sciFields={sciFields} setSciFields={setSciFields}
            sciProfession={sciProfession} setSciProfession={setSciProfession}
            sciDegrees={sciDegrees} setSciDegrees={setSciDegrees}
            innovCategory={innovCategory} setInnovCategory={setInnovCategory}
            innovStage={innovStage} setInnovStage={setInnovStage}
            compType={compType} setCompType={setCompType}
            compDeadline={compDeadline} setCompDeadline={setCompDeadline}
            compFee={compFee} setCompFee={setCompFee}
            awardType={awardType} setAwardType={setAwardType}
          />

          <ContactSection
            phone={phone} setPhone={setPhone}
            email={email} setEmail={setEmail}
            website={website} setWebsite={setWebsite}
            socialLinks={socialLinks} setSocialLinks={setSocialLinks}
          />
        </>
      )}

      {selectedType !== 'innovation' && selectedType !== 'center' && selectedType !== 'scientist' && (
        <>
          <ServicesSection
            services={services} setServices={setServices}
            newService={newService} setNewService={setNewService}
          />

<MediaGallerySection
                galleryImages={galleryImages}
                setGalleryImages={setGalleryImages}
                GALLERY_CATEGORIES={GALLERY_CATEGORIES}
              />

              <DocumentsSection
                certifications={certifications}
                setCertifications={setCertifications}
              />

          <PoliciesSection policies={policies} setPolicies={setPolicies} />
        </>
      )}

      {selectedType !== 'center' && selectedType !== 'scientist' && (
        <FormActions
          onCancel={() => { setStep('select'); setSelectedType(null); }}
          onDraft={() => toast.success('Draft saved!')}
          onSubmit={handleSubmit}
          disabled={saving || !isFormValid}
        />
      )}
    </div>
  );
}
