'use client';

import { Plus, X, Upload, Award } from 'lucide-react';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/Button';
import type { AwardEntry } from '../data';

interface AwardsSectionProps {
  awards: AwardEntry[];
  onAddAward: () => void;
  onRemoveAward: (index: number) => void;
  onUpdateAward: (index: number, field: keyof AwardEntry, value: any) => void;
}

export function AwardsSection({ awards, onAddAward, onRemoveAward, onUpdateAward }: AwardsSectionProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light p-8">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold text-neutral-black">Honorary Awards</h2>
        <Button type="button" variant="outline" size="sm" onClick={onAddAward} className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Add Award
        </Button>
      </div>
      <p className="text-xs text-neutral-gray-medium mb-6">To further authenticate the credibility of your brand, kindly upload honorary awards obtained by your organization (if any). Uploaded documents are securely stored and protected from unauthorized access.</p>
      <div className="space-y-4">
        {awards.map((award, idx) => (
          <div key={idx} className="border border-neutral-gray-light rounded-xl p-4">
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs font-semibold text-neutral-gray-medium uppercase flex items-center gap-1">
                <Award className="h-4 w-4 text-amber-500" /> Award {idx + 1}
              </span>
              <button type="button" onClick={() => onRemoveAward(idx)} className="cursor-pointer text-slate-400 hover:text-red-500">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-xs text-neutral-gray-medium mb-1">Award Name *</label>
                <Input value={award.name} onChange={e => onUpdateAward(idx, 'name', e.target.value)} placeholder="e.g. Best Innovation Award" />
              </div>
              <div>
                <label className="block text-xs text-neutral-gray-medium mb-1">Awarded By *</label>
                <Input value={award.awardedBy} onChange={e => onUpdateAward(idx, 'awardedBy', e.target.value)} placeholder="Organization that presented the award" />
              </div>
              <div>
                <label className="block text-xs text-neutral-gray-medium mb-1">Year *</label>
                <Input value={award.year} onChange={e => onUpdateAward(idx, 'year', e.target.value)} placeholder="e.g. 2023" />
              </div>
              <div className="sm:col-span-3">
                <label className="block text-xs text-neutral-gray-medium mb-1">Upload Document *</label>
                <div className="border border-dashed border-neutral-gray-light rounded-lg p-3 text-center hover:border-brand-red-600 transition-colors">
                  {award.document ? (
                    <div className="flex items-center gap-2 justify-center">
                      <Award className="h-4 w-4 text-amber-500" />
                      <span className="text-sm text-neutral-gray-dark truncate">{award.document.name}</span>
                      <button type="button" onClick={() => onUpdateAward(idx, 'document', null)} className="cursor-pointer text-red-500"><X className="h-4 w-4" /></button>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <Upload className="h-6 w-6 text-neutral-gray-medium mx-auto mb-1" />
                      <p className="text-xs text-neutral-gray-medium">Click to upload (images and text formats only)</p>
                      <input type="file" accept=".pdf,.jpg,.jpeg,.png,.gif,.webp,.txt,.doc,.docx" className="hidden" onChange={e => e.target.files && onUpdateAward(idx, 'document', e.target.files[0])} />
                    </label>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
