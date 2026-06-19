'use client';

import { ArrowRight, Star, Trophy, Users, Zap, Calendar, Award, Vote, Building2, Microscope, Lightbulb, GraduationCap, Beaker, MapPin, Handshake, X, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from './components/ui/Button';
import { CATEGORIES, INSTITUTES, INNOVATIONS, COMPETITIONS, AWARD_WINNERS, SCIENTISTS, SPECIALIST_CENTERS, PARTNERS } from './data/mockData';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from './context/AuthContext';

const HERO_SLIDES = [
  {
    id: 1,
    header: "Where can My Samples and Data be Analyzed?",
    subtext: "Discover thousands of African and International (non-African) science & technology laboratories that can analyze samples & data sets for different parameters. Many also offer industrial trainings, consultancy, and certifications. Join our community to explore more.",
    image: "https://images.unsplash.com/photo-1630959301035-27da17911d17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwc2NpZW5jZSUyMGxhYm9yYXRvcnklMjBtaWNyb3Njb3BlJTIwcmVzZWFyY2h8ZW58MXx8fHwxNzcxMDAwOTc3fDA&ixlib=rb-4.1.0&q=80&w=1920",
    path: "/institutes"
  },
  {
    id: 2,
    header: "Are You a Creative African Innovator & Inventor?",
    subtext: "We provide a platform for African innovators and inventors to publicize their craft for global recognition and investment opportunities. Join our community to explore more.",
    image: "https://images.unsplash.com/photo-1582638423482-a90640357638?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIweW91bmclMjBpbm5vdmF0b3IlMjB0ZWNobm9sb2d5JTIwd29ya3Nob3B8ZW58MXx8fHwxNzcxMDAwOTc3fDA&ixlib=rb-4.1.0&q=80&w=1920",
    path: "/innovations"
  },
  {
    id: 3,
    header: "Who Is Your Winner?",
    subtext: "Appreciate and encourage fellow Africans by voting for your favorite finalist for an honorary award and global recognition. Join our community to explore more.",
    image: "https://images.unsplash.com/photo-1747172556725-296efe1bfe78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwYWNoaWV2ZW1lbnQlMjBzdGFnZSUyMGNlbGVicmF0aW9ufGVufDF8fHx8MTc3MTAwMDk3N3ww&ixlib=rb-4.1.0&q=80&w=1920",
    path: "/voting"
  },
  {
    id: 4,
    header: "AfriScience Hub® Honorary Awards!",
    subtext: "Stand a chance to be rewarded annually by our network for outstanding performance in enlightenment programmes. Let your skill and craft gain global recognition through our platform. Join our community to explore more.",
    image: "https://images.unsplash.com/photo-1715173679369-18006e84d6a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwYWNoaWV2ZW1lbnQlMjBhd2FyZCUyMGNlcnRpZmljYXRlfGVufDF8fHx8MTc3MTAwMDk3N3ww&ixlib=rb-4.1.0&q=80&w=1920",
    path: "/awards"
  },
  {
    id: 5,
    header: "Are you looking to Sponsor AfriScience Hub®?",
    subtext: "Partner with us to support science education and innovation across Africa. Your sponsorship can help us expand our reach and impact. Join our community to explore more.",
    image: "https://images.unsplash.com/photo-1681505526188-b05e68c77582?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwYnVzaW5lc3MlMjBwYXJ0bmVyc2hpcCUyMGhhbmRzaGFrZSUyMGNvcnBvcmF0ZXxlbnwxfHx8fDE3NzEwMDA5Nzd8MA&ixlib=rb-4.1.0&q=80&w=1920",
    path: "/support/sponsor"
  },
  {
    id: 6,
    header: "In Need of Specialists?",
    subtext: "Explore thousands of African and International (non-African) specialist establishments (clinics, stations, centers, etc.) that render services in specific scientific & technological fields. Join our community to explore more.",
    image: "https://images.unsplash.com/photo-1761234852472-85aeea9c3eac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwbW9kZXJuJTIwbWVkaWNhbCUyMGNsaW5pYyUyMHNwZWNpYWxpc3QlMjBkb2N0b3J8ZW58MXx8fHwxNzcxMDAwOTc4fDA&ixlib=rb-4.1.0&q=80&w=1920",
    path: "/specialist-centers"
  },
  {
    id: 7,
    header: "Think You've Got What It Takes?",
    subtext: "Compete with fellow Africans in annual intellectual and skill-based science & technology tournaments for rewards and global recognition. Join our community to explore more.",
    image: "https://images.unsplash.com/photo-1682617367276-bbacadf73747?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwc3R1ZGVudCUyMHNjaWVuY2UlMjBjb21wZXRpdGlvbiUyMGhhY2thdGhvbnxlbnwxfHx8fDE3NzEwMDA5Nzh8MA&ixlib=rb-4.1.0&q=80&w=1920",
    path: "/competitions"
  },
  {
    id: 8,
    header: "Looking for Primary & Secondary Schools?",
    subtext: "Search and locate nearby primary & secondary schools that match your preferred standards. Discover other international (non-African) elementary & high schools that enroll African pupils/students. Join our community to explore more.",
    image: "https://images.unsplash.com/photo-1762657865476-00693485adfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwcHJpbWFyeSUyMHNjaG9vbCUyMGNsYXNzcm9vbSUyMGNoaWxkcmVuJTIwbGVhcm5pbmd8ZW58MXx8fHwxNzcxMDAwOTc4fDA&ixlib=rb-4.1.0&q=80&w=1920",
    path: "/institutes"
  }
];

const HERO_STATS = [
  { label: 'Institutes', value: '500+', icon: Building2 },
  { label: 'Innovations', value: '1.2k', icon: Lightbulb },
  { label: 'Scientists', value: '3k+', icon: Users },
  { label: 'Specialist Centers', value: '200+', icon: Microscope },
  { label: 'Afro-Innovations', value: '850+', icon: Zap },
  { label: 'Competitions', value: '50+', icon: Trophy },
  { label: 'Awards', value: '120+', icon: Award },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = right, -1 = left
  const partnersRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAuth();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [attemptedPath, setAttemptedPath] = useState<string>('');

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (idx: number) => {
    setDirection(idx > currentSlide ? 1 : -1);
    setCurrentSlide(idx);
  };

  const handleJoinCommunity = (path: string) => {
    if (!isAuthenticated) {
      setAttemptedPath(path);
      setShowLoginPrompt(true);
    }
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  };

  const textVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  return (
    <div className="flex flex-col pb-16">
      {/* Hero Section with Stats integrated */}
      <section className="relative overflow-hidden bg-brand-navy-900">
        {/* Background Image - slides from side */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 z-0"
          >
            <img
              src={HERO_SLIDES[currentSlide].image}
              alt="Hero Background"
              className="h-full w-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-900 via-brand-navy-900/60 to-brand-navy-900/30" />
          </motion.div>
        </AnimatePresence>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Content */}
          <div className="flex flex-col justify-center text-center pt-16 pb-10 sm:pt-20 sm:pb-12 min-h-[420px] sm:min-h-[460px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="max-w-4xl mx-auto"
              >
                <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-tight">
                  {HERO_SLIDES[currentSlide].header}
                </h1>
                <p className="mx-auto mb-10 max-w-2xl text-base text-slate-200 sm:text-lg leading-relaxed">
                  {HERO_SLIDES[currentSlide].subtext}
                </p>

                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  {isAuthenticated ? (
                    <Link href={HERO_SLIDES[currentSlide].path}>
                      <Button size="lg" className="h-12 px-8 text-base bg-brand-red-600 hover:bg-brand-red-700 border-none shadow-lg shadow-brand-red-600/20">
                        Join the Community
                      </Button>
                    </Link>
                  ) : (
                    <Button 
                      size="lg" 
                      className="h-12 px-8 text-base bg-brand-red-600 hover:bg-brand-red-700 border-none shadow-lg shadow-brand-red-600/20"
                      onClick={() => handleJoinCommunity(HERO_SLIDES[currentSlide].path)}
                    >
                      Join the Community
                    </Button>
                  )}
                  <Link href="/institutes">
                    <Button size="lg" variant="outline" className="h-12 px-8 text-base bg-white/10 text-white border-white/20 hover:bg-white hover:text-brand-navy-900 backdrop-blur-sm">
                      Explore Ecosystem
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Progress Indicators */}
            <div className="flex justify-center gap-3 mt-8">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentSlide === idx ? "w-8 bg-brand-red-600" : "w-2 bg-neutral-gray-dark hover:bg-neutral-gray-medium"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Stats - Inside the hero, no gap */}
          <div className="border-t border-white/10 py-8">
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-7">
              {HERO_STATS.map((stat, i) => (
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

      {/* Categories Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-neutral-black sm:text-3xl">Explore Categories</h2>
            <p className="text-slate-500 mt-2">Navigate the AfriScience Hub® ecosystem by category.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {CATEGORIES.map((cat, index) => {
              // Map category images
              const categoryImages = [
                "https://images.unsplash.com/photo-1645559946960-c002b6e9d559?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
                "https://images.unsplash.com/photo-1614308457932-e16d85c5d053?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
                "https://images.unsplash.com/photo-1742436707388-2b6727520d5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
                "https://images.unsplash.com/photo-1770632067760-70ac2cb9ec3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
                "https://images.unsplash.com/photo-1764874298962-ac0c84307fc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
                "https://images.unsplash.com/photo-1540908489236-15aac66d9a53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
                "https://images.unsplash.com/photo-1766722906733-609eebf3b63a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
              ];
              
              return (
                <Link
                  key={cat.id}
                   href={cat.path}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-gray-light bg-white transition-all hover:shadow-lg hover:border-brand-red-600/50 hover:-translate-y-1"
                >
                  {/* Image Section */}
                  <div className="relative h-32 bg-neutral-bg-light overflow-hidden">
                    <img 
                      src={categoryImages[index] || categoryImages[0]} 
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-900/80 via-brand-navy-900/40 to-transparent" />
                    
                    {/* Icon Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-14 w-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg transition-all group-hover:bg-brand-red-600 group-hover:scale-110">
                        <cat.icon className="h-7 w-7 text-brand-navy-900 transition-colors group-hover:text-white" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Text Section */}
                  <div className="p-4 text-center bg-neutral-bg-light group-hover:bg-white transition-colors">
                    <span className="text-sm font-bold text-neutral-black group-hover:text-brand-red-600 transition-colors leading-tight block">
                      {cat.name}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Top Rated Institutes - 3 in one line */}
      <section className="bg-neutral-bg-light py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-neutral-black">Top Rated Institutes</h2>
              <p className="text-slate-500">Discover verified educational centers of excellence.</p>
            </div>
            <Link href="/institutes" className="flex items-center gap-1 text-brand-red-600 hover:underline">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {INSTITUTES.slice(0, 3).map((inst) => (
              <Link key={inst.id} href={`/institutes/${inst.id}`} className="overflow-hidden rounded-xl bg-white shadow-sm border border-neutral-gray-light hover:shadow-md transition-shadow block">
                <div className="h-48 bg-slate-200 relative">
                  <img src={inst.image} alt={inst.name} className="h-full w-full object-cover" />
                  <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded text-xs font-semibold text-neutral-black">
                    {inst.type}
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-2 flex items-start justify-between">
                    <h3 className="font-bold text-lg text-neutral-black line-clamp-1">{inst.name}</h3>
                    <div className="flex items-center gap-1 text-amber-500 text-sm">
                      <Star className="h-4 w-4 fill-current" />
                      <span>{inst.rating}</span>
                    </div>
                  </div>
                  <p className="mb-3 text-sm text-slate-500 flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {inst.location}
                  </p>
                  <p className="mb-4 text-sm text-slate-500 line-clamp-2">{inst.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {inst.services.slice(0, 2).map((s, i) => (
                      <span key={i} className="text-xs bg-neutral-bg-light text-slate-600 px-2 py-1 rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full">View Profile</Button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Innovations - 3 in one line */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-neutral-black">Trending Innovations</h2>
            <p className="text-slate-500">Breakthrough solutions tackling African challenges.</p>
          </div>
          <Link href="/innovations" className="flex items-center gap-1 text-brand-red-600 hover:underline">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {INNOVATIONS.slice(0, 3).map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-xl bg-brand-navy-900">
              <div className="aspect-[4/3]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 opacity-80 group-hover:opacity-60"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-900 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-brand-red-600 text-xs font-bold uppercase tracking-wider">{item.status}</span>
                  <div className="flex gap-1">
                    {item.sdgs.slice(0, 1).map(sdg => (
                      <span key={sdg} className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">{sdg}</span>
                    ))}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{item.name}</h3>
                <p className="text-slate-300 text-sm mb-4 line-clamp-1">by {item.creator}</p>
                <Link href={`/innovations/${item.id}`}>
                  <Button size="sm" className="w-full bg-white text-brand-navy-900 hover:bg-neutral-bg-light">Learn More</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Scientists - 3 in one line */}
      

      {/* Specialist Centers - 3 in one line */}
      <section className="container mx-auto px-4 md:px-6 lg:px-8 py-16">
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-neutral-black flex items-center gap-2">
              <Microscope className="h-6 w-6 text-brand-red-600" />
              Specialist Centers
            </h2>
            <p className="text-slate-500">Discover specialized hubs for advanced research and services.</p>
          </div>
          <Link href="/specialist-centers" className="flex items-center gap-1 text-brand-red-600 hover:underline">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SPECIALIST_CENTERS.slice(0, 3).map((center) => (
            <div key={center.id} className="overflow-hidden rounded-xl bg-white shadow-sm border border-neutral-gray-light hover:shadow-md transition-shadow">
              <div className="h-48 bg-slate-200 relative">
                <img src={center.image} alt={center.name} className="h-full w-full object-cover" />
                <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded text-xs font-semibold text-neutral-black">
                  {center.field}
                </div>
              </div>
              <div className="p-6">
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="font-bold text-lg text-neutral-black line-clamp-1">{center.name}</h3>
                  <div className="flex items-center gap-1 text-amber-500 text-sm">
                    <Star className="h-4 w-4 fill-current" />
                    <span>{center.rating}</span>
                  </div>
                </div>
                <p className="mb-3 text-sm text-slate-500 flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {center.location}
                </p>
                <p className="mb-4 text-sm text-slate-500 line-clamp-2">{center.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {center.services.slice(0, 3).map((s, i) => (
                    <span key={i} className="text-xs bg-neutral-bg-light text-slate-600 px-2 py-1 rounded">
                      {s}
                    </span>
                  ))}
                </div>
                <Link href={`/specialist-centers/${center.id}`}>
                  <Button variant="outline" className="w-full">View Center</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ongoing Competitions & Hall of Fame - Side by Side */}
      <section className="bg-neutral-bg-light py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">

            {/* Left - Ongoing Competitions */}
            <div>
              <div className="mb-6 flex flex-col md:flex-row items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-neutral-black flex items-center gap-2">
                    <Trophy className="h-6 w-6 text-brand-red-600" />
                    Ongoing Competitions
                  </h2>
                  <p className="text-slate-500 text-sm mt-1">Participate, Innovate, Win.</p>
                </div>
                <Link href="/competitions" className="flex items-center gap-1 text-brand-red-600 hover:underline text-sm font-medium">
                  View All <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="flex flex-col gap-4">
                {COMPETITIONS.slice(0, 4).map((comp) => (
                  <div key={comp.id} className="flex items-start gap-4 rounded-xl bg-white p-2 md:p-4 shadow-sm border border-neutral-gray-light hover:shadow-md transition-all">
                    <div className="h-24 w-28 flex-shrink-0 overflow-hidden rounded-lg bg-slate-200">
                      <img src={comp.image} alt={comp.title} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-bold text-neutral-black text-sm leading-tight">{comp.title}</h3>
                        <span className="text-[10px] font-semibold text-brand-red-600 bg-brand-red-100 px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">
                          {comp.registrationFee}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1 mb-2">{comp.description}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                          <Calendar className="h-3 w-3" />
                          <span>Deadline: {new Date(comp.deadline).toLocaleDateString()}</span>
                        </div>
                        <Link href="/voting">
                          <Button size="sm" className="h-7 text-[11px] px-3 bg-green-600 hover:bg-green-700 gap-1">
                            <Vote className="h-3 w-3" />
                            Vote Now
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Hall of Fame */}
            <div>
              <div className="mb-6 flex flex-col md:flex-row items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-neutral-black flex items-center gap-2">
                    <Award className="h-6 w-6 text-amber-500" />
                    Hall of Fame
                  </h2>
                  <p className="text-slate-500 text-sm mt-1">Celebrating excellence in African Science.</p>
                </div>
                <Link href="/hall-of-fame" className="flex items-center gap-1 text-brand-red-600 hover:underline text-sm font-medium">
                  View All <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="flex flex-col gap-4">
                {AWARD_WINNERS.slice(0, 4).map((winner) => (
                  <div key={winner.id} className="flex items-center gap-4 rounded-xl bg-brand-navy-900 p-4 shadow-sm text-white relative overflow-hidden group hover:shadow-md transition-all">
                    <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-full border-2 border-amber-500/50 relative z-10">
                      <img src={winner.image} alt={winner.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="relative z-10 flex-1 min-w-0">
                      <h4 className="font-bold text-white truncate">{winner.name}</h4>
                      <p className="text-amber-400 text-xs font-semibold uppercase tracking-wide">{winner.type}</p>
                      <p className="text-slate-400 text-xs mt-0.5 truncate">{winner.country}</p>
                    </div>
                    <div className="ml-auto relative z-10 flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                        <Award className="h-4 w-4 text-amber-500" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Partners & Sponsors Slider */}
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

        {/* Infinite scroll slider - Desktop */}
        <div className="relative hidden md:block">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="flex overflow-hidden" ref={partnersRef}>
            <motion.div
              className="flex gap-8 items-center"
              animate={{ x: [0, -1400] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 25,
                  ease: "linear",
                },
              }}
            >
              {[...PARTNERS, ...PARTNERS].map((partner, idx) => (
                <div
                  key={`${partner.id}-${idx}`}
                  className="flex-shrink-0 flex items-center justify-center w-56 h-24 rounded-xl border border-neutral-gray-light px-6 transition-all duration-300 group/partner bg-neutral-bg-light hover:bg-white hover:shadow-md hover:border-transparent cursor-pointer"
                >
                  <div className="flex flex-col items-center gap-1.5">
                    <span
                      className="text-2xl font-black tracking-tight transition-all duration-300"
                      style={{
                        color: '#9CA3AF',
                        filter: 'grayscale(100%)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = partner.brandColor;
                        e.currentTarget.style.filter = 'grayscale(0%)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#9CA3AF';
                        e.currentTarget.style.filter = 'grayscale(100%)';
                      }}
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

        {/* Static Grid - Mobile */}
        <div className="md:hidden container mx-auto px-4">
          <div className="grid grid-cols-2 gap-4">
            {PARTNERS.map((partner) => (
              <div
                key={partner.id}
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
                  <span
                    className="logo text-xl font-black tracking-tight transition-all duration-300"
                    style={{
                      color: '#9CA3AF',
                      filter: 'grayscale(100%)',
                    }}
                  >
                    {partner.logo}
                  </span>
                  <span className="text-[10px] text-slate-500 text-center leading-tight">
                    {partner.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-brand-navy-900 to-brand-red-600 p-8 sm:p-16 text-center text-white">
          <h2 className="mb-4 text-3xl font-bold">Ready to Showcase Your Innovation?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-slate-200">
            Join thousands of scientists, students, and institutes transforming the future of Africa.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-brand-red-600 hover:bg-neutral-bg-light">
            Create Your Profile
          </Button>
        </div>
      </section>

      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-black mb-2">Login Required</h3>
            <p className="text-slate-500 mb-6">
              Please log in to your account to access the full content and features of this page.
            </p>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowLoginPrompt(false)}
              >
                Cancel
              </Button>
              <Link href="/login" className="flex-1">
                <Button className="w-full bg-brand-red-600 hover:bg-brand-red-700">
                  Log In
                </Button>
              </Link>
            </div>
            <p className="text-xs text-slate-400 mt-4">
              Don't have an account? <Link href="/signup" className="text-brand-red-600 hover:underline">Sign up here</Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}