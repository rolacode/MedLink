import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const PatientSummary = () => {
  const [timeframe, setTimeframe] = useState("Weekly");

  const weeklyData = [
    { name: "Old Patient", value: 55, color: "#2563eb" },
    { name: "New Patient", value: 35, color: "#14b8a6" },
    { name: "Inactive Patient", value: 20, color: "#ef4444" },
  ];

  const monthlyData = [
    { name: "Old Patient", value: 62, color: "#2563eb" },
    { name: "New Patient", value: 28, color: "#14b8a6" },
    { name: "Inactive Patient", value: 25, color: "#ef4444" },
  ];

  const currentData = timeframe === "Weekly" ? weeklyData : monthlyData;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border">
          <p className="text-sm font-medium">{payload[0].name}</p>
          <p className="text-sm text-gray-600">
            {payload[0].value}% of total patients
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[18px] lg:text-[22px] font-semibold text-gray-800">Patient Summary</h2>
        <div className="relative">
          <button
            className="flex items-center gap-1 text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors"
            onClick={() =>
              setTimeframe(timeframe === "Weekly" ? "Monthly" : "Weekly")
            }
          >
            {timeframe}
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 items-center justify-between">
        <div className="w-48 h-48 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={currentData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                animationBegin={0}
                animationDuration={800}
              >
                {currentData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke={entry.color}
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-xl font-bold text-gray-800">100%</span>
          </div>
        </div>

        <div className="space-y-3 ml-4">
          {currentData.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors"
            >
              <div
                className="w-3 h-3 rounded"
                style={{ backgroundColor: item.color }}
              ></div>
              <div className="text-sm">
                <span className="font-semibold" style={{ color: item.color }}>
                  {item.value}%
                </span>
                <span className="text-gray-600 ml-1">{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientSummary;
