'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, FileText, Upload, X } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/input';
import { useAuth } from '@/app/context/AuthContext';
import { toast } from 'sonner';
import { IMPACT_CAUSES } from '@/app/data/impactData';
import { CAUSE_DETAILS } from './data';
import ProgressIndicator from './components/ProgressIndicator';
import SelectCauseStep from './components/SelectCauseStep';
import ReviewRequirementsStep from './components/ReviewRequirementsStep';
import ApplicationFormStep from './components/ApplicationFormStep';

export default function ImpactApplication() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCause, setSelectedCause] = useState('');
  const [hasAgreed, setHasAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    applicantName: user?.name || '',
    applicantEmail: user?.email || '',
    organizationName: '',
    organizationType: '',
    registrationNumber: '',
    country: '',
    state: '',
    address: '',
    phone: '',
    website: '',
    projectTitle: '',
    projectDescription: '',
    targetBeneficiaries: '',
    expectedImpact: '',
    timeline: '',
    budget: '',
    documents: [] as File[]
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData({
        ...formData,
        documents: [...formData.documents, ...newFiles]
      });
    }
  };

  const removeDocument = (index: number) => {
    setFormData({
      ...formData,
      documents: formData.documents.filter((_, i) => i !== index)
    });
  };

  const handleNext = () => {
    if (currentStep === 1 && !selectedCause) {
      toast.error('Please select a cause to continue');
      return;
    }
    if (currentStep === 2 && !hasAgreed) {
      toast.error('Please agree to the requirements to continue');
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error('Please log in to submit an application');
      router.push('/login');
      return;
    }

    if (!formData.organizationName || !formData.projectTitle || !formData.projectDescription) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Application submitted successfully! You can track it in your dashboard.');

      setTimeout(() => {
        router.push('/dashboard?tab=impact');
      }, 2000);
    }, 2000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-bg-light flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-neutral-black mb-4">Login Required</h2>
          <p className="text-neutral-gray-dark mb-6">
            Please log in to apply for impact support.
          </p>
          <Link href="/login">
            <Button className="bg-brand-red-600 hover:bg-brand-red-700">
              Log In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-bg-light pb-16">
      <section className="bg-brand-navy-900 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/impact"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Impact
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">Apply for Support</h1>
          <p className="text-slate-300">Submit your application for impact funding</p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <ProgressIndicator currentStep={currentStep} />

          {currentStep === 1 && (
            <SelectCauseStep
              selectedCause={selectedCause}
              setSelectedCause={setSelectedCause}
              handleNext={handleNext}
            />
          )}

          {currentStep === 2 && selectedCause && (
            <ReviewRequirementsStep
              selectedCause={selectedCause}
              hasAgreed={hasAgreed}
              setHasAgreed={setHasAgreed}
              handleNext={handleNext}
              handleBack={handleBack}
            />
          )}

          {currentStep === 3 && (
            <ApplicationFormStep
              selectedCause={selectedCause}
              formData={formData}
              handleInputChange={handleInputChange}
              handleFileChange={handleFileChange}
              removeDocument={removeDocument}
              handleSubmit={handleSubmit}
              handleBack={handleBack}
              isSubmitting={isSubmitting}
            />
          )}
        </div>
      </div>
    </div>
  );
}
