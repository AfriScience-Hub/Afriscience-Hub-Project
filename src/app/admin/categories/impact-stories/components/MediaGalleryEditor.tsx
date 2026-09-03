'use client';

import { useState } from 'react';
import { Plus, Trash2, UploadCloud, X } from 'lucide-react';
import Image from 'next/image';
import type { MediaGroup } from '@/app/data/impactData';

interface Props {
  value: MediaGroup[];
  onChange: (v: MediaGroup[]) => void;
}

export default function MediaGalleryEditor({ value, onChange }: Props) {
  const [dragOver, setDragOver] = useState<string | null>(null);

  const addGroup = () => onChange([...value, { label: '', items: [] }]);
  const updateGroup = (idx: number, patch: Partial<MediaGroup>) => {
    const next = [...value];
    next[idx] = { ...next[idx], ...patch };
    onChange(next);
  };
  const removeGroup = (idx: number) => onChange(value.filter((_, i) => i !== idx));

  const addItemFromFiles = (gIdx: number, files: FileList | null) => {
    if (!files) return;
    const urls = Array.from(files).map((f) => URL.createObjectURL(f));
    const next = [...value];
    const items = [...next[gIdx].items, ...urls.map((url) => ({ url, caption: '' }))];
    next[gIdx] = { ...next[gIdx], items };
    onChange(next);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-neutral-black">Media Gallery</p>
        <button type="button" onClick={addGroup} className="inline-flex items-center gap-1 text-xs font-semibold text-brand-navy-900 hover:underline cursor-pointer">
          <Plus className="h-3.5 w-3.5" /> Add Folder
        </button>
      </div>
      {value.length === 0 && <p className="text-xs text-neutral-gray-medium">No folders yet.</p>}
      {value.map((group, gIdx) => (
        <div key={gIdx} className="rounded-xl border border-neutral-gray-light p-3 space-y-3 bg-neutral-bg-light/50">
          <div className="flex gap-2">
            <input
              placeholder="Folder label e.g. Business & Market Survey"
              value={group.label}
              onChange={(e) => updateGroup(gIdx, { label: e.target.value })}
              className="flex-1 px-3 py-2 rounded-lg border border-neutral-gray-light text-xs bg-white focus:ring-2 focus:ring-brand-navy-900 outline-none"
            />
            <button type="button" onClick={() => removeGroup(gIdx)} className="h-9 w-9 inline-flex items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100 cursor-pointer">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <label
            onDragOver={(e) => { e.preventDefault(); setDragOver(String(gIdx)); }}
            onDragLeave={() => setDragOver(null)}
            onDrop={(e) => { e.preventDefault(); setDragOver(null); addItemFromFiles(gIdx, e.dataTransfer.files); }}
            className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed px-3 py-4 cursor-pointer bg-white ${dragOver === String(gIdx) ? 'border-brand-navy-900' : 'border-neutral-gray-light'}`}
          >
            <UploadCloud className="h-5 w-5 text-neutral-gray-medium mb-1" />
            <p className="text-xs font-medium text-neutral-gray-dark">Drag & drop images or click</p>
            <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => addItemFromFiles(gIdx, e.target.files)} />
          </label>

          {group.items.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {group.items.map((item, iIdx) => (
                <div key={iIdx} className="rounded-lg border border-neutral-gray-light bg-white p-2 space-y-2">
                  <div className="relative h-28 rounded-lg overflow-hidden bg-neutral-bg-light">
                    <Image src={item.url} alt={item.caption || 'media'} fill className="object-cover" sizes="200px" />
                    <button
                      type="button"
                      onClick={() => {
                        const next = [...value];
                        next[gIdx] = { ...next[gIdx], items: next[gIdx].items.filter((_, i) => i !== iIdx) };
                        onChange(next);
                      }}
                      className="absolute top-1.5 right-1.5 h-6 w-6 rounded-full bg-black/60 text-white flex items-center justify-center cursor-pointer"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <input
                    placeholder="Caption"
                    value={item.caption}
                    onChange={(e) => {
                      const next = [...value];
                      next[gIdx].items[iIdx] = { ...next[gIdx].items[iIdx], caption: e.target.value };
                      onChange(next);
                    }}
                    className="w-full px-2 py-1.5 rounded-lg border border-neutral-gray-light text-xs focus:ring-2 focus:ring-brand-navy-900 outline-none"
                  />
                  <input
                    placeholder="Image URL (override)"
                    value={item.url.startsWith('blob:') ? '' : item.url}
                    onChange={(e) => {
                      const next = [...value];
                      next[gIdx].items[iIdx] = { ...next[gIdx].items[iIdx], url: e.target.value };
                      onChange(next);
                    }}
                    className="w-full px-2 py-1.5 rounded-lg border border-neutral-gray-light text-[11px] focus:ring-2 focus:ring-brand-navy-900 outline-none"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
