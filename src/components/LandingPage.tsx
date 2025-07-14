import React from 'react';
import { QrCode, Store, Users, Wallet, Scan, Star, MapPin, ArrowRight, Shield, Smartphone } from 'lucide-react';

interface LandingPageProps {
  onRoleSelect: (role: 'business' | 'customer') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onRoleSelect }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
      {/* Header */}
      <header className="relative z-10 bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
                <QrCode className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">LoyaltyHub</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-white/80 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="text-white/80 hover:text-white transition-colors">How It Works</a>
              <a href="#benefits" className="text-white/80 hover:text-white transition-colors">Benefits</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            One Platform,
            <span className="block text-blue-200">All Your Loyalty Rewards</span>
          </h2>
          <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto">
            Connect businesses and customers through a unified loyalty rewards platform. 
            One QR code, unlimited possibilities.
          </p>
          
          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div 
              onClick={() => onRoleSelect('business')}
              className="group bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
            >
              <div className="bg-blue-500 p-4 rounded-xl inline-block mb-6">
                <Store className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">For Businesses</h3>
              <p className="text-white/70 mb-6">
                Set up your loyalty program, connect with customers, and grow your business through rewards.
              </p>
              <div className="flex items-center justify-center text-white group-hover:text-blue-200 transition-colors">
                <span className="font-semibold">Get Started</span>
                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div 
              onClick={() => onRoleSelect('customer')}
              className="group bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
            >
              <div className="bg-green-500 p-4 rounded-xl inline-block mb-6">
                <Users className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">For Customers</h3>
              <p className="text-white/70 mb-6">
                Discover amazing businesses, collect rewards, and enjoy exclusive benefits with one QR code.
              </p>
              <div className="flex items-center justify-center text-white group-hover:text-green-200 transition-colors">
                <span className="font-semibold">Explore Now</span>
                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to create, manage, and enjoy loyalty rewards programs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 p-4 rounded-xl inline-block mb-6">
                <QrCode className="h-12 w-12 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Universal QR Code</h4>
              <p className="text-gray-600">
                One QR code links all your loyalty programs. Store it in Apple Wallet for easy access.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-green-100 p-4 rounded-xl inline-block mb-6">
                <Scan className="h-12 w-12 text-green-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Instant Scanning</h4>
              <p className="text-gray-600">
                Cashiers can quickly scan and award loyalty points at the point of sale.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-orange-100 p-4 rounded-xl inline-block mb-6">
                <Wallet className="h-12 w-12 text-orange-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Wallet Integration</h4>
              <p className="text-gray-600">
                Seamlessly integrate with Apple Wallet for convenient access and recovery.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-purple-100 p-4 rounded-xl inline-block mb-6">
                <MapPin className="h-12 w-12 text-purple-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Business Directory</h4>
              <p className="text-gray-600">
                Discover local businesses offering loyalty rewards in your area.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-red-100 p-4 rounded-xl inline-block mb-6">
                <Star className="h-12 w-12 text-red-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Smart Rewards</h4>
              <p className="text-gray-600">
                Customizable loyalty programs with flexible point systems and rewards.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-indigo-100 p-4 rounded-xl inline-block mb-6">
                <Shield className="h-12 w-12 text-indigo-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Secure & Reliable</h4>
              <p className="text-gray-600">
                Enterprise-grade security with real-time synchronization across all devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple steps to get started with the ultimate loyalty rewards experience
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-6">1</div>
              <h4 className="text-lg font-bold text-gray-900 mb-3">Sign Up</h4>
              <p className="text-gray-600">Choose your role and create your account in seconds</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-6">2</div>
              <h4 className="text-lg font-bold text-gray-900 mb-3">Set Up</h4>
              <p className="text-gray-600">Businesses create loyalty programs, customers get QR codes</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-6">3</div>
              <h4 className="text-lg font-bold text-gray-900 mb-3">Connect</h4>
              <p className="text-gray-600">Customers discover businesses and join loyalty programs</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-6">4</div>
              <h4 className="text-lg font-bold text-gray-900 mb-3">Earn Rewards</h4>
              <p className="text-gray-600">Scan QR codes in-store to collect points and rewards</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h3>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of businesses and customers already using LoyaltyHub
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => onRoleSelect('business')}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center"
            >
              <Store className="mr-2 h-5 w-5" />
              Start as Business
            </button>
            <button 
              onClick={() => onRoleSelect('customer')}
              className="bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-400 transition-colors flex items-center justify-center"
            >
              <Users className="mr-2 h-5 w-5" />
              Join as Customer
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <QrCode className="h-8 w-8" />
              <span className="text-xl font-bold">LoyaltyHub</span>
            </div>
            <p className="text-gray-400">© 2025 LoyaltyHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;