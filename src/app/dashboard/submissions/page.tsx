'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ClipboardList, Calendar, Clock, CheckCircle, XCircle,
  Video, Image as ImageIcon, ExternalLink
} from 'lucide-react';
import { MOCK_SUBMISSIONS, type Submission } from '../data';
import { cn } from '@/lib/utils';

export default function DashboardSubmissions() {
  const router = useRouter();

  const years = useMemo(() => {
    const y = new Set<string>();
    MOCK_SUBMISSIONS.forEach(s => {
      const year = new Date(s.applicationDate).getFullYear().toString();
      y.add(year);
    });
    return ['All Years', ...Array.from(y).sort()];
  }, []);

  const [selectedYear, setSelectedYear] = useState('All Years');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const filtered = useMemo(() => {
    return MOCK_SUBMISSIONS.filter(s => {
      if (selectedYear !== 'All Years' && new Date(s.applicationDate).getFullYear().toString() !== selectedYear) return false;
      if (statusFilter !== 'all' && s.status !== statusFilter) return false;
      return true;
    });
  }, [selectedYear, statusFilter]);

  const handleSubmissionClick = (sub: Submission) => {
    sessionStorage.setItem('comp_application', JSON.stringify({
      refNo: sub.refNo,
      compId: sub.compId,
      compTitle: sub.compTitle,
      compType: sub.compType,
      category: sub.category,
      country: sub.country,
      deadline: sub.deadline,
      topic: sub.topic || '',
      schoolName: sub.schoolName || '',
      schoolAddress: sub.schoolAddress || '',
      applicationDate: sub.applicationDate,
      mediaType: sub.mediaType,
    }));
    router.push(`/competitions/${sub.compId}/submission`);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-neutral-gray-light bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <ClipboardList className="h-6 w-6 text-brand-red-600" />
            <div>
              <h1 className="text-2xl font-bold text-neutral-black">Submissions</h1>
              <p className="text-sm text-neutral-gray-medium">All your competition submissions</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <select
              className="rounded-lg border border-neutral-gray-light text-sm p-2 bg-white focus:ring-1 focus:ring-brand-red-600"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <select
              className="rounded-lg border border-neutral-gray-light text-sm p-2 bg-white focus:ring-1 focus:ring-brand-red-600"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <ClipboardList className="h-16 w-16 text-slate-300 mb-4" />
            <h3 className="text-lg font-medium text-neutral-black">No submissions found</h3>
            <p className="text-slate-500 max-w-sm mt-1">No submissions match the selected filters.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map(sub => {
              const isActive = sub.status === 'active';

              return (
                <div
                  key={sub.id}
                  className={cn(
                    "p-4 rounded-xl border transition-all",
                    isActive
                      ? "border-neutral-gray-light bg-white hover:shadow-md hover:border-brand-red-200 cursor-pointer"
                      : "border-neutral-gray-light/60 bg-neutral-bg-light opacity-75"
                  )}
                  onClick={() => isActive && handleSubmissionClick(sub)}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-neutral-black">{sub.compTitle}</p>
                        {isActive ? (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-green-700 bg-green-50 px-1.5 py-0.5 rounded border border-green-200">
                            <CheckCircle className="h-2.5 w-2.5" /> Active
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-red-700 bg-red-50 px-1.5 py-0.5 rounded border border-red-200">
                            <XCircle className="h-2.5 w-2.5" /> Inactive
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-neutral-gray-medium mt-1 flex-wrap">
                        <span className="flex items-center gap-1">
                          {sub.mediaType === 'video' ? <Video className="h-3 w-3" /> : <ImageIcon className="h-3 w-3" />}
                          {sub.mediaType === 'video' ? 'Video' : 'Image'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(sub.applicationDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Deadline: {new Date(sub.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-gray-medium bg-neutral-bg-light px-1.5 py-0.5 rounded">
                          {sub.refNo}
                        </span>
                      </div>
                    </div>
                    {isActive && (
                      <div className="flex items-center gap-1 text-brand-red-600 flex-shrink-0">
                        <ExternalLink className="h-4 w-4" />
                        <span className="text-[11px] font-bold">Edit</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
