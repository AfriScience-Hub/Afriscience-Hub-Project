'use client';

import { useState } from 'react';
import { Plus, X, Upload, Images } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/app/components/ui/Button';
import { WORK_DAYS, GALLERY_ALBUMS, MAX_FILES_PER_ALBUM } from '../data';
import type { SchoolHighlight, MediaItem } from '../types';

interface SchoolHighlightSectionProps {
  highlight: SchoolHighlight;
  onChange: (patch: Partial<SchoolHighlight>) => void;
}

export default function SchoolHighlightSection({ highlight, onChange }: SchoolHighlightSectionProps) {
  const inputClass = 'w-full rounded-lg border border-neutral-gray-light px-4 py-2.5 text-sm focus:border-brand-red-600 focus:ring-1 focus:ring-brand-red-600';

  return (
    <div className="space-y-6">
      {/* Work days */}
      <div>
        <label className="block text-sm font-medium text-neutral-black mb-2">Work days <span className="text-[10px] font-normal text-neutral-gray-medium">(multiple selections allowed)</span></label>
        <p className="text-xs text-neutral-gray-medium mb-2">Indicate the days the school operates in a week</p>
        <div className="grid gap-2 sm:grid-cols-4">
          {WORK_DAYS.map(day => (
            <label key={day} className={`
              flex items-center gap-2 rounded-lg border p-2.5 text-sm transition-colors cursor-pointer
              ${highlight.workDays.includes(day)
                ? 'border-brand-red-600 bg-brand-red-50 text-neutral-black'
                : 'border-neutral-gray-light text-neutral-gray-dark hover:border-brand-red-200'
              }
            `}>
              <input
                type="checkbox"
                checked={highlight.workDays.includes(day)}
                onChange={() => onChange({
                  workDays: highlight.workDays.includes(day)
                    ? highlight.workDays.filter(d => d !== day)
                    : [...highlight.workDays, day]
                })}
                className="rounded border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600 h-3.5 w-3.5"
              />
              {day}
            </label>
          ))}
        </div>
        <p className="mt-1.5 text-[11px] text-neutral-gray-medium">{highlight.workDays.length} selected</p>
      </div>

      {/* Work hours */}
      <div>
        <label className="block text-sm font-medium text-neutral-black mb-2">Work hours <span className="text-[10px] font-normal text-neutral-gray-medium">(multiple selections allowed)</span></label>
        <p className="text-xs text-neutral-gray-medium mb-2">Indicate the time interval for school activities in a day</p>
        <WorkHoursSelector
          entries={highlight.workHours}
          onChange={(entries) => onChange({ workHours: entries })}
        />
      </div>

      {/* Active students */}
      <div>
        <label className="block text-sm font-medium text-neutral-black mb-1">Active students <span className="text-[10px] font-normal text-neutral-gray-medium">(1 entry max.)</span></label>
        <p className="text-xs text-neutral-gray-medium mb-2">Enter the number of students the school currently has</p>
        <input
          type="number"
          value={highlight.activeStudents}
          onChange={(e) => onChange({ activeStudents: e.target.value })}
          className={inputClass}
          placeholder="e.g. 1500"
          min="0"
        />
      </div>

      {/* Media gallery */}
      <div>
        <label className="block text-sm font-medium text-neutral-black mb-2">Media gallery</label>
        <p className="text-xs text-neutral-gray-medium mb-4">Upload media into the following albums. Can be picture or video file formats. 10 files max. for each album.</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY_ALBUMS.map(album => {
            const items = highlight.mediaGallery[album] || [];
            const full = items.length >= MAX_FILES_PER_ALBUM;
            return (
              <div key={album} className="rounded-lg border border-neutral-gray-light p-4">
                <div className="mb-1 flex items-center justify-between">
                  <p className="flex items-center gap-1.5 text-sm font-bold text-neutral-black">
                    <Images className="h-4 w-4 text-brand-red-600" /> {album}
                  </p>
                  <span className={`text-[10px] font-bold ${full ? 'text-brand-red-600' : 'text-neutral-gray-medium'}`}>
                    {items.length}/{MAX_FILES_PER_ALBUM}
                  </span>
                </div>
                <p className="mb-3 text-xs text-neutral-gray-medium">
                  {items.length} file{items.length !== 1 ? 's' : ''} added
                </p>

                {items.length > 0 && (
                  <ul className="mb-3 space-y-1 max-h-32 overflow-y-auto">
                    {items.map((item, idx) => (
                      <li key={`${album}-${idx}`} className="flex items-center justify-between gap-2 rounded bg-neutral-bg-light px-2 py-1 text-[11px] text-neutral-gray-dark">
                        <span className="truncate">{truncateName(item.name)}</span>
                        <button type="button" onClick={() => removeMedia(album, idx)} className="flex-shrink-0 cursor-pointer text-red-400 hover:text-red-600">
                          <X className="h-3 w-3" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                <label className="flex w-full cursor-pointer items-center justify-center gap-1 rounded-lg border border-dashed border-brand-red-300 px-3 py-2 text-xs font-medium text-brand-red-600 transition-colors hover:bg-brand-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                  style={full ? { opacity: 0.4, pointerEvents: 'none' } : undefined}
                >
                  <input type="file" accept="image/*,video/*" onChange={e => handleUpload(album, e)} className="hidden" disabled={full} />
                  <Upload className="h-3.5 w-3.5" /> {full ? 'Album Full' : 'Upload Files'}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  function handleUpload(album: string, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const current = highlight.mediaGallery[album] || [];
    if (current.length >= MAX_FILES_PER_ALBUM) {
      toast.error(`${album}: maximum of ${MAX_FILES_PER_ALBUM} files reached`);
      return;
    }
    const previewUrl = URL.createObjectURL(file);
    onChange({
      mediaGallery: {
        ...highlight.mediaGallery,
        [album]: [...current, { file, previewUrl, name: file.name }],
      },
    });
    toast.success(`File added to ${album}`);
    e.target.value = '';
  }

  function removeMedia(album: string, idx: number) {
    const item = highlight.mediaGallery[album]?.[idx];
    if (item?.previewUrl.startsWith('blob:')) URL.revokeObjectURL(item.previewUrl);
    onChange({
      mediaGallery: {
        ...highlight.mediaGallery,
        [album]: (highlight.mediaGallery[album] || []).filter((_, i) => i !== idx),
      },
    });
  }
}

function WorkHoursSelector({ entries, onChange }: { entries: string[]; onChange: (entries: string[]) => void }) {
  const [draft, setDraft] = useState('');
  const inputClass = 'w-full rounded-lg border border-neutral-gray-light px-4 py-2.5 text-sm focus:border-brand-red-600 focus:ring-1 focus:ring-brand-red-600';

  const add = () => {
    const value = draft.trim();
    if (!value) return toast.error('Please enter a value first');
    if (entries.includes(value)) return toast.error('This entry already exists');
    onChange([...entries, value]);
    setDraft('');
  };

  return (
    <div>
      <div className="flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); add(); } }}
          className={inputClass}
          placeholder="e.g. 7:30 AM - 4:00 PM"
        />
        <Button type="button" size="sm" className="flex-shrink-0 bg-brand-red-600 hover:bg-brand-red-700" onClick={add}>
          <Plus className="mr-1 h-4 w-4" /> Add
        </Button>
      </div>
      {entries.length > 0 && (
        <ul className="mt-3 space-y-2">
          {entries.map((entry, idx) => (
            <li key={`${entry}-${idx}`} className="flex items-center justify-between gap-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light px-3 py-2">
              <div className="flex min-w-0 items-center gap-2">
                <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-navy-900 text-[10px] font-bold text-white">{idx + 1}</span>
                <span className="truncate text-sm text-neutral-black">{entry}</span>
              </div>
              <button
                type="button"
                onClick={() => onChange(entries.filter((_, i) => i !== idx))}
                className="flex-shrink-0 cursor-pointer text-red-400 hover:text-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function truncateName(name: string, max = 30): string {
  if (name.length <= max) return name;
  const ext = name.split('.').pop() || '';
  const base = name.slice(0, name.length - ext.length - 1);
  return `${base.slice(0, max - ext.length - 3)}...${ext}`;
}