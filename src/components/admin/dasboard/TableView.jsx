import { tableState } from "@/atoms";
import { useRecoilState } from "recoil";

const TableView = () => {
  const [tables, setTables] = useRecoilState(tableState);
  const toggleStatus = (index) => {
    const table = tables[index];
    const newTable = { ...table, status: table.status === "available" ? "occupied" : "available" };
    const newTables = tables.filter((table, i) => i !== index);
    setTables([...newTables, newTable]);
  };
  return (
    <div className="flex flex-col bg-zinc-50 p-6  rounded-xl max-w-4xl mx-auto">
      <div className="flex flex-wrap gap-6 justify-between ">
        {tables.map((table, index) => (
          <Table
            key={index}
            name={table.name}
            status={table.status}
            toggle={toggleStatus}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};
export default TableView;

const Table = ({ name, status, index, toggle }) => {
  return (
    <div className="flex items-center gap-2 cursor-pointer" onClick={() => toggle(index)}>
      <div className="flex flex-col gap-2">
        <div className="w-8 h-8 rounded-md bg-zinc-200"></div>
        <div className="w-8 h-8 rounded-md bg-zinc-200"></div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="w-16 h-24 rounded-md bg-zinc-200 flex justify-center items-center">
          <span
            className={`pointer-events-none no-select text-xl font-bold p-2  text-white rounded-full leading-3 ${
              status === "available" ? "bg-[#c0eb75]" : "bg-[#f97171]"
            }`}
          >
            {name}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="w-8 h-8 rounded-md bg-zinc-200"></div>
        <div className="w-8 h-8 rounded-md bg-zinc-200"></div>
      </div>
    </div>
  );
};
