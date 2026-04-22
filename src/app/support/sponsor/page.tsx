'use client';

import { Stars, Globe, TrendingUp, Handshake, Lightbulb, BarChart3, Award, CheckCircle } from 'lucide-react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import SearchModal from '../../components/search';
import Link from 'next/link';
import { useState } from 'react';

export default function SponsorPage() {
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearchOpen = () => setSearchOpen(true);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearchOpen={handleSearchOpen} />

      {/* Hero Section - Dark Background */}
      <section className="relative bg-[#0A1428] text-white py-28 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">

         <div className='flex flex-col items-start'>
            {/* Back Button */}
            <Link href="/support" className="gap-2 text-gray-400 hover:text-white transition-colors mb-5">
              ← Back to Support
            </Link>

            {/* Sponsorship Badge */}
            <div className="flex gap-2 bg-amber-500/30 text-amber-400 px-5 py-2 rounded-full text-sm font-medium mb-6">
              <Stars className="w-4 h-4" />
              Sponsorship
            </div>
         </div>

          <h1 className="text-3xl lg:text-5xl font-bold leading-tight mb-6">
            Sponsor AfriScience Hub
          </h1>

          <p className="max-w-2xl text-xl text-gray-300 mb-10">
            Partner with us to fuel Africa&apos;s science and innovation revolution. Your sponsorship directly supports the tools, events, and programs that empower thousands of scientists and innovators.
          </p>

          <div className="flex flex-col lg:flex-row gap-4">
            <Link 
              href="#tiers"
              className="bg-red-600 hover:bg-red-700 transition-colors text-white font-semibold px-8 py-3 rounded-xl inline-flex items-center justify-center"
            >
              Become a Sponsor
            </Link>
            <Link 
              href="#"
              className="border border-white/30 hover:bg-white/10 transition-colors text-white font-medium px-8 py-3 rounded-xl inline-flex items-center justify-center"
            >
              View All Sponsors
            </Link>
          </div>
        </div>

        {/* Background Overlay Image */}
        <div className="absolute inset-0 bg-[url('https://picsum.photos/id/1015/2000/1200')] bg-cover bg-center opacity-20" />
      </section>

      {/* Why Sponsor Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Sponsor AfriScienceHub?</h2>
            <p className="text-gray-600 text-sm max-w-2xl mx-auto">
              Align your brand with Africa&apos;s brightest minds and most impactful innovations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Globe, title: "Continental Reach", desc: "Access a network spanning 54 African countries and growing." },
              { icon: TrendingUp, title: "Brand Visibility", desc: "Your logo and brand featured across our platform, events, and publications." },
              { icon: Handshake, title: "Talent Pipeline", desc: "Connect with top scientists, researchers, and innovators for recruitment." },
              { icon: Lightbulb, title: "Innovation Access", desc: "Get early previews of groundbreaking African innovations and research." },
              { icon: BarChart3, title: "Impact Reporting", desc: "Receive detailed reports on how your sponsorship makes a difference." },
              { icon: Award, title: "Recognition", desc: "Be recognized as a champion of African science at our annual awards." },
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-5 hover:shadow-lg p-4 rounded-xl">
                <div className="w-12 h-12 bg-gray-100 rounded-2xl shrink-0 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-md text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsorship Tiers */}
      <section id="tiers" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-3">Sponsorship Tiers</h2>
            <p className="text-gray-600">Choose the level that best fits your organization.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Bronze */}
            <div className="bg-white border border-amber-200 rounded-3xl p-4 flex flex-col">
              <div className="flex justify-center mb-3">
                <div className="w-10 h-10 flex items-center justify-center">
                  <span className="text-4xl">🥉</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-1 text-black">Bronze</h3>
              <p className="text-red-600 font-semibold text-center mb-8">$500 / year</p>
              
              <ul className="space-y-2 mb-5">
                {["Logo on AfriScienceHub website", "Social media mention", "Quarterly impact report", "Certificate of Sponsorship"].map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700 text-sm"> 
                    <CheckCircle className="text-emerald-500 h-3 w-3 mt-1" />
                    {benefit}
                  </li>
                ))}
              </ul>
              <button className="cursor-pointer w-full border border-gray-300 hover:border-gray-400 transition-colors py-2 text-sm rounded-sm font-medium text-black">
                Get Started
              </button>
            </div>

            {/* Silver */}
            <div className="bg-white border border-blue-200 rounded-3xl p-4 flex flex-col relative mb-5 lg:mb-0">
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 flex items-center justify-center">
                  <span className="text-4xl">🥈</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-center mb-1 text-black">Silver</h3>
              <p className="text-red-600 font-semibold text-center mb-8">$2,500 / year</p>
              
              <ul className="space-y-2 mb-5">
                {["Everything in Bronze", "Featured partner listing", "Event branding opportunities", "Dedicated sponsor spotlight article", "Priority newsletter placement"].map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                    <CheckCircle className="text-emerald-500 h-3 w-3 mt-1" />
                    {benefit}
                  </li>
                ))}
              </ul>
              <button className="cursor-pointer w-full border border-gray-300 hover:border-gray-400 transition-colors py-2 rounded-sm text-black text-sm font-medium">
                Get Started
              </button>
            </div>

            {/* Gold - Most Popular */}
            <div className="bg-white border-2 border-red-500 rounded-3xl p-4 flex flex-col relative scale-105 shadow-xl">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white text-xs font-bold px-6 py-1 rounded-full">
                Most Popular
              </div>
              
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 flex items-center justify-center">
                  <span className="text-4xl">🥇</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-black text-center mb-1">Gold</h3>
              <p className="text-red-600 font-semibold text-center mb-8">$10,000 / year</p>
              
              <ul className="space-y-4 mb-5">
                {["Everything in Silver", "Award ceremony naming rights", "Exclusive innovation previews", "Co-branded annual report", "VIP access to all AfriScienceHub events", "Talent pipeline access"].map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <CheckCircle className="text-emerald-500 h-3 w-3 mt-1" />
                    {benefit}
                  </li>
                ))}
              </ul>
              <button className="cursor-pointer w-full bg-red-600 hover:bg-red-700 transition-colors text-white py-4 rounded-2xl font-semibold">
                Get Started
              </button>
            </div>

            {/* Platinum */}
            <div className="bg-white border border-purple-200 rounded-3xl p-4 flex flex-col mt-5 lg:mb-0">
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 flex items-center justify-center">
                  <span className="text-4xl">💎</span>
                </div>
              </div>
              <h3 className="text-2xl text-black font-bold text-center mb-1">Platinum</h3>
              <p className="text-red-600 font-semibold text-center mb-8">$25,000+ / year</p>
              
              <ul className="space-y-4 mb-5">
                {["Everything in Gold", "Strategic partnership council seat", "Custom research collaborations", "White-label innovation challenges", "Direct mentoring match program", "Full analytics dashboard access"].map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <CheckCircle className="text-emerald-500 mt-1 w-3 h-3" />
                    {benefit}
                  </li>
                ))}
              </ul>
              <button className="cursor-pointer w-full border border-gray-300 hover:border-gray-400 transition-colors py-2 rounded-sm text-sm text-black font-medium">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Sponsorship Banner */}
      <section className="py-20 text-white mb-5">
        <div className="max-w-6xl mx-auto px-3 lg:px-6">
          <div className="bg-[#0F1A33] rounded-xl p-6 lg:p-8 flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-6">Corporate Sponsorship</h2>
              <p className="text-gray-300 text-xs lg:text-md leading-relaxed">
                Looking for a custom sponsorship package tailored to your organization&apos;s goals? We work with corporations, foundations, and government agencies to create bespoke partnerships that maximize impact and visibility.
              </p>
              <button className="mt-10 cursor-pointer bg-red-600 hover:bg-red-700 transition-colors px-3 lg:px-6 py-2 rounded-sm text-xs lg:text-sm font-semibold">
                Contact Our Partnerships Team
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 shrink-0">
              {[
                { number: "50+", label: "Current Sponsors" },
                { number: "10M+", label: "Annual Reach" },
                { number: "54", label: "Countries" },
                { number: "98%", label: "Renewal Rate" },
              ].map((stat, i) => (
                <div key={i} className="bg-white/10 backdrop-blur rounded-xl p-4 lg:p-6 text-center">
                  <div className="text-2xl lg:text-3xl font-bold mb-1">{stat.number}</div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
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