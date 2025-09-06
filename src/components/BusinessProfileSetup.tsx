import React, { useState } from "react";
import orbitRing from "../assets/Orbit.png";
import { Camera } from "lucide-react";

interface BusinessProfileSetupProps {
  navigateToPage: (page: string) => void;
}

const BusinessProfileSetup: React.FC<BusinessProfileSetupProps> = ({ navigateToPage }) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [openingHours, setOpeningHours] = useState(
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with opening hours:", openingHours);
    // TODO: send data to backend
    // Navigate to business dashboard
    navigateToPage("business-dashboard");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-white overflow-hidden">
      {/* Left Section - Form */}
      <div className="w-full md:w-1/2 h-full flex flex-col justify-between items-center px-8 md:px-12 py-8 mt-10 mb-10">
        <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col h-full mx-auto">
          {/* Scrollable Form Fields */}
          <div className="flex-1 overflow-y-auto space-y-6 pb-24 relative px-4 md:px-6" style={{ scrollbarGutter: "stable both-edges" }}>
            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <input
                type="text"
                placeholder="Enter a description"
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-[#FFB000] outline-none"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                className="w-full border rounded-md px-3 py-2 bg-white focus:ring-2 focus:ring-[#FFB000] outline-none"
                required
              >
                <option value="">Select a category</option>
                <option>Restaurant</option>
                <option>Café</option>
                <option>Retail</option>
                <option>Services</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                placeholder="Enter location URL"
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-[#FFB000] outline-none"
                required
              />
            </div>

            {/* Global Apply Times */}
            <div className="border border-[#FFB000] rounded-md p-3 mb-4">
              <label className="block text-sm font-medium mb-2">
                Set same opening hours for all days
              </label>
              <div className="flex items-center flex-wrap gap-2">
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
                  Apply
                </button>
              </div>
            </div>

            {/* Opening Hours */}
            <div>
              <label className="block text-sm font-medium mb-2">Opening hours</label>
              <div className="grid grid-cols-2 gap-4">
                {openingHours.map((dayData, idx) => (
                  <div key={dayData.day} className="border border-[#FFB000] rounded-md p-3 flex flex-col items-center">
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
          </div>

          {/* Fade Shadow & Join Button */}
          <div className="relative px-4 md:px-6">
            <div className="absolute -top-6 inset-x-0 h-6 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
            <button
              type="submit"
              className="w-full border-2 border-[#FFB000] text-[#FFB000] font-medium py-2 rounded-md hover:bg-[#FFB000] hover:text-white transition mt-4"
            >
              Join
            </button>
          </div>
        </form>
      </div>

      {/* Right Section - Profile */}
      <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-center relative overflow-hidden bg-white">
        <img
          src={orbitRing}
          alt="Orbit Ring"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-xl opacity-50 pointer-events-none"
        />

        <div className="relative bg-white shadow-xl rounded-3xl p-8 flex flex-col items-center z-10">
          <h2 className="text-2xl font-semibold text-[#FFB000] mb-6">Setup Your Profile</h2>

          <div className="w-44 h-44 rounded-full bg-[#FFB000]/30 flex items-center justify-center overflow-hidden">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <Camera className="text-[#FFB000] w-12 h-12" />
            )}
          </div>

          <label className="mt-6 border border-[#FFB000] text-[#FFB000] px-6 py-2 rounded-full cursor-pointer hover:bg-[#FFB000] hover:text-white transition">
            Set Profile Picture
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfileSetup;


