'use client';

import { useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { VolunteerHero } from './components/VolunteerHero';
import { WhyVolunteer } from './components/WhyVolunteer';
import { VolunteerRoles } from './components/VolunteerRoles';
import { EligibilitySection } from './components/EligibilitySection';
import { VolunteerForm } from './components/VolunteerForm';

export default function Volunteer() {
  const { isAuthenticated } = useAuth();
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    qualification: '',
    country: '',
    state: '',
    tasks: [] as string[],
    compensation: ''
  });

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleFieldChange = (field: string, value: any) => {
    if (field === 'country') {
      setFormData(prev => ({ ...prev, country: value, state: '' }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Please log in to apply as a volunteer.');
      return;
    }
    if (formData.tasks.length === 0) {
      alert('Please select at least one task.');
      return;
    }
    alert('Thank you for your application! We will review it and get back to you within 5 business days.');
    setFormData({ qualification: '', country: '', state: '', tasks: [], compensation: '' });
  };

  return (
    <div className="pb-16">
      <VolunteerHero onScrollToForm={scrollToForm} />
      <WhyVolunteer />
      <VolunteerRoles />
      <EligibilitySection />
      <div ref={formRef}>
        <VolunteerForm
          isAuthenticated={isAuthenticated}
          formData={formData}
          onFieldChange={handleFieldChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
