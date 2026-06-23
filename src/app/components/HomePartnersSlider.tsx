'use client';

import { useRef } from 'react';
import { motion } from 'motion/react';
import { Handshake } from 'lucide-react';
import { PARTNERS } from '@/app/data/mockData';

export function HomePartnersSlider() {
  const partnersRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-16 overflow-hidden bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-black flex items-center justify-center gap-2">
            <Handshake className="h-6 w-6 text-brand-red-600" />
            Our Partners & Sponsors
          </h2>
          <p className="text-slate-500 mt-1">Trusted by leading organizations across Africa and beyond.</p>
        </div>
      </div>

      <div className="relative hidden md:block">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        <div className="flex overflow-hidden" ref={partnersRef}>
          <motion.div className="flex gap-8 items-center"
            animate={{ x: [0, -1400] }}
            transition={{ x: { repeat: Infinity, repeatType: 'loop', duration: 25, ease: 'linear' } }}
          >
            {[...PARTNERS, ...PARTNERS].map((partner, idx) => (
              <div key={`${partner.id}-${idx}`}
                className="flex-shrink-0 flex items-center justify-center w-56 h-24 rounded-xl border border-neutral-gray-light px-6 transition-all duration-300 group/partner bg-neutral-bg-light hover:bg-white hover:shadow-md hover:border-transparent cursor-pointer"
              >
                <div className="flex flex-col items-center gap-1.5">
                  <span className="text-2xl font-black tracking-tight transition-all duration-300"
                    style={{ color: '#9CA3AF', filter: 'grayscale(100%)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = partner.brandColor; e.currentTarget.style.filter = 'grayscale(0%)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#9CA3AF'; e.currentTarget.style.filter = 'grayscale(100%)'; }}
                  >
                    {partner.logo}
                  </span>
                  <span className="text-[11px] text-slate-500 text-center leading-tight max-w-[180px] group-hover/partner:text-neutral-black transition-colors">
                    {partner.name}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="md:hidden container mx-auto px-4">
        <div className="grid grid-cols-2 gap-4">
          {PARTNERS.map((partner) => (
            <div key={partner.id}
              className="flex items-center justify-center h-24 rounded-xl border border-neutral-gray-light px-4 transition-all duration-300 active:scale-95 bg-neutral-bg-light active:bg-white active:shadow-md"
              onClick={(e) => {
                const span = e.currentTarget.querySelector('span.logo');
                if (span) {
                  (span as HTMLElement).style.color = partner.brandColor;
                  (span as HTMLElement).style.filter = 'grayscale(0%)';
                  setTimeout(() => {
                    (span as HTMLElement).style.color = '#9CA3AF';
                    (span as HTMLElement).style.filter = 'grayscale(100%)';
                  }, 1500);
                }
              }}
            >
              <div className="flex flex-col items-center gap-1">
                <span className="logo text-xl font-black tracking-tight transition-all duration-300"
                  style={{ color: '#9CA3AF', filter: 'grayscale(100%)' }}
                >
                  {partner.logo}
                </span>
                <span className="text-[10px] text-slate-500 text-center leading-tight">{partner.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
