import { predict } from "@/services/prediction.service";
import {
  calculateAverageCheckoutPriceInGeneral,
  convertDataToPredictionRequest,
} from "@/utils/helper";
import { useEffect, useState } from "react";
import { BiCircleQuarter } from "react-icons/bi";

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
    <Text x={x} y={y} textAnchor="end" fontSize={16}>
      {payload.value}
    </Text>
  );
};

const defaultNoOfWeeks = [1, 2, 3, 4, 5];
const TotalDemandForecast = ({ data, noOfWeeks = defaultNoOfWeeks }) => {
  const [chartData, setChartData] = useState([]);
  const modified = calculateAverageCheckoutPriceInGeneral(data);
  const request = convertDataToPredictionRequest(modified, noOfWeeks);

  useEffect(() => {
    const makePrediction = async () => {
      const res = await predict(request);
      const transformedData = noOfWeeks.map((week, index) => ({
        week: `Week ${week}`,
        orders: parseInt(res.predicted_orders[index]),
      }));
      setChartData(transformedData);
    };
    makePrediction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noOfWeeks]);
  if (chartData.length === 0)
    return (
      <div className="w-full h-[372px] px-10 py-8">
        <div className=" border-dashed rounded-xl border-gray-200 border-2 flex flex-col justify-center items-center p-10 h-full">
          <p className="text-gray-500 font-bold flex gap-2 items-center uppercase">
            <BiCircleQuarter className="text-xl  animate-spin" />
            Requesting Forecast
          </p>
        </div>
      </div>
    );
  return (
    <div className="pb-2">
      <h2 className="text-xl font-medium p-4">Weekly Order Forecasts</h2>

      <ResponsiveContainer width="95%" height={300}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="50%" stopColor="#7e81cc" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#7e81cc" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" tick={{ fontSize: 16 }} />
          <YAxis tick={<CustomTick />} />
          <Tooltip
            contentStyle={{ backgroundColor: "rgba(255, 255, 255, 0.8)", borderRadius: "10px" }}
          />
          <Area
            type="monotone"
            dataKey="orders"
            stroke="#7e81cc"
            fill="url(#colorGradient)"
            activeDot={{ r: 8 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalDemandForecast;
