'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from './context/AuthContext';
import { HomeHeroSection } from './components/HomeHeroSection';
import { HomeCategoriesGrid } from './components/HomeCategoriesGrid';
import { HomeAdSlider } from './components/HomeAdSlider';
import { HomeInstitutesSection } from './components/HomeInstitutesSection';
import { HomeInnovationsSection } from './components/HomeInnovationsSection';
import { HomeSpecialistCentersSection } from './components/HomeSpecialistCentersSection';
import { HomePartnersSlider } from './components/HomePartnersSlider';
import { HomeLoginPromptModal } from './components/HomeLoginPromptModal';
import { Button } from './components/ui/Button';

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handleJoinCommunity = () => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
    }
  };

  return (
    <div className="flex flex-col pb-16">
      <HomeHeroSection onJoinCommunity={handleJoinCommunity} />
      <HomeCategoriesGrid />
      <HomeAdSlider />
      <HomeInstitutesSection />
      <HomeInnovationsSection />
      <HomeSpecialistCentersSection />
      <HomePartnersSlider />

      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-brand-navy-900 to-brand-red-600 p-8 sm:p-16 text-center text-white">
          <h2 className="mb-4 text-3xl font-bold">Ready to explore the African Science &amp; Technology Ecosystems?</h2>
          <p className="mx-auto mb-8 max-w-3xl text-slate-200">
            Join thousands of scientists, technologists, educational institutes, sponsors, students,
            volunteers, specialist hubs, donors and innovators in transforming the future of Africa.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            {!isAuthenticated && (
              <Button
                size="lg"
                className="h-12 px-8 text-base bg-white text-brand-red-600 hover:bg-neutral-bg-light"
                onClick={handleJoinCommunity}
              >
                Join the Community
              </Button>
            )}
            <Link href="/search">
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 text-base bg-white/10 text-white border-white/40 hover:bg-white hover:text-brand-navy-900 backdrop-blur-sm"
              >
                Explore Ecosystem
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {showLoginPrompt && <HomeLoginPromptModal onClose={() => setShowLoginPrompt(false)} />}
    </div>
  );
}
