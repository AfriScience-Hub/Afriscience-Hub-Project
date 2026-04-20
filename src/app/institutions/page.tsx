
'use client';

import { useState } from 'react';
import Header from '../components/header';
import SearchModal from '../components/search';
import Footer from '../components/footer';
import InstitutesHeader from './components/institutesheader';

export default function Home() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header onSearchOpen={() => setSearchOpen(true)} />
      <InstitutesHeader />
      
      {/* Main content area */}

      {/* Footer */}
      <Footer />

      {/* Search Modal - Renders over entire page */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
