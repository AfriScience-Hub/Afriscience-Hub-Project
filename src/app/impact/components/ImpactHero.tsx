import Link from 'next/link';
import Image from 'next/image';
import { Users } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';

export default function ImpactHero() {
  return (
    <section className="relative bg-brand-navy-900 py-20 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://placehold.co/1600x900/0f172a/94a3b8/png?text=Impact"
          alt="Impact"
          fill
          className="object-cover opacity-20"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy-900/60 to-brand-navy-900" />
      </div>
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <Users className="h-4 w-4" />
            Enlightenment Programs
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Impact
          </h1>
          <p className="text-slate-300 text-lg max-w-3xl mb-8">
            Explore how your donations have been used to create meaningful impact in individuals and
            communities across the African continent through our enlightenment programs. “Apply for
            Aid” to receive impact-funding for programs eligible for.
          </p>
          <Link href="/impact/apply">
            <Button size="lg" className="bg-brand-red-600 hover:bg-brand-red-700 h-12 px-8">
              Apply for Aid
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
