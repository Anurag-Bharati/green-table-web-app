import React from "react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts";

const data = [
  { food: "Food 1", demand: Math.floor(Math.random() * 100) + 50 },
  { food: "Food 2", demand: Math.floor(Math.random() * 100) + 50 },
  { food: "Food 3", demand: Math.floor(Math.random() * 100) + 50 },
  { food: "Food 4", demand: Math.floor(Math.random() * 100) + 50 },
  { food: "Food 5", demand: Math.floor(Math.random() * 100) + 50 },
];

const FoodDemandRadarChart = () => {
  return (
    <div className="bg-white rounded-lg p-4 mx-auto" style={{ width: "98%" }}>
      <h2 className="text-xl font-medium mb-4">Food Demand Radar Chart</h2>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart outerRadius={150} data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="food" />
          <Radar name="Demand" dataKey="demand" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FoodDemandRadarChart;
