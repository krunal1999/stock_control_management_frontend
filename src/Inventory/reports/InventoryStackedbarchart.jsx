import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const InventoryStackedbarchart = ({ mapdata }) => {
  //   const vendorProductData = [
  //     {
  //       APPLE: [
  //         {
  //           productid: "PID102",
  //           quantity: 150,
  //           productname: "MAC M2",
  //         },
  //         {
  //           productid: "PID103",
  //           quantity: 1000,
  //           productname: "DDR4",
  //         },
  //       ],
  //     },
  //     {
  //       Nvidia: [
  //         {
  //           productid: "PID104",
  //           quantity: 1000,
  //           productname: "GTR  1060 ",
  //         },
  //       ],
  //     },
  //   ];

  const vendorProductData22 = Object.entries(mapdata).map(
    ([vendorName, products]) => ({
      [vendorName]: products,
    })
  );
  console.log(
    "🚀 ~ file: InventoryReports.jsx:16 ~ InventoryReports ~ vendorProductData:",
    vendorProductData22
  );

  console.log(vendorProductData22);

  const combinedData = vendorProductData22.reduce((acc, vendorData) => {
    const vendorName = Object.keys(vendorData)[0];
    const products = vendorData[vendorName];

    products.forEach((product) => {
      if (!acc[product.productname]) {
        acc[product.productname] = { name: product.productname };
      }
      acc[product.productname][vendorName] = product.quantity;
    });

    return acc;
  }, {});

  const data = Object.values(combinedData);
  console.log(
    "🚀 ~ file: InventoryStackedbarchart.jsx:119 ~ InventoryStackedbarchart ~ data:",
    data
  );

  const colors = ["#96ded1", "#b9d3ff", "#9400d3", "#5c7d81", "#49bd17", "#4587ec", "#9400d3", "#ff7f50", "#e07258", "#a47a6a", ];

  return (
    <div>
      <BarChart
        width={1800}
        height={500}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {vendorProductData22.map((vendorData, index) => {
          const vendorName = Object.keys(vendorData)[0];
          return (
            <Bar
              key={vendorName}
              dataKey={vendorName}
              stackId="a"
        //       fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
        fill={colors[index % colors.length]}
            />
          );
        })}
      </BarChart>
    </div>
  );
};

export default InventoryStackedbarchart;
