'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '../../../../components/ui/Button';
import { YourInfoSection } from './YourInfoSection';
import { TierSelectionSection } from './TierSelectionSection';
import { CompanyInfoSection } from './CompanyInfoSection';
import { LocationContactSection } from './LocationContactSection';
import { CatalogSection } from './CatalogSection';
import { LicensesSection } from './LicensesSection';
import { AwardsSection } from './AwardsSection';
import { PoliciesSection } from './PoliciesSection';
import { MediaSection } from './MediaSection';
import type { User } from '../../../../context/AuthContext';
import type { CatalogEntry, LicenseEntry, AwardEntry } from '../data';

interface SponsorshipFormProps {
  user: User | null;
  isAuthenticated: boolean;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onSaveDraft: () => void;
}

const MAX_INDUSTRIES: Record<string, number> = {
  Bronze: 1,
  Silver: 5,
  Gold: Infinity,
  Platinum: Infinity,
};

function createEmptyCatalogEntry(): CatalogEntry {
  return {
    productName: '',
    currency: 'local',
    price: '',
    ashDiscountPrice: '',
    specifications: [],
    images: [],
  };
}

export function SponsorshipForm({ user, isAuthenticated, isSubmitting, onSubmit, onSaveDraft }: SponsorshipFormProps) {
  const searchParams = useSearchParams();
  const initialTier = searchParams.get('tier') || '';

  const [tier, setTier] = useState(initialTier);
  const [companyName, setCompanyName] = useState('');
  const [companyMotto, setCompanyMotto] = useState('');
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [displayPicture, setDisplayPicture] = useState<File | null>(null);
  const [companyDescription, setCompanyDescription] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');
  const [catalogByIndustry, setCatalogByIndustry] = useState<Record<string, CatalogEntry[]>>({});
  const [licenses, setLicenses] = useState<LicenseEntry[]>([]);
  const [awards, setAwards] = useState<AwardEntry[]>([]);
  const [policies, setPolicies] = useState<string[]>(['']);
  const [mediaGallery, setMediaGallery] = useState<File[]>([]);
  const [undertakingAccepted, setUndertakingAccepted] = useState(false);

  useEffect(() => {
    if (initialTier) setTier(initialTier);
  }, [initialTier]);

  const maxIndustries = MAX_INDUSTRIES[tier] || 0;

  const handleIndustryToggle = (industry: string) => {
    if (selectedIndustries.includes(industry)) {
      const updated = selectedIndustries.filter(i => i !== industry);
      setSelectedIndustries(updated);
      const newCatalog = { ...catalogByIndustry };
      delete newCatalog[industry];
      setCatalogByIndustry(newCatalog);
    } else if (selectedIndustries.length < maxIndustries) {
      setSelectedIndustries([...selectedIndustries, industry]);
      if (!catalogByIndustry[industry]) {
        setCatalogByIndustry({ ...catalogByIndustry, [industry]: [] });
      }
    }
  };

  const handleAddCatalogItem = (industry: string) => {
    const current = catalogByIndustry[industry] || [];
    setCatalogByIndustry({ ...catalogByIndustry, [industry]: [...current, createEmptyCatalogEntry()] });
  };

  const handleRemoveCatalogItem = (industry: string, index: number) => {
    const current = [...(catalogByIndustry[industry] || [])];
    current.splice(index, 1);
    setCatalogByIndustry({ ...catalogByIndustry, [industry]: current });
  };

  const handleUpdateCatalogItem = (industry: string, index: number, field: keyof CatalogEntry, value: any) => {
    const current = [...(catalogByIndustry[industry] || [])];
    current[index] = { ...current[index], [field]: value };
    setCatalogByIndustry({ ...catalogByIndustry, [industry]: current });
  };

  const handleAddSpecification = (industry: string, itemIndex: number) => {
    const current = [...(catalogByIndustry[industry] || [])];
    if (current[itemIndex].specifications.length < 10) {
      current[itemIndex] = { ...current[itemIndex], specifications: [...current[itemIndex].specifications, ''] };
      setCatalogByIndustry({ ...catalogByIndustry, [industry]: current });
    }
  };

  const handleRemoveSpecification = (industry: string, itemIndex: number, specIndex: number) => {
    const current = [...(catalogByIndustry[industry] || [])];
    current[itemIndex] = {
      ...current[itemIndex],
      specifications: current[itemIndex].specifications.filter((_, i) => i !== specIndex),
    };
    setCatalogByIndustry({ ...catalogByIndustry, [industry]: current });
  };

  const handleUpdateSpecification = (industry: string, itemIndex: number, specIndex: number, value: string) => {
    const current = [...(catalogByIndustry[industry] || [])];
    const specs = [...current[itemIndex].specifications];
    specs[specIndex] = value;
    current[itemIndex] = { ...current[itemIndex], specifications: specs };
    setCatalogByIndustry({ ...catalogByIndustry, [industry]: current });
  };

  const handleAddCatalogImage = (industry: string, itemIndex: number, files: FileList) => {
    const current = [...(catalogByIndustry[industry] || [])];
    const newImages = [...current[itemIndex].images, ...Array.from(files)].slice(0, 5);
    current[itemIndex] = { ...current[itemIndex], images: newImages };
    setCatalogByIndustry({ ...catalogByIndustry, [industry]: current });
  };

  const handleRemoveCatalogImage = (industry: string, itemIndex: number, imageIndex: number) => {
    const current = [...(catalogByIndustry[industry] || [])];
    current[itemIndex] = {
      ...current[itemIndex],
      images: current[itemIndex].images.filter((_, i) => i !== imageIndex),
    };
    setCatalogByIndustry({ ...catalogByIndustry, [industry]: current });
  };

  const handleAddLicense = () => {
    setLicenses([...licenses, { name: '', issuedBy: '', year: '', document: null }]);
  };

  const handleRemoveLicense = (index: number) => {
    setLicenses(licenses.filter((_, i) => i !== index));
  };

  const handleUpdateLicense = (index: number, field: keyof LicenseEntry, value: any) => {
    const updated = [...licenses];
    updated[index] = { ...updated[index], [field]: value };
    setLicenses(updated);
  };

  const handleAddAward = () => {
    setAwards([...awards, { name: '', awardedBy: '', year: '', document: null }]);
  };

  const handleRemoveAward = (index: number) => {
    setAwards(awards.filter((_, i) => i !== index));
  };

  const handleUpdateAward = (index: number, field: keyof AwardEntry, value: any) => {
    const updated = [...awards];
    updated[index] = { ...updated[index], [field]: value };
    setAwards(updated);
  };

  const handleAddMedia = (files: FileList) => {
    const newFiles = [...mediaGallery, ...Array.from(files)].slice(0, 10);
    setMediaGallery(newFiles);
  };

  const handleRemoveMedia = (index: number) => {
    setMediaGallery(mediaGallery.filter((_, i) => i !== index));
  };

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={onSubmit} className="space-y-8">
          <YourInfoSection user={user} />
          <TierSelectionSection selectedTier={tier} onTierChange={setTier} />
          <CompanyInfoSection
            companyName={companyName} onCompanyNameChange={setCompanyName}
            companyMotto={companyMotto} onCompanyMottoChange={setCompanyMotto}
            selectedIndustries={selectedIndustries} onIndustryToggle={handleIndustryToggle}
            maxIndustries={maxIndustries}
            displayPicture={displayPicture} onDisplayPictureChange={setDisplayPicture}
            companyDescription={companyDescription} onCompanyDescriptionChange={setCompanyDescription}
          />
          <LocationContactSection
            address={address} onAddressChange={setAddress}
            country={country} onCountryChange={setCountry}
            state={state} onStateChange={setState}
            phone={phone} onPhoneChange={setPhone}
            email={email} onEmailChange={setEmail}
            website={website} onWebsiteChange={setWebsite}
            linkedin={linkedin} onLinkedinChange={setLinkedin}
            twitter={twitter} onTwitterChange={setTwitter}
            instagram={instagram} onInstagramChange={setInstagram}
            facebook={facebook} onFacebookChange={setFacebook}
          />
          {tier && (
            <CatalogSection
              industries={selectedIndustries}
              catalogByIndustry={catalogByIndustry}
              onAddCatalogItem={handleAddCatalogItem}
              onRemoveCatalogItem={handleRemoveCatalogItem}
              onUpdateCatalogItem={handleUpdateCatalogItem}
              onAddSpecification={handleAddSpecification}
              onRemoveSpecification={handleRemoveSpecification}
              onUpdateSpecification={handleUpdateSpecification}
              onAddCatalogImage={handleAddCatalogImage}
              onRemoveCatalogImage={handleRemoveCatalogImage}
            />
          )}
          <LicensesSection
            licenses={licenses}
            onAddLicense={handleAddLicense}
            onRemoveLicense={handleRemoveLicense}
            onUpdateLicense={handleUpdateLicense}
          />
          <AwardsSection
            awards={awards}
            onAddAward={handleAddAward}
            onRemoveAward={handleRemoveAward}
            onUpdateAward={handleUpdateAward}
          />
          <PoliciesSection
            policies={policies}
            onAddPolicy={() => setPolicies([...policies, ''])}
            onRemovePolicy={(idx) => setPolicies(policies.filter((_, i) => i !== idx))}
            onUpdatePolicy={(idx, val) => {
              const updated = [...policies];
              updated[idx] = val;
              setPolicies(updated);
            }}
          />
          <MediaSection
            mediaGallery={mediaGallery}
            onAddMedia={handleAddMedia}
            onRemoveMedia={handleRemoveMedia}
            undertakingAccepted={undertakingAccepted}
            onUndertakingChange={setUndertakingAccepted}
          />

          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Button type="button" variant="outline" onClick={onSaveDraft} disabled={isSubmitting} className="h-12 px-8">
              Save as Draft
            </Button>
            <Button type="submit" disabled={!isAuthenticated || isSubmitting || !undertakingAccepted} className="h-12 px-8 bg-brand-red-600 hover:bg-brand-red-700">
              {isSubmitting ? 'Submitting...' : isAuthenticated ? 'Submit Application' : 'Log in to Apply'}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
