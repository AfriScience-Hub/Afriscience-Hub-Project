'use client';

import { Plus, X } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/app/components/ui/Button';
import CollapsibleSection from './CollapsibleSection';
import { COST_RANGES, type ServiceEntry } from '../data';

interface ServicesSectionProps {
  services: ServiceEntry[];
  setServices: (v: ServiceEntry[] | ((prev: ServiceEntry[]) => ServiceEntry[])) => void;
  newService: ServiceEntry;
  setNewService: (v: ServiceEntry | ((prev: ServiceEntry) => ServiceEntry)) => void;
}

export default function ServicesSection({ services, setServices, newService, setNewService }: ServicesSectionProps) {
  const handleAddService = () => {
    if (!newService.name.trim()) {
      toast.error('Please enter a service name');
      return;
    }
    setServices(prev => [...prev, { ...newService, id: Date.now().toString() }]);
    setNewService({ id: '', name: '', description: '', costRange: '' });
    toast.success('Service added');
  };

  const handleRemoveService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  return (
    <CollapsibleSection title="Services & Offerings" icon={<Plus className="h-5 w-5 text-brand-red-600" />} badge="Add your services">
      <div className="space-y-4">
        {services.length > 0 && (
          <div className="space-y-2">
            {services.map((svc, idx) => (
              <div key={svc.id} className="flex items-center justify-between p-3 rounded-lg border border-neutral-gray-light bg-neutral-bg-light">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-red-600 text-[10px] font-bold text-white">{idx + 1}</span>
                    <p className="text-sm font-bold text-neutral-black truncate">{svc.name}</p>
                  </div>
                  {svc.description && <p className="text-xs text-neutral-gray-medium mt-0.5 ml-7 truncate">{svc.description}</p>}
                  {svc.costRange && <p className="text-xs text-brand-red-600 font-medium mt-0.5 ml-7">{svc.costRange}</p>}
                </div>
                <button onClick={() => handleRemoveService(svc.id)} className="ml-2 text-red-400 hover:text-red-600 flex-shrink-0">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="rounded-lg border border-dashed border-neutral-gray-light p-4 space-y-3">
          <p className="text-xs font-bold text-neutral-gray-medium uppercase tracking-wider">Add a Service</p>
          <input
            type="text"
            value={newService.name}
            onChange={e => setNewService(prev => ({ ...prev, name: e.target.value }))}
            className="w-full rounded-lg border border-neutral-gray-light px-4 py-2.5 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
            placeholder="Service Name"
          />
          <textarea
            value={newService.description}
            onChange={e => setNewService(prev => ({ ...prev, description: e.target.value }))}
            className="w-full rounded-lg border border-neutral-gray-light px-4 py-2.5 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600 resize-none"
            rows={2}
            placeholder="Brief description of this service..."
          />
          <div className="flex items-center gap-3">
            <select
              value={newService.costRange}
              onChange={e => setNewService(prev => ({ ...prev, costRange: e.target.value }))}
              className="flex-1 rounded-lg border border-neutral-gray-light px-4 py-2.5 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
            >
              <option value="">Cost Range (optional)</option>
              {COST_RANGES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <Button type="button" size="sm" onClick={handleAddService} className="bg-brand-red-600 hover:bg-brand-red-700 flex-shrink-0">
              <Plus className="h-4 w-4 mr-1" /> Add
            </Button>
          </div>
        </div>
      </div>
    </CollapsibleSection>
  );
}
