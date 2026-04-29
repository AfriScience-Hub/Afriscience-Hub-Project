'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, Mail, Lock, Phone } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import Header from '../components/header';
import Footer from '../components/footer';
import SearchModal from '../components/search';

export default function LoginPage() {
  const [usePhone, setUsePhone] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  
    const handleSearchOpen = () => setSearchOpen(true);

  return (
    <main >
        <Header onSearchOpen={handleSearchOpen}/>
      <div className="min-h-screen bg-[#f5f7fb] px-4 py-3 sm:px-6 sm:py-6">          
        <section className="mx-auto flex min-h-[calc(100vh-1.5rem)] max-w-110 items-center justify-center~">
          <div className="w-full rounded-[25px] border border-[#d9e0ea] bg-white px-9 py-12 shadow-md">
            <div className="flex justify-center">
              <Image
                src="/logo.png"
                alt="AfriScience Hub"
                width={132}
                height={36}
                className="h-auto w-33"
                priority
              />
            </div>

            <div className="mt-5 text-center">
            <h1 className="text-[25px] font-bold tracking-tight text-[#1c2434]">
                Welcome back
              </h1>
              <p className="mx-auto mt-4 max-w-105 text-[17px] leading-8 text-[#5a6578]">
                Sign in to access your dashboard and connect with the ecosystem.
              </p>
            </div>

            <button
              type="button"
              className="mt-8 flex h-13 w-full items-center justify-center gap-4 rounded-[10px] border border-[#d8dee8] bg-white text-[16px] cursor-pointer font-semibold text-[#525f73]"
            >
              <FcGoogle className="h-7 w-7" />
              Continue with Google
            </button>

            <div className="mt-8 flex items-center gap-4 text-[#a0aabc]">
              <div className="h-px flex-1 bg-[#d8dee8]" />
              <span className="text-sm">Or continue with</span>
              <div className="h-px flex-1 bg-[#d8dee8]" />
            </div>

            <div className="mt-10">
              <div className="flex items-center justify-between gap-4">
                <label className="text-xs lg:text-md font-semibold text-[#202938]">
                  {usePhone ? 'Phone Number' : 'Email Address'}
                </label>
                <button
                  type="button"
                  onClick={() => setUsePhone((current) => !current)}
                  className="text-xs cursor-pointer font-semibold text-[#ff3a34] leading-tight"
                >
                  {usePhone ? 'Use Email instead' : 'Use Phone instead'}
                </button>
              </div>

              <div className="mt-3 flex h-12.5 items-center gap-3 rounded-[10px] border border-[#d8dee8] px-4">
                {usePhone ? (
                  <Phone className="h-5 w-5 text-[#98a2b3]" strokeWidth={2} />
                ) : (
                  <Mail className="h-5 w-5 text-[#98a2b3]" strokeWidth={2} />
                )}
                <input
                  type={usePhone ? 'tel' : 'email'}
                  placeholder={usePhone ? '+254 700 000 000' : 'you@example.com'}
                  className="h-full flex-1 border-0 bg-transparent text-[16px] text-[#1f2937] placeholder:text-[#98a2b3] outline-none"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="text-xs lg:text-md font-semibold text-[#202938]">Password</label>
              <div className="mt-3 flex h-12.5 items-center gap-3 rounded-[10px] border border-[#d8dee8] px-4">
                <Lock className="h-5 w-5 text-[#98a2b3]" strokeWidth={2} />
                <input
                  type="password"
                  placeholder="Enter anything"
                  className="h-full flex-1 border-0 bg-transparent text-[16px] text-[#1f2937] placeholder:text-[#98a2b3] outline-none"
                />
                <button type="button" className="text-[#98a2b3]">
                </button>
              </div>
            </div>

            <div className="mt-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <label className="flex items-center gap-3 text-[15px] font-semibold text-[#566275]">
                <input type="checkbox" className="h-4 w-4 rounded-[3px] accent-[#3d3d3d]" />
                Remember me
              </label>

              <Link href="#" className="text-xs font-semibold text-[#ff3a34]">
                Forgot your password?
              </Link>
            </div>

            <button
              type="button"
              className="mt-8 h-12 w-full rounded-lg bg-[#0b2342] text-[18px] font-semibold text-white shadow-none transition hover:bg-[#14345f] cursor-pointer"
            >
              Sign in
            </button>

            <p className="mt-8 text-center text-xs text-[#5c6678]">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="font-semibold text-[#ff3a34] text-sm">
                Sign up
              </Link>
            </p>
          </div>
        </section>
      </div>
        <Footer />

         {/* Search Modal */}
          <SearchModal 
            isOpen={searchOpen} 
            onClose={() => setSearchOpen(false)} 
          />
    </main>
  );
}
