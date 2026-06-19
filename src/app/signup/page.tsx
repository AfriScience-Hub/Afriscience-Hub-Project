'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, Phone, User, ArrowRight } from 'lucide-react';
import logoImg from "../../assets/logo.png";
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signup, isAuthenticated } = useAuth();
  const router = useRouter();

  // If already logged in, redirect
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error('Please enter your email address.');
      return;
    }
    if (!password.trim()) {
      toast.error('Please enter a password.');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    signup(fullName, email, phone, password);
    toast.success('Account created successfully! Welcome to AfriScienceHub.');
    router.push('/dashboard');
  };

  const handleGoogleSignup = () => {
    signup('Google User', 'user@gmail.com', '', 'google');
    toast.success('Signed up with Google!');
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-neutral-bg-light py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-neutral-gray-light">
        <div className="text-center flex flex-col items-center">
          <Link href="/" className="mb-6">
            <img src={logoImg.src} alt="AFRISCIENCE HUB" className="h-12 w-auto" />
          </Link>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-neutral-black">
            Create an account
          </h2>
          <p className="mt-2 text-sm text-neutral-gray-dark">
            Join the African science and innovation ecosystem today.
          </p>
        </div>

        <div className="mt-8 space-y-6">
          {/* Social Login */}
          <button
            type="button"
            onClick={handleGoogleSignup}
            className="flex w-full items-center justify-center gap-3 rounded-md border border-neutral-gray-light bg-white px-4 py-2.5 text-sm font-medium text-neutral-gray-dark hover:bg-neutral-bg-light focus:outline-none focus:ring-2 focus:ring-brand-red-600 focus:ring-offset-2 transition-colors"
          >
             <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
              <path d="M12.0003 20.45C16.6493 20.45 20.5504 17.279 21.9698 13.064H12.0003V10.957H23.506C23.6335 11.666 23.7003 12.396 23.7003 13.146C23.7003 19.646 18.4593 24.914 12.0003 24.914C5.33427 24.914 -0.0707016 19.509 -0.0707016 12.843C-0.0707016 6.17697 5.33427 0.771973 12.0003 0.771973C15.1433 0.771973 17.8423 1.87997 19.9304 3.68497L16.8903 6.72497C15.9683 5.86597 14.2883 4.97897 12.0003 4.97897C7.6563 4.97897 4.13527 8.49997 4.13527 12.844C4.13527 17.188 7.6563 20.709 12.0003 20.709Z" fill="#4285F4" />
              <path d="M23.4998 10.957V13.064H11.9998V10.957H23.4998Z" fill="#4285F4" />
              <path d="M5.45982 18.421L4.13482 12.844L5.45982 7.26697C3.99982 9.58797 3.99982 12.523 5.45982 18.421Z" fill="#34A853" />
              <path d="M11.9997 24.914C16.6487 24.914 20.5498 21.743 21.9692 17.528L18.4792 14.896C17.0692 18.24 14.0792 20.709 11.9997 20.709C7.65574 20.709 4.13474 17.188 4.13474 12.844C4.13474 12.736 4.13974 12.631 4.14874 12.526L0.592743 15.319C1.94674 20.914 6.94674 24.914 11.9997 24.914Z" fill="#34A853" />
              <path d="M21.9693 8.16103L18.4793 10.793C17.0693 7.44903 14.0793 4.98003 11.9998 4.98003C9.71175 4.98003 8.03175 5.86703 7.10975 6.72603L4.06975 3.68603C6.15775 1.88103 8.85675 0.773026 11.9998 0.773026C17.0528 0.773026 22.0528 4.77303 23.4068 10.368L21.9693 8.16103Z" fill="#EA4335" />
            </svg>
            Sign up with Google
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-gray-light" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-neutral-gray-medium">Or sign up with</span>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-neutral-black">
                Full Name
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-5 w-5 text-neutral-gray-medium" />
                </div>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="block w-full rounded-md border-neutral-gray-light pl-10 focus:border-brand-red-600 focus:ring-brand-red-600 sm:text-sm py-2.5 border"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-black">
                Email Address
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-neutral-gray-medium" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="block w-full rounded-md border-neutral-gray-light pl-10 focus:border-brand-red-600 focus:ring-brand-red-600 sm:text-sm py-2.5 border"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-neutral-black">
                Phone Number
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Phone className="h-5 w-5 text-neutral-gray-medium" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="block w-full rounded-md border-neutral-gray-light pl-10 focus:border-brand-red-600 focus:ring-brand-red-600 sm:text-sm py-2.5 border"
                  placeholder="+254 700 000 000"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-black">
                Password
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-neutral-gray-medium" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="block w-full rounded-md border-neutral-gray-light pl-10 pr-10 focus:border-brand-red-600 focus:ring-brand-red-600 sm:text-sm py-2.5 border"
                  placeholder="Enter anything"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-gray-medium hover:text-neutral-gray-dark"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-neutral-black">
                Confirm Password
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-neutral-gray-medium" />
                </div>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="block w-full rounded-md border-neutral-gray-light pl-10 pr-10 focus:border-brand-red-600 focus:ring-brand-red-600 sm:text-sm py-2.5 border"
                  placeholder="Re-enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-gray-medium hover:text-neutral-gray-dark"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full flex items-center justify-center gap-2 bg-brand-navy-900 hover:bg-brand-navy-800">
              Sign Up <ArrowRight className="h-4 w-4" />
            </Button>
            
            <p className="text-xs text-center text-neutral-gray-medium mt-4">
              By clicking "Sign Up", you agree to our <Link href="/terms" className="underline hover:text-brand-red-600">Terms of Service</Link> and <Link href="/privacy" className="underline hover:text-brand-red-600">Privacy Policy</Link>.
            </p>
          </form>

          <p className="text-center text-sm text-neutral-gray-dark">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-brand-red-600 hover:text-brand-red-700">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}