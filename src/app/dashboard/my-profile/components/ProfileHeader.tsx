import Image from 'next/image';
import { Edit3 } from 'lucide-react';

interface ProfileHeaderProps {
  fullName: string;
  govIdCode: string;
  completionPct: number;
  avatar?: string | null;
}

export function ProfileHeader({ fullName, govIdCode, completionPct, avatar }: ProfileHeaderProps) {
  return (
    <div className="rounded-2xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden mb-6">
      <div className="h-32 bg-gradient-to-r from-brand-navy-900 to-brand-navy-800 relative">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.15\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }} />
      </div>
      <div className="px-6 pb-6 -mt-16 relative">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
          <div className="relative w-28 h-28 lg:w-32 lg:h-32 rounded-full">
            {avatar && (
              <Image
                src={avatar}
                alt={fullName}
                width={128}
                height={128}
                className="h-full w-full rounded-full object-cover border-4 border-white shadow-lg"
              />
            )}
            <button className="absolute bottom-0 right-0 h-10 w-10 rounded-full bg-green-600 cursor-pointer hover:bg-green-700 flex items-center justify-center text-white shadow-lg transition-colors">
              <Edit3 className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1 pt-2">
            <h2 className="text-2xl font-bold text-neutral-black">{fullName} <span className="text-lg text-neutral-gray-medium font-normal">(3mtt)</span></h2>
            <p className="text-sm text-neutral-gray-medium mt-1">{govIdCode}</p>
          </div>
          <div className="flex items-center justify-center h-24 w-24 rounded-2xl bg-neutral-bg-light border border-neutral-gray-light">
            <div className="text-center">
              <p className="text-2xl font-bold text-neutral-black">{completionPct}%</p>
              <p className="text-xs text-neutral-gray-medium">Complete</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
