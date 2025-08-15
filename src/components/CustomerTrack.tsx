import React, { useMemo, useState } from "react";
import { Star, Coffee, Gift, Heart, Menu, X, ChevronDown } from "lucide-react";
import OrbitLogo from "../assets/Orbit_Logo.svg";

type StampType = "star" | "coffee" | "gift" | "heart";

interface CustomerTrackProps {
  navigateToPage: (page: CurrentPage) => void;
}

interface Program {
  id: number;
  name: string;
  image: string;
  logo: string;
  category?: string;
  location?: string;
  type: "points" | "stamps";
  currentPoints?: number;
  targetPoints?: number;
  currentStamps?: number;
  targetStamps?: number;
  stampType?: StampType;
  stampColor?: string;
  reward: string;
  isRedeemed: boolean;
  isReadyToRedeem: boolean;
}

const mockPrograms: Program[] = [
  {
    id: 1,
    name: "Coffee Club",
    image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg",
    logo: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg",
    category: "Cafe",
    location: "Downtown",
    type: "stamps",
    currentStamps: 4,
    targetStamps: 5,
    stampType: "coffee",
    stampColor: "#FFB000",
    reward: "Free large coffee",
    isRedeemed: false,
    isReadyToRedeem: false,
  },
  {
    id: 2,
    name: "Point Express",
    image: "https://images.pexels.com/photos/545069/pexels-photo-545069.jpeg",
    logo: "https://images.pexels.com/photos/545069/pexels-photo-545069.jpeg",
    category: "Retail",
    location: "Mall",
    type: "points",
    currentPoints: 420,
    targetPoints: 500,
    reward: "SAR 50 voucher",
    isRedeemed: false,
    isReadyToRedeem: false,
  },
  {
    id: 3,
    name: "Sweet Tooth",
    image: "https://images.pexels.com/photos/302680/pexels-photo-302680.jpeg",
    logo: "https://images.pexels.com/photos/302680/pexels-photo-302680.jpeg",
    category: "Dessert",
    location: "King Street",
    type: "stamps",
    currentStamps: 6,
    targetStamps: 6,
    stampType: "gift",
    stampColor: "#FFB000",
    reward: "Free dessert",
    isRedeemed: false,
    isReadyToRedeem: true,
  },
  {
    id: 4,
    name: "Restaurant",
    image: "https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg",
    logo: "https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg",
    category: "Cafe",
    location: "Main St",
    type: "points",
    currentPoints: 500,
    targetPoints: 500,
    reward: "Free drink",
    isRedeemed: true,
    isReadyToRedeem: false,
  },
];

const stampIcons: Record<StampType, React.ComponentType<any>> = {
  star: Star,
  coffee: Coffee,
  gift: Gift,
  heart: Heart,
};

