"use client";

import { useRecoilState } from "recoil";
import { navState } from "@/atoms";
import { Dashboard, Reservations, Orders, Menu, Users, Report } from "./contents";

const GetContent = ({ navState }) => {
  console.log(navState);
  switch (navState) {
    case 0:
      return <Dashboard />;
    case 1:
      return <Reservations />;
    case 2:
      return <Orders />;
    case 3:
      return <Menu />;
    case 4:
      return <Users />;
    case 5:
      return <Report />;
    default:
      return <Dashboard />;
  }
};

const Content = () => {
  const [navSelected] = useRecoilState(navState);
  return <GetContent navState={navSelected} />;
};

export default Content;
