import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const FoodDemandBarChart = ({ data }) => {
  return (
    <div className="bg-white rounded-lg p-4 mx-auto" style={{ width: "98%" }}>
      <h2 className="text-xl font-medium mb-4">Food Demand Bar Chart</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="food1" fill="#8884d8" />
          <Bar dataKey="food2" fill="#82ca9d" />
          <Bar dataKey="food3" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FoodDemandBarChart;
