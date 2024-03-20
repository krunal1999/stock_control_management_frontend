import React, { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { Box, Grid, Paper, Stack } from "@mui/material";
import InventoryService from "../Inventory/InventoryService";
import InventoryStackedbarchart from "../Inventory/reports/InventoryStackedbarchart";
import InventoryStackedBar2 from "../Inventory/reports/InventoryStackedBar2";
import InventoryReportPieChart from "../Inventory/reports/InventoryReportPieChart";
import InventoryApexPiechart from "../Inventory/reports/InventoryApexPiechart";
import InventoryPieCharts2 from "../Inventory/reports/InventoryPieCharts2";
import LineChartTotalQTYSoldQTYRemaingQty from "./homeReports/LineChartTotalQTYSoldQTYRemaingQty";
import AreaChartSoldQTYRemainINgQty from "./homeReports/AreaChartSoldQTYRemainINgQty";
import BarchartPositiveNegative from "./homeReports/BarchartPositiveNegative";
import TreeMap1 from "./homeReports/TreeMap1";

const HomeReports = () => {
  const [InventoryListdata, setInventoryListdata] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await InventoryService.getAllProduct();

        setInventoryListdata(res.data);
        console.log(
          "🚀 ~ file: Inventory.jsx:67 ~ fetchdata ~ res.data:",
          res.data
        );
      } catch (error) {
        console.log("🚀 ~ file: Inventory.jsx:67 ~ fetchdata ~ error:", error);
      }
    };
    fetchdata();
  }, []);

  const rows = [];

  InventoryListdata.forEach((pl) => {
    rows.unshift(pl);
  });

  // bar grapgh---------------------------------
  const vendorProductData = InventoryListdata.reduce((acc, inputObject) => {
    const vendorName = inputObject.vendoruniquename;
    const productName = inputObject.productname;
    const quantity = inputObject.quantity;

    if (!acc[vendorName]) {
      acc[vendorName] = [];
    }

    acc[vendorName].push({
      productid: inputObject.productid,
      quantity,
      productname: productName,
    });

    return acc;
  }, {});

  // bar grapgh---------------------------------

  // piechart logic

  const piechartData = InventoryListdata.flat().reduce((acc, item) => {
    const { categories, quantity } = item;
    const existingCategory = acc.find(
      (entry) => entry.categories === categories
    );
    if (existingCategory) {
      existingCategory.totalquantity += quantity;
    } else {
      acc.push({ categories, totalquantity: quantity, name: categories });
    }
    return acc;
  }, []);

  // piechart logic -------------------

  // line logic -------------------

  const linegrapgh = InventoryListdata.map((item) => ({
    name: item.productname,
    totalQty: item.quantity,
    soldQty: item.soldquantity,
    remainingQty: item.quantity - item.soldquantity,
    minimumQty: item.minimumQuantityAlert,
  }));

  console.log("linegrapgh---------------", linegrapgh);

  // line logic -------------------

  // line logic -------------------

  const barstackgrapgh = InventoryListdata.map((item) => ({
    name: item.productname,
    totalInvestment: item.quantity * item.buyprice,
    currentSale: item.soldquantity * item.sellingPrice,
    expectedSale: (item.quantity - item.soldquantity) * item.sellingPrice,
    netProfit: (item.soldquantity * item.sellingPrice) - (item.quantity * item.buyprice)
  }));

  console.log("barstackgrapgh---------------", barstackgrapgh);

  // line logic -------------------

  return (
    <>
      <AdminLayout>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} sx={{ msOverflowX: "scroll" }}>
              <Paper varient="outlined" elevation={2}>
                <InventoryStackedbarchart mapdata={vendorProductData} />
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper varient="outlined" elevation={2}>
                <InventoryStackedBar2 mapdata={vendorProductData} />
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper
                varient="outlined"
                elevation={2}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Stack direction="row" spacing={2}>
                  <InventoryReportPieChart piechart={piechartData} />
                  <InventoryApexPiechart piechart={piechartData} />
                  <InventoryPieCharts2 piechart={piechartData} />
                </Stack>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper varient="outlined" elevation={2}>
                <LineChartTotalQTYSoldQTYRemaingQty linegrapgh={linegrapgh} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper varient="outlined" elevation={2}>
                <AreaChartSoldQTYRemainINgQty areagrapgh={linegrapgh} />
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper varient="outlined" elevation={2}>
                <BarchartPositiveNegative barstackgrapgh={barstackgrapgh} />
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper varient="outlined" elevation={2}>
                <TreeMap1 linegrapgh={linegrapgh} />
              </Paper>
            </Grid>

          </Grid>
        </Box>
      </AdminLayout>
    </>
  );
};

export default HomeReports;

