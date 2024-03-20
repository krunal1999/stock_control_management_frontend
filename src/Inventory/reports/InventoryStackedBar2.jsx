import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const InventoryStackedBar2 = ({ mapdata }) => {
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
  //           productname: "GTR 1090",
  //         },
  //         {
  //           productid: "PID106",
  //           quantity: 100,
  //           productname: "GTR 1070",
  //         },
  //       ],
  //     },
  //     {
  //       Intel: [
  //         {
  //           productid: "PID107",
  //           quantity: 100,
  //           productname: "GTR 1000",
  //         },
  //         {
  //           productid: "PID108",
  //           quantity: 300,
  //           productname: "GTR 1090",
  //         },
  //       ],
  //     },
  //     {
  //       Intel1: [
  //         {
  //           productid: "PID107",
  //           quantity: 100,
  //           productname: "GTR 1000",
  //         },
  //         {
  //           productid: "PID108",
  //           quantity: 300,
  //           productname: "GTR 1090",
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

  const combinedData = vendorProductData22.map((vendorData) => {
    const vendorName = Object.keys(vendorData)[0];
    const products = vendorData[vendorName];
    const vendorQuantity = products.reduce(
      (total, product) => total + product.quantity,
      0
    );

    return {
      name: vendorName,
      quantity: vendorQuantity,
    };
  });

  
  
  
  return (
    <div>
      <BarChart
        width={1800}
        height={500}
        data={combinedData}
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
        <Bar dataKey="quantity" stackId="a" fill="#03396c" />
        
      </BarChart>
    </div>
  );
};

export default InventoryStackedBar2;
