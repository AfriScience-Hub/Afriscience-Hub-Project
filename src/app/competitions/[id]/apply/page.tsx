'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, CheckCircle, User, Hash, FileText, Calendar, MapPin,
  School, BookOpen
} from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { COMPETITIONS } from '@/app/data/mockData';
import { useAuth } from '@/app/context/AuthContext';
import { toast } from 'sonner';

export default function CompetitionApply() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  const comp = COMPETITIONS.find(c => c.id === id);
  const refNo = sessionStorage.getItem('comp_ref') || `ASH-${(id || '').toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;
  const savedTopic = sessionStorage.getItem('comp_topic') || '';

  const isPresentation = comp?.type === 'Afri \u2013 Presentations';

  const [topic, setTopic] = useState(savedTopic);
  const [schoolName, setSchoolName] = useState('');
  const [schoolAddress, setSchoolAddress] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!comp) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-bg-light">
        <h2 className="text-2xl font-bold text-neutral-black">Competition Not Found</h2>
        <Link href="/competitions"><Button className="mt-4">Back to Competitions</Button></Link>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-bg-light">
        <h2 className="text-2xl font-bold text-neutral-black">Please log in first</h2>
        <Link href="/login"><Button className="mt-4">Go to Login</Button></Link>
      </div>
    );
  }

  const handleFinalApply = () => {
    if (!isPresentation && !topic.trim()) {
      toast.error('Please enter your topic/title.');
      return;
    }
    if (isPresentation && !schoolName.trim()) {
      toast.error('Please enter your school/institute name.');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      sessionStorage.setItem('comp_application', JSON.stringify({
        refNo,
        compId: comp.id,
        compTitle: comp.title,
        compType: comp.type,
        category: comp.category,
        country: comp.country,
        deadline: comp.deadline,
        topic: isPresentation ? savedTopic : topic,
        schoolName,
        schoolAddress,
        applicationDate: new Date().toISOString(),
        userName: user.name,
        userEmail: user.email,
        mediaType: comp.mediaType,
      }));
      toast.success('Application submitted successfully! You can now upload your media.');
      router.push(`/competitions/${comp.id}/submission`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-neutral-bg-light py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <Link href={`/competitions/${comp.id}`} className="flex items-center gap-2 text-neutral-gray-dark hover:text-brand-red-600 mb-6 transition-colors text-sm">
          <ArrowLeft className="h-4 w-4" /> Back to Competition Details
        </Link>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-full bg-brand-red-100 flex items-center justify-center text-brand-red-600">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-neutral-black">Application Form</h1>
              <p className="text-sm text-neutral-gray-dark">{comp.title}</p>
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
                {user.email.split('@')[0].toUpperCase()}-{Math.random().toString(36).substring(2, 6).toUpperCase()}
              </div>
              <p className="text-[10px] text-neutral-gray-medium mt-1">Automatically filled by platform</p>
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
                <Hash className="h-3.5 w-3.5" /> Reference No.
              </label>
              <div className="w-full rounded-lg border border-green-200 p-3 text-sm bg-green-50 text-green-800 font-bold font-mono">
                {refNo}
              </div>
              <p className="text-[10px] text-green-600 mt-1 flex items-center gap-1">
                <CheckCircle className="h-3 w-3" /> Generated after successful payment
              </p>
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
                Category
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
                <Calendar className="h-3.5 w-3.5" /> Competition Deadline
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

          <div>
            <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
              <BookOpen className="h-3.5 w-3.5" /> Topic
            </label>
            {isPresentation && savedTopic ? (
              <>
                <div className="w-full rounded-lg border border-blue-200 p-3 text-sm bg-blue-50 text-blue-800 font-medium">
                  {savedTopic}
                </div>
                <p className="text-[10px] text-blue-600 mt-1">Automatically filled for Afri \u2013 Presentations</p>
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter your topic or title..."
                  className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
                />
                <p className="text-[10px] text-neutral-gray-medium mt-1">
                  {isPresentation ? 'Automatically filled for Afri \u2013 Presentations' : 'Please enter your topic/title'}
                </p>
              </>
            )}
          </div>

          {isPresentation && (
            <>
              <div>
                <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
                  <School className="h-3.5 w-3.5" /> Name of School/Institute
                </label>
                <input
                  type="text"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  placeholder="Enter your school or institution name..."
                  className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
                />
                <p className="text-[10px] text-neutral-gray-medium mt-1">Only applicable to Afri \u2013 Presentations</p>
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
                  <MapPin className="h-3.5 w-3.5" /> School/Institute Address
                </label>
                <input
                  type="text"
                  value={schoolAddress}
                  onChange={(e) => setSchoolAddress(e.target.value)}
                  placeholder="Enter school/institution address..."
                  className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
                />
                <p className="text-[10px] text-neutral-gray-medium mt-1">Only applicable to Afri \u2013 Presentations</p>
              </div>
            </>
          )}

          <div className="pt-4 border-t border-neutral-gray-light">
            <Button
              size="lg"
              className="w-full bg-brand-red-600 hover:bg-brand-red-700 py-5 text-lg"
              onClick={handleFinalApply}
              disabled={submitting}
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </span>
              ) : (
                <>
                  <CheckCircle className="h-5 w-5 mr-2" /> Finalize Application
                </>
              )}
            </Button>
            <p className="text-xs text-neutral-gray-medium text-center mt-3">
              This will register your application. You can then upload your media on the next page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
