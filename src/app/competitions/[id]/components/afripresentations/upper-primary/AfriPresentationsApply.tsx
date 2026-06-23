'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FileText, CheckCircle } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { useAuth } from '@/app/context/AuthContext';
import { toast } from 'sonner';
import PaymentModal from '../../PaymentModal';
import type { Competition } from '@/app/competitions/data';
import {
  AutoFieldsSection, LanguageSection, SchoolInfoSection,
  ParentNameSection, SummarySection, SocialHandlesSection
} from '../shared/components/ApplyFormSections';
import {
  ProfilePictureSection, IdCardUploadSection, GuardianIdSection
} from '../shared/components/UploadSections';

interface Props {
  comp: Competition;
}

export function AfriPresentationsApply({ comp }: Props) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const savedTopic = sessionStorage.getItem('comp_topic') || '';

  const [language, setLanguage] = useState('');
  const [otherLanguage, setOtherLanguage] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [schoolAddress, setSchoolAddress] = useState('');
  const [parentName, setParentName] = useState('');
  const [summary, setSummary] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');
  const [profilePic, setProfilePic] = useState<{ file: File; preview: string } | null>(null);
  const [contestantId, setContestantId] = useState<{ file: File; preview: string } | null>(null);
  const [guardianIdType, setGuardianIdType] = useState('');
  const [otherIdType, setOtherIdType] = useState('');
  const [guardianId, setGuardianId] = useState<{ file: File; preview: string } | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const idTag = useMemo(() => user?.email?.split('@')[0]?.toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase(), []);
  const wordCount = summary.trim() ? summary.trim().split(/\s+/).length : 0;

  const handleProfileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setProfilePic({ file, preview: reader.result as string });
    reader.readAsDataURL(file);
  };

  const handleContestantIdUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setContestantId({ file, preview: reader.result as string });
    reader.readAsDataURL(file);
  };

  const handleGuardianIdUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setGuardianId({ file, preview: reader.result as string });
    reader.readAsDataURL(file);
  };

  const validate = () => {
    if (!language) { toast.error('Please select a language.'); return false; }
    if (language === 'Other' && !otherLanguage.trim()) { toast.error('Please specify your language.'); return false; }
    if (!schoolName.trim()) { toast.error('Please enter your school/institute name.'); return false; }
    if (!schoolAddress.trim()) { toast.error('Please enter your school/institute address.'); return false; }
    if (!parentName.trim()) { toast.error('Please enter your parent/guardian\'s name.'); return false; }
    if (!summary.trim()) { toast.error('Please enter a presentation summary.'); return false; }
    if (wordCount > 500) { toast.error('Summary exceeds 500 words.'); return false; }
    if (!profilePic) { toast.error('Please upload a profile picture.'); return false; }
    if (!contestantId) { toast.error('Please upload the contestant\'s ID card.'); return false; }
    if (!guardianIdType) { toast.error('Please select the parent/guardian\'s ID card type.'); return false; }
    if (guardianIdType === 'Other' && !otherIdType.trim()) { toast.error('Please specify the ID card type.'); return false; }
    if (!guardianId) { toast.error('Please upload the parent/guardian\'s ID card.'); return false; }
    return true;
  };

  const handleSubmit = () => { if (validate()) setShowPayment(true); };

  const handlePayment = () => {
    setPaymentProcessing(true);
    setTimeout(() => {
      setPaymentProcessing(false);
      setShowPayment(false);
      const gatewayRef = 'PS-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      toast.success('Payment successful! Redirecting...');
      sessionStorage.setItem('comp_ref', gatewayRef);
      sessionStorage.setItem('comp_application', JSON.stringify({
        refNo: gatewayRef, compId: comp.id, compTitle: comp.title, compType: comp.type,
        category: comp.category, country: comp.country, deadline: comp.deadline,
        topic: savedTopic, language: language === 'Other' ? otherLanguage : language,
        schoolName, schoolAddress, parentName, presentationSummary: summary,
        socialHandles: { linkedin, twitter, instagram, facebook },
        applicationDate: new Date().toISOString(), userName: user?.name, userEmail: user?.email,
      }));
      router.push(`/competitions/${comp.id}/submission`);
    }, 2000);
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-bg-light">
        <h2 className="text-2xl font-bold text-neutral-black">Please log in first</h2>
        <Link href="/login"><Button className="mt-4">Go to Login</Button></Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-full bg-brand-red-100 flex items-center justify-center text-brand-red-600">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-neutral-black">Application Form</h1>
            <p className="text-sm text-neutral-gray-dark">{comp.type}: {comp.country}</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light space-y-6">
        <AutoFieldsSection user={user} idTag={idTag} comp={comp} topic={savedTopic} />
        <LanguageSection language={language} otherLanguage={otherLanguage} onLanguageChange={setLanguage} onOtherLanguageChange={setOtherLanguage} />
        <SchoolInfoSection schoolName={schoolName} schoolAddress={schoolAddress} onSchoolNameChange={setSchoolName} onSchoolAddressChange={setSchoolAddress} />
        <ParentNameSection parentName={parentName} onParentNameChange={setParentName} />
        <SummarySection summary={summary} wordCount={wordCount} wordLimit={500} onSummaryChange={setSummary} />
        <SocialHandlesSection linkedin={linkedin} twitter={twitter} instagram={instagram} facebook={facebook} onLinkedinChange={setLinkedin} onTwitterChange={setTwitter} onInstagramChange={setInstagram} onFacebookChange={setFacebook} />
        <ProfilePictureSection preview={profilePic?.preview || null} fileName={profilePic?.file.name || null} onUpload={handleProfileUpload} />
        <div className="border-t border-neutral-gray-light pt-6">
          <IdCardUploadSection
            label="Contestant's ID Card"
            description='Upload "National ID Card/Slip"'
            preview={contestantId?.preview || null}
            fileName={contestantId?.file.name || null}
            onUpload={handleContestantIdUpload}
          />
        </div>
        <GuardianIdSection
          idType={guardianIdType}
          otherIdType={otherIdType}
          preview={guardianId?.preview || null}
          fileName={guardianId?.file.name || null}
          onIdTypeChange={setGuardianIdType}
          onOtherIdTypeChange={setOtherIdType}
          onUpload={handleGuardianIdUpload}
        />
        <div className="pt-4 border-t border-neutral-gray-light">
          <Button size="lg" className="w-full bg-brand-red-600 hover:bg-brand-red-700 py-5 text-lg" onClick={handleSubmit}>
            <CheckCircle className="h-5 w-5 mr-2" /> Finalize Application
          </Button>
          <p className="text-xs text-neutral-gray-medium text-center mt-3">This will register your application. You can then upload your media on the next page.</p>
        </div>
      </div>
      {showPayment && (
        <PaymentModal compTitle={comp.title} registrationFee={comp.registrationFee} selectedTopic={savedTopic || null} paymentProcessing={paymentProcessing} onCancel={() => setShowPayment(false)} onProceed={handlePayment} />
      )}
    </div>
  );
}
