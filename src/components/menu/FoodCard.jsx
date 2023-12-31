"use client";

import { cartState } from "@/atoms";
import { useState } from "react";
import { BiCookie, BiMinusCircle, BiPlusCircle } from "react-icons/bi";
import { useRecoilState } from "recoil";

const FoodCard = ({ food }) => {
  const [focus, setFocus] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useRecoilState(cartState);

  const handleAddToCart = () => {
    // find if the food is already in the cart
    const index = cart.findIndex((item) => item.id === food.id);
    if (index === -1) {
      // if not, add it to the cart
      setCart([...cart, { ...food, quantity }]);
    } else {
      // if yes, update the quantity
      const item = { ...cart[index], quantity: cart[index].quantity + quantity };
      const newCart = cart.filter((item) => item.id !== food.id);
      newCart.push(item);
      setCart(newCart);
    }
  };
  const increment = () => setQuantity(quantity + 1 > 10 ? 10 : quantity + 1);
  const decrement = () => setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
  const toggleFocus = () => setFocus(!focus);

  return (
    <div className="relative rounded-md flex  hover:border-[#11111188] border-transparent border-2  px-3 max-w-xl border-dashed cursor-pointer lg:w-1/2 no-select items-center">
      <img
        src={food.image}
        alt={food.name}
        className="w-32  h-32 rounded-md object-cover opacity-80 hidden sm:block"
      />
      <div className="flex flex-col">
        <div className="flex items-center" onClick={toggleFocus}>
          <div
            className={`flex flex-col gap-2 px-4 pt-4 transition-all duration-500 ${
              focus ? "pb-0" : "pb-4"
            }`}
          >
            <h4 className="whitespace-nowrap  text-[#372b22] text-2xl font-bold border-b-2 border-b-[#11111188] border-dashed py-2">
              {food.name}
              <span className="text-xl italic font-black float-right">${food.price}</span>
            </h4>
            <p
              className={`line-clamp-3 transition-all duration-500 tracking-wide font-medium text-[#2b221c] ${
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
          <button
            className="bg-[#372b22] text-white px-4 py-1 rounded-full uppercase font-bold text-sm"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
          <div className="flex items-center gap-2">
            <button
              className="text-[#372b22]  rounded-full uppercase font-bold text-3xl"
              onClick={decrement}
            >
              <BiMinusCircle />
            </button>
            <span className="text-[#372b22] font-bold text-xl">{quantity}</span>
            <button
              className=" text-[#372b22] rounded-full uppercase font-bold text-3xl"
              onClick={increment}
            >
              <BiPlusCircle />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const NoFoodCard = () => {
  return (
    <div className="rounded-md flex gap-2 whitespace-nowrap w-full">
      <div className="w-full p-3 flex-1  h-[182px]">
        <div className=" border-4 border-[#372b22] rounded-md h-full w-full border-dashed flex  flex-col justify-center items-center">
          <BiCookie className="text-3xl" />
          <div className="text-center text-2xl font-bold"> No Foods To Show</div>
          <p className="text-xl">Please check back later</p>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
