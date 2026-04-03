import AlertCard from "./AlertCard";

export default function AlertsPanel({ alerts }) {
  return (
    <div className="flex-1 flex flex-col">
      <div className="space-y-2 flex-1 overflow-y-auto scrollbar-thin scrollbar-track-slate-800/50 scrollbar-thumb-slate-700/50">
        {alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="text-slate-600 text-4xl mb-2">✓</div>
            <p className="text-slate-400 font-medium">No Alerts</p>
            <p className="text-slate-500 text-sm mt-1">All systems operating normally</p>
          </div>
        ) : (
          alerts.map((alert, index) => (
            <AlertCard
              key={index}
              type={alert.type}
              message={alert.message}
              time={alert.time}
            />
          ))
        )}
      </div>
    </div>
  );
}