'use client';

import Link from 'next/link';
import { Sparkles, ArrowRight, CheckCircle2, Building2, Globe, TrendingUp, Award, X } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const SPONSOR_TIERS = [
  {
    name: 'Bronze',
    amount: '$500 / year',
    color: 'border-amber-700',
    badge: '🥉',
    features: [
      'Logo on AfriScienceHub website',
      'Social media mention',
      'Quarterly impact report',
      'Certificate of Sponsorship',
    ],
  },
  {
    name: 'Silver',
    amount: '$2,500 / year',
    color: 'border-slate-400',
    badge: '🥈',
    features: [
      'Everything in Bronze',
      'Featured partner listing',
      'Event branding opportunities',
      'Dedicated sponsor spotlight article',
      'Priority newsletter placement',
    ],
  },
  {
    name: 'Gold',
    amount: '$10,000 / year',
    color: 'border-amber-500',
    badge: '🥇',
    popular: true,
    features: [
      'Everything in Silver',
      'Award ceremony naming rights',
      'Exclusive innovation previews',
      'Co-branded annual report',
      'VIP access to all AfriScienceHub events',
      'Talent pipeline access',
    ],
  },
  {
    name: 'Platinum',
    amount: '$25,000+ / year',
    color: 'border-brand-navy-900',
    badge: '💎',
    features: [
      'Everything in Gold',
      'Strategic partnership council seat',
      'Custom research collaborations',
      'White-label innovation challenges',
      'Direct mentoring match program',
      'Full analytics dashboard access',
    ],
  },
];

const WHAT_FUNDS_SUPPORT = [
  { icon: Award, title: 'Annual Awards', desc: 'Recognizing top scientists, innovators, and educators across Africa.' },
  { icon: Building2, title: 'Platform Development', desc: 'Building tools that connect researchers, labs, and innovators.' },
  { icon: Globe, title: 'Community Outreach', desc: 'Expanding access to science education in underserved regions.' },
  { icon: TrendingUp, title: 'Innovation Programs', desc: 'Funding competitions, hackathons, and innovation challenges.' },
];

export default function Sponsor() {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="pb-16">
      <section className="relative bg-brand-navy-900 py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1712903276864-79723b184ffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBzcG9uc29yc2hpcCUyMGV2ZW50JTIwc3RhZ2V8ZW58MXx8fHwxNzcyODY5MDQ3fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Sponsor"
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy-900/60 to-brand-navy-900" />
        </div>
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/support" className="inline-flex items-center gap-1 text-slate-400 hover:text-white text-sm mb-6 transition-colors">
            <ArrowRight className="h-3 w-3 rotate-180" /> Back to Support
          </Link>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-400 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              <Sparkles className="h-4 w-4" />
              Sponsorship
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Sponsor AfriScience Hub
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl mb-8">
              Partner with us to fuel Africa's science and innovation revolution. Your sponsorship directly supports the tools, events, and programs that empower thousands of scientists and innovators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/support/sponsor/apply">
                <Button size="lg" className="bg-brand-red-600 hover:bg-brand-red-700 h-12 px-8">
                  Become a Sponsor
                </Button>
              </Link>
              <Link href="/support/sponsor/all">
                <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white hover:text-brand-navy-900 backdrop-blur-sm h-12 px-8">
                  View All Sponsors
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-neutral-black mb-2">Why Sponsor AfriScienceHub?</h2>
          <p className="text-slate-500 max-w-xl mx-auto">Align your brand with Africa's brightest minds and most impactful innovations.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { emoji: '🌍', title: 'Continental Reach', desc: 'Access a network spanning 54 African countries and growing.' },
            { emoji: '📈', title: 'Brand Visibility', desc: 'Your logo and brand featured across our platform, events, and publications.' },
            { emoji: '🤝', title: 'Talent Pipeline', desc: 'Connect with top scientists, researchers, and innovators for recruitment.' },
            { emoji: '💡', title: 'Innovation Access', desc: 'Get early previews of groundbreaking African innovations and research.' },
            { emoji: '📊', title: 'Impact Reporting', desc: 'Receive detailed reports on how your sponsorship makes a difference.' },
            { emoji: '🏆', title: 'Recognition', desc: 'Be recognized as a champion of African science at our annual awards.' },
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-xl bg-neutral-bg-light hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">{item.emoji}</div>
              <h3 className="font-bold text-neutral-black mb-1">{item.title}</h3>
              <p className="text-sm text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-neutral-black mb-2">Sponsorship Tiers</h2>
          <p className="text-slate-500">Choose the level that best fits your organization.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SPONSOR_TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl border-2 bg-white p-6 transition-shadow hover:shadow-lg ${tier.color} ${tier.popular ? 'ring-2 ring-brand-red-600 ring-offset-2' : ''}`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">{tier.badge}</div>
                <h3 className="text-xl font-bold text-neutral-black">{tier.name}</h3>
                <p className="text-brand-red-600 font-semibold mt-1">{tier.amount}</p>
              </div>
              <ul className="space-y-2.5 mb-6">
                {tier.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button className={`w-full ${tier.popular ? 'bg-brand-red-600 hover:bg-brand-red-700' : ''}`} variant={tier.popular ? 'default' : 'outline'}>
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-2xl bg-brand-navy-900 p-8 sm:p-12 flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1 text-white">
            <h2 className="text-2xl font-bold mb-3">Corporate Sponsorship</h2>
            <p className="text-slate-300 mb-6">
              Looking for a custom sponsorship package tailored to your organization's goals? We work with corporations, foundations, and government agencies to create bespoke partnerships that maximize impact and visibility.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-brand-red-600 hover:bg-brand-red-700">
                Contact Our Partnerships Team
              </Button>
            </Link>
          </div>
          <div className="flex-shrink-0 grid grid-cols-2 gap-4 text-center">
            {[
              { val: '50+', label: 'Current Sponsors' },
              { val: '10M+', label: 'Annual Reach' },
              { val: '54', label: 'Countries' },
              { val: '98%', label: 'Renewal Rate' },
            ].map((s, i) => (
              <div key={i} className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-extrabold text-white">{s.val}</div>
                <div className="text-xs text-slate-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Sponsorship Details</h3>
              <button className="text-gray-500 hover:text-gray-700" onClick={closeModal}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-sm text-gray-500">Thank you for your interest in sponsoring AfriScienceHub. Please contact our partnerships team for more details.</p>
            <Link href="/contact">
              <Button size="lg" className="bg-brand-red-600 hover:bg-brand-red-700 mt-4">
                Contact Our Partnerships Team
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
