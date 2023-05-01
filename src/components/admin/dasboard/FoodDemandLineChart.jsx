import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const FoodDemandLineChart = ({ data }) => {
  return (
    <div className="bg-white rounded-lg p-4">
      <h2 className="text-xl font-medium mb-4">Food Demand Line Chart</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="food1" stroke="#8884d8" />
          <Line type="monotone" dataKey="food2" stroke="#82ca9d" />
          <Line type="monotone" dataKey="food3" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FoodDemandLineChart;
