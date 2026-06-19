'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';

interface ServiceHeaderProps {
  count: number;
  onAddService: () => void;
}

export default function ServiceHeader({ count, onAddService }: ServiceHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-xl font-bold text-neutral-black">My Services</h2>
        <p className="text-sm text-neutral-gray-medium mt-0.5">Manage the services you offer across your listings.</p>
      </div>
      <Button size="sm" className="bg-brand-red-600 hover:bg-brand-red-700" onClick={onAddService}>
        <Plus className="h-4 w-4 mr-1" /> Add Service
      </Button>
    </div>
  );
}
