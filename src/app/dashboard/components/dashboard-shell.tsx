'use client';

import { Suspense, useState } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import SearchModal from '../../components/search';
import Sidebar from './sidebar';

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header onSearchOpen={() => setSearchOpen(true)} />
      <div className="pt-24 pb-9">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-4 lg:flex-row lg:px-8">
          <Suspense fallback={<div className="hidden w-72 shrink-0 lg:block" />}>
            <Sidebar />
          </Suspense>
          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </div>
      <Footer />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
