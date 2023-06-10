import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

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

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className=" !bg-[#ffffffaa] rounded-md p-2 backdrop-blur-sm">
        <p className="font-semibold mb-2 text-lg">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="flex items-center mb-1">
            <span
              className="w-3 h-3 mr-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            ></span>
            <span>{`${entry.name}: ${Math.round(entry.value)}`}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const CategoryDoughnutChart = ({ data }) => {
  if (!data || data.length === 0) return null;
  const dataKeys = Object.keys(data[0]).filter((key) => key !== "week");

  return (
    <div className="bg-white rounded-lg p-4 mx-auto shadow-sm" style={{ width: "98%" }}>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Category Distribution (Doughnut)
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            dataKey={dataKeys[0]}
            nameKey="week"
            cx="50%"
            cy="50%"
            outerRadius={120}
            innerRadius={60} // Add inner radius to create a doughnut chart
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryDoughnutChart;
