'use client';

import { useState, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  User, Hash, FileText, Calendar, MapPin, BookOpen, Edit3,
  Link as LinkIcon, Camera, CreditCard, CheckCircle, Upload, ChevronDown, Briefcase
} from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { useAuth } from '@/app/context/AuthContext';
import { toast } from 'sonner';
import PaymentModal from './PaymentModal';
import type { Competition } from '../../data';

interface AfriMySpaceApplyProps {
  comp: Competition;
}

const ID_CARD_TYPES = ['National ID Card', "Driver's Licence", 'International Passport', 'Other'];
const WORD_LIMIT = 500;

function AutoField({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
        <Icon className="h-3.5 w-3.5" /> {label}
      </label>
      <div className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm bg-neutral-bg-light text-neutral-black font-medium">{value}</div>
      <p className="text-[10px] text-neutral-gray-medium mt-1">Automatically filled by platform</p>
    </div>
  );
}

export function AfriMySpaceApply({ comp }: AfriMySpaceApplyProps) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const profilePicRef = useRef<HTMLInputElement>(null);
  const idCardRef = useRef<HTMLInputElement>(null);

  const [profession, setProfession] = useState('');
  const [spaceDescription, setSpaceDescription] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(null);
  const [idCardType, setIdCardType] = useState('');
  const [otherIdCard, setOtherIdCard] = useState('');
  const [idCardFile, setIdCardFile] = useState<File | null>(null);
  const [idCardPreview, setIdCardPreview] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const idTag = useMemo(() => user?.email?.split('@')[0]?.toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase(), [user?.email]);
  const wordCount = spaceDescription.trim() ? spaceDescription.trim().split(/\s+/).length : 0;

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) { toast.error('Please upload an image file.'); return; }
    setProfilePicture(file);
    const reader = new FileReader();
    reader.onload = () => setProfilePicPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleIdCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) { toast.error('Please upload an image file.'); return; }
    setIdCardFile(file);
    const reader = new FileReader();
    reader.onload = () => setIdCardPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const validate = () => {
    if (!profession.trim()) { toast.error('Please enter your profession.'); return false; }
    if (!spaceDescription.trim()) { toast.error('Please enter a space description.'); return false; }
    if (wordCount > WORD_LIMIT) { toast.error(`Description exceeds ${WORD_LIMIT} words.`); return false; }
    if (!profilePicture) { toast.error('Please upload a profile picture.'); return false; }
    if (!idCardType) { toast.error('Please select an ID card type.'); return false; }
    if (idCardType === 'Other' && !otherIdCard.trim()) { toast.error('Please specify your ID card type.'); return false; }
    if (!idCardFile) { toast.error('Please upload your ID card.'); return false; }
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
        profession, spaceDescription,
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

  const autoFields = [
    { icon: User, label: 'Name', value: user.name },
    { icon: Hash, label: 'ID Tag', value: idTag },
    { icon: FileText, label: 'Competition Type', value: comp.type },
    { icon: FileText, label: 'Category', value: comp.category },
    { icon: Calendar, label: 'Application Date', value: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) },
    { icon: Calendar, label: 'Submission Deadline', value: new Date(comp.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) },
    { icon: MapPin, label: 'Country', value: comp.country },
  ];

  const socialFields = [
    { label: 'LinkedIn', value: linkedin, setter: setLinkedin },
    { label: 'Twitter', value: twitter, setter: setTwitter },
    { label: 'Instagram', value: instagram, setter: setInstagram },
    { label: 'Facebook', value: facebook, setter: setFacebook },
  ];

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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {autoFields.map((f) => <AutoField key={f.label} icon={f.icon} label={f.label} value={f.value} />)}
        </div>

        <div className="border-t border-neutral-gray-light pt-6">
          <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
            <Briefcase className="h-3.5 w-3.5" /> Profession
          </label>
          <input type="text" value={profession} onChange={(e) => setProfession(e.target.value)}
            placeholder="Input your profession"
            className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600" />
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
            <Edit3 className="h-3.5 w-3.5" /> Space Description
          </label>
          <textarea value={spaceDescription} onChange={(e) => setSpaceDescription(e.target.value)}
            placeholder="Briefly describe your workspace (mention tools and equipment used)"
            rows={5}
            className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600 resize-y" />
          <p className="text-[10px] text-neutral-gray-medium mt-1 text-right">{wordCount}/{WORD_LIMIT} words max.</p>
        </div>

        <div className="border-t border-neutral-gray-light pt-6">
          <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-3">
            <LinkIcon className="h-3.5 w-3.5" /> Social Handles
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {socialFields.map((s) => (
              <div key={s.label}>
                <label className="text-xs text-neutral-gray-medium mb-1 block">{s.label}</label>
                <input type="url" value={s.value} onChange={(e) => s.setter(e.target.value)}
                  placeholder={`https://${s.label.toLowerCase()}.com/...`}
                  className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600" />
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-neutral-gray-light pt-6">
          <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-3">
            <Camera className="h-3.5 w-3.5" /> Profile Picture
          </label>
          <div className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors border-neutral-gray-light hover:border-brand-red-300 hover:bg-brand-red-50/30"
            onClick={() => profilePicRef.current?.click()}>
            <input ref={profilePicRef} type="file" accept="image/*" onChange={handleProfilePicChange} className="hidden" />
            {profilePicPreview ? (
              <div className="flex flex-col items-center">
                <div className="relative h-24 w-24 rounded-full overflow-hidden mb-3">
                  <Image src={profilePicPreview} alt="Profile preview" fill className="object-cover" sizes="96px" />
                </div>
                <p className="font-bold text-green-800">{profilePicture?.name}</p>
                <p className="text-xs text-neutral-gray-medium mt-1">Click to replace</p>
              </div>
            ) : (
              <div>
                <Camera className="h-10 w-10 text-neutral-gray-light mx-auto mb-2" />
                <p className="text-sm text-neutral-gray-dark">Upload your facial image only</p>
                <p className="text-xs text-neutral-gray-medium mt-1">picture / image file formats only</p>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-neutral-gray-light pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-4">
            <div>
              <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
                <CreditCard className="h-3.5 w-3.5" /> Government ID Card
              </label>
              <div className="relative">
                <select value={idCardType} onChange={(e) => setIdCardType(e.target.value)}
                  className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm appearance-none bg-white focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600">
                  <option value="">Select ID card type</option>
                  {ID_CARD_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium pointer-events-none" />
              </div>
              {idCardType === 'Other' && (
                <input type="text" value={otherIdCard} onChange={(e) => setOtherIdCard(e.target.value)}
                  placeholder="Specify ID card type..."
                  className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm mt-2 focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600" />
              )}
            </div>
          </div>
          <div className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors border-neutral-gray-light hover:border-brand-red-300 hover:bg-brand-red-50/30"
            onClick={() => idCardRef.current?.click()}>
            <input ref={idCardRef} type="file" accept="image/*" onChange={handleIdCardChange} className="hidden" />
            {idCardPreview ? (
              <div className="flex flex-col items-center">
                <div className="relative h-28 w-48 rounded-lg overflow-hidden mb-3">
                  <Image src={idCardPreview} alt="ID card preview" fill className="object-cover" sizes="192px" />
                </div>
                <p className="font-bold text-green-800">{idCardFile?.name}</p>
                <p className="text-xs text-neutral-gray-medium mt-1">Click to replace</p>
              </div>
            ) : (
              <div>
                <Upload className="h-8 w-8 text-neutral-gray-light mx-auto mb-2" />
                <p className="text-sm text-neutral-gray-dark leading-relaxed">
                  To verify your identity, kindly upload a copy of any valid government issued ID card (National ID card, Driver&apos;s license, Voter&apos;s card, International passport, etc.). Uploaded documents are securely stored and protected from unauthorized access.
                </p>
                <p className="text-xs text-neutral-gray-medium mt-2">picture / image file formats only</p>
              </div>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-neutral-gray-light">
          <Button size="lg" className="w-full bg-brand-red-600 hover:bg-brand-red-700 py-5 text-lg" onClick={handleSubmit}>
            <CheckCircle className="h-5 w-5 mr-2" /> Finalize Application
          </Button>
          <p className="text-xs text-neutral-gray-medium text-center mt-3">
            This will register your application. You can then upload your media on the next page.
          </p>
        </div>
      </div>

      {showPayment && (
        <PaymentModal
          compTitle={comp.title}
          registrationFee={comp.registrationFee}
          selectedTopic={profession}
          paymentProcessing={paymentProcessing}
          onCancel={() => setShowPayment(false)}
          onProceed={handlePayment}
        />
      )}
    </div>
  );
}
