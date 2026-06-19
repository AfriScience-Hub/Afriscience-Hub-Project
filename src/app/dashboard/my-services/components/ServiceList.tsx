'use client';

import { Briefcase, Edit, Trash2, Plus } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { cn } from '@/lib/utils';
import type { Service } from '../../data';

interface ServiceListProps {
  services: Service[];
  onDelete: (id: string) => void;
  onAddService: () => void;
}

export default function ServiceList({ services, onDelete, onAddService }: ServiceListProps) {
  if (services.length === 0) {
    return (
      <div className="text-center py-12">
        <Briefcase className="h-12 w-12 text-neutral-gray-light mx-auto mb-3" />
        <p className="font-bold text-neutral-black">No services yet</p>
        <p className="text-sm text-neutral-gray-medium mt-1">Add your first service to start receiving bookings.</p>
        <Button size="sm" className="bg-brand-red-600 hover:bg-brand-red-700 mt-4" onClick={onAddService}>
          <Plus className="h-4 w-4 mr-1" /> Add Service
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {services.map((svc, idx) => (
        <div key={svc.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-neutral-gray-light hover:border-brand-red-100 transition-colors gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-navy-900 text-[10px] font-bold text-white flex-shrink-0">{idx + 1}</span>
              <p className="font-bold text-neutral-black truncate">{svc.name}</p>
            </div>
            {svc.description && <p className="text-xs text-neutral-gray-medium mt-1 ml-8 line-clamp-2">{svc.description}</p>}
            <div className="flex items-center gap-4 mt-2 ml-8 text-xs text-neutral-gray-medium">
              {svc.costRange && <span className="font-medium text-brand-red-600">{svc.costRange}</span>}
              <span>{svc.bookings} bookings</span>
              <span>{svc.views} views</span>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-8 sm:ml-0">
            <span className={cn("px-2.5 py-1 rounded-full text-[10px] font-bold",
              svc.status === 'Active' ? "bg-green-100 text-green-700" : "bg-neutral-bg-light text-neutral-gray-medium"
            )}>{svc.status}</span>
            <Button size="sm" variant="outline" className="text-xs"><Edit className="h-3 w-3 mr-1" /> Edit</Button>
            <button onClick={() => onDelete(svc.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors">
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
