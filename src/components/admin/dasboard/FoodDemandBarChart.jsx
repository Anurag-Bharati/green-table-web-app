import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
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
const FoodDemandBarChart = ({ data }) => {
  if (!data || data.length === 0) return null;
  const foodCategories = Object.keys(data[0]).filter((key) => key !== "week");

  return (
    <div className="bg-white rounded-lg p-4 mx-auto shadow-sm" style={{ width: "98%" }}>
      <h2 className="text-xl font-medium mb-4">Food Demand Bar Chart</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          {foodCategories.map((category, index) => (
            <Bar key={index} dataKey={category} fill={colors[index % colors.length]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FoodDemandBarChart;
