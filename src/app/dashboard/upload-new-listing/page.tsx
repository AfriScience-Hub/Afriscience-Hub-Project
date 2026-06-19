'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/app/components/ui/Button';
import { LISTING_TYPES, AFRICAN_COUNTRIES, GALLERY_CATEGORIES, type ListingType, type ServiceEntry } from './data';
import ListingTypeSelector from './components/ListingTypeSelector';
import BasicProfileSection from './components/BasicProfileSection';
import CategorySpecificSection from './components/CategorySpecificSection';
import ContactSection from './components/ContactSection';
import ServicesSection from './components/ServicesSection';
import MediaGallerySection from './components/MediaGallerySection';
import DocumentsSection from './components/DocumentsSection';
import PoliciesSection from './components/PoliciesSection';
import FormActions from './components/FormActions';

export default function UploadNewListing() {
  const [selectedType, setSelectedType] = useState<ListingType | null>(null);
  const [step, setStep] = useState<'select' | 'form'>('select');

  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [country, setCountry] = useState('');
  const [stateRegion, setStateRegion] = useState('');
  const [bio, setBio] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [socialLinks, setSocialLinks] = useState({ twitter: '', linkedin: '', facebook: '', instagram: '' });

  const [services, setServices] = useState<ServiceEntry[]>([]);
  const [newService, setNewService] = useState<ServiceEntry>({ id: '', name: '', description: '', costRange: '' });

  const [galleryImages, setGalleryImages] = useState<{ category: string; name: string }[]>([]);
  const [certifications, setCertifications] = useState<{ name: string; file: string }[]>([]);
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

  const [compType, setCompType] = useState('');
  const [compDeadline, setCompDeadline] = useState('');
  const [compFee, setCompFee] = useState('');

  const [awardType, setAwardType] = useState('');

  const handleAddGalleryImage = (category: string) => {
    setGalleryImages(prev => [...prev, { category, name: `Image_${Date.now()}.jpg` }]);
    toast.success(`Image added to ${category}`);
  };

  const handleAddCertification = () => {
    setCertifications(prev => [...prev, { name: `Certificate_${Date.now()}.pdf`, file: 'mock.pdf' }]);
    toast.success('Document uploaded');
  };

  const handleProfileImageUpload = () => {
    setProfileImage('https://images.unsplash.com/photo-1670881391783-9c55ba592f93?auto=format&fit=crop&q=80&w=200');
    toast.success('Profile image uploaded');
  };

  const handleSubmit = () => {
    if (!name.trim() || !country) {
      toast.error('Please fill in at least the Name and Country fields');
      return;
    }
    toast.success('Listing submitted for verification! You will be notified once reviewed.');
    setStep('select');
    setSelectedType(null);
    setName(''); setProfileImage(null); setCountry(''); setStateRegion('');
    setBio(''); setPhone(''); setEmail(''); setWebsite('');
    setSocialLinks({ twitter: '', linkedin: '', facebook: '', instagram: '' });
    setServices([]); setGalleryImages([]); setCertifications([]); setPolicies('');
  };

  if (step === 'select') {
    return <ListingTypeSelector onSelectType={(typeId) => { setSelectedType(typeId as ListingType); setStep('form'); }} />;
  }

  const selectedTypeInfo = LISTING_TYPES.find(t => t.id === selectedType);

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {selectedTypeInfo && <selectedTypeInfo.icon className="h-6 w-6 text-brand-red-600" />}
            <div>
              <h2 className="text-xl font-bold text-neutral-black">New {selectedTypeInfo?.label} Listing</h2>
              <p className="text-sm text-neutral-gray-medium">Fill in the details below. Fields marked * are required.</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => { setStep('select'); setSelectedType(null); }}>
            <X className="h-4 w-4 mr-1" /> Change Category
          </Button>
        </div>
      </div>

      <BasicProfileSection
        selectedType={selectedType!}
        name={name} setName={setName}
        profileImage={profileImage} setProfileImage={setProfileImage}
        country={country} setCountry={setCountry}
        stateRegion={stateRegion} setStateRegion={setStateRegion}
        bio={bio} setBio={setBio}
        instMotto={instMotto} setInstMotto={setInstMotto}
        handleProfileImageUpload={handleProfileImageUpload}
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

      <ServicesSection
        services={services} setServices={setServices}
        newService={newService} setNewService={setNewService}
      />

      <MediaGallerySection
        galleryImages={galleryImages}
        handleAddGalleryImage={handleAddGalleryImage}
        GALLERY_CATEGORIES={GALLERY_CATEGORIES}
      />

      <DocumentsSection
        certifications={certifications}
        setCertifications={setCertifications}
        handleAddCertification={handleAddCertification}
      />

      <PoliciesSection policies={policies} setPolicies={setPolicies} />

      <FormActions
        onCancel={() => { setStep('select'); setSelectedType(null); }}
        onDraft={() => toast.success('Draft saved!')}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
