'use client';

import Link from 'next/link';
import { ArrowRight, HandCoins } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

interface DonateHeroProps {
  onDonate: () => void;
}

export function DonateHero({ onDonate }: DonateHeroProps) {
  return (
    <section className="relative bg-brand-navy-900 py-20 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1727698947585-3e6703525958?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwY2hhcml0eSUyMGRvbmF0aW9uJTIwaGFuZHMlMjBnaXZpbmd8ZW58MXx8fHwxNzcyODY5MDQ3fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Donate"
          className="h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy-900/60 to-brand-navy-900" />
      </div>
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/support" className="inline-flex items-center gap-1 text-slate-400 hover:text-white text-sm mb-6 transition-colors">
          <ArrowRight className="h-3 w-3 rotate-180" /> Back to Support
        </Link>
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <HandCoins className="h-4 w-4" />
            Donations
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Donate
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed mb-8">
            Your donations help us achieve our set commonly service goals across the African
            continent. We intend addressing important developmental and humanitarian programs
            with donation funds, and we deeply appreciate/recognize your support towards our
            vision to propel the continent to greater heights.
          </p>
          <Button
            size="lg"
            onClick={onDonate}
            className="h-12 px-8 bg-brand-red-600 hover:bg-brand-red-700 text-base"
          >
            Donate to AfriScience Hub Today!
          </Button>
        </div>
      </div>
    </section>
  );
}
