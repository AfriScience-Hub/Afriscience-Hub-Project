'use client';

import Link from 'next/link';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { openFeedback } from '@/lib/feedback';

const SPONSOR_TIERS = [
  {
    name: 'Bronze',
    amount: '$2,500 / year',
    color: 'border-amber-700',
    badge: '🥉',
    features: [
      'Webspace Marketing',
      'AfriScience Hub Sponsorship Badge',
      'Certificate of Sponsorship',
      'Feature in Newsletters',
      'Invitation to annual Sponsor\'s Networking Events',
      '15 catalog entries max.',
      '1 industry selection max.',
    ],
  },
  {
    name: 'Silver',
    amount: '$10,000 / year',
    color: 'border-slate-400',
    badge: '🥈',
    popular: true,
    features: [
      'Webspace Marketing',
      'AfriScience Hub Sponsorship Badge',
      'Certificate of Sponsorship',
      'Feature in Newsletters',
      'Invitation to annual Sponsor\'s Networking Events',
      '60 catalog entries max.',
      '5 industry selections max.',
      'Feature across social platforms',
      'Feature in annual Sponsorship Magazine',
      'Event branding opportunities',
    ],
  },
  {
    name: 'Gold',
    amount: '$100,000 / year',
    color: 'border-amber-500',
    badge: '🥇',
    features: [
      'Webspace Marketing',
      'AfriScience Hub Sponsorship Badge',
      'Certificate of Sponsorship',
      'Feature in Newsletters',
      'Invitation to annual Sponsor\'s Networking Events',
      'Unlimited catalog entries',
      'Unlimited industry selections',
      'Feature across social platforms',
      'Feature in annual Sponsorship Magazine',
      'Event branding opportunities',
      'Logo display on homepage',
      'Talent pipeline partnerships',
      'Technical support partnerships',
      'Champion of African Science & Technology honorary award presentation',
    ],
  },
  {
    name: 'Platinum',
    amount: '$500,000 / year',
    color: 'border-brand-navy-900',
    badge: '💎',
    features: [
      'Webspace Marketing',
      'AfriScience Hub Sponsorship Badge',
      'Certificate of Sponsorship',
      'Feature in Newsletters',
      'Invitation to annual Sponsor\'s Networking Events',
      'Unlimited catalog entries',
      'Unlimited industry selections',
      'Feature across social platforms',
      'Feature in annual Sponsorship Magazine',
      'Event branding opportunities',
      'Logo display on homepage',
      'Talent pipeline Access',
      'Technical support Access',
      'Innovation Access',
      'Champion of African Science & Technology honorary award presentation',
      'Custom research collaborations',
      'Award ceremony naming rights',
      'Analytics Access',
      'VIP access to all AfriScience Hub events',
    ],
  },
];

const WHY_SPONSOR = [
  { emoji: '🌍', title: 'Continental Reach', desc: 'Access a network spanning across 54 African countries and growing.' },
  { emoji: '📈', title: 'Brand Visibility', desc: 'Get your logo and brand featured across our platform, events and annual publications.' },
  { emoji: '🤝', title: 'Talent Pipeline', desc: 'Connect with top scientists, technologists, institutions, researchers, specialists and innovators for collaborations.' },
  { emoji: '💡', title: 'Innovation Access', desc: 'Get early and premium access to groundbreaking African innovations and research.' },
  { emoji: '📊', title: 'Technical Support', desc: 'Get tailored support from AfriScience Hub in handling some technical demands of your business or organization.' },
  { emoji: '🏆', title: 'Recognition', desc: 'Be recognized as a "Champion of African Science & Technology" at our annual awards.' },
];

export default function Sponsor() {
  const { user } = useAuth();
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
              Partner with us to drive Africa&apos;s advancement in science and technology. Your sponsorship directly supports our programs and helps us expand our footprint across the African continent &amp; beyond.
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
          <h2 className="text-3xl font-bold text-neutral-black mb-2">Why Sponsor AfriScience Hub?</h2>
          <p className="text-slate-500 max-w-xl mx-auto">Align your brand with the biggest science and technology network in Africa.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_SPONSOR.map((item, idx) => (
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
          <h2 className="text-3xl font-bold text-neutral-black mb-2">Sponsorship Tiers</h2>
          <p className="text-slate-500">Choose the sponsorship level that best suits your organization:</p>
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
              <Link href={`/support/sponsor/apply?tier=${tier.name}`}>
                <Button className={`w-full ${tier.popular ? 'bg-brand-red-600 hover:bg-brand-red-700' : 'hover:bg-brand-red-600 hover:text-white hover:border-brand-red-600'}`} variant={tier.popular ? 'default' : 'outline'}>
                  Get Started
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-2xl bg-brand-navy-900 p-8 sm:p-12 flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1 text-white">
            <h2 className="text-2xl font-bold mb-3">Corporate Sponsorship</h2>
            <p className="text-slate-300 mb-6">
              Looking for a custom sponsorship package tailored to your organization&apos;s goals? We work with corporations, foundations, and government agencies to create bespoke partnerships that maximize impact and visibility.
            </p>
<Button size="lg" type="button" className="bg-brand-red-600 hover:bg-brand-red-700" onClick={() => openFeedback({ email: user?.email || '', type: 'Sponsorship and Partnership', section: 'Sponsors' })}>
              Contact Our Partnerships Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
