'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Eye, X } from 'lucide-react';
import { normalizeFileSrc } from '@/lib/files';

function extOf(...values: Array<string | undefined | null>) {
  for (const v of values) {
    if (!v) continue;
    const ext = v.split(/[?#]/)[0].split('.').pop()?.toLowerCase();
    if (ext && ext.length <= 5) return ext;
  }
  return '';
}

export function DocumentModal({ isOpen, onClose, title, url }: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
}) {
  if (!isOpen || !url) return null;
  const ext = extOf(url, title);
  const isImage = /^(jpg|jpeg|png|gif|webp)$/.test(ext);
  const isPdf = ext === 'pdf';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-neutral-gray-light">
          <h3 className="text-lg font-bold text-neutral-black truncate pr-4">{title}</h3>
          <button type="button" onClick={onClose} className="p-2 rounded-lg hover:bg-neutral-bg-light transition-colors cursor-pointer">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4 overflow-auto max-h-[calc(90vh-60px)]">
          {isImage && (
            <div className="relative w-full h-[70vh] min-h-[240px]">
              <Image
                src={url}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-contain"
                unoptimized={/^(data:|blob:)|X-Amz-/i.test(url)}
              />
            </div>
          )}
          {isPdf && (
            <iframe src={url} className="w-full h-[70vh] rounded-lg border border-neutral-gray-light" title={title} />
          )}
          {!isImage && !isPdf && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Eye className="h-12 w-12 text-neutral-gray-light mb-4" />
              <p className="text-neutral-gray-medium mb-4">Preview not available for this file type</p>
              <a href={url} target="_blank" rel="noopener noreferrer" className="text-brand-navy-900 hover:underline">
                Open in new tab
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function FilePreview({
  label,
  src,
  title,
  localFile,
  localPreviewUrl,
}: {
  label?: string;
  src?: string | null;
  title: string;
  localFile?: File | null;
  localPreviewUrl?: string | null;
}) {
  const [open, setOpen] = useState(false);
  const resolved = normalizeFileSrc(src);
  // If there's a local file picked this session, use its data: URL for immediate preview
  const previewUrl = localPreviewUrl || (localFile && URL.createObjectURL(localFile)) || resolved;

  return (
    <div>
      {label && <label className="block text-xs text-neutral-gray-medium mb-1">{label}</label>}
      {previewUrl ? (
        <>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-brand-navy-900 border border-neutral-gray-light rounded-lg hover:bg-neutral-bg-light transition-colors cursor-pointer"
          >
            <Eye className="h-4 w-4 shrink-0" />
            View file
          </button>
          <DocumentModal isOpen={open} onClose={() => setOpen(false)} title={title} url={previewUrl} />
        </>
      ) : src ? (
        <p className="text-sm font-medium text-neutral-black">Uploaded</p>
      ) : (
        <p className="text-sm font-medium text-neutral-black">Not uploaded</p>
      )}
    </div>
  );
}
