import { firestore } from "@/config/firebase/firebase";
import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import DataTableComponent from "../reuseable/CustomDataTable";

const Orders = () => {
  const ordersRef = collection(firestore, "orders");
  const [snapshot, loading, error] = useCollection(ordersRef);
  return (
    <div>
      <DataTableComponent data={snapshot?.docs ?? []} />
    </div>
  );
};

export default Orders;
