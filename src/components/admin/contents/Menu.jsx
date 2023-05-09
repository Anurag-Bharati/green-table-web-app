import FoodCard from "@/components/admin/reuseable/FoodCard";
import CreateFoodForm from "../reuseable/CreateFoodForm";
import { collection } from "firebase/firestore";
import { firestore } from "@/config/firebase/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { NoFoodCard } from "../reuseable/FoodCard";

const Menu = () => {
  const menuRef = collection(firestore, "menu");
  const [menu, loading, error] = useCollection(menuRef);
  const data = menu?.docs.map((doc) => ({ ...doc.data(), id: doc.id })) ?? [];
  return (
    <div className="flex gap-3">
      <div className="flex flex-col gap-2 max-h-[calc(100vh-8rem)] overflow-y-auto no-scroll-bar overflow-x-hidden flex-[2]">
        <p className="text-xl font-medium">Menu</p>
        {data.length === 0 && <NoFoodCard />}
        {!loading && data?.map((food) => <FoodCard key={food.id} food={food} />)}
      </div>
      <div className="flex flex-col gap-2 max-h-[calc(100vh-8rem)] overflow-y-auto no-scroll-bar overflow-x-hidden flex-1">
        <p className="text-xl font-medium">Create Food</p>
        <CreateFoodForm />
      </div>
    </div>
  );
};

export default Menu;
