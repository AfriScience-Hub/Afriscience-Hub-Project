'use client';

import { 
  ArrowLeft,
  HandHeart, 
  Trophy, 
  Lightbulb, 
  Microscope, 
  GraduationCap, 
  Globe2
} from 'lucide-react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import SearchModal from '../../components/search';
import Link from 'next/link';
import { useState } from 'react';

export default function DonatePage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const handleSearchOpen = () => setSearchOpen(true);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearchOpen={handleSearchOpen} />

      {/* Hero Section - Patterned after Sponsor Page */}
      <section className="relative bg-[#0A1428] text-white py-28 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
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

          <p className="max-w-3xl text-sm lg:text-xl text-gray-300 mb-10 leading-relaxed">
            Your donations help us maintain our network&apos;s internal framework and facilitate our enlightenment programs across the African continent. We deeply appreciate and recognize your support towards our mission to propel the continent to greater heights.
          </p>

          <div className="flex flex-col lg:flex-row gap-4">
            <button 
              className="bg-red-600 hover:bg-red-700 transition-colors text-white font-semibold px-2 lg:px-5 py-2 lg:py-3 text-xs lg:text-lg rounded-sm inline-flex items-center justify-center cursor-pointer"
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
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Current Causes</h2>
            <p className="text-gray-600">Select a cause to support. Every contribution counts.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Competition Awards",
                desc: "Fund prizes for annual science and innovation competitions that motivate African youth to push the boundaries of discovery.",
                raised: 18750,
                goal: 25000,
                icon: Trophy
              },
              {
                title: "Innovation Development",
                desc: "Support early-stage African innovations with prototyping grants, mentorship, and technical resources to bring ideas to market.",
                raised: 31200,
                goal: 50000,
                icon: Lightbulb
              },
              {
                title: "Research Support",
                desc: "Provide researchers with equipment, reagents, and publication support to advance critical studies across the continent.",
                raised: 22800,
                goal: 40000,
                icon: Microscope
              },
              {
                title: "Student Programs",
                desc: "Sponsor scholarships, internships, and STEM bootcamps that prepare the next generation of African scientists and technologists.",
                raised: 19500,
                goal: 30000,
                icon: GraduationCap
              },
              {
                title: "General Support",
                desc: "Support our network&apos;s internal framework and enlightenment programs across the African continent.",
                raised: 45000,
                goal: 100000,
                icon: Globe2,
                color: "amber",
              },
            ].map((cause, i) => (
              <div key={i} className={`bg-blue-200/30 border-2 border-blue-400 rounded-3xl p-8 flex flex-col hover:shadow-md transition-shadow`}>
                <div className="flex flex-col lg:flex-row gap-4 items-start mb-6">
                  <div className={`p-3 bg-${cause.color}-50 rounded-xl`}>
                    <cause.icon className={`w-6 h-6 text-amber-600`} />
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
                      className="bg-red-600 h-2.5 rounded-full" 
                      style={{ width: `${(cause.raised / cause.goal) * 100}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-gray-400 mb-6 italic">
                    ◎ {Math.round((cause.raised / cause.goal) * 100)}% of goal reached
                  </p>
                  <button className="cursor-pointer w-full border border-gray-200 hover:border-gray-400 transition-colors py-3 rounded-lg font-medium text-gray-900 bg-white hover:bg-gray-200">
                    Donate to this Cause
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Your Impact Section */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Impact</h2>
            <p className="text-gray-500">See what your donation can achieve.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { amount: "$25", icon: "🧪", text: "Provides lab supplies for one student researcher for a week." },
              { amount: "$100", icon: "🎓", text: "Sponsors a student's participation in a national science competition." },
              { amount: "$500", icon: "🚀", text: "Funds a prototyping grant for an early-stage African innovation." },
            ].map((impact, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-gray-200 text-center flex flex-col items-center">
                <span className="text-4xl mb-4">{impact.icon}</span>
                <div className="text-3xl font-bold text-red-600 mb-4">{impact.amount}</div>
                <p className="text-sm text-gray-600 leading-relaxed">{impact.text}</p>
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
    </div>
  );
}