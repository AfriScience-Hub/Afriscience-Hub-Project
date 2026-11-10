'use client';

import Image from 'next/image';
import { FileText } from 'lucide-react';
import { normalizeFileSrc } from '@/lib/files';

export interface AdminDocumentItem {
  id?: string;
  name?: string;
  issuer?: string;
  year?: string;
  document?: string;
}

function isImageSource(src: string): boolean {
  return !/\.(pdf|docx?|xlsx?|pptx?)(\?.*)?$/i.test(src);
}

/**
 * Certificate / achievement preview used in the admin review modal. Mirrors
 * the user-side document grid, but the thumbnail is the only link.
 */
export default function ScientistDocumentGallery({ items, emptyLabel = '\u2014' }: { items: AdminDocumentItem[]; emptyLabel?: string }) {
  if (!items.length) return <p className="text-sm text-neutral-gray-medium">{emptyLabel}</p>;

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((entry, index) => {
        const src = normalizeFileSrc(entry.document) || '';
        const image = Boolean(src) && isImageSource(src);
        const details = [entry.issuer, entry.year].filter(Boolean).join(' · ');

        return (
          <div key={entry.id ?? `${entry.name}-${index}`} className="flex gap-3 rounded-lg border border-neutral-gray-light p-3">
            {src ? (
              <a
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-neutral-gray-light bg-neutral-bg-light"
                title={entry.name || 'Document'}
              >
                {image ? (
                  <Image src={src} alt={entry.name || 'Document'} fill sizes="80px" className="object-cover" />
                ) : (
                  <FileText className="h-7 w-7 text-neutral-gray-medium" />
                )}
              </a>
            ) : (
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg border border-neutral-gray-light bg-neutral-bg-light text-neutral-gray-medium">
                <FileText className="h-7 w-7" />
              </div>
            )}
            <div className="min-w-0 py-0.5">
              <p className="text-sm font-semibold text-neutral-black">{entry.name || 'Document'}</p>
              <p className="text-xs text-neutral-gray-medium">{details || '\u2014'}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
