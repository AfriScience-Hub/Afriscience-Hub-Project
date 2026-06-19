'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, DollarSign } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'sonner';
import { SponsorshipForm } from './components/SponsorshipForm';
import { type CatalogItem } from './data';

export default function BecomeASponsor() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    companyName: '',
    industry: '',
    motto: '',
    description: '',
    country: '',
    state: '',
    address: '',
    phone: '',
    website: '',
    linkedin: '',
    twitter: '',
    facebook: '',
    tier: '',
    status: 'Online',
  });

  const [catalogItems, setCatalogItems] = useState<CatalogItem[]>([{ name: '', price: '' }]);
  const [policies, setPolicies] = useState<string[]>(['']);
  const [displayPicture, setDisplayPicture] = useState<File | null>(null);
  const [licenses, setLicenses] = useState<File[]>([]);
  const [mediaGallery, setMediaGallery] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPaystackModal, setShowPaystackModal] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addCatalogItem = () => setCatalogItems([...catalogItems, { name: '', price: '' }]);
  const removeCatalogItem = (index: number) => setCatalogItems(catalogItems.filter((_, i) => i !== index));
  const updateCatalogItem = (index: number, field: 'name' | 'price', value: string) => {
    const newItems = [...catalogItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setCatalogItems(newItems);
  };

  const handleSaveDraft = () => {
    toast.success('Application saved as draft!');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) { toast.error('Please log in first'); return; }
    if (!formData.tier) { toast.error('Please select a sponsorship tier'); return; }
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setShowPaystackModal(true);
    setIsSubmitting(false);
  };

  const handlePaystackConfirm = async () => {
    setShowPaystackModal(false);
    toast.success('Sponsorship application submitted successfully!');
    router.push('/support/sponsor');
  };

  return (
    <div className="pb-16">
      <section className="relative bg-brand-navy-900 py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1712903276864-79723b184ffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBzcG9uc29yc2hpcCUyMGV2ZW50JTIwc3RhZ2V8ZW58MXx8fHwxNzcyODY5MDQ3fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Sponsor"
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy-900/60 to-brand-navy-900" />
        </div>
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/support/sponsor" className="inline-flex items-center gap-1 text-slate-400 hover:text-white text-sm mb-6 transition-colors">
            <ArrowRight className="h-3 w-3 rotate-180" /> Back to Sponsor
          </Link>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-400 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              <DollarSign className="h-4 w-4" />
              Apply for Sponsorship
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Become a Sponsor
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl mb-8">
              Fill out the form below to apply for a sponsorship partnership with AfriScience Hub. Our team will review your application and get back to you within 5 business days.
            </p>
          </div>
        </div>
      </section>

      <SponsorshipForm
        formData={formData}
        onInputChange={handleInputChange}
        catalogItems={catalogItems}
        addCatalogItem={addCatalogItem}
        removeCatalogItem={removeCatalogItem}
        updateCatalogItem={updateCatalogItem}
        policies={policies}
        setPolicies={setPolicies}
        displayPicture={displayPicture}
        setDisplayPicture={setDisplayPicture}
        licenses={licenses}
        setLicenses={setLicenses}
        mediaGallery={mediaGallery}
        setMediaGallery={setMediaGallery}
        isAuthenticated={isAuthenticated}
        isSubmitting={isSubmitting}
        onSaveDraft={handleSaveDraft}
        onSubmit={handleSubmit}
      />

      {showPaystackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
            <DollarSign className="h-16 w-16 text-emerald-600 mx-auto mb-4 bg-emerald-100 rounded-full p-3" />
            <h2 className="text-2xl font-bold text-neutral-black mb-2">Complete Your Sponsorship</h2>
            <p className="text-slate-500 mb-6">
              You selected the <strong>{formData.tier}</strong> tier. Complete your payment to finalize your sponsorship application.
            </p>
            <div className="flex flex-col gap-3">
              <Button onClick={handlePaystackConfirm} className="w-full h-12 bg-brand-red-600 hover:bg-brand-red-700">
                Proceed to Payment
              </Button>
              <Button onClick={() => setShowPaystackModal(false)} variant="outline" className="w-full">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
