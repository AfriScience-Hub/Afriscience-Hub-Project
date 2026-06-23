'use client';

import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { HomeHeroSection } from './components/HomeHeroSection';
import { HomeCategoriesGrid } from './components/HomeCategoriesGrid';
import { HomeInstitutesSection } from './components/HomeInstitutesSection';
import { HomeInnovationsSection } from './components/HomeInnovationsSection';
import { HomeSpecialistCentersSection } from './components/HomeSpecialistCentersSection';
import { HomeCompetitionsHallOfFame } from './components/HomeCompetitionsHallOfFame';
import { HomePartnersSlider } from './components/HomePartnersSlider';
import { HomeLoginPromptModal } from './components/HomeLoginPromptModal';

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [attemptedPath, setAttemptedPath] = useState('');

  const handleJoinCommunity = (path: string) => {
    if (!isAuthenticated) {
      setAttemptedPath(path);
      setShowLoginPrompt(true);
    }
  };

  return (
    <div className="flex flex-col pb-16">
      <HomeHeroSection onJoinCommunity={handleJoinCommunity} />
      <HomeCategoriesGrid />
      <HomeInstitutesSection />
      <HomeInnovationsSection />
      <HomeSpecialistCentersSection />
      <HomeCompetitionsHallOfFame />
      <HomePartnersSlider />

      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-brand-navy-900 to-brand-red-600 p-8 sm:p-16 text-center text-white">
          <h2 className="mb-4 text-3xl font-bold">Ready to Showcase Your Innovation?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-slate-200">
            Join thousands of scientists, students, and institutes transforming the future of Africa.
          </p>
          <a href="/signup">
            <button className="inline-flex items-center justify-center h-12 px-8 text-base font-medium bg-white text-brand-red-600 rounded-lg hover:bg-neutral-bg-light transition-colors">
              Create Your Profile
            </button>
          </a>
        </div>
      </section>

      {showLoginPrompt && <HomeLoginPromptModal onClose={() => setShowLoginPrompt(false)} />}
    </div>
  );
}
