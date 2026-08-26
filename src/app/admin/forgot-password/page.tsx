'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import littleLogo from '../../../assets/littleLogo.png';
import { Button } from '../../components/ui/Button';
import { toast } from 'sonner';

export default function AdminForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error('Please enter your email address.');
      return;
    }

    setLoading(true);
    try {
      // TODO: Replace with actual password reset API
      setSent(true);
      toast.success('Password reset link sent to your email.');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to send reset link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0f1729] py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-neutral-gray-light text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
          <h2 className="text-2xl font-bold text-neutral-black">Check your email</h2>
          <p className="text-sm text-neutral-gray-dark">
            We&apos;ve sent a password reset link to <span className="font-medium text-neutral-black">{email}</span>.
            Please check your inbox and follow the instructions.
          </p>
          <div className="pt-4">
            <Link href="/admin/login" className="font-medium text-brand-red-600 hover:text-brand-red-700 text-sm">
              Back to login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f1729] py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-neutral-gray-light">
        <div className="text-center flex flex-col items-center">
          <Link href="/" className="mb-6">
            <Image src={littleLogo.src} alt="AFRISCIENCE HUB" width={0} height={0} sizes="100vw" className="h-12 w-auto" />
          </Link>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-neutral-black">
            Reset your password
          </h2>
          <p className="mt-2 text-sm text-neutral-gray-dark">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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

          <Button type="submit" disabled={loading} className="w-full bg-[#0f1729] hover:bg-[#1a2744] flex items-center justify-center gap-2">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {loading ? 'Sending...' : 'Send reset link'}
          </Button>
        </form>

        <div className="text-center">
          <Link href="/admin/login" className="inline-flex items-center gap-2 text-sm font-medium text-brand-red-600 hover:text-brand-red-700">
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
