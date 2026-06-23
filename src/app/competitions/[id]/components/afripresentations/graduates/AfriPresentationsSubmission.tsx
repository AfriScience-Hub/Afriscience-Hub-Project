'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Trophy, FileText, User, Hash, MapPin, Calendar, Globe, BookOpen, School, GraduationCap } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';
import { toast } from 'sonner';
import Link from 'next/link';
import { Button } from '@/app/components/ui/Button';
import type { Competition } from '@/app/competitions/data';
import {
  ApplicationDetailsSection, SummaryEditSection, UploadMediaSection,
  SubmissionSuccessBanner, DeadlineInfoSection
} from '../shared/components/SubmissionSections';

interface Props {
  comp: Competition;
}

export function AfriPresentationsSubmission({ comp }: Props) {
  const { user, isAuthenticated } = useAuth();

  const savedApp = (() => {
    try { const d = sessionStorage.getItem('comp_application'); return d ? JSON.parse(d) : null; } catch { return null; }
  })();

  const [editableSummary, setEditableSummary] = useState(savedApp?.presentationSummary || '');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(() => sessionStorage.getItem(`${comp.id}_submitted`) === 'true');

  const refNo = savedApp?.refNo || sessionStorage.getItem('comp_ref') || 'N/A';
  const applicationDate = savedApp?.applicationDate
    ? new Date(savedApp.applicationDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const topic = savedApp?.topic || '';
  const language = savedApp?.language || '';
  const degreeType = savedApp?.degreeType || '';
  const schoolName = savedApp?.schoolName || '';
  const schoolAddress = savedApp?.schoolAddress || '';
  const department = savedApp?.department || '';
  const daysLeft = Math.max(0, Math.ceil((new Date(comp.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));

  useEffect(() => { return () => { if (previewUrl) URL.revokeObjectURL(previewUrl); }; }, [previewUrl]);

  const handleFileChange = (file: File) => {
    if (!file.type.startsWith('video/')) { toast.error('Please upload a video file.'); return; }
    setUploadedFile(file);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
    toast.success(`File "${file.name}" selected.`);
  };

  const handleSummarySave = () => {
    if (savedApp) { savedApp.presentationSummary = editableSummary; sessionStorage.setItem('comp_application', JSON.stringify(savedApp)); toast.success('Summary saved.'); }
  };

  const handleSubmit = () => {
    if (!uploadedFile) { toast.error('Please upload your presentation video file first.'); return; }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false); setSubmitted(true);
      sessionStorage.setItem(`${comp.id}_submitted`, 'true');
      toast.success('Submission successful! Your entry has been received.');
    }, 2000);
  };

  const handleResubmit = () => {
    setSubmitted(false); setUploadedFile(null); setPreviewUrl(null);
    sessionStorage.removeItem(`${comp.id}_submitted`);
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-bg-light">
        <h2 className="text-2xl font-bold text-neutral-black">Please log in first</h2>
        <Link href="/login"><Button className="mt-4">Go to Login</Button></Link>
      </div>
    );
  }

  const details = [
    { icon: User, label: 'Name', value: user.name },
    { icon: Hash, label: 'ID Tag', value: user.email.split('@')[0].toUpperCase(), mono: true },
    { icon: Hash, label: 'Reference No.', value: refNo, mono: true, highlight: true },
    { icon: FileText, label: 'Competition Type', value: comp.type },
    { icon: FileText, label: 'Category', value: comp.category },
    { icon: Calendar, label: 'Application Date', value: applicationDate },
    { icon: Calendar, label: 'Submission Deadline', value: new Date(comp.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) },
    ...(topic ? [{ icon: BookOpen as React.ElementType, label: 'Topic', value: topic }] : []),
    ...(language ? [{ icon: Globe as React.ElementType, label: 'Language', value: language }] : []),
    ...(degreeType ? [{ icon: GraduationCap as React.ElementType, label: 'Degree Type', value: degreeType }] : []),
    ...(schoolName ? [{ icon: School as React.ElementType, label: 'School/Institute', value: schoolName }] : []),
    ...(schoolAddress ? [{ icon: MapPin as React.ElementType, label: 'School Address', value: schoolAddress }] : []),
    ...(department ? [{ icon: School as React.ElementType, label: 'Department of Study', value: department }] : []),
    { icon: MapPin, label: 'Country', value: comp.country },
  ];

  return (
    <div className="space-y-6">
      {submitted && <SubmissionSuccessBanner compType={comp.type} onResubmit={handleResubmit} />}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <div className="flex items-center gap-3 mb-1">
          <Trophy className="h-6 w-6 text-brand-red-600" />
          <h1 className="text-2xl font-bold text-neutral-black">Post-Application</h1>
        </div>
        <p className="text-sm text-neutral-gray-dark">{comp.type}: {comp.country}</p>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5 text-brand-navy-900" /> Application Details
        </h3>
        <ApplicationDetailsSection details={details} />
      </div>
      <SummaryEditSection summary={editableSummary} onSummaryChange={setEditableSummary} onSave={handleSummarySave} />
      <UploadMediaSection submitted={submitted} uploadedFile={uploadedFile} previewUrl={previewUrl} submitting={submitting} onFileChange={handleFileChange} onSubmit={handleSubmit} onResubmit={handleResubmit} durationText="15 minutes screen time max." />
      <DeadlineInfoSection deadline={new Date(comp.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} daysLeft={daysLeft} submitted={submitted} />
    </div>
  );
}
