'use client';

import { useState } from 'react';
import { ArrowLeft, Loader2, Send } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { AFRICAN_COUNTRIES } from '@/app/data/mockData';
import {
  buildInnovationPayload,
  createInnovation,
} from '@/app/dashboard/upload-new-listing/innovationApi';
import type { LicenseDoc } from '@/app/dashboard/upload-new-listing/components/afro-innovation-listing/components/InnovationFormControls';
import AfroInnovationListing from '@/app/dashboard/upload-new-listing/components/afro-innovation-listing/afro-innovation-listing';
import { uploadFile } from '@/lib/upload';

/** Gallery row shape used by the shared AfroInnovationListing form. */
type GalleryFile = { category: string; type: 'image' | 'video'; name: string; file?: File };
/** Social handle row shape used by the shared AfroInnovationListing form. */
type SocialHandle = { name: string; link: string };

/**
 * Admin create page for a new Afro-Innovation listing. It reuses the exact
 * same form the dashboard upload flow uses, but submits through the admin
 * token so the listing is created on behalf of the platform.
 */
export default function AdminCreateInnovationPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileImageKey, setProfileImageKey] = useState<string | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  const [country, setCountry] = useState('');
  const [bio, setBio] = useState('');
  const [socialHandles, setSocialHandles] = useState<SocialHandle[]>([{ name: '', link: '' }]);
  const [agreed, setAgreed] = useState(false);

  const [innovFields, setInnovFields] = useState<string[]>([]);
  const [innovInterests, setInnovInterests] = useState<string[]>([]);
  const [innovOwnership, setInnovOwnership] = useState('');
  const [innovStage, setInnovStage] = useState('');
  const [innovSdgs, setInnovSdgs] = useState<string[]>([]);
  const [innovMaterials, setInnovMaterials] = useState<string[]>([]);
  const [innovDimensions, setInnovDimensions] = useState({ length: '', width: '', height: '', unit: 'cm' });
  const [innovWeight, setInnovWeight] = useState({ value: '', unit: 'kg' });
  const [innovUserGroups, setInnovUserGroups] = useState<string[]>([]);
  const [innovApplications, setInnovApplications] = useState<string[]>([]);
  const [innovImpact, setInnovImpact] = useState<string[]>([]);
  const [innovRecommendations, setInnovRecommendations] = useState<string[]>([]);
  const [innovCautions, setInnovCautions] = useState<string[]>([]);
  const [innovLicenses, setInnovLicenses] = useState<LicenseDoc[]>([]);
  const [innovAwards, setInnovAwards] = useState<LicenseDoc[]>([]);
  const [innovGallery, setInnovGallery] = useState<GalleryFile[]>([]);

  const [saving, setSaving] = useState(false);

  /**
   * Uploads every newly picked file first, then sends the storage keys to
   * POST /listings/innovations. Upload failures are surfaced inline and abort
   * the submit so no half-uploaded listing is created.
   */
  const handleSubmit = async () => {
    if (!name.trim() || !country) {
      toast.error('Please fill in at least the Name and Country fields');
      return;
    }
    setSaving(true);

    // 1. Cover / display image
    let finalProfileImageKey = profileImageKey;
    if (profileImageFile) {
      try {
        const uploaded = await uploadFile(profileImageFile);
        if (!uploaded.key) throw new Error('Upload did not return a storage key.');
        finalProfileImageKey = uploaded.key;
      } catch {
        toast.error('Failed to upload profile image. Please try again.');
        setSaving(false);
        return;
      }
    }

    // 2. Media gallery
    let finalInnovGallery = innovGallery;
    if (innovGallery.some((g) => g.file)) {
      try {
        finalInnovGallery = await Promise.all(
          innovGallery.map(async (g) => {
            if (!g.file) return g;
            const uploaded = await uploadFile(g.file);
            if (!uploaded.key) throw new Error('Upload did not return a storage key.');
            return { ...g, name: uploaded.key };
          })
        );
      } catch {
        toast.error('Failed to upload media files. Please try again.');
        setSaving(false);
        return;
      }
    }

    // 3. Certifications / licences
    let finalInnovLicenses = innovLicenses;
    if (innovLicenses.some((d) => d.fileObj)) {
      try {
        finalInnovLicenses = await Promise.all(
          innovLicenses.map(async (d) => {
            if (!d.fileObj) return d;
            const uploaded = await uploadFile(d.fileObj);
            if (!uploaded.key) throw new Error('Upload did not return a storage key.');
            return { ...d, file: uploaded.key };
          })
        );
      } catch {
        toast.error('Failed to upload documents. Please try again.');
        setSaving(false);
        return;
      }
    }

    // 4. Awards
    let finalInnovAwards = innovAwards;
    if (innovAwards.some((d) => d.fileObj)) {
      try {
        finalInnovAwards = await Promise.all(
          innovAwards.map(async (d) => {
            if (!d.fileObj) return d;
            const uploaded = await uploadFile(d.fileObj);
            if (!uploaded.key) throw new Error('Upload did not return a storage key.');
            return { ...d, file: uploaded.key };
          })
        );
      } catch {
        toast.error('Failed to upload awards. Please try again.');
        setSaving(false);
        return;
      }
    }

    try {
      await createInnovation(
        buildInnovationPayload({
          name,
          profileImage: finalProfileImageKey,
          // Admin-created listings get full visibility.
          payingUser: true,
          country,
          bio,
          innovFields,
          innovInterests,
          innovOwnership,
          innovStage,
          innovSdgs,
          innovMaterials,
          innovDimensions,
          innovWeight,
          innovUserGroups,
          innovApplications,
          innovImpact,
          innovRecommendations,
          innovCautions,
          innovLicenses: finalInnovLicenses,
          innovAwards: finalInnovAwards,
          innovGallery: finalInnovGallery,
          socialHandles,
        })
      );
      toast.success('Innovation listing created');
      router.push('/admin/categories/afro-innovations');
    } catch (e: any) {
      toast.error(e?.message || 'Failed to create the innovation listing');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link
            href="/admin/categories/afro-innovations"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#453DD8] hover:underline mb-1.5"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Afro-Innovations
          </Link>
          <h1 className="text-lg font-bold text-neutral-black">Create Afro-Innovation Listing</h1>
          <p className="text-xs text-neutral-gray-medium mt-0.5">
            Fill in the innovation details below. New listings are created directly under the platform.
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
    </div>
  );
}
