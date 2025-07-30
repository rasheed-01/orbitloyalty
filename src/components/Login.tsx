import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Orbit from '../assets/Orbit.png';

interface LoginProps {
  navigateToPage: (page: string) => void;
  onRoleSelect: (role: 'customer' | 'business') => void;
}

const Login: React.FC<LoginProps> = ({ navigateToPage, onRoleSelect }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showRoleModal, setShowRoleModal] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate login [replace with login logic]
    const user = { email, role: 'customer' };
    localStorage.setItem('currentUser', JSON.stringify(user));

    onRoleSelect('customer');
  };

  const handleBack = () => {
    navigateToPage('landing');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white relative px-4">
      {/* Orbit Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[50%] pointer-events-none z-0">
        <img
          src={Orbit}
          alt="Orbit Background"
          className="w-[90vw] max-w-4xl opacity-100"
        />
      </div>

      {/* Back Button */}
      <button
        onClick={handleBack}
        className="absolute top-6 left-6 text-[#FFB000] hover:underline flex items-center space-x-1 z-10"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      {/* Login Card */}
      <div className="bg-white bg-opacity-70 rounded-lg shadow-md p-8 w-full max-w-md relative z-10">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB000]"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB000]"
            />
          </div>

          <button
            type="submit"
            className="w-full border-2 border-[#FFB000] text-[#FFB000] py-2 rounded-full hover:bg-[#FFB000] hover:text-white transition-all font-medium"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <button
            onClick={() => setShowRoleModal(true)}
            className="text-[#FFB000] font-medium hover:underline"
          >
            Create one!
          </button>
        </p>
      </div>

      {/* Role Selection Modal */}
      {showRoleModal && (
       <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
         <div className="bg-white p-6 rounded-lg shadow-xl w-80 text-center space-y-4 transform transition-all duration-300 scale-95 opacity-0 animate-fadeIn">
          <h3 className="text-lg font-semibold">Who are you?</h3>
          <div className="flex flex-col gap-3">
             <button onClick={() => { onRoleSelect('customer'); navigateToPage('signup');}}
                     className="w-full py-2 border border-[#FFB000] text-[#FFB000] rounded-md hover:bg-[#FFB000] hover:text-white"
                >
                   Customer
             </button>
             <button onClick={() => { onRoleSelect('business'); navigateToPage('signup'); }}
                     className="w-full py-2 border border-[#FFB000] text-[#FFB000] rounded-md hover:bg-[#FFB000] hover:text-white"
                >
                    Business
             </button>
             <button onClick={() => setShowRoleModal(false)} className="text-sm text-gray-500 hover:underline mt-2"
                >
                    Cancel
             </button>
         </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default Login;