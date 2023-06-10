export const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className=" !bg-[#ffffffaa] rounded-md p-2 backdrop-blur-sm">
        <p className="font-semibold mb-2 text-lg">{label} orders</p>
        {payload.map((entry, index) => (
          <p key={index} className="flex items-center mb-1">
            <span
              className="w-3 h-3 mr-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            ></span>
            <span>{`${entry.name}: ${Math.round(entry.value)}`}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};
