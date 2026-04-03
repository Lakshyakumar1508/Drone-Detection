import { Home, Map, BarChart3, Menu, FileText, Shield, Settings } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { isUserAdmin } from "../utils/tokenUtils";

const Sidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = isUserAdmin();

  const menuItems = [
    { label: "Dashboard", icon: Home, path: "/dashboard" },
    { label: "Map View", icon: Map, path: "/map" },
    { label: "Analytics", icon: BarChart3, path: "/dashboard#analytics" },
    { label: "Reports", icon: FileText, path: "/reports" },
    { label: "Alerts", icon: Shield, path: "/alerts" },
  ];

  const adminItems = [
    { label: "User Management", icon: Settings, path: "/admin" },
  ];

  const isActive = (path) => location.pathname === path.split("#")[0];

  return (
    <div
      className={`bg-gradient-to-b from-slate-900 to-slate-950 h-screen flex flex-col justify-between transition-all duration-300 border-r border-slate-700/50 ${
        open ? "w-64" : "w-20"
      }`}
    >
      <div>
        {/* Header with toggle */}
        <div className="p-4 flex items-center justify-between mb-6">
          {open && (
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">E.C.H.O</h1>
              <p className="text-xs text-slate-400 mt-1">Surveillance</p>
            </div>
          )}
          <button
            onClick={() => setOpen(!open)}
            className="p-2 hover:bg-slate-800/50 rounded-lg transition-all"
          >
            <Menu className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-3 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  active
                    ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 text-blue-300"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-300"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {open && <span className="font-medium">{item.label}</span>}
                {open && active && (
                  <div className="ml-auto w-2 h-2 bg-blue-400 rounded-full"></div>
                )}
              </button>
            );
          })}

          {/* Admin Section */}
          {isAdmin && (
            <>
              <div className="my-4 px-4">
                <div className="h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent"></div>
              </div>
              <p className="text-xs font-semibold text-slate-500 px-4 py-2">{open ? "ADMINISTRATION" : ""}</p>
              {adminItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      active
                        ? "bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-300"
                        : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-300"
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {open && <span className="font-medium">{item.label}</span>}
                    {open && active && (
                      <div className="ml-auto w-2 h-2 bg-amber-400 rounded-full"></div>
                    )}
                  </button>
                );
              })}
            </>
          )}
        </nav>
      </div>

      {/* Footer with status */}
      <div className="p-4 space-y-4 border-t border-slate-700/50">
        {open && (
          <div className="bg-slate-800/50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-xs font-medium text-slate-300">System Status</p>
            </div>
            <p className="text-xs text-slate-400">All systems operational</p>
          </div>
        )}
        {!open && (
          <div className="flex justify-center">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;