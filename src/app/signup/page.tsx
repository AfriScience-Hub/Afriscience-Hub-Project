'use client';

import { useState, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Eye, Lock, Mail, Phone, User } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import Header from '../components/header';
import Footer from '../components/footer';
import SearchModal from '../components/search';

export default function SignupPage() {
  const [searchOpen, setSearchOpen] = useState(false);
  
    const handleSearchOpen = () => setSearchOpen(true);
    
  return (
    <main className="">
      <Header onSearchOpen={handleSearchOpen}/>
      <div className='min-h-screen bg-[#f5f7fb] px-4 py-3 mt-10'>
        <section className="mx-auto flex min-h-[calc(100vh-1.5rem)] max-w-110 items-center justify-center">
          <div className="w-full rounded-3xl border border-[#d9e0ea] bg-white px-8 py-10 shadow-[0_2px_10px_rgba(15,23,42,0.06)] sm:px-9 sm:py-11">
            <div className="flex justify-center">
              <Image
                src="/logo.png"
                alt="AfriScience Hub"
                width={124}
                height={34}
                className="h-auto w-36"
                priority
              />
            </div>

            <div className="mt-5 text-center">
            <h1 className="text-[25px] font-bold tracking-tight text-[#1c2434]">
                Create an account
              </h1>
              <p className="mx-auto mt-3 max-w-90 text-[15px] leading-7 text-[#5a6578] sm:text-[16px]">
                Join the African science and innovation ecosystem today.
              </p>
            </div>

            <button
              type="button"
              className="mt-9 flex h-11 w-full items-center justify-center gap-3 cursor-pointer rounded-lg border border-[#d8dee8] bg-white text-[15px] font-semibold text-[#525f73]"
            >
              <FcGoogle className="h-6 w-6" />
              Sign up with Google
            </button>

            <div className="mt-8 flex items-center gap-3 text-[#a0aabc]">
              <div className="h-px flex-1 bg-[#d8dee8]" />
              <span className="text-[14px]">Or sign up with</span>
              <div className="h-px flex-1 bg-[#d8dee8]" />
            </div>

            <div className="mt-8 space-y-5">
              <Field label="Full Name" icon={<User className="h-5 w-5 text-[#98a2b3]" strokeWidth={2} />}>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="h-full flex-1 border-0 bg-transparent text-[15px] text-[#1f2937] placeholder:text-[#98a2b3] outline-none"
                />
              </Field>

              <Field label="Email Address" icon={<Mail className="h-5 w-5 text-[#98a2b3]" strokeWidth={2} />}>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="h-full flex-1 border-0 bg-transparent text-[15px] text-[#1f2937] placeholder:text-[#98a2b3] outline-none"
                />
              </Field>

              <Field label="Phone Number" icon={<Phone className="h-5 w-5 text-[#98a2b3]" strokeWidth={2} />}>
                <input
                  type="tel"
                  placeholder="+254 700 000 000"
                  className="h-full flex-1 border-0 bg-transparent text-[15px] text-[#1f2937] placeholder:text-[#98a2b3] outline-none"
                />
              </Field>

              <Field
                label="Password"
                icon={<Lock className="h-5 w-5 text-[#98a2b3]" strokeWidth={2} />}
              >
                <input
                  type="password"
                  placeholder="Enter anything"
                  className="h-full flex-1 border-0 bg-transparent text-[15px] text-[#1f2937] placeholder:text-[#98a2b3] outline-none"
                />
              </Field>

              <Field
                label="Confirm Password"
                icon={<Lock className="h-5 w-5 text-[#98a2b3]" strokeWidth={2} />}
              >
                <input
                  type="password"
                  placeholder="Re-enter password"
                  className="h-full flex-1 border-0 bg-transparent text-[15px] text-[#1f2937] placeholder:text-[#98a2b3] outline-none"
                />
              </Field>
            </div>

            <button
              type="button"
              className="mt-6 flex h-12 w-full items-center justify-center gap-2 cursor-pointer rounded-lg bg-[#0b2342] text-[16px] font-semibold text-white transition hover:bg-[#14345f]"
            >
              Sign Up
              <ArrowRight className="h-4 w-4" />
            </button>

            <p className="mx-auto mt-5 max-w-82.5 text-center text-xs leading-5 text-[#98a2b3]">
              By clicking &quot;Sign Up&quot;, you agree to our{' '}
              <Link href="/terms" className="underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="underline">
                Privacy Policy.
              </Link>
            </p>

            <p className="mt-5 text-center text-xs text-[#5c6678]">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-[#ff3a34] text-sm">
                Log in
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

function Field({
  label,
  icon,
  children,
  endAdornment,
}: {
  label: string;
  icon: ReactNode;
  children: ReactNode;
  endAdornment?: ReactNode;
}) {
  return (
    <div>
      <label className="text-[15px] font-semibold text-[#202938]">{label}</label>
      <div className="mt-3 flex h-10.5 items-center gap-3 rounded-lg border border-[#d8dee8] px-4">
        {icon}
        {children}
        {endAdornment}
      </div>
    </div>
  );
}
