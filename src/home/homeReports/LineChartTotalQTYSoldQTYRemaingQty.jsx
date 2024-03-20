import React from "react";
import { Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
// charts have predefine code on recharts WebStories

const LineChartTotalQTYSoldQTYRemaingQty = ({ linegrapgh }) => {
  return (
    <LineChart
      width={1800}
      height={500}
      data={linegrapgh}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="totalQty" stroke="#8884d8" />
      <Line type="monotone" dataKey="soldQty" stroke="#82ca9d" />
      <Line type="monotone" dataKey="remainingQty" stroke="#ffc658" />
      <Line type="monotone" dataKey="minimumQty" stroke="#ffc656" />
    </LineChart>
  );
};

export default LineChartTotalQTYSoldQTYRemaingQty;
