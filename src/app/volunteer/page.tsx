'use client';

import { useRef } from 'react';
import VolunteerHero from './components/VolunteerHero';
import WhyVolunteer from './components/WhyVolunteer';
import VolunteerRoles from './components/VolunteerRoles';
import EligibilitySection from './components/EligibilitySection';
import VolunteerForm from './components/VolunteerForm';

export default function Volunteer() {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="pb-16">
      <VolunteerHero scrollToForm={scrollToForm} />
      <WhyVolunteer />
      <VolunteerRoles />
      <EligibilitySection />

      <section className="bg-neutral-bg-light py-16" ref={formRef}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <VolunteerForm />
        </div>
      </section>
    </div>
  );
}
