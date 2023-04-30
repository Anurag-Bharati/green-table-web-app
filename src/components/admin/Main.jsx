"use client";

import { asideState } from "@/atoms";
import { useRecoilValue } from "recoil";
const Body = ({ children }) => {
  const asideExpanded = useRecoilValue(asideState);
  return (
    <main
      className={`relative isolate min-h-screen grow ml-${
        asideExpanded ? "64" : "16"
      } transition-all ease-in-out duration-300 pr-4 py-4`}
    >
      {children}
    </main>
  );
};

export default Body;
