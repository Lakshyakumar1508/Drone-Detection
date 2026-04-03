import { useState } from "react";
import { AlertTriangle, Download, Filter, Search, Calendar } from "lucide-react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function AlertsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");
  const [dateRange, setDateRange] = useState("today");

  // Sample alert data
  const alerts = [
    {
      id: 1,
      type: "HIGH",
      zone: "Zone A",
      message: "Unidentified drone detected in restricted airspace",
      timestamp: "2024-04-03 14:32:45",
      location: "North perimeter",
      action: "Alert sent to authorities",
    },
    {
      id: 2,
      type: "MEDIUM",
      zone: "Zone B",
      message: "Drone signal detected at low altitude",
      timestamp: "2024-04-03 13:15:22",
      location: "East boundary",
      action: "Monitoring in progress",
    },
    {
      id: 3,
      type: "LOW",
      zone: "Zone C",
      message: "Periodic signal interference detected",
      timestamp: "2024-04-03 12:45:10",
      location: "South sector",
      action: "System check initiated",
    },
    {
      id: 4,
      type: "HIGH",
      zone: "Zone A",
      message: "Multiple drones detected simultaneously",
      timestamp: "2024-04-03 11:20:33",
      location: "North perimeter",
      action: "Emergency protocol activated",
    },
    {
      id: 5,
      type: "MEDIUM",
      zone: "Zone B",
      message: "Drone hovering pattern detected",
      timestamp: "2024-04-03 10:05:17",
      location: "East boundary",
      action: "Dispatched surveillance team",
    },
  ];

  const getAlertColor = (type) => {
    switch (type) {
      case "HIGH":
        return { bg: "bg-red-500/10", border: "border-red-500/30", text: "text-red-400", badge: "bg-red-500/20" };
      case "MEDIUM":
        return { bg: "bg-yellow-500/10", border: "border-yellow-500/30", text: "text-yellow-400", badge: "bg-yellow-500/20" };
      case "LOW":
        return { bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-400", badge: "bg-blue-500/20" };
      default:
        return { bg: "bg-slate-500/10", border: "border-slate-500/30", text: "text-slate-400", badge: "bg-slate-500/20" };
    }
  };

  const filteredAlerts = alerts.filter((alert) => {
    if (filterLevel !== "all" && alert.type !== filterLevel) return false;
    if (searchTerm && !alert.message.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 overflow-hidden">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex flex-col flex-1 overflow-hidden ml-0">
        <Navbar />

        <main className="flex-1 overflow-y-auto">
          <div className="p-8 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold text-slate-100 mb-2 flex items-center gap-3">
                  <div className="p-3 bg-red-500/20 rounded-lg">
                    <AlertTriangle className="w-8 h-8 text-red-400" />
                  </div>
                  Alert History
                </h1>
                <p className="text-slate-400 text-sm">Complete log of all system alerts and detections</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-300 rounded-lg transition-all">
                <Download className="w-5 h-5" />
                Export CSV
              </button>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search alerts..."
                    className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-slate-100 focus:outline-none focus:border-blue-500/50"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Filter by Level */}
              <div>
                <select
                  className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-slate-100 focus:outline-none focus:border-blue-500/50"
                  value={filterLevel}
                  onChange={(e) => setFilterLevel(e.target.value)}
                >
                  <option value="all">All Levels</option>
                  <option value="HIGH">High Priority</option>
                  <option value="MEDIUM">Medium Priority</option>
                  <option value="LOW">Low Priority</option>
                </select>
              </div>

              {/* Date Range */}
              <div>
                <select
                  className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-slate-100 focus:outline-none focus:border-blue-500/50"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="all">All Time</option>
                </select>
              </div>
            </div>

            {/* Alerts Table */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-slate-700/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700/50 bg-slate-900/50">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Priority</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Zone</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Message</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Time</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Location</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Action Taken</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {filteredAlerts.map((alert) => {
                      const colors = getAlertColor(alert.type);
                      return (
                        <tr key={alert.id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors.badge} ${colors.text}`}>
                              {alert.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-300">{alert.zone}</td>
                          <td className="px-6 py-4 text-sm text-slate-400">{alert.message}</td>
                          <td className="px-6 py-4 text-sm text-slate-400">{alert.timestamp}</td>
                          <td className="px-6 py-4 text-sm text-slate-400">{alert.location}</td>
                          <td className="px-6 py-4 text-sm">
                            <span className="text-green-400">{alert.action}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <p className="text-red-400 text-sm font-medium">High Priority Alerts</p>
                <p className="text-3xl font-bold text-red-300 mt-2">2</p>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <p className="text-yellow-400 text-sm font-medium">Medium Priority Alerts</p>
                <p className="text-3xl font-bold text-yellow-300 mt-2">2</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-blue-400 text-sm font-medium">Low Priority Alerts</p>
                <p className="text-3xl font-bold text-blue-300 mt-2">1</p>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <p className="text-green-400 text-sm font-medium">Total Alerts</p>
                <p className="text-3xl font-bold text-green-300 mt-2">5</p>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
