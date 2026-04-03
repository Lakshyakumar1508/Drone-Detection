import { AlertTriangle, Circle, CheckCircle2, Radio } from "lucide-react";

export default function DroneCard({ title, status, signal = 0 }) {
  const statusConfig = {
    Safe: {
      icon: CheckCircle2,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
      label: "Safe",
    },
    Detected: {
      icon: Radio,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/30",
      label: "Detected",
    },
    Alert: {
      icon: AlertTriangle,
      color: "text-red-400",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30",
      label: "Alert",
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;
  const signalColor = signal > 80 ? "text-green-400" : signal > 50 ? "text-yellow-400" : "text-red-400";

  return (
    <div className={`bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-6 border ${config.borderColor} hover:border-slate-600/50 transition-all hover:shadow-lg hover:shadow-slate-900/20`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-100 mb-1">{title}</h2>
          <p className="text-xs text-slate-400">Zone Status</p>
        </div>
        <div className={`p-2 rounded-lg ${config.bgColor}`}>
          <Icon className={`w-5 h-5 ${config.color}`} />
        </div>
      </div>

      <div className="space-y-4">
        {/* Status */}
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${config.color}`}></div>
          <span className={`font-semibold text-sm ${config.color}`}>{config.label}</span>
        </div>

        {/* Signal Strength */}
        {signal > 0 && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-medium text-slate-400">Signal Strength</label>
              <span className={`text-sm font-bold ${signalColor}`}>{signal}%</span>
            </div>
            <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  signal > 80
                    ? "bg-green-500"
                    : signal > 50
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
                style={{ width: `${signal}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}