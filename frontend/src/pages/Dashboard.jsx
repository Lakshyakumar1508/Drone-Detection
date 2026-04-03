import { useState, useEffect } from "react";
import { Activity, AlertTriangle, Radio, TrendingUp } from "lucide-react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DroneCard from "../components/DroneCard";
import AlertsPanel from "../components/AlertsPanel";
import MapView from "../components/MapView";
import BarChart from "../components/BarChart";
import Footer from "../components/Footer";

export default function Dashboard() {
  const [alerts, setAlerts] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState({
    activeZones: 3,
    threatLevel: "Medium",
    detectedDrones: 7,
    systemHealth: 98,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newAlert = {
        id: Date.now(),
        type: ["LOW", "MEDIUM", "HIGH"][Math.floor(Math.random() * 3)],
        message: "Drone detected in restricted zone",
        time: new Date().toLocaleTimeString(),
      };

      setAlerts((prev) => [newAlert, ...prev.slice(0, 4)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const StatCard = ({ icon: Icon, title, value, change, color }) => (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all hover:shadow-lg hover:shadow-slate-900/20">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-slate-400 text-sm font-medium mb-2">{title}</p>
          <div className="flex items-end gap-2">
            <h3 className="text-3xl font-bold text-slate-100">{value}</h3>
            {change && <span className={`text-xs font-semibold ${color}`}>{change}</span>}
          </div>
        </div>
        <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
          <Icon className="w-6 h-6" strokeWidth={2} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto">
          <div className="p-8 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold text-slate-100 mb-2">Dashboard</h1>
                <p className="text-slate-400 text-sm flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  System Online - Real-time Monitoring Active
                </p>
              </div>
              <div className="text-right">
                <p className="text-slate-400 text-sm">Last Updated</p>
                <p className="text-slate-100 font-semibold">{new Date().toLocaleTimeString()}</p>
              </div>
            </div>

            {/* KPI Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard 
                icon={Activity} 
                title="Active Zones" 
                value={stats.activeZones} 
                change="+1 alert"
                color="text-blue-400"
              />
              <StatCard 
                icon={AlertTriangle} 
                title="Threat Level" 
                value={stats.threatLevel} 
                change="Stable"
                color="text-amber-400"
              />
              <StatCard 
                icon={Radio} 
                title="Detected Drones" 
                value={stats.detectedDrones} 
                change="+2 today"
                color="text-red-400"
              />
              <StatCard 
                icon={TrendingUp} 
                title="System Health" 
                value={`${stats.systemHealth}%`} 
                change="Optimal"
                color="text-green-400"
              />
            </div>

            {/* Zone Status & Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Zone Cards */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h2 className="text-xl font-bold mb-4 text-slate-100">Zone Coverage</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <DroneCard title="Zone A" status="Safe" signal={95} />
                    <DroneCard title="Zone B" status="Detected" signal={62} />
                    <DroneCard title="Zone C" status="Alert" signal={45} />
                  </div>
                </div>

                {/* Chart */}
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-6 border border-slate-700/50">
                  <h2 className="text-lg font-bold mb-4 text-slate-100">Detection Trends</h2>
                  <BarChart />
                </div>
              </div>

              {/* Alerts Sidebar */}
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-slate-700/50 p-6 flex flex-col">
                <h3 className="font-bold text-lg flex items-center gap-2 mb-4 text-slate-100">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                  Live Alerts
                </h3>
                <AlertsPanel alerts={alerts} />
              </div>
            </div>

            {/* Map Section */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-slate-700/50 p-6 overflow-hidden">
              <h2 className="text-lg font-bold mb-4 text-slate-100">Live Map View</h2>
              <div className="h-96 rounded-lg overflow-hidden bg-slate-900/50 border border-slate-700/50">
                <MapView />
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}