'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import littleLogo from '../../../assets/littleLogo.png';
import { Button } from '../../components/ui/Button';
import { toast } from 'sonner';

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error('Please enter your email address.');
      return;
    }
    if (!password.trim()) {
      toast.error('Please enter your password.');
      return;
    }

    setLoading(true);
    try {
      // TODO: Replace with actual admin authentication API
      toast.success('Admin login successful!');
      router.push('/admin/dashboard');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f1729] py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-neutral-gray-light">
        <div className="text-center flex flex-col items-center">
          <Link href="/" className="mb-6">
            <Image src={littleLogo.src} alt="AFRISCIENCE HUB" width={0} height={0} sizes="100vw" className="h-12 w-auto" />
          </Link>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-neutral-black">
            Admin Portal
          </h2>
          <p className="mt-2 text-sm text-neutral-gray-dark">
            Sign in to access the admin dashboard.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
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
                  placeholder="admin@afrisciencehub.com"
                />
              </div>
            </div>

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
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="block w-full rounded-md border-neutral-gray-light pl-10 pr-10 focus:border-brand-red-600 focus:ring-brand-red-600 sm:text-sm py-2.5 border"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-gray-medium hover:text-neutral-gray-dark cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-gray-dark">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <Link href="/admin/forgot-password" className="font-medium text-brand-red-600 hover:text-brand-red-700">
                Forgot your password?
              </Link>
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-[#0f1729] hover:bg-[#1a2744] flex items-center justify-center gap-2">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>

        <p className="text-center text-sm text-neutral-gray-dark">
          <Link href="/login" className="font-medium text-brand-red-600 hover:text-brand-red-700">
            Back to user login
          </Link>
        </p>
      </div>
    </div>
  );
}
