'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  FileText, User, Hash, Calendar, MapPin, Globe, BookOpen, Edit3,
  Link as LinkIcon, Camera, CreditCard, CheckCircle, Upload, ChevronDown, Save, Info
} from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { useAuth } from '@/app/context/AuthContext';
import { toast } from 'sonner';
import PaymentModal from '../../PaymentModal';
import type { Competition } from '@/app/competitions/data';

interface Props {
  comp: Competition;
}

const LANGUAGES = ['English', 'French', 'Arabic', 'Portuguese', 'Spanish', 'Afrikaans', 'Other'];
const DEGREE_TYPES = ["Bachelor's Degree", "Master's Degree", 'PhD', 'Postdoctoral', 'Other'];
const ID_CARD_TYPES = ['National ID Card', "Driver's Licence", 'International Passport', 'Other'];
const WORD_LIMIT = 500;

export function AfriPresentationsApply({ comp }: Props) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const savedTopic = sessionStorage.getItem('comp_topic') || '';

  const [language, setLanguage] = useState('');
  const [otherLanguage, setOtherLanguage] = useState('');
  const [degreeType, setDegreeType] = useState('');
  const [otherDegreeType, setOtherDegreeType] = useState('');
  const [degreeCert, setDegreeCert] = useState<{ file: File; preview: string } | null>(null);
  const [schoolName, setSchoolName] = useState('');
  const [schoolAddress, setSchoolAddress] = useState('');
  const [department, setDepartment] = useState('');
  const [summary, setSummary] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');
  const [profilePic, setProfilePic] = useState<{ file: File; preview: string } | null>(null);
  const [govtIdType, setGovtIdType] = useState('');
  const [otherIdType, setOtherIdType] = useState('');
  const [govtId, setGovtId] = useState<{ file: File; preview: string } | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const idTag = useMemo(() => user?.email?.split('@')[0]?.toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase(), []);
  const wordCount = summary.trim() ? summary.trim().split(/\s+/).length : 0;

  const handleProfileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setProfilePic({ file, preview: reader.result as string });
    reader.readAsDataURL(file);
  };

  const handleDegreeCertUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setDegreeCert({ file, preview: reader.result as string });
    reader.readAsDataURL(file);
  };

  const handleGovtIdUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setGovtId({ file, preview: reader.result as string });
    reader.readAsDataURL(file);
  };

  const validate = () => {
    if (!language) { toast.error('Please select a language.'); return false; }
    if (language === 'Other' && !otherLanguage.trim()) { toast.error('Please specify your language.'); return false; }
    if (!degreeType) { toast.error('Please select your degree type.'); return false; }
    if (degreeType === 'Other' && !otherDegreeType.trim()) { toast.error('Please specify your degree type.'); return false; }
    if (!degreeCert) { toast.error('Please upload a copy of your most recent degree certificate.'); return false; }
    if (!schoolName.trim()) { toast.error('Please enter your school/institute name.'); return false; }
    if (!schoolAddress.trim()) { toast.error('Please enter your school/institute address.'); return false; }
    if (!department.trim()) { toast.error('Please enter your department of study.'); return false; }
    if (!summary.trim()) { toast.error('Please enter a presentation summary.'); return false; }
    if (wordCount > WORD_LIMIT) { toast.error('Summary exceeds 500 words.'); return false; }
    if (!linkedin && !twitter && !instagram && !facebook) { toast.error('Please provide at least one social handle.'); return false; }
    if (!profilePic) { toast.error('Please upload a profile picture.'); return false; }
    if (!govtIdType) { toast.error('Please select your government ID card type.'); return false; }
    if (govtIdType === 'Other' && !otherIdType.trim()) { toast.error('Please specify the ID card type.'); return false; }
    if (!govtId) { toast.error('Please upload your government ID card.'); return false; }
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
        degreeType: degreeType === 'Other' ? otherDegreeType : degreeType,
        schoolName, schoolAddress, department, presentationSummary: summary,
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
              <User className="h-3.5 w-3.5" /> Name <span className="text-brand-red-600">*</span>
            </label>
            <div className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm bg-neutral-bg-light text-neutral-black font-medium">
              {user.name}
            </div>
            <p className="text-[10px] text-neutral-gray-medium mt-1">Automatically filled by platform</p>
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
              <Hash className="h-3.5 w-3.5" /> ID Tag <span className="text-brand-red-600">*</span>
            </label>
            <div className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm bg-neutral-bg-light text-neutral-black font-medium font-mono">
              {idTag}
            </div>
            <p className="text-[10px] text-neutral-gray-medium mt-1">Automatically filled by platform</p>
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
              <FileText className="h-3.5 w-3.5" /> Competition Type <span className="text-brand-red-600">*</span>
            </label>
            <div className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm bg-neutral-bg-light text-neutral-black font-medium">
              {comp.type}
            </div>
            <p className="text-[10px] text-neutral-gray-medium mt-1">Automatically filled by platform</p>
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
              <FileText className="h-3.5 w-3.5" /> Category <span className="text-brand-red-600">*</span>
            </label>
            <div className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm bg-neutral-bg-light text-neutral-black font-medium">
              {comp.category}
            </div>
            <p className="text-[10px] text-neutral-gray-medium mt-1">Automatically filled by platform</p>
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
              <Calendar className="h-3.5 w-3.5" /> Application Date <span className="text-brand-red-600">*</span>
            </label>
            <div className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm bg-neutral-bg-light text-neutral-black font-medium">
              {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
            <p className="text-[10px] text-neutral-gray-medium mt-1">Automatically filled by platform</p>
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
              <Calendar className="h-3.5 w-3.5" /> Submission Deadline <span className="text-brand-red-600">*</span>
            </label>
            <div className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm bg-neutral-bg-light text-neutral-black font-medium">
              {new Date(comp.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
            <p className="text-[10px] text-neutral-gray-medium mt-1">Automatically filled by platform</p>
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
              <MapPin className="h-3.5 w-3.5" /> Country <span className="text-brand-red-600">*</span>
            </label>
            <div className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm bg-neutral-bg-light text-neutral-black font-medium">
              {comp.country}
            </div>
            <p className="text-[10px] text-neutral-gray-medium mt-1">Automatically filled by platform</p>
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
              <BookOpen className="h-3.5 w-3.5" /> Topic
            </label>
            <div className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm bg-neutral-bg-light text-neutral-black font-medium">
              {savedTopic || 'N/A'}
            </div>
            <p className="text-[10px] text-neutral-gray-medium mt-1">Selected from previous step</p>
          </div>
        </div>

        <div className="border-t border-neutral-gray-light pt-6">
          <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
            <Globe className="h-3.5 w-3.5" /> Language <span className="text-brand-red-600">*</span>
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
              placeholder="Specify your language..."
              className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm mt-2 focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
            />
          )}
        </div>

        <div className="border-t border-neutral-gray-light pt-6">
          <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
            <CreditCard className="h-3.5 w-3.5" /> Degree Type <span className="text-brand-red-600">*</span>
          </label>
          <div className="relative">
            <select
              value={degreeType}
              onChange={(e) => setDegreeType(e.target.value)}
              className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm appearance-none bg-white focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
            >
              <option value="">Select Degree Type</option>
              {DEGREE_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium pointer-events-none" />
          </div>
          {degreeType === 'Other' && (
            <input
              type="text"
              value={otherDegreeType}
              onChange={(e) => setOtherDegreeType(e.target.value)}
              placeholder="Specify your degree type..."
              className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm mt-2 focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
            />
          )}
        </div>

        <div className="border-t border-neutral-gray-light pt-6">
          <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-3">
            <CreditCard className="h-3.5 w-3.5" /> Degree Certificate <span className="text-brand-red-600">*</span>
          </label>
          <p className="text-[10px] text-neutral-gray-medium mb-3">Upload a copy of your most recent degree certificate</p>
          <div
            className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors border-neutral-gray-light hover:border-brand-red-300 hover:bg-brand-red-50/30"
            onClick={() => document.getElementById('degree-cert-upload')?.click()}
          >
            <input
              id="degree-cert-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleDegreeCertUpload(file);
              }}
            />
            {degreeCert ? (
              <div className="flex flex-col items-center">
                <div className="relative h-28 w-48 rounded-lg overflow-hidden mb-3">
                  <img src={degreeCert.preview} alt="Degree certificate" className="h-full w-full object-cover" />
                </div>
                <p className="font-bold text-green-800">{degreeCert.file.name}</p>
                <p className="text-xs text-neutral-gray-medium mt-1">Click to replace</p>
              </div>
            ) : (
              <div>
                <Upload className="h-8 w-8 text-neutral-gray-light mx-auto mb-2" />
                <p className="text-sm text-neutral-gray-dark leading-relaxed">
                  To verify your academic credentials, kindly upload a copy of your most recent degree certificate. Uploaded documents are securely stored and protected from unauthorized access.
                </p>
                <p className="text-xs text-neutral-gray-medium mt-2">picture / image file formats only</p>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-neutral-gray-light pt-6">
          <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
            <MapPin className="h-3.5 w-3.5" /> School/Institute Name <span className="text-brand-red-600">*</span>
          </label>
          <input
            type="text"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            placeholder="Enter your school or institute name"
            className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
          />
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
            <MapPin className="h-3.5 w-3.5" /> School/Institute Address <span className="text-brand-red-600">*</span>
          </label>
          <input
            type="text"
            value={schoolAddress}
            onChange={(e) => setSchoolAddress(e.target.value)}
            placeholder="Enter the address of your school or institute"
            className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
          />
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
            <BookOpen className="h-3.5 w-3.5" /> Department of Study <span className="text-brand-red-600">*</span>
          </label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="Enter your department of study"
            className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
          />
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
            <Edit3 className="h-3.5 w-3.5" /> Presentation Summary <span className="text-brand-red-600">*</span>
          </label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Briefly describe your presentation"
            rows={5}
            className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600 resize-y"
          />
          <p className="text-[10px] text-neutral-gray-medium mt-1 text-right">{wordCount}/{WORD_LIMIT} words max.</p>
        </div>

        <div className="border-t border-neutral-gray-light pt-6">
          <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-3">
            <LinkIcon className="h-3.5 w-3.5" /> SOCIAL HANDLES (provide at least one) <span className="text-brand-red-600">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-neutral-gray-medium mb-1 block">LinkedIn</label>
              <input type="url" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="https://linkedin.com/in/..." className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600" />
            </div>
            <div>
              <label className="text-xs text-neutral-gray-medium mb-1 block">Twitter</label>
              <input type="url" value={twitter} onChange={(e) => setTwitter(e.target.value)} placeholder="https://twitter.com/..." className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600" />
            </div>
            <div>
              <label className="text-xs text-neutral-gray-medium mb-1 block">Instagram</label>
              <input type="url" value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder="https://instagram.com/..." className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600" />
            </div>
            <div>
              <label className="text-xs text-neutral-gray-medium mb-1 block">Facebook</label>
              <input type="url" value={facebook} onChange={(e) => setFacebook(e.target.value)} placeholder="https://facebook.com/..." className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600" />
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-gray-light pt-6">
          <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-3">
            <Camera className="h-3.5 w-3.5" /> Profile Picture <span className="text-brand-red-600">*</span>
          </label>
          <p className="text-[10px] text-neutral-gray-medium mb-3">Upload the facial image of the contestant only</p>
          <div
            className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors border-neutral-gray-light hover:border-brand-red-300 hover:bg-brand-red-50/30"
            onClick={() => document.getElementById('profile-pic-upload')?.click()}
          >
            <input id="profile-pic-upload" type="file" accept="image/*" className="hidden" onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleProfileUpload(file);
            }} />
            {profilePic ? (
              <div className="flex flex-col items-center">
                <div className="relative h-24 w-24 rounded-full overflow-hidden mb-3">
                  <img src={profilePic.preview} alt="Profile preview" className="h-full w-full object-cover" />
                </div>
                <p className="font-bold text-green-800">{profilePic.file.name}</p>
                <p className="text-xs text-neutral-gray-medium mt-1">Click to replace</p>
              </div>
            ) : (
              <div>
                <Camera className="h-10 w-10 text-neutral-gray-light mx-auto mb-2" />
                <p className="text-sm text-neutral-gray-dark">Upload the facial image of the contestant only</p>
                <p className="text-xs text-neutral-gray-medium mt-1">picture / image file formats only</p>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-neutral-gray-light pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-4">
            <div>
              <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
                <CreditCard className="h-3.5 w-3.5" /> Government ID Card <span className="text-brand-red-600">*</span>
              </label>
              <div className="relative">
                <select
                  value={govtIdType}
                  onChange={(e) => setGovtIdType(e.target.value)}
                  className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm appearance-none bg-white focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
                >
                  <option value="">Select ID card type</option>
                  {ID_CARD_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium pointer-events-none" />
              </div>
              {govtIdType === 'Other' && (
                <input
                  type="text"
                  value={otherIdType}
                  onChange={(e) => setOtherIdType(e.target.value)}
                  placeholder="Specify ID card type..."
                  className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm mt-2 focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
                />
              )}
            </div>
          </div>
          <div
            className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors border-neutral-gray-light hover:border-brand-red-300 hover:bg-brand-red-50/30"
            onClick={() => document.getElementById('govt-id-upload')?.click()}
          >
            <input id="govt-id-upload" type="file" accept="image/*" className="hidden" onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleGovtIdUpload(file);
            }} />
            {govtId ? (
              <div className="flex flex-col items-center">
                <div className="relative h-28 w-48 rounded-lg overflow-hidden mb-3">
                  <img src={govtId.preview} alt="Government ID preview" className="h-full w-full object-cover" />
                </div>
                <p className="font-bold text-green-800">{govtId.file.name}</p>
                <p className="text-xs text-neutral-gray-medium mt-1">Click to replace</p>
              </div>
            ) : (
              <div>
                <Upload className="h-8 w-8 text-neutral-gray-light mx-auto mb-2" />
                <p className="text-sm text-neutral-gray-dark leading-relaxed">
                  To verify your identity, kindly upload a copy of any valid government issued ID card of yours (National ID card, Driver&apos;s license, Voter&apos;s card, International passport, etc.). Uploaded documents are securely stored and protected from unauthorized access.
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
          <p className="text-xs text-neutral-gray-medium text-center mt-3">This will register your application. You can then upload your media on the next page.</p>
        </div>
      </div>

      {showPayment && (
        <PaymentModal
          compTitle={comp.title}
          registrationFee={comp.registrationFee}
          selectedTopic={savedTopic || null}
          paymentProcessing={paymentProcessing}
          onCancel={() => setShowPayment(false)}
          onProceed={handlePayment}
        />
      )}
    </div>
  );
}
