'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, IdCard, Microscope, DollarSign, Flag, ShieldCheck, ImagePlus, Clock, Send, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuth } from '@/app/context/AuthContext';
import CollapsibleSection from '@/app/dashboard/upload-new-listing/components/CollapsibleSection';
import FormActions from '@/app/dashboard/upload-new-listing/components/FormActions';
import UndertakingSection from '@/app/dashboard/upload-new-listing/components/UndertakingSection';
import YourInformationSection, { type YourInformation } from '@/app/dashboard/upload-new-listing/components/specialist-center-listing/components/YourInformationSection';
import CenterIdentitySection from '@/app/dashboard/upload-new-listing/components/specialist-center-listing/components/CenterIdentitySection';
import CenterInformationSection from '@/app/dashboard/upload-new-listing/components/specialist-center-listing/components/CenterInformationSection';
import CenterFeesSection from '@/app/dashboard/upload-new-listing/components/specialist-center-listing/components/CenterFeesSection';
import CenterScopePolicySection from '@/app/dashboard/upload-new-listing/components/specialist-center-listing/components/CenterScopePolicySection';
import CenterDocumentsSection from '@/app/dashboard/upload-new-listing/components/specialist-center-listing/components/CenterDocumentsSection';
import CenterHighlightSection from '@/app/dashboard/upload-new-listing/components/specialist-center-listing/components/CenterHighlightSection';
import CenterGallerySection, { type MediaItem } from '@/app/dashboard/upload-new-listing/components/specialist-center-listing/components/CenterGallerySection';
import type { CenterDocEntry, CenterFees, CenterHighlight, CenterIdentity, CenterInformation } from '@/app/dashboard/upload-new-listing/components/specialist-center-listing/types';

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

/**
 * Admin counterpart of the dashboard specialist centre form. It composes the
 * exact same section components, but the submit only creates the listing on
 * the admin side and returns to the specialist centres overview.
 */
export default function AdminCreateCentrePage() {
  const router = useRouter();
  const { user } = useAuth();

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
  const [saving, setSaving] = useState(false);

  const yourInfo: YourInformation = {
    fullName: user?.name || 'Platform Administrator',
    phone: user?.phone || '',
    email: user?.email || '',
    username: (user?.email || '').split('@')[0] || 'admin',
  };

  const patchIdentity = (patch: Partial<CenterIdentity>) => setIdentity((prev) => ({ ...prev, ...patch }));
  const patchInfo = (patch: Partial<CenterInformation>) => setInfo((prev) => ({ ...prev, ...patch }));
  const patchFees = (patch: Partial<CenterFees>) => setFees((prev) => ({ ...prev, ...patch }));
  const patchHighlight = (patch: Partial<CenterHighlight>) => setHighlight((prev) => ({ ...prev, ...patch }));

  const resetForm = () => {
    setIdentity(EMPTY_IDENTITY);
    setInfo(EMPTY_INFO);
    setFees(EMPTY_FEES);
    setScopes([]); setPolicies([]); setLicenses([{ ...EMPTY_LICENSE }]); setAwards([]);
    setHighlight(EMPTY_HIGHLIGHT);
    setGallery({}); setAgreed(false);
  };

  const hasAnySocial = Object.values(identity.socials).some((v) => v.trim().length > 0);
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

    setSaving(true);
    toast.success('Specialist centre submitted. It will appear in the queue for review before it is published.');
    resetForm();
    setTimeout(() => {
      setSaving(false);
      router.push('/admin/categories/special-centres');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link
            href="/admin/categories/special-centres"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#453DD8] hover:underline mb-1.5"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Specialist Centers
          </Link>
          <h1 className="text-lg font-bold text-neutral-black">Add New Specialist Centre</h1>
          <p className="text-xs text-neutral-gray-medium mt-0.5">
            Fill in the centre details below. New listings are created directly under the platform.
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
        onCancel={() => { resetForm(); router.push('/admin/categories/special-centres'); }}
        onSubmit={handleSubmit}
        disabled={!isFormValid}
      />
    </div>
  );
}
