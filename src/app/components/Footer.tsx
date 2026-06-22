'use client';

import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { Linkedin, Facebook, Twitter, Youtube, Instagram } from 'lucide-react';
import footerLogoSrc from "../../assets/littleLogo.png";
import { Button } from './ui/Button';

export function Footer() {
  return (
    <footer className="bg-brand-navy-900 text-slate-200 relative overflow-hidden">
      {/* Creative Background Text - AFRISCIENCE HUB in dotted outline */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="text-[7rem] sm:text-[10rem] lg:text-[14rem] xl:text-[18rem] font-black select-none whitespace-nowrap"
          style={{
            color: 'transparent',
            letterSpacing: '0.02em',
            opacity: 0.08,
            textShadow: `
                0 0 0 rgba(226, 232, 240, 0.06),
                1px 1px 0 rgba(226, 232, 240, 0.04),
                2px 2px 0 rgba(226, 232, 240, 0.03),
                3px 3px 0 rgba(226, 232, 240, 0.02)
              `,
            WebkitTextStroke: '1.5px rgba(226, 232, 240, 0.08)',
            filter: 'blur(0.2px)',
          }}
        >
          AFRISCIENCE HUB
        </div>
        {/* Dotted overlay pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
                repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 5px,
                  rgba(226, 232, 240, 0.03) 5px,
                  rgba(226, 232, 240, 0.03) 6px
                ),
                repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 5px,
                  rgba(226, 232, 240, 0.03) 5px,
                  rgba(226, 232, 240, 0.03) 6px
                )
              `,
            mixBlendMode: 'overlay',
            pointerEvents: 'none',
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="bg-white p-2.5 rounded-xl shadow-sm">
                <Image src={footerLogoSrc.src} alt="AFRISCIENCE HUB" width={0} height={0} sizes="100vw" className="h-14 w-auto" />
              </div>
            </div>
            <p className="text-sm text-slate-400">
              Connecting Institutes, Scientists/Technologists, Laboratories, Specialists, Innovators and Sponsors across the African continent.
            </p>

            {/* Social Media Handles */}
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-slate-400 hover:text-brand-red-600 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-brand-red-600 transition-colors">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-brand-red-600 transition-colors">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-brand-red-600 transition-colors">
                <span className="sr-only">YouTube</span>
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-brand-red-600 transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-brand-red-600">About Us</Link></li>
              <li><Link href="/institutes" className="hover:text-brand-red-600">Institutes</Link></li>
              <li><Link href="/scientists" className="hover:text-brand-red-600">Scientists & Technologists</Link></li>
              <li><Link href="/specialist-centers" className="hover:text-brand-red-600">Specialist Centers</Link></li>
              <li><Link href="/innovations" className="hover:text-brand-red-600">Afro-Innovations</Link></li>
              <li><Link href="/competitions" className="hover:text-brand-red-600">Competitions</Link></li>
              <li><Link href="/awards" className="hover:text-brand-red-600">Awards</Link></li>
              <li><Link href="/voting" className="hover:text-brand-red-600">Voting</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Support
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/faq" className="hover:text-brand-red-600">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-brand-red-600">Contact Us</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-brand-red-600">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-brand-red-600">Terms of Service</Link></li>
              <li><Link href="/cookie-policy" className="hover:text-brand-red-600">Cookie Policy</Link></li>
            </ul>
          </div>

          {/* Support AfriScienceHub */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Support AfriScienceHub
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/support/sponsor" className="hover:text-brand-red-600">Sponsor AfriScienceHub</Link></li>
              <li><Link href="/support/donate" className="hover:text-brand-red-600">Donate to Projects</Link></li>
              <li><Link href="/impact" className="hover:text-brand-red-600">Impact Stories</Link></li>
              <li><Link href="/support/volunteer" className="hover:text-brand-red-600">Become a Volunteer</Link></li>
              <li><Link href="/support" className="hover:text-brand-red-600">Partnership Opportunities</Link></li>
            </ul>
          </div>

          {/* Subscribe */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Stay Updated
            </h3>
            <p className="mb-4 text-sm text-slate-400">
              Subscribe to our newsletter for the latest African innovations.
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-md border border-brand-navy-700 bg-brand-navy-800 px-3 py-2 text-sm text-white placeholder-slate-400 focus:border-brand-red-600 focus:outline-none"
              />
              <Button size="sm">Subscribe</Button>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-brand-navy-800 pt-8 text-center text-xs text-slate-500">
          &copy; 2024 AfriScience Hub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}