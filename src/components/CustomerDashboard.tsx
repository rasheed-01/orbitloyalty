import React from 'react';
import { QrCode, Wallet, Star, Gift, ArrowLeft, Smartphone, Download, Plus } from 'lucide-react';

interface CustomerDashboardProps {
  onNavigate: (page: string) => void;
  currentUser: any;
}

const CustomerDashboard: React.FC<CustomerDashboardProps> = ({ onNavigate, currentUser }) => {
  const loyaltyPrograms = [
    {
      id: 1,
      businessName: 'Style Studio',
      points: 125,
      nextReward: 150,
      rewardDescription: 'Free treatment',
      category: 'Beauty & Wellness',
      color: 'purple'
    },
    {
      id: 2,
      businessName: 'Cafe Mocha',
      points: 85,
      nextReward: 100,
      rewardDescription: 'Free coffee',
      category: 'Coffee & Bakery',
      color: 'blue'
    },
    {
      id: 3,
      businessName: 'Fresh Bites',
      points: 45,
      nextReward: 200,
      rewardDescription: '$10 off',
      category: 'Restaurant',
      color: 'green'
    }
  ];

  const recentActivity = [
    { business: 'Style Studio', points: 15, date: '2 hours ago', type: 'earned' },
    { business: 'Cafe Mocha', points: 10, date: '1 day ago', type: 'earned' },
    { business: 'Fresh Bites', points: 100, date: '2 days ago', type: 'redeemed' },
    { business: 'Style Studio', points: 8, date: '3 days ago', type: 'earned' }
  ];

  const addToAppleWallet = () => {
    // Simulate Apple Wallet integration
    alert('QR Code added to Apple Wallet! (This is a demo)');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => onNavigate('customer-explore')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Loyalty Wallet</h1>
                <p className="text-gray-600">Welcome back, {currentUser?.name || 'Customer'}</p>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('customer-explore')}
              className="bg-green-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center"
            >
              <Plus className="mr-2 h-5 w-5" />
              Explore
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* QR Code Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Universal QR Code</h2>
          <p className="text-gray-600 mb-6">Show this code at any participating business to earn points</p>
          
          <div className="bg-gray-100 p-8 rounded-xl inline-block mb-6">
            <div className="bg-white p-6 rounded-lg">
              <QrCode className="h-32 w-32 text-gray-800 mx-auto" />
              <p className="text-center mt-4 font-mono text-lg font-bold text-gray-800">
                {currentUser?.qrCode || 'ABC123DEF456'}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={addToAppleWallet}
              className="bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center"
            >
              <Wallet className="mr-2 h-5 w-5" />
              Add to Apple Wallet
            </button>
            <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center">
              <Download className="mr-2 h-5 w-5" />
              Download QR Code
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Points</p>
                <p className="text-2xl font-bold text-gray-900">
                  {loyaltyPrograms.reduce((sum, program) => sum + program.points, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <Gift className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Programs Joined</p>
                <p className="text-2xl font-bold text-gray-900">{loyaltyPrograms.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Wallet className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rewards Available</p>
                <p className="text-2xl font-bold text-gray-900">
                  {loyaltyPrograms.filter(p => p.points >= p.nextReward).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Active Loyalty Programs */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">Your Loyalty Programs</h3>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {loyaltyPrograms.map((program) => (
                <div key={program.id} className="border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">{program.businessName}</h4>
                      <p className="text-gray-600">{program.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">{program.points}</p>
                      <p className="text-sm text-gray-600">points</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Progress to next reward</span>
                      <span>{program.points}/{program.nextReward}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          program.color === 'purple' ? 'bg-purple-600' :
                          program.color === 'blue' ? 'bg-blue-600' :
                          'bg-green-600'
                        }`}
                        style={{ width: `${Math.min((program.points / program.nextReward) * 100, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Next reward:</p>
                      <p className="font-semibold text-gray-900">{program.rewardDescription}</p>
                    </div>
                    {program.points >= program.nextReward && (
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                        Claim Reward
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg mr-3 ${
                      activity.type === 'earned' ? 'bg-green-100' : 'bg-orange-100'
                    }`}>
                      {activity.type === 'earned' ? (
                        <Plus className="h-4 w-4 text-green-600" />
                      ) : (
                        <Gift className="h-4 w-4 text-orange-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {activity.type === 'earned' ? 'Earned' : 'Redeemed'} {activity.points} points
                      </p>
                      <p className="text-sm text-gray-600">
                        {activity.business} • {activity.date}
                      </p>
                    </div>
                  </div>
                  <span className={`font-semibold ${
                    activity.type === 'earned' ? 'text-green-600' : 'text-orange-600'
                  }`}>
                    {activity.type === 'earned' ? '+' : '-'}{activity.points} pts
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;