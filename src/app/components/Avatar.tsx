'use client';

import { useState } from 'react';
import Image from 'next/image';
import { normalizeFileSrc } from '@/lib/files';
import { cn } from '@/lib/utils';

interface AvatarProps {
  src?: string | null;
  name: string;
  username?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const SIZE_CLASSES = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-xl',
};

const SIZE_PX = { sm: 32, md: 40, lg: 48, xl: 64 };

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .map(n => n[0].toUpperCase())
    .slice(0, 2)
    .join('');
}

export function Avatar({ src, name, username, size = 'md', className = '' }: AvatarProps) {
  const initials = getInitials(name || username || '');
  const resolved = normalizeFileSrc(src);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const showImage = !!resolved && resolved !== failedSrc;
  const px = SIZE_PX[size];

  return (
    <div
      className={cn(
        'relative shrink-0 overflow-hidden rounded-full bg-brand-navy-900 ring-2 ring-white shadow',
        SIZE_CLASSES[size],
        className,
      )}
    >
      {showImage ? (
        <Image
          src={resolved!}
          alt={name}
          fill
          sizes={`${px}px`}
          className="object-cover object-center"
          unoptimized={/^(data:|blob:)|X-Amz-/i.test(resolved!)}
          onError={() => setFailedSrc(resolved!)}
        />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center text-white font-bold leading-none">
          {initials}
        </span>
      )}
    </div>
  );
}
