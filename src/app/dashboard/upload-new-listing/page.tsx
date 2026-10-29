'use client';

import { useEffect, useState } from 'react';
import { X, Building2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/app/components/ui/Button';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { LISTING_TYPES, AFRICAN_COUNTRIES, GALLERY_CATEGORIES, type ListingType, type ServiceEntry } from './data';
import ListingTypeSelector from './components/ListingTypeSelector';
import DraftListView from './components/DraftListView';
import DraftSavingModal from './components/DraftSavingModal';
import BasicProfileSection from './components/BasicProfileSection';
import CategorySpecificSection from './components/CategorySpecificSection';
import AfroInnovationListing from './components/afro-innovation-listing/afro-innovation-listing';
import { firstSocialError } from './components/afro-innovation-listing/components/InnovatorInfoSection';
import SpecialistCenterListing from './components/specialist-center-listing/specialist-center-listing';
import ScientistListing from './components/scientist-listing/scientist-listing';
import PrimarySecondaryListing from './components/primary-secondary-listing/primary-secondary-listing';
import ContactSection from './components/ContactSection';
import ServicesSection from './components/ServicesSection';
import MediaGallerySection from './components/MediaGallerySection';
import DocumentsSection from './components/DocumentsSection';
import PoliciesSection from './components/PoliciesSection';
import FormActions from './components/FormActions';
import { uploadFile } from '@/lib/upload';
import {
  buildInnovationPayload, createInnovation, createInnovationDraft,
  fetchInnovation, MEDIA_REV, OWNERSHIP_REV, SDG_REV, STAGE_REV, submitInnovationDraft,
  toStorageKey, updateInnovation, updateInnovationDraft, type InnovationPayload,
} from './innovationApi';
import { useInnovationOptions } from '@/app/data/innovationOptions';
import { INNOVATION_USER_GROUPS } from '@/app/data/mockData';
import PriceConfirmModal, { type ListingPlan } from './components/PriceConfirmModal';
import ListingSuccessModal from './components/ListingSuccessModal';
import InstituteTypeSelectorModal, { type InstituteSubType } from '@/app/dashboard/components/InstituteTypeSelectorModal';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchFullProfile } from '@/store/profileSlice';
import { fetchWalletBalance } from '@/store/walletSlice';
import { countWords, limitWords, MAX_BIO_WORDS } from './wordUtils';

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

/** True when the API rejected a request because the wallet cannot cover it. */
function isInsufficientBalanceError(value: unknown): boolean {
  const message = typeof value === 'string' ? value : value instanceof Error ? value.message : '';
  return /insufficient|not enough|low balance|wallet balance/i.test(message);
}

