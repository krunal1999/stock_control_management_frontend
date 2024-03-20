import React from "react";
import { Tooltip, Treemap } from "recharts";
// charts have predefine code on recharts WebStories

const TreeMap1 = ({ linegrapgh }) => {
  function CustomTooltip({ active, payload }) {
    if (active && payload) {
      return (
        <div
          className="tooltip"
          style={{
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <p>Product: {payload[0].payload.name}</p>
          <p>Total_Qty: {payload[0].payload.totalQty}</p>
          <p>Sold_Qty: {payload[0].payload.soldQty}</p>
          <p>Remaining_Qty: {payload[0].payload.remainingQty}</p>
        </div>
      );
    }

    return null;
  }

  return (
    <Treemap
      width={2000}
      height={800}
      data={linegrapgh}
      dataKey="remainingQty"
      aspectRatio={4 / 3}
      stroke="#fff"
      fill="#8884d8"
    >
      <Tooltip content={<CustomTooltip />} />
    </Treemap>
  );
};

export default TreeMap1;
