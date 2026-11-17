'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { GraduationCap, Users, Microscope, Zap } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { useAuth } from '@/app/context/AuthContext';

const SLIDES = [
  { id: 1, header: 'Where can My Samples and Data be Analyzed?', subtext: 'Discover thousands of African and International (non-African) science & technology laboratories that can analyze samples & data sets for different parameters. Many also offer industrial trainings, consultancy, and certifications. Join our community to explore more.', image: 'https://images.unsplash.com/photo-1630959301035-27da17911d17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwc2NpZW5jZSUyMGxhYm9yYXRvcnklMjBtaWNyb3Njb3BlJTIwcmVzZWFyY2h8ZW58MXx8fHwxNzcxMDAwOTc3fDA&ixlib=rb-4.1.0&q=80&w=1920', path: '/institutes' },
  { id: 2, header: 'Are You a Creative African Innovator & Inventor?', subtext: 'We provide a platform for African innovators and inventors to publicize their craft for global recognition and investment opportunities. Join our community to explore more.', image: 'https://images.unsplash.com/photo-1582638423482-a90640357638?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIweW91bmclMjBpbm5vdmF0b3IlMjB0ZWNobm9sb2d5JTIwd29ya3Nob3B8ZW58MXx8fHwxNzcxMDAwOTc3fDA&ixlib=rb-4.1.0&q=80&w=1920', path: '/innovations' },
  { id: 3, header: 'Who Is Your Winner?', subtext: 'Appreciate and encourage fellow Africans by voting for your favorite finalist for an honorary award and global recognition. Join our community to explore more.', image: 'https://images.unsplash.com/photo-1747172556725-296efe1bfe78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwYWNoaWV2ZW1lbnQlMjBzdGFnZSUyMGNlbGVicmF0aW9ufGVufDF8fHx8MTc3MTAwMDk3N3ww&ixlib=rb-4.1.0&q=80&w=1920', path: '/voting' },
  { id: 4, header: 'AfriScience Hub\u00ae Honorary Awards!', subtext: 'Stand a chance to be rewarded annually by our network for outstanding performance in enlightenment programmes. Let your skill and craft gain global recognition through our platform. Join our community to explore more.', image: 'https://images.unsplash.com/photo-1715173679369-18006e84d6a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwYWNoaWV2ZW1lbnQlMjBhd2FyZCUyMGNlcnRpZmljYXRlfGVufDF8fHx8MTc3MTAwMDk3N3ww&ixlib=rb-4.1.0&q=80&w=1920', path: '/awards' },
  { id: 5, header: 'Are you looking to Sponsor AfriScience Hub\u00ae?', subtext: 'Partner with us to support science education and innovation across Africa. Your sponsorship can help us expand our reach and impact. Join our community to explore more.', image: 'https://images.unsplash.com/photo-1681505526188-b05e68c77582?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwYnVzaW5lc3MlMjBwYXJ0bmVyc2hpcCUyMGhhbmRzaGFrZSUyMGNvcnBvcmF0ZXxlbnwxfHx8fDE3NzEwMDA5Nzd8MA&ixlib=rb-4.1.0&q=80&w=1920', path: '/support/sponsor' },
  { id: 6, header: 'In Need of Specialists?', subtext: 'Explore thousands of African and International (non-African) specialist establishments (clinics, stations, centers, etc.) that render services in specific scientific & technological fields. Join our community to explore more.', image: 'https://images.unsplash.com/photo-1761234852472-85aeea9c3eac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwbW9kZXJuJTIwbWVkaWNhbCUyMGNsaW5pYyUyMHNwZWNpYWxpc3QlMjBkb2N0b3J8ZW58MXx8fHwxNzcxMDAwOTc4fDA&ixlib=rb-4.1.0&q=80&w=1920', path: '/specialist-centers' },
  { id: 7, header: 'Think You\u2019ve Got What It Takes?', subtext: 'Compete with fellow Africans in annual intellectual and skill-based science & technology tournaments for rewards and global recognition. Join our community to explore more.', image: 'https://images.unsplash.com/photo-1682617367276-bbacadf73747?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwc3R1ZGVudCUyMHNjaWVuY2UlMjBjb21wZXRpdGlvbiUyMGhhY2thdGhvbnxlbnwxfHx8fDE3NzEwMDA5Nzh8MA&ixlib=rb-4.1.0&q=80&w=1920', path: '/competitions' },
  { id: 8, header: 'Looking for Primary & Secondary Schools?', subtext: 'Search and locate nearby primary & secondary schools that match your preferred standards. Discover other international (non-African) elementary & high schools that enroll African pupils/students. Join our community to explore more.', image: 'https://images.unsplash.com/photo-1762657865476-00693485adfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwcHJpbWFyeSUyMHNjaG9vbCUyMGNsYXNzcm9vbSUyMGNoaWxkcmVuJTIwbGVhcm5pbmd8ZW58MXx8fHwxNzcxMDAwOTc4fDA&ixlib=rb-4.1.0&q=80&w=1920', path: '/institutes' },
  { id: 9, header: 'Are You a Scientist or Technologist?', subtext: 'Connect with experts across various scientific and technological fields globally. Showcase your expertise, collaborate on research, and grow your professional network across the African continent. Join our community to explore more.', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920', path: '/scientists' },
  { id: 10, header: 'See How Science Is Transforming Lives', subtext: 'Explore impact stories from across Africa, from scholarships and research support to career development and community programmes powered by our ecosystem. Join our community to explore more.', image: 'https://images.unsplash.com/photo-1766722906733-609eebf3b63a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920', path: '/impact' },
  { id: 11, header: 'Fuel the Next African Breakthrough', subtext: 'Your donation supports educational and developmental initiatives across Africa, giving students, researchers, and innovators the resources they need to succeed. Join our community to explore more.', image: 'https://images.unsplash.com/photo-1614308457932-e16d85c5d053?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920', path: '/support/donate' },
  { id: 12, header: 'Give Your Time, Grow the Ecosystem', subtext: 'Contribute your time and expertise to grow the ecosystem. Volunteers help us run programmes, support events, and create opportunities for the next generation of African scientists. Join our community to explore more.', image: 'https://images.unsplash.com/photo-1645559946960-c002b6e9d559?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920', path: '/support/volunteer' },
];

const STATS = [
  { label: 'Educational Institutes', value: '500+', icon: GraduationCap },
  { label: 'Scientists & Technologists', value: '3k+', icon: Users },
  { label: 'Specialist Centers', value: '200+', icon: Microscope },
  { label: 'Afro-Innovations', value: '850+', icon: Zap },
];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
};

const textVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

interface HeroSectionProps {
  onJoinCommunity: (path: string) => void;
}

export function HomeHeroSection({ onJoinCommunity }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (idx: number) => {
    setDirection(idx > currentSlide ? 1 : -1);
    setCurrentSlide(idx);
  };

  return (
    <section className="relative overflow-hidden bg-brand-navy-900">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div key={currentSlide} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit"
          transition={{ duration: 0.8, ease: 'easeInOut' }} className="absolute inset-0 z-0"
        >
          <Image src={SLIDES[currentSlide].image} alt={SLIDES[currentSlide].header} fill priority
            sizes="100vw" className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-900 via-brand-navy-900/70 to-brand-navy-900/30" />
        </motion.div>
      </AnimatePresence>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-[620px] flex-col justify-center overflow-hidden pt-16 pb-10 text-center sm:h-[520px] sm:pt-20 sm:pb-12 lg:h-[500px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={currentSlide} custom={direction} variants={textVariants} initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.7, ease: 'easeOut' }} className="max-w-4xl mx-auto"
            >
              <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl leading-tight">{SLIDES[currentSlide].header}</h1>
              <p className="mx-auto mb-10 max-w-3xl text-base font-medium text-white/90 drop-shadow-md line-clamp-6 sm:line-clamp-none sm:text-xl leading-relaxed">{SLIDES[currentSlide].subtext}</p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                {!isAuthenticated && (
                  <Button size="lg" className="h-12 px-8 text-base bg-brand-red-600 hover:bg-brand-red-700 border-none shadow-lg shadow-brand-red-600/20"
                    onClick={() => onJoinCommunity(SLIDES[currentSlide].path)}
                  >
                    Join the Community
                  </Button>
                )}
                <Link href="/search">
                  <Button size="lg" variant="outline" className="h-12 px-8 text-base bg-white/10 text-white border-white/20 hover:bg-white hover:text-brand-navy-900 backdrop-blur-sm">
                    Explore Ecosystem
                  </Button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-3 mt-8">
            {SLIDES.map((_, idx) => (
              <button key={idx} onClick={() => goToSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${currentSlide === idx ? 'w-8 bg-brand-red-600' : 'w-2 bg-neutral-gray-dark hover:bg-neutral-gray-medium'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 py-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 group cursor-default">
                <div className="p-2.5 rounded-full bg-white/5 group-hover:bg-brand-red-600/20 transition-colors">
                  <stat.icon className="h-5 w-5 text-brand-red-600" />
                </div>
                <span className="text-xl font-bold text-white sm:text-2xl">{stat.value}</span>
                <span className="text-[11px] text-slate-400 text-center sm:text-xs">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
