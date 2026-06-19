'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { MOCK_SERVICES, COST_RANGES } from '../data';
import ServiceHeader from './components/ServiceHeader';
import AddServiceForm from './components/AddServiceForm';
import ServiceList from './components/ServiceList';

export default function ServicesPage() {
  const [userServices, setUserServices] = useState(MOCK_SERVICES);
  const [showAddService, setShowAddService] = useState(false);
  const [newSvcName, setNewSvcName] = useState('');
  const [newSvcDesc, setNewSvcDesc] = useState('');
  const [newSvcCost, setNewSvcCost] = useState('');

  const handleAddService = () => {
    if (!newSvcName.trim()) { toast.error('Please enter a service name'); return; }
    setUserServices(prev => [...prev, {
      id: Date.now().toString(), name: newSvcName, description: newSvcDesc,
      costRange: newSvcCost, status: 'Draft' as const, bookings: 0, views: 0
    }]);
    setNewSvcName(''); setNewSvcDesc(''); setNewSvcCost('');
    setShowAddService(false);
    toast.success('Service added successfully!');
  };

  const handleDeleteService = (id: string) => {
    setUserServices(prev => prev.filter(s => s.id !== id));
    toast.success('Service removed');
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-neutral-gray-light bg-white p-6 shadow-sm">
        <ServiceHeader count={userServices.length} onAddService={() => setShowAddService(true)} />

        {showAddService && (
          <AddServiceForm
            newSvcName={newSvcName}
            newSvcDesc={newSvcDesc}
            newSvcCost={newSvcCost}
            onNameChange={setNewSvcName}
            onDescChange={setNewSvcDesc}
            onCostChange={setNewSvcCost}
            onAdd={handleAddService}
            onCancel={() => setShowAddService(false)}
          />
        )}

        <ServiceList
          services={userServices}
          onDelete={handleDeleteService}
          onAddService={() => setShowAddService(true)}
        />
      </div>
    </div>
  );
}
