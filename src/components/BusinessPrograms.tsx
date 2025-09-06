import React, { useState } from "react";
import OrbitLogo from "../assets/Orbit_Logo.svg";
import ProgramDialog from "./BusinessProgramCard";

interface Program {
  id: string;
  name: string;
  type: string;
  startDate: string;
  endDate: string;
  reward: string;
  members: number;
  redeemed: number;
  status: "active" | "draft" | "inactive";
   navigateToPage: (page: string) => void;
  currentUser: any;
  setCurrentUser: (user: any) => void;
}

const ORBIT_YELLOW = "#FFB000";

const initialPrograms: Program[] = [
  {
    id: "1",
    name: "Coffee Club",
    type: "Stamp Card",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    reward: "Free Latte",
    members: 120,
    redeemed: 45,
    status: "active",
  },
];

const BusinessPrograms: React.FC<BusinessProgramsProps> = ({ navigateToPage }) => {
  const [programs, setPrograms] = useState<Program[]>(initialPrograms);
  const [activeTab, setActiveTab] = useState<"active" | "draft" | "inactive">("active");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const filteredPrograms = programs.filter((p) => p.status === activeTab);

  const handleSave = (program: Program) => {
    setPrograms((prev) => {
      const exists = prev.find((p) => p.id === program.id);
      if (exists) {
        return prev.map((p) => (p.id === program.id ? program : p));
      } else {
        return [...prev, { ...program, id: Date.now().toString() }];
      }
    });
    setDialogOpen(false);
    setSelectedProgram(null);
  };

  const handleDelete = (id: string) => {
    setPrograms((prev) => prev.filter((p) => p.id !== id));
    setDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-white px-6 md:px-20 py-10 relative">
      {/* Top bar */}
      <header className="px-6 md:px-10 py-6 flex items-center justify-between">
        <img
          src={OrbitLogo}
          alt="Orbit Logo"
          className="h-10 cursor-pointer"
          onClick={() => navigateToPage("business-dashboard")}
        />
        <nav className="flex items-center gap-8 text-sm text-gray-700">
          <button onClick={() => navigateToPage("business-dashboard")}>Dashboard</button>
          <button className="text-black font-semibold">Programs</button>
          <button onClick={() => navigateToPage("business-account")}>Account</button>
        </nav>
      </header>

      {/* Page title */}
      <main className="px-6 md:px-10 pb-16">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Loyalty Programs</h1>
          <button
            className="px-4 py-2 border-2 rounded-full text-sm font-medium"
            style={{ borderColor: ORBIT_YELLOW, color: ORBIT_YELLOW }}
            onClick={() => {
              setSelectedProgram(null);
              setDialogOpen(true);
            }}
          >
            New Program
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 mt-6">
          {["active", "draft", "inactive"].map((tab) => (
            <button
              key={tab}
              className={`pb-2 text-sm font-medium ${
                activeTab === tab ? "text-black border-b-2 border-[#FFB000]" : "text-gray-400"
              }`}
              onClick={() => setActiveTab(tab as any)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Table */}
        <section className="bg-white rounded-2xl shadow-sm overflow-hidden mt-6">
          <div className="border-b">
            <div className="grid grid-cols-6 px-6 py-3 text-sm font-medium text-gray-600">
              <span>Name</span>
              <span>Type</span>
              <span>Start Date</span>
              <span>End Date</span>
              <span>Rewards</span>
              <span></span>
            </div>
          </div>

          <div className="divide-y">
            {filteredPrograms.map((p) => (
              <div
                key={p.id}
                className="grid grid-cols-6 px-6 py-4 text-sm text-gray-700 items-center"
              >
                <span>{p.name}</span>
                <span>{p.type}</span>
                <span>{p.startDate}</span>
                <span>{p.endDate}</span>
                <span>{p.reward}</span>
                <button
                  className="px-4 py-1 border-2 rounded-full text-sm font-medium"
                  style={{ borderColor: ORBIT_YELLOW, color: ORBIT_YELLOW }}
                  onClick={() => {
                    setSelectedProgram(p);
                    setDialogOpen(true);
                  }}
                >
                  View
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Dialog */}
      {dialogOpen && (
        <ProgramDialog
        program={selectedProgram}
        onSave={handleSave}
        onClose={() => setDialogOpen(false)}
        onDelete={handleDelete}
        navigateToPage={navigateToPage}   // <-- add this line
        />
    )}

    </div>
  );
};

export default BusinessPrograms;