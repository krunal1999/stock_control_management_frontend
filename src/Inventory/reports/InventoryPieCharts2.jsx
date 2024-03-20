import { PieChart, Pie, Cell } from "recharts";


const COLORS = ["#660066", "#065535", "#ff0000", "#ffa500", "#003366", "#468499", "#8b0000", "#ff7f50", "#e07258", "#a47a6a", ];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
     
    </text>
  );
};
const InventoryPieCharts2 = ({ piechart }) => {
        console.log("pei222222222222" , piechart)
  return (
    <div>
      <PieChart width={600} height={600}>
        <Pie
          data={piechart}
          cx={300}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={200}
          fill="#8884d8"
          dataKey="totalquantity"
        >
          {piechart.map((categories, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          
        </Pie>
      </PieChart>
    </div>
  );
};

export default InventoryPieCharts2;
