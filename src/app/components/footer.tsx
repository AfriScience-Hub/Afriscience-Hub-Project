'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaLinkedin, FaFacebook, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-linear-to-b from-slate-900 to-slate-950 text-gray-300 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo and Description Section */}
          <div className="lg:col-span-1">
            <div className="mb-6 bg-white p-4 rounded-lg w-max">
              <Image
                src="/miniLogo.png"
                alt="AfriScience Hub"
                width={40}
                height={40}
                className="h-20 w-auto"
              />
            </div>
            <p className="text-sm leading-relaxed text-gray-400 mb-6">
              Connecting Institutes, Scientists/Technologists, Laboratories, Specialists, Innovators and Sponsors across the African continent.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex gap-4">
              <Link href="#" className="text-gray-400 hover:text-red-600 transition-colors text-xl">
                <FaLinkedin />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-red-600 transition-colors text-xl">
                <FaFacebook />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-red-600 transition-colors text-xl">
                <FaTwitter />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-red-600 transition-colors text-xl">
                <FaYoutube />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-red-600 transition-colors text-xl">
                <FaInstagram />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-red-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/institutions" className="text-gray-400 hover:text-red-600 transition-colors">
                  Institutes
                </Link>
              </li>
              <li>
                <Link href="/scientists" className="text-gray-400 hover:text-red-600 transition-colors">
                  Scientists & Technologists
                </Link>
              </li>
              <li>
                <Link href="/centers" className="text-gray-400 hover:text-red-600 transition-colors">
                  Specialist Centers
                </Link>
              </li>
              <li>
                <Link href="/innovations" className="text-gray-400 hover:text-red-600 transition-colors">
                  Afro-Innovations
                </Link>
              </li>
              <li>
                <Link href="/competitions" className="text-gray-400 hover:text-red-600 transition-colors">
                  Competitions
                </Link>
              </li>
              <li>
                <Link href="/awards" className="text-gray-400 hover:text-red-600 transition-colors">
                  Awards
                </Link>
              </li>
              <li>
                <Link href="/voting" className="text-gray-400 hover:text-red-600 transition-colors">
                  Voting
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Support</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-red-600 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-red-600 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-red-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-red-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-gray-400 hover:text-red-600 transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Support AfriScienceHub */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Support AfriScienceHub</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/support/sponsor" className="text-gray-400 hover:text-red-600 transition-colors">
                  Sponsor AfriScienceHub
                </Link>
              </li>
              <li>
                <Link href="/support/donate" className="text-gray-400 hover:text-red-600 transition-colors">
                  Donate to Projects
                </Link>
              </li>
              <li>
                <Link href="/impact" className="text-gray-400 hover:text-red-600 transition-colors">
                  Impact Stories
                </Link>
              </li>
              <li>
                <Link href="/support/volunteer" className="text-gray-400 hover:text-red-600 transition-colors">
                  Become a Volunteer
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-400 hover:text-red-600 transition-colors">
                  Partnership Opportunities
                </Link>
              </li>
            </ul>
          </div>

          {/* Stay Updated */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for the latest African innovations.
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-red-600"
              />
              <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-lg transition-colors text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 my-8"></div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm">
          © 2026 AfriScience Hub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
