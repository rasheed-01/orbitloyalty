import React, { useState } from 'react';
import { Store, Users, QrCode, Settings, BarChart3, Plus, Scan, ArrowLeft, Star, Trophy, Gift } from 'lucide-react';

interface BusinessDashboardProps {
  onNavigate: (page: string) => void;
  currentUser: any;
  setCurrentUser: (user: any) => void;
}

const BusinessDashboard: React.FC<BusinessDashboardProps> = ({ onNavigate, currentUser, setCurrentUser }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [businessData, setBusinessData] = useState({
    name: 'Cafe Mocha',
    category: 'Coffee & Bakery',
    location: 'Downtown Plaza',
    loyaltyProgram: {
      pointsPerDollar: 1,
      rewardThreshold: 100,
      rewardValue: 10
    }
  });

  const [isRegistered, setIsRegistered] = useState(false);

  const handleBusinessRegistration = () => {
    setIsRegistered(true);
    setCurrentUser({ 
      type: 'business', 
      ...businessData,
      id: 'business_' + Math.random().toString(36).substr(2, 9)
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
                <h1 className="text-2xl font-bold text-gray-900">Business Registration</h1>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-2xl mx-auto py-12 px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="bg-blue-100 p-4 rounded-xl inline-block mb-4">
                <Store className="h-12 w-12 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Register Your Business</h2>
              <p className="text-gray-600">Set up your loyalty program and start connecting with customers</p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleBusinessRegistration(); }} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                <input
                  type="text"
                  value={businessData.name}
                  onChange={(e) => setBusinessData({...businessData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your business name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={businessData.category}
                  onChange={(e) => setBusinessData({...businessData, category: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Coffee & Bakery">Coffee & Bakery</option>
                  <option value="Restaurant">Restaurant</option>
                  <option value="Retail">Retail</option>
                  <option value="Beauty & Wellness">Beauty & Wellness</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={businessData.location}
                  onChange={(e) => setBusinessData({...businessData, location: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your business location"
                />
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Loyalty Program Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Points per $1</label>
                    <input
                      type="number"
                      value={businessData.loyaltyProgram.pointsPerDollar}
                      onChange={(e) => setBusinessData({
                        ...businessData, 
                        loyaltyProgram: {...businessData.loyaltyProgram, pointsPerDollar: parseInt(e.target.value)}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Reward Threshold</label>
                    <input
                      type="number"
                      value={businessData.loyaltyProgram.rewardThreshold}
                      onChange={(e) => setBusinessData({
                        ...businessData, 
                        loyaltyProgram: {...businessData.loyaltyProgram, rewardThreshold: parseInt(e.target.value)}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Reward Value ($)</label>
                    <input
                      type="number"
                      value={businessData.loyaltyProgram.rewardValue}
                      onChange={(e) => setBusinessData({
                        ...businessData, 
                        loyaltyProgram: {...businessData.loyaltyProgram, rewardValue: parseInt(e.target.value)}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Create Business Account
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
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
                <h1 className="text-2xl font-bold text-gray-900">{businessData.name}</h1>
                <p className="text-gray-600">{businessData.category} • {businessData.location}</p>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('pos-scanner')}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center"
            >
              <Scan className="mr-2 h-5 w-5" />
              POS Scanner
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-white p-1 rounded-xl mb-8 shadow-sm">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
              activeTab === 'overview' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <BarChart3 className="h-5 w-5 mx-auto mb-1" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('customers')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
              activeTab === 'customers' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Users className="h-5 w-5 mx-auto mb-1" />
            Customers
          </button>
          <button
            onClick={() => setActiveTab('loyalty')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
              activeTab === 'loyalty' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Gift className="h-5 w-5 mx-auto mb-1" />
            Loyalty Program
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Customers</p>
                    <p className="text-2xl font-bold text-gray-900">1,234</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Star className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Points Awarded</p>
                    <p className="text-2xl font-bold text-gray-900">45,678</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Trophy className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Rewards Claimed</p>
                    <p className="text-2xl font-bold text-gray-900">89</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <QrCode className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Scans Today</p>
                    <p className="text-2xl font-bold text-gray-900">23</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-lg mr-3">
                        <QrCode className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Customer earned 15 points</p>
                        <p className="text-sm text-gray-600">2 minutes ago</p>
                      </div>
                    </div>
                    <span className="text-green-600 font-semibold">+15 pts</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Customers Tab */}
        {activeTab === 'customers' && (
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Your Customers</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { name: 'John Smith', points: 150, lastVisit: '2 hours ago', status: 'Active' },
                  { name: 'Sarah Johnson', points: 85, lastVisit: '1 day ago', status: 'Active' },
                  { name: 'Mike Davis', points: 220, lastVisit: '3 days ago', status: 'VIP' },
                  { name: 'Emma Wilson', points: 45, lastVisit: '1 week ago', status: 'New' }
                ].map((customer, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <div className="bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center">
                        <span className="font-semibold text-gray-600">{customer.name.charAt(0)}</span>
                      </div>
                      <div className="ml-4">
                        <p className="font-medium text-gray-900">{customer.name}</p>
                        <p className="text-sm text-gray-600">Last visit: {customer.lastVisit}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{customer.points} points</p>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        customer.status === 'VIP' ? 'bg-purple-100 text-purple-800' :
                        customer.status === 'Active' ? 'bg-green-100 text-green-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {customer.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Loyalty Program Tab */}
        {activeTab === 'loyalty' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Program Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Points per $1 spent</label>
                  <input
                    type="number"
                    value={businessData.loyaltyProgram.pointsPerDollar}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Points for reward</label>
                  <input
                    type="number"
                    value={businessData.loyaltyProgram.rewardThreshold}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reward value ($)</label>
                  <input
                    type="number"
                    value={businessData.loyaltyProgram.rewardValue}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Reward Templates</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Free Coffee</h4>
                  <p className="text-gray-600 text-sm mb-3">100 points = 1 free coffee (any size)</p>
                  <span className="bg-green-100 text-green-800 px-2 py-1 text-xs rounded-full">Active</span>
                </div>
                <div className="border border-gray-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">10% Off</h4>
                  <p className="text-gray-600 text-sm mb-3">150 points = 10% off next purchase</p>
                  <span className="bg-green-100 text-green-800 px-2 py-1 text-xs rounded-full">Active</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessDashboard;