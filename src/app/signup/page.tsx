'use client';

import { useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Lock, Mail, Phone, User } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import Header from '../components/header';
import Footer from '../components/footer';
import SearchModal from '../components/search';

export default function SignupPage() {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleSearchOpen = () => setSearchOpen(true);

  const handleSignUp = async () => {
    setError('');
    setLoading(true);

    try {
      // Validation
      if (!fullName.trim() || !email.trim() || !phone.trim() || !password.trim() || !confirmPassword.trim()) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }

      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }

      // Store user info in localStorage
      localStorage.setItem('userLogin', 'true');
      localStorage.setItem('userName', fullName);
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userPhone', phone);

      // Redirect to dashboard
      router.push('/dashboard/overview');
    } catch (err) {
      setError('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
    
  return (
    <main className="">
      <Header onSearchOpen={handleSearchOpen}/>
      <div className='min-h-screen bg-[#f5f7fb] px-4 pb-10 pt-20'>
        <section className="mx-auto flex min-h-[calc(100vh-1.5rem)] max-w-110 items-center justify-center">
          <div className="w-full rounded-3xl border border-[#d9e0ea] bg-white px-4 lg:px-8 py-10 shadow-md">
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
            <h1 className="text-md lg:text-[25px] font-bold tracking-tight text-[#1c2434]">
                Create an account
              </h1>
              <p className="mx-auto max-w-90 text-sm lg:text-[15px] lg:leading-7 text-[#5a6578]">
                Join the African science and innovation ecosystem today.
              </p>
            </div>

            <button
              type="button"
              className="mt-9 flex h-11 w-full items-center justify-center gap-3 cursor-pointer rounded-lg border border-[#d8dee8] bg-white text-[15px] font-semibold text-[#525f73]"
            >
              <FcGoogle className="h-6 w-6" />
              <span className="hidden md:flex">Sign up with Google</span>
            </button>

            <div className="mt-4 lg:mt-8 flex items-center gap-3 text-[#a0aabc]">
              <div className="h-px flex-1 bg-[#d8dee8]" />
              <span className="text-[14px]">Or sign up with</span>
              <div className="h-px flex-1 bg-[#d8dee8]" />
            </div>

            <div className="mt-4 lg:mt-8 space-y-5">
              <Field label="Full Name" icon={<User className="h-4 lg:h-5 w-4 lg:w-5 text-[#98a2b3]" strokeWidth={2} />}>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-full flex-1 border-0 bg-transparent text-xs lg:text-[15px] text-[#1f2937] placeholder:text-[#98a2b3] outline-none"
                />
              </Field>

              <Field label="Email Address" icon={<Mail className="h-4 lg:h-5 w-4 lg:w-5 text-[#98a2b3]" strokeWidth={2} />}>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-full flex-1 border-0 bg-transparent text-xs lg:text-[15px] text-[#1f2937] placeholder:text-[#98a2b3] outline-none"
                />
              </Field>

              <Field label="Phone Number" icon={<Phone className="h-4 lg:h-5 w-4 lg:w-5 text-[#98a2b3]" strokeWidth={2} />}>
                <input
                  type="tel"
                  placeholder="+254 700 000 000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-full flex-1 border-0 bg-transparent text-xs lg:text-[15px] text-[#1f2937] placeholder:text-[#98a2b3] outline-none"
                />
              </Field>

              <Field
                label="Password"
                icon={<Lock className="h-4 w-4 lg:h-5 lg:w-5 text-[#98a2b3]" strokeWidth={2} />}
              >
                <input
                  type="password"
                  placeholder="Enter anything"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-full flex-1 border-0 bg-transparent text-xs lg:text-[15px] text-[#1f2937] placeholder:text-[#98a2b3] outline-none"
                />
              </Field>

              <Field
                label="Confirm Password"
                icon={<Lock className="h-4 w-4 lg:h-5 lg:w-5 text-[#98a2b3]" strokeWidth={2} />}
              >
                <input
                  type="password"
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-full flex-1 border-0 bg-transparent text-xs lg:text-[15px] text-[#1f2937] placeholder:text-[#98a2b3] outline-none"
                />
              </Field>
            </div>

            <button
              type="button"
              onClick={handleSignUp}
              disabled={loading}
              className="mt-6 flex h-10 lg:h-12 w-full items-center justify-center gap-2 cursor-pointer rounded-lg bg-[#0b2342] text-sm lg:text-[16px] font-semibold text-white transition hover:bg-[#14345f] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing up...' : 'Sign Up'}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </button>

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

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
