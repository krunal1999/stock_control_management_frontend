import { Box, Grid, Paper } from "@mui/material";
import InventoryStackedbarchart from "./reports/InventoryStackedbarchart";
import InventoryStackedBar2 from "./reports/InventoryStackedBar2";
import InventoryReportPieChart from "./reports/InventoryReportPieChart";
import InventoryPieCharts2 from "./reports/InventoryPieCharts2";

import InventoryApexPiechart from "./reports/InventoryApexPiechart";

const InventoryReports = ({ mapdata, piechart }) => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sx={{ msOverflowX: "scroll" }}>
            <Paper varient="outlined" elevation={2}>
              <InventoryStackedbarchart mapdata={mapdata} />
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper varient="outlined" elevation={2}>
              <InventoryStackedBar2 mapdata={mapdata} />
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
              <InventoryReportPieChart piechart={piechart} />
              <InventoryApexPiechart piechart={piechart} />
              <InventoryPieCharts2 piechart={piechart} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper varient="outlined" elevation={2}></Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default InventoryReports;
