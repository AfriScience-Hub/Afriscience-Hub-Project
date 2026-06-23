'use client';

import Link from 'next/link';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';

interface LoginPromptModalProps {
  onClose: () => void;
}

export function HomeLoginPromptModal({ onClose }: LoginPromptModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="h-8 w-8 text-amber-600" />
        </div>
        <h3 className="text-2xl font-bold text-neutral-black mb-2">Login Required</h3>
        <p className="text-slate-500 mb-6">
          Please log in to your account to access the full content and features of this page.
        </p>
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
          <Link href="/login" className="flex-1">
            <Button className="w-full bg-brand-red-600 hover:bg-brand-red-700">Log In</Button>
          </Link>
        </div>
        <p className="text-xs text-slate-400 mt-4">
          Don&apos;t have an account? <Link href="/signup" className="text-brand-red-600 hover:underline">Sign up here</Link>
        </p>
      </div>
    </div>
  );
}
