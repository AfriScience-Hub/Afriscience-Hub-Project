'use client';

import Image from 'next/image';
import { X, FileText, ExternalLink } from 'lucide-react';
import { normalizeFileSrc } from '@/lib/files';

function extOf(...values: Array<string | undefined | null>) {
  for (const v of values) {
    if (!v) continue;
    const ext = v.split(/[?#]/)[0].split('.').pop()?.toLowerCase();
    if (ext && ext.length <= 5) return ext;
  }
  return '';
}

interface DocumentViewModalProps {
  src: string;
  title: string;
  /** Secondary line under the title, e.g. "Issuer · Year". */
  meta?: string;
  onClose: () => void;
}

/**
 * Full-screen viewer for an uploaded document. Images are rendered, PDFs are
 * embedded and anything else offers a link to open in a new tab.
 */
export default function DocumentViewModal({ src, title, meta, onClose }: DocumentViewModalProps) {
  const resolved = normalizeFileSrc(src);
  const ext = extOf(resolved, src);
  const isImage = /^(jpg|jpeg|png|gif|webp|svg)$/.test(ext);
  const isPdf = ext === 'pdf';

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="relative w-full max-w-4xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        {resolved ? (
          isImage ? (
            <div className="relative w-full h-[78vh] min-h-[240px]">
              <Image
                src={resolved}
                alt={title}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-contain drop-shadow-2xl"
                unoptimized={/^(data:|blob:)|X-Amz-/i.test(resolved)}
              />
            </div>
          ) : isPdf ? (
            <iframe
              src={resolved}
              title={title}
              className="w-full h-[78vh] min-h-[480px] rounded-lg bg-white shadow-2xl"
            />
          ) : (
            <div className="flex h-[50vh] min-h-[240px] items-center justify-center rounded-lg bg-white/10 text-center">
              <div>
                <FileText className="h-12 w-12 text-white/60 mx-auto mb-3" />
                <p className="text-sm text-white/70 mb-4">Preview not available for this file type</p>
                <a
                  href={resolved}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-neutral-gray-dark text-xs font-semibold hover:bg-neutral-bg-light"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> Open in new tab
                </a>
              </div>
            </div>
          )
        ) : (
          <div className="flex h-[50vh] min-h-[240px] items-center justify-center rounded-lg bg-white/10">
            <p className="text-sm text-white/70">No document available.</p>
          </div>
        )}

        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 rounded-full bg-white p-1.5 shadow-lg hover:bg-neutral-bg-light cursor-pointer"
          aria-label="Close document preview"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mt-3 text-center">
          <p className="text-sm font-semibold text-white">{title}</p>
          {meta && <p className="text-xs text-white/70 mt-0.5">{meta}</p>}
        </div>
      </div>
    </div>
  );
}
