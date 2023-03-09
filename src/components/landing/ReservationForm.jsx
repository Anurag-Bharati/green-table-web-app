"use client";
import styles from "@/styles/landing/reservation_form.module.scss";
import { BiCalendar, BiChevronDown, BiTime, BiUser } from "react-icons/bi";

const ReservationForm = () => {
  return (
    <div
      className={`relative px-6 pt-6 rounded-3xl max-w-3xl mx-auto ${styles.wrapper} `}
      data-ring
    >
      <div className="flex flex-col sm:flex-row justify-between gap-4 pb-8">
        <button className="flex flex-1 gap-x-2 justify-between py-4 pr-3 pl-4 bg-[#c0eb75] rounded-xl items-center">
          <span className="p-2 rounded-full">
            <BiUser className="h-6 w-6" />
          </span>
          <p className="text-lg flex-1">Party Size</p>
          <BiChevronDown className="h-6 w-6" />
        </button>
        <button className="flex flex-1 gap-x-2 justify-between py-2 pr-2 pl-3 bg-[#c0eb75] rounded-xl items-center">
          <span className="p-2 rounded-full">
            <BiCalendar className="h-6 w-6" />
          </span>
          <p className="text-lg flex-1">Date</p>
          <BiChevronDown className="h-6 w-6" />
        </button>
        <button className="flex flex-1 gap-x-2 justify-between py-2 pr-2 pl-3 bg-[#c0eb75] rounded-xl items-center">
          <span className="p-2 rounded-full">
            <BiTime className="h-6 w-6" />
          </span>
          <p className="text-lg flex-1">Time</p>
          <BiChevronDown className="h-6 w-6" />
        </button>
      </div>
      <div className="absolute left-0 right-0 -bottom-8 flex justify-center items-center" data-ring>
        <button className="py-2 pr-2 pl-3 bg-[#111] text-white rounded-xl text-xl hover:-translate-y-1 transition ease-in-out duration-300">
          Find Table
        </button>
      </div>
    </div>
  );
};

export default ReservationForm;
