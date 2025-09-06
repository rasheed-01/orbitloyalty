import React, { useState, useEffect } from "react";
import { Camera, Users, UserPlus, UserX, Gift, Star } from "lucide-react";
import Orbit from "../assets/Orbit.png";
import OrbitLogo from "../assets/Orbit_Logo.svg";

interface BusinessAccountProps {
  navigateToPage: (page: string) => void;
}

const ORBIT_YELLOW = "#FFB000";

const BusinessAccount: React.FC<BusinessAccountProps> = ({ navigateToPage }) => {
  // Load existing user data from localStorage
  const storedUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  // Signup info
  const [name, setName] = useState(storedUser.name || "");
  const [email, setEmail] = useState(storedUser.email || "");
  const [phoneNumber, setPhoneNumber] = useState(storedUser.phoneNumber || "");
  const [crNumber, setCrNumber] = useState(storedUser.crNumber || "");
  const [password, setPassword] = useState(storedUser.password || "");

  // Profile setup info
  const [profileImage, setProfileImage] = useState<string | null>(storedUser.profileImage || null);
  const [description, setDescription] = useState(storedUser.description || "");
  const [category, setCategory] = useState(storedUser.category || "");
  const [location, setLocation] = useState(storedUser.location || "");

  const [openingHours, setOpeningHours] = useState(
    storedUser.openingHours ||
      ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => ({
        day,
        open: "06:00",
        close: "00:00",
        closed: false,
      }))
  );

  const [globalOpen, setGlobalOpen] = useState("06:00");
  const [globalClose, setGlobalClose] = useState("00:00");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleTimeChange = (index: number, type: "open" | "close", value: string) => {
    const updated = [...openingHours];
    updated[index][type] = value;
    setOpeningHours(updated);
  };

  const toggleClosed = (index: number) => {
    const updated = [...openingHours];
    updated[index].closed = !updated[index].closed;
    if (updated[index].closed) {
      updated[index].open = "";
      updated[index].close = "";
    } else {
      updated[index].open = "06:00";
      updated[index].close = "00:00";
    }
    setOpeningHours(updated);
  };

  const applyToAllDays = () => {
    const updated = openingHours.map((day) => {
      if (!day.closed) return { ...day, open: globalOpen, close: globalClose };
      return day;
    });
    setOpeningHours(updated);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser = {
      ...storedUser,
      name,
      email,
      phoneNumber,
      crNumber,
      password,
      profileImage,
      description,
      category,
      location,
      openingHours,
    };
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    alert("Profile updated successfully!");
  };

  return (
     <div className="min-h-screen bg-white px-5 md:px-10 py-10 relative">
      {/* Orbit ring background */}
      <img
        src={Orbit}
        alt="Orbit Ring"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] pointer-events-none"
      />

      {/* Header */}
      <header className="px-6 md:px-20 py-6 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <img
              src={OrbitLogo}
              alt="Orbit Logo"
              className="h-10 cursor-pointer"
              onClick={() => navigateToPage("business-dashboard")}
            />
          </div>
        </div>
        <nav className="flex items-center gap-8 text-sm text-gray-700">
          <button className="hover:text-black" onClick={() => navigateToPage("business-dashboard")}>
            Dashboard
          </button>
          <button className="hover:text-black" onClick={() => navigateToPage("business-programs")}>
            Programs
          </button>
          <button className="text-black font-semibold" onClick={() => navigateToPage("customer-account")}>
            Account
          </button>
        </nav>
      </header>

      {/* Form Content */}
      <main className="relative z-10 px-6 md:px-20 py-2">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">Business Account</h1>
        <form onSubmit={handleSave} className="space-y-8">
         {/* Profile Image */}
<div className="flex flex-col md:flex-row gap-6">
  {/* Profile Card */}
  <div className="flex flex-col items-center justify-between w-full md:w-1/3 bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg">
    {/* Centered Image */}
    <div className="flex-1 flex items-center justify-center w-full">
      <div className="w-44 h-44 rounded-full bg-[#FFB000]/30 flex items-center justify-center overflow-hidden">
        {profileImage ? (
          <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <Camera className="text-[#FFB000] w-12 h-12" />
        )}
      </div>
    </div>

    {/* Upload Button */}
    <label className="mt-4 border border-[#FFB000] text-[#FFB000] px-6 py-2 rounded-full cursor-pointer hover:bg-[#FFB000] hover:text-white transition">
      Upload Profile Picture
      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
    </label>
  </div>

  {/* Info Card */}
  <div className="flex-1 bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg flex flex-col gap-4">
    <div>
      <label className="block text-sm font-medium text-gray-700">Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none"
        required
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none"
        required
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">Phone Number</label>
      <input
        type="tel"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none"
        required
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">CR Number</label>
      <input
        type="text"
        value={crNumber}
        onChange={(e) => setCrNumber(e.target.value)}
        className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none"
      />
    </div>
  </div>
</div>

          {/* Business Details */}
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none"
              >
                <option value="">Select a category</option>
                <option>Restaurant</option>
                <option>Café</option>
                <option>Retail</option>
                <option>Services</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none"
              />
            </div>
          </div>

          {/* Opening Hours */}
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg">
            <label className="block text-sm font-medium mb-2">Opening Hours</label>

            {/* Global Apply */}
            <div className="flex items-center flex-wrap gap-2 mb-4">
              <span className="text-xs">Open</span>
              <input
                type="time"
                value={globalOpen}
                onChange={(e) => setGlobalOpen(e.target.value)}
                className="border rounded px-2 py-1 text-xs focus:ring-2 focus:ring-[#FFB000] outline-none"
              />
              <span className="text-xs">Close</span>
              <input
                type="time"
                value={globalClose}
                onChange={(e) => setGlobalClose(e.target.value)}
                className="border rounded px-2 py-1 text-xs focus:ring-2 focus:ring-[#FFB000] outline-none"
              />
              <button
                type="button"
                onClick={applyToAllDays}
                className="ml-2 text-xs text-[#FFB000] hover:underline"
              >
                Apply to All Days
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {openingHours.map((dayData, idx) => (
                <div
                  key={dayData.day}
                  className="border border-[#FFB000] rounded-md p-3 flex flex-col items-center"
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <p className="font-medium">{dayData.day}</p>
                    <label className="flex items-center space-x-2 text-sm">
                      <input
                        type="checkbox"
                        checked={dayData.closed}
                        onChange={() => toggleClosed(idx)}
                        className="accent-[#FFB000]"
                      />
                      <span>Closed</span>
                    </label>
                  </div>

                  <div className="flex flex-col space-y-1 w-full text-xs">
                    <div className="flex justify-between items-center">
                      <span>Open</span>
                      <input
                        type="time"
                        value={dayData.open}
                        onChange={(e) => handleTimeChange(idx, "open", e.target.value)}
                        disabled={dayData.closed}
                        className="border rounded px-2 py-1 text-xs focus:ring-2 focus:ring-[#FFB000] outline-none disabled:bg-gray-100"
                        required={!dayData.closed}
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Close</span>
                      <input
                        type="time"
                        value={dayData.close}
                        onChange={(e) => handleTimeChange(idx, "close", e.target.value)}
                        disabled={dayData.closed}
                        className="border rounded px-2 py-1 text-xs focus:ring-2 focus:ring-[#FFB000] outline-none disabled:bg-gray-100"
                        required={!dayData.closed}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-[#FFB000] text-white font-medium rounded-xl hover:bg-[#C68900] transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default BusinessAccount;
