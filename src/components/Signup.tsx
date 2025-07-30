import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Orbit from '../assets/Orbit.png';

interface SignupProps {
  userRole: 'customer' | 'business' | null;
  onRoleSelect: (role: 'customer' | 'business' | null) => void;
  navigateToPage: (page: string) => void;
}

const Signup: React.FC<SignupProps> = ({ userRole, navigateToPage }) => {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'female' | 'male' | ''>('');
  const [crNumber, setCrNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleBack = () => {
    navigateToPage('landing');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newUser = {
      email,
      phoneNumber,
      name,
      gender: userRole === 'customer' ? gender : undefined,
      crNumber: userRole === 'business' ? crNumber : undefined,
      password,
      role: userRole,
    };

    localStorage.setItem('currentUser', JSON.stringify(newUser));

    navigateToPage('customer-explore');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white relative px-4">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="absolute top-6 left-6 text-[#FFB000] hover:underline flex items-center space-x-1"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      <div className="bg-white bg-opacity-60 p-8 w-full max-w-md rounded-lg z-10">
        <h2 className="text-2xl font-bold text-center mb-6">
          Welcome to <span className="bg-gradient-to-r from-[#C68900] to-[#FFB000] bg-clip-text text-transparent">Orbit</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone number</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none"
            />
          </div>

          {userRole === 'customer' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`px-4 py-2 rounded-md border text-sm font-medium ${
                    gender === 'female'
                      ? 'bg-[#FFB000] text-white border-[#FFB000]'
                      : 'border-[#FFB000] text-[#FFB000]'
                  }`}
                >
                  Female
                </button>
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`px-4 py-2 rounded-md border text-sm font-medium ${
                    gender === 'male'
                      ? 'bg-[#FFB000] text-white border-[#FFB000]'
                      : 'border-[#FFB000] text-[#FFB000]'
                  }`}
                >
                  Male
                </button>
              </div>
            </div>
          )}

          {userRole === 'business' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">CR Number</label>
              <input
                type="text"
                value={crNumber}
                onChange={(e) => setCrNumber(e.target.value)}
                required
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full border-2 border-[#FFB000] text-[#FFB000] py-2 rounded-md font-medium hover:bg-[#FFB000] hover:text-white transition-all"
          >
            Sign up
          </button>
        </form>
      </div>

      {/* Orbit Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[50%] pointer-events-none z-0">
        <img
          src={Orbit}
          alt="Orbit Background"
          className="w-[90vw] max-w-4xl opacity-100"
        />
      </div>
    </div>
  );
};

export default Signup;