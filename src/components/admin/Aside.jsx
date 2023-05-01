"use client";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { asideState, navState } from "@/atoms";

import { FiMenu, FiChevronsLeft } from "react-icons/fi";
import {
  BiCalendarEvent,
  BiFoodMenu,
  BiShoppingBag,
  BiSolidDashboard,
  BiSolidReport,
  BiSolidUserAccount,
} from "react-icons/bi";

const Aside = () => {
  // for toggling the aside
  const [asideExpanded, setAsideExpanded] = useRecoilState(asideState);
  // for preserving state of the nav
  const [navSelected, setnavSelected] = useRecoilState(navState);
  const [hovered, setHovered] = useState(false);

  const toggleAside = () => setAsideExpanded((prevState) => !prevState);

  const changeNavState = (e) =>
    setnavSelected(parseInt(e.currentTarget.getAttribute("data-value")));

  const handleMouseEnter = () => (!asideExpanded ? setHovered(true) : null);
  const handleMouseLeave = () => (!asideExpanded ? setHovered(false) : null);

  return (
    <aside
      className={`relative isolate  text-white ${
        hovered ? "w-64" : asideExpanded ? "w-64" : "w-[92px]"
      } transition-all ease-in-out duration-300 min-h-screen p-4 no-select`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="bg-zinc-800 w-full h-full  rounded-xl">
        <div className="p-2 flex flex-col gap-2">
          {/* Aside content */}
          <button
            className=" p-2 font-medium text-xl items-center  rounded-md flex justify-between"
            onClick={toggleAside}
          >
            <p
              className={`transition-all  align-middle pointer-events-none ${
                asideExpanded || hovered ? "opacity-100 w-fit ml-2" : "opacity-0 w-0 ml-0 "
              }`}
            >
              Navigation
            </p>
            {asideExpanded ? (
              <FiChevronsLeft className="text-2xl self-end pointer-events-none" />
            ) : (
              <FiMenu className="text-2xl self-end pointer-events-none" />
            )}
          </button>
          <button
            className={`p-2 rounded-md  hover:bg-zinc-600 flex font-medium ${
              navSelected === 0 ? "bg-zinc-600" : ""
            }`}
            data-value="0"
            onClick={changeNavState}
          >
            <BiSolidDashboard className="text-2xl" />
            <span
              className={`transition-all delay-75  ${
                asideExpanded || hovered
                  ? "opacity-100 w-fit ml-2"
                  : "opacity-0 w-0 ml-0 pointer-events-none"
              }`}
            >
              Dashboard
            </span>
          </button>
          <button
            className={`p-2 rounded-md  hover:bg-zinc-600 flex font-medium ${
              navSelected === 1 ? "bg-zinc-600" : ""
            }`}
            data-value="1"
            onClick={changeNavState}
          >
            <BiCalendarEvent className="text-2xl" />
            <span
              className={`transition-all delay-75  ${
                asideExpanded || hovered
                  ? "opacity-100 w-fit ml-2"
                  : "opacity-0 w-0 ml-0 pointer-events-none"
              }`}
            >
              Reservations
            </span>
          </button>
          <button
            className={`p-2 rounded-md  hover:bg-zinc-600 flex font-medium ${
              navSelected === 2 ? "bg-zinc-600" : ""
            }`}
            data-value="2"
            onClick={changeNavState}
          >
            <BiShoppingBag className="text-2xl" />
            <span
              className={`transition-all delay-75  ${
                asideExpanded || hovered
                  ? "opacity-100 w-fit ml-2"
                  : "opacity-0 w-0 ml-0 pointer-events-none"
              }`}
            >
              Orders
            </span>
          </button>
          <button
            className={`p-2 rounded-md  hover:bg-zinc-600 flex font-medium ${
              navSelected === 3 ? "bg-zinc-600" : ""
            }`}
            data-value="3"
            onClick={changeNavState}
          >
            <BiFoodMenu className="text-2xl" />
            <span
              className={`transition-all delay-75  ${
                asideExpanded || hovered
                  ? "opacity-100 w-fit ml-2"
                  : "opacity-0 w-0 ml-0 pointer-events-none"
              }`}
            >
              Menu
            </span>
          </button>
          <button
            className={`p-2 rounded-md  hover:bg-zinc-600 flex font-medium ${
              navSelected === 4 ? "bg-zinc-600" : ""
            }`}
            data-value="4"
            onClick={changeNavState}
          >
            <BiSolidUserAccount className="text-2xl" />
            <span
              className={`transition-all delay-75  ${
                asideExpanded || hovered
                  ? "opacity-100 w-fit ml-2"
                  : "opacity-0 w-0 ml-0 pointer-events-none"
              }`}
            >
              Users
            </span>
          </button>
          <button
            className={`p-2 rounded-md  hover:bg-zinc-600 flex font-medium ${
              navSelected === 5 ? "bg-zinc-600" : ""
            }`}
            data-value="5"
            onClick={changeNavState}
          >
            <BiSolidReport className="text-2xl" />
            <span
              className={`transition-all delay-75  ${
                asideExpanded || hovered
                  ? "opacity-100 w-fit ml-2"
                  : "opacity-0 w-0 ml-0 pointer-events-none"
              }`}
            >
              Reports
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
