"use client";

import { useSession } from "next-auth/react";
import UserOptionsBar from "../reusable/UserOptionsBar";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import InfiniteCircularProgressBar from "../reusable/InfiniteCircularProgressBar";
import AvatarShimmer from "../reusable/AvatarShimmer";
import Image from "next/image";

export const Header = () => {
  const date = new Date();
  const { data: session, status } = useSession({ required: true });
  return (
    <div className="flex items-center h-full leading-none justify-between">
      <div className="">
        <Link passHref={true} href="/" className="flex items-center h-10">
          <Image
            src="/assets/svgs/logo/logo.svg"
            height={32}
            width={32}
            className="mr-3"
            alt="Green Table Logo"
          />
          <span className="self-center text-lg uppercase font-semibold whitespace-nowrap hidden md:inline-block">
            {" "}
            Greentable
          </span>
        </Link>
      </div>
      <div className="flex gap-4 items-center">
        <div className="flex gap-1 items-center text-zinc-400">
          <p className="">{date.toLocaleDateString("en-US", { weekday: "long" }) + ","}</p>
          <p className="">{date.toLocaleDateString("en-US", { month: "long" })}</p>
          <p className="">{date.toLocaleDateString("en-US", { day: "numeric" })}</p>
        </div>

        <div className="z-50 relative rounded-full h-8 w-8" aria-label="Login/Sign-up">
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
      </div>
    </div>
  );
};
