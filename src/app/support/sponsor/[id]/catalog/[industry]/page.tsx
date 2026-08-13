'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ShoppingBag, MapPin } from 'lucide-react';
import { MOCK_SPONSORS } from '../../data';
import { CatalogItemModal } from '../../components/CatalogItemModal';
import type { CatalogItem } from '../../data';

export default function SponsorCatalogByIndustry() {
  const { id, industry } = useParams<{ id: string; industry: string }>();
  const decodedIndustry = decodeURIComponent(industry);
  const [selectedItem, setSelectedItem] = useState<CatalogItem | null>(null);

  const sponsor = MOCK_SPONSORS[Number(id)];

  if (!sponsor) {
    return (
      <div className="min-h-screen bg-neutral-bg-light flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-black mb-2">Sponsor Not Found</h1>
          <Link href="/support/sponsor/all" className="text-brand-red-600 hover:underline">Back to All Sponsors</Link>
        </div>
      </div>
    );
  }

  const catalogGroup = sponsor.catalog.find(
    g => g.industry.toLowerCase() === decodedIndustry.toLowerCase()
  );

  const items = catalogGroup?.items || [];

  return (
    <div className="min-h-screen bg-neutral-bg-light pb-16">
      <section className="bg-brand-navy-900 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/support/sponsor/${id}`}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Sponsor Details
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <ShoppingBag className="h-7 w-7 text-brand-red-600" />
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{decodedIndustry}</h1>
          </div>
          <p className="text-slate-300 text-lg">
            Products &amp; Service Catalog &mdash; {sponsor.name}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-shrink-0 relative h-24 w-24 sm:h-32 sm:w-32">
              <Image
                src={sponsor.image}
                alt={sponsor.name}
                fill
                sizes="128px"
                className="rounded-xl object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-neutral-black mb-2">{sponsor.name}</h2>
              <p className="text-sm text-neutral-gray-dark flex items-center gap-1.5 mb-2">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                {sponsor.state}, {sponsor.country}
              </p>
              <p className="text-sm italic text-neutral-gray-medium mb-2">&ldquo;{sponsor.motto}&rdquo;</p>
              <p className="text-sm text-neutral-gray-dark leading-relaxed">{sponsor.description}</p>
            </div>
          </div>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {items.map((item, idx) => {
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedItem(item)}
                  className="cursor-pointer bg-white rounded-xl shadow-sm border border-neutral-gray-light overflow-hidden hover:shadow-md hover:border-brand-red-600 transition-all text-left group"
                >
                  <div className="aspect-square bg-neutral-bg-light overflow-hidden relative">
                    {item.images.length > 0 ? (
                      <Image
                        src={item.images[0]}
                        alt={item.productName}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-neutral-gray-light">
                        <ShoppingBag className="h-8 w-8" />
                      </div>
                    )}
                  </div>
                  <div className="p-3.5">
                    <p className="text-xs font-bold text-neutral-black leading-snug line-clamp-2 mb-2.5">
                      {item.productName}
                    </p>
                    <div className="mb-2.5">
                      <p className="text-xs text-neutral-black font-medium mb-0.5">
                        {item.currency} {parseFloat(item.price).toFixed(2)}
                      </p>
                      <p className="text-xs font-bold text-brand-red-600">
                        ASH Discount: {item.currency} {parseFloat(item.ashDiscountPrice).toFixed(2)}
                      </p>
                    </div>
                    {item.specifications && item.specifications.length > 0 && (
                      <div className="text-[10px] text-neutral-gray-dark space-y-0.5 pt-2 border-t border-neutral-gray-light">
                        {item.specifications.slice(0, 2).map((spec, specIdx) => (
                          <p key={specIdx} className="line-clamp-1">
                            • {spec}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <ShoppingBag className="h-16 w-16 text-neutral-gray-light mx-auto mb-4" />
            <h3 className="text-xl font-bold text-neutral-black mb-2">No catalog items found</h3>
            <p className="text-neutral-gray-medium mb-4">
              No products or services listed under {decodedIndustry} for this sponsor yet.
            </p>
            <Link href={`/support/sponsor/${id}`}>
              <span className="inline-flex items-center gap-1 text-brand-red-600 hover:underline font-medium">
                Back to sponsor details
              </span>
            </Link>
          </div>
        )}
      </div>

      {selectedItem && (
        <CatalogItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}