export default function UploadNewListing() {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const router = useRouter();
  const personal = useAppSelector((s) => s.profile.personal);
  const [editId, setEditId] = useState<string | null>(null);
  const [draftId, setDraftId] = useState<string | null>(null);
  const [editBaseline, setEditBaseline] = useState<string | null>(null);
  const [prefilled, setPrefilled] = useState(false);
  const [saving, setSaving] = useState(false);
  const [draftSaving, setDraftSaving] = useState(false);
  const [draftSavingOpen, setDraftSavingOpen] = useState(false);
  const [showPriceConfirm, setShowPriceConfirm] = useState(false);
  const [upgradeMode, setUpgradeMode] = useState(false);
  const [successInfo, setSuccessInfo] = useState<{
    title: string;
    message: string;
    actionLabel?: string;
    actionPath?: string;
  } | null>(null);
  const [payingUser, setPayingUser] = useState(false);
  const [selectedType, setSelectedType] = useState<ListingType | null>(null);
  const [instituteSubType, setInstituteSubType] = useState<InstituteSubType | null>(null);
  const [step, setStep] = useState<'select' | 'drafts' | 'form'>('select');
  // Deep links (edit/draft) must open their form directly. Keeping the type
  // selector hidden until the URL parameters have been read prevents the
  // upload page from flashing before the requested record is opened.
  const [initialisingRoute, setInitialisingRoute] = useState(true);
  const [showInstituteTypeModal, setShowInstituteTypeModal] = useState(false);

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
  // User groups are not managed as options in the admin, so they come from
  // the bundled list. Anything the user types in is submitted as a custom group.
  const userGroupOptions = INNOVATION_USER_GROUPS;
  // The listing price is set per stage, so the stage options tell us what this
  // listing will cost.
  const { options: stageOptions } = useInnovationOptions('STAGE');
  const stagePrice = stageOptions.find((o) => o.content === innovStage)?.price;
  const [innovApplications, setInnovApplications] = useState<string[]>([]);
  const [innovImpact, setInnovImpact] = useState<string[]>([]);
  const [innovRecommendations, setInnovRecommendations] = useState<string[]>([]);
  const [innovCautions, setInnovCautions] = useState<string[]>([]);
  const [innovLicenses, setInnovLicenses] = useState<{ title: string; issuer: string; date: string; file: string; fileObj?: File }[]>([]);
  const [innovAwards, setInnovAwards] = useState<{ title: string; issuer: string; date: string; file: string; fileObj?: File }[]>([]);
  const [innovGallery, setInnovGallery] = useState<{ category: string; type: 'image' | 'video'; name: string; file?: File }[]>([]);

  const [compType, setCompType] = useState('');
  const [compDeadline, setCompDeadline] = useState('');
  const [compFee, setCompFee] = useState('');

  const [awardType, setAwardType] = useState('');

  const handleProfileImageUpload = () => {};

  // Read type parameter from URL to pre-select the listing type
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const typeParam = params.get('type');
    if (!typeParam) return;
    // An institute listing always asks which kind of institute first, so a
    // deep link behaves exactly like clicking the category card.
    if (typeParam === 'institute') {
      setSelectedType('institute');
      setStep('select');
      setShowInstituteTypeModal(true);
      return;
    }
    if (['innovation', 'scientist', 'center', 'award', 'competition'].includes(typeParam)) {
      setSelectedType(typeParam as ListingType);
      setStep('form');
    }
  }, []);

  /** Populates every Afro-Innovation form field from a listing/draft record. */
  const applyInnovationToForm = (item: any) => {
    setName(item.innovationName || item.name || '');
    const imageUrl = item.image || null;
    setProfileImage(imageUrl);
    setProfileImagePreview(imageUrl); // for preview in edit/draft mode
    // The API returns signed URLs — the form/payload deal in storage keys only.
    setProfileImageKey(toStorageKey(imageUrl) || null);
    setCountry(item.country || '');
    setBio(limitWords(item.shortDescription || item.bio || '', MAX_BIO_WORDS));
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
    setInnovMaterials(Array.isArray(item.materialsUsed) ? item.materialsUsed : item.materialsUsed ? String(item.materialsUsed).split(', ').filter(Boolean) : []);
    setInnovDimensions({
      length: item.length != null ? String(item.length) : '',
      width: item.width != null ? String(item.width) : '',
      height: item.height != null ? String(item.height) : '',
      unit: ({ INCH: 'in' } as Record<string, string>)[String(item.dimensionUnit || '').toUpperCase()] || String(item.dimensionUnit || 'cm').toLowerCase(),
    });
    setInnovWeight({ value: item.weight != null ? String(item.weight) : '', unit: ({ TONNES: 't', TON: 't' } as Record<string, string>)[String(item.weightUnit || '').toUpperCase()] || String(item.weightUnit || 'kg').toLowerCase() });
    setInnovUserGroups(toStringArray(item.userGroups, ['userGroup', 'name', 'title', 'value']));
    const lines = (v: unknown) => typeof v === 'string' ? v.split('\n').filter(Boolean) : Array.isArray(v) ? v : [];
    setInnovApplications(lines(item.applications));
    setInnovImpact(lines(item.impact));
    setInnovRecommendations(lines(item.recommendations));
    setInnovCautions(lines(item.cautions));
    const docs = item.documents || [];
    // documentFile/mediaFile come back as signed URLs — store the bare keys
    // so re-submitting the form never sends URLs where keys are expected.
    setInnovLicenses(docs.filter((d: any) => d.type === 'CERTIFICATION').map((d: any) => ({ title: d.documentTitle, issuer: d.issuer, date: String(d.year || ''), file: toStorageKey(d.documentFile) })));
    setInnovAwards(docs.filter((d: any) => d.type === 'AWARD').map((d: any) => ({ title: d.documentTitle, issuer: d.issuer, date: String(d.year || ''), file: toStorageKey(d.documentFile) })));
    setInnovGallery((item.media || []).map((m: any) => ({ category: MEDIA_REV[m.category] || m.category, type: 'image' as const, name: toStorageKey(m.mediaFile) })));
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
    setPayingUser(item.payingUser === true);
  };

  /** Loads a draft/listing record and opens the Afro-Innovation form. */
  const openInnovationRecord = async (id: string, asDraft: boolean, upgrade = false) => {
    // Switch to the form before fetching so an edit/draft deep link never
    // renders the listing-type selector first.
    resetInnovationForm();
    setDraftId(asDraft ? id : null);
    setEditId(asDraft ? null : id);
    setEditBaseline(null);
    setPrefilled(false);
    setSelectedType('innovation');
    setStep('form');
    setUpgradeMode(upgrade);

    try {
      const item = await fetchInnovation(id);
      applyInnovationToForm(item);
      setPrefilled(true);
      if (upgrade) setShowPriceConfirm(true);
    } catch (error) {
      // Put the user back where they came from when the record cannot load.
      setDraftId(null);
      setEditId(null);
      setStep(asDraft ? 'drafts' : 'select');
      throw error;
    }
  };

  const handleContinueDraft = async (id: string) => {
    await openInnovationRecord(id, true);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const draftParam = params.get('draftId') || params.get('draft');
    const id = params.get('id');
    const upgrade = params.get('upgrade') === 'pro' || params.get('upgrade') === 'paid';

    if (!draftParam && !id) {
      setInitialisingRoute(false);
      return;
    }

    setInitialisingRoute(false);
    if (draftParam) {
      openInnovationRecord(draftParam, true).catch((e: any) => toast.error(e?.message || 'Failed to load draft'));
      return;
    }
    if (!id) return;
    openInnovationRecord(id, false, upgrade).catch((e: any) => toast.error(e?.message || 'Failed to load innovation'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  /**
   * First missing/invalid required Afro-Innovation field, or null when the
   * listing is complete enough to submit for review. Saving drafts does not
   * use this check — drafts may be incomplete.
   */
  const innovationRequiredError = (): string | null => {
    if (!name.trim()) return 'Innovation name is required.';
    if (!country) return 'Country is required.';
    if (!bio.trim()) return 'Short bio / description is required.';
    if (countWords(bio) > MAX_BIO_WORDS) return `Short bio must be ${MAX_BIO_WORDS} words or fewer.`;
    if (!profileImageFile && !profileImageKey && !profileImage) return 'Innovation profile image is required.';
    if (innovFields.length === 0) return 'Select at least one innovation field.';
    if (innovInterests.length === 0) return 'Select at least one interest.';
    if (!innovOwnership) return 'Select the innovation ownership.';
    if (!innovStage) return 'Select the innovation stage.';
    if (innovSdgs.length === 0) return 'Select at least one SDG.';
    if (innovMaterials.length === 0) return 'Add at least one material used in the innovation.';
    if (innovUserGroups.length === 0) return 'Add at least one user group.';
    if (innovApplications.length === 0) return 'Add at least one application.';
    if (innovImpact.length === 0) return 'Add at least one impact.';
    if (innovRecommendations.length === 0) return 'Add at least one recommendation.';
    if (innovCautions.length === 0) return 'Add at least one caution.';
    if (innovGallery.length === 0) return 'Add at least one media file to the gallery.';
    const socialIssue = firstSocialError(socialHandles);
    if (socialIssue) return socialIssue;
    if (!agreed) return 'Please accept the undertaking remark before submitting.';
    const numericFields: [string, string][] = [
      ['Length', innovDimensions.length],
      ['Width', innovDimensions.width],
      ['Height', innovDimensions.height],
      ['Weight', innovWeight.value],
    ];
    for (const [label, value] of numericFields) {
      if (value.trim() && (!Number.isFinite(Number(value)) || Number(value) < 0)) {
        return `${label} must be a non-negative number.`;
      }
    }
    return null;
  };

  const handleSubmit = async () => {
    if (!name.trim() || !country) {
      toast.error('Please fill in at least the Name and Country fields');
      return;
    }
    if (selectedType !== 'innovation') {
      const label = LISTING_TYPES.find(t => t.id === selectedType)?.label || 'Listing';
      setSuccessInfo({
        title: `${label} submitted`,
        message: `Your ${label.toLowerCase()} listing has been submitted and is now waiting for review.`,
      });
      setStep('select');
      setSelectedType(null);
      return;
    }
    // A listing can only be submitted when every required field is complete.
    const requiredError = innovationRequiredError();
    if (requiredError) {
      toast.error(requiredError);
      return;
    }
    // New listings — and upgrades started from My Listings — are confirmed
    // with the plan/amount first. Editing a free listing still saves directly.
    if (!editId || upgradeMode) {
      setShowPriceConfirm(true);
      return;
    }
    await performSubmit();
  };

  /** Uploads staged files and builds the API payload. Throws on upload failure. */
  const prepareUploadedPayload = async (isPaid: boolean): Promise<InnovationPayload> => {
    let finalProfileImageKey = profileImageKey;
    if (profileImageFile) {
      try {
        const uploaded = await uploadFile(profileImageFile);
        if (!uploaded.key) throw new Error('Upload did not return a storage key.');
        finalProfileImageKey = uploaded.key;
        setProfileImageKey(finalProfileImageKey);
        setProfileImageFile(null);
      } catch {
        throw new Error('Failed to upload profile image. Please try again.');
      }
    }

    // Nothing has uploaded until this point: staged files upload now, then the
    // payload is sent to the endpoint.
    let finalInnovGallery = innovGallery;
    if (innovGallery.some(g => g.file)) {
      try {
        finalInnovGallery = await Promise.all(innovGallery.map(async g => {
          if (!g.file) return g;
          const uploaded = await uploadFile(g.file);
          if (!uploaded.key) throw new Error('Upload did not return a storage key.');
          const { file: _file, ...rest } = g;
          return { ...rest, name: uploaded.key };
        }));
        setInnovGallery(finalInnovGallery);
      } catch {
        throw new Error('Failed to upload media files. Please try again.');
      }
    }

    const uploadDocs = (docs: { title: string; issuer: string; date: string; file: string; fileObj?: File }[]) =>
      Promise.all(docs.map(async d => {
        if (!d.fileObj) return d; // already on the server (edit mode) — keep as is
        const uploaded = await uploadFile(d.fileObj);
        if (!uploaded.key) throw new Error('Upload did not return a storage key.');
        const { fileObj: _fileObj, ...rest } = d;
        return { ...rest, file: uploaded.key };
      }));

    let finalInnovLicenses = innovLicenses;
    let finalInnovAwards = innovAwards;
    try {
      finalInnovLicenses = await uploadDocs(innovLicenses);
      finalInnovAwards = await uploadDocs(innovAwards);
      setInnovLicenses(finalInnovLicenses);
      setInnovAwards(finalInnovAwards);
    } catch {
      throw new Error('Failed to upload documents. Please try again.');
    }

    return buildInnovationPayload({
      name, profileImage: finalProfileImageKey, payingUser: isPaid, country, bio, innovFields, innovInterests, innovOwnership, innovStage,
      innovSdgs, innovMaterials, innovDimensions, innovWeight, innovUserGroups, innovApplications,
      innovImpact, innovRecommendations, innovCautions,
      innovLicenses: finalInnovLicenses, innovAwards: finalInnovAwards, innovGallery: finalInnovGallery, socialHandles,
      knownUserGroups: userGroupOptions,
    });
  };

  /** Creates a new draft or updates the currently open draft. */
  const persistDraft = async (payload: InnovationPayload): Promise<string | null> => {
    if (draftId) {
      await updateInnovationDraft(draftId, payload);
      return draftId;
    }
    const created: any = await createInnovationDraft(payload);
    const id = created?.id ?? created?._id ?? created?.draftId ?? created?.draft?.id ?? created?.draft?._id ?? created?.innovation?.id;
    const nextId = id ? String(id) : null;
    if (nextId) setDraftId(nextId);
    return nextId;
  };

  /** Saves the current form as a draft when a paid submission cannot be funded. */
  const saveDraftForTopUp = async (isPaid: boolean, existingPayload?: InnovationPayload) => {
    setShowPriceConfirm(false);
    setDraftSavingOpen(true);
    setSaving(true);
    try {
      const payload = existingPayload ?? await prepareUploadedPayload(isPaid);
      await persistDraft(payload);
      setDraftSavingOpen(false);
      setSaving(false);
      toast.success('Your submission was saved as a draft. Top up your wallet to continue.');
      router.push('/dashboard/my-profile?tab=wallet');
    } catch (e: any) {
      setDraftSavingOpen(false);
      setSaving(false);
      toast.error(e?.message || 'Could not save your submission as a draft. Please try again.');
    }
  };

  /** "Save as Draft" / "Update Draft" button handler. */
  const handleSaveDraft = async () => {
    if (saving) return;
    setSaving(true);
    setDraftSaving(true);
    const wasUpdate = !!draftId;
    try {
      const payload = await prepareUploadedPayload(payingUser);
      const id = await persistDraft(payload);
      if (!id && !draftId) {
        toast.success('Draft saved. Open View Drafts to continue it.');
      } else {
        toast.success(wasUpdate ? 'Draft updated' : 'Draft saved');
      }
    } catch (e: any) {
      toast.error(e?.message || 'Failed to save draft');
    } finally {
      setSaving(false);
      setDraftSaving(false);
    }
  };

  /** Clears all Afro-Innovation form state (used after submit or when starting fresh). */
  const resetInnovationForm = () => {
    setEditId(null);
    setDraftId(null);
    setEditBaseline(null);
    setPrefilled(false);
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
    setPayingUser(false);
    setUpgradeMode(false);
    setShowPriceConfirm(false);
  };

  /** Sends an under-funded upgrade to the wallet without creating a draft. */
  const sendUpgradeToWallet = () => {
    setShowPriceConfirm(false);
    setSaving(false);
    toast.error('Your wallet balance is too low to upgrade this listing. Please top up and try again.');
    router.push('/dashboard/my-profile?tab=wallet');
  };

  const performSubmit = async (plan?: ListingPlan) => {
    setSaving(true);

    // Paid plans are paid from the wallet. If the balance is too low, the
    // submission is saved as a draft and the user is sent to top up. An
    // upgrade keeps the existing listing, so it goes straight to the wallet.
    const isPaid = plan === 'paid' ? true : plan === 'free' ? false : payingUser;
    if (plan === 'paid' && stagePrice) {
      const priceMajor = Number(stagePrice) / 100;
      if (Number.isFinite(priceMajor) && priceMajor > 0) {
        try {
          const wallet = await dispatch(fetchWalletBalance()).unwrap();
          if (!wallet || wallet.balance < priceMajor) {
            if (upgradeMode) {
              sendUpgradeToWallet();
              return;
            }
            await saveDraftForTopUp(isPaid);
            return;
          }
        } catch (e) {
          // A balance endpoint that reports an insufficient balance also saves
          // a draft; other failures are left to the server to decide.
          if (isInsufficientBalanceError(e)) {
            if (upgradeMode) {
              sendUpgradeToWallet();
              return;
            }
            await saveDraftForTopUp(isPaid);
            return;
          }
        }
      }
    }

    let payload: InnovationPayload;
    try {
      payload = await prepareUploadedPayload(isPaid);
    } catch (e: any) {
      setShowPriceConfirm(false);
      toast.error(e?.message || 'Failed to prepare your listing. Please try again.');
      setSaving(false);
      return;
    }

    try {
      if (draftId) {
        // The submit endpoint accepts the full listing payload; PATCHing the
        // draft first would validate it as a draft and can reject media fields.
        await submitInnovationDraft(draftId, payload);
      } else if (editId) {
        await updateInnovation(editId, payload);
      } else {
        await createInnovation(payload);
      }
      setShowPriceConfirm(false);
      setPayingUser(isPaid);
      setSuccessInfo({
        title: upgradeMode
          ? 'Listing upgraded to Pro'
          : draftId
            ? 'Draft submitted successfully'
            : editId
              ? 'Innovation updated successfully'
              : 'Innovation submitted successfully',
        message: upgradeMode
          ? 'Your innovation listing is now on the Pro Plan with full visibility and multiple entries.'
          : draftId
            ? 'Your draft has been submitted as a listing and is now waiting for review.'
            : editId
              ? 'Your innovation listing has been updated. Any changes will be reviewed by the AfriScience Hub Team.'
              : 'Your innovation listing has been submitted and is now waiting for review.',
        ...(upgradeMode ? { actionLabel: 'Go to My Listings', actionPath: '/dashboard/my-listings' } : {}),
      });
    } catch (e: any) {
      setShowPriceConfirm(false);
      if (isInsufficientBalanceError(e?.message || e)) {
        if (upgradeMode) {
          sendUpgradeToWallet();
          return;
        }
        await saveDraftForTopUp(isPaid, payload);
        return;
      }
      toast.error(e?.message || 'Failed to save innovation');
      setSaving(false);
      return;
    }
    setSaving(false);
    resetInnovationForm();
    setStep('select');
    setSelectedType(null);
  };

  // Derived state & effects (must run on every render, before any early returns)
  const listingSnapshot = JSON.stringify({
    name, country, bio, innovFields, innovInterests, innovOwnership, innovStage,
    innovSdgs, innovMaterials, innovDimensions, innovWeight, innovUserGroups,
    innovApplications, innovImpact, innovRecommendations, innovCautions,
    innovLicenses: innovLicenses.map(({ fileObj: _file, ...rest }) => rest),
    innovAwards: innovAwards.map(({ fileObj: _file, ...rest }) => rest),
    innovGallery: innovGallery.map(({ file: _file, ...rest }) => rest),
    socialHandles, profileImageKey,
  });
  const hasAnySocial = selectedType === 'innovation'
    ? firstSocialError(socialHandles) === null
    : Object.values(socialLinks).some(v => v.trim().length > 0);
  const editDirty = !!editId && editBaseline !== null && listingSnapshot !== editBaseline;
  const innovationComplete = selectedType === 'innovation' && innovationRequiredError() === null;
  const isFormValid = selectedType === 'innovation'
    ? innovationComplete && (!editId || editDirty || upgradeMode)
    : editId
      ? editDirty && !!name.trim() && !!country && agreed
      : agreed && hasAnySocial;

  useEffect(() => {
    if (!editId || !prefilled || editBaseline) return;
    setEditBaseline(listingSnapshot);
  }, [editId, prefilled, editBaseline, listingSnapshot]);

  const handleSelectType = (typeId: string) => {
    if (typeId === 'institute') {
      setShowInstituteTypeModal(true);
    } else {
      // Closing here stops a still-open selector from following the user onto
      // whichever listing they open next.
      setShowInstituteTypeModal(false);
      resetInnovationForm();
      setSelectedType(typeId as ListingType);
      setInstituteSubType(null);
      setStep('form');
    }
  };

  const handleInstituteTypeSelect = (instituteType: InstituteSubType) => {
    setInstituteSubType(instituteType);
    setSelectedType('institute');
    setStep('form');
  };

  if (initialisingRoute) {
    return (
      <div className="flex items-center justify-center rounded-xl border border-neutral-gray-light bg-white py-20 shadow-sm">
        <p className="text-sm text-neutral-gray-medium">Opening listing...</p>
      </div>
    );
  }

  if (step === 'drafts') {
    return <DraftListView onBack={() => setStep('select')} onContinue={handleContinueDraft} />;
  }

  if (step === 'select') {
    return (
      <>
        <ListingTypeSelector onSelectType={handleSelectType} onViewDrafts={() => setStep('drafts')} />
        {/* Rendered here as well as on the form step: without it the selector
            can never open from the category grid, and a stale open state would
            surface on top of whichever listing is opened next. */}
        <InstituteTypeSelectorModal
          isOpen={showInstituteTypeModal}
          onClose={() => setShowInstituteTypeModal(false)}
          onSelectInstituteType={handleInstituteTypeSelect}
        />
        <ListingSuccessModal
          open={!!successInfo}
          title={successInfo?.title}
          message={successInfo?.message}
          onClose={() => setSuccessInfo(null)}
          onGoToSubmissions={() => {
            setSuccessInfo(null);
            router.push('/dashboard/submissions');
          }}
        />
      </>
    );
  }

  const selectedTypeInfo = LISTING_TYPES.find(t => t.id === selectedType);

  return (
    <div className="space-y-5">
      {!editId && (
        <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {selectedTypeInfo && <selectedTypeInfo.icon className="h-6 w-6 text-brand-red-600" />}
              <div>
                <h2 className="text-xl font-bold text-neutral-black">
                  {draftId ? 'Listing Draft' : `New ${selectedTypeInfo?.label} Listing`}
                </h2>
                <p className="text-sm text-neutral-gray-medium">
                  {draftId
                    ? 'Continue editing your saved draft. Update it or submit it for review when ready.'
                    : <>Fill in the details below. Fields marked <span className="text-brand-red-600">*</span> are required.</>}
                </p>
              </div>
            </div>
            {draftId ? (
              <Button variant="outline" size="sm" onClick={() => setStep('drafts')}>
                <X className="h-4 w-4 mr-1" /> Back to Drafts
              </Button>
            ) : (
              <Button variant="outline" size="sm" onClick={() => { setStep('select'); setSelectedType(null); setInstituteSubType(null); setShowInstituteTypeModal(false); }}>
                <X className="h-4 w-4 mr-1" /> Change Category
              </Button>
            )}
          </div>
        </div>
      )}

      {selectedType === 'center' ? (
        <SpecialistCenterListing onCancel={() => { setStep('select'); setSelectedType(null); setInstituteSubType(null); setShowInstituteTypeModal(false); }} />
      ) : selectedType === 'scientist' ? (
        <ScientistListing onCancel={() => { setStep('select'); setSelectedType(null); setInstituteSubType(null); setShowInstituteTypeModal(false); }} />
      ) : selectedType === 'institute' && instituteSubType === 'primary-secondary' ? (
        <PrimarySecondaryListing onCancel={() => { setStep('select'); setSelectedType(null); setInstituteSubType(null); setShowInstituteTypeModal(false); }} />
      ) : selectedType === 'institute' && instituteSubType === 'university' ? (
        <div className="space-y-5">
          <div className="rounded-xl border border-neutral-gray-light bg-white p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-red-50">
              <Building2 className="h-8 w-8 text-brand-red-600" />
            </div>
            <h3 className="text-lg font-bold text-neutral-black mb-2">University Listing</h3>
            <p className="text-neutral-gray-medium mb-6">University listing form coming soon.</p>
            <Button variant="outline" onClick={() => { setStep('select'); setSelectedType(null); setInstituteSubType(null); setShowInstituteTypeModal(false); }}>
              Back to Institute Types
            </Button>
          </div>
        </div>
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

      {selectedType !== 'innovation' && selectedType !== 'center' && selectedType !== 'scientist' && selectedType !== 'institute' && (
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

      {selectedType !== 'center' && selectedType !== 'scientist' && selectedType !== 'institute' && (
        <FormActions
          onCancel={() => {
            if (editId) { router.push('/dashboard/submissions'); return; }
            if (draftId) { setStep('drafts'); return; }
            setStep('select');
            setSelectedType(null);
            setInstituteSubType(null);
            setShowInstituteTypeModal(false);
          }}
          onSubmit={handleSubmit}
          onSaveDraft={selectedType === 'innovation' ? () => { void handleSaveDraft(); } : undefined}
          showDraft={!editId}
          draftLabel={draftId ? 'Update Draft' : 'Save as Draft'}
          draftDisabled={saving}
          submitLabel={upgradeMode ? 'Submit for Review' : editId ? 'Save changes' : 'Submit for Review'}
          disabled={saving || !isFormValid}
          loading={saving && !draftSaving}
          draftLoading={draftSaving}
        />
      )}

      {/* Price confirmation before a new listing is submitted */}
      <PriceConfirmModal
        open={showPriceConfirm}
        price={stagePrice}
        stage={innovStage}
        saving={saving}
        upgrade={upgradeMode}
        onConfirm={(plan) => { void performSubmit(plan); }}
        onEditEntries={upgradeMode ? () => setShowPriceConfirm(false) : undefined}
        onCancel={() => { setShowPriceConfirm(false); setUpgradeMode(false); }}
      />

      {/* Institute type selector modal */}
      <InstituteTypeSelectorModal
        isOpen={showInstituteTypeModal}
        onClose={() => setShowInstituteTypeModal(false)}
        onSelectInstituteType={handleInstituteTypeSelect}
      />

      {/* Success confirmation — no automatic redirect; the user decides. */}
      <ListingSuccessModal
        open={!!successInfo}
        title={successInfo?.title}
        message={successInfo?.message}
        actionLabel={successInfo?.actionLabel}
        onClose={() => setSuccessInfo(null)}
        onGoToSubmissions={() => {
          const path = successInfo?.actionPath || '/dashboard/submissions';
          setSuccessInfo(null);
          router.push(path);
        }}
      />

      {/* Shown while an under-funded paid submission is auto-saved as a draft. */}
      <DraftSavingModal open={draftSavingOpen} />
    </div>
  );
}
