import FoodDemandChart from "../dasboard/FoodDemandChart";
import WeeklyRadarChart from "../dasboard/WeeklyRadarChart";
import FoodDemandBarChart from "../dasboard/FoodDemandBarChart";
import { useRecoilValue } from "recoil";
import { predictionDataState } from "@/atoms";
import { convertDataToPredictionRequest } from "@/utils/helper";
import { predict } from "@/services/prediction.service";
import { useEffect, useMemo, useState } from "react";
import WeeklyLineChart from "../dasboard/WeeklyLineChart";
import CategoryPieChart from "../dasboard/CategoryDoughnutChart";

const Report = () => {
  const [state, setState] = useState([]);
  const d = useRecoilValue(predictionDataState);

  const transformedData = useMemo(
    () =>
      d.map((item) => ({
        label: item.category.label,
        meal_id: item.category.value,
        base_price: item.price.basePrice,
        checkout_price: item.price.checkoutPrice,
      })),
    [d]
  );

  const requests = useMemo(
    () =>
      transformedData.map((item) => ({
        label: item.label,
        prediction: convertDataToPredictionRequest(item, [1, 2, 3, 4, 5, 6, 7, 8]),
      })),
    [transformedData]
  );

  useEffect(() => {
    const predictionPromises = requests.map(async (item) => ({
      label: item.label,
      prediction: await predict(item.prediction),
    }));

    Promise.all(predictionPromises)
      .then((predictions) => {
        const preTransform = predictions.map((item) => ({
          label: item.label,
          prediction: item.prediction.predicted_orders,
        }));
        const transformedData = preTransform.reduce((result, categoryData) => {
          const { label, prediction } = categoryData;

          prediction.forEach((value, index) => {
            if (!result[index]) {
              result[index] = { week: `Week ${index + 1}` };
            }
            result[index][label] = value;
          });

          return result;
        }, []);

        setState(transformedData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [requests, setState]);

  console.log(state);
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-3 ">
        <div className="flex-1">
          <CategoryPieChart data={state} />
        </div>
        <div className="flex-1">
          <WeeklyRadarChart data={state} />
        </div>
      </div>
      <div className="flex-1">
        <FoodDemandChart data={state} />
      </div>
      <div className="flex-1">
        <FoodDemandBarChart data={state} />
      </div>

      <div className="flex-1">
        <WeeklyLineChart data={state} />
      </div>
    </div>
  );
};

export default Report;
