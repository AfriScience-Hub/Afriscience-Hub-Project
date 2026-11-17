import { SearchPageContent } from './SearchPageContent';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  return <SearchPageContent initialQuery={q ?? ''} />;
}
