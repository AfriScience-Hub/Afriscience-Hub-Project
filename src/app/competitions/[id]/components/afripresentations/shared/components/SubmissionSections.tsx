'use client';

import { useRef } from 'react';
import { CheckCircle, Video, Upload, RefreshCw, Clock } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { User, Hash, FileText, Calendar, MapPin, Globe, BookOpen, Edit3, School } from 'lucide-react';

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

interface ApplicationDetail {
  icon: React.ElementType;
  label: string;
  value: string;
  mono?: boolean;
  highlight?: boolean;
}

interface ApplicationDetailsSectionProps {
  details: ApplicationDetail[];
}

export function ApplicationDetailsSection({ details }: ApplicationDetailsSectionProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {details.map((d, i) => (
        <DetailField key={i} icon={d.icon} label={d.label} value={d.value} mono={d.mono} highlight={d.highlight} />
      ))}
    </div>
  );
}

interface SummaryEditSectionProps {
  summary: string;
  onSummaryChange: (v: string) => void;
  onSave: () => void;
}

export function SummaryEditSection({ summary, onSummaryChange, onSave }: SummaryEditSectionProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
      <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
        <Edit3 className="h-5 w-5 text-brand-navy-900" /> Presentation Summary
      </h3>
      <textarea
        value={summary}
        onChange={(e) => onSummaryChange(e.target.value)}
        rows={5}
        className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600 resize-y"
      />
      <div className="flex items-center justify-between mt-2">
        <p className="text-[10px] text-neutral-gray-medium">Can still be edited and saved until deadline.</p>
        <Button size="sm" variant="outline" onClick={onSave} className="text-xs">Save Summary</Button>
      </div>
    </div>
  );
}

interface UploadMediaSectionProps {
  submitted: boolean;
  uploadedFile: File | null;
  previewUrl: string | null;
  submitting: boolean;
  onFileChange: (file: File) => void;
  onSubmit: () => void;
  onResubmit: () => void;
}

export function UploadMediaSection({ submitted, uploadedFile, previewUrl, submitting, onFileChange, onSubmit, onResubmit }: UploadMediaSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('video/')) return;
    onFileChange(file);
  };

  return (
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
        Upload your presentation video file of <strong>5 minutes screen time max.</strong>
      </p>
      <div
        className={cn(
          "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors",
          uploadedFile ? "border-green-300 bg-green-50" : "border-neutral-gray-light hover:border-brand-red-300 hover:bg-brand-red-50/30"
        )}
        onClick={() => fileInputRef.current?.click()}
      >
        <input ref={fileInputRef} type="file" accept="video/mp4,video/webm,video/mov,video/avi" onChange={handleChange} className="hidden" />
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
          onClick={onSubmit}
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
  );
}

interface SubmissionSuccessBannerProps {
  compType: string;
  onResubmit: () => void;
}

export function SubmissionSuccessBanner({ compType, onResubmit }: SubmissionSuccessBannerProps) {
  return (
    <div className="bg-green-50 border border-green-200 rounded-xl p-6 flex items-start gap-4">
      <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
        <CheckCircle className="h-6 w-6 text-green-600" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-green-800">Submission Successful!</h3>
        <p className="text-sm text-green-700 mt-1">
          Your entry for <strong>{compType}</strong> has been received successfully. You can resubmit a more recent work to overwrite this submission until the deadline.
        </p>
        <Button size="sm" variant="outline" className="mt-3 border-green-300 text-green-700 hover:bg-green-100" onClick={onResubmit}>
          <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> Resubmit New Work
        </Button>
      </div>
    </div>
  );
}

interface DeadlineInfoProps {
  deadline: string;
  daysLeft: number;
  submitted: boolean;
}

export function DeadlineInfoSection({ deadline, daysLeft, submitted }: DeadlineInfoProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light sticky top-24">
      <h3 className="text-sm font-bold text-neutral-gray-dark uppercase tracking-wider mb-4">Deadline Info</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-black">Deadline</span>
          <span className="text-sm text-neutral-gray-dark font-medium">{deadline}</span>
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
  );
}
