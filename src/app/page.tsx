
'use client';

import { useState } from 'react';
import Header from './components/header';
import SearchModal from './components/search';
import Footer from './components/footer';
import Hero from './components/hero';
import Categories from './components/categories';
import TopRatedInstitutes from './components/institutes';

export default function Home() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header onSearchOpen={() => setSearchOpen(true)} />
      
      {/* Main content area - Add your page content here */}
        <Hero />
        <Categories />

        <div className='bg-gray-200'>
          <TopRatedInstitutes />
        </div>

      {/* Footer */}
      <Footer />

      {/* Search Modal - Renders over entire page */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
