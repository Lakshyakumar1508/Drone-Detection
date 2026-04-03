import { useNavigate } from "react-router-dom";
import { Bell, Settings, LogOut, User } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="bg-gradient-to-r from-slate-900/80 to-slate-800/80 backdrop-blur-xl border-b border-slate-700/50 px-8 py-4 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">E.C.H.O</h1>
        <p className="text-xs text-slate-400 mt-0.5">Drone Detection System</p>
      </div>
      
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button className="relative p-2 hover:bg-slate-700/50 rounded-lg transition-all">
          <Bell className="w-5 h-5 text-slate-300" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        {/* Settings */}
        <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-all">
          <Settings className="w-5 h-5 text-slate-300" />
        </button>
        
        {/* User Profile */}
        <div className="flex items-center gap-3 pl-6 border-l border-slate-700/50">
          <div className="text-right">
            <p className="text-sm font-medium text-slate-100">Admin User</p>
            <p className="text-xs text-slate-400">System Administrator</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
        
        {/* Logout */}
        <button 
          onClick={logout}
          className="ml-4 flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all border border-red-500/30 hover:border-red-500/50"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}