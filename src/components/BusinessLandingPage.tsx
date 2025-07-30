import React, { useState, useEffect, useRef } from 'react';
import Orbit from '../assets/Orbit.png';
import OrbitLogo from '../assets/Orbit_Logo.svg';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Gift, QrCode, TrendingUp, Rocket, BarChart3, Repeat, Star, ShieldCheck, Menu, X } from 'lucide-react';


interface LandingPageProps {
  onRoleSelect: (role: 'business' | 'customer') => void;
  navigateToPage: (page: string) => void; 
}

const LandingPage: React.FC<LandingPageProps> = ({ onRoleSelect, navigateToPage }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const features = [
    {
      icon: Rocket,
      title: 'Set up in minutes',
      desc: 'Create a QR-based loyalty program without any tech skills. Just sign up, set your reward, and go live.',
    },
    {
      icon: BarChart3,
      title: 'Real-time loyalty dashboard',
      desc: 'Track scans, customer visits, and redemptions effortlessly.',
    },
    {
      icon: Repeat,
      title: 'Bring customers back, again and again',
      desc: 'Orbit increases repeat visits by rewarding loyalty. More foot traffic. More sales. More love for your brand.',
    },
    {
      icon: Star,
      title: 'Showcase your business on Explore page',
      desc: 'Get featured on Orbit’s trending programs list and attract new customers actively looking for local spots to earn rewards.',
    },
    {
      icon: ShieldCheck,
      title: 'We handle the tech, you focus on customers',
      desc: 'From QR generation to analytics, Orbit handles the backend so you can do what you do best.',
    },
  ];
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

           <button onClick={() => setDropdownOpen(!isDropdownOpen)}
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
              onClick={() => { onRoleSelect('customer'); navigateToPage('signup'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Customer
            </button>
            <button
              onClick={() => { onRoleSelect('business'); navigateToPage('signup'); setMobileMenuOpen(false); }}
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
               Don’t Just Get Customers. <br className="hidden sm:block" />
                Keep Them Coming Back.
            </h1>

          <p className="text-lg md:text-xl text-gray-700 mb-10">
             Orbit helps you keep them loyal <br className="hidden sm:block" />
              before they walk to the shop next door.
         </p>

          <button className="px-6 py-3 font-semibold rounded-full border-2 border-[#FFB000] text-[#FFB000] bg-transparent transition-all duration-300 hover:bg-[#FFB000] hover:text-white transform hover:scale-105">
             Bring Them Back with Orbit
          </button>
          </div>
    </section>

    {/* How it Works Section */}
    <section id="overview" className="bg-white py-19 px-4 sm:px-6 lg:px-8"></section>
     <section className="bg-white py-15 px-4 sm:px-6 lg:px-8">

       <div className="max-w-6xl mx-auto">
       <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
         {/* Card 1 */}
          <div className="relative bg-white rounded-lg shadow p-8 pt-12">
            {/* Icon */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="bg-white rounded-full p-2 shadow inline-block">
                 <Gift className="w-8 h-8 text-[#FFB000]" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-4"> Set up your campaign </h3>
             <p>
              Customize your reward<br /> (e.g., 6 visits = 1 free item)
            </p>
            </div>

        {/* Card 2 */}
         <div className="relative bg-white rounded-lg shadow p-8 pt-12">
         <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
         <div className="bg-white rounded-full p-2 shadow inline-block">
            <QrCode className="w-8 h-8 text-[#FFB000]" />
         </div>
         </div>
           <h3 className="text-xl font-semibold mb-4"> Display your QR code </h3>
            <p>
              Customers scan to join your program<br /> [no app needed]
            </p>
         </div>

        {/* Card 3 */}
         <div className="relative bg-white rounded-lg shadow p-8 pt-12">
         <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
         <div className="bg-white rounded-full p-2 shadow inline-block">
            <TrendingUp className="w-8 h-8 text-[#FFB000]" />
         </div>
         </div>
           <h3 className="text-xl font-semibold mb-4"> Reward & retain </h3>
           <p>Build loyalty and monitor results<br />from your Orbit dashboard</p>
         </div>
         </div>
         </div>
      </section>

      {/* Why Orbit?*/}
        <section id="whyorbit" className="relative bg-white mt-20" style={{ height: `${features.length * 100 + 150}vh` }} ref={containerRef}>
        {/* Section Title */}
        <div className="sticky top-20 z-40 bg-white text-center pt-5 pb-5">
          <h2 className="text-4xl font-bold text-black flex items-center justify-center gap-2">
             Why <img src={OrbitLogo} alt="Orbit Logo" className="h-10" /> ?
         </h2>
        </div>

         {/* Cards Stack */}
        <div className="sticky top-[520px] h-screen flex items-start justify-center pt-10">
         <div className="relative w-full max-w-2xl h-[10px]">
          {features.map((feature, index) => {
            const cardStart = index * 0.15;
            const cardMiddle = cardStart + 0.08;
            const nextCardStart = (index + 1) * 0.15;

            const translateY = useTransform(
            scrollYProgress,
            [cardStart, cardMiddle, nextCardStart, 1],
            [200, 0, -(features.length - 1 - index) * 90, -(features.length - 1 - index) * 90]
           );

           const opacity = useTransform(
           scrollYProgress,
           [cardStart, cardMiddle, 1],
           [0, 1, 1]
           );

           const scale = useTransform(
           scrollYProgress,
           [cardStart, cardMiddle, nextCardStart],
           [0.95, 1, 0.98]
           );

           const zIndex = index + 10;

           return (
              <motion.div
               key={index}
               style={{
               y: translateY,
               scale,
               opacity,
               zIndex,
            }}
            className="absolute left-0 right-0 p-8 bg-white rounded-2xl shadow-2xl border border-gray-100 hover:shadow-3xl transition-shadow duration-300" >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-3 bg-gradient-to-r from-[#FFB000]/10 to-[#C68900]/10 rounded-xl">
                <feature.icon className="w-6 h-6 text-[#FFB000]" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-base leading-relaxed">{feature.desc}</p>
               </div>
              </div>
            </motion.div>
            );
          })}
       </div>
     </div>
    </section>

      {/* Subscription Tiers */}
      <section id="subscription" className="bg-white py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          Boost <span className="bg-gradient-to-r from-[#FFB000] to-[#C68900] bg-clip-text text-transparent">Loyalty</span>, Your Way
        </h2>
           <p className="text-gray-600 text-lg mb-14">Choose a plan that fits your pace — from getting started to scaling smarter.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {/* Free Plan */}
               <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 flex flex-col">
                 <h3 className="text-xl font-semibold text-gray-800 mb-2">Free</h3>
                   <p className="text-3xl font-bold text-[#FFB000] mb-6">SAR 0</p>
                      <ul className="text-left space-y-3 flex-1">
                       <li>✔ Listed on Orbit</li>
                       <li>✔ 1 Basic Reward Program</li>
                       <li>✔ QR Code Generator</li>
                       <li className="text-gray-400 line-through">Analytics Dashboard</li>
                       <li className="text-gray-400 line-through">Campaign Promotion</li>
                     </ul>
                   <button className="mt-8 bg-[#FFB000] hover:bg-[#c68900] text-white font-semibold py-2 px-6 rounded-xl transition">Get Started</button>
            </div>
 
             {/* Starter Plan */}
              <div className="bg-white rounded-2xl shadow-lg border-2 border-[#FFB000] p-8 flex flex-col scale-105">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Starter</h3>
                  <p className="text-3xl font-bold text-[#FFB000] mb-6">SAR 149<span className="text-base font-medium text-gray-600">/month</span></p>
                    <ul className="text-left space-y-3 flex-1">
                     <li>✔ Up to 5 Reward Programs</li>
                     <li>✔ Dashboard & Analytics</li>
                     <li>✔ Custom Branding</li>
                     <li>✔ QR Code Generator</li>
                     <li>✔ Campaign Promotion</li>
                    </ul>
                  <button className="mt-8 bg-[#FFB000] hover:bg-[#c68900] text-white font-semibold py-2 px-6 rounded-xl transition">Subscribe</button>
            </div>

             {/* Growth Plan */}
               <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 flex flex-col">
                 <h3 className="text-xl font-semibold text-gray-800 mb-2">Growth</h3>
                   <p className="text-3xl font-bold text-[#FFB000] mb-6">SAR 499<span className="text-base font-medium text-gray-600">/month</span></p>
                     <ul className="text-left space-y-3 flex-1">
                      <li>✔ 10+ Reward Programs</li>
                      <li>✔ Campaign Builder</li>
                      <li>✔ Customer Segmentation</li>
                      <li>✔ WhatsApp & SMS Campaigns</li>
                      <li>✔ Priority Support</li>
                      <li>✔ PoS Integration (Foodics, Simphony...)</li>
                     </ul>
                    <button className="mt-8 bg-[#FFB000] hover:bg-[#c68900] text-white font-semibold py-2 px-6 rounded-xl transition">Subscribe</button>
            </div>
          </div>
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
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-800 mb-10">
            Turn first-timers into regulars with Orbit. <br /> Simple tools, powerful results.
          </p>

          <div className="flex justify-center gap-6 flex-wrap">
            <a
              href="#start"
              className="px-6 py-2 border-2 border-[#FFB000] text-[#FFB000] font-semibold rounded-full hover:bg-[#FFB000] hover:text-white transition-all"
            >
              Create My Program
            </a>
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