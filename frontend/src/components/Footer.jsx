import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-slate-900/80 to-slate-800/80 backdrop-blur-xl border-t border-slate-700/50 mt-auto">
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Left - Branding */}
          <div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              E.C.H.O
            </h3>
            <p className="text-slate-400 text-sm">Drone Detection System</p>
          </div>

          {/* Center - Team */}
          <div className="md:text-center">
            <p className="text-slate-300 font-semibold">Team</p>
            <p className="text-slate-400 text-sm">Synaptrix</p>
          </div>

          {/* Right - Created by */}
          <div className="md:text-right">
            <p className="text-slate-400 text-sm">
              Created by <span className="font-semibold text-slate-300">LKS</span>
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent mb-6"></div>

        {/* Bottom */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <p>© {currentYear} E.C.H.O Surveillance System. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
