/**
 * Shared client-side route classification.
 *
 * Listing and landing pages are public. Detail views, dashboards and admin
 * areas require a signed-in session. Keep this in one place so the API layer
 * and the protected-page guard cannot drift apart.
 */

export function isAdminPath(pathname: string): boolean {
  return pathname === '/admin' || pathname.startsWith('/admin/');
}

export function isProtectedPath(pathname: string): boolean {
  if (isAdminPath(pathname)) return true;

  if (pathname === '/dashboard' || pathname.startsWith('/dashboard/')) return true;
  if (pathname === '/profile' || pathname.startsWith('/profile/')) return true;

  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return false;

  const [root, second] = segments;

  // Listing detail pages. Listing/index pages stay public.
  if (
    segments.length === 2 &&
    ['innovations', 'scientists', 'specialist-centers', 'institutes', 'awards', 'impact'].includes(root)
  ) {
    return true;
  }

  // Competition detail, apply and submission routes. The past-competitions
  // listing is public.
  if (root === 'competitions') {
    if (!second || second === 'pastcompetition') return false;
    return true;
  }

  // Sponsor detail/apply routes are protected. The sponsor directory and the
  // industry catalog remain public.
  if (root === 'support' && second === 'sponsor') {
    const third = segments[2];
    if (!third || third === 'all' || third === 'catalog') return false;
    return true;
  }

  return false;
}
