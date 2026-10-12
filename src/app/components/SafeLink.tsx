'use client';

import NextLink from 'next/link';
import React from 'react';

/**
 * Drop-in replacement for `next/link` that adds `suppressHydrationWarning`
 * to the underlying `<a>`. This prevents hydration mismatch warnings caused
 * by browser extensions (e.g. password managers) that mutate the DOM class
 * names of anchor tags before React hydrates.
 */
const SafeLink = React.forwardRef<
  HTMLAnchorElement,
  { href: string; [key: string]: any }
>(({ children, href, ...props }: any, ref: any) => (
  <NextLink suppressHydrationWarning href={href} {...props} ref={ref}>
    {children}
  </NextLink>
));
SafeLink.displayName = 'SafeLink';

export default SafeLink;
