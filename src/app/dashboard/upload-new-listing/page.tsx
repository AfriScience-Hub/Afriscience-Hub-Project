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

/**
 * Extracts a display string from an API array item.
 * Items may be plain strings or objects like `{ field: 'Hybrid' }`.
 * `preferredKeys` lists the property names to check first (in order).
 */
function pickValue(item: unknown, preferredKeys: string[]): string {
  if (typeof item === 'string') return item.trim();
  if (!item || typeof item !== 'object') return '';
  const obj = item as Record<string, unknown>;
  for (const key of preferredKeys) {
    const v = obj[key];
    if (typeof v === 'string' && v.trim()) return v.trim();
    if (typeof v === 'number') return String(v);
  }
  // Fallback: first meaningful string/number that isn't an id or timestamp.
  for (const [k, v] of Object.entries(obj)) {
    if (['id', 'createdAt', 'updatedAt', 'userId', 'profileId', 'listingId'].includes(k)) continue;
    if (typeof v === 'string' && v.trim()) return v.trim();
    if (typeof v === 'number') return String(v);
  }
  return '';
}

/** Maps an array of mixed string/object items to `string[]` using `preferredKeys`. */
function toStringArray(arr: unknown, preferredKeys: string[]): string[] {
  if (!Array.isArray(arr)) return [];
  return arr.map(item => pickValue(item, preferredKeys)).filter(Boolean);
}

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
  const [socialHandles, setSocialHandles] = useState<{ name: string; link: string }[]>([{ name: '', link: '' }]);
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
      // Fields, interests, sdgs may be plain string[] or array of objects
      // (e.g. [{ field: 'Hybrid' }]) depending on the API version — map both.
      setInnovFields(toStringArray(item.fields, ['field', 'name', 'title', 'value']));
      setInnovInterests(
        toStringArray(item.interests, ['interest', 'name', 'title', 'value'])
          .map((i: string) => i.replace(/\|/g, ' | ')),
      );
      setInnovOwnership(OWNERSHIP_REV[item.ownership] || item.ownership || '');
      setInnovStage(STAGE_REV[item.stage] || item.stage || '');
      setInnovSdgs(
        toStringArray(item.sdgs, ['sdg', 'name', 'title', 'value', 'goal'])
          .map((s: string) => SDG_REV[s] || s),
      );
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
      if (item.phone) setPhone(item.phone);
      if (item.email) setEmail(item.email);
      if (item.website) setWebsite(item.website);
      // Socials from the API: new format [{ platform, link }] or legacy object
      const rawSocials = item.socials ?? item.socialLinks;
      if (Array.isArray(rawSocials)) {
        const rows = rawSocials
          .map((s: any) => ({
            name: String(s?.platform ?? s?.name ?? ''),
            link: String(s?.link ?? s?.url ?? ''),
          }))
          .filter((s: { name: string; link: string }) => s.name.trim() || s.link.trim());
        if (rows.length) setSocialHandles(rows);
      } else if (rawSocials && typeof rawSocials === 'object') {
        const rows = Object.entries(rawSocials)
          .filter(([, v]) => String(v ?? '').trim())
          .map(([name, link]) => ({ name, link: String(link) }));
        if (rows.length) setSocialHandles(rows);
      }
    }).catch((e: any) => toast.error(e?.message || 'Failed to load innovation'));
  }, []);

  // Make sure the profile is loaded so the innovator info can be prefilled.
  useEffect(() => { dispatch(fetchFullProfile()); }, [dispatch]);

  // Prefill the innovator's information from the profile whenever the form is
  // opened. Only empty fields are filled, so anything the user types or edits
  // is never overwritten.
  useEffect(() => {
    if (step !== 'form') return;
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
        innovImpact, innovRecommendations, innovCautions, innovLicenses, innovAwards, innovGallery, socialHandles,
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
    setSocialHandles([{ name: '', link: '' }]);
  };

  if (step === 'select') {
    return <ListingTypeSelector onSelectType={(typeId) => { setSelectedType(typeId as ListingType); setStep('form'); }} />;
  }

  const selectedTypeInfo = LISTING_TYPES.find(t => t.id === selectedType);

  const hasAnySocial = selectedType === 'innovation'
    ? socialHandles.some(s => s.name.trim() && s.link.trim())
    : Object.values(socialLinks).some(v => v.trim().length > 0);
  const isFormValid = agreed && hasAnySocial;

  return (
    <div className="space-y-5">
      {!editId && (
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
      )}

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
          socialHandles={socialHandles} setSocialHandles={setSocialHandles}
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
          onCancel={() => {
            if (editId) { router.push('/dashboard/my-listings'); return; }
            setStep('select');
            setSelectedType(null);
          }}
          onDraft={() => toast.success('Draft saved!')}
          onSubmit={handleSubmit}
          disabled={saving || !isFormValid}
        />
      )}
    </div>
  );
}
