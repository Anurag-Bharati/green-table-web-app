import React from "react";
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

const CustomTick = ({ x, y, payload }) => {
  if (payload.value === 0) return null; // Hide zero labels
  return (
    <Text x={x} y={y} textAnchor="end">
      {payload.value}
    </Text>
  );
};

export const FoodDemandChart = ({ data }) => {
  // Calculate the chart's width based on sidebar state

  return (
    <div className="bg-white rounded-lg p-4 mx-auto" style={{ width: " 98%" }}>
      <h2 className="text-xl font-medium mb-4">Food Demand Forecast</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" tick={{ fontSize: 16, fontWeight: "medium" }} dy={10} />
          <YAxis tick={<CustomTick />} />
          <Tooltip />
          <Area type="monotone" dataKey="food1" stackId="1" stroke="#8884d8" fill="#8884d8" />
          <Area type="monotone" dataKey="food2" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
          <Area type="monotone" dataKey="food3" stackId="1" stroke="#ffc658" fill="#ffc658" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FoodDemandChart;
