'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuth } from '@/app/context/AuthContext';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchFullProfile } from '@/store/profileSlice';
import { useScientistOptions } from '@/app/data/scientistOptions';
import { uploadFile } from '@/lib/upload';
import { formatAmountDisplay } from '@/lib/amounts';
import { type DocEntry, EMPTY_DOC } from '../DocList';
import type { MediaItem } from './components/ScientistGallerySection';
import type { ScientistPlan } from './components/ScientistPriceModal';
import { mapScientistRecord } from './recordMapper';
import { limitWords } from '../../wordUtils';
import { AFRICAN_COUNTRIES } from '../../data';
import { statusKind } from '../../../my-listings/statusUtils';
import {
  buildScientistPayload,
  createScientistDraft,
  fetchScientistListing,
  fetchScientistPrice,
  submitScientistListing,
  updateScientistListing,
  upgradeScientistListing,
  type ScientistPayload,
  type ScientistPriceQuote,
} from './scientistApi';
import type { ProfessionalDetails, ProfessionalHighlight, ScientistContact, ScientistFees, ScientistProfile } from './types';

export const MAX_BIO_WORDS = 1000;

const EMPTY_PROFILE: ScientistProfile = { profileImage: null, backgroundImage: null, name: '', country: '', stateRegion: '', bio: '' };
const EMPTY_DETAILS: ProfessionalDetails = { field: '', professions: [], professionOther: '', degree: '', degreeCertificate: '', services: [] };
const EMPTY_FEES: ScientistFees = { serviceCosts: {}, otherCharges: [] };
const EMPTY_CONTACT: ScientistContact = { socials: { LinkedIn: '', Twitter: '', Instagram: '', Facebook: '' } };
const EMPTY_HIGHLIGHT: ProfessionalHighlight = { responseTime: '', workDays: [], workHours: [] };

export interface SuccessInfo {
  title: string;
  message: string;
  actionLabel?: string;
  actionPath?: string;
}

interface UseScientistListingFormProps {
  listingId?: string | null;
  draftId?: string | null;
  upgrade?: boolean;
}

