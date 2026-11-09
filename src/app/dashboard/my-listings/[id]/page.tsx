'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ArrowLeft, Pencil } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { fetchInnovation } from '../../upload-new-listing/components/afro-innovation-listing/innovationApi';
import { fetchScientistListing } from '../../upload-new-listing/components/scientist-listing/scientistApi';
import { isEditable } from '../statusUtils';
import InnovationPreview from './components/InnovationPreview';
import ScientistPreview from './components/ScientistPreview';

type ListingCategory = 'innovation' | 'scientist';

export default function ListingDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [item, setItem] = useState<any>(null);
  const [category, setCategory] = useState<ListingCategory>('innovation');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    const type = new URLSearchParams(window.location.search).get('type');
    const load = async () => {
      if (type === 'scientist') {
        const scientist = await fetchScientistListing(id);
        if (!cancelled) setCategory('scientist');
        return scientist;
      }
      try {
        return await fetchInnovation(id);
      } catch (error) {
        // Old links do not carry the category; fall back to the scientist API.
        const scientist = await fetchScientistListing(id);
        if (!cancelled) setCategory('scientist');
        return scientist;
      }
    };

    load()
      .then((record) => { if (!cancelled) setItem(record); })
      .catch((e: any) => toast.error(e?.message || 'Failed to load listing'))
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-sm text-neutral-gray-medium">Loading listing...</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-sm text-neutral-gray-medium">Listing not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <h2 className="truncate text-xl font-bold text-neutral-black">{item.name || item.innovationName || 'Listing'}</h2>
            <p className="font-mono text-sm text-neutral-gray-medium">{item.idTag}</p>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button variant="outline" size="sm" onClick={() => router.push('/dashboard/my-listings')}>
              <ArrowLeft className="mr-1 h-4 w-4" /> Back
            </Button>
            {/* Editable while under review or approved — rejected stays preview-only. */}
            {isEditable(item.status) && (
              <Button
                size="sm"
                className="bg-brand-red-600 hover:bg-brand-red-700"
                onClick={() => router.push(`/dashboard/upload-new-listing?id=${id}${category === 'scientist' ? '&type=scientist' : ''}`)}
              >
                <Pencil className="mr-1 h-4 w-4" /> Edit
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Preview sections */}
      {category === 'scientist' ? <ScientistPreview item={item} /> : <InnovationPreview item={item} />}
    </div>
  );
}
