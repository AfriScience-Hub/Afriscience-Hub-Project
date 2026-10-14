'use client';

import { useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { VolunteerHero } from './components/VolunteerHero';
import { WhyVolunteer } from './components/WhyVolunteer';
import { VolunteerRoles } from './components/VolunteerRoles';
import { EligibilitySection } from './components/EligibilitySection';
import { VolunteerForm } from './components/VolunteerForm';
import { api } from '@/lib/api';
import { toast } from 'sonner';

export default function Volunteer() {
  const { isAuthenticated } = useAuth();
  const formRef = useRef<HTMLDivElement>(null);
  const [submitting, setSubmitting] = useState(false);

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

  const handleTaskToggle = (task: string) => {
    const newTasks = formData.tasks.includes(task)
      ? formData.tasks.filter(t => t !== task)
      : formData.tasks.length < 2
        ? [...formData.tasks, task]
        : formData.tasks;
    handleFieldChange('tasks', newTasks);
  };

  const handleCompensationToggle = (comp: string) => {
    // Compensation is now a single select, not multiple
    setFormData(prev => ({
      ...prev,
      compensation: prev.compensation === comp ? '' : comp
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please log in to apply as a volunteer.');
      return;
    }

    if (formData.tasks.length === 0) {
      toast.error('Please select at least one task.');
      return;
    }

    if (!formData.compensation) {
      toast.error('Please select at least one compensation.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        qualification: formData.qualification,
        country: formData.country,
        state: formData.state,
        tasks: formData.tasks,
        compensation: formData.compensation
      };

      await api.post('/volunteer/new', payload);
      toast.success('Thank you for your application! We will review it and get back to you within 5 business days.');
      setFormData({
        qualification: '',
        country: '',
        state: '',
        tasks: [],
        compensation: ''
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Application failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
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
          onTaskToggle={handleTaskToggle}
          onCompensationToggle={handleCompensationToggle}
          onSubmit={handleSubmit}
          submitting={submitting}
        />
      </div>
    </div>
  );
}