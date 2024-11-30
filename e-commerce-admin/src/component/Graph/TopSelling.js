import { Cell, Pie, PieChart, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";

export default function TopSellingGraph() {
  const colors = ["#00C49F", "#FFBB28", "#0088FE", "#FF8042"];
  const [categoryStat, setCategoryStat] = useState([]);
  useEffect(() => {
    const fetchCategory = async () => {
      const res = await fetch("http://localhost:8080/admin/top_category");
      const data = await res.json();
      setCategoryStat(data);
      console.log(data)
    };
    fetchCategory();
  }, []);
  return (
    <div className="bg-white rounded-lg col-span-1 p-6 flex flex-col gap-4">
      <h2 className="font-bold text-lg">Top Selling Category</h2>
      <ResponsiveContainer width="99%" height={250}>
        <PieChart>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white p-3 rounded-lg">
                    <p className="intro">{`${payload[0].payload.productType}`}</p>
                    <p>Total Order: {payload[0].payload.totalSold}</p>
                  </div>
                );
              }
            }}
          />
          <Pie
            data={categoryStat}
            innerRadius={"60%"}
            outerRadius={"90%"}
            paddingAngle={5}
            dataKey="totalSold"
          >
            {categoryStat.map((item, index) => (
              <Cell key={`${item.productType}`} fill={colors[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="flex items-center justify-between flex-wrap">
        {categoryStat.map((item, index) => (
          <div key={item.productType} className="flex flex-col items-center ">
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full`}
                style={{ backgroundColor: colors[index] }}
              />
              <h3>{item.productType}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

