'use client';

import { Linkedin, Facebook, Twitter, Instagram } from 'lucide-react';

export default function SocialLinks() {
  return (
    <div className="flex justify-center gap-6 py-6 bg-slate-50 rounded-2xl border border-neutral-gray-light">
      <a href="#" className="text-slate-400 hover:text-brand-red-600 transition-colors"><Linkedin className="h-6 w-6" /></a>
      <a href="#" className="text-slate-400 hover:text-brand-red-600 transition-colors"><Facebook className="h-6 w-6" /></a>
      <a href="#" className="text-slate-400 hover:text-brand-red-600 transition-colors"><Twitter className="h-6 w-6" /></a>
      <a href="#" className="text-slate-400 hover:text-brand-red-600 transition-colors"><Instagram className="h-6 w-6" /></a>
    </div>
  );
}