const CustomerTrack: React.FC<CustomerTrackProps> = ({ navigateToPage }) => {
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState<"name" | "progress">("name");
  const [menuOpen, setMenuOpen] = useState(false);
  const [filterOption, setFilterOption] = useState<"all" | "redeemed" | "active">("all");
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [overlayProgram, setOverlayProgram] = useState<Program | null>(null);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openOverlay = (program: Program) => setOverlayProgram(program);
  const closeOverlay = () => setOverlayProgram(null);

  const filtered = useMemo(() => {
    const percent = (pr: Program) =>
      pr.type === "points"
        ? (pr.currentPoints ?? 0) / (pr.targetPoints ?? 1)
        : (pr.currentStamps ?? 0) / (pr.targetStamps ?? 1);

    return mockPrograms
      .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
      .filter((p) => {
        if (filterOption === "redeemed") return p.isRedeemed;
        if (filterOption === "active") return !p.isRedeemed;
        return true;
      })
      .sort((a, b) => {
        if (sortOption === "name") return a.name.localeCompare(b.name);
        return percent(b) - percent(a);
      });
  }, [search, sortOption, filterOption]);

  const activePrograms = filtered.filter((p) => !p.isRedeemed);
  const redeemedPrograms = filtered.filter((p) => p.isRedeemed);

  return (
    <div className="min-h-screen bg-white px-6 md:px-20 py-10">
     {/* Header */}
<header className="sticky top-0 z-50 bg-white shadow-sm">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-20">

      {/* Logo */}
      <div className="flex-shrink-0">
        <img src={OrbitLogo} alt="Orbit Logo" className="h-10 cursor-pointer"
           onClick={() => navigateToPage('customer-dashboard')}
           />
       </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex space-x-12 text-sm font-medium text-gray-700">
        <button onClick={() => navigateToPage('customer-track')} className="hover:text-black transition">
          Track
        </button>
        <button onClick={() => navigateToPage('customer-explore')} className="hover:text-black transition">
          Explore
        </button>
        <button onClick={() => navigateToPage('customer-account')} className="hover:text-black transition">
          Account
        </button>
      </nav>

      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
        </button>
      </div>
    </div>
  </div>

  {/* Mobile Menu */}
  {isMobileMenuOpen && (
    <div className="md:hidden bg-white border-t border-gray-200 px-4 py-6 space-y-4 text-sm font-medium text-gray-700">
      <button onClick={() => { navigateToPage('customer-track'); setMobileMenuOpen(false); }} className="block hover:text-black transition">
        Track
      </button>
      <button onClick={() => { navigateToPage('customer-explore'); setMobileMenuOpen(false); }} className="block hover:text-black transition">
        Explore
      </button>
      <button onClick={() => { navigateToPage('customer-account'); setMobileMenuOpen(false); }} className="block hover:text-black transition">
        Account
      </button>
      </div>
  )}
</header>

      {/* Hero */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">
          Your{" "}
          <span className="bg-gradient-to-r from-[#FFB000] to-[#FFC94A] bg-clip-text text-transparent">
            Loyalty
          </span>{" "}
          Wallet
        </h1>
        <p className="text-gray-500 mt-2">
          See your progress, upcoming rewards, and redemption history
        </p>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
       {/* Filter/Sort Column */}
<aside className="col-span-1 space-y-6">
  <input
    type="text"
    placeholder="Search your loyalty programs..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFB000]"
  />

  {/* Sort */}
  <div className="relative">
    <button
      onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
      className="w-full border rounded-md px-3 py-2 text-left bg-white shadow-sm hover:bg-gray-50 flex justify-between items-center"
    >
      Sort
      <ChevronDown className="w-4 h-4" />
    </button>
    {sortDropdownOpen && (
      <div className="absolute left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50">
        <button
          onClick={() => { setSortOption("name"); setSortDropdownOpen(false); }}
          className="w-full text-left px-4 py-2 hover:bg-gray-100"
        >
          Name
        </button>
        <button
          onClick={() => { setSortOption("progress"); setSortDropdownOpen(false); }}
          className="w-full text-left px-4 py-2 hover:bg-gray-100"
        >
          Progress
        </button>
      </div>
    )}
  </div>

  {/* Filter */}
  <div className="relative">
    <button
      onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
      className="w-full border rounded-md px-3 py-2 text-left bg-white shadow-sm hover:bg-gray-50 flex justify-between items-center"
    >
      Filter
      <ChevronDown className="w-4 h-4" />
    </button>
    {filterDropdownOpen && (
      <div className="absolute left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50">
        <button
          onClick={() => { setFilterOption("all"); setFilterDropdownOpen(false); }}
          className="w-full text-left px-4 py-2 hover:bg-gray-100"
        >
          All
        </button>
        <button
          onClick={() => { setFilterOption("active"); setFilterDropdownOpen(false); }}
          className="w-full text-left px-4 py-2 hover:bg-gray-100"
        >
          Active
        </button>
        <button
          onClick={() => { setFilterOption("redeemed"); setFilterDropdownOpen(false); }}
          className="w-full text-left px-4 py-2 hover:bg-gray-100"
        >
          Redeemed
        </button>
      </div>
    )}
  </div>
</aside>

        {/* Cards Section */}
        <section className="col-span-1 md:col-span-3 space-y-6">
          {activePrograms.map((p) => (
            <LoyaltyCard key={p.id} program={p} openOverlay={openOverlay} />
          ))}

          {redeemedPrograms.length > 0 && (
            <>
              <h3 className="text-sm text-gray-500 font-medium mt-6">Redeemed</h3>
              {redeemedPrograms.map((p) => (
                <LoyaltyCard key={p.id} program={p} openOverlay={openOverlay} />
              ))}
            </>
          )}

          {filtered.length === 0 && (
            <div className="text-center text-gray-500 py-10 border border-dashed rounded">
              No programs found
            </div>
          )}
        </section>
      </div>
{/* Overlay Popup */}
{overlayProgram && (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    onClick={closeOverlay}
  >
    <div
      className="bg-white rounded-lg p-6 relative"
      onClick={(e) => e.stopPropagation()}
    >
      <h3 className="text-lg font-semibold mb-4 text-center">{overlayProgram.name}</h3>

      <div className="relative w-96 h-56">
        <img
          src={overlayProgram.image}
          alt={overlayProgram.name}
          className="w-full h-full object-cover rounded"
        />

        {/* Overlay content depending on type */}
        {overlayProgram.type === "stamps" ? (
          <div className="absolute inset-0 flex flex-col justify-center items-center">
            {(() => {
              const total = overlayProgram.targetStamps ?? 0;
              const collected = overlayProgram.currentStamps ?? 0;
              const StampIcon =
                stampIcons[(overlayProgram.stampType ?? "star") as StampType] ?? Star;

              const rows: number[][] = total <= 4 ? [[...Array(total).keys()]] : [[], []];
              if (total > 4) {
                const half = Math.ceil(total / 2);
                rows[0] = Array.from({ length: total - half }, (_, i) => i);
                rows[1] = Array.from({ length: half }, (_, i) => i + total - half);
              }

              return rows.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-16 mb-4">
                  {row.map((i) => {
                    const isCollected = i < collected;
                    return (
                      <div
                        key={i}
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          isCollected ? "bg-[#FFB000]" : "bg-gray-300"
                        }`}
                      >
                        <StampIcon className="w-7 h-7 text-white" />
                      </div>
                    );
                  })}
                </div>
              ));
            })()}
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col justify-center items-center px-8">
            {/* Points progress */}
            <div className="w-full bg-gray-300 rounded-full h-6">
              <div
                className="h-6 rounded-full bg-[#FFB000]"
                style={{
                  width: `${Math.min(
                    100,
                    ((overlayProgram.currentPoints ?? 0) / (overlayProgram.targetPoints ?? 1)) *
                      100
                  )}%`,
                }}
              ></div>
            </div>
            <div className="mt-2 text-white font-semibold text-center bg-black bg-opacity-50 px-2 py-1 rounded">
              {overlayProgram.currentPoints ?? 0}/{overlayProgram.targetPoints ?? 0} points
            </div>
          </div>
        )}
      </div>

      <button
        onClick={closeOverlay}
        className="absolute top-2 right-2 text-gray-700 font-bold"
      >
        X
      </button>
    </div>
  </div>
)}
    </div>
  );
}

// LoyaltyCard component
const LoyaltyCard: React.FC<{ program: Program; openOverlay: (p: Program) => void }> = ({ program: p, openOverlay }) => {
  const StampIcon = stampIcons[(p.stampType ?? "star") as StampType] ?? Star;
  const percentPoints =
    p.type === "points" && p.targetPoints
      ? Math.round(((p.currentPoints ?? 0) / p.targetPoints) * 100)
      : 0;

  const collectedStamps = p.currentStamps ?? 0;
  const totalStamps = p.targetStamps ?? 0;

  const borderClass = p.isRedeemed
    ? "border-gray-200"
    : p.isReadyToRedeem
    ? "border-[#FFB000]"
    : "border-gray-200";

  return (
    <div
      className={`relative flex rounded-lg overflow-hidden bg-white border ${borderClass} shadow-sm transition ${
        p.isRedeemed ? "opacity-50 pointer-events-none" : "hover:shadow-md"
      }`}
    >
      {/* Left Image */}
      <div className="w-72 p-4 flex-shrink-0">
        <div className="relative h-48 rounded-md overflow-hidden bg-gray-100">
          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
          <div className="absolute top-3 left-3 w-12 h-12 rounded-full bg-white p-[2px] shadow overflow-hidden">
            <img src={p.logo} alt={`${p.name} logo`} className="w-full h-full object-cover rounded-full" />
          </div>
        </div>
      </div>

      {/* Right Info */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{p.name}</h3>
          <div className="text-sm text-gray-500">{p.category} · {p.location}</div>

          {/* Progress */}
          <div className="mt-3">
            {p.type === "points" ? (
              <>
                <div className="text-sm text-gray-600 mb-2">{`${p.currentPoints ?? 0}/${p.targetPoints ?? 0} points`}</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full bg-[#FFB000]" style={{ width: `${Math.min(100, percentPoints)}%` }} />
                </div>
              </>
            ) : (
              <>
                <div className="text-sm text-gray-600 mb-2">{`${collectedStamps}/${totalStamps} stamps`}</div>
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalStamps }).map((_, i) => {
                    const collected = i < collectedStamps;
                    return (
                      <StampIcon
                        key={i}
                        className="w-5 h-5"
                        style={{ color: collected ? p.stampColor ?? "#FFB000" : "#D1D5DB" }}
                      />
                    );
                  })}
                </div>
              </>
            )}
          </div>

          <div className="mt-3 text-sm text-gray-600">
            Reward: <span className="font-medium text-gray-800">{p.reward}</span>
          </div>
        </div>

        {/* Action */}
        <div className="mt-4 relative">
          {p.isRedeemed ? (
            <div className="text-sm text-green-600 font-semibold">Redeemed</div>
          ) : (
            <>
              <button
                onClick={() => openOverlay(p)}
                className="px-3 py-1 border border-[#FFB000] text-[#FFB000] rounded relative"
              >
                View Card
              </button>

              {/* Redeem It badge */}
              {p.isReadyToRedeem && (
                <span className="absolute top-1 right-0 text-[#FFB000] text-xs font-semibold px-2 py-1 rounded">
                  Redeem It
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerTrack;