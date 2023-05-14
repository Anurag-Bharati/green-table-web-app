"use client";

import { firestore } from "@/config/firebase/firebase";
import { collection, orderBy, query } from "firebase/firestore";
import Image from "next/image";
import { useCollection } from "react-firebase-hooks/firestore";
import Moment from "react-moment";

const medals = [
  "/assets/svgs/game/first-medal.svg",
  "/assets/svgs/game/second-medal.svg",
  "/assets/svgs/game/third-medal.svg",
];

const LeaderBoardHero = () => {
  const userCollection = collection(firestore, "users");
  const q = query(userCollection, orderBy("points", "desc"));
  const [users, loading, error] = useCollection(q);
  const data = users?.docs.map((doc) => doc.data());
  return (
    <section className="header-banner min-h-[calc(100vh-80px)] w-full bg-yellow-50">
      <div className="flex flex-col items-center justify-start h-full py-10">
        <h1 className="text-center text-3xl md:text-4xl lg:text-5xl poppins font-semibold text-gray-700">
          Our Top Diners
        </h1>
        <div className="rounded-xl  box-border mt-8 bg-white overflow-hidden ring-red-300 focus:ring-4 max-w-3xl w-full h-full flex flex-col items-center p-6 gap-2 overflow-y-auto nice-scroll-bar">
          {loading && <h1>Loading...</h1>}
          {!loading &&
            data?.map((user, index) => <LeaderBoardTile key={index} user={user} i={index} />)}
        </div>
      </div>
    </section>
  );
};

export default LeaderBoardHero;

const LeaderBoardTile = ({ user, i }) => {
  const { name, image, points } = user;
  return (
    <div
      className={`rounded-xl flex justify-between w-full 
      ${i === 0 && "bg-amber-200"}
      ${i === 1 && "bg-zinc-200 "}
      ${i === 2 && "bg-[#c3b3ad]"}
      `}
    >
      <div className="flex gap-3 items-center">
        <p className="pl-4 text-2xl font-bold text-gray-700 leading-tight">{i + 1}</p>
        <div className=" flex flex-col items-center justify-center overflow-clip rounded-md  py-3">
          <Image
            src={image}
            width={48}
            height={48}
            alt="1st place"
            className="rounded-md object-cover no-select pointer-events-none"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className=" text-xl font-bold text-gray-700 leading-tight">{name}</p>
          <p className="font-semibold text-gray-500 leading-tight">{points ?? 0} points </p>
        </div>
      </div>
      <div className=" flex flex-col items-center justify-center overflow-clip rounded-md p-3 pr-4">
        {i < 3 && (
          <Image
            src={medals[i]}
            width={32}
            height={32}
            alt="1st place"
            className="rounded-md object-cover no-select pointer-events-none"
          />
        )}
      </div>
    </div>
  );
};
