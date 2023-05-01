import Image from "next/image";
import { BiCheck, BiEnvelope, BiPhoneCall, BiSolidBadgeCheck, BiX } from "react-icons/bi";

const ReservationCard = ({ data, varient = "incoming" }) => {
  return (
    <div className=" bg-white rounded-md flex gap-2 whitespace-nowrap">
      <div className="pl-4 pr-2 pt-3 pb-4 flex-1 flex flex-col gap-2">
        <p className="text-zinc-400 text-sm">Customer Information</p>
        <div className="flex gap-2 items-center leading-0">
          {data?.avatar ? (
            <div className="w-4 h-4 rounded-full overflow-hidden">
              <Image src={data?.avatar} alt="Picture of the author" width={32} height={32} />
            </div>
          ) : (
            <div className="w-4 h-4 rounded-full bg-zinc-400"></div>
          )}
          <p className="text-black font-bold text-sm">{data?.name ?? "John Doe"}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-zinc-400 text-xs truncate">{data?.email ?? "jhonDoe@gmail.com"}</p>
          <p className="text-zinc-400 text-xs truncate">{data?.phone ?? "01234567890"}</p>
        </div>
        <div className="flex gap-2 text-xs flex-1 items-end">
          <a
            href={data?.phone ? `tel://${data?.phone}` : "#"}
            className="flex-1 border-black border text-black items-center  px-2 py-1 rounded-md flex gap-2"
          >
            <BiPhoneCall />
            Call
          </a>
          <a
            href={data?.email ? `mailto://${data?.email}` : "#"}
            className="flex-1 border-black border text-black items-center  px-2 py-1 rounded-md flex gap-2"
          >
            <BiEnvelope />
            Email
          </a>
        </div>
      </div>
      <div className="flex-1 flex flex-col border-l-zinc-100 border-l-4 border-dashed  pl-4 pr-4 pt-3 pb-4 gap-2">
        <span
          className="text-xs self-end  px-1 py-0.5 rounded-md"
          style={{ backgroundColor: varient === "incoming" ? "#F9F871" : "#c0eb75" }}
        >
          {varient}
        </span>
        <p className="text-zinc-400 text-sm">Reservation Information</p>
        <div className="flex flex-col gap-1 ">
          <div className="flex justify-between text-xs">
            <p className="text-zinc-400  truncate">Date</p>
            <span className="flex-1 h-2.5 border-b-2 border-dotted mx-2"></span>
            <span className="text-black">12/12/2021</span>
          </div>
          <div className="flex justify-between text-xs">
            <p className="text-zinc-400  truncate">Time</p>
            <span className="flex-1 h-2.5 border-b-2 border-dotted mx-2"></span>
            <span className="text-black">12:00 PM</span>
          </div>
          <div className="flex justify-between text-xs">
            <p className="text-zinc-400 truncate">Guests</p>
            <span className="flex-1 h-2.5 border-b-2 border-dotted mx-2"></span>
            <span className="text-black">2</span>
          </div>
        </div>
        <div className="flex gap-2 text-xs flex-1 items-end">
          {varient === "incoming" && (
            <button className="flex-1 text-black border-black border h-6  items-center  px-2 py-1 rounded-md flex gap-1">
              <BiX />
              Reject
            </button>
          )}
          {varient === "incoming" && (
            <button className="flex-1 bg-[#111] h-6  text-white items-center  px-2 py-1 rounded-md flex gap-1">
              <BiCheck />
              Accept
            </button>
          )}
          {varient === "accepted" && (
            <button className="flex-1 bg-[#111] h-6  text-white items-center  px-2 py-1 rounded-md flex gap-1 justify-center">
              <BiSolidBadgeCheck />
              Checked In
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;
