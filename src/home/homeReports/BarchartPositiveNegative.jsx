import React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Legend,
  ReferenceLine,
  Bar,
} from "recharts";
// charts have predefine code on recharts WebStories

const BarchartPositiveNegative = ({barstackgrapgh}) => {

  return (
    <BarChart
      width={1800}
      height={600}
      data={barstackgrapgh}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <ReferenceLine y={0} stroke="#000" />
      <Bar dataKey="totalInvestment" fill="#8884d8" />
      <Bar dataKey="currentSale" stackId="a" fill="#82ca9d" />
      <Bar dataKey="expectedSale" stackId="a" fill="#037bfc" />
      {barstackgrapgh.netProfit > "0" ? (
        <Bar dataKey="netProfit" fill="#03e7fc" />
      ) : (
        <Bar dataKey="netProfit" fill="#fc3003" />
      )}
    </BarChart>
  );
};

export default BarchartPositiveNegative;
