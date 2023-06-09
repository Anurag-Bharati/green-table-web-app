import { BiLoader, BiSolidCircle, BiSolidXCircle } from "react-icons/bi";
import { useRecoilValue } from "recoil";
import { predictionServiceState } from "@/atoms";

const PredictionServiceState = () => {
  const serviceState = useRecoilValue(predictionServiceState);
  return (
    <div className="flex bg-white px-4 py-2 rounded-md  flex-col  flex-1 gap-1">
      {serviceState?.state === "loading" && (
        <div className="flex flex-col gap-1  my-auto">
          <p>Prediction Service</p>
          <p className="text-gray-500 font-bold flex gap-2 items-center uppercase">
            <BiLoader className="text-sm  animate-spin" />
            Connecting
          </p>
          <p className="text-sm text-gray-500">Establishing connection</p>
        </div>
      )}
      {serviceState?.state === "error" && (
        <div className="flex flex-col gap-1  my-auto">
          <p>Prediction Service</p>
          <p className="text-[#f97171] font-bold flex gap-2 items-center uppercase">
            <BiSolidXCircle className="text-sm" />
            Offline
          </p>
          <p className="text-xs text-gray-500">Service is down</p>
        </div>
      )}
      {serviceState?.state === "loaded" && (
        <div className="flex flex-col gap-1  my-auto">
          <p className="">Prediction Service</p>
          <p className="text-[#c0eb75] font-bold flex gap-2 items-center uppercase">
            <BiSolidCircle className="text-sm animate-pulse" />
            Online
          </p>
          <p className="text-xs text-gray-500">
            Model Version: {serviceState?.health.model_version}{" "}
          </p>
        </div>
      )}
    </div>
  );
};

export default PredictionServiceState;
