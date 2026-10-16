'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ArrowLeft, Pencil } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { fetchInnovation } from '../../upload-new-listing/innovationApi';
import { isEditable } from '../statusUtils';
import InnovationPreview from './components/InnovationPreview';

export default function ListingDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetchInnovation(id)
      .then(setItem)
      .catch((e: any) => toast.error(e?.message || 'Failed to load listing'))
      .finally(() => setLoading(false));
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
            <h2 className="truncate text-xl font-bold text-neutral-black">{item.innovationName || 'Innovation'}</h2>
            <p className="font-mono text-sm text-neutral-gray-medium">{item.idTag}</p>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button variant="outline" size="sm" onClick={() => router.push('/dashboard/my-listings')}>
              <ArrowLeft className="mr-1 h-4 w-4" /> Back
            </Button>
            {/* Editable only while still under review — approved/rejected stay preview-only. */}
            {isEditable(item.status) && (
              <Button
                size="sm"
                className="bg-brand-red-600 hover:bg-brand-red-700"
                onClick={() => router.push(`/dashboard/upload-new-listing?id=${id}`)}
              >
                <Pencil className="mr-1 h-4 w-4" /> Edit
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Preview sections */}
      <InnovationPreview item={item} />
    </div>
  );
}
