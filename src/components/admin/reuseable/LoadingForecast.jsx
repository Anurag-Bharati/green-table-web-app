import { BiCircleQuarter } from "react-icons/bi";

const LoadingForecast = () => {
  return (
    <div className="w-full h-[372px] px-10 py-8 bg-white">
      <div className=" border-dashed rounded-xl border-gray-200 border-2 flex flex-col justify-center items-center p-10 h-full">
        <p className="text-gray-500 font-bold flex gap-2 items-center uppercase">
          <BiCircleQuarter className="text-xl  animate-spin" />
          Requesting Forecast
        </p>
      </div>
    </div>
  );
};

export default LoadingForecast;
