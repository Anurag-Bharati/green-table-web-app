"use client";
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import TimePicker from "./TimePicker";

const DateTimePicker = ({ allowedDays, handleTime, handleDate, formData }) => {
  const today = new Date();
  const daybeforeToday = new Date();
  daybeforeToday.setDate(today.getDate() - 1);
  const [selectedDay, setSelectedDay] = useState(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => handleDate(selectedDay), [selectedDay]);
  const isDayDisabled = (day) => {
    if (!allowedDays) return false;
    const allowedDate = new Date();
    allowedDate.setDate(today.getDate() + allowedDays);

    return day > allowedDate || day < daybeforeToday;
  };
  return (
    <div className="flex w-full gap-4">
      <div className="flex flex-col gap-6 flex-1 bg-[#11111108]  rounded-xl p-6">
        <p className="text-xl font-medium text-center">Pick a Date</p>
        <div className="">
          <DayPicker
            mode="single"
            selected={selectedDay}
            onSelect={setSelectedDay}
            disabled={isDayDisabled}
            modifiersClassNames={{
              selected: "!bg-[#c0eb75] hover:!bg-[#c0eb00]",
              today: "!border-[#c0eb75] !border-2 !font-bold",
            }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-6 flex-1 bg-[#11111108]  rounded-xl p-6">
        <p className="text-xl font-medium text-center">At What Time?</p>
        <div className="flex gap-2 text-center justify-evenly">
          <TimePicker
            selectedDate={selectedDay ?? today}
            excludeHourRange={[20, 7]}
            intervalMinutes={30}
            handleTime={handleTime}
            formData={formData}
          />
        </div>
      </div>
    </div>
  );
};

export default DateTimePicker;
