
'use client';

import { useState } from 'react';
import Header from '../components/header';
import SearchModal from '../components/search';
import Footer from '../components/footer';

export default function Home() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header onSearchOpen={() => setSearchOpen(true)} />
      
      {/* Main content area - Add your page content here */}
      

      {/* Footer */}
      <Footer />

      {/* Search Modal - Renders over entire page */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
