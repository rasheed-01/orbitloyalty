import React, { useMemo } from "react";
import { Users, UserPlus, UserX, Gift, Star } from "lucide-react";
import { ResponsiveContainer,  BarChart, Bar, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";
import OrbitLogo from "../assets/Orbit_Logo.svg";

interface BusinessDashboardProps {
  onNavigate: (page: string) => void;
  currentUser: any;
  setCurrentUser: (user: any) => void;
}

const ORBIT_YELLOW = "#FFB000";

// ---- Mock data (swap with API later) ----
const summary = {
  totalMembers: 200, // ← try toggling this between 0 and >0 to test
  activeMembers: 150,
  inactiveMembers: 50,
  rewardsRedeemed: 50,
  pointsIssued: 12000,
};

const membersGrowthSeries = [
  { label: "Jan", value: 120 },
  { label: "Feb", value: 140 },
  { label: "Mar", value: 160 },
  { label: "Apr", value: 180 },
  { label: "May", value: 210 },
  { label: "Jun", value: 240 },
];

const pointsIssuedSeries = [
  { label: "Day 1", value: 1500 },
  { label: "Day 2", value: 1400 },
  { label: "Day 3", value: 1450 },
  { label: "Day 4", value: 1300 },
  { label: "Day 5", value: 1280 },
  { label: "Day 6", value: 1270 },
  { label: "Day 7", value: 1250 },
];

const engagementRows = [
  { id: "M-0001", name: "Ava Carter", join: "2025-05-04", points: 1240, last: "2h ago" },
  { id: "M-0002", name: "Noah Lee", join: "2025-04-18", points: 980, last: "1d ago" },
  { id: "M-0003", name: "Mia Patel", join: "2025-03-01", points: 420, last: "3d ago" },
  { id: "M-0004", name: "Liam Brown", join: "2025-02-11", points: 260, last: "1w ago" },
  { id: "M-0005", name: "Sophia Nguyen", join: "2025-01-23", points: 160, last: "2w ago" },
  { id: "M-0006", name: "Ethan Kim", join: "2024-12-10", points: 90, last: "1m ago" },
];


// ---- Small helpers for % deltas (mock calc) ----
const useDelta = (series: { value: number }[]) => {
  return useMemo(() => {
    if (series.length < 2) return 0;
    const prev = series[series.length - 2].value;
    const curr = series[series.length - 1].value;
    if (!prev) return 0;
    return Math.round(((curr - prev) / prev) * 100);
  }, [series]);
};

// ---- UI subcomponents ----
const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  highlighted?: boolean;
}> = ({ title, value, icon, highlighted }) => (
  <div
    className={
      highlighted
        ? "rounded-2xl p-6 shadow-sm bg-gradient-to-b from-[#FFD37A] to-[#FFB000] text-white"
        : "rounded-2xl p-6 shadow-sm bg-white"
    }
  >
    <div className="flex items-center gap-4">
      <div
        className={
          highlighted
            ? "w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center"
            : "w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center"
        }
      >
        {icon}
      </div>
      <div>
        <p className={highlighted ? "text-sm opacity-90" : "text-sm text-gray-600"}>
          {title}
        </p>
        <p className={highlighted ? "text-2xl font-bold" : "text-2xl font-bold text-gray-900"}>
          {value}
        </p>
      </div>
    </div>
  </div>
);

