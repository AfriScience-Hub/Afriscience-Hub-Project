'use client';

import Image from 'next/image';
import { FileText } from 'lucide-react';
import { normalizeFileSrc } from '@/lib/files';

function isImageSource(src: string): boolean {
  return !/\.(pdf|docx?|xlsx?|pptx?)(\?.*)?$/i.test(src);
}

/** Renders certificate/achievement entries with their document preview. */
export default function ScientistDocumentGrid({ items, emptyLabel = '\u2014' }: { items: any[]; emptyLabel?: string }) {
  if (!items.length) return <p className="text-sm text-neutral-gray-medium">{emptyLabel}</p>;
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((entry: any, index: number) => {
        const src = normalizeFileSrc(entry.document || entry.file || '') || '';
        const image = Boolean(src) && isImageSource(src);
        const details = [entry.issuer, entry.year].filter(Boolean).join(' · ');
        return (
          <div key={entry.id ?? index} className="flex gap-3 rounded-lg border border-neutral-gray-light p-3">
            {image ? (
              <a
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-neutral-gray-light"
              >
                <Image src={src} alt={entry.name || 'Document'} fill sizes="64px" className="object-cover" />
              </a>
            ) : (
              <a
                href={src || undefined}
                target={src ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-neutral-gray-light bg-neutral-bg-light text-neutral-gray-medium"
              >
                <FileText className="h-6 w-6" />
              </a>
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-neutral-black">{entry.name || 'Document'}</p>
              <p className="truncate text-xs text-neutral-gray-medium">{details || '\u2014'}</p>
              {src && (
                <a
                  href={src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-[11px] font-medium text-blue-600 hover:underline"
                >
                  View document
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
