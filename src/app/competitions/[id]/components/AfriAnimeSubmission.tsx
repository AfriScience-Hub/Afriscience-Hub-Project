'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  CheckCircle, FileText, User, Hash, MapPin, Calendar, Globe, BookOpen,
  Edit3, Upload, Video, RefreshCw, Trophy, Clock, ArrowLeft
} from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { useAuth } from '@/app/context/AuthContext';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import type { Competition } from '../../data';

interface AfriAnimeSubmissionProps {
  comp: Competition;
}

function DetailField({ icon: Icon, label, value, mono, highlight }: {
  icon: React.ElementType; label: string; value: string; mono?: boolean; highlight?: boolean;
}) {
  return (
    <div>
      <p className="flex items-center gap-1.5 text-[10px] text-neutral-gray-medium uppercase font-bold mb-1">
        <Icon className="h-3 w-3" /> {label}
      </p>
      <p className={cn("text-sm", mono && "font-mono", highlight ? "font-bold text-green-800" : "font-medium text-neutral-black")}>
        {value}
      </p>
    </div>
  );
}

export function AfriAnimeSubmission({ comp }: AfriAnimeSubmissionProps) {
  const { user, isAuthenticated } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const savedApp = (() => {
    try {
      const data = sessionStorage.getItem('comp_application');
      return data ? JSON.parse(data) : null;
    } catch { return null; }
  })();

  const [editableSummary, setEditableSummary] = useState(savedApp?.animationSummary || '');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(() => sessionStorage.getItem(`${comp.id}_submitted`) === 'true');

  const refNo = savedApp?.refNo || sessionStorage.getItem('comp_ref') || 'N/A';
  const applicationDate = savedApp?.applicationDate
    ? new Date(savedApp.applicationDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const language = savedApp?.language || '';
  const animationTitle = savedApp?.animationTitle || '';
  const daysLeft = Math.max(0, Math.ceil((new Date(comp.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('video/')) {
      toast.error('Please upload a video file.');
      return;
    }
    setUploadedFile(file);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
    toast.success(`File "${file.name}" selected.`);
  };

  const handleSummarySave = () => {
    if (savedApp) {
      savedApp.animationSummary = editableSummary;
      sessionStorage.setItem('comp_application', JSON.stringify(savedApp));
      toast.success('Summary saved.');
    }
  };

  const handleSubmit = () => {
    if (!uploadedFile) {
      toast.error('Please upload your animation video file first.');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      sessionStorage.setItem(`${comp.id}_submitted`, 'true');
      toast.success('Submission successful! Your entry has been received.');
    }, 2000);
  };

  const handleResubmit = () => {
    setSubmitted(false);
    setUploadedFile(null);
    setPreviewUrl(null);
    sessionStorage.removeItem(`${comp.id}_submitted`);
    if (fileInputRef.current) fileInputRef.current.value = '';
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
      {submitted && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 flex items-start gap-4">
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-green-800">Submission Successful!</h3>
            <p className="text-sm text-green-700 mt-1">
              Your entry for <strong>{comp.type}</strong> has been received successfully. You can resubmit a more recent work to overwrite this submission until the deadline.
            </p>
            <Button size="sm" variant="outline" className="mt-3 border-green-300 text-green-700 hover:bg-green-100" onClick={handleResubmit}>
              <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> Resubmit New Work
            </Button>
          </div>
        </div>
      )}

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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DetailField icon={User} label="Name" value={user.name} />
          <DetailField icon={Hash} label="ID Tag" value={`${user.email.split('@')[0].toUpperCase()}`} mono />
          <DetailField icon={Hash} label="Reference No." value={refNo} mono highlight />
          <DetailField icon={FileText} label="Competition Type" value={comp.type} />
          <DetailField icon={FileText} label="Category" value={comp.category} />
          <DetailField icon={Calendar} label="Application Date" value={applicationDate} />
          <DetailField icon={Calendar} label="Submission Deadline" value={new Date(comp.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} />
          {language && <DetailField icon={Globe} label="Language" value={language} />}
          {animationTitle && <DetailField icon={BookOpen} label="Animation Title" value={animationTitle} />}
          <DetailField icon={MapPin} label="Country" value={comp.country} />
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
          <Edit3 className="h-5 w-5 text-brand-navy-900" /> Animation Summary
        </h3>
        <textarea
          value={editableSummary}
          onChange={(e) => setEditableSummary(e.target.value)}
          rows={5}
          className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600 resize-y"
        />
        <div className="flex items-center justify-between mt-2">
          <p className="text-[10px] text-neutral-gray-medium">Can still be edited and saved until deadline.</p>
          <Button size="sm" variant="outline" onClick={handleSummarySave} className="text-xs">
            Save Summary
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-2 flex items-center gap-2">
          {submitted ? (
            <><CheckCircle className="h-5 w-5 text-green-600" /> Media Uploaded</>
          ) : (
            <><Upload className="h-5 w-5 text-brand-red-600" /> Upload Media</>
          )}
        </h3>
        {submitted && (
          <p className="text-xs text-green-700 mb-3 flex items-center gap-1">
            <CheckCircle className="h-3.5 w-3.5" /> Your video has been submitted. You can replace it below.
          </p>
        )}
        <p className="text-sm text-neutral-gray-medium mb-4">
          Upload your animation video file of <strong>3 minutes screen time max.</strong>
        </p>

        <div
          className={cn(
            "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors",
            uploadedFile ? "border-green-300 bg-green-50" : "border-neutral-gray-light hover:border-brand-red-300 hover:bg-brand-red-50/30"
          )}
          onClick={() => fileInputRef.current?.click()}
        >
          <input ref={fileInputRef} type="file" accept="video/mp4,video/webm,video/mov,video/avi" onChange={handleFileChange} className="hidden" />
          {uploadedFile ? (
            <div>
              <Video className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <p className="font-bold text-green-800">{uploadedFile.name}</p>
              <p className="text-xs text-green-600 mt-1">{(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
              <p className="text-xs text-neutral-gray-medium mt-2">Click to replace</p>
            </div>
          ) : (
            <div>
              <Video className="h-12 w-12 text-neutral-gray-light mx-auto mb-3" />
              <p className="font-medium text-neutral-gray-dark">Click to upload or drag and drop</p>
              <p className="text-xs text-neutral-gray-medium mt-1">MP4, WebM, MOV, AVI</p>
            </div>
          )}
        </div>

        {previewUrl && uploadedFile && (
          <div className="mt-4 rounded-lg overflow-hidden border border-neutral-gray-light">
            <video src={previewUrl} controls className="w-full max-h-72" />
          </div>
        )}

        <div className="mt-6">
          <Button
            size="lg"
            className="w-full bg-brand-red-600 hover:bg-brand-red-700 py-5 text-lg"
            onClick={handleSubmit}
            disabled={!uploadedFile || submitting}
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Uploading & Submitting...
              </span>
            ) : (
              <><Upload className="h-5 w-5 mr-2" /> Submit Entry</>
            )}
          </Button>
          <p className="text-xs text-neutral-gray-medium text-center mt-3">
            You can resubmit a more recent work to overwrite this submission until the deadline.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light sticky top-24">
        <h3 className="text-sm font-bold text-neutral-gray-dark uppercase tracking-wider mb-4">Deadline Info</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-black">Deadline</span>
            <span className="text-sm text-neutral-gray-dark font-medium">
              {new Date(comp.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-black">Days Left</span>
            <span className={cn("text-sm font-bold", daysLeft <= 7 ? "text-brand-red-600" : "text-green-700")}>{daysLeft} days</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-black">Media Type</span>
            <span className="flex items-center gap-1.5 text-sm text-neutral-gray-dark font-medium">
              <Video className="h-3.5 w-3.5" /> Video
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-black">Status</span>
            {submitted ? (
              <span className="flex items-center gap-1 text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200">
                <CheckCircle className="h-3 w-3" /> Submitted
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                <Clock className="h-3 w-3" /> Pending
              </span>
            )}
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-neutral-gray-light">
          <p className="text-xs text-neutral-gray-medium">
            <strong>Note:</strong> Until the deadline, you can submit more recent works to overwrite previous submissions.
          </p>
        </div>
        <div className="mt-4 pt-4 border-t border-neutral-gray-light">
          <Link href="/dashboard">
            <Button variant="outline" className="w-full text-sm">Go to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
