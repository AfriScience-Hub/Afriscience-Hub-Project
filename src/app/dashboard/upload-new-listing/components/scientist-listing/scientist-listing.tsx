'use client';

import { useRouter } from 'next/navigation';
import { Info, Loader2 } from 'lucide-react';
import ListingSuccessModal from '../afro-innovation-listing/components/ListingSuccessModal';
import FormActions from '../FormActions';
import UndertakingSection from '../UndertakingSection';
import ScientistProfileSection from './components/ScientistProfileSection';
import ProfessionalDetailsSection from './components/ProfessionalDetailsSection';
import ScientistFeesSection from './components/ScientistFeesSection';
import ScientistScopePolicySection from './components/ScientistScopePolicySection';
import ScientistDocumentsSection from './components/ScientistDocumentsSection';
import ProfessionalHighlightSection from './components/ProfessionalHighlightSection';
import ScientistGallerySection from './components/ScientistGallerySection';
import ScientistContactSection from './components/ScientistContactSection';
import ScientistPriceModal from './components/ScientistPriceModal';
import DraftSavedModal from './components/DraftSavedModal';
import { useScientistListingForm } from './useScientistListingForm';

interface ScientistListingProps {
  onCancel: () => void;
  /** Existing listing being edited. */
  listingId?: string | null;
  /** Saved draft being continued. */
  draftId?: string | null;
  /** Start the upgrade-to-Pro flow. */
  upgrade?: boolean;
}

export default function ScientistListing({ onCancel, listingId, draftId, upgrade = false }: ScientistListingProps) {
  const router = useRouter();
  const form = useScientistListingForm({ listingId, draftId, upgrade });

  const finish = (path = '/dashboard/submissions') => {
    form.setSuccess(null);
    form.resetForm();
    onCancel();
    router.push(path);
  };

  if (form.recordLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-neutral-gray-light bg-white py-20 shadow-sm">
        <Loader2 className="h-7 w-7 animate-spin text-brand-red-600" />
        <p className="text-sm text-neutral-gray-medium">Loading listing details...</p>
      </div>
    );
  }

  return (
    <>
      {form.approvedEditMode && (
        <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            This listing is approved. You can update services, costs, images, degree, scopes, policies, highlights,
            certificates, achievements, media and work hours. Existing services, scopes, certificates and achievements
            cannot be removed.
          </p>
        </div>
      )}

      <ScientistProfileSection profile={form.profile} onChange={form.patchProfile} approvedEditMode={form.approvedEditMode} />

      <ProfessionalDetailsSection
        details={form.details}
        onChange={form.patchDetails}
        fields={form.options.fields}
        degrees={form.options.degrees}
        services={form.options.services}
        professions={form.options.professions}
        approvedEditMode={form.approvedEditMode}
      />

      <ScientistFeesSection services={form.details.services} fees={form.fees} onChange={form.patchFees} />

      <ScientistScopePolicySection
        scopes={form.scopes}
        setScopes={form.setScopes}
        policies={form.policies}
        setPolicies={form.setPolicies}
        approvedEditMode={form.approvedEditMode}
      />

      <ScientistDocumentsSection
        certifications={form.certifications}
        setCertifications={form.setCertifications}
        achievements={form.achievements}
        setAchievements={form.setAchievements}
        approvedEditMode={form.approvedEditMode}
      />

      <ProfessionalHighlightSection highlight={form.highlight} onChange={form.patchHighlight} />

      <ScientistGallerySection media={form.media} onChange={form.setMedia} />

      <ScientistContactSection contact={form.contact} onChange={form.patchContact} approvedEditMode={form.approvedEditMode} />

      <UndertakingSection agreed={form.agreed} setAgreed={form.setAgreed} />

      {!form.isFormValid && form.validationError && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5 text-xs text-amber-800">
          <span className="font-semibold">Before you submit:</span> {form.validationError}
        </div>
      )}

      <FormActions
        onCancel={() => { form.resetForm(); onCancel(); }}
        onSubmit={form.handleSubmit}
        onSaveDraft={form.approvedEditMode ? undefined : () => { void form.handleSaveDraft(); }}
        showDraft={!form.approvedEditMode}
        draftLabel={form.savedDraftId ? 'Update Draft' : 'Save as Draft'}
        draftDisabled={form.saving}
        submitLabel={upgrade ? 'Upgrade to Pro' : listingId ? 'Save changes' : 'Submit for Review'}
        disabled={form.saving}
        loading={form.saving && !form.draftSaving}
        draftLoading={form.draftSaving}
      />

      <ScientistPriceModal
        open={form.showPrice}
        price={form.priceQuote?.price}
        extraCharge={form.isAfrican ? form.priceQuote?.extraCharge : undefined}
        professionCount={form.professionCount}
        regionLabel={form.isAfrican ? 'African' : 'Non-African'}
        saving={form.saving}
        upgrade={upgrade}
        onConfirm={(plan) => { void form.performSubmit(plan); }}
        onEditEntries={upgrade ? () => form.setShowPrice(false) : undefined}
        onCancel={() => form.setShowPrice(false)}
      />

      <DraftSavedModal
        open={!!form.draftNotice}
        title={form.draftNotice?.title}
        message={form.draftNotice?.message}
        onClose={() => form.setDraftNotice(null)}
      />

      <ListingSuccessModal
        open={!!form.success}
        title={form.success?.title}
        message={form.success?.message}
        actionLabel={form.success?.actionLabel}
        onClose={() => finish(form.success?.actionPath || '/dashboard/submissions')}
        onGoToSubmissions={() => finish(form.success?.actionPath || '/dashboard/submissions')}
      />
    </>
  );
}
