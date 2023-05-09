"use client";

import { firestore } from "@/config/firebase/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import Image from "next/image";
import { useState } from "react";
import { BiCookie, BiEdit, BiMinusCircle } from "react-icons/bi";

const removeFood = (id) => {
  const foodRef = doc(firestore, "menu", id);
  deleteDoc(foodRef);
};

const FoodCard = ({ food }) => {
  const [focus, setFocus] = useState(false);
  const toggleFocus = () => setFocus(!focus);

  return (
    <div className="relative rounded-md flex  hover:border-[#11111188] border-transparent border-2  px-3 border-dashed cursor-pointer  no-select items-center bg-white  ">
      <Image
        height={128}
        width={128}
        src={food?.image}
        alt={food?.name}
        className="w-32  h-32 rounded-md object-cover opacity-80 hidden sm:block"
      />
      <div className="relative flex flex-col w-full">
        <div className="w-full flex " onClick={toggleFocus}>
          <div
            className={`w-full flex flex-col gap-2 px-4 pt-4 transition-all duration-500 ${
              focus ? "pb-0" : "pb-4"
            }`}
          >
            <h4 className="whitespace-nowrap  text-[#372b22] text-2xl font-bold border-b-2 border-b-[#11111188] border-dashed py-2">
              {food.name}
              <span className="text-xl italic font-black float-right">${food.price}</span>
            </h4>
            <p
              className={`  max-w-prose line-clamp-3 transition-all duration-500 tracking-wide font-medium text-[#2b221c] ${
                focus ? "h-[26px]" : "h-[78px]"
              }`}
            >
              {food.description}
            </p>
          </div>
        </div>
        <div
          className={`flex justify-start ml-4 items-center gap-4 duration-500 transition-all ${
            focus ? "opacity-100 scale-y-100 pb-4 h-[69px]" : "scale-y-0 opacity-0 pb-0 h-0 "
          }`}
        >
          <div
            className="bg-[#372b22] text-white px-4 py-1 rounded-full uppercase font-bold text-sm"
            onClick={() => console.log(food)}
          >
            {food.category.label}
          </div>
          <div className="flex items-center gap-4">
            <button
              className="items-center flex text-[#372b22]  rounded-full uppercase font-bold text-2xl"
              onClick={() => removeFood(food.id)}
            >
              <BiMinusCircle />
              <span className="text-lg">Remove</span>
            </button>
            <button
              className="items-center flex text-[#372b22] rounded-full uppercase font-bold text-2xl"
              onClick={() => console.log(food)}
            >
              <BiEdit />
              <span className="text-lg">Edit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;

export const NoFoodCard = () => {
  return (
    <div className=" bg-white rounded-md flex gap-2 whitespace-nowrap">
      <div className="p-3 flex-1  h-[182px]">
        <div className="border-2 border-gray-200 rounded-md h-full w-full border-dashed flex  flex-col justify-center items-center">
          <BiCookie className="text-xl" />
          <div className="text-center"> No Foods To Show</div>
          <p>Try adding some foods to see them here</p>
        </div>
      </div>
    </div>
  );
};
