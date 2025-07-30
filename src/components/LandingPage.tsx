import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import Orbit from '../assets/Orbit.png';
import OrbitLogo from '../assets/Orbit_Logo.svg';
import Join from '../assets/Join.svg';
import Earn from '../assets/Earn.svg';
import Redeem from '../assets/Redeem.svg';

interface LandingPageProps {
  onRoleSelect: (role: 'business' | 'customer') => void;
  navigateToPage: (page: string) => void; 
}

const LandingPage: React.FC<LandingPageProps> = ({ onRoleSelect, navigateToPage }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
            <a href="#overview" className="hover:text-black transition">Overview</a>
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
          <a href="#overview" className="block hover:text-black transition">Overview</a>
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

    {/* Hero Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      {/* Orbit Background behind content block */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[50%] pointer-events-none z-0">
          <img
              src={Orbit}
              alt="Orbit Background"
              className="w-[90vw] max-w-4xl opacity-100"
           />
      </div>

      {/* Content Block */}
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-black leading-tight mb-6">
                Being Loyal Has <br className="hidden sm:block" />
               Never Been This Easy
            </h1>

          <p className="text-lg md:text-xl text-gray-700 mb-10">
              Orbit makes it effortless to earn rewards and stay <br className="hidden sm:block" />
             connected to your favorite local stores.
         </p>

          <button className="px-6 py-3 font-semibold rounded-full border-2 border-[#FFB000] text-[#FFB000] bg-transparent transition-all duration-300 hover:bg-[#FFB000] hover:text-white transform hover:scale-105">
             Start Earning Rewards
          </button>
          </div>
    </section>

    {/* How it Works Section */}
    <section id="overview" className="bg-white py-19 px-4 sm:px-6 lg:px-8"></section>
     <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
       <div className="max-w-6xl mx-auto">
       <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
         {/* Card 1 */}
          <div className="relative bg-white rounded-lg shadow p-8 pt-12">
            {/* Icon */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="bg-white rounded-full p-2 shadow inline-block">
                 <img src= {Join} alt="Join" className="w-10 h-10 text-[#FFB000]" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-4">Join</h3>
             <p>
              Search for your favorite café<br />or store on Orbit.
            </p>
            <p className="my-2 font-semibold">OR</p>
            <p>Join instantly by scanning<br />their QR code while in-store.</p>
            </div>

        {/* Card 2 */}
         <div className="relative bg-white rounded-lg shadow p-8 pt-12">
         <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
         <div className="bg-white rounded-full p-2 shadow inline-block">
            <img src= {Earn} alt="Earn" className="w-10 h-10 text-[#FFB000]" />
         </div>
         </div>
           <h3 className="text-xl font-semibold mb-4">Earn</h3>
             <ul className="text-center list-disc list-inside space-y-1">
             <li>Show your personal Orbit QR code.</li>
             <li>The business scans.</li>
             <li>You automatically earn points or stamps toward a reward.</li>
             </ul>
         </div>

        {/* Card 3 */}
         <div className="relative bg-white rounded-lg shadow p-8 pt-12">
         <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
         <div className="bg-white rounded-full p-2 shadow inline-block">
            <img src= {Redeem} alt="Redeem" className="w-10 h-10 text-[#FFB000]" />
         </div>
         </div>
           <h3 className="text-xl font-semibold mb-4">Redeem</h3>
           <p>Once you hit your goal, your<br />reward is ready to unlock!</p>
         </div>
         </div>
         </div>

        {/* Golden Banner */}
          <div className="mt-16 w-full bg-gradient-to-r from-[#FFB000] to-[#FFD26E] text-white text-center py-5 text-lg font-bold shadow-inner">
          From First Tap to Free Treat
          </div>
      </section>

      {/* Why Orbit?*/}
      <section id="whyorbit" className="bg-white py-19 px-6"></section>
      <section className="bg-white py-17 px-6">
        {/* Section Header */}
         <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-black flex justify-center items-center gap-2">
          <span>Why</span>
          <img
             src={OrbitLogo}
             alt="Orbit Logo"
             className="h-8 md:h-10 inline-block"
           />
         <span>?</span>
         </h2>
        </div>

        {/* Features List */}
          <div className="max-w-3xl mx-auto space-y-10">
          {[
           {
            title: "One Wallet, Infinite Rewards.",
            desc: "No more juggling dozens of loyalty cards or remembering which cafe offers what. Orbit gives you one sleek digital wallet that holds all your favorite loyalty programs."
           },
           {
            title: "Rewards You Actually Want.",
            desc: "Whether it's a free coffee, a discount on your go-to meal, or a surprise treat—every scan brings you closer to something you love."
           },
           {
            title: "Effortless Earning.",
            desc: "Just scan a QR code at checkout and earn points instantly. No forms to fill, no hassle."
           },
           {
            title: "Discover Hidden Gems.",
            desc: "Explore trending spots and local favorites with Orbit's Explore feature."
           },
           {
            title: "You’re in Control.",
            desc: "Track your progress, see what rewards are coming next, and never miss out on a perk again."
           },
           {
            title: "Built for the Future.",
            desc: "Contactless, digital-first, and mobile-optimized. Orbit was built for how you live now."
           }
          ].map((item, idx) => (
       <div key={idx}>
        <h3 className="text-lg font-semibold text-black mb-2">{item.title}</h3>
        <p className="text-gray-600 mb-4">{item.desc}</p>
        <div className="h-0.5 w-full bg-[#FFB000]"></div>
        </div>
        ))}
        </div>
      </section>

      {/* CTA Section */}
      <section id="join" className="relative flex justify-center px-4 py-19 bg-white"></section>
      <section className="relative flex justify-center px-4 py-24 bg-white">
      <div className="relative w-full max-w-7xl min-h-[400px] rounded-[2rem] border border-[#FFB000] px-6 md:px-16 py-20 text-center overflow-hidden">
        
        {/* Orbit Background */}
        <img
          src={Orbit}
          alt="Orbit Background"
          className="absolute left-1/2 top-1/2 w-[60%] max-w-none -translate-x-1/2 -translate-y-1/2 blur-sm opacity-100 z-0 pointer-events-none"
        />

        {/* Content */}
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Ready to Get <span className="bg-gradient-to-r from-[#C68900] to-[#FFB000] bg-clip-text text-transparent">Rewarded</span>?
          </h2>
          <p className="text-lg text-gray-800 mb-10">
            Discover cafés, salons, and shops with rewards waiting for you.
          </p>

          <div className="flex justify-center gap-6 flex-wrap">
            <button onClick={() => onRoleSelect('customer')}className="px-6 py-2 border-2 border-[#FFB000] text-[#FFB000] font-semibold rounded-full hover:bg-[#FFB000] hover:text-white transition-all"
             >
                Start Earning Rewards
            </button>
            <button onClick={() => navigateToPage('customer-explore')} className="px-6 py-2 text-gray-500 font-semibold hover:text-gray-800 transition-all"
            >
              Explore Programs
            </button>
          </div>
        </div>
      </div>
    </section>

      {/* Footer */}
       <div className="relative">
       {/* Glow effect above the footer */}
       <div className="absolute -top-6 left-0 w-full h-10 bg-gradient-to-b from-transparent to-[#FFB000] z-10 opacity-60" />

      <footer className="bg-white text-white py-12 rounded-t-[2rem] overflow-hidden">
        {/* Footer Content */}
         <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex flex-col md:flex-row justify-between items-center">
        {/* Logo & Title */}
         <div className="flex-shrink-0 flex flex-col items-center space-y-2">
         <img src={OrbitLogo} alt="Orbit Logo" className="h-10" />

        {/* Navigation under logo */}
        <div className="mt-2 flex flex-col text-sm font-medium text-gray-400 items-left space-y-3">
          <a href="#overview" className="hover:text-black transition">Overview</a>
          <a href="#whyorbit" className="hover:text-black transition">Why Orbit</a>
          <a href="#join" className="hover:text-black transition">Join</a>
        </div>
         </div>

        {/* Copyright */}
         <p className="text-gray-400">© 2025 LoyaltyHub. All rights reserved.</p>
        </div>
       </div>
      </footer>
      </div>
    </div>
  );  
}

export default LandingPage;