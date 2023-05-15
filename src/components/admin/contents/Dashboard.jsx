import TableView from "../dasboard/TableView";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-4 max-w-4xl mx-auto mt-2">
      <div className="flex justify-between ">
        <p className="text-xl font-medium">Table View</p>
        <div className="flex gap-2">
          <div className="w-6 h-6 rounded-md bg-[#c0eb75] "></div> <p>Available</p>
          <div className="w-6 h-6 rounded-md bg-[#f97171]"></div> <p>Occupied</p>
        </div>
      </div>
      <TableView />
    </div>
  );
};

export default Dashboard;
