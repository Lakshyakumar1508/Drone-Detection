import { useState } from "react";
import { FileText, Download, Filter, Search, Calendar, TrendingUp } from "lucide-react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function ReportsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [reportType, setReportType] = useState("all");
  const [dateRange, setDateRange] = useState("month");

  // Sample report data
  const reports = [
    {
      id: 1,
      title: "Monthly Detection Summary - March 2024",
      type: "Monthly",
      date: "2024-04-01",
      zones: "All Zones",
      detections: 47,
      threats: 8,
      status: "Completed",
    },
    {
      id: 2,
      title: "Weekly Threat Analysis - Week 14",
      type: "Weekly",
      date: "2024-03-31",
      zones: "Zone A, Zone B",
      detections: 12,
      threats: 3,
      status: "Completed",
    },
    {
      id: 3,
      title: "Daily Activity Report - March 30",
      type: "Daily",
      date: "2024-03-30",
      zones: "All Zones",
      detections: 8,
      threats: 2,
      status: "Completed",
    },
    {
      id: 4,
      title: "System Performance Analysis Q1 2024",
      type: "Quarterly",
      date: "2024-03-28",
      zones: "All Zones",
      detections: 134,
      threats: 23,
      status: "Completed",
    },
    {
      id: 5,
      title: "Zone A Incident Report",
      type: "Incident",
      date: "2024-03-25",
      zones: "Zone A",
      detections: 5,
      threats: 5,
      status: "Investigation",
    },
  ];

  const getReportColor = (type) => {
    switch (type) {
      case "Monthly":
        return "bg-blue-500/10 border-blue-500/30";
      case "Weekly":
        return "bg-green-500/10 border-green-500/30";
      case "Daily":
        return "bg-cyan-500/10 border-cyan-500/30";
      case "Quarterly":
        return "bg-purple-500/10 border-purple-500/30";
      case "Incident":
        return "bg-red-500/10 border-red-500/30";
      default:
        return "bg-slate-500/10 border-slate-500/30";
    }
  };

  const filteredReports = reports.filter((report) => {
    if (reportType !== "all" && report.type !== reportType) return false;
    if (searchTerm && !report.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
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
                  <div className="p-3 bg-blue-500/20 rounded-lg">
                    <FileText className="w-8 h-8 text-blue-400" />
                  </div>
                  Reports
                </h1>
                <p className="text-slate-400 text-sm">System surveillance and detection reports</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-300 rounded-lg transition-all">
                <Download className="w-5 h-5" />
                Generate Report
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                <p className="text-slate-400 text-sm font-medium">Total Reports</p>
                <p className="text-3xl font-bold text-slate-100 mt-2">24</p>
                <p className="text-xs text-slate-500 mt-2">Last 30 days</p>
              </div>
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                <p className="text-slate-400 text-sm font-medium">Total Detections</p>
                <p className="text-3xl font-bold text-slate-100 mt-2">324</p>
                <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +12% from last month
                </p>
              </div>
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                <p className="text-slate-400 text-sm font-medium">Threats Identified</p>
                <p className="text-3xl font-bold text-slate-100 mt-2">47</p>
                <p className="text-xs text-slate-500 mt-2">Average per day</p>
              </div>
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                <p className="text-slate-400 text-sm font-medium">Response Time</p>
                <p className="text-3xl font-bold text-slate-100 mt-2">2.3s</p>
                <p className="text-xs text-slate-500 mt-2">Average detection</p>
              </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search reports..."
                    className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-slate-100 focus:outline-none focus:border-blue-500/50"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Filter by Type */}
              <div>
                <select
                  className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-slate-100 focus:outline-none focus:border-blue-500/50"
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                >
                  <option value="all">All Report Types</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Incident">Incident</option>
                </select>
              </div>

              {/* Date Range */}
              <div>
                <select
                  className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-slate-100 focus:outline-none focus:border-blue-500/50"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                  <option value="year">This Year</option>
                </select>
              </div>
            </div>

            {/* Reports List */}
            <div className="space-y-4">
              {filteredReports.map((report) => (
                <div
                  key={report.id}
                  className={`${getReportColor(report.type)} border rounded-lg p-6 hover:shadow-lg hover:shadow-slate-900/20 transition-all cursor-pointer`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-semibold rounded-full">
                          {report.type}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          report.status === "Completed" 
                            ? "bg-green-500/20 text-green-300" 
                            : "bg-yellow-500/20 text-yellow-300"
                        }`}>
                          {report.status}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-100 mb-3">{report.title}</h3>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                        <div>
                          <p className="text-slate-400">Generated</p>
                          <p className="text-slate-200 font-medium">{report.date}</p>
                        </div>
                        <div>
                          <p className="text-slate-400">Coverage</p>
                          <p className="text-slate-200 font-medium">{report.zones}</p>
                        </div>
                        <div>
                          <p className="text-slate-400">Detections</p>
                          <p className="text-blue-300 font-bold">{report.detections}</p>
                        </div>
                        <div>
                          <p className="text-slate-400">Threats</p>
                          <p className="text-red-300 font-bold">{report.threats}</p>
                        </div>
                        <div className="md:text-right">
                          <button className="mt-2 px-4 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-colors text-xs font-semibold">
                            View Report
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
