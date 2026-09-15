'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Mail, Phone, Shield, LogOut, ArrowLeft, User, Calendar, Award } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { logoutThunk } from '@/store/authSlice';
import { Button } from '@/app/components/ui/Button';
import { toast } from 'sonner';
import { AdminProfileSkeleton } from '@/app/dashboard/my-profile/components/ProfileSkeleton';

export default function AdminProfilePage() {
  const { user, loading } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    await dispatch(logoutThunk() as any);
    toast.success('Signed out');
    router.replace('/admin/login');
  };

  if (loading && !user) {
    return <AdminProfileSkeleton />;
  }

  const displayName = user?.name || 'Claire Iwuanyanwu';
  const displayEmail = user?.email || 'claire.iwuanyanwu@afriscience.org';
  const displayPhone = user?.phone || '+234 805 675 0798';

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-2 text-sm">
        <button onClick={() => router.back()} className="flex items-center gap-1.5 text-neutral-gray-medium hover:text-neutral-black">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-neutral-black">Admin Profile</h1>
        <p className="text-sm text-neutral-gray-dark mt-1">View and manage your admin account details.</p>
      </div>

      <div className="rounded-2xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-[#0f1729] to-[#453DD8]" />
        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-5">
            <Image
              src={user?.avatar || 'https://images.unsplash.com/photo-1670881391783-9c55ba592f93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXQlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzIzODM4NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080'}
              alt={displayName}
              width={80}
              height={80}
              className="h-20 w-20 rounded-full border-4 border-white object-cover shadow-md bg-white"
            />
            <div className="pb-1">
              <h2 className="text-xl font-bold text-neutral-black">{displayName}</h2>
              <p className="text-sm text-neutral-gray-medium flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5" /> Super Admin
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="rounded-xl border border-neutral-gray-light bg-neutral-bg-light p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-gray-medium uppercase tracking-wider mb-1">
                <User className="h-3.5 w-3.5" /> Full Name
              </div>
              <p className="text-sm font-medium text-neutral-black">{displayName}</p>
            </div>

            <div className="rounded-xl border border-neutral-gray-light bg-neutral-bg-light p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-gray-medium uppercase tracking-wider mb-1">
                <Award className="h-3.5 w-3.5" /> Role
              </div>
              <p className="text-sm font-medium text-neutral-black">{user?.role || 'Super Admin'}</p>
            </div>

            <div className="rounded-xl border border-neutral-gray-light bg-neutral-bg-light p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-gray-medium uppercase tracking-wider mb-1">
                <Mail className="h-3.5 w-3.5" /> Email
              </div>
              <p className="text-sm font-medium text-neutral-black truncate">{displayEmail}</p>
            </div>

            <div className="rounded-xl border border-neutral-gray-light bg-neutral-bg-light p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-gray-medium uppercase tracking-wider mb-1">
                <Phone className="h-3.5 w-3.5" /> Phone
              </div>
              <p className="text-sm font-medium text-neutral-black">{displayPhone}</p>
            </div>

            <div className="rounded-xl border border-neutral-gray-light bg-neutral-bg-light p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-gray-medium uppercase tracking-wider mb-1">
                <Calendar className="h-3.5 w-3.5" /> Member Since
              </div>
              <p className="text-sm font-medium text-neutral-black">Feb 12, 2024</p>
            </div>

            <div className="rounded-xl border border-neutral-gray-light bg-neutral-bg-light p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-gray-medium uppercase tracking-wider mb-1">
                <Shield className="h-3.5 w-3.5" /> Status
              </div>
              <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">Active</span>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <Button onClick={handleLogout} variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
              <LogOut className="h-4 w-4 mr-2" /> Sign out
            </Button>
            <Button className="bg-[#0f1729] hover:bg-[#1a2744]" onClick={() => toast.info('Edit profile coming soon')}>
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
