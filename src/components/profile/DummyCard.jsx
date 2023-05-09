export const DummyContentCard = () => {
  return (
    <div
      className="w-full flex justify-between p-4 rounded-xl cursor-pointer hover:bg-[#ffffff22] bg-transparent transition duration-300 ease-in-out"
      title="loading files"
    >
      <div className="w-full flex flex-col gap-2">
        <div className="flex gap-2 content-center items-center w-full justify-between">
          <span className="text-transparent shimmer w-1/3 text-xl rounded-md">.</span>
          <div className="flex gap-2 w-1/2 justify-between ">
            <span className="py-0.5  rounded-md px-1 text-md text-transparent font-light w-1/2 shimmer">
              .
            </span>
            <span className="py-0.5  rounded-md  px-1 text-md text-transparent font-light w-1/2 shimmer">
              .
            </span>
          </div>
        </div>
        <p className="text-md rounded-md shimmer text-transparent">.</p>
        <div className="flex gap-2 py-1">
          <span className="py-0.5  px-1 text-xs   text-transparent shimmer rounded-md w-12">.</span>
          <span className="py-0.5  px-1 text-xs   text-transparent shimmer rounded-md w-12">.</span>
          <span className="py-0.5  px-1 text-xs   text-transparent shimmer rounded-md w-12">.</span>
          <span className="py-0.5  px-1 text-xs   text-transparent shimmer rounded-md w-12">.</span>
        </div>
      </div>
      <div>
        <span className="text-xl text-transparent shimmer ml-2 rounded-md px-1">.</span>
      </div>
    </div>
  );
};
