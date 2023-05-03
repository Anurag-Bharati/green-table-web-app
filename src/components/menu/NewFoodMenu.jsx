import React from "react";
import FoodCard from "./FoodCard";

const NewFoodMenu = () => {
  return (
    <section className="relative  pt-[2em] md:pt-4 max-w-none  w-full mx-auto overflow-x-hidden">
      <div className="container mx-auto px-4">
        <div className="menu-texture rounded-3xl p-4 md:p-8">
          <div className=" relative flex border-t-4 border-[#372b22] mb-0 p-2 justify-center ">
            <div className="absolute bg-[#372b22] h-1 m-auto w-[calc(80%-16px)] translate-y-3 z-0"></div>
            <span className="z-10 mx-auto  text-md uppercase font-bold bg-[#372b22] px-4 py-1 rounded-full inline-block text-clr letter-spacing select-none">
              Food Menu
            </span>
          </div>
          <div className="flex justify-evenly py-4 sm:py-8 px-2 sm:px-6 sm:flex-wrap flex-col sm:flex-row  border-4 border-[#372b22] max-h-[calc(100vh-15rem)] overflow-y-auto no-scroll-bar">
            <FoodCard />
            <FoodCard />
            <FoodCard />
            <FoodCard />
            <FoodCard />
            <FoodCard />
            <FoodCard />
            <FoodCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewFoodMenu;
