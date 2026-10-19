'use client';

import Image from 'next/image';
import { FileText, Eye } from 'lucide-react';
import { normalizeFileSrc } from '@/lib/files';
import type { InnovationDoc } from '../data';

function extOf(...values: Array<string | undefined | null>) {
  for (const v of values) {
    if (!v) continue;
    const ext = v.split(/[?#]/)[0].split('.').pop()?.toLowerCase();
    if (ext && ext.length <= 5) return ext;
  }
  return '';
}

/**
 * Renders documents as a gallery of blocks (matching the media gallery style),
 * so the document can be viewed inline without opening a new tab.
 */
export default function DocGallery({ docs }: { docs: InnovationDoc[] }) {
  if (!docs?.length) return <p className="text-sm text-neutral-gray-medium">None provided.</p>;
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {docs.map((d, i) => {
        const src = normalizeFileSrc(d.file);
        const ext = extOf(d.file, d.title);
        const isImage = /^(jpg|jpeg|png|gif|webp|svg)$/.test(ext);
        const isPdf = ext === 'pdf';
        return (
          <figure key={i} className="rounded-xl border border-neutral-gray-light overflow-hidden bg-white">
            <div className="relative h-40 bg-neutral-bg-light">
              {isImage && src ? (
                <Image
                  src={src}
                  alt={d.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 320px"
                  className="object-cover"
                  unoptimized={/^(data:|blob:)|X-Amz-/i.test(src)}
                />
              ) : isPdf && src ? (
                <iframe src={src} title={d.title} className="h-full w-full border-0" />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-2 text-neutral-gray-medium">
                  <FileText className="h-10 w-10" />
                  <span className="text-[11px] font-medium uppercase tracking-wide">{ext || 'Document'}</span>
                </div>
              )}
              {src && (
                <a
                  href={src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-2 right-2 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-black/60 text-white text-[10px] font-semibold hover:bg-black/80 transition-colors"
                >
                  <Eye className="h-3 w-3" /> View
                </a>
              )}
            </div>
            <figcaption className="px-3 py-2 text-xs text-neutral-gray-dark">
              <p className="font-medium text-neutral-black truncate">{d.title || 'Untitled document'}</p>
              <p className="text-[11px] text-neutral-gray-medium truncate">
                {[d.issuer, d.year].filter(Boolean).join(' \u00b7 ') || 'No details provided'}
              </p>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
