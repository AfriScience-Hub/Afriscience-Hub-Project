'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';
import { UploadCloud, X } from 'lucide-react';

interface Props {
  label: string;
  value: string;
  onChange: (url: string) => void;
}

export default function UploadDropzone({ label, value, onChange }: Props) {
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || !files[0]) return;
      const file = files[0];
      const url = URL.createObjectURL(file);
      onChange(url);
    },
    [onChange]
  );

  return (
    <div>
      <p className="text-xs font-bold text-neutral-black mb-1.5">{label}</p>
      {value ? (
        <div className="relative rounded-xl border border-neutral-gray-light overflow-hidden bg-neutral-bg-light h-40">
          <Image src={value} alt={label} fill className="object-cover" sizes="400px" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 h-7 w-7 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/75 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
          className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-6 cursor-pointer transition-colors ${dragOver ? 'border-brand-navy-900 bg-brand-navy-900/5' : 'border-neutral-gray-light bg-neutral-bg-light hover:bg-white'}`}
        >
          <UploadCloud className="h-6 w-6 text-neutral-gray-medium mb-2" />
          <p className="text-xs font-medium text-neutral-gray-dark">Drag & drop or click to upload</p>
          <p className="text-[11px] text-neutral-gray-medium">PNG, JPG up to 5MB</p>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </label>
      )}
      <input
        type="text"
        placeholder="Or paste image URL"
        value={value.startsWith('blob:') ? '' : value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full px-3 py-2 rounded-lg border border-neutral-gray-light text-xs focus:ring-2 focus:ring-brand-navy-900 focus:border-brand-navy-900 outline-none"
      />
    </div>
  );
}
