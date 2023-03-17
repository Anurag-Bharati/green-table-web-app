import React, { useState, useEffect } from "react";

const TimePicker = ({ selectedDate, excludeHourRange, intervalMinutes, formData, handleTime }) => {
  const [times, setTimes] = useState([]);

  useEffect(() => {
    const now = new Date();
    const selectedDateTime = selectedDate.getTime();
    const [excludeStartHour, excludeEndHour] = excludeHourRange;

    const availableTimes = [];

    for (let hour = 0; hour < 24; hour++) {
      if (
        (selectedDate.getDate() === now.getDate() && hour >= now.getHours()) ||
        selectedDate.getDate() > now.getDate()
      ) {
        if (!isWithinRange(hour, excludeStartHour, excludeEndHour)) {
          for (let minute = 0; minute < 60; minute += intervalMinutes) {
            availableTimes.push(new Date(selectedDateTime).setHours(hour, minute, 0, 0));
          }
        }
      }
    }

    setTimes(availableTimes);
  }, [selectedDate, excludeHourRange, intervalMinutes]);

  const isWithinRange = (hour, startHour, endHour) => {
    if (startHour <= endHour) {
      return hour >= startHour && hour < endHour;
    } else {
      return hour >= startHour || hour < endHour;
    }
  };

  const formatTime = (time) => {
    return new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className="flex flex-wrap justify-center gap-3 max-h-72 overflow-auto px-4 nice-scroll-bar">
      {times.length === 0 && <p className="text-center text-lg">No available times</p>}
      {times.map((time, index) => (
        <button
          key={index}
          onClick={handleTime}
          className={`py-2 px-4 rounded-lg  ${
            formData.time === formatTime(time) ? "bg-[#c0eb75]" : "bg-gray-200"
          }`}
        >
          {formatTime(time)}
        </button>
      ))}
    </div>
  );
};

export default TimePicker;
