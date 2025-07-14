import React, { useState } from 'react';
import { Search, MapPin, Star, QrCode, ArrowLeft, User, Wallet, Heart, Clock, Gift } from 'lucide-react';

interface CustomerExploreProps {
  onNavigate: (page: string) => void;
  currentUser: any;
  setCurrentUser: (user: any) => void;
}

const CustomerExplore: React.FC<CustomerExploreProps> = ({ onNavigate, currentUser, setCurrentUser }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isRegistered, setIsRegistered] = useState(false);
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const businesses = [
    {
      id: 1,
      name: 'Cafe Mocha',
      category: 'Coffee & Bakery',
      location: 'Downtown Plaza',
      rating: 4.8,
      distance: '0.2 mi',
      image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400',
      points: '1 point per $1',
      reward: 'Free coffee at 100 points',
      isJoined: false
    },
    {
      id: 2,
      name: 'Fresh Bites',
      category: 'Restaurant',
      location: 'Main Street',
      rating: 4.6,
      distance: '0.5 mi',
      image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400',
      points: '2 points per $1',
      reward: '$10 off at 200 points',
      isJoined: false
    },
    {
      id: 3,
      name: 'Style Studio',
      category: 'Beauty & Wellness',
      location: 'Fashion District',
      rating: 4.9,
      distance: '0.8 mi',
      image: 'https://images.pexels.com/photos/1319461/pexels-photo-1319461.jpeg?auto=compress&cs=tinysrgb&w=400',
      points: '1 point per $2',
      reward: 'Free treatment at 150 points',
      isJoined: true
    },
    {
      id: 4,
      name: 'Tech Haven',
      category: 'Retail',
      location: 'Tech Center',
      rating: 4.7,
      distance: '1.2 mi',
      image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400',
      points: '1 point per $3',
      reward: '5% off at 300 points',
      isJoined: false
    }
  ];

  const categories = ['All', 'Coffee & Bakery', 'Restaurant', 'Beauty & Wellness', 'Retail', 'Fitness'];

  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         business.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || business.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCustomerRegistration = () => {
    setIsRegistered(true);
    setCurrentUser({
      type: 'customer',
      ...customerData,
      id: 'customer_' + Math.random().toString(36).substr(2, 9),
      qrCode: Math.random().toString(36).substr(2, 12).toUpperCase()
    });
  };

  if (!isRegistered) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => onNavigate('landing')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <h1 className="text-2xl font-bold text-gray-900">Customer Registration</h1>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-2xl mx-auto py-12 px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="bg-green-100 p-4 rounded-xl inline-block mb-4">
                <User className="h-12 w-12 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Join LoyaltyHub</h2>
              <p className="text-gray-600">Create your account and start earning rewards from local businesses</p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleCustomerRegistration(); }} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={customerData.name}
                  onChange={(e) => setCustomerData({...customerData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={customerData.email}
                  onChange={(e) => setCustomerData({...customerData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={customerData.phone}
                  onChange={(e) => setCustomerData({...customerData, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div className="bg-green-50 p-6 rounded-xl">
                <div className="flex items-center mb-3">
                  <QrCode className="h-6 w-6 text-green-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">Your Unique QR Code</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  After registration, you'll receive a unique QR code that links all your loyalty programs. 
                  This code can be stored in Apple Wallet for easy access.
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors"
              >
                Create Customer Account
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => onNavigate('landing')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Explore Businesses</h1>
                <p className="text-gray-600">Find loyalty rewards near you</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => onNavigate('customer-dashboard')}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-green-700 transition-colors"
              >
                <Wallet className="h-5 w-5" />
                <span>My Wallet</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search businesses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div className="flex space-x-2 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Business Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map((business) => (
            <div key={business.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <img
                  src={business.image}
                  alt={business.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
                    <Heart className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {business.points}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{business.name}</h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium text-gray-600">{business.rating}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-1">{business.category}</p>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{business.location} • {business.distance}</span>
                </div>

                <div className="bg-green-50 p-3 rounded-lg mb-4">
                  <div className="flex items-center mb-1">
                    <Gift className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm font-medium text-green-800">Reward</span>
                  </div>
                  <p className="text-sm text-green-700">{business.reward}</p>
                </div>

                <button
                  className={`w-full py-3 rounded-xl font-semibold transition-colors ${
                    business.isJoined
                      ? 'bg-gray-100 text-gray-600 cursor-default'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                  disabled={business.isJoined}
                >
                  {business.isJoined ? 'Already Joined' : 'Join Loyalty Program'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredBusinesses.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-100 p-4 rounded-xl inline-block mb-4">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No businesses found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerExplore;