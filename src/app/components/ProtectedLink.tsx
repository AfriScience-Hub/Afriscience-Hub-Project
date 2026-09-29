'use client';

import React from 'react';
import Link from 'next/link';
import { useLoginPrompt } from '@/app/context/LoginPromptContext';

interface ProtectedLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  'aria-label'?: string;
  title?: string;
}

/**
 * A Link that only navigates when the user is authenticated. When logged out,
 * clicking it prevents navigation and prompts the user to log in instead.
 */
export function ProtectedLink({ href, className, children, ...rest }: ProtectedLinkProps) {
  const { requireAuth } = useLoginPrompt();

  return (
    <Link
      href={href}
      className={className}
      {...rest}
      onClick={(e) => {
        if (!requireAuth(() => {})) e.preventDefault();
      }}
    >
      {children}
    </Link>
  );
}
