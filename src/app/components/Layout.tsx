'use client';

import React, { useState } from 'react';
import { SearchDirectory } from './SearchDirectory';
import { FeedbackWidget } from './FeedbackWidget';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}


export function Layout({ children }: LayoutProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-bg-light font-sans text-neutral-black">
      <Header isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Feedback Widget */}
      <FeedbackWidget />

      {/* Footer */}
      <Footer />

      <SearchDirectory isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}