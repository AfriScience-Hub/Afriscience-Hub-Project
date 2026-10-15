'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ImagePlus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploadFieldProps {
  label: string;
  hint?: string;
  file: File | null;
  /** Existing remote image shown until replaced or removed (edit/reuse prefill). */
  initialUrl?: string | null;
  onSelect: (file: File | null) => void;
}

/**
 * Single-image upload field (click or drag & drop) with a preview and a
 * remove action. Used for the competition cover image and logo.
 */
export default function ImageUploadField({ label, hint, file, initialUrl, onSelect }: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const blobUrlRef = useRef<string | null>(null);
  const [preview, setPreview] = useState<string | null>(initialUrl ?? null);
  const [dragging, setDragging] = useState(false);

  // Prefill arrives after mount (edit/reuse) — show the existing cover.
  useEffect(() => {
    if (initialUrl && !blobUrlRef.current) setPreview(initialUrl);
  }, [initialUrl]);

  const revokeBlob = () => {
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }
  };

  const accept = (f: File | undefined | null) => {
    if (!f) return;
    revokeBlob();
    blobUrlRef.current = URL.createObjectURL(f);
    setPreview(blobUrlRef.current);
    onSelect(f);
  };

  const clear = () => {
    revokeBlob();
    setPreview(null);
    onSelect(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div>
      <label className="text-xs font-medium text-neutral-black block mb-1.5">{label}</label>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => accept(e.target.files?.[0])}
      />
      {preview ? (
        <div className="relative w-full max-w-xs rounded-xl overflow-hidden border border-neutral-gray-light">
          <Image src={preview} alt={file?.name ?? label} width={320} height={128} unoptimized className="w-full h-32 object-cover" />
          <button
            type="button"
            onClick={clear}
            aria-label="Remove image"
            className="absolute top-2 right-2 h-7 w-7 rounded-full bg-white/90 hover:bg-white grid place-items-center text-brand-red-600 cursor-pointer shadow-sm"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
          <p className="px-2 py-1.5 text-[10px] text-neutral-gray-medium bg-white truncate">{file?.name ?? 'Existing cover image'}</p>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); accept(e.dataTransfer.files?.[0]); }}
          className={cn(
            'rounded-xl border-2 border-dashed border-neutral-gray-light bg-neutral-bg-light/40 p-6 flex flex-col items-center justify-center text-center cursor-pointer min-h-[96px]',
            dragging && 'border-[#453DD8] bg-[#453DD8]/5'
          )}
        >
          <ImagePlus className="h-6 w-6 text-neutral-gray-medium mb-1.5" />
          <p className="text-xs text-neutral-gray-medium">Drop an image here or click to browse</p>
          {hint && <p className="text-[10px] text-neutral-gray-light mt-0.5">{hint}</p>}
        </div>
      )}
    </div>
  );
}
