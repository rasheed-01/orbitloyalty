import React, { useEffect, useState } from 'react';
import { Menu, X, Hand, ChevronLeft, ChevronRight, QrCode } from 'lucide-react';
import OrbitLogo from '../assets/Orbit_Logo.svg';

interface Program {
  id: number;
  name: string;
  image: string;
  progress: string;
  isNearReward: boolean;
  endsInDays: number;
  hasNewProgram: boolean;
  category: string;
  location: string;
  points: string;
  reward: string;
  isJoined: boolean;
}

interface CustomerDashboardProps {
  navigateToPage: (page: string) => void; 
}

const mockPrograms: Program[] = [
  {
    id: 1,
    name: 'Barns Cafe',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=150&q=80',
    progress: '1 stamp away',
    isNearReward: true,
    endsInDays: 10,
    hasNewProgram: false,
    category: 'Coffee',
    location: 'Riyadh',
    points: '1 stamp away',
    reward: 'Free drink on next visit',
    isJoined: false,
  },
  {
    id: 2,
    name: 'Dough House',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=150&q=80',
    progress: '2 stamps left',
    isNearReward: false,
    endsInDays: 5,
    hasNewProgram: true,
    category: 'Bakery',
    location: 'Jeddah',
    points: '2 stamps left',
    reward: 'Buy 5, get 1 free',
    isJoined: true,
  },
  {
    id: 3,
    name: 'Fit Fuel',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=200&q=80',
    progress: 'Subscription ends in 3 days',
    isNearReward: false,
    endsInDays: 3,
    hasNewProgram: false,
    category: 'Fitness',
    location: 'Dammam',
    points: '500 points left',
    reward: 'Free protein bar',
    isJoined: false,
  },
  {
    id: 4,
    name: 'Bean Co.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=150&q=80',
    progress: '500 points to go',
    isNearReward: false,
    endsInDays: 20,
    hasNewProgram: false,
    category: 'Coffee',
    location: 'Khobar',
    points: '500 points to go',
    reward: 'Free cup after 10 visits',
    isJoined: false,
  },
];

