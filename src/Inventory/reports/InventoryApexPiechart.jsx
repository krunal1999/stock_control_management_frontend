import ReactApexChart from "react-apexcharts";

const InventoryApexPiechart = ({ piechart }) => {
  const chartData = {
    series: piechart.map((item) => item.totalquantity),
    options: {
      chart: {
        type: "pie",
      },
      labels: piechart.map((item) => item.categories),
      colors: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"], 
      legend: {
        position: "bottom",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 400,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <div>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="donut"
        width={600}
        height={500}
      />
    </div>
  );
};

export default InventoryApexPiechart;
