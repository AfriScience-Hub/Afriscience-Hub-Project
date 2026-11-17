'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Megaphone } from 'lucide-react';

const AD_SLIDES = [
  {
    id: 1,
    sponsor: 'AgriSense',
    tagline: 'Precision agriculture for every farm',
    description:
      'Smart sensors and AI-powered insights that help African farmers increase yields while conserving water and soil.',
    cta: 'Discover AgriSense',
    href: '/support/sponsor',
    image:
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600',
    accent: 'from-emerald-900/90',
  },
  {
    id: 2,
    sponsor: 'MediLink Africa',
    tagline: 'Connecting clinics to specialist care',
    description:
      'A telemedicine network linking rural health centres with specialists in seconds, improving outcomes across the continent.',
    cta: 'Explore MediLink',
    href: '/support/sponsor',
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600',
    accent: 'from-sky-900/90',
  },
  {
    id: 3,
    sponsor: 'SolarGrid',
    tagline: 'Clean energy for learning',
    description:
      'Solar micro-grids powering schools and laboratories so students can learn without interruption.',
    cta: 'Partner with SolarGrid',
    href: '/support/sponsor',
    image:
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600',
    accent: 'from-amber-900/90',
  },
];

export function HomeAdSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % AD_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const slide = AD_SLIDES[current];

  return (
    <section className="bg-neutral-bg-light py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
            <Megaphone className="h-4 w-4" /> Advertisement
          </span>
          <span className="text-xs text-slate-400">Sponsor spotlight</span>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-neutral-gray-light bg-brand-navy-900">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="relative min-h-[240px] sm:min-h-[300px]"
            >
              <Image
                src={slide.image}
                alt={slide.sponsor}
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.accent} via-brand-navy-900/80 to-brand-navy-900/20`} />
              <div className="relative z-10 flex min-h-[240px] max-w-xl flex-col justify-center gap-3 p-8 sm:min-h-[300px] sm:p-12">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                  Sponsored by {slide.sponsor}
                </span>
                <h3 className="text-2xl font-extrabold text-white sm:text-3xl">{slide.tagline}</h3>
                <p className="text-sm text-white/80 sm:text-base">{slide.description}</p>
                <a
                  href={slide.href}
                  className="mt-2 inline-flex w-fit items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-brand-navy-900 transition-colors hover:bg-brand-red-600 hover:text-white"
                >
                  {slide.cta} <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-4 right-4 z-20 flex gap-2">
            {AD_SLIDES.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setCurrent(idx)}
                aria-label={`Go to advertisement ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  current === idx ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
