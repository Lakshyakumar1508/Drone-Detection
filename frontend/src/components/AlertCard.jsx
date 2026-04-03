import { AlertTriangle, AlertCircle, AlertOctagon } from "lucide-react";

export default function AlertCard({ type, message, time }) {
  const colorConfig = {
    HIGH: {
      bg: "bg-red-500/10",
      border: "border-red-500/30",
      text: "text-red-400",
      badge: "bg-red-500/20 text-red-300",
      icon: AlertOctagon,
    },
    MEDIUM: {
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/30",
      text: "text-yellow-400",
      badge: "bg-yellow-500/20 text-yellow-300",
      icon: AlertTriangle,
    },
    LOW: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      text: "text-blue-400",
      badge: "bg-blue-500/20 text-blue-300",
      icon: AlertCircle,
    },
  };

  const config = colorConfig[type] || colorConfig.LOW;
  const Icon = config.icon;

  return (
    <div className={`${config.bg} p-3 rounded-lg border ${config.border} hover:border-slate-500/50 transition-all hover:shadow-lg hover:shadow-slate-900/20 group cursor-pointer`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-start gap-2">
          <Icon className={`w-4 h-4 mt-0.5 ${config.text} flex-shrink-0`} />
          <span className={`${config.badge} px-2 py-0.5 rounded text-xs font-semibold`}>{type}</span>
        </div>
        <span className="text-xs text-slate-400">{time}</span>
      </div>

      <p className="text-sm text-slate-300 leading-relaxed">{message}</p>
    </div>
  );
}