import { BiDotsVerticalRounded, BiLeaf, BiTime } from "react-icons/bi";
import Moment from "react-moment";

const MyReservationCard = ({ data: d, i }) => {
  const data = { ...d.data, id: d.id };
  return (
    <div className="w-full flex justify-between p-4 rounded-xl cursor-pointer hover:bg-[#c0eb75] bg-transparent transition duration-300 ease-in-out">
      <div className="w-full flex flex-col gap-2">
        <div className="flex gap-2 content-center items-center w-full justify-between">
          <h2 className="text-xl  truncate whitespace-nowrap">
            {data?.partySize && (
              <span>
                {data?.partySize}
                {data?.partySize > 1 ? ` people` : ` person`} on{" "}
                <Moment fromNow className="truncate sm:max-w-sm">
                  {data?.date?.seconds * 1000}
                </Moment>
              </span>
            )}
          </h2>
          <div className="flex gap-2">
            <span className="py-0.5  rounded-full px-1 text-md text-gray-500 font-light  items-center gap-1 hidden sm:flex ">
              <BiTime className="text-md text-gray-500" />
              <Moment fromNow className="truncate sm:max-w-sm">
                {data?.createdAt?.seconds * 1000}
              </Moment>
            </span>
            <span
              className={` rounded-full px-2 text-md  font-light flex items-center gap-1 bg-[${
                data.status === "pending"
                  ? "#fbfb76"
                  : data.status === "rejected"
                  ? "#f97171"
                  : "#c0eb75"
              }]`}
            >
              <span className="hidden sm:inline">{data.status}</span>
            </span>
          </div>
        </div>
        {data.status === "pending" && (
          <p className="text-md rounded-md text-gray-500">
            Please wait. Your reservation is pending
          </p>
        )}
        {data.status === "rejected" && (
          <p className="text-md rounded-md text-gray-500">
            Sorry, your reservation has been rejected{" "}
          </p>
        )}

        {data.status === "accepted" && (
          <p className="text-md rounded-md text-gray-500">
            This reservation has been {data.status} and happen{" "}
            <Moment fromNow className="truncate sm:max-w-sm ">
              {data?.date?.seconds * 1000}
            </Moment>
          </p>
        )}
        <div className="flex  py-1 justify-between">
          <div className="flex">
            <span className="text-base text-gray-500 ml-2 rounded-full px-1 flex items-center gap-1">
              <BiLeaf />5
            </span>
          </div>
        </div>
      </div>
      <div>
        <BiDotsVerticalRounded className="text-2xl " />
      </div>
    </div>
  );
};

export default MyReservationCard;
