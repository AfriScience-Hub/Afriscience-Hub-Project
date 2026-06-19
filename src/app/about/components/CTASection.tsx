import { Mail, Users } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/app/components/ui/Button';

export default function CTASection() {
  return (
    <div className="relative bg-brand-navy-800">
      <div className="relative h-80 overflow-hidden md:absolute md:left-0 md:h-full md:w-1/3 lg:w-1/2">
        <img
          className="h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1657394404815-6e8d8b164edf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsYWJvcmF0b3J5JTIwbWljcm9zY29wZSUyMHJlc2VhcmNofGVufDF8fHx8MTc3MDc2Nzk3M3ww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Laboratory"
        />
        <div className="absolute inset-0 bg-brand-navy-800/60 mix-blend-multiply" />
      </div>
      <div className="relative mx-auto max-w-7xl py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="pl-6 pr-6 md:ml-auto md:w-2/3 md:pl-16 lg:w-1/2 lg:pl-24 lg:pr-0 xl:pl-32">
          <h2 className="text-base font-semibold leading-7 text-brand-red-600">Join the Ecosystem</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready for a Limitless experience in Science and Technology?
          </p>
          <p className="mt-6 text-base leading-7 text-neutral-gray-light">
            Join us now to connect, innovate, and grow with the AfriScience Hub ecosystem.
          </p>
          <div className="mt-8 flex flex-col gap-4 text-white">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold">Email</div>
                <div className="text-sm text-neutral-gray-light">contact@afrisciencehub.com</div>
                <div className="text-sm text-neutral-gray-light">support@afrisciencehub.com</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold">Phone</div>
                <div className="text-sm text-neutral-gray-light">+2349160003305, +2349160003306</div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-brand-navy-900 hover:bg-neutral-gray-light">
                Join Us Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
