'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ShoppingBag, Globe } from 'lucide-react';
import { MOCK_SPONSORS } from '../../all/data';

export default function CatalogByIndustry() {
  const { industry } = useParams<{ industry: string }>();
  const router = useRouter();
  const decodedIndustry = decodeURIComponent(industry);

  const sponsors = MOCK_SPONSORS.filter(s =>
    s.industries.some(i => i.toLowerCase() === decodedIndustry.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-neutral-bg-light pb-16">
      <section className="bg-brand-navy-900 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-4 transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <div className="flex items-center gap-3 mb-2">
            <ShoppingBag className="h-7 w-7 text-brand-red-600" />
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{decodedIndustry}</h1>
          </div>
          <p className="text-slate-300 text-lg">
            Products & Services Catalog &mdash; {sponsors.length} sponsor{sponsors.length !== 1 ? 's' : ''} found
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {sponsors.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {sponsors.map(sponsor => (
              <div key={sponsor.id} className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-5">
                  <Link href={`/support/sponsor/${sponsor.id}`}>
                    <h3 className="font-bold text-neutral-black text-lg mb-2 hover:text-brand-red-600 transition-colors">{sponsor.name}</h3>
                  </Link>
                  <p className="text-xs text-neutral-gray-medium mb-1">{sponsor.state}, {sponsor.country}</p>
                  <p className="text-sm text-neutral-gray-dark line-clamp-2 mb-4">{sponsor.description}</p>
                  <div>
                    <p className="text-xs font-semibold text-neutral-gray-medium uppercase mb-2">Catalog Items</p>
                    <div className="space-y-1.5">
                      {sponsor.catalog.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-neutral-gray-dark p-2 rounded-lg bg-neutral-bg-light">
                          <span className="h-1.5 w-1.5 rounded-full bg-brand-red-600 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Globe className="h-16 w-16 text-neutral-gray-light mx-auto mb-4" />
            <h3 className="text-xl font-bold text-neutral-black mb-2">No catalog items found</h3>
            <p className="text-neutral-gray-medium mb-4">No sponsors listed under this industry yet.</p>
            <Link href="/support/sponsor/all">
              <span className="inline-flex items-center gap-1 text-brand-red-600 hover:underline font-medium">
                Browse all sponsors
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
