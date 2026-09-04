'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, User, Loader2 } from 'lucide-react';
import littleLogo from '../../../assets/littleLogo.png';
import { Button } from '../../components/ui/Button';
import { toast } from 'sonner';
import { useAppDispatch } from '@/store/hooks';
import { signupAdmin } from '@/store/authSlice';

export default function AdminSignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim()) return toast.error('Please enter first name');
    if (!lastName.trim()) return toast.error('Please enter last name');
    if (!email.trim()) return toast.error('Please enter email');
    if (password.length < 8) return toast.error('Password must be at least 8 characters');
    if (password !== confirmPassword) return toast.error('Passwords do not match');

    setLoading(true);
    try {
      const res: any = await dispatch(signupAdmin({ firstName: firstName.trim(), lastName: lastName.trim(), email: email.trim(), password, confirmPassword }));
      if (signupAdmin.rejected.match(res)) throw new Error((res.payload as string) || 'Signup failed');
      toast.success('Admin account created! Please verify your email.');
      router.push(`/admin/verify?email=${encodeURIComponent(email.trim())}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Signup failed');
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
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-neutral-black">Create Admin Account</h2>
          <p className="mt-2 text-sm text-neutral-gray-dark">Register for admin access.</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-black">First Name</label>
                <div className="relative mt-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <User className="h-5 w-5 text-neutral-gray-medium" />
                  </div>
                  <input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Joseph"
                    className="block w-full rounded-md border-neutral-gray-light pl-10 focus:border-brand-red-600 focus:ring-brand-red-600 sm:text-sm py-2.5 border" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-black">Last Name</label>
                <div className="relative mt-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <User className="h-5 w-5 text-neutral-gray-medium" />
                  </div>
                  <input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Andy"
                    className="block w-full rounded-md border-neutral-gray-light pl-10 focus:border-brand-red-600 focus:ring-brand-red-600 sm:text-sm py-2.5 border" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-black">Email Address</label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-neutral-gray-medium" />
                </div>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@afrisciencehub.com"
                  className="block w-full rounded-md border-neutral-gray-light pl-10 focus:border-brand-red-600 focus:ring-brand-red-600 sm:text-sm py-2.5 border" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-black">Password</label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-neutral-gray-medium" />
                </div>
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 8 characters"
                  className="block w-full rounded-md border-neutral-gray-light pl-10 pr-10 focus:border-brand-red-600 focus:ring-brand-red-600 sm:text-sm py-2.5 border" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-gray-medium cursor-pointer">
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-black">Confirm Password</label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-neutral-gray-medium" />
                </div>
                <input type={showConfirm ? 'text' : 'password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Re-enter password"
                  className="block w-full rounded-md border-neutral-gray-light pl-10 pr-10 focus:border-brand-red-600 focus:ring-brand-red-600 sm:text-sm py-2.5 border" />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-gray-medium cursor-pointer">
                  {showConfirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-[#0f1729] hover:bg-[#1a2744] flex items-center justify-center gap-2">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {loading ? 'Creating account...' : 'Create Admin Account'}
          </Button>
        </form>

        <p className="text-center text-sm text-neutral-gray-dark">
          Already have an account?{' '}
          <Link href="/admin/login" className="font-medium text-brand-red-600 hover:text-brand-red-700">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
