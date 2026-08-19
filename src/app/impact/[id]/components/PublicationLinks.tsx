'use client';

import { ExternalLink } from 'lucide-react';

export default function PublicationLinks({
  links,
}: {
  links: { label: string; url: string }[];
}) {
  if (!links?.length) return null;

  return (
    <div className="p-6 sm:p-8 border-b border-neutral-gray-light">
      <h2 className="text-xl font-bold text-neutral-black mb-4">Publication Links</h2>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.url}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-brand-red-600 hover:underline"
            >
              <ExternalLink className="h-4 w-4" />
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
