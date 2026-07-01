'use client';

import ContactHero from './components/ContactHero';
import ContactInfo from './components/ContactInfo';
import ContactForm from './components/ContactForm';
import MapSection from './components/MapSection';
import SocialLinks from './components/SocialLinks';

export default function Contact() {
  return (
    <div className="bg-white">
      <ContactHero />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-neutral-black">Get in Touch</h2>
              <p className="mt-4 text-lg text-slate-600">
                Whether you're an institute, scientist, or innovator, we're here to support your journey in the African science ecosystem.
              </p>

              <div className="mt-8">
                <ContactInfo />
              </div>
            </div>

            <ContactForm />
          </div>

          <div className="flex flex-col gap-6">
            <MapSection />
            <SocialLinks />
          </div>
        </div>
      </div>
    </div>
  );
}
