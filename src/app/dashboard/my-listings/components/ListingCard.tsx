'use client';

import { Eye, ThumbsUp, Star, Edit, ExternalLink, Archive, Trash2 } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { cn } from '@/lib/utils';

interface ListingCardProps {
  listing: {
    id: number;
    name: string;
    category: string;
    status: string;
    image: string;
    views: number;
    likes: number;
    reviews: number;
  };
}

export function ListingCard({ listing }: ListingCardProps) {
  return (
    <div className="rounded-xl border border-neutral-gray-light overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-36">
        <img src={listing.image} alt={listing.name} className="w-full h-full object-cover" />
        <span className={cn(
          "absolute top-2 right-2 px-2.5 py-1 rounded-full text-[10px] font-bold",
          listing.status === 'Verified' ? "bg-green-100 text-green-700" :
            listing.status === 'Pending Verification' ? "bg-amber-100 text-amber-700" :
              "bg-red-100 text-red-700"
        )}>
          {listing.status}
        </span>
      </div>
      <div className="p-4">
        <p className="font-bold text-neutral-black truncate">{listing.name}</p>
        <p className="text-xs text-brand-red-600 font-medium mt-0.5">{listing.category}</p>
        <div className="flex items-center gap-4 mt-3 text-xs text-neutral-gray-medium">
          <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" /> {listing.views.toLocaleString()}</span>
          <span className="flex items-center gap-1"><ThumbsUp className="h-3.5 w-3.5" /> {listing.likes.toLocaleString()}</span>
          <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5" /> {listing.reviews}</span>
        </div>
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-neutral-gray-light">
          <Button size="sm" variant="outline" className="flex-1 text-xs"><Edit className="h-3 w-3 mr-1" /> Edit</Button>
          <Button size="sm" variant="outline" className="flex-1 text-xs"><ExternalLink className="h-3 w-3 mr-1" /> Preview</Button>
          <Button size="sm" variant="outline" className="text-xs px-2"><Archive className="h-3.5 w-3.5" /></Button>
          <Button size="sm" variant="outline" className="text-xs px-2 text-red-500 hover:text-red-600"><Trash2 className="h-3.5 w-3.5" /></Button>
        </div>
      </div>
    </div>
  );
}
