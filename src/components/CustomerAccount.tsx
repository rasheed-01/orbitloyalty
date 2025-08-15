import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import OrbitLogo from "../assets/Orbit_Logo.svg";
import Orbit from "../assets/Orbit.png";
import type { CurrentPage } from "../App";
import { QRCodeSVG } from "qrcode.react";

interface CustomerAccountProps {
  navigateToPage: (page: CurrentPage) => void;
}

const mockUser = {
  id: "user-123456",
  name: "John Doe",
  email: "John@example.com",
  phone: "+966 55 555 5555",
};

const CustomerAccount: React.FC<CustomerAccountProps> = ({ navigateToPage }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [name, setName] = useState(mockUser.name);
  const [isEditingName, setIsEditingName] = useState(false);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(mockUser.id);
      alert("Code Added!");
    } catch {
      alert("Could not add code.");
    }
  };

  return (
     <div className="min-h-screen bg-white px-6 md:px-20 py-10">
    <div className="min-h-screen bg-white relative">
      {/* Orbit background */}
      <img
        src={Orbit}
        alt="Orbit background"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
      />

      {/* Page content */}
      <div className="relative z-10 flex flex-col min-h-screen">
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
              <nav className="hidden md:flex space-x-12 text-sm font-medium text-gray-700">
                <button onClick={() => navigateToPage("customer-track")} className="hover:text-black transition">Track</button>
                <button onClick={() => navigateToPage("customer-explore")} className="hover:text-black transition">Explore</button>
                <button onClick={() => navigateToPage("customer-account")} className="hover:text-black transition">Account</button>
              </nav>
              <div className="md:hidden flex items-center">
                <button onClick={() => setMenuOpen(!menuOpen)}>
                  {menuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
                </button>
              </div>
            </div>
          </div>
          {menuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200 px-4 py-6 space-y-4 text-sm font-medium text-gray-700">
              <button onClick={() => { navigateToPage("customer-track"); setMenuOpen(false); }}>Track</button> <br />
              <button onClick={() => { navigateToPage("customer-explore"); setMenuOpen(false); }}>Explore</button> <br />
              <button onClick={() => { navigateToPage("customer-account"); setMenuOpen(false); }}>Account</button>
            </div>
          )}
        </header>

        {/* Centered content */}
        <main className="flex-1 flex items-center justify-center px-6 py-10">
          <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Account Info */}
            <section className="col-span-1 md:col-span-2 space-y-6">
              <div className="bg-white/80 border rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                <div className="space-y-4">
                  {/* Name - Editable */}
                  <div className="flex items-center gap-3">
                    {isEditingName ? (
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFB000]"
                      />
                    ) : (
                      <p className="text-lg font-medium">{name}</p>
                    )}
                    <button
                      onClick={() => setIsEditingName(!isEditingName)}
                      className="px-3 py-1 bg-[#FFB000] text-white rounded hover:bg-[#FFC94A] transition"
                    >
                      {isEditingName ? "Save" : "Edit"}
                    </button>
                  </div>

                  {/* Email - Non-editable */}
                  <div>
                    <p className="text-gray-500">Email</p>
                    <p className="font-medium">{mockUser.email}</p>
                  </div>

                  {/* Phone - Non-editable */}
                  <div>
                    <p className="text-gray-500">Phone Number</p>
                    <p className="font-medium">{mockUser.phone}</p>
                  </div>

                  {/* Password - Hidden */}
                  <div>
                    <p className="text-gray-500">Password</p>
                    <p className="font-medium">********</p>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="bg-white/80 border rounded-lg shadow-sm p-6 flex flex-col items-center">
                <h2 className="text-xl font-semibold mb-4">Your Unique QR Code</h2>
                <div className="p-4 border rounded-lg">
                  <QRCodeSVG value={mockUser.id} size={220} includeMargin />
                </div>
                <p className="mt-4 text-sm text-gray-500 text-center">
                  Scan this code at checkout to earn or redeem rewards.
                </p>
                <div className="mt-3 flex gap-3">
                  <button
                    onClick={copyCode}
                    className="px-4 py-2 border border-[#FFB000] text-[#FFB000] rounded-lg hover:bg-[#FFB000] hover:text-white transition"
                  >
                    Add to Wallet
                  </button>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
    </div>
  );
};

export default CustomerAccount;