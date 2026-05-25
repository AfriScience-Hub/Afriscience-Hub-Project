'use client';

import { 
  ArrowLeft,
  HandHeart, 
  Briefcase,
  Microscope, 
  GraduationCap
} from 'lucide-react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import SearchModal from '../../components/search';
import DonationModal, { type DonationProgram } from './components/donationModal';
import Link from 'next/link';
import { useState } from 'react';

const donationPrograms = [
  {
    title: "Career Support",
    desc: "Encourage Africa's top graduating tertiary students by providing them a financial head-start in their chosen career path. Help us create more jobs across the continent.",
    raised: 0,
    goal: 5000000,
    icon: Briefcase,
    cardClass: "bg-emerald-200/30 border-emerald-400",
    iconBgClass: "bg-emerald-50",
    iconTextClass: "text-emerald-700",
    progressClass: "bg-emerald-600",
  },
  {
    title: "Research Support",
    desc: "Provide financial aid to African researchers to help them access materials and equipment needed to advance scientific and technological studies across the continent.",
    raised: 0,
    goal: 10000000,
    icon: Microscope,
    cardClass: "bg-sky-200/30 border-sky-400",
    iconBgClass: "bg-sky-50",
    iconTextClass: "text-sky-700",
    progressClass: "bg-sky-600",
  },
  {
    title: "Educational Scholarships (Tertiary)",
    desc: "Provide educational scholarships to current African tertiary students that lack the resources required to complete their programs in science and technology related fields.",
    raised: 0,
    goal: 15000000,
    icon: GraduationCap,
    cardClass: "bg-amber-200/30 border-amber-400",
    iconBgClass: "bg-amber-50",
    iconTextClass: "text-amber-700",
    progressClass: "bg-amber-600",
  },
];

export default function DonatePage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<DonationProgram | null>(null);
  const handleSearchOpen = () => setSearchOpen(true);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearchOpen={handleSearchOpen} />

      {/* Hero Section - Patterned after Sponsor Page */}
      <section className="relative bg-[#0A1428] text-white py-28 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-start">
            {/* Back Button */}
            <Link href="/support" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-5">
              <ArrowLeft className="w-4 h-4" /> Back to Support
            </Link>
            {/* Donations Badge */}
            <div className="flex gap-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-5 py-2 rounded-full text-sm font-medium mb-6">
              <HandHeart className="w-4 h-4" />
              Donations
            </div>
          </div>

          <h1 className="text-3xl lg:text-5xl font-black leading-tight mb-6">
            Donate
          </h1>

          <p className="max-w-3xl text-sm lg:text-lg text-gray-300 mb-10 leading-normal">
            Your donations help us achieve our set commonly service goals across the African continent. We intend addressing important developmental and humanitarian programs with donation funds, and we deeply appreciate/recognize your support towards our vision to propel the continent to greater heights.
          </p>

          <div className="flex flex-col lg:flex-row gap-4">
            <button 
              className="bg-red-600 hover:bg-red-700 transition-colors text-white font-semibold px-2 lg:px-8 py-2 lg:py-3 text-xs lg:text-[16px] rounded-sm inline-flex items-center justify-center cursor-pointer"
            >
              Donate to AfriScience Hub Today!
            </button>
          </div>
        </div>

        {/* Background Overlay Image (Handshake/Collaboration) */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509059852496-f3822ae057bf?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 grayscale" />
      </section>

      {/* Current Causes Section - Progress Bars */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Current Programs</h2>
            <p className="text-gray-600">Select a program to support. Every contribution counts.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {donationPrograms.map((cause, i) => (
              <div key={i} className={`${cause.cardClass} border-2 rounded-3xl p-8 flex flex-col hover:shadow-md transition-shadow`}>
                <div className="flex flex-col lg:flex-row gap-4 items-start mb-6">
                  <div className={`p-3 ${cause.iconBgClass} rounded-xl`}>
                    <cause.icon className={`w-6 h-6 ${cause.iconTextClass}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{cause.title}</h3>
                    <p className="text-gray-500 text-xs mt-1">{cause.desc}</p>
                  </div>
                </div>

                <div className="mt-auto">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold text-gray-900">${cause.raised.toLocaleString()} raised</span>
                    <span className="text-gray-500 font-medium">of ${cause.goal.toLocaleString()}</span>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-300 h-2.5 rounded-full mb-2">
                    <div 
                      className={`${cause.progressClass} h-2.5 rounded-full`}
                      style={{ width: `${(cause.raised / cause.goal) * 100}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-gray-400 mb-6 italic">
                    ◎ {Math.round((cause.raised / cause.goal) * 100)}% of goal reached
                  </p>
                  <button
                    type="button"
                    onClick={() => setSelectedProgram(cause)}
                    className="cursor-pointer w-full border border-gray-200 hover:border-gray-400 transition-colors py-3 rounded-lg font-semibold text-black bg-white hover:bg-gray-200"
                  >
                    Donate to this program
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <SearchModal 
        isOpen={searchOpen} 
        onClose={() => setSearchOpen(false)} 
      />
      <DonationModal
        program={selectedProgram}
        onClose={() => setSelectedProgram(null)}
      />
    </div>
  );
}
