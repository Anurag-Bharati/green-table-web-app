import React from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
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
].reverse();

export const WeeklyRadarChart = ({ data }) => {
  if (!data || data.length === 0) return null;
  const dataKeys = Object.keys(data[0]).filter((key) => key !== "week");

  // Calculate the average order value for each category
  const averageOrderValues = {};
  dataKeys.forEach((key) => {
    const total = data.reduce((acc, entry) => acc + entry[key], 0);
    averageOrderValues[key] = total / data.length;
  });

  // Sort the dataKeys based on the ascending order of average order values
  const sortedDataKeys = dataKeys.sort((a, b) => averageOrderValues[a] - averageOrderValues[b]);

  return (
    <div className="bg-white rounded-lg p-4 mx-auto shadow-sm" style={{ width: "98%" }}>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Weekly Performance Radar</h2>
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="week" tick={{ fontSize: 14, fontWeight: "medium" }} />
          {sortedDataKeys.reverse().map((key, index) => (
            <Radar
              key={index}
              name={key}
              dataKey={key}
              stroke={colors[index % colors.length]}
              fill={colors[index % colors.length]}
              fillOpacity={0.6}
            />
          ))}
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyRadarChart;