/** All state, loading and submit logic for the scientist listing form. */
export function useScientistListingForm({ listingId, draftId, upgrade = false }: UseScientistListingFormProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAuth();
  const personal = useAppSelector((s) => s.profile.personal);
  const options = useScientistOptions();

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
  const [payingUser, setPayingUser] = useState(false);
  const [editStatus, setEditStatus] = useState<string | null>(null);
  const [record, setRecord] = useState<unknown>(null);
  const [prefilled, setPrefilled] = useState(false);
  const [recordLoading, setRecordLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [draftSaving, setDraftSaving] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [priceQuote, setPriceQuote] = useState<ScientistPriceQuote | null>(null);
  const [success, setSuccess] = useState<SuccessInfo | null>(null);
  const [draftNotice, setDraftNotice] = useState<{ title: string; message: string } | null>(null);
  const [savedDraftId, setSavedDraftId] = useState<string | null>(draftId ?? null);

  useEffect(() => { dispatch(fetchFullProfile()); }, [dispatch]);

  const fullName = personal?.fullName || (personal ? [personal.firstname, personal.middlename, personal.surname].filter(Boolean).join(' ') : (user?.name || ''));

  useEffect(() => {
    setProfile((prev) => ({ ...prev, name: prev.name || fullName }));
  }, [fullName]);

  useEffect(() => {
    const id = listingId || draftId;
    if (!id) return;
    let cancelled = false;
    setRecordLoading(true);
    fetchScientistListing(id)
      .then((item) => { if (!cancelled) setRecord(item); })
      .catch((e: any) => toast.error(e?.message || 'Failed to load listing'))
      .finally(() => { if (!cancelled) setRecordLoading(false); });
    return () => { cancelled = true; };
  }, [listingId, draftId]);

  useEffect(() => {
    if (!record || options.loading || prefilled) return;
    const mapped = mapScientistRecord(record, options);
    setProfile(mapped.profile);
    setDetails(mapped.details);
    setFees(mapped.fees);
    setScopes(mapped.scopes);
    setPolicies(mapped.policies);
    setCertifications(mapped.certifications);
    setAchievements(mapped.achievements);
    setHighlight(mapped.highlight);
    setMedia(mapped.media);
    setContact(mapped.contact);
    setPayingUser(mapped.payingUser);
    setEditStatus(mapped.status);
    setPrefilled(true);
    if (upgrade) setShowPrice(true);
  }, [record, options, prefilled, upgrade]);

  const professionCount = details.professions.length;
  const isAfrican = AFRICAN_COUNTRIES.includes(profile.country);
  const priceType = professionCount > 1 ? 'MULTIPLE' : 'SINGLE';

  useEffect(() => {
    if (!professionCount || !profile.country) { setPriceQuote(null); return; }
    let cancelled = false;
    fetchScientistPrice(professionCount, { location: isAfrican ? 'AFRICAN' : 'NON-AFRICAN', type: priceType })
      .then((quote) => { if (!cancelled) setPriceQuote(quote); })
      .catch(() => { if (!cancelled) setPriceQuote(null); });
    return () => { cancelled = true; };
  }, [professionCount, profile.country, isAfrican, priceType]);

  const patchProfile = (patch: Partial<ScientistProfile>) => setProfile((prev) => ({ ...prev, ...patch }));
  const patchDetails = (patch: Partial<ProfessionalDetails>) => setDetails((prev) => ({ ...prev, ...patch }));
  const patchFees = (patch: Partial<ScientistFees>) => setFees((prev) => ({ ...prev, ...patch }));
  const patchHighlight = (patch: Partial<ProfessionalHighlight>) => setHighlight((prev) => ({ ...prev, ...patch }));
  const patchContact = (patch: Partial<ScientistContact>) => setContact((prev) => ({ ...prev, ...patch }));

  const approvedEditMode = !!listingId && statusKind(editStatus) === 'approved';
  const hasAnySocial = Object.values(contact.socials).some((value) => value.trim().length > 0);
  const bioWords = profile.bio.trim() ? profile.bio.trim().split(/\s+/).length : 0;
  const highlightOk = !!highlight.responseTime && highlight.workDays.length > 0 && highlight.workHours.length > 0;

  const requiredError = (): string | null => {
    if (bioWords > MAX_BIO_WORDS) return `Bio must be a maximum of ${MAX_BIO_WORDS} words`;
    if (!profile.name.trim() || !profile.country) return 'Please fill in your Name and Country';
    if (!profile.bio.trim()) return 'Please add a short bio';
    if (!details.field) return 'Please select a Field';
    if (details.professions.length === 0) return 'Please select at least one Profession';
    if (details.professions.includes('Other') && !details.professionOther.trim()) return 'Please specify the other Profession';
    if (!details.degree) return 'Please select a Degree';
    if (!highlightOk) {
      if (!highlight.responseTime) return 'Please select a Response Time';
      if (highlight.workDays.length === 0) return 'Please select at least one Work Day';
      return 'Please add your Work Hours';
    }
    if (details.services.length === 0) return 'Please select at least one Service';
    if (!hasAnySocial) return 'Please provide at least one social handle';
    if (!agreed) return 'Please accept the undertaking remark before submitting';
    return null;
  };
  const validationError = requiredError();
  const isFormValid = validationError === null;

  const resetForm = () => {
    setProfile(EMPTY_PROFILE); setDetails(EMPTY_DETAILS); setFees(EMPTY_FEES);
    setScopes([]); setPolicies([]); setCertifications([EMPTY_DOC]); setAchievements([EMPTY_DOC]);
    setHighlight(EMPTY_HIGHLIGHT); setMedia([]); setContact(EMPTY_CONTACT); setAgreed(false);
    setPayingUser(false); setEditStatus(null); setRecord(null); setPrefilled(false);
    setShowPrice(false); setPriceQuote(null); setSavedDraftId(null); setDraftNotice(null);
  };

  const uploadMedia = async (): Promise<MediaItem[]> => {
    const next = await Promise.all(media.map(async (item) => {
      if (!item.file) return item;
      const uploaded = await uploadFile(item.file);
      if (!uploaded.key) throw new Error('Upload did not return a storage key.');
      return { ...item, file: null, url: uploaded.key, previewUrl: uploaded.url || item.previewUrl, name: uploaded.originalName || item.name };
    }));
    setMedia(next);
    return next;
  };

  const uploadCertificates = async (entries: DocEntry[]): Promise<DocEntry[]> => {
    const next = await Promise.all(entries.map(async (entry) => {
      if (!entry.file) return entry;
      const uploaded = await uploadFile(entry.file);
      if (!uploaded.key) throw new Error('Upload did not return a storage key.');
      return { ...entry, file: null, key: uploaded.key, previewUrl: uploaded.url || entry.previewUrl };
    }));
    setCertifications(next);
    return next;
  };

  const uploadAchievements = async (entries: DocEntry[]): Promise<DocEntry[]> => {
    const next = await Promise.all(entries.map(async (entry) => {
      if (!entry.file) return entry;
      const uploaded = await uploadFile(entry.file);
      if (!uploaded.key) throw new Error('Upload did not return a storage key.');
      return { ...entry, file: null, key: uploaded.key, previewUrl: uploaded.url || entry.previewUrl };
    }));
    setAchievements(next);
    return next;
  };

  const preparePayload = async (isPaid: boolean): Promise<ScientistPayload> => {
    let finalMedia = media;
    let finalCertificates = certifications;
    let finalAchievements = achievements;
    let finalProfileImage = profile.profileImage;
    let finalBackgroundImage = profile.backgroundImage;
    let finalDegreeCertificate = details.degreeCertificate;

    try {
      finalMedia = await uploadMedia();
      finalCertificates = await uploadCertificates(certifications);
      finalAchievements = await uploadAchievements(achievements);

      // Images and the degree certificate stay local until this point so a
      // draft or a review submission is the only thing that uploads files.
      if (profile.profileImageFile) {
        const uploaded = await uploadFile(profile.profileImageFile);
        if (!uploaded.key) throw new Error('Profile image upload did not return a storage key.');
        finalProfileImage = uploaded.key;
        setProfile((prev) => ({
          ...prev,
          profileImage: uploaded.url || uploaded.key || prev.profileImage,
          profileImageFile: null,
        }));
      }

      if (profile.backgroundImageFile) {
        const uploaded = await uploadFile(profile.backgroundImageFile);
        if (!uploaded.key) throw new Error('Background image upload did not return a storage key.');
        finalBackgroundImage = uploaded.key;
        setProfile((prev) => ({
          ...prev,
          backgroundImage: uploaded.url || uploaded.key || prev.backgroundImage,
          backgroundImageFile: null,
        }));
      }

      if (details.degreeCertificateFile) {
        const uploaded = await uploadFile(details.degreeCertificateFile);
        if (!uploaded.key) throw new Error('Degree certificate upload did not return a storage key.');
        finalDegreeCertificate = uploaded.key;
        setDetails((prev) => ({
          ...prev,
          degreeCertificate: uploaded.key || prev.degreeCertificate,
          degreeCertificateName: uploaded.originalName || prev.degreeCertificateName,
          degreeCertificateFile: null,
        }));
      }
    } catch {
      throw new Error('Failed to upload some files. Please try again.');
    }

    return buildScientistPayload({
      name: profile.name,
      bio: limitWords(profile.bio, MAX_BIO_WORDS),
      country: profile.country,
      state: profile.stateRegion,
      profileImage: finalProfileImage,
      backgroundImage: finalBackgroundImage,
      professionNames: details.professions,
      professionOther: details.professionOther,
      serviceNames: details.services,
      degreeName: details.degree,
      degreeCertificate: finalDegreeCertificate,
      serviceCosts: fees.serviceCosts,
      otherCosts: fees.otherCharges,
      scopes,
      policies,
      certificates: finalCertificates.map((entry) => ({ name: entry.name, issuer: entry.issuer, year: entry.year, document: entry.key || entry.previewUrl || '' })),
      achievements: finalAchievements.map((entry) => ({ name: entry.name, issuer: entry.issuer, year: entry.year, document: entry.key || entry.previewUrl || '' })),
      media: finalMedia.map((item) => item.url || item.previewUrl || item.name),
      socials: contact.socials,
      highlights: highlight,
      professions: options.professions,
      services: options.services,
      degrees: options.degrees,
    });
  };

  const handleSubmit = () => {
    const error = requiredError();
    if (error) return toast.error(error);
    if (!listingId || upgrade) { setShowPrice(true); return; }
    void performSubmit();
  };

  const performSubmit = async (plan?: ScientistPlan) => {
    if (saving) return;
    setSaving(true);
    const isPaid = plan === 'paid' ? true : plan === 'free' ? false : payingUser;
    try {
      const payload = await preparePayload(isPaid);
      if (savedDraftId) {
        await updateScientistListing(savedDraftId, payload);
        await submitScientistListing(savedDraftId, isPaid);
      } else if (listingId) {
        await updateScientistListing(listingId, payload);
        if (upgrade && isPaid) await upgradeScientistListing(listingId);
      } else {
        const created: any = await createScientistDraft(payload);
        const id = created?.id ?? created?._id ?? created?.listingId ?? created?.listing?.id;
        if (!id) throw new Error('The listing was saved but no id was returned.');
        setSavedDraftId(String(id));
        await submitScientistListing(String(id), isPaid);
      }
      setShowPrice(false);
      setPayingUser(isPaid);
      const actionPath = approvedEditMode || upgrade ? '/dashboard/my-listings' : '/dashboard/submissions';
      setSuccess({
        title: upgrade
          ? 'Listing upgraded to Pro'
          : listingId
            ? 'Listing updated successfully'
            : 'Listing submitted for review',
        message: upgrade
          ? 'Your scientist listing is now on the Pro Plan with full visibility and multiple entries.'
          : listingId
            ? 'Your scientist listing has been updated. Any changes will be reviewed by the AfriScience Hub Team.'
            : 'Your scientist listing has been submitted and is now waiting for review.',
        actionLabel: actionPath === '/dashboard/my-listings' ? 'Go to My Listings' : undefined,
        actionPath,
      });
    } catch (e: any) {
      const message = e?.message || 'Failed to save the listing';
      if (/insufficient|not enough|low balance|wallet balance/i.test(message)) {
        const details = e?.details ?? {};
        const required = Number(details.required ?? Number(details.requiredMinor) / 100);
        const available = Number(details.available ?? Number(details.availableMinor) / 100);
        const currency = details.currency || 'USD';
        const text = Number.isFinite(required) && Number.isFinite(available)
          ? `Insufficient wallet balance. You need ${currency} ${formatAmountDisplay(required)} but only have ${currency} ${formatAmountDisplay(available)}. Redirecting to your wallet...`
          : 'Insufficient wallet balance. Redirecting to your wallet to top up...';
        toast.error(text);
        setShowPrice(false);
        setTimeout(() => router.push('/dashboard/my-profile?tab=wallet'), 1800);
        return;
      }
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveDraft = async () => {
    if (saving) return;
    setSaving(true);
    setDraftSaving(true);
    try {
      const payload = await preparePayload(payingUser);
      if (savedDraftId) {
        await updateScientistListing(savedDraftId, payload);
        setDraftNotice({
          title: 'Draft updated',
          message: 'Your draft has been updated. You can close this window and continue editing your listing.',
        });
      } else if (listingId) {
        await updateScientistListing(listingId, payload);
        setDraftNotice({
          title: 'Listing saved',
          message: 'Your changes have been saved. You can close this window and continue editing your listing.',
        });
      } else {
        const created: any = await createScientistDraft(payload);
        const id = created?.id ?? created?._id ?? created?.listingId ?? created?.listing?.id;
        if (id) setSavedDraftId(String(id));
        setDraftNotice({
          title: 'Draft saved',
          message: 'Your draft has been saved. You can close this window and continue editing, or submit it for review when you are ready.',
        });
      }
    } catch (e: any) {
      toast.error(e?.message || 'Failed to save draft');
    } finally {
      setSaving(false);
      setDraftSaving(false);
    }
  };

  return {
    profile, details, fees, scopes, policies, certifications, achievements, highlight, media, contact, agreed,
    setScopes, setPolicies, setCertifications, setAchievements, setMedia, setAgreed,
    patchProfile, patchDetails, patchFees, patchHighlight, patchContact,
    options, saving, draftSaving, showPrice, setShowPrice, priceQuote, success, setSuccess,
    draftNotice, setDraftNotice,
    professionCount, isAfrican, approvedEditMode, isFormValid, validationError, savedDraftId,
    recordLoading, resetForm, handleSubmit, handleSaveDraft, performSubmit,
  };
}
