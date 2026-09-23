'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/app/components/ui/Button';
import { fetchInnovation } from '../../upload-new-listing/innovationApi';

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

  if (loading) return <p className="text-sm text-neutral-gray-medium">Loading listing...</p>;
  if (!item) return <p className="text-sm text-neutral-gray-medium">Listing not found.</p>;

  const rows: [string, string][] = [
    ['Name', item.innovationName || item.name || ''],
    ['Country', item.country || ''],
    ['Description', item.shortDescription || ''],
    ['Fields', (item.fields || []).join(', ')],
    ['Interests', (item.interests || []).join(', ')],
    ['Ownership', item.ownership || ''],
    ['Stage', item.stage || ''],
    ['SDGs', (item.sdgs || []).join(', ')],
    ['Specification', item.specification || ''],
    ['Materials', item.materialsUsed || ''],
    ['Dimensions', `${item.length ?? ''} x ${item.width ?? ''} x ${item.height ?? ''} ${item.dimensionUnit || ''}`],
    ['Weight', `${item.weight ?? ''} ${item.weightUnit || ''}`],
    ['Applications', item.applications || ''],
    ['Impact', item.impact || ''],
    ['Recommendations', item.recommendations || ''],
    ['Cautions', item.cautions || ''],
  ];

  return (
    <div className="rounded-xl border border-neutral-gray-light bg-white p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-neutral-black">{item.innovationName || 'Innovation'}</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => router.push('/dashboard/my-listings')}>Back</Button>
          <Button size="sm" className="bg-brand-red-600 hover:bg-brand-red-700" onClick={() => router.push(`/dashboard/upload-new-listing?id=${id}`)}>Edit</Button>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {rows.map(([label, value]) => (
          <div key={label}>
            <p className="text-xs text-neutral-gray-medium">{label}</p>
            <p className="text-sm text-neutral-black whitespace-pre-wrap">{value || '—'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
