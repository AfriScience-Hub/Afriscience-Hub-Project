'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { OTPInput, REGEXP_ONLY_DIGITS } from 'input-otp';
import logoImg from "../../assets/logo.png";
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

function VerifyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const { verifyEmail, isAuthenticated } = useAuth();

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (!email) {
      router.replace('/signup');
    }
  }, [email, router]);

  if (isAuthenticated || !email) {
    return null;
  }

  const handleVerify = async () => {
    if (otp.length < 6) {
      toast.error('Please enter the complete 6-digit code.');
      return;
    }

    setLoading(true);
    try {
      await verifyEmail(email, otp);
      setVerified(true);
      toast.success('Email verified successfully!');
      setTimeout(() => router.push('/login'), 2000);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (verified) {
    return (
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-neutral-gray-light text-center">
        <CheckCircle2 className="h-16 w-16 text-emerald-500 mx-auto" />
        <h2 className="text-2xl font-bold text-neutral-black">Email Verified!</h2>
        <p className="text-sm text-neutral-gray-dark">
          Your email has been verified successfully. Redirecting you to login...
        </p>
        <Link href="/login">
          <Button className="bg-brand-navy-900 hover:bg-brand-navy-800">Go to Login</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-neutral-gray-light">
      <div className="text-center flex flex-col items-center">
        <Link href="/" className="mb-6">
          <Image src={logoImg.src} alt="AFRISCIENCE HUB" width={0} height={0} sizes="100vw" className="h-12 w-auto" />
        </Link>
        <div className="flex items-center justify-center h-14 w-14 rounded-full bg-brand-red-100 mb-4">
          <Mail className="h-7 w-7 text-brand-red-600" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-neutral-black">
          Verify your email
        </h2>
        <p className="mt-2 text-sm text-neutral-gray-dark">
          We sent a 6-digit verification code to
        </p>
        <p className="text-sm font-semibold text-neutral-black mt-1">{email}</p>
      </div>

      <div className="space-y-6">
        <div className="flex justify-center">
          <OTPInput
            value={otp}
            onChange={setOtp}
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS}
            onComplete={handleVerify}
            render={({ slots }) => (
              <div className="flex gap-2">
                {slots.map((slot, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-center h-12 w-10 rounded-lg border-2 text-lg font-bold transition-all
                      ${slot.isActive ? 'border-brand-red-600 shadow-sm' : 'border-neutral-gray-light'}
                      ${slot.char ? 'text-neutral-black' : 'text-neutral-gray-medium'}`}
                  >
                    {slot.char ?? ''}
                  </div>
                ))}
              </div>
            )}
          />
        </div>

        <Button
          onClick={handleVerify}
          disabled={loading || otp.length < 6}
          className="w-full bg-brand-navy-900 hover:bg-brand-navy-800 flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {loading ? 'Verifying...' : 'Verify Email'}
        </Button>

        <div className="text-center">
          <p className="text-sm text-neutral-gray-dark">
            Didn't receive the code?{' '}
            <button
              type="button"
              className="font-medium text-brand-red-600 hover:text-brand-red-700"
              onClick={() => toast.info('Resend feature coming soon.')}
            >
              Resend
            </button>
          </p>
        </div>

        <div className="text-center">
          <Link href="/login" className="inline-flex items-center gap-1 text-sm text-neutral-gray-dark hover:text-brand-red-600">
            <ArrowLeft className="h-3 w-3" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmail() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-neutral-bg-light py-12 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-neutral-gray-light text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-brand-red-600" />
        </div>
      }>
        <VerifyForm />
      </Suspense>
    </div>
  );
}
