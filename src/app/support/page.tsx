'use client';

import Link from 'next/link';
import { Heart, HandCoins, Users, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';

const SUPPORT_OPTIONS = [
  {
    title: 'Sponsor AfriScienceHub',
    description: 'Support the overall mission and development of the platform. Your sponsorship helps sustain operations, expand reach, and create new opportunities for African scientists and innovators.',
    icon: Sparkles,
    path: '/support/sponsor',
    color: 'bg-amber-50 border-amber-200 hover:border-amber-400',
    iconColor: 'text-amber-600 bg-amber-100',
    image: 'https://images.unsplash.com/photo-1712903276864-79723b184ffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBzcG9uc29yc2hpcCUyMGV2ZW50JTIwc3RhZ2V8ZW58MXx8fHwxNzcyODY5MDQ3fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'Donate to Projects',
    description: 'Support specific initiatives such as competitions, innovation development, research grants, student programs, and community awards across the African continent.',
    icon: HandCoins,
    path: '/support/donate',
    color: 'bg-emerald-50 border-emerald-200 hover:border-emerald-400',
    iconColor: 'text-emerald-600 bg-emerald-100',
    image: 'https://images.unsplash.com/photo-1727698947585-3e6703525958?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwY2hhcml0eSUyMGRvbmF0aW9uJTIwaGFuZHMlMjBnaXZpbmd8ZW58MXx8fHwxNzcyODY5MDQ3fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'Become a Volunteer',
    description: 'Contribute your time, knowledge, or expertise to help grow the ecosystem. Volunteer as a competition judge, research mentor, event coordinator, or platform moderator.',
    icon: Users,
    path: '/support/volunteer',
    color: 'bg-blue-50 border-blue-200 hover:border-blue-400',
    iconColor: 'text-blue-600 bg-blue-100',
    image: 'https://images.unsplash.com/photo-1744234233590-2d00b3c87444?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwdm9sdW50ZWVycyUyMHRlYW0lMjBjb21tdW5pdHklMjB3b3JrfGVufDF8fHx8MTc3Mjg2OTA0OHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export default function SupportHub() {
  return (
    <div className="pb-16">
      <section className="relative bg-brand-navy-900 py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1610322258696-99a76246b767?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwY29tbXVuaXR5JTIwcGFydG5lcnNoaXAlMjBoYW5kc2hha2V8ZW58MXx8fHwxNzcyODY5MDQ3fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Support"
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy-900/60 to-brand-navy-900" />
        </div>
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-red-600/20 text-brand-red-600 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <Heart className="h-4 w-4" />
            Make a Difference
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Support AfriScienceHub
          </h1>
          <p className="max-w-2xl mx-auto text-slate-300 text-lg">
            Help us build the largest science and innovation ecosystem in Africa. Every contribution brings us closer to empowering the next generation of African scientists and innovators.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="grid gap-8 md:grid-cols-3">
          {SUPPORT_OPTIONS.map((option) => (
            <Link
              key={option.title}
              href={option.path}
              className={`group rounded-2xl border-2 bg-white shadow-sm overflow-hidden transition-all hover:shadow-lg ${option.color}`}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={option.image}
                  alt={option.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className={`inline-flex items-center justify-center h-12 w-12 rounded-xl ${option.iconColor} mb-4`}>
                  <option.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-neutral-black mb-2">{option.title}</h3>
                <p className="text-sm text-slate-500 mb-6">{option.description}</p>
                <div className="flex items-center gap-2 text-brand-red-600 font-semibold text-sm group-hover:gap-3 transition-all">
                  Learn More <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-neutral-black mb-2">Why Support AfriScienceHub?</h2>
          <p className="text-slate-500 max-w-xl mx-auto">Your support directly impacts the growth of science and innovation across the African continent.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { stat: '54', label: 'African Countries Reached', icon: '🌍' },
            { stat: '3,000+', label: 'Scientists Connected', icon: '🔬' },
            { stat: '850+', label: 'Innovations Showcased', icon: '💡' },
            { stat: '120+', label: 'Awards Given', icon: '🏆' },
          ].map((item, idx) => (
            <div key={idx} className="text-center p-6 rounded-xl bg-neutral-bg-light">
              <div className="text-3xl mb-2">{item.icon}</div>
              <div className="text-3xl font-extrabold text-brand-navy-900">{item.stat}</div>
              <p className="text-sm text-slate-500 mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-brand-navy-900 to-brand-red-600 p-8 sm:p-16 text-center text-white">
          <h2 className="mb-4 text-3xl font-bold">Together, We Can Transform African Science</h2>
          <p className="mx-auto mb-8 max-w-2xl text-slate-200">
            Whether through sponsorship, donations, or volunteering, your contribution makes a lasting impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/support/sponsor">
              <Button size="lg" className="bg-white text-brand-red-600 hover:bg-neutral-bg-light">
                Become a Sponsor
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
