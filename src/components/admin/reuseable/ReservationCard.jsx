import { updateReservationStatus } from "@/services/reservation.service";
import Image from "next/image";
import {
  BiCheck,
  BiEnvelope,
  BiPhoneCall,
  BiReceipt,
  BiSolidBadgeCheck,
  BiSolidXCircle,
  BiSolidXSquare,
  BiX,
} from "react-icons/bi";

const ReservationCard = ({ data }) => {
  console.log(data);
  return (
    <div className=" bg-white rounded-md flex gap-2 whitespace-nowrap">
      <div className="pl-4 pr-2 pt-3 pb-4 flex-1 flex flex-col gap-2">
        <p className="text-zinc-400 text-sm">Customer Information</p>
        <div className="flex gap-2 items-center leading-0">
          {data?.diner.image ? (
            <div className="w-4 h-4 rounded-full overflow-hidden">
              <Image src={data?.diner.image} alt="Picture of the author" width={32} height={32} />
            </div>
          ) : (
            <div className="w-4 h-4 rounded-full bg-zinc-400"></div>
          )}
          <p className="text-black font-bold text-sm truncate">{data?.diner.name ?? "John Doe"}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-zinc-400 text-xs truncate">
            {data?.diner.email ?? "jhonDoe@gmail.com"}
          </p>
          <p className="text-zinc-400 text-xs truncate">{data?.diner.phone ?? "01234567890"}</p>
        </div>
        <div className="flex gap-2 text-xs flex-1 items-end">
          <a
            href={data?.diner.phone ? `tel://${data?.diner.phone}` : "#"}
            className="flex-1 border-black border text-black items-center  px-2 py-1 rounded-md flex gap-2"
          >
            <BiPhoneCall />
            Call
          </a>
          <a
            href={data?.diner.email ? `mailto://${data?.diner.email}` : "#"}
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
          style={{
            backgroundColor:
              data.status === "pending"
                ? "#F9F871"
                : data.status === "rejected"
                ? "#f97171"
                : "#c0eb75",
          }}
        >
          {data.status}
        </span>
        <p className="text-zinc-400 text-sm">Reservation Information</p>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-xs">
            <p className="text-zinc-400  truncate">Date</p>
            <span className="flex-1 h-2.5 border-b-2 border-dotted mx-2"></span>
            <span className="text-black">
              {data?.date ? new Date(data?.date.seconds * 1000).toLocaleDateString() : "N/A"}
            </span>
          </div>
          <div className="flex justify-between text-xs">
            <p className="text-zinc-400  truncate">Time</p>
            <span className="flex-1 h-2.5 border-b-2 border-dotted mx-2"></span>
            <span className="text-black">{data?.time}</span>
          </div>
          <div className="flex justify-between text-xs">
            <p className="text-zinc-400 truncate">Guests</p>
            <span className="flex-1 h-2.5 border-b-2 border-dotted mx-2"></span>
            <span className="text-black">{data?.partySize}</span>
          </div>
        </div>
        <div className="flex gap-2 text-xs flex-1 items-end">
          {data.status === "pending" && (
            <button
              className="flex-1 text-black border-black border h-6  items-center  px-2 py-1 rounded-md flex gap-1"
              onClick={() => {
                updateReservationStatus(data.id, "rejected");
              }}
            >
              <BiX />
              Reject
            </button>
          )}
          {data.status === "pending" && (
            <button
              className="flex-1 bg-[#111] h-6  text-white items-center  px-2 py-1 rounded-md flex gap-1"
              onClick={() => {
                updateReservationStatus(data.id, "accepted", data.diner.id, 5);
              }}
            >
              <BiCheck />
              Accept
            </button>
          )}
          {data.status === "accepted" && (
            <button className="flex-1 bg-[#111] h-6  text-white items-center  px-2 py-1 rounded-md flex gap-1 justify-center">
              <BiSolidBadgeCheck />
              Checked In
            </button>
          )}
          {data.status === "rejected" && (
            <button className="flex-1 bg-[#111] h-6  text-white items-center  px-2 py-1 rounded-md flex gap-1 justify-center">
              <BiSolidXCircle />
              Cancelled
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;

export const NoReservationCard = () => {
  return (
    <div className=" bg-white rounded-md flex gap-2 whitespace-nowrap">
      <div className="p-3 flex-1  h-[182px]">
        <div className="border-2 border-gray-200 rounded-md h-full w-full border-dashed flex  flex-col justify-center items-center">
          <BiReceipt className="text-xl" />
          <div className="text-center"> No Reservations</div>
        </div>
      </div>
    </div>
  );
};
