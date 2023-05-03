import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { BiBook, BiCog, BiCookie, BiLogOutCircle, BiRocket } from "react-icons/bi";

import InfiniteLinearProgressBar from "./InfiniteLinearProgressBar";
import Image from "next/image";

const UserOptionsBar = ({ session }) => {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);

  useEffect(() => {
    if (!open && loading) return;
    const loadDelay = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(loadDelay);
  }, [open, loading]);

  return (
    <div className="inline-flex justify-center items-center cursor-pointer w-8 h-8 rounded-full overflow-hidden ">
      <Image
        src={session.user.image}
        height={64}
        width={64}
        className="object-cover w-full h-full z-10"
        onClick={toggleOpen}
        alt="avatar"
        title={session.user.name}
      />
      <div
        className={`absolute overflow-hidden top-12 min-w-[250px] w-fit -right-0  md:top-16 shadow rounded-lg  border border-gray-200  whitespace-nowrap bg-white z-[-1] transition ease-in-out duration-300 ${
          open ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
        }`}
        onMouseLeave={() => setOpen(false)}
      >
        <div className=" text-sm md:text-base">
          <ul className="py-0">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer  flex items-center gap-2 border-b-2 border-gray-200">
              <div className="flex items-center gap-2">
                <Image
                  src={session.user.image}
                  height={48}
                  width={48}
                  className="object-cover w-10 h-10 z-10 rounded-full"
                  alt="avatar"
                />
                <div>
                  <p className="text-sm">{session.user.name}</p>
                  <p className="text-xs">{session.user.email}</p>
                </div>
              </div>
            </li>
            <li
              className={`relative transition-all duration-150 ease-out ${
                loading ? "pb-2 h-fit opacity-100" : "pb-0 h-0 opacity-0"
              }`}
            >
              <InfiniteLinearProgressBar small={true} />
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointe flex items-center gap-2">
              <BiBook className="w-5 h-5" />
              <p>My Reservations</p>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointe flex items-center gap-2">
              <BiCookie className="w-5 h-5" />
              <p>My Orders</p>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointe flex items-center gap-2">
              <BiRocket className="w-5 h-5" />
              <p>Leaderboard</p>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointe flex items-center gap-2">
              <BiCog className="w-5 h-5" />
              <p>Settings</p>
            </li>

            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointe flex items-center gap-2"
              onClick={signOut}
            >
              <BiLogOutCircle className="w-5 h-5" />
              <p>Sign out</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserOptionsBar;
