import TableView from "../dasboard/TableView";
import { useEffect, useMemo } from "react";
import PredictionServiceState from "../dasboard/PredictionServiceState";
import TotalDemandForecast from "../dasboard/TotalDemandForecast";
import { collection } from "firebase/firestore";
import { firestore } from "@/config/firebase/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { averageFieldsByCategory, averageFieldsInNestedArray } from "@/utils/helper";
import { useRecoilState } from "recoil";
import { predictionDataState } from "@/atoms";

const Dashboard = () => {
  const reservationRef = collection(firestore, "reservations");
  const orderRef = collection(firestore, "orders");
  const [reservations, resLoad, resErr] = useCollection(reservationRef);
  const [orders, ordLoad, ordErr] = useCollection(orderRef);
  const [dataForPrediction, setDataForPrediction] = useRecoilState(predictionDataState);

  const coreData = useMemo(() => {
    if (!orders) return [];
    const orderData = orders.docs.map((doc) => {
      const oData = doc.data().orders;
      const category = oData.map((o) => o.category);
      const price = oData.map((o) => ({
        basePrice: o.price,
        checkoutPrice: o.price * o.quantity,
      }));
      const priceInsideCat = category.map((cat, i) => {
        return { category: cat, price: price[i] };
      });
      return priceInsideCat;
    });
    const avg = orderData.map((o) => averageFieldsByCategory(o));
    const result = averageFieldsInNestedArray(avg);
    return result;
  }, [orders]);

  console.log("loopin");

  const pendingReservation = useMemo(() => {
    if (!reservations) return [];
    return reservations.docs.filter((doc) => doc.data().status === "pending");
  }, [reservations]);

  const pendingOrder = useMemo(() => {
    if (!orders) return [];
    return orders.docs.filter((doc) => doc.data().status === "pending");
  }, [orders]);

  useEffect(() => {
    if (coreData.length === 0) return;
    setDataForPrediction(coreData);
  }, [coreData, setDataForPrediction]);

  return (
    <div className="flex flex-col gap-4  mt-2">
      <div className="flex gap-4 ">
        <div className="flex bg-white px-4 py-2 rounded-md  flex-col leading-tight flex-[3]">
          <TotalDemandForecast data={dataForPrediction} />
        </div>

        <div className="flex flex-col gap-2">
          <PredictionServiceState />
          <div className="flex bg-white px-4 py-2 rounded-md  flex-col  flex-1">
            <div className="flex flex-col gap-2 my-auto leading-3">
              <p>Pending Reservation</p>
              <p className="text-4xl font-bold">{pendingReservation?.length || 0}</p>
              <p className="text-xs text-gray-500">Total: {reservations?.docs.length || 0}</p>
            </div>
          </div>
          <div className="flex bg-white px-4 py-2 rounded-md  flex-col  flex-1">
            <div className="flex flex-col gap-2 my-auto leading-3">
              <p>Pending Orders</p>
              <p className="text-4xl font-bold ">{pendingOrder?.length || 0}</p>
              <p className="text-xs text-gray-500">Total: {orders?.docs.length || 0}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between ">
        <p className="text-xl font-medium">Table View</p>
        <div className="flex gap-2">
          <div className="w-6 h-6 rounded-md bg-[#c0eb75] "></div> <p>Available</p>
          <div className="w-6 h-6 rounded-md bg-[#f97171]"></div> <p>Occupied</p>
        </div>
      </div>
      <TableView />
    </div>
  );
};

export default Dashboard;
