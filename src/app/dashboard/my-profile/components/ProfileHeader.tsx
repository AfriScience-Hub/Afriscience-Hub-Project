'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Edit3 } from 'lucide-react';
import { normalizeFileSrc } from '@/lib/files';

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .map(n => n[0].toUpperCase())
    .slice(0, 2)
    .join('');
}

interface ProfileHeaderProps {
  fullName: string;
  username?: string;
  completionPct: number;
  avatar?: string | null;
  showAvatarEdit?: boolean;
  onAvatarChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  avatarUploading?: boolean;
}

export function ProfileHeader({ fullName, username, completionPct, avatar, showAvatarEdit, onAvatarChange, avatarUploading }: ProfileHeaderProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const initials = getInitials(fullName);
  const src = normalizeFileSrc(avatar);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const showImage = !!src && src !== failedSrc;
  return (
    <div className="rounded-2xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden mb-6">
      <div className="h-32 bg-gradient-to-r from-brand-navy-900 to-brand-navy-800 relative">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.15\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }} />
      </div>
      <div className="px-6 pb-6 -mt-12 lg:-mt-16 relative">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
          <div className="relative h-28 w-28 lg:h-32 lg:w-32 shrink-0">
            <div className="absolute inset-0 overflow-hidden rounded-full bg-brand-navy-900 ring-4 ring-white shadow-lg">
              {showImage ? (
                <Image
                  src={src!}
                  alt={fullName}
                  fill
                  sizes="(min-width: 1024px) 128px, 112px"
                  className={`object-cover object-center transition-opacity ${
                    avatarUploading ? 'opacity-50' : 'opacity-100'
                  }`}
                  unoptimized={/^(data:|blob:)|X-Amz-/i.test(src!)}
                  onError={() => setFailedSrc(src!)}
                />
              ) : (
                <span className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
                  {initials}
                </span>
              )}
              {avatarUploading && (
                <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent" />
                </div>
              )}
            </div>
            {showAvatarEdit && !avatarUploading && (
              <>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onAvatarChange} />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="absolute bottom-0 right-0 z-10 h-10 w-10 rounded-full bg-green-600 cursor-pointer hover:bg-green-700 flex items-center justify-center text-white shadow-lg transition-colors"
                >
                  <Edit3 className="h-4 w-4" />
                </button>
              </>
            )}
          </div>
          <div className="flex-1 pt-2">
            <h2 className="text-2xl font-bold text-neutral-black">{fullName}</h2>
            {username && (
              <span className="mt-1 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-bg-light border border-neutral-gray-light text-xs font-medium text-neutral-gray-dark">
                <span className="font-bold text-neutral-black">@{username}</span>
              </span>
            )}
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
