'use client';

import { useState, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  User, Hash, FileText, Calendar, MapPin, Globe, BookOpen, Edit3,
  Link as LinkIcon, Camera, CreditCard, CheckCircle, Upload, ChevronDown
} from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { useAuth } from '@/app/context/AuthContext';
import { toast } from 'sonner';
import PaymentModal from './PaymentModal';
import type { Competition } from '../../data';

interface AfriAnimeApplyProps {
  comp: Competition;
}

const LANGUAGES = ['English', 'French', 'Arabic', 'Portuguese', 'Spanish', 'Afrikaans', 'Other'];
const ID_CARD_TYPES = ['National ID Card', "Driver's Licence", 'International Passport', 'Other'];
const WORD_LIMIT = 1000;

export function AfriAnimeApply({ comp }: AfriAnimeApplyProps) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const profilePicRef = useRef<HTMLInputElement>(null);
  const idCardRef = useRef<HTMLInputElement>(null);

  const [language, setLanguage] = useState('');
  const [otherLanguage, setOtherLanguage] = useState('');
  const [animationTitle, setAnimationTitle] = useState('');
  const [animationSummary, setAnimationSummary] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(null);
  const [idCardType, setIdCardType] = useState('');
  const [idCardFile, setIdCardFile] = useState<File | null>(null);
  const [idCardPreview, setIdCardPreview] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const idTag = useMemo(() => user?.email?.split('@')[0]?.toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase(), [user?.email]);
  const wordCount = animationSummary.trim() ? animationSummary.trim().split(/\s+/).length : 0;

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file.');
      return;
    }
    setProfilePicture(file);
    const reader = new FileReader();
    reader.onload = () => setProfilePicPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleIdCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file.');
      return;
    }
    setIdCardFile(file);
    const reader = new FileReader();
    reader.onload = () => setIdCardPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const validate = () => {
    if (!language) { toast.error('Please select a language.'); return false; }
    if (language === 'Other' && !otherLanguage.trim()) { toast.error('Please specify your language.'); return false; }
    if (!animationTitle.trim()) { toast.error('Please enter an animation title.'); return false; }
    if (!animationSummary.trim()) { toast.error('Please enter an animation summary.'); return false; }
    if (wordCount > WORD_LIMIT) { toast.error(`Summary exceeds ${WORD_LIMIT} words.`); return false; }
    if (!profilePicture) { toast.error('Please upload a profile picture.'); return false; }
    if (!idCardType) { toast.error('Please select an ID card type.'); return false; }
    if (!idCardFile) { toast.error('Please upload your ID card.'); return false; }
    return true;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setShowPayment(true);
  };

  const handlePayment = () => {
    setPaymentProcessing(true);
    setTimeout(() => {
      setPaymentProcessing(false);
      setShowPayment(false);
      const gatewayRef = 'PS-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      toast.success('Payment successful! Redirecting...');
      sessionStorage.setItem('comp_ref', gatewayRef);
      sessionStorage.setItem('comp_application', JSON.stringify({
        refNo: gatewayRef,
        compId: comp.id,
        compTitle: comp.title,
        compType: comp.type,
        category: comp.category,
        country: comp.country,
        deadline: comp.deadline,
        language: language === 'Other' ? otherLanguage : language,
        animationTitle,
        animationSummary,
        socialHandles: { linkedin, twitter, instagram, facebook },
        applicationDate: new Date().toISOString(),
        userName: user?.name,
        userEmail: user?.email,
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
              <User className="h-3.5 w-3.5" /> Name
            </label>
            <div className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm bg-neutral-bg-light text-neutral-black font-medium">
              {user.name}
            </div>
            <p className="text-[10px] text-neutral-gray-medium mt-1">Automatically filled by platform</p>
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
              <Hash className="h-3.5 w-3.5" /> ID Tag
            </label>
            <div className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm bg-neutral-bg-light text-neutral-black font-medium font-mono">
              {idTag}
            </div>
            <p className="text-[10px] text-neutral-gray-medium mt-1">Automatically filled by platform</p>
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
              <FileText className="h-3.5 w-3.5" /> Competition Type
            </label>
            <div className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm bg-neutral-bg-light text-neutral-black font-medium">
              {comp.type}
            </div>
            <p className="text-[10px] text-neutral-gray-medium mt-1">Automatically filled by platform</p>
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
              <FileText className="h-3.5 w-3.5" /> Category
            </label>
            <div className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm bg-neutral-bg-light text-neutral-black font-medium">
              {comp.category}
            </div>
            <p className="text-[10px] text-neutral-gray-medium mt-1">Automatically filled by platform</p>
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
              <Calendar className="h-3.5 w-3.5" /> Application Date
            </label>
            <div className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm bg-neutral-bg-light text-neutral-black font-medium">
              {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
            <p className="text-[10px] text-neutral-gray-medium mt-1">Automatically filled by platform</p>
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
              <Calendar className="h-3.5 w-3.5" /> Submission Deadline
            </label>
            <div className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm bg-neutral-bg-light text-neutral-black font-medium">
              {new Date(comp.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
            <p className="text-[10px] text-neutral-gray-medium mt-1">Automatically filled by platform</p>
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
              <MapPin className="h-3.5 w-3.5" /> Country
            </label>
            <div className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm bg-neutral-bg-light text-neutral-black font-medium">
              {comp.country}
            </div>
            <p className="text-[10px] text-neutral-gray-medium mt-1">Automatically filled by platform</p>
          </div>
        </div>

        <div className="border-t border-neutral-gray-light pt-6">
          <div>
            <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
              <Globe className="h-3.5 w-3.5" /> Language
            </label>
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm appearance-none bg-white focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
              >
                <option value="">Select Language</option>
                {LANGUAGES.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium pointer-events-none" />
            </div>
            {language === 'Other' && (
              <input
                type="text"
                value={otherLanguage}
                onChange={(e) => setOtherLanguage(e.target.value)}
                placeholder="Specify animation language..."
                className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm mt-2 focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
              />
            )}
          </div>
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
            <BookOpen className="h-3.5 w-3.5" /> Animation Title
          </label>
          <input
            type="text"
            value={animationTitle}
            onChange={(e) => setAnimationTitle(e.target.value)}
            placeholder="Input animation topic or title"
            className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
          />
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
            <Edit3 className="h-3.5 w-3.5" /> Animation Summary
          </label>
          <textarea
            value={animationSummary}
            onChange={(e) => setAnimationSummary(e.target.value)}
            placeholder="Briefly describe the science concept you're animating"
            rows={5}
            className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600 resize-y"
          />
          <p className="text-[10px] text-neutral-gray-medium mt-1 text-right">{wordCount}/{WORD_LIMIT} words max.</p>
        </div>

        <div className="border-t border-neutral-gray-light pt-6">
          <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-3">
            <LinkIcon className="h-3.5 w-3.5" /> Social Handles
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-neutral-gray-medium mb-1 block">LinkedIn</label>
              <input
                type="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="https://linkedin.com/in/..."
                className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
              />
            </div>
            <div>
              <label className="text-xs text-neutral-gray-medium mb-1 block">Twitter</label>
              <input
                type="url"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                placeholder="https://twitter.com/..."
                className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
              />
            </div>
            <div>
              <label className="text-xs text-neutral-gray-medium mb-1 block">Instagram</label>
              <input
                type="url"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="https://instagram.com/..."
                className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
              />
            </div>
            <div>
              <label className="text-xs text-neutral-gray-medium mb-1 block">Facebook</label>
              <input
                type="url"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                placeholder="https://facebook.com/..."
                className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-gray-light pt-6">
          <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-3">
            <Camera className="h-3.5 w-3.5" /> Profile Picture
          </label>
          <div
            className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors border-neutral-gray-light hover:border-brand-red-300 hover:bg-brand-red-50/30"
            onClick={() => profilePicRef.current?.click()}
          >
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
                <select
                  value={idCardType}
                  onChange={(e) => setIdCardType(e.target.value)}
                  className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm appearance-none bg-white focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
                >
                  <option value="">Select ID card type</option>
                  {ID_CARD_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium pointer-events-none" />
              </div>
            </div>
          </div>
          <div
            className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors border-neutral-gray-light hover:border-brand-red-300 hover:bg-brand-red-50/30"
            onClick={() => idCardRef.current?.click()}
          >
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
                  To verify your identity, kindly upload a copy of any valid government issued ID card (National ID card, Driver's license, Voter's card, International passport, etc.). Uploaded documents are securely stored and protected from unauthorized access.
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
          selectedTopic={animationTitle}
          paymentProcessing={paymentProcessing}
          onCancel={() => setShowPayment(false)}
          onProceed={handlePayment}
        />
      )}
    </div>
  );
}
