import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts";

const data = [
  { food: "Seafood", demand: Math.floor(Math.random() * 100) + 50 },
  { food: "Extras", demand: Math.floor(Math.random() * 100) + 50 },
  { food: "Starters", demand: Math.floor(Math.random() * 100) + 50 },
  { food: "Beverages", demand: Math.floor(Math.random() * 100) + 50 },
  { food: "Desert", demand: Math.floor(Math.random() * 100) + 50 },
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