const CustomerDashboard: React.FC<CustomerDashboardProps> = ({ navigateToPage }) => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [greeting, setGreeting] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [showQROverlay, setShowQROverlay] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const parsed = JSON.parse(user);
      setUserName(parsed.name || '');

      const hour = new Date().getHours();
      let timeGreeting = '';
      if (hour >= 5 && hour < 12) timeGreeting = 'Good morning';
      else if (hour >= 12 && hour < 17) timeGreeting = 'Good afternoon';
      else if (hour >= 17 && hour < 22) timeGreeting = 'Good evening';
      else timeGreeting = 'Hello';
      setGreeting(timeGreeting);
    }
  }, []);

  const news = mockPrograms
    .filter(p => p.isNearReward || p.endsInDays <= 3 || p.hasNewProgram)
    .map(p => {
      if (p.isNearReward) return { message: `You're one stamp away from your reward at ${p.name}!`, businessLogo: p.image };
      if (p.endsInDays <= 3) return { message: `${p.name}'s program ends in ${p.endsInDays} days.`, businessLogo: p.image };
      if (p.hasNewProgram) return { message: `${p.name} just dropped a new loyalty program!`, businessLogo: p.image };
      return null;
    })
    .filter(Boolean) as { message: string; businessLogo: string }[];

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % news.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [news.length]);

  const topPrograms = mockPrograms
    .sort((a, b) => {
      const rewardA = a.isNearReward ? 1 : 0;
      const rewardB = b.isNearReward ? 1 : 0;
      if (rewardB - rewardA !== 0) return rewardB - rewardA;
      return a.endsInDays - b.endsInDays;
    })
    .slice(0, 3);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText('user-unique-code');
      alert('Code copied!');
    } catch {
      alert('Could not copy code.');
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 md:px-20 py-10 relative">

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0">
              <img
                src={OrbitLogo}
                alt="Orbit Logo"
                className="h-10 cursor-pointer"
                onClick={() => navigateToPage("customer-dashboard")}
              />
            </div>
            {/* Desktop nav */}
            <nav className="hidden md:flex space-x-12 text-sm font-medium text-gray-700">
              <button onClick={() => navigateToPage("customer-track")} className="hover:text-black transition">Track</button>
              <button onClick={() => navigateToPage("customer-explore")} className="hover:text-black transition">Explore</button>
              <button onClick={() => navigateToPage("customer-account")} className="hover:text-black transition">Account</button>
            </nav>

            {/* Mobile right icons */}
            <div className="md:hidden flex items-center gap-4">
              <button
                className="text-[#FFB000]"
                onClick={() => setShowQROverlay(true)}
                aria-label="Show QR Code"
              >
                <QrCode className="w-6 h-6" />
              </button>

              <button onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 px-4 py-6 space-y-4 text-sm font-medium text-gray-700">
            <button onClick={() => { navigateToPage("customer-track"); setMenuOpen(false); }}>Track</button> <br />
            <button onClick={() => { navigateToPage("customer-explore"); setMenuOpen(false); }}>Explore</button> <br />
            <button onClick={() => { navigateToPage("customer-account"); setMenuOpen(false); }}>Account</button>
          </div>
        )}
      </header>


      {/* Greeting */}
      <div className=" md:px-30 pt-8 pb-10"> 
       <h2 className="text-2xl font-semibold flex items-center gap-2">
        {greeting} {userName}
        <Hand className="w-6 h-6 text-[#FFB000] wave-hand align-middle -mt-1" />
       </h2>
      </div>
      {/* Carousel */}
      {news.length > 1 && (
        <div className="bg-[#FFB000] rounded-xl p-4 flex items-center justify-between mb-8 w-full max-w">
          <div className="flex items-center gap-3">
            <img src={news[carouselIndex].businessLogo} alt="" className="w-10 h-10 rounded-full border border-white" />
            <p className="text-sl text-white font-medium">{news[carouselIndex].message}</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-[3px]">
             <span className="w-[4px] h-[4px] bg-white rounded-full"></span>
             <span className="w-[4px] h-[4px] bg-white rounded-full"></span>
             <span className="w-[4px] h-[4px] bg-white rounded-full"></span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left: Programs you’re a part of */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4">Programs you’re a part of</h3>
          <div className="space-y-4">
            {topPrograms.map(p => (
              <div key={p.id} className="border border-[#FFB000] rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={p.image} alt={p.name} className="w-10 h-10 rounded-3xl object-cover" />
                  <div>
                    <p className="text-sm font-bold text-[#FFB000]">{p.name}</p>
                    <p className="text-xs text-gray-600">{p.progress}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-end mt-2">
              <button className="text-xs text-white bg-[#FFB000] hover:border border-[#FFB000] hover:text-[#FFB000] hover:bg-white rounded-xl px-2 py-1 inline-block">
                view all
              </button>
            </div>
          </div>
        </div>

        {/* Right: QR Code (Desktop only) */}
        <div className="hidden lg:flex bg-white rounded-xl p-6 flex-col items-center justify-center shadow-md">
          <h3 className="text-lg font-semibold mb-4">Your Unique QR code</h3>
          <div className="bg-gray-100 w-48 h-48 rounded-lg flex items-center justify-center mb-4">
            <img src="https://via.placeholder.com/150" alt="QR" className="w-32 h-32" />
          </div>
          <div className="flex gap-3">
            <button className="bg-black text-white text-xs px-4 py-2 rounded-full">Add to Apple Wallet</button>
          </div>
        </div>
      </div>

      {/* Latest Programs */}
      <div className="mt-16 bg-white rounded-xl p-6 shadow-md">
        <h3 className="text-lg font-semibold mb-6 text-center">Explore the Latest Programs</h3>
        <div className="relative">
          <button
            onClick={() =>
              document.getElementById('scrollContainer')?.scrollBy({ left: -300, behavior: 'smooth' })
            }
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 sm:hidden"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div
            id="scrollContainer"
            className="flex overflow-x-auto gap-6 scroll-smooth scrollbar-hide sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {mockPrograms.map((p) => (
              <div
                key={p.id}
                className="min-w-[280px] sm:min-w-0 flex-shrink-0 border rounded-lg shadow hover:shadow-md transition overflow-hidden bg-white"
              >
                <div className="relative h-36 overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-3 text-center">
                  <h3 className="text-lg font-semibold text-gray-800">{p.name}</h3>
                  <p className="text-sm text-gray-500">{p.category} · {p.location}</p>
                  <p className="text-sm mt-2 text-yellow-600">{p.points}</p>
                  <p className="text-xs text-gray-600">{p.reward}</p>
                  <button
                    className={`mt-3 w-full py-1 border rounded ${
                      p.isJoined
                        ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                        : 'border-[#FFB000] text-white bg-[#FFB000] hover:bg-white hover:text-[#FFB000] hover:border border-[#FFB000] transition'
                    }`}
                    disabled={p.isJoined}
                  >
                    {p.isJoined ? 'Joined' : 'Join'}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() =>
              document.getElementById('scrollContainer')?.scrollBy({ left: 300, behavior: 'smooth' })
            }
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 sm:hidden"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* QR Overlay (mobile only) */}
      {showQROverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 lg:hidden">
          <div className="bg-white rounded-xl p-6 flex flex-col items-center w-80">
            <button className="self-start mb-4 text-[#FFB000]" onClick={() => setShowQROverlay(false)}>
               Back
            </button>
            <h3 className="text-lg font-semibold mb-4">Your Unique QR Code</h3>
            <div className="bg-gray-100 w-48 h-48 rounded-lg flex items-center justify-center mb-4">
              <img src="https://via.placeholder.com/150" alt="QR" className="w-32 h-32" />
            </div>
            <button onClick={copyCode} className="bg-black text-white px-4 py-2 rounded-full mb-2">
              Add to Wallet
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;

