'use client';

import Link from 'next/link';
import Image from 'next/image';
import { DollarSign, Calendar, Users, Eye } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { cn } from '../../../lib/utils';
import type { Competition } from '../data';

interface CompetitionCardProps {
  comp: Competition;
  onPreview: (image: string) => void;
}

const TYPE_COLORS: Record<string, string> = {
  'Afri \u2013 Anime': 'bg-purple-100 text-purple-700 border-purple-200',
  'Afri \u2013 Presentations': 'bg-blue-100 text-blue-700 border-blue-200',
  'Afri \u2013 Memes': 'bg-amber-100 text-amber-700 border-amber-200',
  'Afri \u2013 MySpace': 'bg-emerald-100 text-emerald-700 border-emerald-200',
};

export function CompetitionCard({ comp, onPreview }: CompetitionCardProps) {
  return (
    <div className="group flex flex-col rounded-xl border border-neutral-gray-light bg-white shadow-sm transition-all hover:shadow-md hover:border-brand-red-100 overflow-hidden">
      <div className="relative h-48 bg-brand-navy-900 overflow-hidden cursor-pointer" onClick={() => onPreview(comp.image)}>
        <Image src={comp.image} alt={comp.title} fill className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className={cn("px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border backdrop-blur-sm", TYPE_COLORS[comp.type] || 'bg-neutral-bg-light text-neutral-gray-dark border-neutral-gray-light')}>{comp.type}</span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="flex items-center justify-center h-7 w-7 rounded-full bg-white/80 backdrop-blur text-slate-600"><Eye className="h-3.5 w-3.5" /></span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs text-neutral-gray-medium italic mb-3 line-clamp-2">{comp.introNote}</p>
        <h3 className="text-lg font-bold text-neutral-black group-hover:text-brand-red-600 transition-colors mb-2 leading-tight">{comp.title}: {comp.country}</h3>
        <div className="mb-3">
          <span className="inline-block text-[10px] font-bold uppercase tracking-wide text-brand-navy-900 bg-brand-navy-100 px-2.5 py-1 rounded-full border border-brand-navy-100">{comp.category}</span>
        </div>
        <div className="mt-auto space-y-2.5 pt-3 border-t border-neutral-gray-light">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-neutral-gray-dark"><DollarSign className="h-3.5 w-3.5 text-green-600" /> Registration:</span>
            <span className="font-bold text-green-700">{comp.registrationFee}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-neutral-gray-dark"><Calendar className="h-3.5 w-3.5 text-neutral-gray-medium" /> Deadline:</span>
            <span className="font-medium text-neutral-black">{new Date(comp.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-neutral-gray-dark"><Users className="h-3.5 w-3.5 text-neutral-gray-medium" /> Participants:</span>
            <span className="font-medium text-neutral-black">{comp.participants}</span>
          </div>
          <Link href={`/competitions/${comp.id}`}>
            <Button className="w-full mt-2 bg-brand-navy-900 hover:bg-brand-navy-800" size="sm">View Details</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
