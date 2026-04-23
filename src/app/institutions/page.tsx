
'use client';

import { useState } from 'react';
import Header from '../components/header';
import SearchModal from '../components/search';
import Footer from '../components/footer';
import InstitutesHeader from './components/institutesheader';
import FilterSidebar from './components/filterSidebar';
import InstitutesResults from './components/instituteCards';

// --- Interface for Institute Data ---
interface Institute {
  id: number;
  name: string;
  location: {
    city: string;
    country: string;
  };
  status: 'ONLINE' | 'OFFLINE';
  class: 'Primary' | 'Secondary' | 'Primary & Secondary';
  ownership: string; // From Filter options (Private, Mission, Govt, etc.)
  gender: 'Female' | 'Male' | 'Mixed' | 'Rather not say';
  rating: {
    stars: number; // e.g., 4.8
    count: number; // e.g., 156
  };
  stats: {
    likes: string; // e.g., "4.2k"
    messages: number; // e.g., 156
    forks: number; // e.g., 820
  };
  image: string; // URL to image
}


const instituteData: Institute[] = [
  {
    id: 1,
    name: "Lagos High School of Science & Tech",
    location: { city: "Lagos", country: "Nigeria" },
    status: "ONLINE",
    class: "Secondary",
    ownership: "Private",
    gender: "Mixed",
    rating: { stars: 4.8, count: 156 },
    stats: { likes: "4.2k", messages: 156, forks: 820 },
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600&h=400&auto=format&fit=crop" // Gray building/empty space placeholder
  },
  {
    id: 2,
    name: "Cape Town Science Academy",
    location: { city: "Western Cape", country: "South Africa" },
    status: "OFFLINE",
    class: "Primary",
    ownership: "Private",
    gender: "Mixed",
    rating: { stars: 4.7, count: 56 },
    stats: { likes: "1.5k", messages: 56, forks: 180 },
    image: "https://images.unsplash.com/photo-1605333555239-4d6211832043?q=80&w=600&h=400&auto=format&fit=crop" // Apple on books
  },
  {
    id: 3,
    name: "St. Mary's Girls Academy",
    location: { city: "Greater Accra", country: "Ghana" },
    status: "OFFLINE",
    class: "Secondary",
    ownership: "Mission",
    gender: "Female",
    rating: { stars: 4.6, count: 112 },
    stats: { likes: "2.8k", messages: 112, forks: 410 },
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=600&h=400&auto=format&fit=crop" // Kids with backpacks
  },
  {
    id: 4,
    name: "Cairo International School",
    location: { city: "Cairo", country: "Egypt" },
    status: "ONLINE",
    class: "Secondary",
    ownership: "International",
    gender: "Mixed",
    rating: { stars: 4.9, count: 205 },
    stats: { likes: "4.1k", messages: 205, forks: 720 },
    image: "https://images.unsplash.com/photo-1521791136064-7986c292321d?q=80&w=600&h=400&auto=format&fit=crop" // Placeholder image for Cairo
  },
  {
    id: 5,
    name: "Kigali Boys High",
    location: { city: "Kigali City", country: "Rwanda" },
    status: "OFFLINE",
    class: "Secondary",
    ownership: "Government | Public",
    gender: "Male",
    rating: { stars: 4.4, count: 78 },
    stats: { likes: "1.8k", messages: 78, forks: 200 },
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=600&h=400&auto=format&fit=crop" // Kigali Boys High Placeholder
  }
];


// Inside Home.tsx
export default function Home() {
  const [searchOpen, setSearchOpen] = useState(false);
  
  const [activeFilters, setActiveFilters] = useState({
    status: [] as string[],
    class: [] as string[],
    gender: [] as string[],
    ownership: [] as string[],
  });

  const handleFilterChange = (category: string, value: string, checked: boolean) => {
    setActiveFilters(prev => {
      const categoryKey = category.toLowerCase() as keyof typeof prev;
      const currentCategoryValues = prev[categoryKey] || [];
      
      const newValues = checked 
        ? [...currentCategoryValues, value.toUpperCase()] 
        : currentCategoryValues.filter(v => v !== value.toUpperCase());
      
      return { ...prev, [categoryKey]: newValues };
    });
  };

  const filteredInstitutes = instituteData.filter(item => {
    // We check if the filter array is empty OR if the item's property exists in the filter array
    const statusMatch = activeFilters.status.length === 0 || activeFilters.status.includes(item.status);
    const classMatch = activeFilters.class.length === 0 || activeFilters.class.includes(item.class.toUpperCase());
    const genderMatch = activeFilters.gender.length === 0 || activeFilters.gender.includes(item.gender.toUpperCase());
    const ownershipMatch = activeFilters.ownership.length === 0 || activeFilters.ownership.includes(item.ownership.toUpperCase());

    return statusMatch && classMatch && genderMatch && ownershipMatch;
  });

  return (
    <div className="min-h-screen bg-white">
      <Header onSearchOpen={() => setSearchOpen(true)} />
      <InstitutesHeader />
      
      <div className="max-w-6xl mx-auto mt-20 px-4 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        <FilterSidebar onFilterChange={handleFilterChange} selectedFilters={activeFilters} />
        <InstitutesResults data={filteredInstitutes} />
      </div>

      <Footer />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}