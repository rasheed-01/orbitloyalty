import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, X, Menu, Search } from 'lucide-react';
import OrbitLogo from '../assets/Orbit_Logo.svg';
import ProgramPopup from './ProgramPopup';

interface CustomerExploreProps {
  onNavigate: (page: string) => void;
  currentUser: any;
  setCurrentUser: (user: any) => void;
  navigateToPage: (page: string) => void;
  onRoleSelect: (role: 'business' | 'customer') => void;
}

const CustomerExplore: React.FC<CustomerExploreProps> = ({ onNavigate, currentUser, setCurrentUser, navigateToPage, onRoleSelect }) => {
  const categories = ['All', 'Cafe', 'Restaurant', 'Retail', 'Beauty & Wellness'];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<any | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const businesses = [
    {
      id: 1,
      name: 'The Coffee House',
      category: 'Cafe',
      location: 'Downtown Plaza',
      image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400',
      points: '5 points per visit',
      reward: 'Free coffee at 100 points',
      isJoined: false,
      description: 'Your daily coffee spot with cozy ambiance.',
      hours: ['6:00 am', '12:00 am']
    },
    // Add more businesses here...
  ];

  const filteredBusinesses = businesses.filter((biz) => {
    const matchesSearch =
      biz.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      biz.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || biz.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
   <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/LandingPage">
              <img src={OrbitLogo} alt="Orbit Logo" className="h-10 cursor-pointer" />
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-12 text-sm font-medium text-gray-700">
            <button onClick={() => navigateToPage('landing')} className="hover:text-black transition">
                Overview
            </button>
            <button onClick={() => navigateToPage('customer-explore')} className="hover:text-black transition">
                Explore
            </button>
            <button onClick={() => navigateToPage('business-landing')} className="hover:text-black transition">
                Business
            </button>
          </nav>

          {/* Desktop Right Side Buttons */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium relative" ref={dropdownRef}>
            <button onClick={() => navigateToPage('login')}>
               Login
            </button>

            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="px-4 py-2 border-2 rounded-full border-[#FFB000] text-[#FFB000] hover:bg-[#FFB000] hover:text-white transition-all duration-300"
            >
              Sign up
            </button>

            {/* Dropdown */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-14 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <button
                  onClick={() => { onRoleSelect('customer'); navigateToPage('signup'); setDropdownOpen(false); }}
                  className="w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Customer
                </button>
                <button
                  onClick={() => { onRoleSelect('business'); navigateToPage('signup'); setDropdownOpen(false); }}
                  className="w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Business
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-6 space-y-4 text-sm font-medium text-gray-700">
           <button onClick={() => navigateToPage('landing')} className="hover:text-black transition">
                Overview
          </button>
          <br/>
          <button onClick={() => navigateToPage('customer-explore')} className="hover:text-black transition">
                Explore
         </button>
         <br/>
         <button onClick={() => navigateToPage('business-landing')} className="hover:text-black transition">
                Business
         </button>
         <br/>
          <button onClick={() => navigateToPage('login')}>
               Login
            </button>

          {/* Sign Up with role select */}
          <div className="border-t border-gray-100 pt-4">
            <span className="block text-gray-500 text-xs mb-2">Sign up as:</span>
            <button
              onClick={() => { onRoleSelect('customer');  navigateToPage('signup'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Customer
            </button>
            <button
              onClick={() => { onRoleSelect('business');  navigateToPage('signup'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Business
            </button>
          </div>
        </div>
      )}
    </header>

      {/* Title Section */}
      <section className="text-center py-12">
        <h1 className="text-3xl font-semibold">
          <span className="bg-gradient-to-r from-[#C68900] to-[#FFB000] bg-clip-text text-transparent font-bold">Loyalty</span> in Your Orbit
        </h1>
        <p className="text-gray-500 mt-2">Explore loyalty programs from your favorite spots</p>
      </section>

      {/* Search Bar */}
      <div className="flex justify-center">
       <div className="relative w-[90%] sm:w-[%60] md:w-[%40] lg:w-[40%] xl:w-[40%] mb-6">
        <input
          type="text"
          placeholder="Search for cafés, stores, or rewards..."
          className="w-full border border-[#FFB000] rounded-full py-2 px-4 pl-5 pr-12 focus:outline-none text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
       <Search className="absolute right-4 top-2.5 h-5 w-5 text-[#FFB000]" />
       </div>
     </div>

      {/* Category Filter */}
      <div className="flex justify-center flex-wrap gap-16 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`text-sm font-medium ${selectedCategory === cat ? 'text-[#FFB000] underline' : 'text-gray-700'} hover:text-[#FFB000]`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Business Cards */}
       <section className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-20">
         {filteredBusinesses.length === 0 ? (
        <div className="col-span-full text-center text-gray-500 text-lg font-medium py-16">
           No programs available
         </div>
       ) : (
         filteredBusinesses.map((biz) => (
          <div key={biz.id} className="border rounded-lg shadow hover:shadow-md transition overflow-hidden bg-white"
               onClick={() => setSelectedProgram(biz)}
           >
             <div className="relative h-36 overflow-hidden">
              <img src={biz.image} alt={biz.name} className="w-full h-full object-cover" />
                <ArrowUpRight className="absolute top-2 right-2 text-white bg-black bg-opacity-30 rounded p-1 h-6 w-6" />
             </div>
              <div className="p-3 text-center">
                <h3 className="text-lg font-semibold text-gray-800">{biz.name}</h3>
                  <p className="text-sm text-gray-500">{biz.category} · {biz.location}</p>
                  <p className="text-sm mt-2 text-yellow-600">{biz.points}</p>
                  <p className="text-xs text-gray-600">{biz.reward}</p>
               <button className={`mt-3 w-full py-1 border rounded ${biz.isJoined ? 'border-gray-300 text-gray-400 cursor-not-allowed' : 'border-[#FFB000] text-[#FFB000] hover:bg-[#FFB000] hover:text-white transition'}`} 
                       disabled={biz.isJoined}
                 >
                       {biz.isJoined ? 'Joined' : 'Join'}
               </button>
             </div>
            </div>
       ))
     )}
     </section>

      {/* Program Detail Popup */}
      {selectedProgram && (
       <ProgramPopup
        program={selectedProgram}
        onClose={() => setSelectedProgram(null)}
        onJoin={() => {
          if (!currentUser) {
              onNavigate('login');
          } else {
            const updated = businesses.map((biz) =>
            biz.id === selectedProgram.id ? { ...biz, isJoined: true } : biz
          );
        setSelectedProgram(null);
      }
    }}
  />
)}
    </div>
  );
};

export default CustomerExplore;
