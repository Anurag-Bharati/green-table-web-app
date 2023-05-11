"use client";

import { firestore } from "@/config/firebase/firebase";
import { doc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useDocumentOnce } from "react-firebase-hooks/firestore";

const milestone = [
  {
    title: "Silver Leaf I",
    description: "Get 20 leaf points to unlock this milestone",
    badge: "/assets/svgs/game/silver-three-leaf.svg",
  },
  {
    title: "Silver Leaf II",
    description: "Get 50 leaf points to unlock this milestone",
    badge: "/assets/svgs/game/silver-four-leaf.svg",
  },
  {
    title: "Gold Leaf I",
    description: "Get 100 leaf points to unlock this milestone",
    badge: "/assets/svgs/game/gold-three-leaf.svg",
  },
  {
    title: "Gold Leaf II",
    description: "Get 200 leaf points to unlock this milestone",
    badge: "/assets/svgs/game/gold-four-leaf.svg",
  },
];

const Hero = () => {
  const { data: session, status } = useSession({ required: true });
  const userRef = status === "authenticated" ? doc(firestore, "users", session?.user?.id) : null;
  const [user, loading, error] = useDocumentOnce(userRef);
  const data = user?.data();
  return (
    <section className="relative flex flex-col w-full overflow-hidden isolate">
      <div className="flex flex-col h-full justify-center items-center  pt-10">
        <div className=" h-32 w-32 rounded-full  z-10  pointer-events-none">
          {status === "authenticated" ? (
            <Image
              src={session?.user?.image}
              width={256}
              height={256}
              alt="profile"
              className="rounded-full h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full rounded-full shimmer invert" />
          )}
        </div>
        {status === "authenticated" ? (
          <h1 className="mt-2 text-3xl  mx-auto font-bold uppercase tracking-tight">
            {session?.user?.name}
          </h1>
        ) : (
          <span className="mt-2 text-3xl  mx-auto font-bold uppercase tracking-tight text-transparent shimmer w-64 rounded-md invert brightness-150">
            .
          </span>
        )}
        <div className="mx-auto">
          <div className="flex gap-4 justify-center items-center p-4 min-w-[300px]">
            <button className="rounded-xl border-2 text-2xl px-2 flex-1 py-1 hover:bg-white hover:text-black hover:scale-95">
              Edit
            </button>
            <button className="rounded-xl  text-2xl px-2 flex-1 py-1 bg-gradient-to-br from-pink-400 to-[#F02989]   hover:text-black hover:brightness-110 hover:scale-95">
              Share
            </button>
          </div>
        </div>
        {user && (
          <div className="flex gap-4 justify-center items-center p-4 min-w-[300px]  border-zinc-200 border-2 rounded-xl text-center no-select ">
            {milestone.map((item, index) => (
              <div className="flex flex-col items-center justify-evenly gap-2" key={index}>
                <div className="flex items-center justify-center" title={item.description}>
                  <Image
                    src={item.badge}
                    width={96}
                    height={96}
                    alt={item.title}
                    className={` pointer-events-none
                    ${
                      index === 0 && user?.data()?.points < 20
                        ? "filter grayscale brightness-50"
                        : index === 1 && user?.data()?.points < 50
                        ? "filter grayscale brightness-50"
                        : index === 2 && user?.data()?.points < 100
                        ? "filter grayscale brightness-50"
                        : index === 3 && user?.data()?.points < 200
                        ? "filter grayscale brightness-50"
                        : "filter brightness-100"
                    }
                    `}
                  />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h1 className="text-xl font-serif">{item.title}</h1>
                  {index === 0 && user?.data()?.points < 20 ? (
                    <p className="text-sm max-w-[150px] text-gray-500">{item.description}</p>
                  ) : (
                    index === 0 && (
                      <p className="text-sm max-w-[150px] text-[#F02989]">
                        You have unlocked this milestone!
                      </p>
                    )
                  )}
                  {index === 1 && user?.data()?.points < 50 && (
                    <p className="text-sm max-w-[150px] text-gray-500">{item.description}</p>
                  )}
                  {index === 2 && user?.data()?.points < 100 && (
                    <p className="text-sm max-w-[150px] text-gray-500">{item.description}</p>
                  )}
                  {index === 3 && user?.data()?.points < 200 && (
                    <p className="text-sm max-w-[150px] text-gray-500">{item.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
