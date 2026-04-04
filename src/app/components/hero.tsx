'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Lightbulb, 
  Users, 
  Microscope, 
  Zap,
  Trophy,
  Award
} from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  description: string;
  backgroundImage: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Where can My Samples and Data be Analyzed?',
    description: 'Discover thousands of African and International (non-African) science & technology laboratories that can analyze samples & data sets for different parameters. Many also offer industrial trainings, consultancy, and certifications. Join our community to explore more.',
    backgroundImage: 'url(\'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&h=900&fit=crop\')'
  },
  {
    id: 2,
    title: 'Are You a Creative African Innovator & Inventor?',
    description: 'We provide a platform for African innovators and inventors to publicize their craft for global recognition and investment opportunities. Join our community to explore more.',
    backgroundImage: 'url(\'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=900&fit=crop\')'
  },
  {
    id: 3,
    title: 'Who Is Your Winner?',
    description: 'Appreciate and encourage fellow Africans by voting for your favorite finalist for an honorary award and global recognition. Join our community to explore more.',
    backgroundImage: 'url(\'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=900&fit=crop\')'
  },
  {
    id: 4,
    title: 'AfriScience Hub® Honorary Awards!',
    description: 'Stand a chance to be rewarded annually by our network for outstanding performance in enlightenment programmes. Let your skill and craft gain global recognition through our platform. Join our community to explore more.',
    backgroundImage: 'url(\'https://images.unsplash.com/photo-1557821552-17105176677c?w=1600&h=900&fit=crop\')'
  },
  {
    id: 5,
    title: 'Are you looking to Sponsor AfriScience Hub®?',
    description: 'Partner with us to support science education and innovation across Africa. Your sponsorship can help us expand our reach and impact. Join our community to explore more.',
    backgroundImage: 'url(\'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=900&fit=crop\')'
  },
  {
    id: 6,
    title: 'In Need of Specialists?',
    description: 'Explore thousands of African and International (non-African) specialist establishments (clinics, stations, centers, etc.) that render services in specific scientific & technological fields. Join our community to explore more.',
    backgroundImage: 'url(\'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&h=900&fit=crop\')'
  },
  {
    id: 7,
    title: 'Think You\'ve Got What It Takes?',
    description: 'Compete with fellow Africans in annual intellectual and skill-based science & technology tournaments for rewards and global recognition. Join our community to explore more.',
    backgroundImage: 'url(\'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=900&fit=crop\')'
  },
  {
    id: 8,
    title: 'Looking for Primary & Secondary Schools?',
    description: 'Search and locate nearby primary & secondary schools that match your preferred standards. Discover other international (non-African) elementary & high schools that enroll African pupils/students. Join our community to explore more.',
    backgroundImage: 'url(\'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600&h=900&fit=crop\')'
  },
];

const stats = [
  { icon: Building2, label: 'Institutes', value: '500+' },
  { icon: Lightbulb, label: 'Innovations', value: '1.2k' },
  { icon: Users, label: 'Scientists', value: '3k+' },
  { icon: Microscope, label: 'Specialist Centers', value: '200+' },
  { icon: Zap, label: 'Afro-Innovations', value: '850+' },
  { icon: Trophy, label: 'Competitions', value: '50+' },
  { icon: Award, label: 'Awards', value: '120+' }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 3000);
  };

  const slide = slides[currentSlide];

  return (
    <div className="w-full py-16 md:py-0">
      {/* Hero Carousel */}
      <div
        className="relative h-[130vh] lg:h-[120vh] w-full bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{
          backgroundImage: slide.backgroundImage,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#0B1D35]/90"></div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 py-16">
          <div className="max-w-3xl text-center">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {slide.title}
            </h1>

            {/* Description */}
            <p className="text-base md:text-lg text-gray-100 mb-8 leading-relaxed">
              {slide.description}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="/signup"
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors text-center"
              >
                Join our community
              </Link>
              <Link
                href="/institutes"
                className="border-2 border-gray-400 hover:border-white text-white font-semibold px-8 py-3 rounded-lg transition-colors text-center"
              >
                Explore Ecosystem
              </Link>
            </div>

            {/* Slide Indicators */}
            <div className="flex gap-2 justify-center">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-red-600 w-8'
                      : 'bg-gray-400 w-2 hover:bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-linear-to-b from-slate-900 to-slate-950 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <Icon size={24} className="text-red-600" />
                  </div>
                  <div className="text-white font-bold text-lg">{stat.value}</div>
                  <div className="text-gray-400 text-xs text-center">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
