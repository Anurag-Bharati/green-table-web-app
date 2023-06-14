import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Text,
} from "recharts";
import { CustomTooltip } from "./CustomToolTip";
import LoadingForecast from "../reuseable/LoadingForecast";

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

const CustomTick = ({ x, y, payload }) => {
  if (payload.value === 0) return null; // Hide zero labels
  return (
    <Text x={x} y={y} textAnchor="end">
      {payload.value}
    </Text>
  );
};
export const FoodDemandChart = ({ data }) => {
  if (!data || data.length === 0) return <LoadingForecast />;

  // Calculate the max magnitude for each category
  const maxMagnitudes = {};
  data.forEach((entry) => {
    Object.keys(entry).forEach((key) => {
      if (key !== "week") {
        if (!maxMagnitudes[key] || maxMagnitudes[key] < entry[key]) {
          maxMagnitudes[key] = entry[key];
        }
      }
    });
  });

  // Sort the foodCategories based on max magnitude (ascending order)
  const foodCategories = Object.keys(maxMagnitudes).sort(
    (a, b) => maxMagnitudes[a] - maxMagnitudes[b]
  );

  return (
    <div className="bg-white rounded-lg p-4 mx-auto shadow-sm" style={{ width: "98%" }}>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Food Demand Forecast</h2>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" tick={{ fontSize: 14, fontWeight: "medium" }} dy={10} />
          <YAxis tick={<CustomTick />} />
          <Tooltip content={<CustomTooltip />} />
          {foodCategories.reverse().map((category, index) => (
            <Area
              key={index}
              type="monotone"
              dataKey={category}
              stroke={colors[index % colors.length]}
              fill={colors[index % colors.length]}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FoodDemandChart;
