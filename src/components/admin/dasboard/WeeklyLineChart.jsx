import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { CustomTooltip } from "./CustomToolTip";

const colors = [
  "#8884d8", // Purple
  "#82ca9d", // Green
  "#ffc658", // Yellow
  "#ff7300", // Orange
  "#007bff", // Blue
  "#6f42c1", // Indigo
  "#28a745", // Dark Green
  "#dc3545", // Red
];

export const WeeklyLineChart = ({ data }) => {
  if (!data || data.length === 0) return null;
  const dataKeys = Object.keys(data[0]).filter((key) => key !== "week");

  return (
    <div className="bg-white rounded-lg p-4 mx-auto shadow-sm" style={{ width: "98%" }}>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Weekly Trends</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" tick={{ fontSize: 14, fontWeight: "medium" }} dy={10} />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {dataKeys.map((key, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey={key}
              stroke={colors[index % colors.length]}
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyLineChart;
