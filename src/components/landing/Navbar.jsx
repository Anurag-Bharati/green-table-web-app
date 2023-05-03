"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { BiCart, BiMenu, BiSolidLeaf } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import AvatarShimmer from "../reusable/AvatarShimmer";
import UserOptionsBar from "../reusable/UserOptionsBar";
import InfiniteCircularProgressBar from "../reusable/InfiniteCircularProgressBar";
import { useState } from "react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [leaf, setLeaf] = useState({ count: 0, show: false });
  const toggleLeafCount = () => setLeaf({ ...leaf, show: !leaf.show });
  const toggleCart = () => null;
  return (
    <>
      <nav className=" fixed w-full bg-white border-gray-200 dark:bg-white z-50 border-b ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link passHref={true} href="/" className="flex items-center h-10">
            <Image
              src="/assets/svgs/logo/logo.svg"
              height={40}
              width={40}
              className="mr-3"
              alt="Green Table Logo"
            />
            <span className="self-center text-xl uppercase font-semibold whitespace-nowrap hidden md:inline-block">
              Greentable
            </span>
          </Link>
          <div className="flex md:order-2 gap-4 justify-center items-center">
            <div className="relative p-2 cursor-pointer no-select" onClick={toggleCart}>
              <span className="absolute px-1.5 font-bold text-sm bg-red-500  text-white right-0 top-0 rounded-full">
                1
              </span>
              <BiCart className="inline-block text-3xl text-black" />
            </div>
            <button
              type="button"
              className="text-white  focus:ring-4 focus:outline-none  font-medium rounded-lg text-md px-2 py-0.5 text-center mr-3 md:mr-0 bg-[#94d82d] hover:scale-105 focus:ring-lime-300 items-center gap-2 flex"
              onClick={toggleLeafCount}
            >
              <span className="text-white font-bold text-xl">{leaf.show ? leaf.count : "x"}</span>
              <BiSolidLeaf className="inline-block text-xl text-white" />
            </button>

            <div className="relative rounded-full h-8 w-8" aria-label="Login/Sign-up">
              {status === "loading" && (
                <div title="loading" className="w-full h-full cursor-progress">
                  <AvatarShimmer className="absolute w-full h-full -z-0" />
                  <InfiniteCircularProgressBar />
                </div>
              )}
              {status === "authenticated" && <UserOptionsBar session={session} />}
              {status === "unauthenticated" && (
                <Link
                  passHref={true}
                  href="/auth"
                  title="SignIn/SignUp"
                  className=" w-full h-full inline-flex justify-center items-center cursor-pointer z-10  border-2 border-white rounded-full"
                >
                  <FaUserCircle className="w-full h-full fill-gray-400 hover:fill-gray-200" />
                </Link>
              )}
            </div>
            <button
              data-collapse-toggle="navbar-cta"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 "
              aria-controls="navbar-cta"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <BiMenu className="h-6 w-6" />
            </button>
          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border md:flex-row md:space-x-8 md:mt-0 md:border-0 text-md">
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded  md:p-0 hover:text-[#94d82d]"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded  md:p-0 hover:text-[#94d82d]"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded  md:p-0 hover:text-[#94d82d]"
                >
                  Menu
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded  md:p-0 hover:text-[#94d82d]"
                >
                  About
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="pb-[78px]"></div>
    </>
  );
};

export default Navbar;
