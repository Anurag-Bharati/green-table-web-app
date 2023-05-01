import FoodDemandChart from "../dasboard/FoodDemandChart";
import FoodDemandRadarChart from "../dasboard/FoodDemandRadarChart";
import FoodDemandBarChart from "../dasboard/FoodDemandBarChart";

const generateData = () => {
  // Generate 10 weeks of sample data
  const data = [];
  for (let i = 1; i <= 10; i++) {
    const weekLabel = i === 1 ? "Last Week" : i === 2 ? "This Week" : `Week ${i - 2}`;
    data.push({
      week: weekLabel,
      food1: Math.floor(Math.random() * 100) + 50,
      food2: Math.floor(Math.random() * 100) + 50,
      food3: Math.floor(Math.random() * 100) + 50,
    });
  }
  return data;
};

const data = generateData();

const Report = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-3 ">
        <div className="flex-1">
          <FoodDemandChart data={data} />
        </div>
        <div className="flex-1">
          <FoodDemandRadarChart />
        </div>
      </div>
      <div className="flex-1">
        <FoodDemandBarChart data={data} />
      </div>
    </div>
  );
};

export default Report;