const CardShell: React.FC<{ title: string; subtitle?: string; children: React.ReactNode }> = ({
  title,
  subtitle,
  children,
}) => (
  <div className="bg-white rounded-2xl shadow-sm p-6">
    <div className="mb-4">
      <p className="text-sm font-semibold" style={{ color: ORBIT_YELLOW }}>
        {title}
      </p>
      {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
    </div>
    {children}
  </div>
);

const BusinessDashboard: React.FC<BusinessDashboardProps> = ({ onNavigate }) => {
  const growthDelta = useDelta(membersGrowthSeries);
  const pointsDelta = useDelta(pointsIssuedSeries);

  const hasData = summary.totalMembers > 0;

  return (
    <div className="min-h-screen bg-white px-6 md:px-20 py-10 relative">
      {/* Top bar */}
      <header className="px-6 md:px-10 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <img
              src={OrbitLogo}
              alt="Orbit Logo"
              className="h-10 cursor-pointer"
              onClick={() => onNavigate("business-dashboard")}
            />
          </div>
        </div>
        <nav className="flex items-center gap-8 text-sm text-gray-700">
          <button className="hover:text-black" onClick={() => onNavigate("business-dashboard")}>
            Dashboard
          </button>
          <button className="hover:text-black" onClick={() => onNavigate("business-programs")}>
            Programs
          </button>
          <button className="hover:text-black" onClick={() => onNavigate("business-account")}>
            Account
          </button>
        </nav>
      </header>

      {/* Conditional Rendering */}
      {!hasData ? (
        <main className="flex flex-col items-center justify-center text-center mt-20">
          <img src={OrbitLogo} alt="Orbit Logo" className="h-16 mb-6" />
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
            No Loyalty Program Yet
          </h1>
          <p className="text-gray-500 mb-6">
            You haven’t launched your first loyalty program. Start now to grow your customer base.
          </p>
          <button
            onClick={() => onNavigate("launch-program")}
            className="px-6 py-3 rounded-xl font-semibold text-white"
            style={{ backgroundColor: ORBIT_YELLOW }}
          >
            Launch Your First Program
          </button>
        </main>
      ) : (
        <>

      {/* Page title */}
      <main className="px-6 md:px-10 pb-16">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
          Loyalty Program Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Overview of your loyalty program’s performance
        </p>

        {/* Top stats */}
        <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <StatCard
            highlighted
            title="Total Members"
            value={summary.totalMembers.toLocaleString()}
            icon={<Users className="w-6 h-6 text-white" />}
          />
          <StatCard
            title="Active Members"
            value={summary.activeMembers.toLocaleString()}
            icon={<UserPlus className="w-6 h-6 text-gray-700" />}
          />
          <StatCard
            title="Inactive Members"
            value={summary.inactiveMembers.toLocaleString()}
            icon={<UserX className="w-6 h-6 text-gray-700" />}
          />
          <StatCard
            title="Rewards Redeemed"
            value={summary.rewardsRedeemed.toLocaleString()}
            icon={<Gift className="w-6 h-6 text-gray-700" />}
          />
          <StatCard
            title="Points Issued"
            value={summary.pointsIssued.toLocaleString()}
            icon={<Star className="w-6 h-6 text-gray-700" />}
          />
        </section>

        {/* Performance Overview */}
        <h2 className="mt-10 mb-4 font-semibold text-gray-900">Performance Overview</h2>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Members Growth */}
          <CardShell
            title="Members Growth"
            subtitle={`${
              growthDelta >= 0 ? "+" : ""
            }${growthDelta}%   ·   Avg. ${Math.round(
              membersGrowthSeries.reduce((a, b) => a + b.value, 0) / membersGrowthSeries.length
            )} new members / monthly`}
          >
            <div className="h-56 rounded-xl bg-gray-50 p-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={membersGrowthSeries}>
                  <defs>
                    <linearGradient id="gradMembers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={ORBIT_YELLOW} stopOpacity={0.8} />
                      <stop offset="100%" stopColor={ORBIT_YELLOW} stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="label" axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={ORBIT_YELLOW}
                    fill="url(#gradMembers)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardShell>

          {/* Points Issued Over Time */}
          <CardShell
            title="Points Issued Over Time"
            subtitle={`${pointsDelta >= 0 ? "+" : ""}${pointsDelta}%   ·   Last 7 days`}
          >
            <div className="h-56 rounded-xl bg-gray-50 p-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pointsIssuedSeries}>
                  <XAxis dataKey="label" axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} fill={ORBIT_YELLOW} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardShell>
        </section>

        {/* Member Engagement Table */}
        <h2 className="mt-10 mb-4 font-semibold text-gray-900">Member Engagement</h2>
        <section className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="border-b">
            <div className="grid grid-cols-5 px-6 py-3 text-sm font-medium text-gray-600">
              <span>Member ID</span>
              <span>Name</span>
              <span>Join Date</span>
              <span>Points Balance</span>
              <span>Last Activity</span>
            </div>
          </div>

          <div className="divide-y">
            {engagementRows.map((r) => (
              <div key={r.id} className="grid grid-cols-5 px-6 py-4 text-sm text-gray-700">
                <span className="text-gray-500">{r.id}</span>
                <span>{r.name}</span>
                <span>{r.join}</span>
                <span>{r.points.toLocaleString()}</span>
                <span className="text-gray-500">{r.last}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
      )}
    </div>
  );
};

export default BusinessDashboard;
