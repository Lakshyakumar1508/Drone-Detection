import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from "recharts";

const data = [
  { drone: "Quadcopter", detections: 24, threats: 4 },
  { drone: "Hexacopter", detections: 15, threats: 2 },
  { drone: "Octocopter", detections: 8, threats: 1 },
  { drone: "Fixed-Wing", detections: 12, threats: 3 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 border border-slate-700/50 rounded-lg p-3 shadow-lg">
        {payload.map((item, index) => (
          <p key={index} style={{ color: item.color }} className="text-sm font-medium">
            {item.name}: {item.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Chart = () => {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          <defs>
            <linearGradient id="colorDetections" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.3} />
            </linearGradient>
            <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0.3} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis dataKey="drone" stroke="#94a3b8" style={{ fontSize: "12px" }} />
          <YAxis stroke="#94a3b8" style={{ fontSize: "12px" }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: "20px" }} />
          <Bar dataKey="detections" fill="url(#colorDetections)" radius={[8, 8, 0, 0]} name="Total Detections" />
          <Bar dataKey="threats" fill="url(#colorThreats)" radius={[8, 8, 0, 0]} name="Threat Level" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;