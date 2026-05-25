'use client';

import { Heart, Users, Stars, Globe, Microscope, Lightbulb, Trophy, HandHeart } from 'lucide-react';
import Header from '../components/header';
import Footer from '../components/footer';
import SearchModal from '../components/search';
import Link from 'next/link';
import { useState } from 'react';

export default function SupportPage() {
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearchOpen = () => setSearchOpen(true);

  return (
    <div className="min-h-screen bg-white">
      <Header onSearchOpen={handleSearchOpen} />

      {/* Hero Section - Dark Gradient Background */}
      <section className="relative bg-linear-to-br from-[#0A1428] via-[#1A2A4A] to-[#0F1F3A] text-white pt-32 pb-20 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          {/* Make a Difference Button */}
          <div className="inline-flex items-center gap-2 bg-[#342030] px-6 py-2.5 text-red-600 rounded-full text-sm font-medium mb-8">
            <Heart className="w-4 h-4 text-red-500" />
            Make a Difference
          </div>

          <h1 className="text-2xl lg:text-5xl font-bold leading-tight mb-6">
            Support AfriScienceHub
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg text-gray-300">
            Help us build the largest science and innovation ecosystem in Africa. 
            Every contribution brings us closer to empowering the next generation of African scientists and innovators.
          </p>
        </div>

        {/* Subtle Background Accent */}
        <div className="absolute inset-0 bg-[radial-gradient(at_top_right,#ffffff10_0%,transparent_50%)]" />
      </section>

      {/* Support Cards Section */}
      <section className="relative -mt-12 pb-20">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-5">
          
          {/* Card 1: Sponsor */}
          <Link href="/support/sponsor" className="group">
            <div className="bg-white rounded-3xl overflow-hidden border-2 border-yellow-400 shadow-sm hover:shadow-xl transition-all duration-300 h-full lg:w-80 flex flex-col">
              {/* Image Area */}
              <div className="h-52 relative bg-linear-to-br from-amber-50 to-white flex items-center justify-center overflow-hidden border-b border-gray-100">
                <div className="absolute inset-0 bg-[url('https://picsum.photos/id/1015/800/600')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex flex-col items-start gap-3 mb-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                    <Stars className="w-6 h-6 text-amber-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900">Sponsor AfriScienceHub</h4>
                </div>
                
                <p className="text-gray-600 flex-1">
                  Support the overall mission and development of the platform. Your sponsorship helps sustain operations, expand reach, and create new opportunities for African scientists and innovators.
                </p>
                
                <div className="mt-8 text-red-600 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                  Learn More 
                  <span className="text-lg leading-none">→</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Card 2: Donate */}
          <Link href="/support/donate" className="group">
            <div className="bg-white rounded-3xl overflow-hidden border-2 border-green-400 shadow-sm hover:shadow-xl transition-all duration-300 h-full lg:w-80 flex flex-col">
              {/* Image Area */}
              <div className="h-52 relative bg-linear-to-br from-emerald-50 to-white flex items-center justify-center overflow-hidden border-b border-gray-100">
                <div className="absolute inset-0 bg-[url('https://picsum.photos/id/106/800/600')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex flex-col items-start gap-3 mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
                    <HandHeart className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900">Donate to Projects</h4>
                </div>
                
                <p className="text-gray-600 flex-1">
                  Support specific initiatives such as competitions, innovation development, research grants, student programs, and community awards across the African continent.
                </p>
                
                <div className="mt-8 text-red-600 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                  Learn More 
                  <span className="text-lg leading-none">→</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Card 3: Volunteer */}
          <Link href="/support/volunteer" className="group">
            <div className="bg-white rounded-3xl overflow-hidden border-2 border-blue-200 shadow-sm hover:shadow-xl transition-all duration-300 h-full lg:w-80 flex flex-col">
              {/* Image Area */}
              <div className="h-52 relative bg-linear-to-br from-blue-50 to-white flex items-center justify-center overflow-hidden border-b border-gray-100">
                <div className="absolute inset-0 bg-[url('https://picsum.photos/id/1016/800/600')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900">Become a Volunteer</h4>
                </div>
                
                <p className="text-gray-600 flex-1">
                  Contribute your time, knowledge, or expertise to help grow the ecosystem. Volunteer as a competition judge, research mentor, event coordinator, or platform moderator.
                </p>
                
                <div className="mt-8 text-red-600 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                  Learn More 
                  <span className="text-lg leading-none">→</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">Why Support AfriScienceHub?</h2>
          <p className="text-gray-600 text-md max-w-2xl mx-auto">
            Your support directly impacts the growth of science and innovation across the African continent.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-16">
            <div>
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <Globe className="w-7 h-7 text-blue-600" />
                </div>
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">54</div>
              <p className="text-gray-500">African Countries Reached</p>
            </div>

            <div>
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center">
                  <Microscope className="w-7 h-7 text-emerald-600" />
                </div>
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">3,000+</div>
              <p className="text-gray-500">Scientists Connected</p>
            </div>

            <div>
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center">
                  <Lightbulb className="w-7 h-7 text-amber-600" />
                </div>
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">850+</div>
              <p className="text-gray-500">Innovations Showcased</p>
            </div>

            <div>
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center">
                  <Trophy className="w-7 h-7 text-rose-600" />
                </div>
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">120+</div>
              <p className="text-gray-500">Awards Given</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="relative py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-linear-to-r from-slate-900 via-orange-950 to-red-600 rounded-3xl p-6 lg:p-16 text-center text-white relative overflow-hidden">
            <div className="lg:max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Together, We Can Transform African Science</h2>
              <p className="text-md text-white/90 mb-10">
                Whether through sponsorship, donations, or volunteering, your contribution makes a lasting impact.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/support/sponsor"
                  className="bg-white font-semibold px-8 text-red-600 py-3 rounded-xl hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
                >
                  Become a Sponsor
                </Link>
                <Link 
                  href="/contact"
                  className="border border-white/70 hover:bg-white/10 font-medium px-8 py-3 rounded-xl transition-colors inline-flex items-center justify-center"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Search Modal */}
      <SearchModal 
        isOpen={searchOpen} 
        onClose={() => setSearchOpen(false)} 
      />
    </div>
  );
}