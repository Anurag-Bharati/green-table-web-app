"use client";

import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { predictionServiceState } from "@/atoms";
import { healthCheck } from "@/services/prediction.service";

const INTERVAL = process.env.NEXT_PUBLIC_PREDICTION_PING_INTERVAL || 1000 * 60 * 1;

function IntervalPinger() {
  const [, setApiData] = useRecoilState(predictionServiceState);

  useEffect(() => {
    const fetchData = () => {
      healthCheck().then((res) => {
        setApiData(res);
      });
    };
    fetchData();
    const interval = setInterval(fetchData, INTERVAL);
    return () => clearInterval(interval);
  }, [setApiData]);

  return null;
}

export default IntervalPinger;
