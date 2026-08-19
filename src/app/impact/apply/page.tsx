'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { useAuth } from '@/app/context/AuthContext';
import { toast } from 'sonner';
import ProgressIndicator from './components/ProgressIndicator';
import SelectCauseStep from './components/SelectCauseStep';
import ReviewRequirementsStep from './components/ReviewRequirementsStep';
import CareerApplicationForm from './career/CareerApplicationForm';
import ResearchApplicationForm from './research/ResearchApplicationForm';
import ScholarshipApplicationForm from './scholarship/ScholarshipApplicationForm';

function scrollToTop() {
  if (typeof window === 'undefined') return;
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export default function ImpactApplication() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedProgram, setSelectedProgram] = useState('');
  const [hasAgreed, setHasAgreed] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => scrollToTop());
    return () => cancelAnimationFrame(id);
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep === 1 && !selectedProgram) {
      toast.error('Please select a program to continue');
      return;
    }
    if (currentStep === 2 && !hasAgreed) {
      toast.error('Please agree to the undertaking statement to continue');
      return;
    }
    setCurrentStep((s) => s + 1);
  };

  const handleBack = () => setCurrentStep((s) => s - 1);

  const goDashboard = () => router.push('/dashboard?tab=impact');

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-bg-light flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-neutral-black mb-4">Login Required</h2>
          <p className="text-neutral-gray-dark mb-6">Please log in to apply for impact aid.</p>
          <Link href="/login">
            <Button className="bg-brand-red-600 hover:bg-brand-red-700">Log In</Button>
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
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">Apply for Aid</h1>
          <p className="text-slate-300">
            Submit your application for impact-funding under our enlightenment programs
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <ProgressIndicator currentStep={currentStep} />

          {currentStep === 1 && (
            <SelectCauseStep
              selectedCause={selectedProgram}
              setSelectedCause={(p) => {
                setSelectedProgram(p);
                setHasAgreed(false);
              }}
              handleNext={handleNext}
            />
          )}

          {currentStep === 2 && selectedProgram && (
            <ReviewRequirementsStep
              selectedCause={selectedProgram}
              hasAgreed={hasAgreed}
              setHasAgreed={setHasAgreed}
              handleNext={handleNext}
              handleBack={handleBack}
            />
          )}

          {currentStep === 3 && selectedProgram === 'Career Support' && (
            <CareerApplicationForm
              user={user || {}}
              onBack={handleBack}
              onSubmitSuccess={goDashboard}
            />
          )}

          {currentStep === 3 && selectedProgram === 'Research Support' && (
            <ResearchApplicationForm
              user={user || {}}
              onBack={handleBack}
              onSubmitSuccess={goDashboard}
            />
          )}

          {currentStep === 3 && selectedProgram === 'Educational Scholarship' && (
            <ScholarshipApplicationForm
              user={user || {}}
              onBack={handleBack}
              onSubmitSuccess={goDashboard}
            />
          )}
        </div>
      </div>
    </div>
  );
}
