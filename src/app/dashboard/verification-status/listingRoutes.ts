/**
 * Public detail-page roots for the listing categories. Verified listings must
 * open the public listing page for their category, not the dashboard preview.
 */
const PUBLIC_LISTING_ROUTES: Record<string, string> = {
  innovation: '/innovations',
  institute: '/institutes',
  scientist: '/scientists',
  center: '/specialist-centers',
  award: '/awards',
  awards: '/awards',
  competition: '/competitions',
  sponsor: '/support/sponsor',
  impact: '/impact',
  'impact-stories': '/impact',
};

export function publicListingUrl(categoryId: string, id: string): string {
  const root = PUBLIC_LISTING_ROUTES[categoryId];
  return root ? `${root}/${encodeURIComponent(id)}` : `/innovations/${encodeURIComponent(id)}`;
}
