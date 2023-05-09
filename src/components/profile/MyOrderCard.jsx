import { BiDotsVerticalRounded, BiLeaf, BiMoney, BiTime } from "react-icons/bi";
import Moment from "react-moment";

const MyOrderCard = ({ data: d, i }) => {
  const data = { ...d.data, id: d.id };
  return (
    <div className="w-full flex justify-between p-4 rounded-xl cursor-pointer hover:bg-[#c0eb75] bg-transparent transition duration-300 ease-in-out">
      <div className="w-full flex flex-col gap-2">
        <div className="flex gap-2 content-center items-center w-full justify-between">
          <h2 className="text-xl  truncate whitespace-nowrap">
            {data?.orders && (
              <span>
                {i + 1}. {data?.orders[0]?.name}
                {data?.orders.length - 1 > 0 ? ` and ${data?.orders.length - 1} more` : ""}
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
                  : data.status === "processing"
                  ? "#75ebeb"
                  : "#c0eb75"
              }]`}
            >
              <span className="hidden sm:inline">{data.status}</span>
            </span>
          </div>
        </div>
        {data.status === "pending" && (
          <p className="text-md rounded-md text-gray-500">Please wait. Your order is pending</p>
        )}
        {data.status === "rejected" && (
          <p className="text-md rounded-md text-gray-500">Sorry, your order has been rejected </p>
        )}
        {data.status === "processing" && (
          <p className="text-md rounded-md text-gray-500">
            Your order has been accepted and is being processed
          </p>
        )}
        {data.status === "completed" && (
          <p className="text-md rounded-md text-gray-500">
            This order has been {data.status} about{" "}
            <Moment fromNow className="truncate sm:max-w-sm ">
              {data?.completedAt?.seconds * 1000}
            </Moment>
          </p>
        )}
        <div className="flex  py-1 justify-between">
          {data.orders.length === 0 && (
            <span className="py-0.5  px-1 text-xs   text-gray-500 rounded-full w-12 whitespace-nowrap">
              no tags
            </span>
          )}
          <div className="flex gap-2">
            {data.orders.map((o, i) =>
              i === 0 ? null : (
                <span
                  className="py-0.5 border-2 border-[#a3e635] rounded-full px-2 text-xs hover:bg-[#a3e635] hover:text-[#000] "
                  key={i}
                >
                  {o.name} x {o.quantity}
                </span>
              )
            )}
          </div>
          <div className="flex">
            <span className="text-base text-gray-500 ml-2 rounded-full px-1 flex items-center gap-1">
              <BiLeaf />
              {data.orders.reduce((acc, curr) => acc + curr.quantity, 0)}
            </span>
            <span className="text-base text-gray-500 ml-2 rounded-full px-1 flex items-center gap-1">
              <BiMoney />${data.orders.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)}
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

export default MyOrderCard;
