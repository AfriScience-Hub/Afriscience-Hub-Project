'use client';

import { Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Join() {
  return (
    <section className="w-full overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-[80vh]">
        {/* Left Side - Background Image */}
        <div className="w-full lg:w-1/2 h-80 lg:h-auto relative">
          <Image
            src="https://images.unsplash.com/photo-1657394404815-6e8d8b164edf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsYWJvcmF0b3J5JTIwbWljcm9zY29wZSUyMHJlc2VhcmNofGVufDF8fHx8MTc3MDc2Nzk3M3ww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Join Us"
            fill
            className="object-cover object-center"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Right Side - Content */}
        <div className="w-full lg:w-1/2 bg-[#0C2A4D] flex flex-col justify-center px-8 lg:px-20 py-16">
          <div className="max-w-4xl">
            {/* Label */}
            <p className="text-red-700 font-semibold text-md tracking-widest mb-4">
              Join the Ecosystem
            </p>

            {/* Heading */}
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-8">
              Ready for a Limitless experience in Science and Technology?
            </h2>

            {/* Description */}
            <p className="text-blue-100 text-md mb-12">
              Join us now to connect, innovate, and grow with the AfriScience Hub ecosystem.
            </p>

            {/* Contact Information */}
            <div className="space-y-6 mb-12">
              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="shrink-0 p-3 bg-white/10 rounded-lg">
                  <Mail size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-white mb-1">Email</p>
                  <p className="text-blue-100 text-sm">contact@afrisciencehub.com</p>
                  <p className="text-blue-100 text-sm">support@afrisciencehub.com</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4">
                <div className="shrink-0 p-3 bg-white/10 rounded-lg">
                  <Phone size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-white mb-1">Phone</p>
                  <p className="text-blue-100 text-sm">+2349160003305, +2349160003306</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              href="/signup"
              className="inline-block px-6 py-3 bg-white text-blue-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Join Us Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
