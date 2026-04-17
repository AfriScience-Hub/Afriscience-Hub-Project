
'use client';

import { useState } from 'react';
import Header from '../components/header';
import SearchModal from '../components/search';
import Footer from '../components/footer';
import Hero from './components/hero';
import GetInTouch from './components/getintouch';

export default function Home() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header onSearchOpen={() => setSearchOpen(true)} />
      
      {/* Main content area */}
      <Hero />
      <GetInTouch />

      {/* Footer */}
      <Footer />

      {/* Search Modal - Renders over entire page */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
